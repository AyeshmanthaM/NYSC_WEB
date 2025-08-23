import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor } from '../../config/colors';
import { Link } from 'react-router-dom';
import { Download, GraduationCap, FileText, ArrowRight } from 'lucide-react';

const ResourcesPage = () => {
  const { isDark } = useTheme();

  const resources = [
    {
      icon: Download,
      title: "Downloads",
      description: "Access forms, documents, guidelines, and publications.",
      link: "/resources/downloads"
    },
    {
      icon: GraduationCap,
      title: "Student Portal",
      description: "Online portal for students to access courses and track progress.",
      link: "/resources/student-portal"
    },
    {
      icon: FileText,
      title: "Annual Reports",
      description: "Comprehensive annual reports and organizational publications.",
      link: "/resources/annual-reports"
    }
  ];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Resources" }
  ];

  return (
    <PageLayout 
      title="Resources" 
      subtitle="Access essential documents, tools, and information to support your journey with NYSC."
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Quick Access Section */}
        <div className={`mb-16 ${getThemeColor('background.card', isDark)} rounded-2xl p-8 md:p-12`}>
          <h2 className={`text-3xl font-bold mb-8 text-center ${getThemeColor('text.primary', isDark)}`}>
            Quick Access
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className={`${getThemeColor('background.secondary', isDark)} rounded-xl p-6 text-center`}>
              <h3 className={`font-bold mb-3 ${getThemeColor('text.primary', isDark)}`}>Application Forms</h3>
              <p className={`text-sm ${getThemeColor('text.secondary', isDark)} mb-4`}>Download program application forms</p>
              <button className="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm hover:bg-primary-600 transition-colors">
                Download
              </button>
            </div>
            <div className={`${getThemeColor('background.secondary', isDark)} rounded-xl p-6 text-center`}>
              <h3 className={`font-bold mb-3 ${getThemeColor('text.primary', isDark)}`}>Course Catalog</h3>
              <p className={`text-sm ${getThemeColor('text.secondary', isDark)} mb-4`}>Browse all available courses</p>
              <button className="px-4 py-2 bg-secondary-500 text-white rounded-lg text-sm hover:bg-secondary-600 transition-colors">
                View Catalog
              </button>
            </div>
            <div className={`${getThemeColor('background.secondary', isDark)} rounded-xl p-6 text-center`}>
              <h3 className={`font-bold mb-3 ${getThemeColor('text.primary', isDark)}`}>Guidelines</h3>
              <p className={`text-sm ${getThemeColor('text.secondary', isDark)} mb-4`}>Program guidelines and policies</p>
              <button className="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm hover:bg-primary-600 transition-colors">
                Read More
              </button>
            </div>
          </div>
        </div>

        {/* Resource Categories */}
        <div className="grid md:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <Link 
              key={index} 
              to={resource.link}
              className={`${getThemeColor('background.card', isDark)} rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group block`}
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <resource.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className={`text-xl font-bold mb-4 text-center ${getThemeColor('text.primary', isDark)}`}>
                {resource.title}
              </h3>
              <p className={`${getThemeColor('text.secondary', isDark)} text-center mb-6 leading-relaxed`}>
                {resource.description}
              </p>
              <div className="flex justify-center">
                <div className="flex items-center text-primary-500 group-hover:text-primary-600 font-semibold">
                  Access
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

export default ResourcesPage;