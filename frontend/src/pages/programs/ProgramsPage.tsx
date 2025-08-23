import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor } from '../../config/colors';
import { Link } from 'react-router-dom';
import { Award, Wrench, Palette, Building2, Search, ArrowRight } from 'lucide-react';

const ProgramsPage = () => {
  const { isDark } = useTheme();

  const programs = [
    {
      icon: Award,
      title: "Youth Awards",
      description: "Recognition and celebration of exceptional achievements by Sri Lankan youth.",
      link: "/programs/youth-awards"
    },
    {
      icon: Wrench,
      title: "Skill Development",
      description: "Comprehensive training programs for modern workforce preparation.",
      link: "/programs/skill-development"
    },
    {
      icon: Palette,
      title: "Cultural Programs",
      description: "Preserving heritage while fostering creative expression and cultural pride.",
      link: "/programs/cultural-programs"
    },
    {
      icon: Building2,
      title: "Youth Parliament",
      description: "Democratic engagement and leadership development through parliamentary experience.",
      link: "/programs/youth-parliament"
    },
    {
      icon: Search,
      title: "Find Courses",
      description: "Discover and apply for courses that match your interests and career goals.",
      link: "/programs/find-courses"
    }
  ];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Programs" }
  ];

  return (
    <PageLayout 
      title="Programs" 
      subtitle="Comprehensive programs designed to empower Sri Lankan youth through education, skills development, and cultural enrichment."
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Overview */}
        <div className={`mb-16 ${getThemeColor('background.card', isDark)} rounded-2xl p-8 md:p-12 text-center`}>
          <h2 className={`text-3xl font-bold mb-6 ${getThemeColor('text.primary', isDark)}`}>
            Empowering Through Opportunity
          </h2>
          <p className={`text-lg ${getThemeColor('text.secondary', isDark)} max-w-4xl mx-auto leading-relaxed`}>
            Our diverse range of programs caters to the varied interests and aspirations of Sri Lankan youth, 
            providing pathways to personal growth, skill development, and meaningful contribution to society.
          </p>
        </div>

        {/* Program Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {programs.map((program, index) => (
            <Link 
              key={index} 
              to={program.link}
              className={`${getThemeColor('background.card', isDark)} rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group block`}
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <program.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className={`text-xl font-bold mb-4 text-center ${getThemeColor('text.primary', isDark)}`}>
                {program.title}
              </h3>
              <p className={`${getThemeColor('text.secondary', isDark)} text-center mb-6 leading-relaxed`}>
                {program.description}
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

        {/* Statistics */}
        <div className={`${getThemeColor('background.secondary', isDark)} rounded-2xl p-8 md:p-12`}>
          <h2 className={`text-3xl font-bold text-center mb-12 ${getThemeColor('text.primary', isDark)}`}>
            Our Impact
          </h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-500 mb-2">50,000+</div>
              <p className={`${getThemeColor('text.secondary', isDark)} font-semibold`}>Youth Trained Annually</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary-500 mb-2">200+</div>
              <p className={`${getThemeColor('text.secondary', isDark)} font-semibold`}>Course Offerings</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-500 mb-2">25</div>
              <p className={`${getThemeColor('text.secondary', isDark)} font-semibold`}>Districts Served</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary-500 mb-2">85%</div>
              <p className={`${getThemeColor('text.secondary', isDark)} font-semibold`}>Employment Rate</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProgramsPage;