import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor, colors } from '../../config/colors';
import { Download, FileText, Image, Video, Music, Archive, Calendar, ArrowDownToLine } from 'lucide-react';

const DownloadsPage = () => {
  const { isDark } = useTheme();

  const downloadCategories = [
    {
      icon: FileText,
      title: "Annual Reports",
      description: "Comprehensive annual reports showcasing NYSC achievements and financial statements.",
      count: 15,
      files: [
        { name: "NYSC Annual Report 2023", size: "2.5 MB", type: "PDF" },
        { name: "NYSC Annual Report 2022", size: "2.8 MB", type: "PDF" },
        { name: "NYSC Annual Report 2021", size: "3.1 MB", type: "PDF" }
      ]
    },
    {
      icon: Calendar,
      title: "Event Programs",
      description: "Programs and schedules for NYSC events, ceremonies, and cultural programs.",
      count: 42,
      files: [
        { name: "Youth Awards Ceremony 2024", size: "1.2 MB", type: "PDF" },
        { name: "Cultural Festival Program", size: "800 KB", type: "PDF" },
        { name: "Sports Meet Schedule", size: "650 KB", type: "PDF" }
      ]
    },
    {
      icon: FileText,
      title: "Application Forms",
      description: "Registration forms for various NYSC programs, training courses, and memberships.",
      count: 28,
      files: [
        { name: "Youth Club Registration Form", size: "450 KB", type: "PDF" },
        { name: "Training Course Application", size: "380 KB", type: "PDF" },
        { name: "Youth Award Nomination Form", size: "520 KB", type: "PDF" }
      ]
    },
    {
      icon: Image,
      title: "Media Resources",
      description: "Official NYSC logos, banners, and multimedia content for promotional use.",
      count: 85,
      files: [
        { name: "NYSC Official Logo Pack", size: "5.2 MB", type: "ZIP" },
        { name: "Event Photo Collection 2023", size: "12.8 MB", type: "ZIP" },
        { name: "Promotional Banners", size: "3.4 MB", type: "ZIP" }
      ]
    },
    {
      icon: Video,
      title: "Training Materials",
      description: "Educational videos, training modules, and learning resources for youth development.",
      count: 67,
      files: [
        { name: "Leadership Training Module 1", size: "45.2 MB", type: "MP4" },
        { name: "Skill Development Guide", size: "18.6 MB", type: "PDF" },
        { name: "Cultural Heritage Documentary", size: "78.4 MB", type: "MP4" }
      ]
    },
    {
      icon: Archive,
      title: "Policy Documents",
      description: "Official policies, guidelines, and regulatory documents governing NYSC operations.",
      count: 34,
      files: [
        { name: "NYSC Policy Manual 2024", size: "4.2 MB", type: "PDF" },
        { name: "Youth Development Guidelines", size: "2.1 MB", type: "PDF" },
        { name: "Code of Ethics", size: "1.8 MB", type: "PDF" }
      ]
    }
  ];

  const featuredDownloads = [
    {
      title: "NYSC Strategic Plan 2024-2028",
      description: "Five-year strategic roadmap for youth development in Sri Lanka",
      size: "3.8 MB",
      type: "PDF",
      downloads: 2847,
      featured: true
    },
    {
      title: "Youth Club Handbook 2024",
      description: "Complete guide for youth club operations and management",
      size: "2.3 MB",
      type: "PDF",
      downloads: 1923,
      featured: true
    },
    {
      title: "NYSC Achievement Gallery 2023",
      description: "Visual showcase of major accomplishments and milestones",
      size: "18.7 MB",
      type: "ZIP",
      downloads: 1456,
      featured: true
    }
  ];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Downloads" }
  ];

  return (
    <PageLayout 
      title="Downloads" 
      subtitle="Access official documents, forms, reports, and multimedia resources from the National Youth Services Council."
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Featured Downloads */}
        <div className={`mb-16 ${getThemeColor('card.glassy', isDark)} rounded-2xl p-8 md:p-12 border ${getThemeColor('border.subtle', isDark)}`}>
          <div className="flex items-center justify-center mb-8">
            <Download className={`w-12 h-12 mr-4 ${colors.brand.primary.text}`} />
            <h2 className={`text-3xl font-bold ${colors.brand.gradient.text}`}>
              Featured Downloads
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredDownloads.map((item, index) => (
              <div key={index} className={`${getThemeColor('card.glassy', isDark)} rounded-xl p-6 border ${getThemeColor('border.subtle', isDark)} ${colors.effects.glow.subtle} ${colors.hover.shadow.brand} transition-all duration-300 group`}>
                <div className="flex items-start justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getThemeColor('badge.brand', isDark)}`}>
                    Featured
                  </span>
                  <FileText className={`w-6 h-6 ${colors.brand.primary.text}`} />
                </div>
                <h3 className={`font-bold mb-3 ${getThemeColor('text.primary', isDark)} ${colors.hover.text.brand} transition-colors`}>
                  {item.title}
                </h3>
                <p className={`text-sm ${getThemeColor('text.secondary', isDark)} mb-4 leading-relaxed`}>
                  {item.description}
                </p>
                <div className={`flex items-center justify-between text-xs ${getThemeColor('text.secondary', isDark)} mb-4`}>
                  <span>{item.type} • {item.size}</span>
                  <span>{item.downloads.toLocaleString()} downloads</span>
                </div>
                <button className={`w-full inline-flex items-center justify-center px-4 py-2 ${colors.button.primary.base} ${colors.button.primary.hover} ${colors.button.primary.shadow} rounded-lg font-semibold transition-all duration-300`}>
                  <ArrowDownToLine className="w-4 h-4 mr-2" />
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Download Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {downloadCategories.map((category, index) => (
            <div key={index} className={`${getThemeColor('card.glassy', isDark)} rounded-xl p-8 border ${getThemeColor('border.subtle', isDark)} ${colors.effects.glow.subtle} ${colors.hover.shadow.brand} transition-all duration-300 group`}>
              <div className="flex justify-center mb-6">
                <div className={`p-4 ${colors.brand.gradient.primary} rounded-full group-hover:scale-110 transition-transform duration-300 ${colors.effects.glow.brand}`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className={`text-xl font-bold mb-4 text-center ${getThemeColor('text.primary', isDark)}`}>
                {category.title}
              </h3>
              <p className={`${getThemeColor('text.secondary', isDark)} text-center mb-6 leading-relaxed`}>
                {category.description}
              </p>
              
              <div className="text-center mb-6">
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getThemeColor('badge.brand', isDark)}`}>
                  {category.count} Files Available
                </span>
              </div>

              {/* Sample Files */}
              <div className="space-y-3 mb-6">
                <h4 className={`font-semibold text-sm ${getThemeColor('text.primary', isDark)}`}>
                  Recent Files:
                </h4>
                {category.files.slice(0, 3).map((file, idx) => (
                  <div key={idx} className={`flex items-center justify-between p-2 rounded ${getThemeColor('card.primary', isDark)}`}>
                    <div className="flex items-center">
                      <FileText className={`w-4 h-4 mr-2 ${colors.brand.secondary.text}`} />
                      <span className={`text-xs ${getThemeColor('text.primary', isDark)} truncate`}>
                        {file.name}
                      </span>
                    </div>
                    <span className={`text-xs ${getThemeColor('text.secondary', isDark)}`}>
                      {file.size}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <button className={`${colors.brand.primary.text} ${colors.hover.text.brand} font-semibold text-sm`}>
                  View All Files →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filter Section */}
        <div className={`${getThemeColor('background.gradient.brand', isDark)} rounded-2xl p-8 md:p-12 text-center border ${getThemeColor('border.brand.subtle', isDark)}`}>
          <h2 className={`text-3xl font-bold mb-6 ${colors.brand.gradient.text}`}>
            Find What You Need
          </h2>
          <p className={`text-lg ${getThemeColor('text.secondary', isDark)} mb-8 max-w-3xl mx-auto leading-relaxed`}>
            Use our advanced search and filtering system to quickly locate specific documents, 
            forms, and resources from our extensive digital library.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <div className="flex-1">
              <input 
                type="text" 
                placeholder="Search downloads..." 
                className={`w-full px-4 py-3 rounded-lg border-2 ${getThemeColor('border.input', isDark)} focus:border-brand-500 focus:outline-none ${getThemeColor('card.primary', isDark)} ${getThemeColor('text.primary', isDark)}`}
              />
            </div>
            <select className={`px-6 py-3 rounded-lg border-2 ${getThemeColor('border.input', isDark)} focus:border-brand-500 focus:outline-none ${getThemeColor('card.primary', isDark)} ${getThemeColor('text.primary', isDark)}`}>
              <option value="">All Categories</option>
              <option value="reports">Annual Reports</option>
              <option value="forms">Application Forms</option>
              <option value="policies">Policy Documents</option>
            </select>
            <button className={`px-8 py-3 ${colors.button.primary.base} ${colors.button.primary.hover} ${colors.button.primary.shadow} rounded-lg font-semibold transition-all duration-300`}>
              Search
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default DownloadsPage;