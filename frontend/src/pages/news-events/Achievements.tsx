import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor } from '../../config/colors';
import { Trophy, Star, Award, Users, Target, Calendar } from 'lucide-react';

const Achievements = () => {
  const { isDark } = useTheme();

  const achievements = [
    {
      title: "International Youth Leadership Recognition",
      description: "NYSC receives UN recognition for outstanding youth development programs in the Asia-Pacific region.",
      date: "November 2024",
      category: "International",
      icon: Trophy,
      featured: true
    },
    {
      title: "50,000 Youth Trained in 2024",
      description: "Achieved milestone of training 50,000 young people across various skill development programs.",
      date: "October 2024",
      category: "Education",
      icon: Users
    },
    {
      title: "Digital Innovation Award",
      description: "NYSC digital platform wins national award for best government digital service innovation.",
      date: "September 2024",
      category: "Technology", 
      icon: Star
    },
    {
      title: "Youth Employment Success Rate: 85%",
      description: "Vocational training graduates achieve 85% employment rate within 6 months of program completion.",
      date: "August 2024",
      category: "Employment",
      icon: Target
    },
    {
      title: "Excellence in Cultural Preservation",
      description: "National award for preserving and promoting Sri Lankan cultural heritage through youth programs.",
      date: "July 2024",
      category: "Culture",
      icon: Award
    }
  ];

  const statistics = [
    { label: "Programs Completed", value: "1,200+", icon: Trophy },
    { label: "Youth Trained", value: "250,000+", icon: Users },
    { label: "Districts Covered", value: "25", icon: Target },
    { label: "Success Rate", value: "85%", icon: Star }
  ];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "News & Events", href: "/news-events" },
    { label: "Achievements" }
  ];

  return (
    <PageLayout 
      title="Achievements" 
      subtitle="Celebrating the accomplishments and milestones of NYSC and the success stories of Sri Lankan youth."
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Statistics Overview */}
        <div className={`mb-16 ${getThemeColor('background.card', isDark)} rounded-2xl p-8 md:p-12`}>
          <h2 className={`text-3xl font-bold text-center mb-8 ${getThemeColor('text.primary', isDark)}`}>
            Impact by Numbers
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-primary-500 mb-2">{stat.value}</div>
                <p className={`${getThemeColor('text.secondary', isDark)} font-semibold`}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Achievement */}
        {achievements.filter(achievement => achievement.featured).map((achievement, index) => (
          <div key={index} className={`mb-16 ${getThemeColor('background.secondary', isDark)} rounded-2xl p-8 md:p-12`}>
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-primary-500 rounded-full mr-4">
                <achievement.icon className="w-12 h-12 text-white" />
              </div>
              <div>
                <div className="inline-block px-4 py-2 bg-primary-500 text-white rounded-full text-sm font-semibold mb-2">
                  Featured Achievement
                </div>
                <h2 className={`text-3xl font-bold ${getThemeColor('text.primary', isDark)}`}>
                  {achievement.title}
                </h2>
              </div>
            </div>
            <p className={`text-lg ${getThemeColor('text.secondary', isDark)} text-center max-w-4xl mx-auto leading-relaxed mb-6`}>
              {achievement.description}
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-primary-500" />
                <span className={getThemeColor('text.secondary', isDark)}>{achievement.date}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700`}>
                {achievement.category}
              </span>
            </div>
          </div>
        ))}

        {/* Other Achievements */}
        <div className="mb-16">
          <h2 className={`text-3xl font-bold mb-8 ${getThemeColor('text.primary', isDark)}`}>
            Recent Achievements
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {achievements.filter(achievement => !achievement.featured).map((achievement, index) => (
              <div key={index} className={`${getThemeColor('background.card', isDark)} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group`}>
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <achievement.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getThemeColor('background.secondary', isDark)} ${getThemeColor('text.primary', isDark)}`}>
                        {achievement.category}
                      </span>
                      <span className={`text-sm ${getThemeColor('text.tertiary', isDark)}`}>{achievement.date}</span>
                    </div>
                    <h3 className={`text-lg font-bold mb-3 ${getThemeColor('text.primary', isDark)} group-hover:text-primary-600 transition-colors`}>
                      {achievement.title}
                    </h3>
                    <p className={`${getThemeColor('text.secondary', isDark)} text-sm leading-relaxed`}>
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className={`${getThemeColor('background.card', isDark)} rounded-2xl p-8 md:p-12 text-center`}>
          <h2 className={`text-3xl font-bold mb-6 ${getThemeColor('text.primary', isDark)}`}>
            Youth Success Stories
          </h2>
          <p className={`text-lg ${getThemeColor('text.secondary', isDark)} mb-8 max-w-4xl mx-auto leading-relaxed`}>
            Behind every achievement are the inspiring stories of young Sri Lankans who have transformed their lives 
            and communities through NYSC programs. Discover how our youth are making a difference.
          </p>
          <button className="px-8 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors">
            Read Success Stories
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Achievements;