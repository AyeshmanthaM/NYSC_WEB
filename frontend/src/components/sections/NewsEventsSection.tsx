import { useState, useEffect } from 'react';
import { Calendar, MapPin, ArrowRight, Eye, TrendingUp, Clock, Share2, Bookmark, Heart, Send, Bell, Mail, Users, Image, Camera, Play } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useMultipleNamespaces } from '../../hooks/useTranslationWithNamespace';
import { useModernLanguage } from '../../contexts/ModernLanguageContext';
import { colors, getThemeColor } from '../../config/colors';

const NewsEventsSection = () => {
  const { isDark } = useTheme();
  const { t, ready } = useMultipleNamespaces(['newsevents', 'common']);
  const { currentLanguage } = useModernLanguage();
  const [hoveredNews, setHoveredNews] = useState<number | null>(null);
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);
  const [bookmarkedItems, setBookmarkedItems] = useState<Set<number>>(new Set());
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  // Auto-rotate news for better engagement
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % news.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Toggle bookmark
  const toggleBookmark = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Toggle like
  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Enhanced news data with engagement metrics
  const news = [
    {
      id: 1,
      title: 'NYSC Digital Skills Program Reaches 5,000 Youth',
      summary: 'The revolutionary digital literacy initiative has successfully trained over 5,000 young people in coding, web development, and digital marketing skills across 15 districts.',
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      date: '2024-02-08',
      publisher: 'NYSC Communications',
      category: 'Technology',
      tag: 'Program Launch',
      readTime: '3 min read',
      views: 2847,
      likes: 156,
      trending: true,
      featured: true
    },
    {
      id: 2,
      title: 'Youth Leadership Summit Sets New Participation Record',
      summary: 'This year\'s annual summit attracted over 2,500 young leaders from across Sri Lanka, featuring workshops on innovation, entrepreneurship, and social impact.',
      image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      date: '2024-02-06',
      publisher: 'Event Management Team',
      category: 'Leadership',
      tag: 'Event',
      readTime: '2 min read',
      views: 1923,
      likes: 98,
      trending: true,
      featured: false
    },
    {
      id: 3,
      title: 'Community Heroes Honored at Annual Awards Ceremony',
      summary: 'Twenty outstanding youth who have made significant contributions to their communities were recognized for their dedication to social development and community service.',
      image: 'https://images.pexels.com/photos/1157394/pexels-photo-1157394.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      date: '2024-02-04',
      publisher: 'Awards Committee',
      category: 'Community',
      tag: 'Achievement',
      readTime: '4 min read',
      views: 1654,
      likes: 89,
      trending: false,
      featured: false
    },
    {
      id: 4,
      title: 'Sports Development Program Expands to Rural Areas',
      summary: 'NYSC launches new sports facilities and training programs in 25 rural districts, focusing on cricket, football, and traditional Sri Lankan sports.',
      image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      date: '2024-02-02',
      publisher: 'Sports Division',
      category: 'Sports',
      tag: 'Sport',
      readTime: '5 min read',
      views: 2156,
      likes: 134,
      trending: true,
      featured: false
    },
    {
      id: 5,
      title: 'Cultural Heritage Festival Celebrates Diversity',
      summary: 'A three-day festival showcasing Sri Lanka\'s rich cultural diversity attracted over 10,000 visitors with traditional performances, art exhibitions, and food stalls.',
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      date: '2024-01-31',
      publisher: 'Cultural Affairs',
      category: 'Culture',
      tag: 'Cultural',
      readTime: '3 min read',
      views: 1432,
      likes: 76,
      trending: false,
      featured: false
    },
    {
      id: 6,
      title: 'Environmental Initiative Plants 50,000 Trees',
      summary: 'Youth volunteers from across the island participated in a massive reforestation drive, planting native species in degraded forest areas.',
      image: 'https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      date: '2024-01-29',
      publisher: 'Environmental Team',
      category: 'Environment',
      tag: 'Environment',
      readTime: '4 min read',
      views: 1789,
      likes: 112,
      trending: false,
      featured: false
    }
  ];

  // Helper function to get category color
  const getCategoryColor = (tag: string) => {
    const colors: { [key: string]: string } = {
      'Sport': 'bg-green-500 text-white',
      'Achievement': 'bg-yellow-500 text-white',
      'Event': 'bg-blue-500 text-white',
      'Program Launch': 'bg-purple-500 text-white',
      'Cultural': 'bg-pink-500 text-white',
      'Environment': 'bg-emerald-500 text-white',
      'Technology': 'bg-indigo-500 text-white',
      'Leadership': 'bg-orange-500 text-white',
      'Community': 'bg-teal-500 text-white'
    };
    return colors[tag] || 'bg-gray-500 text-white';
  };

  const events = [
    {
      id: 60,
      title: 'Youth එක Clean වෙන ආදර පෙබරවාරිය',
      date: '2025-02-14',
      location: 'National Youth Services Council Maharagama',
      image: 'https://www.nysc.lk/upload/event/-96906247433_94296893473_1739420495_n.jpg',
      link: 'https://www.nysc.lk/events/view/NjA=',
      featured: true,
      type: 'upcoming'
    },
    {
      id: 59,
      title: 'International Youth Film Festival 2024',
      date: '2024-11-18',
      location: 'Tower Hall Theatre',
      image: 'https://www.nysc.lk/upload/event/-182398690115_8804450791_1731921495_n.jpg',
      link: 'https://www.nysc.lk/events/view/NTk=',
      featured: false,
      type: 'recent'
    },
    {
      id: 58,
      title: 'SMART YOUTH EXHIBITION 2024',
      date: '2024-06-28',
      location: 'Kuliyapitiya',
      image: 'https://www.nysc.lk/upload/event/-33582906584_157620234322_1719464796_n.jpg',
      link: 'https://www.nysc.lk/events/view/NTg=',
      featured: false,
      type: 'past'
    }
  ];

  // Show loading state while translations are not ready
  if (!ready) {
    return (
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-20 relative overflow-hidden ${getThemeColor('background.gradient.subtle', isDark)}`}>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${isDark ? '1aa79e' : '6366f1'}' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='2'/%3E%3Ccircle cx='53' cy='7' r='2'/%3E%3Ccircle cx='7' cy='53' r='2'/%3E%3Ccircle cx='53' cy='53' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Latest News Section */}
        <div className="mb-20">
          {/* Enhanced Header with Stats */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
            <div className="mb-6 lg:mb-0">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-3 rounded-xl ${getThemeColor('background.gradient.brand', isDark)} backdrop-blur-sm`}>
                  <TrendingUp className={`w-6 h-6 ${colors.brand.primary.text}`} />
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-nysc-primary/10 to-nysc-secondary/10 border border-nysc-primary/20 backdrop-blur-md">
                  <TrendingUp className="w-4 h-4 text-nysc-primary" />
                  <span className="text-sm font-medium text-nysc-primary">{t('newsevents:news.badge')}</span>
                </div>
              </div>
              <h2 className={`text-5xl font-bold mb-4 ${getThemeColor('text.primary', isDark)} leading-tight`}>
                {t('newsevents:news.title')} <span className={colors.brand.gradient.text}>{t('newsevents:news.titleHighlight')}</span>
              </h2>
              <p className={`text-lg ${getThemeColor('text.secondary', isDark)} max-w-2xl`}>
                {t('newsevents:news.subtitle')}
              </p>
            </div>

            {/* Enhanced CTA */}
            <div className="flex flex-col items-start lg:items-end space-y-4">
              <div className={`text-sm ${getThemeColor('text.muted', isDark)}`}>
                {t('newsevents:news.updated')} {new Date().toLocaleDateString(currentLanguage === 'si' ? 'si-LK' : currentLanguage === 'ta' ? 'ta-LK' : 'en-US', {
                  weekday: 'long',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
              <a
                href="/news"
                className={`group inline-flex items-center space-x-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${colors.button.primary.base} ${colors.button.primary.shadow}`}
              >
                <span>{t('newsevents:news.exploreAll')}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Enhanced News Cards */}
          <div className="relative">
            {/* Desktop Grid */}
            <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {news.slice(0, 4).map((article, index) => (
                <article
                  key={article.id}
                  className={`group cursor-pointer rounded-3xl overflow-hidden transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 relative ${getThemeColor('card.primary', isDark)} border ${getThemeColor('border.subtle', isDark)} ${colors?.hover?.border?.brand || 'hover:border-[#1aa79e]'} ${colors?.hover?.shadow?.brand || 'hover:shadow-[#1aa79e]/25'} backdrop-blur-sm`}
                  onMouseEnter={() => setHoveredNews(article.id)}
                  onMouseLeave={() => setHoveredNews(null)}
                  style={{
                    animationDelay: `${index * 150}ms`
                  }}
                >
                  {/* Enhanced Trending Badge - Top Right Corner */}
                  {article.trending && (
                    <div className="absolute top-3 right-3 z-30">
                      <div className="relative">
                        {/* Pulsing ring effect */}
                        <div className={`absolute inset-0 ${colors.brand.gradient.primary} rounded-full`}></div>

                        {/* Main trending badge */}
                        <div className={`relative ${colors.button.primary.base} px-3 py-1.5 rounded-full text-xs font-bold flex items-center space-x-1.5 shadow-lg transform hover:scale-110 transition-all duration-300 backdrop-blur-sm`}>
                          <TrendingUp className="w-3.5 h-3.5 animate-bounce" />
                          <span className="font-extrabold tracking-wide">{t('newsevents:news.trending')}</span>
                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                        </div>

                        {/* Sparkle effects */}
                        <div className="absolute -top-1 -left-1 w-2.5 h-2.5 text-yellow-300 animate-pulse text-xs">✨</div>
                        <div className="absolute -bottom-1 -right-1 w-2 h-2 text-yellow-300 animate-pulse delay-500 text-xs">⭐</div>
                      </div>
                    </div>
                  )}

                  {/* Featured Badge - Positioned Below Trending */}
                  {article.featured && (
                    <div className={`absolute right-3 z-20 ${article.trending ? 'top-16' : 'top-3'}`}>
                      <div className="bg-gradient-to-r from-[#f38621] to-[#1aa79e] text-white px-3 py-1.5 rounded-full text-xs font-bold floating-badge flex items-center space-x-1.5 shadow-lg backdrop-blur-sm">
                        <span className="text-xs">⭐</span>
                        <span className="font-extrabold tracking-wide">{t('newsevents:news.featured')}</span>
                      </div>
                    </div>
                  )}

                  {/* Image Container */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.src = '/images/default-news.jpg';
                      }}
                    />

                    {/* Enhanced Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-300" />

                    {/* Category Tag */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-2 rounded-full text-xs font-bold backdrop-blur-md ${getCategoryColor(article.tag)} shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                        {article.tag}
                      </span>
                    </div>

                    {/* Engagement Stats Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between text-white text-sm">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                            <Eye className="w-3 h-3" />
                            <span className="text-xs font-medium">{article.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                            <Heart className={`w-3 h-3 ${likedItems.has(article.id) ? 'fill-red-500 text-red-500' : ''}`} />
                            <span className="text-xs font-medium">{article.likes + (likedItems.has(article.id) ? 1 : 0)}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                          <Clock className="w-3 h-3" />
                          <span className="text-xs font-medium">{article.readTime.replace('min read', t('newsevents:news.readTime'))}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Content */}
                  <div className="p-6">
                    {/* Headline */}
                    <h3 className={`font-bold text-lg mb-3 line-clamp-2 leading-tight transition-all duration-300 ${getThemeColor('text.primary', isDark)} ${colors.hover.text.brand}`}>
                      {article.title}
                    </h3>

                    {/* Summary */}
                    <p className={`text-sm leading-relaxed mb-4 line-clamp-3 transition-colors ${getThemeColor('text.secondary', isDark)}`}>
                      {article.summary}
                    </p>

                    {/* Enhanced Metadata */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`flex items-center space-x-2 text-xs ${getThemeColor('text.muted', isDark)}`}>
                        <span className="font-medium">{article.publisher}</span>
                        <span>•</span>
                        <span>{new Date(article.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}</span>
                      </div>
                    </div>

                    {/* Interactive Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => toggleLike(article.id, e)}
                          className={`p-2 rounded-full transition-all duration-200 transform hover:scale-110 ${likedItems.has(article.id)
                              ? 'text-red-500 bg-red-50 dark:bg-red-500/10'
                              : isDark
                                ? 'text-gray-400 hover:text-red-400 hover:bg-red-500/10'
                                : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                            }`}
                        >
                          <Heart className={`w-4 h-4 ${likedItems.has(article.id) ? 'fill-current' : ''}`} />
                        </button>
                        <button
                          onClick={(e) => toggleBookmark(article.id, e)}
                          className={`p-2 rounded-full transition-all duration-200 transform hover:scale-110 ${bookmarkedItems.has(article.id)
                              ? 'text-[#1aa79e] bg-[#1aa79e]/10'
                              : isDark
                                ? 'text-gray-400 hover:text-[#1aa79e] hover:bg-[#1aa79e]/10'
                                : 'text-gray-400 hover:text-[#1aa79e] hover:bg-[#1aa79e]/10'
                            }`}
                        >
                          <Bookmark className={`w-4 h-4 ${bookmarkedItems.has(article.id) ? 'fill-current' : ''}`} />
                        </button>
                        <button className={`p-2 rounded-full transition-all duration-200 transform hover:scale-110 ${isDark ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                          }`}>
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className={`text-xs px-3 py-1 rounded-full ${getThemeColor('badge.secondary', isDark)}`}>
                        {hoveredNews === article.id ? t('newsevents:news.clickToRead') : t('newsevents:news.hoverToPreview')}
                      </div>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className={`absolute inset-0 rounded-3xl ${colors.background.gradient.brand.light} blur-xl`} />
                  </div>
                </article>
              ))}
            </div>

            {/* Mobile/Tablet Horizontal Scroll */}
            <div className="lg:hidden">
              <div className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory">
                {news.map((article) => (
                  <article
                    key={article.id}
                    className={`group cursor-pointer flex-shrink-0 w-80 rounded-2xl overflow-hidden transition-all duration-300 snap-start ${getThemeColor('card.primary', isDark)}`}
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src = '/images/default-news.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                      {/* Category Tag */}
                      <div className="absolute top-3 left-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.tag)}`}>
                          {article.tag}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Headline */}
                      <h3 className={`font-bold text-lg mb-3 line-clamp-2 leading-tight ${getThemeColor('text.primary', isDark)}`}>
                        {article.title}
                      </h3>

                      {/* Summary */}
                      <p className={`text-sm leading-relaxed mb-4 line-clamp-3 ${getThemeColor('text.secondary', isDark)}`}>
                        {article.summary}
                      </p>

                      {/* Metadata */}
                      <div className={`flex items-center justify-between text-xs ${getThemeColor('text.muted', isDark)}`}>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{article.publisher}</span>
                          <span>•</span>
                          <span>{new Date(article.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}</span>
                        </div>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Events Section */}
        <div>
          {/* Enhanced Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
            <div className="mb-6 lg:mb-0">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-3 rounded-xl ${getThemeColor('background.gradient.brand', isDark)} backdrop-blur-sm`}>
                  <Calendar className={`w-6 h-6 ${colors.brand.primary.text}`} />
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-nysc-primary/10 to-nysc-secondary/10 border border-nysc-primary/20 backdrop-blur-md">
                  <Calendar className="w-4 h-4 text-nysc-primary" />
                  <span className="text-sm font-medium text-nysc-primary">{t('newsevents:events.badge')}</span>
                </div>
              </div>
              <h2 className={`text-5xl font-bold mb-4 ${getThemeColor('text.primary', isDark)} leading-tight`}>
                {t('newsevents:events.title')} <span className={colors.brand.gradient.text}>{t('newsevents:events.titleHighlight')}</span>
              </h2>
              <p className={`text-lg ${getThemeColor('text.secondary', isDark)} max-w-2xl`}>
                {t('newsevents:events.subtitle')}
              </p>
            </div>

            {/* Enhanced CTA */}
            <div className="flex flex-col items-start lg:items-end space-y-4">
              <div className={`text-sm ${getThemeColor('text.muted', isDark)}`}>
                {t('newsevents:events.nextEvent')} {Math.ceil((new Date(events[0]?.date || new Date()).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} {t('newsevents:events.days')}
              </div>
              <a
                href="https://www.nysc.lk/events"
                target="_blank"
                rel="noopener noreferrer"
                className={`group inline-flex items-center space-x-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${colors.button.primary.base} ${colors.button.primary.shadow}`}
              >
                <span>{t('newsevents:events.viewAll')}</span>
                <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </a>
            </div>
          </div>

          {/* Enhanced Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event, index) => (
              <div
                key={event.id}
                className={`group cursor-pointer rounded-3xl overflow-hidden transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 relative ${getThemeColor('card.primary', isDark)} border ${getThemeColor('border.subtle', isDark)} ${colors.hover.border.brand} ${colors.hover.shadow.brand} backdrop-blur-sm event-card`}
                onClick={() => window.open(event.link, '_blank')}
                onMouseEnter={() => setHoveredEvent(event.id)}
                onMouseLeave={() => setHoveredEvent(null)}
                style={{
                  animationDelay: `${index * 200}ms`
                }}
              >
                {/* Featured Badge - Positioned like news section */}
                {event.featured && (
                  <div className="absolute right-3 top-3 z-20">
                    <div className="bg-gradient-to-r from-[#f38621] to-[#1aa79e] text-white px-3 py-1.5 rounded-full text-xs font-bold floating-badge flex items-center space-x-1.5 shadow-lg backdrop-blur-sm">
                      <span className="text-xs">⭐</span>
                      <span className="font-extrabold tracking-wide">{t('newsevents:events.featured')}</span>
                    </div>
                  </div>
                )}

                {/* Enhanced Image Container */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.currentTarget.src = '/images/default-event.jpg';
                    }}
                  />

                  {/* Enhanced Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-300" />

                  {/* Event Type Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-2 rounded-full text-xs font-bold backdrop-blur-md shadow-lg transform group-hover:scale-110 transition-transform duration-300 ${event.type === 'upcoming'
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                        : event.type === 'recent'
                          ? 'bg-gradient-to-r from-[#1aa79e] to-blue-600 text-white'
                          : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
                      }`}>
                      {t(`newsevents:events.types.${event.type}`)}
                    </span>
                  </div>

                  {/* Enhanced Date Display */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className={`${getThemeColor('card.secondary', isDark)} backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Calendar className={`w-4 h-4 ${colors.brand.primary.text}`} />
                          <span className={`text-sm font-bold ${getThemeColor('text.primary', isDark)}`}>
                            {new Date(event.date).toLocaleDateString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className={`text-xs ${colors.brand.secondary.text} font-medium`}>
                          {new Date(event.date).getFullYear()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Indicator - Moved to avoid overlap */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-[#1aa79e]/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                      {t('newsevents:events.clickToView')}
                    </div>
                  </div>
                </div>

                {/* Enhanced Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className={`font-bold text-lg mb-3 line-clamp-2 leading-tight transition-all duration-300 ${getThemeColor('text.primary', isDark)} ${colors.hover.text.brand}`}>
                    {event.title}
                  </h3>

                  {/* Location with Enhanced Icon */}
                  <div className={`flex items-center space-x-2 text-sm mb-4 ${getThemeColor('text.secondary', isDark)}`}>
                    <div className={`p-1 rounded-full ${colors.brand.secondary.bg}/10`}>
                      <MapPin className={`w-4 h-4 ${colors.brand.secondary.text}`} />
                    </div>
                    <span className="font-medium">{event.location}</span>
                  </div>

                  {/* Interactive Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(event.id, e);
                        }}
                        className={`p-2 rounded-full transition-all duration-200 transform hover:scale-110 ${bookmarkedItems.has(event.id)
                            ? 'text-[#1aa79e] bg-[#1aa79e]/10'
                            : isDark
                              ? 'text-gray-400 hover:text-[#1aa79e] hover:bg-[#1aa79e]/10'
                              : 'text-gray-400 hover:text-[#1aa79e] hover:bg-[#1aa79e]/10'
                          }`}
                      >
                        <Bookmark className={`w-4 h-4 ${bookmarkedItems.has(event.id) ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Share functionality
                        }}
                        className={`p-2 rounded-full transition-all duration-200 transform hover:scale-110 ${isDark ? 'text-gray-400 hover:text-[#f38621] hover:bg-[#f38621]/10' : 'text-gray-400 hover:text-[#f38621] hover:bg-[#f38621]/10'
                          }`}
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Enhanced Action Button */}
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${getThemeColor('text.secondary', isDark)}`}>
                        {hoveredEvent === event.id ? t('newsevents:events.viewDetails') : t('newsevents:events.learnMore')}
                      </span>
                      <ArrowRight className={`w-4 h-4 ${colors.brand.primary.text} group-hover:translate-x-1 transition-transform`} />
                    </div>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className={`absolute inset-0 rounded-3xl ${colors.background.gradient.brand.light} blur-xl`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Showcase Section */}
        <div className="my-10">
          {/* Enhanced Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
            <div className="mb-6 lg:mb-0">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-3 rounded-xl ${getThemeColor('background.gradient.brand', isDark)} backdrop-blur-sm`}>
                  <Image className={`w-6 h-6 ${colors.brand.primary.text}`} />
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-nysc-primary/10 to-nysc-secondary/10 border border-nysc-primary/20 backdrop-blur-md">
                  <Image className="w-4 h-4 text-nysc-primary" />
                  <span className="text-sm font-medium text-nysc-primary">{t('newsevents:gallery.badge')}</span>
                </div>
              </div>
              <h2 className={`text-5xl font-bold mb-4 ${getThemeColor('text.primary', isDark)} leading-tight`}>
                {t('newsevents:gallery.title')} <span className={colors.brand.gradient.text}>{t('newsevents:gallery.titleHighlight')}</span>
              </h2>
              <p className={`text-lg ${getThemeColor('text.secondary', isDark)} max-w-2xl`}>
                {t('newsevents:gallery.subtitle')}
              </p>
            </div>

            {/* Enhanced CTA */}
            <div className="flex flex-col items-start lg:items-end space-y-4">
              <div className={`text-sm ${getThemeColor('text.muted', isDark)}`}>
                {t('newsevents:gallery.totalPhotos')} 267+ {t('newsevents:gallery.photos')}
              </div>
              <a
                href="/news-events/gallery"
                className={`group inline-flex items-center space-x-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${colors.button.primary.base} ${colors.button.primary.shadow}`}
              >
                <span>{t('newsevents:gallery.viewAll')}</span>
                <Image className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Gallery Preview Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: 1,
                title: t('newsevents:gallery.albums.youthAwards'),
                description: t('newsevents:gallery.albums.youthAwardsDesc'),
                imageCount: 45,
                videoCount: 3,
                category: t('newsevents:gallery.categories.awards'),
                date: 'December 2024',
                featured: true,
                image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop'
              },
              {
                id: 2,
                title: t('newsevents:gallery.albums.culturalFest'),
                description: t('newsevents:gallery.albums.culturalFestDesc'),
                imageCount: 67,
                videoCount: 5,
                category: t('newsevents:gallery.categories.culture'),
                date: 'October 2024',
                featured: false,
                image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop'
              },
              {
                id: 3,
                title: t('newsevents:gallery.albums.sportsProg'),
                description: t('newsevents:gallery.albums.sportsProgDesc'),
                imageCount: 54,
                videoCount: 4,
                category: t('newsevents:gallery.categories.sports'),
                date: 'August 2024',
                featured: false,
                image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop'
              },
              {
                id: 4,
                title: t('newsevents:gallery.albums.leadership'),
                description: t('newsevents:gallery.albums.leadershipDesc'),
                imageCount: 28,
                videoCount: 1,
                category: t('newsevents:gallery.categories.leadership'),
                date: 'September 2024',
                featured: false,
                image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop'
              },
              {
                id: 5,
                title: t('newsevents:gallery.albums.training'),
                description: t('newsevents:gallery.albums.trainingDesc'),
                imageCount: 32,
                videoCount: 2,
                category: t('newsevents:gallery.categories.education'),
                date: 'November 2024',
                featured: false,
                image: 'https://images.pexels.com/photos/1157394/pexels-photo-1157394.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop'
              },
              {
                id: 6,
                title: t('newsevents:gallery.albums.environment'),
                description: t('newsevents:gallery.albums.environmentDesc'),
                imageCount: 41,
                videoCount: 2,
                category: t('newsevents:gallery.categories.environment'),
                date: 'July 2024',
                featured: false,
                image: 'https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop'
              }
            ].slice(0, 6).map((album, index) => (
              <article
                key={album.id}
                className={`group cursor-pointer rounded-3xl overflow-hidden transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 relative ${getThemeColor('card.primary', isDark)} border ${getThemeColor('border.subtle', isDark)} ${colors?.hover?.border?.brand || 'hover:border-[#1aa79e]'} ${colors?.hover?.shadow?.brand || 'hover:shadow-[#1aa79e]/25'} backdrop-blur-sm`}
                style={{
                  animationDelay: `${index * 150}ms`
                }}
              >
                {/* Featured Badge */}
                {album.featured && (
                  <div className="absolute right-3 top-3 z-20">
                    <div className="bg-gradient-to-r from-[#f38621] to-[#1aa79e] text-white px-3 py-1.5 rounded-full text-xs font-bold floating-badge flex items-center space-x-1.5 shadow-lg backdrop-blur-sm">
                      <span className="text-xs">⭐</span>
                      <span className="font-extrabold tracking-wide">{t('newsevents:gallery.featured')}</span>
                    </div>
                  </div>
                )}

                {/* Image Container */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={album.image}
                    alt={album.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.currentTarget.src = '/images/default-gallery.jpg';
                    }}
                  />

                  {/* Enhanced Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-300" />

                  {/* Category Tag */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-2 rounded-full text-xs font-bold backdrop-blur-md shadow-lg transform group-hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-[#1aa79e] to-blue-600 text-white`}>
                      {album.category}
                    </span>
                  </div>

                  {/* Media Stats Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between text-white text-sm">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                          <Camera className="w-3 h-3" />
                          <span className="text-xs font-medium">{album.imageCount}</span>
                        </div>
                        <div className="flex items-center space-x-1 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                          <Play className="w-3 h-3" />
                          <span className="text-xs font-medium">{album.videoCount}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs font-medium">{album.date}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className={`font-bold text-lg mb-3 line-clamp-2 leading-tight transition-all duration-300 ${getThemeColor('text.primary', isDark)} ${colors.hover.text.brand}`}>
                    {album.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-sm leading-relaxed mb-4 line-clamp-2 transition-colors ${getThemeColor('text.secondary', isDark)}`}>
                    {album.description}
                  </p>

                  {/* Interactive Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2">
                      <button
                        className={`p-2 rounded-full transition-all duration-200 transform hover:scale-110 ${isDark
                            ? 'text-gray-400 hover:text-[#1aa79e] hover:bg-[#1aa79e]/10'
                            : 'text-gray-400 hover:text-[#1aa79e] hover:bg-[#1aa79e]/10'
                          }`}
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                      <button className={`p-2 rounded-full transition-all duration-200 transform hover:scale-110 ${isDark ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                        }`}>
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className={`text-xs px-3 py-1 rounded-full ${getThemeColor('badge.secondary', isDark)}`}>
                      {t('newsevents:gallery.clickToView')}
                    </div>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className={`absolute inset-0 rounded-3xl ${colors.background.gradient.brand.light} blur-xl`} />
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Newsletter Subscription Section - Compact Modern Design */}
        <div className={`relative rounded-2xl overflow-hidden backdrop-blur-md border ${getThemeColor('border.subtle', isDark)} shadow-lg mt-12 mb-6`}>
          
          {/* Subtle Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-nysc-primary/10 via-transparent to-nysc-secondary/10" />
          
          {/* Minimal Decorative Element */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-nysc-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-nysc-secondary/5 rounded-full blur-3xl" />
          
          <div className="relative z-10 p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
              
              {/* Compact Header */}
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                
                {/* Icon and Title Combined */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-nysc-primary to-nysc-secondary shadow-lg flex-shrink-0">
                    <Bell className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className={`text-xl lg:text-2xl font-bold ${getThemeColor('text.primary', isDark)}`}>
                      {t('common:newsletterTitle')}
                    </h3>
                    <p className={`text-sm ${getThemeColor('text.secondary', isDark)} mt-1`}>
                      {t('common:newsletterDescription')}
                    </p>
                  </div>
                </div>

                {/* Compact Stats */}
                <div className="flex items-center gap-4 text-xs">
                  <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full ${getThemeColor('badge.secondary', isDark)}`}>
                    <Users className="w-3 h-3 text-nysc-primary" />
                    <span className="font-medium">10K+</span>
                  </div>
                  <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full ${getThemeColor('badge.secondary', isDark)}`}>
                    <Mail className="w-3 h-3 text-nysc-secondary" />
                    <span className="font-medium">Weekly</span>
                  </div>
                </div>
              </div>

              {/* Streamlined Form */}
              <form onSubmit={handleSubscribe}>
                <div className="flex flex-col sm:flex-row gap-3">
                  
                  {/* Compact Email Input */}
                  <div className="relative flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('common:emailPlaceholder')}
                      className={`w-full px-4 py-3 pl-11 rounded-xl border ${getThemeColor('input.primary', isDark)} focus:outline-none focus:ring-2 focus:ring-nysc-primary/30 focus:border-nysc-primary transition-all duration-300 text-sm`}
                      required
                    />
                    <Mail className={`absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 ${getThemeColor('text.muted', isDark)}`} />
                  </div>

                  {/* Compact Button */}
                  <button
                    type="submit"
                    disabled={isSubscribed}
                    className={`group px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 min-w-[140px] ${
                      isSubscribed
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : 'bg-gradient-to-r from-nysc-primary to-nysc-secondary text-white hover:shadow-lg'
                    }`}
                  >
                    {isSubscribed ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white rounded-full flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-white rounded-full" />
                        </div>
                        <span>{t('common:subscribedMessage')}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        <span>{t('common:subscribeButton')}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Minimal Footer Info */}
                <div className="flex flex-wrap items-center justify-between mt-4 text-xs">
                  <div className="flex items-center gap-3">
                    <span className={`${getThemeColor('text.muted', isDark)} flex items-center gap-1`}>
                      <Heart className="w-3 h-3 text-red-400" />
                      No spam
                    </span>
                    <span className={`${getThemeColor('text.muted', isDark)} flex items-center gap-1`}>
                      <TrendingUp className="w-3 h-3 text-nysc-primary" />
                      Latest updates
                    </span>
                    <span className={`${getThemeColor('text.muted', isDark)} flex items-center gap-1`}>
                      <Calendar className="w-3 h-3 text-nysc-secondary" />
                      Events
                    </span>
                  </div>
                  <span className={`${getThemeColor('text.muted', isDark)}`}>
                    Unsubscribe anytime
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for scroll behavior */}
      <style dangerouslySetInnerHTML={{
        __html: `
        /* Hide scrollbar but keep functionality */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Line clamp utilities */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Smooth scrolling for horizontal scroll */
        .overflow-x-auto {
          scroll-behavior: smooth;
        }
        
        /* Enhanced shadows */
        .shadow-2xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        `
      }} />
    </section>
  );
};

export default NewsEventsSection;