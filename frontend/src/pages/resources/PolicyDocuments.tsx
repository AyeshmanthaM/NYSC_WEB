import React, { useState, useEffect } from 'react';
import { Shield, Download, Eye, Search, Filter } from 'lucide-react';
import { useLanguage } from '../../contexts/CompatibilityLanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { colors, getThemeColor } from '../../config/colors';

interface PolicyDocument {
  id: string;
  title: string;
  description: string;
  category: string;
  effectiveDate: string;
  fileSize: string;
  downloadUrl: string;
  previewUrl?: string;
}

const PolicyDocuments: React.FC = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [documents, setDocuments] = useState<PolicyDocument[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const sampleDocuments: PolicyDocument[] = [
      {
        id: '1',
        title: 'Youth Development Policy 2024',
        description: 'Comprehensive policy framework for youth development initiatives and programs.',
        category: 'Youth Development',
        effectiveDate: '2024-01-01',
        fileSize: '2.5 MB',
        downloadUrl: '/downloads/policies/youth-development-policy-2024.pdf',
        previewUrl: '/downloads/policies/preview/youth-development-policy-2024.pdf'
      },
      {
        id: '2',
        title: 'Code of Conduct for Youth Organizations',
        description: 'Guidelines and standards for ethical conduct within youth organizations.',
        category: 'Governance',
        effectiveDate: '2023-06-15',
        fileSize: '850 KB',
        downloadUrl: '/downloads/policies/code-of-conduct.pdf'
      },
      {
        id: '3',
        title: 'Training and Education Standards',
        description: 'Quality standards and requirements for NYSC training programs.',
        category: 'Education',
        effectiveDate: '2023-09-01',
        fileSize: '1.8 MB',
        downloadUrl: '/downloads/policies/training-standards.pdf'
      }
    ];
    setDocuments(sampleDocuments);
  }, []);

  const categories = ['all', 'Youth Development', 'Governance', 'Education', 'Finance', 'Operations'];

  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
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
            <div className="flex justify-center mb-6">
              <div className={`p-4 rounded-full ${
                isDark ? 'bg-red-500/20' : 'bg-red-100'
              }`}>
                <Shield className={`w-12 h-12 ${
                  isDark ? 'text-red-300' : 'text-red-600'
                }`} />
              </div>
            </div>
            <h1 className={`text-4xl lg:text-6xl font-bold mb-6 ${
              isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
            }`}>
              Policy Documents
            </h1>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
            }`}>
              Access official policies, guidelines, and regulatory documents governing NYSC operations and youth programs.
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
                placeholder="Search policies..."
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

      {/* Documents List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-6">
          {filteredDocuments.map((doc) => (
            <div key={doc.id} className={`p-6 rounded-lg border transition-all duration-300 hover:shadow-lg ${
              isDark 
                ? `${getThemeColor('background.secondary', true)} ${colors.border.subtle.dark}`
                : `${getThemeColor('background.primary', false)} ${colors.border.subtle.light}`
            }`}>
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${
                  isDark ? 'bg-red-500/20' : 'bg-red-100'
                }`}>
                  <Shield className={`w-8 h-8 ${
                    isDark ? 'text-red-300' : 'text-red-600'
                  }`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className={`text-xl font-bold ${
                      isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                    }`}>
                      {doc.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-600'
                    }`}>
                      {doc.category}
                    </span>
                  </div>
                  
                  <p className={`text-sm mb-3 ${
                    isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                  }`}>
                    {doc.description}
                  </p>
                  
                  <div className={`text-sm mb-4 ${
                    isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
                  }`}>
                    Effective Date: {new Date(doc.effectiveDate).toLocaleDateString()} | Size: {doc.fileSize}
                  </div>
                  
                  <div className="flex gap-3">
                    {doc.previewUrl && (
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
      </div>
    </div>
  );
};

export default PolicyDocuments;