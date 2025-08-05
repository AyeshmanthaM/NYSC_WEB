// services/NewsService.ts

import { PrismaClient } from '@prisma/client'
import { RedisClient } from 'redis'
import { Queue } from 'bull'
import slugify from 'slugify'

interface NewsFilters {
  categoryId?: string
  tagSlug?: string
  search?: string
  isPublished?: boolean
  isFeatured?: boolean
  authorId?: string
  dateFrom?: Date
  dateTo?: Date
  page: number
  limit: number
  sortBy?: 'latest' | 'popular' | 'featured'
}

interface CreateNewsDto {
  title_si: string
  title_ta: string
  title_en: string
  excerpt_si?: string
  excerpt_ta?: string
  excerpt_en?: string
  content_si: string
  content_ta: string
  content_en: string
  categoryId: string
  tags?: string[]
  featuredImage?: string
  isFeatured?: boolean
  isPublished?: boolean
  publishedAt?: Date
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string
}

export class NewsService {
  constructor(
    private prisma: PrismaClient,
    private cache: RedisClient,
    private queue: Queue
  ) {}

  async createArticle(data: CreateNewsDto, authorId: string) {
    // Generate slug from English title
    const baseSlug = slugify(data.title_en, { lower: true, strict: true })
    let slug = baseSlug
    let counter = 1

    // Ensure unique slug
    while (await this.prisma.newsArticle.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`
      counter++
    }

    // Create article with tags
    const article = await this.prisma.newsArticle.create({
      data: {
        ...data,
        slug,
        authorId,
        tags: data.tags || [],
        publishedAt: data.isPublished ? data.publishedAt || new Date() : null
      }
    })

    // Process tags
    if (data.tags && data.tags.length > 0) {
      await this.processTags(article.id, data.tags)
    }

    // Queue notifications if published
    if (data.isPublished) {
      await this.queue.add('news-published', {
        articleId: article.id,
        title: data.title_en
      })
    }

    // Clear cache
    await this.clearNewsCache()

    return article
  }

  async getArticles(filters: NewsFilters) {
    const cacheKey = `news:list:${JSON.stringify(filters)}`
    const cached = await this.cache.get(cacheKey)
    if (cached) return JSON.parse(cached)

    const where: any = {
      isPublished: filters.isPublished ?? true
    }

    if (filters.categoryId) {
      where.categoryId = filters.categoryId
    }

    if (filters.search) {
      where.OR = [
        { title_en: { contains: filters.search, mode: 'insensitive' } },
        { title_si: { contains: filters.search, mode: 'insensitive' } },
        { title_ta: { contains: filters.search, mode: 'insensitive' } },
        { content_en: { contains: filters.search, mode: 'insensitive' } }
      ]
    }

    if (filters.isFeatured !== undefined) {
      where.isFeatured = filters.isFeatured
    }

    if (filters.authorId) {
      where.authorId = filters.authorId
    }

    if (filters.dateFrom || filters.dateTo) {
      where.publishedAt = {}
      if (filters.dateFrom) where.publishedAt.gte = filters.dateFrom
      if (filters.dateTo) where.publishedAt.lte = filters.dateTo
    }

    if (filters.tagSlug) {
      const tag = await this.prisma.newsTag.findUnique({
        where: { slug: filters.tagSlug }
      })
      if (tag) {
        where.tags = { has: tag.name_en }
      }
    }

    // Determine sort order
    let orderBy: any = { publishedAt: 'desc' } // default: latest
    if (filters.sortBy === 'popular') {
      orderBy = { viewCount: 'desc' }
    } else if (filters.sortBy === 'featured') {
      orderBy = [{ isFeatured: 'desc' }, { publishedAt: 'desc' }]
    }

    const [articles, total] = await Promise.all([
      this.prisma.newsArticle.findMany({
        where,
        skip: (filters.page - 1) * filters.limit,
        take: filters.limit,
        orderBy,
        include: {
          category: true,
          author: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      }),
      this.prisma.newsArticle.count({ where })
    ])

    const result = {
      data: articles,
      pagination: {
        page: filters.page,
        limit: filters.limit,
        total,
        pages: Math.ceil(total / filters.limit)
      }
    }

    // Cache for 5 minutes
    await this.cache.setex(cacheKey, 300, JSON.stringify(result))

    return result
  }

  async getArticleBySlug(slug: string) {
    const cacheKey = `news:article:${slug}`
    const cached = await this.cache.get(cacheKey)
    if (cached) return JSON.parse(cached)

    const article = await this.prisma.newsArticle.findUnique({
      where: { slug },
      include: {
        category: true,
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true
          }
        }
      }
    })

    if (!article) {
      throw new Error('Article not found')
    }

    // Cache for 1 hour
    await this.cache.setex(cacheKey, 3600, JSON.stringify(article))

    return article
  }

  async incrementViewCount(articleId: string) {
    // Use Redis to track unique views
    const viewKey = `news:views:${articleId}:${new Date().toISOString().split('T')[0]}`
    const viewed = await this.cache.get(viewKey)

    if (!viewed) {
      await this.prisma.newsArticle.update({
        where: { id: articleId },
        data: { viewCount: { increment: 1 } }
      })
      await this.cache.setex(viewKey, 86400, '1') // 24 hours
    }
  }

  async getRelatedArticles(articleId: string, limit: number = 5) {
    const article = await this.prisma.newsArticle.findUnique({
      where: { id: articleId },
      select: { categoryId: true, tags: true }
    })

    if (!article) return []

    const related = await this.prisma.newsArticle.findMany({
      where: {
        AND: [
          { id: { not: articleId } },
          { isPublished: true },
          {
            OR: [
              { categoryId: article.categoryId },
              { tags: { hasSome: article.tags } }
            ]
          }
        ]
      },
      take: limit,
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true,
        slug: true,
        title_si: true,
        title_ta: true,
        title_en: true,
        excerpt_en: true,
        featuredImage: true,
        publishedAt: true,
        category: true
      }
    })

    return related
  }

  async getCategories() {
    const cacheKey = 'news:categories'
    const cached = await this.cache.get(cacheKey)
    if (cached) return JSON.parse(cached)

    const categories = await this.prisma.newsCategory.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: 'asc' },
      include: {
        _count: {
          select: { newsArticles: true }
        }
      }
    })

    // Cache for 1 hour
    await this.cache.setex(cacheKey, 3600, JSON.stringify(categories))

    return categories
  }

  async getTags(limit: number = 50) {
    const cacheKey = `news:tags:${limit}`
    const cached = await this.cache.get(cacheKey)
    if (cached) return JSON.parse(cached)

    const tags = await this.prisma.newsTag.findMany({
      orderBy: { usageCount: 'desc' },
      take: limit
    })

    // Cache for 1 hour
    await this.cache.setex(cacheKey, 3600, JSON.stringify(tags))

    return tags
  }

  async getFeaturedArticles(limit: number = 5) {
    const cacheKey = `news:featured:${limit}`
    const cached = await this.cache.get(cacheKey)
    if (cached) return JSON.parse(cached)

    const articles = await this.prisma.newsArticle.findMany({
      where: {
        isPublished: true,
        isFeatured: true
      },
      take: limit,
      orderBy: { publishedAt: 'desc' },
      include: {
        category: true,
        author: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    // Cache for 30 minutes
    await this.cache.setex(cacheKey, 1800, JSON.stringify(articles))

    return articles
  }

  async getLatestArticles(limit: number = 10) {
    const cacheKey = `news:latest:${limit}`
    const cached = await this.cache.get(cacheKey)
    if (cached) return JSON.parse(cached)

    const articles = await this.prisma.newsArticle.findMany({
      where: { isPublished: true },
      take: limit,
      orderBy: { publishedAt: 'desc' },
      include: {
        category: true,
        author: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    // Cache for 5 minutes
    await this.cache.setex(cacheKey, 300, JSON.stringify(articles))

    return articles
  }

  async getPopularArticles(limit: number = 10, days: number = 7) {
    const cacheKey = `news:popular:${limit}:${days}`
    const cached = await this.cache.get(cacheKey)
    if (cached) return JSON.parse(cached)

    const dateThreshold = new Date()
    dateThreshold.setDate(dateThreshold.getDate() - days)

    const articles = await this.prisma.newsArticle.findMany({
      where: {
        isPublished: true,
        publishedAt: { gte: dateThreshold }
      },
      take: limit,
      orderBy: { viewCount: 'desc' },
      include: {
        category: true,
        author: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    // Cache for 1 hour
    await this.cache.setex(cacheKey, 3600, JSON.stringify(articles))

    return articles
  }

  private async processTags(articleId: string, tags: string[]) {
    for (const tagName of tags) {
      const slug = slugify(tagName, { lower: true, strict: true })
      
      // Create or update tag
      const tag = await this.prisma.newsTag.upsert({
        where: { slug },
        create: {
          name_en: tagName,
          name_si: tagName, // TODO: Translate
          name_ta: tagName, // TODO: Translate
          slug,
          usageCount: 1
        },
        update: {
          usageCount: { increment: 1 }
        }
      })

      // Create article-tag relationship
      await this.prisma.newsArticleTag.create({
        data: {
          articleId,
          tagId: tag.id
        }
      })
    }
  }

  private async clearNewsCache() {
    const keys = await this.cache.keys('news:*')
    if (keys.length > 0) {
      await this.cache.del(...keys)
    }
  }

  // Analytics methods
  async getNewsAnalytics(dateFrom: Date, dateTo: Date) {
    const [totalArticles, totalViews, topArticles, categoryDistribution] = await Promise.all([
      // Total articles published
      this.prisma.newsArticle.count({
        where: {
          publishedAt: {
            gte: dateFrom,
            lte: dateTo
          }
        }
      }),

      // Total views
      this.prisma.newsArticle.aggregate({
        where: {
          publishedAt: {
            gte: dateFrom,
            lte: dateTo
          }
        },
        _sum: {
          viewCount: true
        }
      }),

      // Top 10 articles by views
      this.prisma.newsArticle.findMany({
        where: {
          publishedAt: {
            gte: dateFrom,
            lte: dateTo
          }
        },
        orderBy: { viewCount: 'desc' },
        take: 10,
        select: {
          id: true,
          title_en: true,
          viewCount: true,
          publishedAt: true
        }
      }),

      // Articles by category
      this.prisma.newsCategory.findMany({
        include: {
          _count: {
            select: {
              newsArticles: {
                where: {
                  publishedAt: {
                    gte: dateFrom,
                    lte: dateTo
                  }
                }
              }
            }
          }
        }
      })
    ])

    return {
      totalArticles,
      totalViews: totalViews._sum.viewCount || 0,
      averageViewsPerArticle: totalArticles > 0 
        ? Math.round((totalViews._sum.viewCount || 0) / totalArticles) 
        : 0,
      topArticles,
      categoryDistribution: categoryDistribution.map(cat => ({
        category: cat.name_en,
        count: cat._count.newsArticles
      }))
    }
  }
}