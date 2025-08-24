import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor } from '../../config/colors';
import { Link } from 'react-router-dom';
import { Users, History, Target, ArrowRight } from 'lucide-react';

const AboutPage = () => {
  const { isDark } = useTheme();

  const sections = [
    {
      icon: Users,
      title: "Leadership",
      description: "Meet the visionary leaders driving Sri Lanka's youth development initiatives.",
      link: "/about/leadership"
    },
    {
      icon: History,
      title: "Our History",
      description: "Six decades of empowering Sri Lankan youth and building a stronger nation.",
      link: "/about/history"
    },
    {
      icon: Target,
      title: "Mission & Vision",
      description: "Our guiding principles and aspirations for empowering Sri Lankan youth.",
      link: "/about/mission-vision"
    }
  ];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "About NYSC" }
  ];

  return (
    <PageLayout 
      title="About NYSC" 
      subtitle="The National Youth Services Council has been empowering Sri Lankan youth for over six decades through comprehensive programs and services."
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Overview */}
        <div className={`mb-16 ${getThemeColor('background.card', isDark)} rounded-2xl p-8 md:p-12`}>
          <h2 className={`text-3xl font-bold mb-6 ${getThemeColor('text.primary', isDark)}`}>
            Who We Are
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className={`text-lg ${getThemeColor('text.secondary', isDark)} mb-6 leading-relaxed`}>
                The National Youth Services Council (NYSC) is Sri Lanka's premier organization dedicated to 
                youth development and empowerment. Established in 1963, we have been at the forefront of 
                nurturing young talent and preparing future leaders for our nation.
              </p>
              <p className={`text-lg ${getThemeColor('text.secondary', isDark)} mb-6 leading-relaxed`}>
                Through our comprehensive programs in education, vocational training, sports, cultural 
                activities, and community service, we empower youth to reach their full potential and 
                contribute meaningfully to society.
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-xl">60+</span>
                </div>
                <div>
                  <p className={`font-semibold ${getThemeColor('text.primary', isDark)}`}>Years of Service</p>
                  <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>Serving Sri Lankan youth since 1963</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-secondary-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-xl">25</span>
                </div>
                <div>
                  <p className={`font-semibold ${getThemeColor('text.primary', isDark)}`}>Districts</p>
                  <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>Nationwide coverage</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-xl">1M+</span>
                </div>
                <div>
                  <p className={`font-semibold ${getThemeColor('text.primary', isDark)}`}>Youth Served</p>
                  <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>Lives impacted positively</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="grid md:grid-cols-3 gap-8">
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
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`mt-16 text-center ${getThemeColor('background.secondary', isDark)} rounded-2xl p-8 md:p-12`}>
          <h2 className={`text-3xl font-bold mb-6 ${getThemeColor('text.primary', isDark)}`}>
            Join Our Mission
          </h2>
          <p className={`text-lg ${getThemeColor('text.secondary', isDark)} mb-8 max-w-3xl mx-auto leading-relaxed`}>
            Be part of Sri Lanka's youth development journey. Whether you're a young person looking for 
            opportunities or an organization wanting to partner with us, there's a place for you in our mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/services/youth-clubs"
              className="inline-flex items-center px-8 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors"
            >
              Join Youth Clubs
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link 
              to="/contact"
              className={`inline-flex items-center px-8 py-3 border-2 border-primary-500 text-primary-500 rounded-lg font-semibold hover:bg-primary-500 hover:text-white transition-all`}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AboutPage;