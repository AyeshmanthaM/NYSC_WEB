import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, ArrowRight, Eye, TrendingUp, Clock, Share2, Bookmark, Heart } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const NewsEventsSection = () => {
  const { isDark } = useTheme();
  const [hoveredNews, setHoveredNews] = useState<number | null>(null);
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);
  const [bookmarkedItems, setBookmarkedItems] = useState<Set<number>>(new Set());
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

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

  return (
    <section className={`py-20 relative overflow-hidden ${
      isDark ? 'bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      
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
                <div className={`p-3 rounded-xl ${isDark ? 'bg-[#1aa79e]/20' : 'bg-[#1aa79e]/10'} backdrop-blur-sm`}>
                  <TrendingUp className={`w-6 h-6 ${isDark ? 'text-[#1aa79e]' : 'text-[#1aa79e]'}`} />
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  isDark ? 'bg-[#1aa79e]/20 text-[#1aa79e] border border-[#1aa79e]/30' : 'bg-[#1aa79e]/10 text-[#1aa79e] border border-[#1aa79e]/20'
                } backdrop-blur-md`}>
                  Breaking Stories
                </span>
              </div>
              <h2 className={`text-5xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              } leading-tight`}>
                Latest <span className="bg-gradient-to-r from-[#1aa79e] to-[#f38621] bg-clip-text text-transparent">News</span>
              </h2>
              <p className={`text-lg ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              } max-w-2xl`}>
                Stay informed with the latest developments and success stories from the NYSC community
              </p>
            </div>
            
            {/* Enhanced CTA */}
            <div className="flex flex-col items-start lg:items-end space-y-4">
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Updated {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
              <a 
                href="/news" 
                className={`group inline-flex items-center space-x-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                  isDark 
                    ? 'bg-gradient-to-r from-[#1aa79e] to-[#f38621] text-white shadow-lg shadow-[#1aa79e]/25 hover:shadow-2xl hover:shadow-[#1aa79e]/40' 
                    : 'bg-gradient-to-r from-[#1aa79e] to-[#f38621] text-white shadow-lg shadow-[#1aa79e]/25 hover:shadow-2xl hover:shadow-[#1aa79e]/40'
                }`}
              >
                <span>Explore All News</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Enhanced News Cards */}
          <div className="relative">
            {/* Desktop Grid */}
            <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {news.slice(0, 4).map((article, index) => (
                <article
                  key={article.id}
                  className={`group cursor-pointer rounded-3xl overflow-hidden transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 relative ${
                    isDark 
                      ? 'bg-gray-800/90 shadow-xl shadow-gray-900/50 hover:shadow-2xl hover:shadow-[#1aa79e]/20 border border-gray-700/50 hover:border-[#1aa79e]/30' 
                      : 'bg-white/90 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-[#1aa79e]/20 border border-gray-200/50 hover:border-[#1aa79e]/30'
                  } backdrop-blur-sm`}
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
                        <div className="absolute inset-0 bg-gradient-to-r from-[#1aa79e] to-[#f38621] rounded-full"></div>
                        
                        {/* Main trending badge */}
                        <div className="relative bg-gradient-to-r from-[#1aa79e] to-[#f38621] text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center space-x-1.5 shadow-lg transform hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                          <TrendingUp className="w-3.5 h-3.5 animate-bounce" />
                          <span className="font-extrabold tracking-wide">TRENDING</span>
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
                        <span className="font-extrabold tracking-wide">FEATURED</span>
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
                          <span className="text-xs font-medium">{article.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Content */}
                  <div className="p-6">
                    {/* Headline */}
                    <h3 className={`font-bold text-lg mb-3 line-clamp-2 leading-tight transition-all duration-300 ${
                      isDark ? 'text-white group-hover:text-[#1aa79e]' : 'text-gray-900 group-hover:text-[#1aa79e]'
                    }`}>
                      {article.title}
                    </h3>

                    {/* Summary */}
                    <p className={`text-sm leading-relaxed mb-4 line-clamp-3 transition-colors ${
                      isDark ? 'text-gray-300 group-hover:text-gray-200' : 'text-gray-600 group-hover:text-gray-700'
                    }`}>
                      {article.summary}
                    </p>

                    {/* Enhanced Metadata */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`flex items-center space-x-2 text-xs ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}>
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
                          className={`p-2 rounded-full transition-all duration-200 transform hover:scale-110 ${
                            likedItems.has(article.id)
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
                          className={`p-2 rounded-full transition-all duration-200 transform hover:scale-110 ${
                            bookmarkedItems.has(article.id)
                              ? 'text-[#1aa79e] bg-[#1aa79e]/10'
                              : isDark
                              ? 'text-gray-400 hover:text-[#1aa79e] hover:bg-[#1aa79e]/10'
                              : 'text-gray-400 hover:text-[#1aa79e] hover:bg-[#1aa79e]/10'
                          }`}
                        >
                          <Bookmark className={`w-4 h-4 ${bookmarkedItems.has(article.id) ? 'fill-current' : ''}`} />
                        </button>
                        <button className={`p-2 rounded-full transition-all duration-200 transform hover:scale-110 ${
                          isDark ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                        }`}>
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className={`text-xs px-3 py-1 rounded-full ${
                        isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {hoveredNews === article.id ? 'Click to read' : 'Hover to preview'}
                      </div>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#1aa79e]/10 via-[#f38621]/10 to-[#1aa79e]/10 blur-xl" />
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
                    className={`group cursor-pointer flex-shrink-0 w-80 rounded-2xl overflow-hidden transition-all duration-300 snap-start ${
                      isDark 
                        ? 'bg-gray-800 shadow-lg shadow-gray-900/50' 
                        : 'bg-white shadow-lg shadow-gray-200/50'
                    }`}
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
                      <h3 className={`font-bold text-lg mb-3 line-clamp-2 leading-tight ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {article.title}
                      </h3>

                      {/* Summary */}
                      <p className={`text-sm leading-relaxed mb-4 line-clamp-3 ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {article.summary}
                      </p>

                      {/* Metadata */}
                      <div className={`flex items-center justify-between text-xs ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}>
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
                <div className={`p-3 rounded-xl ${isDark ? 'bg-[#1aa79e]/20' : 'bg-[#1aa79e]/10'} backdrop-blur-sm`}>
                  <Calendar className={`w-6 h-6 ${isDark ? 'text-[#1aa79e]' : 'text-[#1aa79e]'}`} />
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  isDark ? 'bg-[#f38621]/20 text-[#f38621] border border-[#f38621]/30' : 'bg-[#f38621]/10 text-[#f38621] border border-[#f38621]/20'
                } backdrop-blur-md`}>
                  Upcoming Events
                </span>
              </div>
              <h2 className={`text-5xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              } leading-tight`}>
                Join <span className="bg-gradient-to-r from-[#1aa79e] to-[#f38621] bg-clip-text text-transparent">Events</span>
              </h2>
              <p className={`text-lg ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              } max-w-2xl`}>
                Discover exciting opportunities to connect, learn, and grow with the NYSC community
              </p>
            </div>
            
            {/* Enhanced CTA */}
            <div className="flex flex-col items-start lg:items-end space-y-4">
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Next event in {Math.ceil((new Date(events[0]?.date || new Date()).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
              </div>
              <a 
                href="https://www.nysc.lk/events" 
                target="_blank"
                rel="noopener noreferrer"
                className={`group inline-flex items-center space-x-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                  isDark 
                    ? 'bg-gradient-to-r from-[#1aa79e] to-[#f38621] text-white shadow-lg shadow-[#1aa79e]/25 hover:shadow-2xl hover:shadow-[#1aa79e]/40' 
                    : 'bg-gradient-to-r from-[#1aa79e] to-[#f38621] text-white shadow-lg shadow-[#1aa79e]/25 hover:shadow-2xl hover:shadow-[#1aa79e]/40'
                }`}
              >
                <span>View All Events</span>
                <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </a>
            </div>
          </div>

          {/* Enhanced Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <div
                key={event.id}
                className={`group cursor-pointer rounded-3xl overflow-hidden transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 relative ${
                  isDark 
                    ? 'bg-gray-800/90 shadow-xl shadow-gray-900/50 hover:shadow-2xl hover:shadow-[#1aa79e]/20 border border-gray-700/50 hover:border-[#1aa79e]/30' 
                    : 'bg-white/90 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-[#1aa79e]/20 border border-gray-200/50 hover:border-[#1aa79e]/30'
                } backdrop-blur-sm event-card`}
                onClick={() => window.open(event.link, '_blank')}
                onMouseEnter={() => setHoveredEvent(event.id)}
                onMouseLeave={() => setHoveredEvent(null)}
                style={{
                  animationDelay: `${index * 200}ms`
                }}
              >
                {/* Featured Badge */}
                {event.featured && (
                  <div className="absolute -top-2 -right-2 z-20">
                    <div className="bg-gradient-to-r from-[#f38621] to-[#1aa79e] text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 animate-pulse">
                      <Calendar className="w-3 h-3" />
                      <span>Featured</span>
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
                    <span className={`px-3 py-2 rounded-full text-xs font-bold backdrop-blur-md shadow-lg transform group-hover:scale-110 transition-transform duration-300 ${
                      event.type === 'upcoming' 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
                        : event.type === 'recent'
                        ? 'bg-gradient-to-r from-[#1aa79e] to-blue-600 text-white'
                        : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
                    }`}>
                      {event.type}
                    </span>
                  </div>

                  {/* Enhanced Date Display */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-[#1aa79e]" />
                          <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {new Date(event.date).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              month: 'short', 
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="text-xs text-[#f38621] font-medium">
                          {new Date(event.date).getFullYear()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Indicator */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-[#1aa79e]/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                      Click to view
                    </div>
                  </div>
                </div>

                {/* Enhanced Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className={`font-bold text-lg mb-3 line-clamp-2 leading-tight transition-all duration-300 ${
                    isDark ? 'text-white group-hover:text-[#1aa79e]' : 'text-gray-900 group-hover:text-[#1aa79e]'
                  }`}>
                    {event.title}
                  </h3>

                  {/* Location with Enhanced Icon */}
                  <div className={`flex items-center space-x-2 text-sm mb-4 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <div className="p-1 rounded-full bg-[#f38621]/10">
                      <MapPin className="w-4 h-4 text-[#f38621]" />
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
                        className={`p-2 rounded-full transition-all duration-200 transform hover:scale-110 ${
                          bookmarkedItems.has(event.id)
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
                        className={`p-2 rounded-full transition-all duration-200 transform hover:scale-110 ${
                          isDark ? 'text-gray-400 hover:text-[#f38621] hover:bg-[#f38621]/10' : 'text-gray-400 hover:text-[#f38621] hover:bg-[#f38621]/10'
                        }`}
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* Enhanced Action Button */}
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {hoveredEvent === event.id ? 'View Details' : 'Learn More'}
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#1aa79e] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#1aa79e]/10 via-[#f38621]/10 to-[#1aa79e]/10 blur-xl" />
                </div>
              </div>
            ))}
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