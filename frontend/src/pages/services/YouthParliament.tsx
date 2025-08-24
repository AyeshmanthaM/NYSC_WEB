import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor } from '../../config/colors';
import { Building2, Users, Vote, BookOpen } from 'lucide-react';

const YouthParliament = () => {
  const { isDark } = useTheme();

  const features = [
    {
      icon: Building2,
      title: "Parliamentary Procedure",
      description: "Learn the formal procedures and protocols of parliamentary democracy."
    },
    {
      icon: Users,
      title: "Leadership Development",
      description: "Develop leadership skills through active participation in democratic processes."
    },
    {
      icon: Vote,
      title: "Civic Education",
      description: "Understand the importance of civic responsibility and democratic participation."
    },
    {
      icon: BookOpen,
      title: "Policy Making",
      description: "Experience the process of creating and debating policies that affect society."
    }
  ];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Programs", href: "/programs" },
    { label: "Youth Parliament" }
  ];

  return (
    <PageLayout 
      title="Youth Parliament" 
      subtitle="Empowering young voices in democracy through hands-on experience in parliamentary procedures and governance."
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Program Overview */}
        <div className={`mb-16 ${getThemeColor('background.card', isDark)} rounded-2xl p-8 md:p-12`}>
          <h2 className={`text-3xl font-bold mb-6 text-center ${getThemeColor('text.primary', isDark)}`}>
            Building Future Leaders
          </h2>
          <p className={`text-lg ${getThemeColor('text.secondary', isDark)} text-center max-w-4xl mx-auto leading-relaxed`}>
            The Youth Parliament program provides young people with firsthand experience in democratic governance, 
            parliamentary procedures, and policy-making processes. Participants engage in structured debates, 
            draft legislation, and develop critical thinking skills essential for civic leadership.
          </p>
        </div>

        {/* Program Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`${getThemeColor('background.card', isDark)} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group text-center`}
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className={`text-lg font-bold mb-3 ${getThemeColor('text.primary', isDark)}`}>
                {feature.title}
              </h3>
              <p className={`${getThemeColor('text.secondary', isDark)} text-sm leading-relaxed`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`text-center ${getThemeColor('background.secondary', isDark)} rounded-2xl p-8 md:p-12`}>
          <h2 className={`text-3xl font-bold mb-6 ${getThemeColor('text.primary', isDark)}`}>
            Make Your Voice Heard
          </h2>
          <p className={`text-lg ${getThemeColor('text.secondary', isDark)} mb-8 max-w-3xl mx-auto leading-relaxed`}>
            Join the Youth Parliament and be part of shaping the future of Sri Lanka through active democratic participation.
          </p>
          <button className="inline-flex items-center px-8 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors">
            Apply for Youth Parliament
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default YouthParliament;