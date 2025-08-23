import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor } from '../../config/colors';
import { Users, MapPin, Calendar, Activity } from 'lucide-react';

const YouthClubs = () => {
  const { isDark } = useTheme();

  const clubTypes = [
    {
      icon: Users,
      title: "Community Service Clubs",
      description: "Focus on community development and social service projects.",
      activities: ["Environmental Projects", "Elder Care", "Education Support", "Health Awareness"]
    },
    {
      icon: Activity,
      title: "Sports & Recreation Clubs",
      description: "Athletic and recreational activities for fitness and fun.",
      activities: ["Football", "Cricket", "Volleyball", "Athletics"]
    },
    {
      icon: Calendar,
      title: "Cultural Arts Clubs",
      description: "Preserve and promote Sri Lankan cultural heritage.",
      activities: ["Traditional Dance", "Music", "Drama", "Arts & Crafts"]
    }
  ];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Youth Clubs" }
  ];

  return (
    <PageLayout 
      title="Youth Clubs" 
      subtitle="Join dynamic youth clubs across all 25 districts and connect with like-minded peers in meaningful activities."
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Club Types */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {clubTypes.map((club, index) => (
            <div 
              key={index} 
              className={`${getThemeColor('background.card', isDark)} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group text-center`}
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <club.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className={`text-lg font-bold mb-3 ${getThemeColor('text.primary', isDark)}`}>
                {club.title}
              </h3>
              <p className={`${getThemeColor('text.secondary', isDark)} text-sm mb-4 leading-relaxed`}>
                {club.description}
              </p>
              <ul className={`space-y-1 ${getThemeColor('text.secondary', isDark)} text-xs`}>
                {club.activities.map((activity, idx) => (
                  <li key={idx} className="flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Registration CTA */}
        <div className={`text-center ${getThemeColor('background.secondary', isDark)} rounded-2xl p-8 md:p-12`}>
          <h2 className={`text-3xl font-bold mb-6 ${getThemeColor('text.primary', isDark)}`}>
            Join a Youth Club Today
          </h2>
          <p className={`text-lg ${getThemeColor('text.secondary', isDark)} mb-8 max-w-3xl mx-auto leading-relaxed`}>
            Connect with like-minded youth in your district and participate in meaningful activities 
            that make a difference in your community.
          </p>
          <button className="inline-flex items-center px-8 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors">
            <MapPin className="w-4 h-4 mr-2" />
            Find Clubs Near You
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default YouthClubs;