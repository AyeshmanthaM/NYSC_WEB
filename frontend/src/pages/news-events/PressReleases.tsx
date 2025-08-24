import React, { useState, useEffect } from 'react';
import { Download, Calendar, FileText, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { colors, getThemeColor } from '../../config/colors';

interface PressRelease {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  downloadUrl?: string;
  readMoreUrl?: string;
}

const PressReleases: React.FC = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [pressReleases, setPressReleases] = useState<PressRelease[]>([]);
  const [selectedYear, setSelectedYear] = useState('all');

  // Sample data - replace with actual API call
  useEffect(() => {
    const sampleReleases: PressRelease[] = [
      {
        id: '1',
        title: 'NYSC Launches New Youth Development Initiative',
        summary: 'The National Youth Services Council announces a comprehensive new program aimed at empowering youth through skills development and entrepreneurship opportunities.',
        date: '2024-01-20',
        category: 'Program Launch',
        downloadUrl: '/downloads/press/youth-development-initiative.pdf',
        readMoreUrl: '/news/youth-development-initiative'
      },
      {
        id: '2',
        title: 'Annual Youth Awards Ceremony 2024',
        summary: 'NYSC recognizes outstanding achievements of young Sri Lankans in various fields including education, sports, arts, and community service.',
        date: '2024-01-15',
        category: 'Awards',
        downloadUrl: '/downloads/press/youth-awards-2024.pdf',
        readMoreUrl: '/news/youth-awards-2024'
      },
      {
        id: '3',
        title: 'International Partnership Agreement Signed',
        summary: 'NYSC enters into strategic partnership with regional youth organizations to enhance cross-cultural exchange programs.',
        date: '2024-01-10',
        category: 'Partnership',
        downloadUrl: '/downloads/press/international-partnership.pdf',
        readMoreUrl: '/news/international-partnership'
      },
      {
        id: '4',
        title: 'Vocational Training Center Expansion',
        summary: 'New training facilities opened in three additional districts to provide better access to technical education for rural youth.',
        date: '2023-12-15',
        category: 'Infrastructure',
        downloadUrl: '/downloads/press/training-center-expansion.pdf',
        readMoreUrl: '/news/training-center-expansion'
      }
    ];
    setPressReleases(sampleReleases);
  }, []);

  const years = ['all', '2024', '2023', '2022', '2021'];

  const filteredReleases = pressReleases.filter(release => {
    return selectedYear === 'all' || release.date.startsWith(selectedYear);
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
              Press Releases
            </h1>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
            }`}>
              Official announcements and news releases from the National Youth Services Council.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className={`border-b ${
        isDark ? colors.border.subtle.dark : colors.border.subtle.light
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h2 className={`text-lg font-semibold ${
              isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
            }`}>
              All Press Releases ({filteredReleases.length})
            </h2>
            
            <div className="relative">
              <Calendar className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
              }`} />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className={`pl-10 pr-4 py-2 rounded-lg border transition-colors appearance-none ${
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
            </div>
          </div>
        </div>
      </div>

      {/* Press Releases List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredReleases.length === 0 ? (
          <div className="text-center py-12">
            <FileText className={`w-16 h-16 mx-auto mb-4 ${
              isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
            }`} />
            <h3 className={`text-xl font-semibold mb-2 ${
              isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
            }`}>
              No press releases found
            </h3>
            <p className={`${
              isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
            }`}>
              Please check back later for updates
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredReleases.map((release) => (
              <article key={release.id} className={`p-6 rounded-lg border transition-all duration-300 hover:shadow-lg ${
                isDark 
                  ? `${getThemeColor('background.secondary', true)} ${colors.border.subtle.dark} ${colors.hover.border.subtle.dark}`
                  : `${getThemeColor('background.primary', false)} ${colors.border.subtle.light} ${colors.hover.border.subtle.light}`
              }`}>
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {release.category}
                      </span>
                      <span className={`text-sm flex items-center gap-1 ${
                        isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
                      }`}>
                        <Calendar className="w-4 h-4" />
                        {new Date(release.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    
                    <h3 className={`text-xl font-semibold mb-3 ${
                      isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                    }`}>
                      {release.title}
                    </h3>
                    
                    <p className={`text-base leading-relaxed ${
                      isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                    }`}>
                      {release.summary}
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:ml-6">
                    {release.downloadUrl && (
                      <button className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
                        isDark 
                          ? `${colors.brand.primary.background} ${colors.brand.primary.text} border-orange-500 hover:bg-orange-600`
                          : `${colors.brand.primary.background} ${colors.brand.primary.text} border-orange-500 hover:bg-orange-600`
                      } hover:shadow-md`}>
                        <Download className="w-4 h-4" />
                        <span className="font-medium">Download PDF</span>
                      </button>
                    )}
                    
                    {release.readMoreUrl && (
                      <button className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
                        isDark 
                          ? `${getThemeColor('background.secondary', true)} ${getThemeColor('text.primary', true)} ${colors.border.subtle.dark} ${colors.hover.background.dark}`
                          : `${getThemeColor('background.primary', false)} ${getThemeColor('text.primary', false)} ${colors.border.subtle.light} ${colors.hover.background.light}`
                      }`}>
                        <ExternalLink className="w-4 h-4" />
                        <span className="font-medium">Read More</span>
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PressReleases;