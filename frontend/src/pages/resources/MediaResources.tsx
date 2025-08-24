import React, { useState, useEffect } from 'react';
import { Image, Download, Video, FileImage, Search, Filter } from 'lucide-react';
import { useLanguage } from '../../contexts/CompatibilityLanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { colors, getThemeColor } from '../../config/colors';

interface MediaResource {
  id: string;
  title: string;
  description: string;
  type: 'logo' | 'brochure' | 'poster' | 'video' | 'infographic';
  format: string;
  fileSize: string;
  downloadUrl: string;
  previewUrl?: string;
  category: string;
  dateAdded: string;
}

const MediaResources: React.FC = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [resources, setResources] = useState<MediaResource[]>([]);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const sampleResources: MediaResource[] = [
      {
        id: '1',
        title: 'NYSC Official Logo',
        description: 'High-resolution official logo for use in publications and presentations.',
        type: 'logo',
        format: 'PNG, SVG, AI',
        fileSize: '2.1 MB',
        downloadUrl: '/downloads/media/nysc-logo-package.zip',
        previewUrl: '/downloads/media/previews/nysc-logo-preview.png',
        category: 'Branding',
        dateAdded: '2024-01-10'
      },
      {
        id: '2',
        title: 'Youth Programs Brochure',
        description: 'Comprehensive brochure showcasing all NYSC youth programs and services.',
        type: 'brochure',
        format: 'PDF',
        fileSize: '5.8 MB',
        downloadUrl: '/downloads/media/youth-programs-brochure.pdf',
        previewUrl: '/downloads/media/previews/brochure-preview.jpg',
        category: 'Marketing',
        dateAdded: '2024-01-05'
      },
      {
        id: '3',
        title: 'Skills Training Infographic',
        description: 'Visual representation of skills training programs and their benefits.',
        type: 'infographic',
        format: 'JPG, PNG',
        fileSize: '3.2 MB',
        downloadUrl: '/downloads/media/skills-training-infographic.zip',
        previewUrl: '/downloads/media/previews/infographic-preview.jpg',
        category: 'Education',
        dateAdded: '2023-12-20'
      },
      {
        id: '4',
        title: 'NYSC Promotional Video',
        description: 'Short promotional video highlighting NYSC mission and activities.',
        type: 'video',
        format: 'MP4',
        fileSize: '45.6 MB',
        downloadUrl: '/downloads/media/nysc-promo-video.mp4',
        previewUrl: '/downloads/media/previews/video-thumbnail.jpg',
        category: 'Promotional',
        dateAdded: '2023-11-15'
      },
      {
        id: '5',
        title: 'Event Promotion Poster Template',
        description: 'Customizable poster template for promoting NYSC events.',
        type: 'poster',
        format: 'PSD, AI, PDF',
        fileSize: '12.4 MB',
        downloadUrl: '/downloads/media/event-poster-template.zip',
        previewUrl: '/downloads/media/previews/poster-preview.jpg',
        category: 'Templates',
        dateAdded: '2023-10-30'
      }
    ];
    setResources(sampleResources);
  }, []);

  const types = ['all', 'logo', 'brochure', 'poster', 'video', 'infographic'];
  const categories = ['all', 'Branding', 'Marketing', 'Education', 'Promotional', 'Templates'];

  const filteredResources = resources.filter(resource => {
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesCategory && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'logo': return FileImage;
      case 'brochure': return FileImage;
      case 'poster': return Image;
      case 'video': return Video;
      case 'infographic': return Image;
      default: return FileImage;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'logo': return isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-600';
      case 'brochure': return isDark ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-600';
      case 'poster': return isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-600';
      case 'video': return isDark ? 'bg-red-500/20 text-red-300' : 'bg-red-100 text-red-600';
      case 'infographic': return isDark ? 'bg-yellow-500/20 text-yellow-300' : 'bg-yellow-100 text-yellow-600';
      default: return isDark ? 'bg-gray-500/20 text-gray-300' : 'bg-gray-100 text-gray-600';
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
                isDark ? 'bg-pink-500/20' : 'bg-pink-100'
              }`}>
                <Image className={`w-12 h-12 ${
                  isDark ? 'text-pink-300' : 'text-pink-600'
                }`} />
              </div>
            </div>
            <h1 className={`text-4xl lg:text-6xl font-bold mb-6 ${
              isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
            }`}>
              Media Resources
            </h1>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
            }`}>
              Download official NYSC media assets including logos, brochures, posters, videos, and promotional materials.
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
                placeholder="Search resources..."
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
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className={`px-3 py-3 rounded-lg border transition-colors ${
                isDark 
                  ? `${getThemeColor('background.secondary', true)} ${getThemeColor('border.primary', true)} ${getThemeColor('text.primary', true)}`
                  : `${getThemeColor('background.primary', false)} ${getThemeColor('border.secondary', false)} ${getThemeColor('text.primary', false)}`
              }`}
            >
              {types.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
            
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

      {/* Resources Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => {
            const IconComponent = getTypeIcon(resource.type);
            
            return (
              <div key={resource.id} className={`rounded-lg border transition-all duration-300 hover:shadow-lg overflow-hidden ${
                isDark 
                  ? `${getThemeColor('background.secondary', true)} ${colors.border.subtle.dark}`
                  : `${getThemeColor('background.primary', false)} ${colors.border.subtle.light}`
              }`}>
                {/* Preview */}
                {resource.previewUrl && (
                  <div className="aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <Image className={`w-16 h-16 ${
                      isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
                    }`} />
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${
                      isDark ? 'bg-pink-500/20' : 'bg-pink-100'
                    }`}>
                      <IconComponent className={`w-6 h-6 ${
                        isDark ? 'text-pink-300' : 'text-pink-600'
                      }`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(resource.type)}`}>
                          {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          isDark ? 'bg-gray-500/20 text-gray-300' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {resource.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className={`text-lg font-bold mb-2 ${
                    isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                  }`}>
                    {resource.title}
                  </h3>
                  
                  <p className={`text-sm mb-4 ${
                    isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                  }`}>
                    {resource.description}
                  </p>
                  
                  <div className={`flex justify-between text-xs mb-4 ${
                    isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
                  }`}>
                    <span>Format: {resource.format}</span>
                    <span>Size: {resource.fileSize}</span>
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MediaResources;