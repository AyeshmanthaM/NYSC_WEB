import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor } from '../../config/colors';
import { Calendar, User, Tag } from 'lucide-react';

const LatestNews = () => {
  const { isDark } = useTheme();

  const newsArticles = [
    {
      title: "NYSC Launches New Digital Platform for Youth Services",
      excerpt: "The National Youth Services Council unveils an enhanced digital platform to better serve Sri Lankan youth with improved online services and streamlined program registration.",
      date: "December 15, 2024",
      author: "NYSC Communications",
      category: "Technology",
      featured: true
    },
    {
      title: "Youth Excellence Awards 2024 Winners Announced",
      excerpt: "Celebrating outstanding achievements of 50 young Sri Lankans who have made significant contributions to their communities across all 25 districts.",
      date: "December 10, 2024", 
      author: "Awards Committee",
      category: "Awards"
    },
    {
      title: "New Vocational Training Centers Open in Rural Areas",
      excerpt: "Five new state-of-the-art training centers launched in remote districts to provide better access to skills development programs for rural youth.",
      date: "December 5, 2024",
      author: "Training Division", 
      category: "Education"
    },
    {
      title: "International Youth Exchange Program Applications Open",
      excerpt: "Applications now open for the 2025 international youth exchange program offering opportunities for cultural exchange and global learning experiences.",
      date: "December 1, 2024",
      author: "International Relations",
      category: "Programs"
    }
  ];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "News & Events", href: "/news-events" },
    { label: "Latest News" }
  ];

  return (
    <PageLayout 
      title="Latest News" 
      subtitle="Stay updated with the latest announcements, developments, and news from the National Youth Services Council."
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Featured Article */}
        {newsArticles.filter(article => article.featured).map((article, index) => (
          <div key={index} className={`mb-16 ${getThemeColor('background.card', isDark)} rounded-2xl p-8 md:p-12`}>
            <div className="inline-block px-4 py-2 bg-primary-500 text-white rounded-full text-sm font-semibold mb-6">
              Featured Story
            </div>
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${getThemeColor('text.primary', isDark)}`}>
              {article.title}
            </h2>
            <div className="flex items-center space-x-6 mb-6 text-sm">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-primary-500" />
                <span className={getThemeColor('text.secondary', isDark)}>{article.date}</span>
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2 text-primary-500" />
                <span className={getThemeColor('text.secondary', isDark)}>{article.author}</span>
              </div>
              <div className="flex items-center">
                <Tag className="w-4 h-4 mr-2 text-primary-500" />
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getThemeColor('background.accent', isDark)} text-white`}>
                  {article.category}
                </span>
              </div>
            </div>
            <p className={`text-lg ${getThemeColor('text.secondary', isDark)} leading-relaxed mb-8`}>
              {article.excerpt}
            </p>
            <button className="px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors">
              Read Full Article
            </button>
          </div>
        ))}

        {/* Regular News Articles */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsArticles.filter(article => !article.featured).map((article, index) => (
            <div key={index} className={`${getThemeColor('background.card', isDark)} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group`}>
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getThemeColor('background.secondary', isDark)} ${getThemeColor('text.primary', isDark)}`}>
                  {article.category}
                </span>
                <span className={`text-xs ${getThemeColor('text.tertiary', isDark)}`}>{article.date}</span>
              </div>
              <h3 className={`text-lg font-bold mb-3 ${getThemeColor('text.primary', isDark)} group-hover:text-primary-600 transition-colors`}>
                {article.title}
              </h3>
              <p className={`${getThemeColor('text.secondary', isDark)} text-sm mb-4 leading-relaxed`}>
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs">
                  <User className="w-3 h-3 mr-1 text-primary-500" />
                  <span className={getThemeColor('text.secondary', isDark)}>{article.author}</span>
                </div>
                <button className="text-primary-500 hover:text-primary-600 font-semibold text-sm transition-colors">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className={`inline-flex items-center px-8 py-3 border-2 border-primary-500 text-primary-500 rounded-lg font-semibold hover:bg-primary-500 hover:text-white transition-all`}>
            Load More Articles
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default LatestNews;