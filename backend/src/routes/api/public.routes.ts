import { Router, Request, Response } from 'express';
import { asyncHandler } from '@/middleware/error.middleware';
import { PrismaClient } from '@prisma/client';

const router: Router = Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /api/public/news:
 *   get:
 *     summary: Get public news articles
 *     description: Retrieve published news articles with pagination and filtering
 *     tags: [Public API]
 *     parameters:
 *       - $ref: '#/components/parameters/pageParam'
 *       - $ref: '#/components/parameters/limitParam'
 *       - name: category
 *         in: query
 *         description: Filter by news category
 *         schema:
 *           type: string
 *           enum: [GENERAL, PROGRAMS, EVENTS, ANNOUNCEMENTS]
 *       - name: featured
 *         in: query
 *         description: Filter featured news only
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: News articles retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: NYSC Launches New Youth Program
 *                       slug:
 *                         type: string
 *                         example: nysc-launches-new-youth-program
 *                       excerpt:
 *                         type: string
 *                         example: A brief summary of the news article
 *                       featuredImage:
 *                         type: string
 *                         example: /uploads/news/image.jpg
 *                       category:
 *                         type: string
 *                         example: PROGRAMS
 *                       isFeatured:
 *                         type: boolean
 *                         example: true
 *                       publishedAt:
 *                         type: string
 *                         format: date-time
 *                       author:
 *                         type: object
 *                         properties:
 *                           firstName:
 *                             type: string
 *                             example: John
 *                           lastName:
 *                             type: string
 *                             example: Doe
 *                 pagination:
 *                   $ref: '#/components/schemas/PaginationMeta'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get('/news', asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = Math.min(parseInt(req.query.limit as string) || 20, 50);
  const category = req.query.category as string;
  const featured = req.query.featured === 'true';
  
  const skip = (page - 1) * limit;
  
  const where: any = {
    status: 'PUBLISHED'
  };
  
  if (category) {
    where.category = category;
  }
  
  if (featured) {
    where.featured = true;
  }

  const [news, total] = await Promise.all([
    prisma.newsArticle.findMany({
      where,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        // Note: featuredImage field doesn't exist in NewsArticle model
        category: true,
        featured: true,
        publishedAt: true,
        author: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      },
      orderBy: [
        { featured: 'desc' },
        { publishedAt: 'desc' }
      ],
      skip,
      take: limit
    }),
    prisma.newsArticle.count({ where })
  ]);

  const totalPages = Math.ceil(total / limit);

  res.json({
    success: true,
    data: news,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    }
  });
}));

/**
 * @swagger
 * /api/public/news/{slug}:
 *   get:
 *     summary: Get news article by slug
 *     description: Retrieve a specific published news article by its slug
 *     tags: [Public API]
 *     parameters:
 *       - name: slug
 *         in: path
 *         required: true
 *         description: News article slug
 *         schema:
 *           type: string
 *           example: nysc-launches-new-youth-program
 *     responses:
 *       200:
 *         description: News article retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: NYSC Launches New Youth Program
 *                     slug:
 *                       type: string
 *                       example: nysc-launches-new-youth-program
 *                     content:
 *                       type: string
 *                       example: Full content of the news article
 *                     excerpt:
 *                       type: string
 *                       example: A brief summary of the news article
 *                     featuredImage:
 *                       type: string
 *                       example: /uploads/news/image.jpg
 *                     category:
 *                       type: string
 *                       example: PROGRAMS
 *                     publishedAt:
 *                       type: string
 *                       format: date-time
 *                     author:
 *                       type: object
 *                       properties:
 *                         firstName:
 *                           type: string
 *                           example: John
 *                         lastName:
 *                           type: string
 *                           example: Doe
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get('/news/:slug', asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;

  const article = await prisma.newsArticle.findFirst({
    where: {
      slug,
      status: 'PUBLISHED'
    },
    select: {
      id: true,
      title: true,
      slug: true,
      content: true,
      excerpt: true,
      // Note: featuredImage field doesn't exist in NewsArticle model
      category: true,
      publishedAt: true,
      author: {
        select: {
          firstName: true,
          lastName: true
        }
      }
    }
  });

  if (!article) {
    res.status(404).json({
      success: false,
      error: {
        code: 'ARTICLE_NOT_FOUND',
        message: 'News article not found'
      }
    });
    return;
  }

  res.json({
    success: true,
    data: article
  });
}));

/**
 * @swagger
 * /api/public/events:
 *   get:
 *     summary: Get public events
 *     description: Retrieve published events with pagination and filtering
 *     tags: [Public API]
 *     parameters:
 *       - $ref: '#/components/parameters/pageParam'
 *       - $ref: '#/components/parameters/limitParam'
 *       - name: upcoming
 *         in: query
 *         description: Filter upcoming events only
 *         schema:
 *           type: boolean
 *           default: true
 *       - name: category
 *         in: query
 *         description: Filter by event category
 *         schema:
 *           type: string
 *           enum: [WORKSHOP, SEMINAR, SPORTS, CULTURAL, COMMUNITY]
 *     responses:
 *       200:
 *         description: Events retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: Youth Leadership Workshop
 *                       description:
 *                         type: string
 *                         example: A comprehensive workshop on leadership skills
 *                       eventDate:
 *                         type: string
 *                         format: date-time
 *                       endDate:
 *                         type: string
 *                         format: date-time
 *                       location:
 *                         type: string
 *                         example: NYSC Headquarters, Colombo
 *                       category:
 *                         type: string
 *                         example: WORKSHOP
 *                       maxParticipants:
 *                         type: integer
 *                         example: 50
 *                       registrationDeadline:
 *                         type: string
 *                         format: date-time
 *                 pagination:
 *                   $ref: '#/components/schemas/PaginationMeta'
 */
