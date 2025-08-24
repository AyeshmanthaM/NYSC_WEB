import React, { useState, useEffect } from 'react';
import { FileText, Download, Filter, Search } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { colors, getThemeColor } from '../../config/colors';

interface ApplicationForm {
  id: string;
  title: string;
  description: string;
  category: string;
  fileSize: string;
  downloadUrl: string;
  lastUpdated: string;
  language: 'si' | 'ta' | 'en';
}

const ApplicationForms: React.FC = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [forms, setForms] = useState<ApplicationForm[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const sampleForms: ApplicationForm[] = [
      {
        id: '1',
        title: 'Youth Club Registration Form',
        description: 'Application form for registering new youth clubs with NYSC.',
        category: 'Registration',
        fileSize: '120 KB',
        downloadUrl: '/downloads/forms/youth-club-registration.pdf',
        lastUpdated: '2024-01-15',
        language: 'en'
      },
      {
        id: '2',
        title: 'Training Program Application',
        description: 'Apply for various training programs offered by NYSC.',
        category: 'Training',
        fileSize: '95 KB',
        downloadUrl: '/downloads/forms/training-application.pdf',
        lastUpdated: '2024-01-10',
        language: 'en'
      },
      {
        id: '3',
        title: 'Youth Awards Nomination Form',
        description: 'Nominate outstanding young individuals for NYSC Youth Awards.',
        category: 'Awards',
        fileSize: '150 KB',
        downloadUrl: '/downloads/forms/youth-awards-nomination.pdf',
        lastUpdated: '2023-12-20',
        language: 'en'
      }
      // Add more forms as needed
    ];
    setForms(sampleForms);
  }, []);

  const categories = ['all', 'Registration', 'Training', 'Awards', 'Membership', 'Events'];

  const filteredForms = forms.filter(form => {
    const matchesCategory = selectedCategory === 'all' || form.category === selectedCategory;
    const matchesSearch = form.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         form.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
            <h1 className={`text-4xl lg:text-6xl font-bold mb-6 ${
              isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
            }`}>
              Application Forms
            </h1>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
            }`}>
              Download application forms for various NYSC programs, services, and activities.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={`border-b ${
        isDark ? colors.border.subtle.dark : colors.border.subtle.light
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
              }`} />
              <input
                type="text"
                placeholder="Search forms..."
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
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`px-3 py-3 rounded-lg border transition-colors ${
                isDark 
                  ? `${getThemeColor('background.secondary', true)} ${getThemeColor('border.primary', true)} ${getThemeColor('text.primary', true)}`
                  : `${getThemeColor('background.primary', false)} ${getThemeColor('border.secondary', false)} ${getThemeColor('text.primary', false)}`
              }`}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Forms Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredForms.map((form) => (
            <div key={form.id} className={`p-6 rounded-lg border transition-all duration-300 hover:shadow-lg ${
              isDark 
                ? `${getThemeColor('background.secondary', true)} ${colors.border.subtle.dark}`
                : `${getThemeColor('background.primary', false)} ${colors.border.subtle.light}`
            }`}>
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-3 rounded-lg ${
                  isDark ? 'bg-green-500/20' : 'bg-green-100'
                }`}>
                  <FileText className={`w-8 h-8 ${
                    isDark ? 'text-green-300' : 'text-green-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {form.category}
                  </span>
                </div>
              </div>
              
              <h3 className={`text-lg font-bold mb-2 ${
                isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
              }`}>
                {form.title}
              </h3>
              
              <p className={`text-sm mb-4 ${
                isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
              }`}>
                {form.description}
              </p>
              
              <div className={`text-xs mb-4 ${
                isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
              }`}>
                Size: {form.fileSize} | Updated: {new Date(form.lastUpdated).toLocaleDateString()}
              </div>
              
              <button className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                isDark
                  ? `${colors.brand.primary.background} ${colors.brand.primary.text} hover:bg-orange-600`
                  : `${colors.brand.primary.background} ${colors.brand.primary.text} hover:bg-orange-600`
              }`}>
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplicationForms;