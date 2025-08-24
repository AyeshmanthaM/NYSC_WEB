import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, BookOpen, Award, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { colors, getThemeColor } from '../../config/colors';

interface Workshop {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  date: string;
  time: string;
  location: string;
  instructor: string;
  capacity: number;
  registered: number;
  price: number;
  materials: string[];
  outcomes: string[];
  registrationUrl?: string;
  image?: string;
}

const Workshops: React.FC = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  // Sample data - replace with actual API call
  useEffect(() => {
    const sampleWorkshops: Workshop[] = [
      {
        id: '1',
        title: 'Digital Marketing Fundamentals',
        description: 'Learn the basics of digital marketing including social media marketing, content creation, and online advertising strategies.',
        category: 'Marketing',
        level: 'Beginner',
        duration: '2 days',
        date: '2024-02-20',
        time: '09:00',
        location: 'NYSC Training Center, Colombo',
        instructor: 'Sarah Fernando',
        capacity: 30,
        registered: 25,
        price: 0,
        materials: ['Laptop/Tablet', 'Notebook', 'Digital Marketing Toolkit'],
        outcomes: ['Create effective social media campaigns', 'Understand SEO basics', 'Develop content strategies'],
        registrationUrl: '/register/digital-marketing-workshop'
      },
      {
        id: '2',
        title: 'Leadership Skills Development',
        description: 'Comprehensive workshop focusing on developing essential leadership qualities and team management skills.',
        category: 'Leadership',
        level: 'Intermediate',
        duration: '3 days',
        date: '2024-02-25',
        time: '09:30',
        location: 'Provincial Center, Kandy',
        instructor: 'Prof. Rajesh Kumar',
        capacity: 25,
        registered: 18,
        price: 2500,
        materials: ['Leadership handbook', 'Case studies', 'Assessment tools'],
        outcomes: ['Master communication skills', 'Learn conflict resolution', 'Build effective teams'],
        registrationUrl: '/register/leadership-workshop'
      },
      {
        id: '3',
        title: 'Web Development Bootcamp',
        description: 'Intensive coding bootcamp covering HTML, CSS, JavaScript, and modern web development frameworks.',
        category: 'Technology',
        level: 'Beginner',
        duration: '5 days',
        date: '2024-03-05',
        time: '08:30',
        location: 'Tech Hub, Colombo',
        instructor: 'Ahmed Hassan',
        capacity: 20,
        registered: 15,
        price: 5000,
        materials: ['Laptop with code editor', 'Development environment setup guide'],
        outcomes: ['Build responsive websites', 'Understand modern frameworks', 'Deploy web applications'],
        registrationUrl: '/register/web-development-bootcamp'
      },
      {
        id: '4',
        title: 'Public Speaking Mastery',
        description: 'Overcome stage fright and master the art of public speaking with practical techniques and real-world practice.',
        category: 'Communication',
        level: 'Beginner',
        duration: '1 day',
        date: '2024-03-10',
        time: '10:00',
        location: 'Community Hall, Galle',
        instructor: 'Dr. Priya Wijesinghe',
        capacity: 40,
        registered: 32,
        price: 1500,
        materials: ['Voice recording app', 'Practice materials'],
        outcomes: ['Confidence in public speaking', 'Effective presentation skills', 'Audience engagement techniques'],
        registrationUrl: '/register/public-speaking-workshop'
      },
      {
        id: '5',
        title: 'Entrepreneurship & Business Planning',
        description: 'Learn how to turn your business ideas into reality with comprehensive business planning and entrepreneurship skills.',
        category: 'Business',
        level: 'Intermediate',
        duration: '4 days',
        date: '2024-03-15',
        time: '09:00',
        location: 'Innovation Center, Colombo',
        instructor: 'Nimal Perera',
        capacity: 35,
        registered: 28,
        price: 3000,
        materials: ['Business plan template', 'Market research tools', 'Financial planning worksheets'],
        outcomes: ['Create viable business plans', 'Understand market research', 'Learn funding strategies'],
        registrationUrl: '/register/entrepreneurship-workshop'
      },
      {
        id: '6',
        title: 'Advanced Photography Techniques',
        description: 'Master advanced photography techniques including lighting, composition, and post-processing for professional results.',
        category: 'Creative Arts',
        level: 'Advanced',
        duration: '3 days',
        date: '2024-03-20',
        time: '08:00',
        location: 'Art Center, Negombo',
        instructor: 'Chamara Silva',
        capacity: 15,
        registered: 12,
        price: 4000,
        materials: ['DSLR camera', 'Tripod', 'Photo editing software'],
        outcomes: ['Master lighting techniques', 'Advanced composition skills', 'Professional photo editing'],
        registrationUrl: '/register/photography-workshop'
      }
    ];
    setWorkshops(sampleWorkshops);
  }, []);

  const categories = ['all', 'Marketing', 'Leadership', 'Technology', 'Communication', 'Business', 'Creative Arts'];
  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredWorkshops = workshops.filter(workshop => {
    return (selectedCategory === 'all' || workshop.category === selectedCategory) &&
           (selectedLevel === 'all' || workshop.level === selectedLevel);
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-500/20 text-green-300';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-300';
      case 'Advanced': return 'bg-red-500/20 text-red-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Marketing': return BookOpen;
      case 'Leadership': return Users;
      case 'Technology': return BookOpen;
      case 'Communication': return Users;
      case 'Business': return Award;
      case 'Creative Arts': return BookOpen;
      default: return BookOpen;
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
            <h1 className={`text-4xl lg:text-6xl font-bold mb-6 ${
              isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
            }`}>
              Workshops & Training
            </h1>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
            }`}>
              Enhance your skills with our comprehensive workshops designed to empower youth with practical knowledge and expertise.
            </p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className={`border-b ${
        isDark ? colors.border.subtle.dark : colors.border.subtle.light
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? isDark
                        ? `${colors.brand.primary.background} ${colors.brand.primary.text} ${colors.effects.glow.brand}`
                        : `${colors.brand.primary.background} ${colors.brand.primary.text} ${colors.effects.glow.brand}`
                      : isDark
                        ? `${getThemeColor('background.secondary', true)} ${getThemeColor('text.secondary', true)} ${colors.hover.background.dark} ${colors.hover.text.primary.dark}`
                        : `${getThemeColor('background.secondary', false)} ${getThemeColor('text.secondary', false)} ${colors.hover.background.light} ${colors.hover.text.primary.light}`
                  }`}
                >
                  {category === 'all' ? 'All Categories' : category}
                </button>
              ))}
            </div>

            {/* Level Filter */}
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${
                isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
              }`}>
                Level:
              </span>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className={`px-3 py-2 rounded-lg border transition-colors ${
                  isDark 
                    ? `${getThemeColor('background.secondary', true)} ${getThemeColor('border.primary', true)} ${getThemeColor('text.primary', true)}`
                    : `${getThemeColor('background.primary', false)} ${getThemeColor('border.secondary', false)} ${getThemeColor('text.primary', false)}`
                }`}
              >
                {levels.map(level => (
                  <option key={level} value={level}>
                    {level === 'all' ? 'All Levels' : level}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Workshops Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <h2 className={`text-2xl font-bold mb-2 ${
            isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
          }`}>
            Available Workshops ({filteredWorkshops.length})
          </h2>
          <p className={`${
            isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
          }`}>
            Choose from our diverse range of professional development workshops
          </p>
        </div>

        {filteredWorkshops.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className={`w-16 h-16 mx-auto mb-4 ${
              isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
            }`} />
            <h3 className={`text-xl font-semibold mb-2 ${
              isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
            }`}>
              No workshops found
            </h3>
            <p className={`${
              isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
            }`}>
              Try adjusting your filters or check back later for new workshops
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredWorkshops.map((workshop) => {
              const IconComponent = getCategoryIcon(workshop.category);
              const capacityPercentage = (workshop.registered / workshop.capacity) * 100;
              
              return (
                <div key={workshop.id} className={`rounded-lg border transition-all duration-300 hover:shadow-xl ${
                  isDark 
                    ? `${getThemeColor('background.secondary', true)} ${colors.border.subtle.dark} ${colors.hover.border.subtle.dark}`
                    : `${getThemeColor('background.primary', false)} ${colors.border.subtle.light} ${colors.hover.border.subtle.light}`
                }`}>
                  {workshop.image && (
                    <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-t-lg"></div>
                  )}
                  
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${
                          isDark ? 'bg-orange-500/20' : 'bg-orange-100'
                        }`}>
                          <IconComponent className={`w-5 h-5 ${
                            isDark ? 'text-orange-300' : 'text-orange-600'
                          }`} />
                        </div>
                        <div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-600'
                          }`}>
                            {workshop.category}
                          </span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(workshop.level)}`}>
                        {workshop.level}
                      </span>
                    </div>

                    {/* Title and Description */}
                    <h3 className={`text-lg font-bold mb-3 ${
                      isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                    }`}>
                      {workshop.title}
                    </h3>
                    
                    <p className={`text-sm mb-4 leading-relaxed ${
                      isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                    }`}>
                      {workshop.description}
                    </p>

                    {/* Workshop Details */}
                    <div className={`space-y-2 mb-4 text-sm ${
                      isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                    }`}>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(workshop.date).toLocaleDateString()} at {workshop.time}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{workshop.duration}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{workshop.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>Instructor: {workshop.instructor}</span>
                      </div>
                    </div>

                    {/* Capacity */}
                    <div className="mb-4">
                      <div className={`flex justify-between text-sm mb-1 ${
                        isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                      }`}>
                        <span>Registration</span>
                        <span>{workshop.registered}/{workshop.capacity}</span>
                      </div>
                      <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2`}>
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            capacityPercentage >= 90 ? 'bg-red-500' : 
                            capacityPercentage >= 70 ? 'bg-yellow-500' : 
                            'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(capacityPercentage, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Price and Registration */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className={`text-2xl font-bold ${
                          isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                        }`}>
                          {workshop.price === 0 ? 'Free' : `Rs. ${workshop.price}`}
                        </span>
                      </div>
                      
                      {workshop.registrationUrl && (
                        <button className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                          capacityPercentage >= 100 
                            ? isDark 
                              ? `${getThemeColor('background.secondary', true)} ${getThemeColor('text.muted', true)} cursor-not-allowed`
                              : `${getThemeColor('background.secondary', false)} ${getThemeColor('text.muted', false)} cursor-not-allowed`
                            : isDark
                              ? `${colors.brand.primary.background} ${colors.brand.primary.text} hover:bg-orange-600 ${colors.effects.glow.brand}`
                              : `${colors.brand.primary.background} ${colors.brand.primary.text} hover:bg-orange-600 ${colors.effects.glow.brand}`
                        }`}
                          disabled={capacityPercentage >= 100}
                        >
                          <ExternalLink className="w-4 h-4" />
                          {capacityPercentage >= 100 ? 'Full' : 'Register'}
                        </button>
                      )}
                    </div>

                    {/* Learning Outcomes */}
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h4 className={`text-sm font-semibold mb-2 ${
                        isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                      }`}>
                        What You'll Learn:
                      </h4>
                      <ul className={`text-xs space-y-1 ${
                        isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                      }`}>
                        {workshop.outcomes.slice(0, 3).map((outcome, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-green-500 mt-0.5">•</span>
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Workshops;