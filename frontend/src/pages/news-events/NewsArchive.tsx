import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar, FileText, Tag } from 'lucide-react';
import { useTranslationWithNamespace } from '../../hooks/useTranslationWithNamespace';
import { useTheme } from '../../contexts/ThemeContext';
import { colors, getThemeColor } from '../../config/colors';

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tags: string[];
  image?: string;
  slug: string;
}

const NewsArchive: React.FC = () => {
  const { t, ready } = useTranslationWithNamespace('newsevents');
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

  // Sample data - replace with actual API call
  useEffect(() => {
    const sampleNews: NewsItem[] = [
      {
        id: '1',
        title: 'Youth Development Program Launch',
        excerpt: 'New initiatives launched to support young entrepreneurs across the country.',
        date: '2024-01-15',
        category: 'Programs',
        tags: ['Youth', 'Development', 'Entrepreneurship'],
        slug: 'youth-development-program-launch'
      },
      {
        id: '2',
        title: 'Skills Training Workshop Success',
        excerpt: 'Over 500 participants completed vocational training programs this quarter.',
        date: '2024-01-10',
        category: 'Training',
        tags: ['Skills', 'Training', 'Vocational'],
        slug: 'skills-training-workshop-success'
      },
      {
        id: '3',
        title: 'International Youth Exchange Program',
        excerpt: 'Sri Lankan youth to participate in regional exchange programs.',
        date: '2023-12-20',
        category: 'International',
        tags: ['International', 'Exchange', 'Youth'],
        slug: 'international-youth-exchange-program'
      }
    ];
    setNewsItems(sampleNews);
  }, []);

  const categories = ['all', 'Programs', 'Training', 'International', 'Awards', 'Events'];
  const years = ['all', '2024', '2023', '2022', '2021'];

  const filteredNews = newsItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesYear = selectedYear === 'all' || item.date.startsWith(selectedYear);
    
    return matchesSearch && matchesCategory && matchesYear;
  });

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? getThemeColor('background.primary', true) : getThemeColor('background.primary', false)
    }`}>
      {/* Hero Section */}
      <div className={`relative py-16 lg:py-24 ${
        isDark ? colors.background.gradient.dark : colors.background.gradient.light
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className={`text-4xl lg:text-6xl font-bold mb-6 ${
              isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
            }`}>
              News Archive
            </h1>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
            }`}>
              Browse through our comprehensive news archive and stay updated with NYSC's activities and achievements.
            </p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className={`border-b ${
        isDark ? colors.border.subtle.dark : colors.border.subtle.light
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
              }`} />
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
                  isDark 
                    ? `${getThemeColor('background.secondary', true)} ${getThemeColor('border.primary', true)} ${getThemeColor('text.primary', true)} placeholder-gray-400`
                    : `${getThemeColor('background.primary', false)} ${getThemeColor('border.secondary', false)} ${getThemeColor('text.primary', false)} placeholder-gray-500`
                }`}
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
              }`} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors appearance-none ${
                  isDark 
                    ? `${getThemeColor('background.secondary', true)} ${getThemeColor('border.primary', true)} ${getThemeColor('text.primary', true)}`
                    : `${getThemeColor('background.primary', false)} ${getThemeColor('border.secondary', false)} ${getThemeColor('text.primary', false)}`
                }`}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Filter */}
            <div className="relative">
              <Calendar className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
              }`} />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors appearance-none ${
                  isDark 
                    ? `${getThemeColor('background.secondary', true)} ${getThemeColor('border.primary', true)} ${getThemeColor('text.primary', true)}`
                    : `${getThemeColor('background.primary', false)} ${getThemeColor('border.secondary', false)} ${getThemeColor('text.primary', false)}`
                }`}
              >
                {years.map(year => (
                  <option key={year} value={year}>
                    {year === 'all' ? 'All Years' : year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredNews.length === 0 ? (
          <div className="text-center py-12">
            <FileText className={`w-16 h-16 mx-auto mb-4 ${
              isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
            }`} />
            <h3 className={`text-xl font-semibold mb-2 ${
              isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
            }`}>
              No news found
            </h3>
            <p className={`${
              isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
            }`}>
              Try adjusting your search criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((item) => (
              <article key={item.id} className={`rounded-lg border transition-all duration-300 hover:shadow-lg ${
                isDark 
                  ? `${getThemeColor('background.secondary', true)} ${colors.border.subtle.dark} ${colors.hover.border.subtle.dark}`
                  : `${getThemeColor('background.primary', false)} ${colors.border.subtle.light} ${colors.hover.border.subtle.light}`
              }`}>
                {item.image && (
                  <div className="aspect-video bg-gray-200 rounded-t-lg mb-4"></div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      isDark ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {item.category}
                    </span>
                    <span className={`text-sm ${
                      isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
                    }`}>
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h3 className={`text-lg font-semibold mb-3 ${
                    isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                  }`}>
                    {item.title}
                  </h3>
                  
                  <p className={`text-sm mb-4 ${
                    isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                  }`}>
                    {item.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.tags.map((tag) => (
                      <span key={tag} className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${
                        isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                      }`}>
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button className={`text-sm font-medium transition-colors ${
                    isDark ? colors.brand.secondary.text : colors.brand.primary.text
                  } hover:underline`}>
                    Read More →
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsArchive;