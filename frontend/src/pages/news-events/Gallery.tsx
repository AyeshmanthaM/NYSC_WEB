import React, { useState, useEffect } from 'react';
import { Image, Calendar, Filter, Search, Download, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../contexts/CompatibilityLanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { colors, getThemeColor } from '../../config/colors';

interface MediaItem {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'photo' | 'video';
  date: string;
  url: string;
  thumbnailUrl: string;
  tags: string[];
  event?: string;
  photographer?: string;
  location?: string;
}

const Gallery: React.FC = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample data - replace with actual API call
  useEffect(() => {
    const sampleMedia: MediaItem[] = [
      {
        id: '1',
        title: 'Youth Leadership Summit 2024',
        description: 'Highlights from the annual youth leadership summit featuring inspiring speakers and interactive workshops.',
        category: 'Events',
        type: 'photo',
        date: '2024-01-15',
        url: '/images/gallery/leadership-summit-2024.jpg',
        thumbnailUrl: '/images/gallery/thumbs/leadership-summit-2024.jpg',
        tags: ['Leadership', 'Summit', 'Youth', 'Inspiration'],
        event: 'Youth Leadership Summit 2024',
        photographer: 'Sarah Johnson',
        location: 'NYSC Head Office, Colombo'
      },
      {
        id: '2',
        title: 'Cultural Dance Performance',
        description: 'Traditional Sri Lankan dance performance by youth cultural groups during the heritage festival.',
        category: 'Cultural',
        type: 'photo',
        date: '2024-01-10',
        url: '/images/gallery/cultural-dance.jpg',
        thumbnailUrl: '/images/gallery/thumbs/cultural-dance.jpg',
        tags: ['Culture', 'Dance', 'Traditional', 'Festival'],
        event: 'Heritage Festival 2024',
        photographer: 'Rajesh Kumar',
        location: 'National Theatre, Colombo'
      },
      {
        id: '3',
        title: 'Sports Championship Final',
        description: 'Intense moments from the inter-district sports championship final match.',
        category: 'Sports',
        type: 'photo',
        date: '2024-01-05',
        url: '/images/gallery/sports-championship.jpg',
        thumbnailUrl: '/images/gallery/thumbs/sports-championship.jpg',
        tags: ['Sports', 'Championship', 'Competition', 'Athletes'],
        event: 'Inter-District Sports Championship',
        photographer: 'Michael Fernando',
        location: 'National Sports Complex'
      },
      {
        id: '4',
        title: 'Skills Training Workshop',
        description: 'Participants engaged in hands-on learning during the vocational skills training program.',
        category: 'Training',
        type: 'photo',
        date: '2023-12-20',
        url: '/images/gallery/skills-training.jpg',
        thumbnailUrl: '/images/gallery/thumbs/skills-training.jpg',
        tags: ['Training', 'Skills', 'Vocational', 'Learning'],
        event: 'Vocational Skills Workshop',
        photographer: 'Amara Silva',
        location: 'Training Center, Kandy'
      },
      {
        id: '5',
        title: 'Youth Awards Ceremony',
        description: 'Celebrating outstanding achievements of young Sri Lankans across various fields.',
        category: 'Awards',
        type: 'photo',
        date: '2023-12-15',
        url: '/images/gallery/youth-awards.jpg',
        thumbnailUrl: '/images/gallery/thumbs/youth-awards.jpg',
        tags: ['Awards', 'Achievement', 'Recognition', 'Ceremony'],
        event: 'Annual Youth Awards 2023',
        photographer: 'Priya Wijesinghe',
        location: 'Bandaranaike Memorial International Conference Hall'
      },
      {
        id: '6',
        title: 'Community Service Project',
        description: 'Youth volunteers working together on environmental conservation and community development projects.',
        category: 'Community',
        type: 'photo',
        date: '2023-12-10',
        url: '/images/gallery/community-service.jpg',
        thumbnailUrl: '/images/gallery/thumbs/community-service.jpg',
        tags: ['Community', 'Service', 'Environment', 'Volunteering'],
        event: 'Community Service Drive 2023',
        photographer: 'Nimal Perera',
        location: 'Various Communities'
      },
      {
        id: '7',
        title: 'Innovation Showcase',
        description: 'Young entrepreneurs presenting their innovative solutions and startup ideas.',
        category: 'Innovation',
        type: 'video',
        date: '2023-12-05',
        url: '/videos/gallery/innovation-showcase.mp4',
        thumbnailUrl: '/images/gallery/thumbs/innovation-showcase.jpg',
        tags: ['Innovation', 'Entrepreneurship', 'Technology', 'Startups'],
        event: 'Innovation Showcase 2023',
        photographer: 'Tech Team NYSC',
        location: 'Innovation Hub, Colombo'
      },
      {
        id: '8',
        title: 'International Exchange Program',
        description: 'Sri Lankan youth participating in regional exchange programs and cultural immersion activities.',
        category: 'International',
        type: 'photo',
        date: '2023-11-25',
        url: '/images/gallery/international-exchange.jpg',
        thumbnailUrl: '/images/gallery/thumbs/international-exchange.jpg',
        tags: ['International', 'Exchange', 'Culture', 'Global'],
        event: 'SAARC Youth Exchange 2023',
        photographer: 'International Team',
        location: 'Various SAARC Countries'
      }
    ];
    setMediaItems(sampleMedia);
  }, []);

  const categories = ['all', 'Events', 'Cultural', 'Sports', 'Training', 'Awards', 'Community', 'Innovation', 'International'];
  const types = ['all', 'photo', 'video'];

  const filteredMedia = mediaItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesType && matchesSearch;
  });

  const openLightbox = (item: MediaItem) => {
    setSelectedItem(item);
    setCurrentIndex(filteredMedia.findIndex(media => media.id === item.id));
  };

  const closeLightbox = () => {
    setSelectedItem(null);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (currentIndex - 1 + filteredMedia.length) % filteredMedia.length
      : (currentIndex + 1) % filteredMedia.length;
    
    setCurrentIndex(newIndex);
    setSelectedItem(filteredMedia[newIndex]);
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
              Media Gallery
            </h1>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
            }`}>
              Explore our collection of photos and videos capturing the vibrant activities and achievements of NYSC programs and events.
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className={`border-b ${
        isDark ? colors.border.subtle.dark : colors.border.subtle.light
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
              }`} />
              <input
                type="text"
                placeholder="Search media..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
                  isDark 
                    ? `${getThemeColor('background.secondary', true)} ${getThemeColor('border.primary', true)} ${getThemeColor('text.primary', true)} placeholder-gray-400`
                    : `${getThemeColor('background.primary', false)} ${getThemeColor('border.secondary', false)} ${getThemeColor('text.primary', false)} placeholder-gray-500`
                }`}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? isDark
                          ? `${colors.brand.primary.background} ${colors.brand.primary.text} ${colors.effects.glow.brand}`
                          : `${colors.brand.primary.background} ${colors.brand.primary.text} ${colors.effects.glow.brand}`
                        : isDark
                          ? `${getThemeColor('background.secondary', true)} ${getThemeColor('text.secondary', true)} ${colors.hover.background.dark} ${colors.hover.text.primary.dark}`
                          : `${getThemeColor('background.secondary', false)} ${getThemeColor('text.secondary', false)} ${colors.hover.background.light} ${colors.hover.text.primary.light}`
                    }`}
                  >
                    {category === 'all' ? 'All' : category}
                  </button>
                ))}
              </div>

              {/* Type Filter */}
              <div className="flex items-center gap-2">
                <Filter className={`w-4 h-4 ${
                  isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
                }`} />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className={`px-3 py-2 rounded-lg border transition-colors ${
                    isDark 
                      ? `${getThemeColor('background.secondary', true)} ${getThemeColor('border.primary', true)} ${getThemeColor('text.primary', true)}`
                      : `${getThemeColor('background.primary', false)} ${getThemeColor('border.secondary', false)} ${getThemeColor('text.primary', false)}`
                  }`}
                >
                  {types.map(type => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'All Media' : type === 'photo' ? 'Photos' : 'Videos'}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <h2 className={`text-2xl font-bold mb-2 ${
            isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
          }`}>
            Gallery ({filteredMedia.length} items)
          </h2>
          <p className={`${
            isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
          }`}>
            Click on any image or video to view in full size
          </p>
        </div>

        {filteredMedia.length === 0 ? (
          <div className="text-center py-12">
            <Image className={`w-16 h-16 mx-auto mb-4 ${
              isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
            }`} />
            <h3 className={`text-xl font-semibold mb-2 ${
              isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
            }`}>
              No media found
            </h3>
            <p className={`${
              isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
            }`}>
              Try adjusting your search criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMedia.map((item) => (
              <div
                key={item.id}
                className={`group cursor-pointer rounded-lg overflow-hidden border transition-all duration-300 hover:shadow-xl ${
                  isDark 
                    ? `${colors.border.subtle.dark} hover:border-orange-400/50`
                    : `${colors.border.subtle.light} hover:border-orange-500/50`
                }`}
                onClick={() => openLightbox(item)}
              >
                {/* Thumbnail */}
                <div className="relative aspect-square bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <div className={`absolute inset-0 flex items-center justify-center ${
                    isDark ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
                    <Image className={`w-12 h-12 ${
                      isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
                    }`} />
                  </div>
                  
                  {/* Type indicator */}
                  <div className="absolute top-2 left-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      item.type === 'video' 
                        ? 'bg-red-500/80 text-white' 
                        : 'bg-blue-500/80 text-white'
                    }`}>
                      {item.type === 'video' ? 'VIDEO' : 'PHOTO'}
                    </span>
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
                        <Search className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className={`p-4 ${
                  isDark ? getThemeColor('background.secondary', true) : getThemeColor('background.primary', false)
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      isDark ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {item.category}
                    </span>
                    <span className={`text-xs ${
                      isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
                    }`}>
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h3 className={`font-semibold mb-2 line-clamp-2 ${
                    isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                  }`}>
                    {item.title}
                  </h3>
                  
                  <p className={`text-sm text-gray-600 dark:text-gray-400 line-clamp-2 ${
                    isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                  }`}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <div className="relative max-w-6xl max-h-[90vh] mx-4">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Navigation */}
            <button
              onClick={() => navigateLightbox('prev')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={() => navigateLightbox('next')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            
            {/* Media */}
            <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
              {selectedItem.type === 'video' ? (
                <div className="aspect-video bg-black flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold">▶</span>
                    </div>
                    <p>Video Player</p>
                    <p className="text-sm opacity-70">(Video functionality to be implemented)</p>
                  </div>
                </div>
              ) : (
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <Image className="w-24 h-24 text-gray-400" />
                </div>
              )}
              
              {/* Details */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    isDark ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-100 text-orange-600'
                  }`}>
                    {selectedItem.category}
                  </span>
                  <span className={`text-sm ${
                    isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
                  }`}>
                    {new Date(selectedItem.date).toLocaleDateString()}
                  </span>
                </div>
                
                <h2 className={`text-2xl font-bold mb-3 ${
                  isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                }`}>
                  {selectedItem.title}
                </h2>
                
                <p className={`text-base mb-4 ${
                  isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                }`}>
                  {selectedItem.description}
                </p>
                
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 text-sm ${
                  isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                }`}>
                  {selectedItem.event && (
                    <div>
                      <span className="font-medium">Event:</span> {selectedItem.event}
                    </div>
                  )}
                  {selectedItem.location && (
                    <div>
                      <span className="font-medium">Location:</span> {selectedItem.location}
                    </div>
                  )}
                  {selectedItem.photographer && (
                    <div>
                      <span className="font-medium">Photographer:</span> {selectedItem.photographer}
                    </div>
                  )}
                </div>
                
                {selectedItem.tags.length > 0 && (
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.tags.map((tag) => (
                        <span key={tag} className={`px-2 py-1 rounded text-xs ${
                          isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                        }`}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mt-6 flex justify-between items-center">
                  <div className={`text-sm ${
                    isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
                  }`}>
                    {currentIndex + 1} of {filteredMedia.length}
                  </div>
                  
                  <button className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                    isDark 
                      ? `${getThemeColor('background.secondary', true)} ${getThemeColor('text.primary', true)} ${colors.border.subtle.dark} ${colors.hover.background.dark}`
                      : `${getThemeColor('background.primary', false)} ${getThemeColor('text.primary', false)} ${colors.border.subtle.light} ${colors.hover.background.light}`
                  }`}>
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;