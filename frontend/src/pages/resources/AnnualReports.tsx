import React, { useState, useEffect } from 'react';
import { FileText, Download, Calendar, Eye, Filter, Search } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { colors, getThemeColor } from '../../config/colors';

interface AnnualReport {
  id: string;
  year: string;
  title: string;
  description: string;
  fileSize: string;
  downloadCount: number;
  publishedDate: string;
  category: string;
  language: 'si' | 'ta' | 'en';
  downloadUrl: string;
  previewUrl?: string;
}

const AnnualReports: React.FC = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [reports, setReports] = useState<AnnualReport[]>([]);
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const sampleReports: AnnualReport[] = [
      {
        id: '1',
        year: '2023',
        title: 'NYSC Annual Report 2023',
        description: 'Comprehensive overview of NYSC activities, achievements, and impact during 2023.',
        fileSize: '15.2 MB',
        downloadCount: 2450,
        publishedDate: '2024-03-15',
        category: 'Annual Report',
        language: 'en',
        downloadUrl: '/downloads/reports/nysc-annual-report-2023-en.pdf',
        previewUrl: '/downloads/reports/preview/nysc-annual-report-2023-en-preview.pdf'
      },
      {
        id: '2',
        year: '2023',
        title: 'NYSC වාර්ෂික වාර්තාව 2023',
        description: '2023 වර්ෂය තුළ NYSC හි සිදුකළ ක්‍රියාකාරකම්, ජයග්‍රහණ සහ බලපෑම්වල සම්පූර්ණ සමාලෝචනය.',
        fileSize: '15.8 MB',
        downloadCount: 1876,
        publishedDate: '2024-03-20',
        category: 'Annual Report',
        language: 'si',
        downloadUrl: '/downloads/reports/nysc-annual-report-2023-si.pdf'
      },
      {
        id: '3',
        year: '2023',
        title: 'NYSC வருடாந்திர அறிக்கை 2023',
        description: '2023 ஆம் ஆண்டில் NYSC இன் செயல்பாடுகள், சாதனைகள் மற்றும் தாக்கத்தின் விரிவான மதிப்பாய்வு.',
        fileSize: '15.5 MB',
        downloadCount: 1234,
        publishedDate: '2024-03-25',
        category: 'Annual Report',
        language: 'ta',
        downloadUrl: '/downloads/reports/nysc-annual-report-2023-ta.pdf'
      },
      {
        id: '4',
        year: '2022',
        title: 'NYSC Annual Report 2022',
        description: 'Annual performance review covering youth development initiatives and organizational achievements.',
        fileSize: '12.8 MB',
        downloadCount: 3210,
        publishedDate: '2023-03-10',
        category: 'Annual Report',
        language: 'en',
        downloadUrl: '/downloads/reports/nysc-annual-report-2022-en.pdf',
        previewUrl: '/downloads/reports/preview/nysc-annual-report-2022-en-preview.pdf'
      },
      {
        id: '5',
        year: '2021',
        title: 'NYSC Annual Report 2021',
        description: 'Comprehensive report on youth development programs during the pandemic year.',
        fileSize: '11.5 MB',
        downloadCount: 2890,
        publishedDate: '2022-02-28',
        category: 'Annual Report',
        language: 'en',
        downloadUrl: '/downloads/reports/nysc-annual-report-2021-en.pdf'
      }
    ];
    setReports(sampleReports);
  }, []);

  const years = ['all', '2023', '2022', '2021', '2020', '2019'];
  const languages = [
    { code: 'all', label: 'All Languages' },
    { code: 'en', label: 'English' },
    { code: 'si', label: 'සිංහල' },
    { code: 'ta', label: 'தமிழ்' }
  ];

  const filteredReports = reports.filter(report => {
    const matchesYear = selectedYear === 'all' || report.year === selectedYear;
    const matchesLanguage = selectedLanguage === 'all' || report.language === selectedLanguage;
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesYear && matchesLanguage && matchesSearch;
  });

  const getLanguageFlag = (language: string) => {
    switch (language) {
      case 'si': return '🇱🇰';
      case 'ta': return '🇱🇰';
      case 'en': return '🇬🇧';
      default: return '🌐';
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? getThemeColor('background.primary', true) : getThemeColor('background.primary', false)
    }`}>
      {/* Hero Section */}
      <div className={`relative py-16 lg:py-24 ${
        isDark ? colors.background.gradient.dark : colors.background.gradient.light
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className={`p-4 rounded-full ${
                isDark ? 'bg-blue-500/20' : 'bg-blue-100'
              }`}>
                <FileText className={`w-12 h-12 ${
                  isDark ? 'text-blue-300' : 'text-blue-600'
                }`} />
              </div>
            </div>
            <h1 className={`text-4xl lg:text-6xl font-bold mb-6 ${
              isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
            }`}>
              Annual Reports
            </h1>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
            }`}>
              Comprehensive annual performance reports documenting NYSC's achievements, impact, and strategic progress in youth development across Sri Lanka.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={`border-b ${
        isDark ? colors.border.subtle.dark : colors.border.subtle.light
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
              }`} />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
                  isDark 
                    ? `${getThemeColor('background.secondary', true)} ${getThemeColor('border.primary', true)} ${getThemeColor('text.primary', true)} placeholder-gray-400`
                    : `${getThemeColor('background.primary', false)} ${getThemeColor('border.secondary', false)} ${getThemeColor('text.primary', false)} placeholder-gray-500`
                }`}
              />
            </div>
            
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className={`px-3 py-3 rounded-lg border transition-colors ${
                isDark 
                  ? `${getThemeColor('background.secondary', true)} ${getThemeColor('border.primary', true)} ${getThemeColor('text.primary', true)}`
                  : `${getThemeColor('background.primary', false)} ${getThemeColor('border.secondary', false)} ${getThemeColor('text.primary', false)}`
              }`}
            >
              {years.map(year => (
                <option key={year} value={year}>
                  {year === 'all' ? 'All Years' : year}
                </option>
              ))}
            </select>
            
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className={`px-3 py-3 rounded-lg border transition-colors ${
                isDark 
                  ? `${getThemeColor('background.secondary', true)} ${getThemeColor('border.primary', true)} ${getThemeColor('text.primary', true)}`
                  : `${getThemeColor('background.primary', false)} ${getThemeColor('border.secondary', false)} ${getThemeColor('text.primary', false)}`
              }`}
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredReports.map((report) => (
            <div key={report.id} className={`p-6 rounded-lg border transition-all duration-300 hover:shadow-lg ${
              isDark 
                ? `${getThemeColor('background.secondary', true)} ${colors.border.subtle.dark}`
                : `${getThemeColor('background.primary', false)} ${colors.border.subtle.light}`
            }`}>
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${
                  isDark ? 'bg-blue-500/20' : 'bg-blue-100'
                }`}>
                  <FileText className={`w-8 h-8 ${
                    isDark ? 'text-blue-300' : 'text-blue-600'
                  }`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className={`text-xl font-bold ${
                      isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                    }`}>
                      {report.title}
                    </h3>
                    <span className="text-xl ml-2">
                      {getLanguageFlag(report.language)}
                    </span>
                  </div>
                  
                  <p className={`text-sm mb-4 ${
                    isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                  }`}>
                    {report.description}
                  </p>
                  
                  <div className={`flex flex-wrap gap-4 text-xs mb-4 ${
                    isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
                  }`}>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(report.publishedDate).toLocaleDateString()}
                    </div>
                    <div>Size: {report.fileSize}</div>
                    <div>Downloads: {report.downloadCount.toLocaleString()}</div>
                  </div>
                  
                  <div className="flex gap-3">
                    {report.previewUrl && (
                      <button className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
                        isDark 
                          ? `${getThemeColor('background.secondary', true)} ${getThemeColor('text.primary', true)} ${colors.border.subtle.dark} ${colors.hover.background.dark}`
                          : `${getThemeColor('background.primary', false)} ${getThemeColor('text.primary', false)} ${colors.border.subtle.light} ${colors.hover.background.light}`
                      }`}>
                        <Eye className="w-4 h-4" />
                        Preview
                      </button>
                    )}
                    
                    <button className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all duration-300 font-medium ${
                      isDark
                        ? `${colors.brand.primary.background} ${colors.brand.primary.text} hover:bg-orange-600`
                        : `${colors.brand.primary.background} ${colors.brand.primary.text} hover:bg-orange-600`
                    }`}>
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <FileText className={`w-16 h-16 mx-auto mb-4 ${
              isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
            }`} />
            <h3 className={`text-xl font-bold mb-2 ${
              isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
            }`}>
              No reports found
            </h3>
            <p className={`text-sm ${
              isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
            }`}>
              Try adjusting your search criteria or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnualReports;