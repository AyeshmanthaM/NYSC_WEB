import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Users, BookOpen, Award, ExternalLink } from 'lucide-react';
import { useTranslationWithNamespace } from '../../hooks/useTranslationWithNamespace';
import { useTheme } from '../../contexts/ThemeContext';
import { colors, getThemeColor } from '../../config/colors';

interface TrainingCenter {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  district: string;
  province: string;
  phone: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  facilities: string[];
  programs: string[];
  capacity: number;
  established: string;
  director: string;
  operatingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  image?: string;
  website?: string;
}

const TrainingCenters: React.FC = () => {
  const { t, ready } = useTranslationWithNamespace('centers');
  const { isDark } = useTheme();
  const [centers, setCenters] = useState<TrainingCenter[]>([]);
  const [selectedProvince, setSelectedProvince] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data - replace with actual API call
  useEffect(() => {
    const sampleCenters: TrainingCenter[] = [
      {
        id: '1',
        name: 'NYSC Main Training Center',
        description: 'Our flagship training facility offering comprehensive vocational and skills development programs.',
        address: 'No. 123, Galle Road, Colombo 03',
        city: 'Colombo',
        district: 'Colombo',
        province: 'Western',
        phone: '+94 11 234 5678',
        email: 'maintraining@nysc.lk',
        coordinates: { lat: 6.9271, lng: 79.8612 },
        facilities: [
          'Computer Lab with 50 stations',
          'Multimedia Training Rooms',
          'Workshop Facilities',
          'Library and Resource Center',
          'Cafeteria and Rest Areas',
          'Parking Facilities',
          'Accessibility Features'
        ],
        programs: [
          'Information Technology',
          'Digital Marketing',
          'Graphic Design',
          'Web Development',
          'Business Management',
          'English Language',
          'Leadership Development'
        ],
        capacity: 500,
        established: '2010',
        director: 'Ms. Chandani Perera',
        operatingHours: {
          weekdays: '8:00 AM - 6:00 PM',
          saturday: '8:00 AM - 4:00 PM',
          sunday: 'Closed'
        },
        website: 'https://training.nysc.lk'
      },
      {
        id: '2',
        name: 'Kandy Regional Training Center',
        description: 'Serving the Central Province with specialized technical and vocational training programs.',
        address: 'No. 45, Peradeniya Road, Kandy',
        city: 'Kandy',
        district: 'Kandy',
        province: 'Central',
        phone: '+94 81 234 5678',
        email: 'kandy@nysc.lk',
        coordinates: { lat: 7.2906, lng: 80.6337 },
        facilities: [
          'Technical Workshop',
          'Computer Training Lab',
          'Conference Hall',
          'Resource Library',
          'Student Accommodation',
          'Sports Facilities'
        ],
        programs: [
          'Automotive Technology',
          'Electrical Engineering',
          'Carpentry and Joinery',
          'Plumbing',
          'Agriculture Technology',
          'Food Technology'
        ],
        capacity: 300,
        established: '2012',
        director: 'Mr. Sunil Jayasinghe',
        operatingHours: {
          weekdays: '8:00 AM - 5:00 PM',
          saturday: '8:00 AM - 3:00 PM',
          sunday: 'Closed'
        }
      },
      {
        id: '3',
        name: 'Galle Southern Training Hub',
        description: 'Comprehensive training facility focusing on tourism, hospitality, and marine-related skills.',
        address: 'No. 78, Matara Road, Galle',
        city: 'Galle',
        district: 'Galle',
        province: 'Southern',
        phone: '+94 91 234 5678',
        email: 'galle@nysc.lk',
        coordinates: { lat: 6.0329, lng: 80.217 },
        facilities: [
          'Hospitality Training Kitchen',
          'Tourism Simulation Center',
          'Language Lab',
          'Maritime Training Pool',
          'Cultural Performance Hall',
          'Guest Accommodation'
        ],
        programs: [
          'Hotel Management',
          'Culinary Arts',
          'Tour Guiding',
          'Marine Engineering',
          'Fisheries Technology',
          'Traditional Crafts'
        ],
        capacity: 250,
        established: '2015',
        director: 'Mrs. Kamala Fernando',
        operatingHours: {
          weekdays: '8:00 AM - 5:30 PM',
          saturday: '8:00 AM - 3:30 PM',
          sunday: 'Closed'
        }
      },
      {
        id: '4',
        name: 'Jaffna Northern Skills Center',
        description: 'Specialized center providing culturally relevant training programs for the Northern Province.',
        address: 'No. 156, Hospital Road, Jaffna',
        city: 'Jaffna',
        district: 'Jaffna',
        province: 'Northern',
        phone: '+94 21 234 5678',
        email: 'jaffna@nysc.lk',
        coordinates: { lat: 9.6615, lng: 80.0255 },
        facilities: [
          'Textile and Garment Workshop',
          'Agricultural Training Plots',
          'Handicraft Center',
          'IT Learning Center',
          'Community Meeting Hall',
          'Mobile Training Units'
        ],
        programs: [
          'Textile and Garment Making',
          'Agricultural Extension',
          'Traditional Handicrafts',
          'Small Business Development',
          'Community Leadership',
          'Conflict Resolution'
        ],
        capacity: 200,
        established: '2018',
        director: 'Mr. Vimal Krishnan',
        operatingHours: {
          weekdays: '8:30 AM - 5:00 PM',
          saturday: '8:30 AM - 3:00 PM',
          sunday: 'Closed'
        }
      },
      {
        id: '5',
        name: 'Batticaloa Eastern Development Center',
        description: 'Multi-purpose training facility supporting post-conflict reconstruction and development.',
        address: 'No. 89, Main Street, Batticaloa',
        city: 'Batticaloa',
        district: 'Batticaloa',
        province: 'Eastern',
        phone: '+94 65 234 5678',
        email: 'batticaloa@nysc.lk',
        coordinates: { lat: 7.7102, lng: 81.6924 },
        facilities: [
          'Multi-purpose Training Halls',
          'Solar Technology Lab',
          'Aquaculture Training Ponds',
          'Women\'s Empowerment Center',
          'Youth Innovation Lab',
          'Health and Safety Training Area'
        ],
        programs: [
          'Renewable Energy Technology',
          'Aquaculture and Fisheries',
          'Women\'s Entrepreneurship',
          'Youth Innovation',
          'Disaster Management',
          'Peace Building'
        ],
        capacity: 180,
        established: '2019',
        director: 'Ms. Shanti Rajendran',
        operatingHours: {
          weekdays: '8:00 AM - 5:30 PM',
          saturday: '8:00 AM - 4:00 PM',
          sunday: 'Closed'
        }
      }
    ];
    setCenters(sampleCenters);
  }, []);

  const provinces = ['all', 'Western', 'Central', 'Southern', 'Northern', 'Eastern', 'North Western', 'North Central', 'Uva', 'Sabaragamuwa'];

  const filteredCenters = centers.filter(center => {
    const matchesProvince = selectedProvince === 'all' || center.province === selectedProvince;
    const matchesSearch = center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         center.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         center.programs.some(program => program.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesProvince && matchesSearch;
  });

  // Show loading state while translations are not ready
  if (!ready) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDark ? getThemeColor('background.primary', true) : getThemeColor('background.primary', false)
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className={`${isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)}`}>
            Loading...
          </p>
        </div>
      </div>
    );
  }

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
                isDark ? 'bg-green-500/20' : 'bg-green-100'
              }`}>
                <BookOpen className={`w-12 h-12 ${
                  isDark ? 'text-green-300' : 'text-green-600'
                }`} />
              </div>
            </div>
            <h1 className={`text-4xl lg:text-6xl font-bold mb-6 ${
              isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
            }`}>
              Training Centers
            </h1>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
            }`}>
              Discover our network of training centers across Sri Lanka, offering world-class facilities and comprehensive programs for skills development and career advancement.
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
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search centers, cities, or programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                  isDark 
                    ? `${getThemeColor('background.secondary', true)} ${getThemeColor('border.primary', true)} ${getThemeColor('text.primary', true)} placeholder-gray-400`
                    : `${getThemeColor('background.primary', false)} ${getThemeColor('border.secondary', false)} ${getThemeColor('text.primary', false)} placeholder-gray-500`
                }`}
              />
            </div>

            {/* Province Filter */}
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${
                isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
              }`}>
                Province:
              </span>
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className={`px-3 py-2 rounded-lg border transition-colors ${
                  isDark 
                    ? `${getThemeColor('background.secondary', true)} ${getThemeColor('border.primary', true)} ${getThemeColor('text.primary', true)}`
                    : `${getThemeColor('background.primary', false)} ${getThemeColor('border.secondary', false)} ${getThemeColor('text.primary', false)}`
                }`}
              >
                {provinces.map(province => (
                  <option key={province} value={province}>
                    {province === 'all' ? 'All Provinces' : province}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Centers Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <h2 className={`text-2xl font-bold mb-2 ${
            isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
          }`}>
            Our Training Centers ({filteredCenters.length})
          </h2>
          <p className={`${
            isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
          }`}>
            Find the nearest training center and explore the programs available in your area
          </p>
        </div>

        {filteredCenters.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className={`w-16 h-16 mx-auto mb-4 ${
              isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
            }`} />
            <h3 className={`text-xl font-semibold mb-2 ${
              isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
            }`}>
              No training centers found
            </h3>
            <p className={`${
              isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
            }`}>
              Try adjusting your search criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredCenters.map((center) => (
              <div key={center.id} className={`rounded-lg border transition-all duration-300 hover:shadow-xl ${
                isDark 
                  ? `${getThemeColor('background.secondary', true)} ${colors.border.subtle.dark} ${colors.hover.border.subtle.dark}`
                  : `${getThemeColor('background.primary', false)} ${colors.border.subtle.light} ${colors.hover.border.subtle.light}`
              }`}>
                {center.image && (
                  <div className="aspect-video bg-gradient-to-r from-green-400 to-blue-500 rounded-t-lg flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-white" />
                  </div>
                )}
                
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className={`text-xl font-bold mb-2 ${
                        isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                      }`}>
                        {center.name}
                      </h3>
                      <div className={`flex items-center gap-2 text-sm mb-2 ${
                        isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                      }`}>
                        <MapPin className="w-4 h-4" />
                        <span>{center.city}, {center.province} Province</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      isDark ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-600'
                    }`}>
                      Est. {center.established}
                    </span>
                  </div>

                  {/* Description */}
                  <p className={`text-sm mb-4 leading-relaxed ${
                    isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                  }`}>
                    {center.description}
                  </p>

                  {/* Key Info */}
                  <div className={`grid grid-cols-2 gap-4 mb-4 text-sm ${
                    isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                  }`}>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>Capacity: {center.capacity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      <span>{center.programs.length} Programs</span>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className={`space-y-2 mb-4 text-sm ${
                    isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                  }`}>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{center.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{center.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{center.operatingHours.weekdays}</span>
                    </div>
                  </div>

                  {/* Director */}
                  <div className={`mb-4 p-3 rounded-lg ${
                    isDark ? getThemeColor('background.primary', true) : 'bg-gray-50'
                  }`}>
                    <span className={`text-sm font-medium ${
                      isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                    }`}>
                      Director: {center.director}
                    </span>
                  </div>

                  {/* Programs Preview */}
                  <div className="mb-4">
                    <h4 className={`text-sm font-semibold mb-2 ${
                      isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                    }`}>
                      Key Programs:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {center.programs.slice(0, 4).map((program) => (
                        <span key={program} className={`px-2 py-1 rounded text-xs ${
                          isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-600'
                        }`}>
                          {program}
                        </span>
                      ))}
                      {center.programs.length > 4 && (
                        <span className={`px-2 py-1 rounded text-xs ${
                          isDark ? 'bg-gray-500/20 text-gray-300' : 'bg-gray-100 text-gray-600'
                        }`}>
                          +{center.programs.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                      isDark
                        ? `${colors.brand.primary.background} ${colors.brand.primary.text} hover:bg-orange-600 ${colors.effects.glow.brand}`
                        : `${colors.brand.primary.background} ${colors.brand.primary.text} hover:bg-orange-600 ${colors.effects.glow.brand}`
                    }`}>
                      <ExternalLink className="w-4 h-4" />
                      View Details
                    </button>
                    
                    <button className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                      isDark 
                        ? `${getThemeColor('background.secondary', true)} ${getThemeColor('text.primary', true)} ${colors.border.subtle.dark} ${colors.hover.background.dark}`
                        : `${getThemeColor('background.primary', false)} ${getThemeColor('text.primary', false)} ${colors.border.subtle.light} ${colors.hover.background.light}`
                    }`}>
                      <MapPin className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Statistics */}
        <div className={`mt-12 p-6 rounded-lg border ${
          isDark 
            ? `${getThemeColor('background.secondary', true)} ${colors.border.subtle.dark}`
            : `${getThemeColor('background.secondary', false)} ${colors.border.subtle.light}`
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className={`text-3xl font-bold mb-2 ${
                isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
              }`}>
                {centers.length}
              </div>
              <div className={`text-sm ${
                isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
              }`}>
                Training Centers
              </div>
            </div>
            
            <div>
              <div className={`text-3xl font-bold mb-2 ${
                isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
              }`}>
                {centers.reduce((sum, center) => sum + center.capacity, 0).toLocaleString()}
              </div>
              <div className={`text-sm ${
                isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
              }`}>
                Total Capacity
              </div>
            </div>
            
            <div>
              <div className={`text-3xl font-bold mb-2 ${
                isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
              }`}>
                {[...new Set(centers.flatMap(center => center.programs))].length}
              </div>
              <div className={`text-sm ${
                isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
              }`}>
                Different Programs
              </div>
            </div>
            
            <div>
              <div className={`text-3xl font-bold mb-2 ${
                isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
              }`}>
                9
              </div>
              <div className={`text-sm ${
                isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
              }`}>
                Provinces Covered
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingCenters;