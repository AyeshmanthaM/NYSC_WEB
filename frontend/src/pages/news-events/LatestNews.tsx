import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, Eye, Tag, Search, Filter, TrendingUp, Heart, Share2,
  Bookmark, ChevronRight, Bell, ExternalLink, Grid, List, Star
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor } from '../../config/colors';
import PageLayout from '../../components/layout/PageLayout';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  category: string;
  readTime: string;
  views: number;
  likes: number;
  image: string;
  tags: string[];
  author: {
    name: string;
    avatar?: string;
    role: string;
  };
  featured?: boolean;
  trending?: boolean;
  urgent?: boolean;
  slug: string;
}

interface Category {
  id: string;
  name: string;
  count: number;
  color: string;
}

const LatestNews: React.FC = () => {
  const { isDark } = useTheme();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'date' | 'views' | 'likes'>('date');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 12;

  // Enhanced sample data with more realistic content
  useEffect(() => {
    const sampleArticles: NewsArticle[] = [
      {
        id: '1',
        title: 'NYSC Launches Revolutionary Digital Skills Initiative for Rural Youth',
        excerpt: 'A groundbreaking program to bridge the digital divide by providing comprehensive technology training to youth in remote areas across all 25 districts of Sri Lanka.',
        date: '2024-01-25',
        category: 'Innovation',
        readTime: '4 min read',
        views: 2453,
        likes: 189,
        image: '/images/news/digital-skills.jpg',
        tags: ['Digital Skills', 'Rural Development', 'Technology', 'Youth Empowerment'],
        author: {
          name: 'Dr. Samitha Perera',
          role: 'Director, Digital Innovation',
          avatar: '/images/authors/samitha.jpg'
        },
        featured: true,
        trending: true,
        slug: 'digital-skills-rural-youth-initiative'
      },
      {
        id: '2',
        title: 'Youth Climate Action Summit: 500+ Participants Drive Environmental Change',
        excerpt: 'Young environmental advocates from across Sri Lanka gather to develop actionable solutions for climate challenges facing the nation.',
        date: '2024-01-24',
        category: 'Environment',
        readTime: '6 min read',
        views: 1876,
        likes: 156,
        image: '/images/news/climate-summit.jpg',
        tags: ['Climate Action', 'Environment', 'Sustainability', 'Youth Leadership'],
        author: {
          name: 'Priya Jayasinghe',
          role: 'Environmental Coordinator',
          avatar: '/images/authors/priya.jpg'
        },
        featured: true,
        slug: 'youth-climate-action-summit'
      },
      {
        id: '3',
        title: 'International Student Exchange Program Breaks Records with 200 Participants',
        excerpt: 'NYSC\'s international exchange program reaches new heights as Sri Lankan students prepare for cultural immersion programs across 15 countries.',
        date: '2024-01-23',
        category: 'International',
        readTime: '5 min read',
        views: 1654,
        likes: 143,
        image: '/images/news/student-exchange.jpg',
        tags: ['International', 'Exchange Program', 'Cultural Exchange', 'Global Opportunities'],
        author: {
          name: 'Ravi Fernando',
          role: 'International Affairs Manager',
          avatar: '/images/authors/ravi.jpg'
        },
        urgent: true,
        slug: 'international-exchange-program-record'
      },
      {
        id: '4',
        title: 'Vocational Training Centers Report 95% Employment Success Rate',
        excerpt: 'NYSC\'s vocational training programs achieve unprecedented success with nearly all graduates securing employment within six months of completion.',
        date: '2024-01-22',
        category: 'Training',
        readTime: '3 min read',
        views: 2187,
        likes: 234,
        image: '/images/news/vocational-success.jpg',
        tags: ['Vocational Training', 'Employment', 'Success Stories', 'Career Development'],
        author: {
          name: 'Nimal Silva',
          role: 'Training Division Head',
          avatar: '/images/authors/nimal.jpg'
        },
        trending: true,
        slug: 'vocational-training-employment-success'
      },
      {
        id: '5',
        title: 'Youth Entrepreneurship Program Launches 150 New Startups in 2024',
        excerpt: 'Young entrepreneurs supported by NYSC\'s incubation program are creating innovative solutions while generating employment opportunities nationwide.',
        date: '2024-01-21',
        category: 'Entrepreneurship',
        readTime: '7 min read',
        views: 1432,
        likes: 98,
        image: '/images/news/entrepreneurship.jpg',
        tags: ['Entrepreneurship', 'Startups', 'Innovation', 'Job Creation'],
        author: {
          name: 'Kamala Wijesinghe',
          role: 'Business Development Coordinator',
          avatar: '/images/authors/kamala.jpg'
        },
        slug: 'youth-entrepreneurship-startups-2024'
      },
      {
        id: '6',
        title: 'National Youth Arts Festival Showcases Talent from All Provinces',
        excerpt: 'Celebrating creativity and cultural diversity, the annual festival brings together young artists, musicians, and performers from every corner of Sri Lanka.',
        date: '2024-01-20',
        category: 'Arts & Culture',
        readTime: '4 min read',
        views: 987,
        likes: 76,
        image: '/images/news/arts-festival.jpg',
        tags: ['Arts', 'Culture', 'Music', 'Performance', 'Youth Talent'],
        author: {
          name: 'Chamara Perera',
          role: 'Cultural Programs Director',
          avatar: '/images/authors/chamara.jpg'
        },
        slug: 'national-youth-arts-festival'
      }
    ];

    const sampleCategories: Category[] = [
      { id: 'all', name: 'All News', count: sampleArticles.length, color: 'bg-gray-500' },
      { id: 'Innovation', name: 'Innovation & Tech', count: 1, color: 'bg-blue-500' },
      { id: 'Environment', name: 'Environment', count: 1, color: 'bg-green-500' },
      { id: 'International', name: 'International', count: 1, color: 'bg-purple-500' },
      { id: 'Training', name: 'Training & Skills', count: 1, color: 'bg-orange-500' },
      { id: 'Entrepreneurship', name: 'Entrepreneurship', count: 1, color: 'bg-red-500' },
      { id: 'Arts & Culture', name: 'Arts & Culture', count: 1, color: 'bg-pink-500' }
    ];

    setArticles(sampleArticles);
    setCategories(sampleCategories);
  }, []);

  // Filter and sort articles
  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    switch (sortBy) {
      case 'views':
        return b.views - a.views;
      case 'likes':
        return b.likes - a.likes;
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedArticles.length / articlesPerPage);
  const currentArticles = sortedArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "News & Events", href: "/news-events" },
    { label: "Latest News" }
  ];

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const NewsCard = ({ article, isLarge = false }: { article: NewsArticle; isLarge?: boolean }) => (
    <article className={`group ${getThemeColor('card.primary', isDark)} rounded-2xl overflow-hidden border ${getThemeColor('border.primary', isDark)} hover:shadow-xl transition-all duration-300 hover:scale-[1.02]`}>
      {/* Image */}
      <div className={`relative ${isLarge ? 'aspect-[16/9]' : 'aspect-video'} bg-gradient-to-br from-primary-400 to-secondary-500 overflow-hidden`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`${isLarge ? 'text-8xl' : 'text-6xl'} opacity-20 text-white`}>
            📰
          </div>
        </div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold text-white backdrop-blur-sm ${
            categories.find(cat => cat.id === article.category)?.color || 'bg-gray-500'
          }/80`}>
            {article.category}
          </span>
          {article.featured && (
            <span className="px-3 py-1 bg-yellow-500 text-white rounded-full text-sm font-bold">
              ⭐ FEATURED
            </span>
          )}
          {article.trending && (
            <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-bold">
              🔥 TRENDING
            </span>
          )}
          {article.urgent && (
            <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-bold animate-pulse">
              🚨 URGENT
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
            <Heart className="w-4 h-4 text-white" />
          </button>
          <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
            <Share2 className="w-4 h-4 text-white" />
          </button>
          <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
            <Bookmark className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={`p-6 ${isLarge ? 'lg:p-8' : ''}`}>
        {/* Meta Information */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4 text-sm">
            <div className={`flex items-center gap-1 ${getThemeColor('text.tertiary', isDark)}`}>
              <Calendar className="w-4 h-4" />
              <span>{formatDate(article.date)}</span>
            </div>
            <div className={`flex items-center gap-1 ${getThemeColor('text.tertiary', isDark)}`}>
              <Clock className="w-4 h-4" />
              <span>{article.readTime}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className={`flex items-center gap-1 ${getThemeColor('text.tertiary', isDark)}`}>
              <Eye className="w-4 h-4" />
              <span>{article.views.toLocaleString()}</span>
            </div>
            <div className={`flex items-center gap-1 ${getThemeColor('text.tertiary', isDark)}`}>
              <Heart className="w-4 h-4 text-red-500" />
              <span>{article.likes}</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className={`${isLarge ? 'text-2xl lg:text-3xl' : 'text-xl'} font-bold mb-3 ${
          getThemeColor('text.primary', isDark)
        } group-hover:text-primary-500 transition-colors line-clamp-2`}>
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className={`${isLarge ? 'text-lg' : 'text-base'} mb-4 leading-relaxed ${
          getThemeColor('text.secondary', isDark)
        } line-clamp-3`}>
          {article.excerpt}
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
            {article.author.name.charAt(0)}
          </div>
          <div>
            <p className={`text-sm font-medium ${getThemeColor('text.primary', isDark)}`}>
              {article.author.name}
            </p>
            <p className={`text-xs ${getThemeColor('text.tertiary', isDark)}`}>
              {article.author.role}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.slice(0, 3).map((tag) => (
            <span key={tag} className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
              isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
            } hover:bg-primary-500 hover:text-white transition-colors cursor-pointer`}>
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
          {article.tags.length > 3 && (
            <span className={`px-2 py-1 text-xs ${getThemeColor('text.tertiary', isDark)}`}>
              +{article.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-semibold transition-colors">
            Read Full Article
            <ChevronRight className="w-4 h-4" />
          </button>
          <div className="flex gap-2">
            <button className="p-2 text-gray-400 hover:text-primary-500 transition-colors">
              <Bell className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-primary-500 transition-colors">
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );

  return (
    <PageLayout 
      title="Latest News" 
      subtitle="Stay up-to-date with the most recent news and developments from NYSC"
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        
        {/* Stats Dashboard */}
        <div className={`${getThemeColor('card.elevated', isDark)} rounded-2xl p-6 mb-8`}>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-blue-500">
                {articles.length}
              </div>
              <div className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                Total Articles
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-green-500">
                {articles.filter(a => a.trending).length}
              </div>
              <div className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                Trending Now
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-purple-500">
                {articles.reduce((sum, article) => sum + article.views, 0).toLocaleString()}
              </div>
              <div className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                Total Views
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-orange-500">
                {categories.length - 1}
              </div>
              <div className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                Categories
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 mb-8`}>
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles, tags, authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg ${getThemeColor('background.tertiary', isDark)} ${getThemeColor('text.primary', isDark)} border ${getThemeColor('border.secondary', isDark)}`}
              />
            </div>

            {/* Controls */}
            <div className="flex gap-3 items-center">
              {/* Sort */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'views' | 'likes')}
                  className={`px-3 py-2 rounded-lg ${getThemeColor('background.tertiary', isDark)} ${getThemeColor('text.primary', isDark)} border ${getThemeColor('border.secondary', isDark)}`}
                >
                  <option value="date">Latest First</option>
                  <option value="views">Most Viewed</option>
                  <option value="likes">Most Liked</option>
                </select>
              </div>

              {/* View Mode */}
              <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white dark:bg-gray-600 shadow' : ''}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow' : ''}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-primary-500 text-white shadow-lg'
                    : `${getThemeColor('background.tertiary', isDark)} ${getThemeColor('text.secondary', isDark)} hover:bg-primary-500 hover:text-white`
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-2xl font-bold ${getThemeColor('text.primary', isDark)}`}>
            {selectedCategory === 'all' ? 'All News' : categories.find(c => c.id === selectedCategory)?.name}
            <span className={`text-lg font-normal ml-2 ${getThemeColor('text.tertiary', isDark)}`}>
              ({filteredArticles.length} articles)
            </span>
          </h2>
          
          {/* Trending Indicator */}
          {articles.some(a => a.trending) && (
            <div className="flex items-center gap-2 px-3 py-2 bg-green-500/10 text-green-600 dark:text-green-400 rounded-lg">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">
                {articles.filter(a => a.trending).length} trending
              </span>
            </div>
          )}
        </div>

        {/* Articles Grid */}
        {currentArticles.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <Search className={`w-8 h-8 ${getThemeColor('text.tertiary', isDark)}`} />
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${getThemeColor('text.primary', isDark)}`}>
              No articles found
            </h3>
            <p className={`${getThemeColor('text.secondary', isDark)} mb-4`}>
              Try adjusting your search criteria or browse different categories
            </p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
            >
              Show All Articles
            </button>
          </div>
        ) : (
          <>
            {/* Featured Article (if exists and on first page) */}
            {currentPage === 1 && currentArticles.some(article => article.featured) && (
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                  <Star className="w-6 h-6 text-yellow-500" />
                  <h3 className={`text-xl font-bold ${getThemeColor('text.primary', isDark)}`}>
                    Featured Story
                  </h3>
                </div>
                {currentArticles.filter(article => article.featured).slice(0, 1).map(article => (
                  <NewsCard key={article.id} article={article} isLarge={true} />
                ))}
              </div>
            )}

            {/* Regular Articles Grid */}
            <div className={`grid gap-8 ${
              viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
            }`}>
              {currentArticles
                .filter(article => currentPage > 1 || !article.featured)
                .map(article => (
                  <NewsCard key={article.id} article={article} />
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    currentPage === 1
                      ? 'opacity-50 cursor-not-allowed'
                      : `${getThemeColor('border.primary', isDark)} ${getThemeColor('text.primary', isDark)} hover:bg-primary-500 hover:text-white hover:border-primary-500`
                  }`}
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      currentPage === page
                        ? 'bg-primary-500 text-white border-primary-500'
                        : `${getThemeColor('border.primary', isDark)} ${getThemeColor('text.primary', isDark)} hover:bg-primary-500 hover:text-white hover:border-primary-500`
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    currentPage === totalPages
                      ? 'opacity-50 cursor-not-allowed'
                      : `${getThemeColor('border.primary', isDark)} ${getThemeColor('text.primary', isDark)} hover:bg-primary-500 hover:text-white hover:border-primary-500`
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </PageLayout>
  );
};

export default LatestNews;