import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor } from '../../config/colors';
import { Link } from 'react-router-dom';
import { FileText, Phone, Download, Camera, Users, ArrowRight } from 'lucide-react';

const ResourcesPage = () => {
  const { isDark } = useTheme();

  const resourceCategories = [
    {
      icon: FileText,
      title: "About NYSC",
      description: "Learn about our organization, history, and mission to empower Sri Lankan youth.",
      link: "/about",
      color: "text-blue-600"
    },
    {
      icon: Phone,
      title: "Contact Us",
      description: "Get in touch with our offices across Sri Lanka for assistance and information.",
      link: "/contact",
      color: "text-green-600"
    },
    {
      icon: Download,
      title: "Annual Reports",
      description: "Access comprehensive annual reports showcasing our achievements and impact.",
      link: "/downloads/annual-reports",
      color: "text-purple-600"
    },
    {
      icon: FileText,
      title: "Application Forms",
      description: "Download various application forms for programs, clubs, and services.",
      link: "/downloads/application-forms",
      color: "text-orange-600"
    },
    {
      icon: FileText,
      title: "Policy Documents",
      description: "Review our official policies, guidelines, and regulatory documents.",
      link: "/downloads/policy-documents",
      color: "text-red-600"
    },
    {
      icon: Camera,
      title: "Media Resources",
      description: "Access logos, images, and media materials for authorized use.",
      link: "/downloads/media-resources",
      color: "text-teal-600"
    }
  ];

  return (
    <PageLayout
      title="Resources"
      subtitle="Access information, documents, and resources related to NYSC services and programs"
    >
      <div className="container mx-auto px-4 py-12">
        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resourceCategories.map((category, index) => (
            <Link
              key={index}
              to={category.link}
              className={`group block p-8 rounded-xl border-2 transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                isDark
                  ? 'border-gray-700 bg-gray-800/50 hover:border-blue-500'
                  : 'border-gray-200 bg-white hover:border-blue-400'
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`p-4 rounded-full mb-6 ${
                  isDark ? 'bg-gray-700' : 'bg-gray-100'
                } group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className={`h-8 w-8 ${category.color}`} />
                </div>
                
                <h3 className={`text-xl font-bold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {category.title}
                </h3>
                
                <p className={`text-sm leading-relaxed mb-6 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {category.description}
                </p>
                
                <div className={`flex items-center text-sm font-semibold group-hover:translate-x-2 transition-transform duration-300 ${
                  category.color
                }`}>
                  Learn More
                  <ArrowRight className="h-4 w-4 ml-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Links Section */}
        <div className={`mt-16 p-8 rounded-xl border ${
          isDark
            ? 'border-gray-700 bg-gray-800/30'
            : 'border-gray-200 bg-gray-50'
        }`}>
          <div className="text-center mb-8">
            <h2 className={`text-3xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Need Help?
            </h2>
            <p className={`text-lg ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Can't find what you're looking for? Our team is here to assist you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`text-center p-6 rounded-lg ${
              isDark ? 'bg-gray-700/50' : 'bg-white'
            }`}>
              <Phone className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className={`text-lg font-semibold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Call Us
              </h3>
              <p className={`text-sm ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                +94 11 234 5678
              </p>
            </div>

            <div className={`text-center p-6 rounded-lg ${
              isDark ? 'bg-gray-700/50' : 'bg-white'
            }`}>
              <Users className="h-8 w-8 text-green-600 mx-auto mb-4" />
              <h3 className={`text-lg font-semibold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Visit Us
              </h3>
              <p className={`text-sm ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Find our nearest office
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ResourcesPage;