router.get('/events', asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = Math.min(parseInt(req.query.limit as string) || 20, 50);
  const upcoming = req.query.upcoming !== 'false'; // Default to true
  const category = req.query.category as string;
  
  const skip = (page - 1) * limit;
  const now = new Date();
  
  const where: any = {
    status: 'PUBLISHED'
  };
  
  if (upcoming) {
    where.eventDate = { gte: now };
  }
  
  if (category) {
    where.category = category;
  }

  const [events, total] = await Promise.all([
    prisma.event.findMany({
      where,
      select: {
        id: true,
        title: true,
        description: true,
        eventDate: true,
        endDate: true,
        location: true,
        // Note: category field doesn't exist in Event model
        capacity: true,
        registrationDeadline: true
      },
      orderBy: {
        eventDate: 'asc'
      },
      skip,
      take: limit
    }),
    prisma.event.count({ where })
  ]);

  const totalPages = Math.ceil(total / limit);

  res.json({
    success: true,
    data: events,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    }
  });
}));

/**
 * @swagger
 * /api/public/programs:
 *   get:
 *     summary: Get public programs
 *     description: Retrieve active programs with pagination
 *     tags: [Public API]
 *     parameters:
 *       - $ref: '#/components/parameters/pageParam'
 *       - $ref: '#/components/parameters/limitParam'
 *       - name: type
 *         in: query
 *         description: Filter by program type
 *         schema:
 *           type: string
 *           enum: [SKILLS, SPORTS, ARTS, LEADERSHIP, COMMUNITY]
 *       - name: available
 *         in: query
 *         description: Filter programs with available slots
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Programs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: Digital Skills Training
 *                       description:
 *                         type: string
 *                         example: Comprehensive training in digital skills
 *                       type:
 *                         type: string
 *                         example: SKILLS
 *                       duration:
 *                         type: string
 *                         example: 3 months
 *                       maxParticipants:
 *                         type: integer
 *                         example: 30
 *                       currentParticipants:
 *                         type: integer
 *                         example: 15
 *                       registrationOpen:
 *                         type: boolean
 *                         example: true
 *                       fee:
 *                         type: number
 *                         example: 5000
 *                 pagination:
 *                   $ref: '#/components/schemas/PaginationMeta'
 */
router.get('/programs', asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = Math.min(parseInt(req.query.limit as string) || 20, 50);
  const type = req.query.type as string;
  const available = req.query.available === 'true';
  
  const skip = (page - 1) * limit;
  
  const where: any = {
    status: 'PUBLISHED'
  };
  
  // Note: type field doesn't exist in Program model
  // Programs can be filtered by other criteria if needed
  
  if (available) {
    // Filter by programs that have available slots
    // Note: registrationOpen field doesn't exist, using applicationDeadline instead
    where.applicationDeadline = { gte: new Date() };
  }

  const [programs, total] = await Promise.all([
    prisma.program.findMany({
      where,
      select: {
        id: true,
        name: true,
        description: true,
        // Note: type field doesn't exist in Program model
        duration: true,
        maxParticipants: true,
        currentParticipants: true,
        applicationDeadline: true,
        fee: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take: limit
    }),
    prisma.program.count({ where })
  ]);

  const totalPages = Math.ceil(total / limit);

  res.json({
    success: true,
    data: programs,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    }
  });
}));

export default router;