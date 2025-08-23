import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor } from '../../config/colors';
import { Download, FileText, Image, Video, Calendar } from 'lucide-react';

const Downloads = () => {
  const { isDark } = useTheme();

  const downloadCategories = [
    {
      icon: FileText,
      title: "Application Forms",
      description: "Download forms for program applications and registrations",
      items: [
        { name: "Youth Club Registration Form", size: "245 KB", format: "PDF" },
        { name: "Vocational Training Application", size: "189 KB", format: "PDF" },
        { name: "Cultural Program Application", size: "167 KB", format: "PDF" },
        { name: "Youth Awards Nomination Form", size: "298 KB", format: "PDF" }
      ]
    },
    {
      icon: FileText,
      title: "Guidelines & Policies",
      description: "Official guidelines, policies, and procedures",
      items: [
        { name: "NYSC Program Guidelines 2024", size: "1.2 MB", format: "PDF" },
        { name: "Youth Club Operations Manual", size: "856 KB", format: "PDF" },
        { name: "Training Center Regulations", size: "645 KB", format: "PDF" },
        { name: "Code of Conduct", size: "234 KB", format: "PDF" }
      ]
    },
    {
      icon: Image,
      title: "Resources & Materials",
      description: "Educational materials and reference documents",
      items: [
        { name: "NYSC Brochure 2024", size: "2.1 MB", format: "PDF" },
        { name: "Course Catalog", size: "3.4 MB", format: "PDF" },
        { name: "Success Stories Compilation", size: "4.2 MB", format: "PDF" },
        { name: "NYSC Logo Package", size: "8.9 MB", format: "ZIP" }
      ]
    }
  ];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Resources", href: "/resources" },
    { label: "Downloads" }
  ];

  return (
    <PageLayout 
      title="Downloads" 
      subtitle="Access essential forms, documents, guidelines, and resources for NYSC programs and services."
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Quick Access */}
        <div className={`mb-16 ${getThemeColor('background.card', isDark)} rounded-2xl p-8 md:p-12 text-center`}>
          <Download className="w-16 h-16 mx-auto mb-6 text-primary-500" />
          <h2 className={`text-3xl font-bold mb-6 ${getThemeColor('text.primary', isDark)}`}>
            Quick Access Downloads
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <button className={`${getThemeColor('background.secondary', isDark)} rounded-xl p-6 hover:shadow-lg transition-all duration-300`}>
              <FileText className="w-8 h-8 mx-auto mb-3 text-primary-500" />
              <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>Most Popular</h3>
              <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>Frequently downloaded forms</p>
            </button>
            <button className={`${getThemeColor('background.secondary', isDark)} rounded-xl p-6 hover:shadow-lg transition-all duration-300`}>
              <Calendar className="w-8 h-8 mx-auto mb-3 text-secondary-500" />
              <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>Recent Updates</h3>
              <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>Latest documents and forms</p>
            </button>
            <button className={`${getThemeColor('background.secondary', isDark)} rounded-xl p-6 hover:shadow-lg transition-all duration-300`}>
              <Download className="w-8 h-8 mx-auto mb-3 text-primary-500" />
              <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>Bulk Download</h3>
              <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>Download multiple files</p>
            </button>
          </div>
        </div>

        {/* Download Categories */}
        <div className="space-y-12">
          {downloadCategories.map((category, index) => (
            <div key={index} className={`${getThemeColor('background.card', isDark)} rounded-xl p-8 shadow-lg`}>
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mr-4">
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className={`text-2xl font-bold ${getThemeColor('text.primary', isDark)}`}>
                    {category.title}
                  </h2>
                  <p className={`${getThemeColor('text.secondary', isDark)}`}>
                    {category.description}
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {category.items.map((item, idx) => (
                  <div key={idx} className={`${getThemeColor('background.secondary', isDark)} rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-all duration-300 group`}>
                    <div className="flex items-center">
                      <div className="p-2 bg-primary-100 rounded-lg mr-3">
                        <FileText className="w-4 h-4 text-primary-500" />
                      </div>
                      <div>
                        <h3 className={`font-semibold ${getThemeColor('text.primary', isDark)} group-hover:text-primary-600 transition-colors`}>
                          {item.name}
                        </h3>
                        <div className="flex items-center space-x-3 text-sm">
                          <span className={`${getThemeColor('text.tertiary', isDark)}`}>{item.size}</span>
                          <span className="px-2 py-1 bg-primary-500 text-white rounded text-xs font-medium">
                            {item.format}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Help Section */}
        <div className={`mt-16 ${getThemeColor('background.secondary', isDark)} rounded-2xl p-8 md:p-12 text-center`}>
          <h2 className={`text-3xl font-bold mb-6 ${getThemeColor('text.primary', isDark)}`}>
            Need Help?
          </h2>
          <p className={`text-lg ${getThemeColor('text.secondary', isDark)} mb-8 max-w-3xl mx-auto leading-relaxed`}>
            Can't find what you're looking for? Contact our support team for assistance with documents, 
            forms, or technical issues.
          </p>
          <button className="px-8 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Downloads;