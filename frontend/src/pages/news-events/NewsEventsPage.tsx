import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor } from '../../config/colors';
import { Link } from 'react-router-dom';
import { Newspaper, Calendar, Trophy, Camera, ArrowRight } from 'lucide-react';

const NewsEventsPage = () => {
  const { isDark } = useTheme();

  const sections = [
    {
      icon: Newspaper,
      title: "Latest News",
      description: "Stay updated with the latest announcements and news from NYSC.",
      link: "/news-events/latest-news"
    },
    {
      icon: Calendar,
      title: "Events Calendar",
      description: "Discover upcoming events, workshops, and programs.",
      link: "/news-events/events-calendar"
    },
    {
      icon: Trophy,
      title: "Achievements",
      description: "Celebrate the accomplishments of our youth and programs.",
      link: "/news-events/achievements"
    },
    {
      icon: Camera,
      title: "Photo Gallery",
      description: "Visual highlights from our events and activities.",
      link: "/news-events/photo-gallery"
    }
  ];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "News & Events" }
  ];

  return (
    <PageLayout 
      title="News & Events" 
      subtitle="Stay connected with the latest news, events, and achievements from the National Youth Services Council."
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Featured News Section */}
        <div className={`mb-16 ${getThemeColor('background.card', isDark)} rounded-2xl p-8 md:p-12`}>
          <h2 className={`text-3xl font-bold mb-8 text-center ${getThemeColor('text.primary', isDark)}`}>
            Featured News
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className={`${getThemeColor('background.secondary', isDark)} rounded-xl p-6`}>
              <div className="inline-block px-3 py-1 bg-primary-500 text-white rounded-full text-sm font-medium mb-4">
                Latest Update
              </div>
              <h3 className={`text-xl font-bold mb-3 ${getThemeColor('text.primary', isDark)}`}>
                New Digital Platform Launch
              </h3>
              <p className={`${getThemeColor('text.secondary', isDark)} mb-4 leading-relaxed`}>
                NYSC launches enhanced digital platform to better serve Sri Lankan youth with improved online services and program registration.
              </p>
              <div className="text-sm text-primary-500 font-semibold">December 15, 2024</div>
            </div>
            <div className={`${getThemeColor('background.secondary', isDark)} rounded-xl p-6`}>
              <div className="inline-block px-3 py-1 bg-secondary-500 text-white rounded-full text-sm font-medium mb-4">
                Achievement
              </div>
              <h3 className={`text-xl font-bold mb-3 ${getThemeColor('text.primary', isDark)}`}>
                Youth Excellence Awards 2024
              </h3>
              <p className={`${getThemeColor('text.secondary', isDark)} mb-4 leading-relaxed`}>
                Celebrating outstanding achievements of young Sri Lankans who have made significant contributions to their communities.
              </p>
              <div className="text-sm text-secondary-500 font-semibold">December 10, 2024</div>
            </div>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sections.map((section, index) => (
            <Link 
              key={index} 
              to={section.link}
              className={`${getThemeColor('background.card', isDark)} rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group block`}
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <section.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className={`text-xl font-bold mb-4 text-center ${getThemeColor('text.primary', isDark)}`}>
                {section.title}
              </h3>
              <p className={`${getThemeColor('text.secondary', isDark)} text-center mb-6 leading-relaxed`}>
                {section.description}
              </p>
              <div className="flex justify-center">
                <div className="flex items-center text-primary-500 group-hover:text-primary-600 font-semibold">
                  Explore
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default NewsEventsPage;