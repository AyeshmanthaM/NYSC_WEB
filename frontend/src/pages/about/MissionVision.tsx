import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor } from '../../config/colors';
import { Target, Eye, Heart, Users, Lightbulb, Globe } from 'lucide-react';

const MissionVision = () => {
  const { isDark } = useTheme();

  const values = [
    {
      icon: Heart,
      title: "Integrity",
      description: "Upholding the highest standards of honesty, transparency, and ethical conduct in all our activities."
    },
    {
      icon: Users,
      title: "Inclusivity",
      description: "Ensuring equal opportunities for all youth regardless of background, ethnicity, religion, or socioeconomic status."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Embracing creative solutions and modern approaches to address contemporary youth challenges."
    },
    {
      icon: Globe,
      title: "Excellence",
      description: "Striving for the highest quality in all programs and services we provide to Sri Lankan youth."
    }
  ];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "About NYSC", href: "/about" },
    { label: "Mission & Vision" }
  ];

  return (
    <PageLayout 
      title="Mission & Vision" 
      subtitle="Our guiding principles and aspirations for empowering Sri Lankan youth and building a brighter future."
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Mission and Vision Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Mission */}
          <div className={`${getThemeColor('background.card', isDark)} rounded-2xl p-8 md:p-12 shadow-lg hover:shadow-xl transition-all duration-300`}>
            <div className="flex items-center mb-6">
              <div className="p-3 bg-primary-500 rounded-full mr-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className={`text-3xl font-bold ${getThemeColor('text.primary', isDark)}`}>
                Our Mission
              </h2>
            </div>
            <p className={`text-lg ${getThemeColor('text.secondary', isDark)} leading-relaxed`}>
              To empower Sri Lankan youth through comprehensive programs in education, skills development, 
              sports, cultural activities, and community service, fostering their personal growth and 
              preparing them to become responsible citizens and future leaders of our nation.
            </p>
          </div>

          {/* Vision */}
          <div className={`${getThemeColor('background.card', isDark)} rounded-2xl p-8 md:p-12 shadow-lg hover:shadow-xl transition-all duration-300`}>
            <div className="flex items-center mb-6">
              <div className="p-3 bg-secondary-500 rounded-full mr-4">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h2 className={`text-3xl font-bold ${getThemeColor('text.primary', isDark)}`}>
                Our Vision
              </h2>
            </div>
            <p className={`text-lg ${getThemeColor('text.secondary', isDark)} leading-relaxed`}>
              To be the leading organization in Sri Lanka that nurtures confident, skilled, and socially 
              conscious youth who contribute meaningfully to national development, economic growth, and 
              the creation of a just and prosperous society.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className={`text-3xl font-bold text-center mb-12 ${getThemeColor('text.primary', isDark)}`}>
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className={`${getThemeColor('background.card', isDark)} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group text-center`}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className={`text-xl font-bold mb-3 ${getThemeColor('text.primary', isDark)}`}>
                  {value.title}
                </h3>
                <p className={`${getThemeColor('text.secondary', isDark)} text-sm leading-relaxed`}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Objectives */}
        <div className={`${getThemeColor('background.secondary', isDark)} rounded-2xl p-8 md:p-12`}>
          <h2 className={`text-3xl font-bold text-center mb-8 ${getThemeColor('text.primary', isDark)}`}>
            Strategic Objectives
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className={`text-xl font-semibold mb-4 ${getThemeColor('text.primary', isDark)}`}>
                Immediate Goals (2024-2025)
              </h3>
              <ul className={`space-y-3 ${getThemeColor('text.secondary', isDark)}`}>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Expand vocational training programs to reach 50,000 youth annually
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Establish youth centers in all 25 districts with modern facilities
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Launch digital platforms for improved service delivery
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Strengthen partnerships with private sector and NGOs
                </li>
              </ul>
            </div>
            <div>
              <h3 className={`text-xl font-semibold mb-4 ${getThemeColor('text.primary', isDark)}`}>
                Long-term Vision (2025-2030)
              </h3>
              <ul className={`space-y-3 ${getThemeColor('text.secondary', isDark)}`}>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-secondary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Achieve 90% youth employment rate among program graduates
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-secondary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Become a regional leader in youth development practices
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-secondary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Integrate sustainable development goals in all programs
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-secondary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Establish international youth exchange programs
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default MissionVision;