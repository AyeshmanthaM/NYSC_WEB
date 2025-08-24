import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Users, Heart, Activity, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../contexts/CompatibilityLanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { colors, getThemeColor } from '../../config/colors';

interface YouthCenter {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  district: string;
  province: string;
  phone: string;
  email: string;
  activities: string[];
  services: string[];
  capacity: number;
  established: string;
  coordinator: string;
  operatingHours: {
    weekdays: string;
    weekend: string;
  };
  specialPrograms: string[];
}

const YouthCenters: React.FC = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [centers, setCenters] = useState<YouthCenter[]>([]);
  const [selectedProvince, setSelectedProvince] = useState('all');

  useEffect(() => {
    const sampleCenters: YouthCenter[] = [
      {
        id: '1',
        name: 'Colombo Youth Activity Center',
        description: 'Premier youth center offering recreational, educational and cultural activities for young people.',
        address: 'No. 67, Independence Avenue, Colombo 07',
        city: 'Colombo',
        district: 'Colombo',
        province: 'Western',
        phone: '+94 11 567 8901',
        email: 'colombo@youthcenters.lk',
        activities: ['Sports', 'Music', 'Dance', 'Drama', 'Art & Crafts', 'Gaming', 'Study Groups'],
        services: ['Career Counseling', 'Mentorship', 'Health Programs', 'Life Skills Training'],
        capacity: 200,
        established: '2008',
        coordinator: 'Mr. Asanka Silva',
        operatingHours: {
          weekdays: '2:00 PM - 8:00 PM',
          weekend: '9:00 AM - 6:00 PM'
        },
        specialPrograms: ['Youth Leadership Program', 'Entrepreneurship Club', 'Environmental Action Group']
      },
      {
        id: '2',
        name: 'Kandy Hills Youth Center',
        description: 'Community-focused center promoting youth engagement and cultural preservation.',
        address: 'No. 23, Dalada Veediya, Kandy',
        city: 'Kandy',
        district: 'Kandy',
        province: 'Central',
        phone: '+94 81 567 8901',
        email: 'kandy@youthcenters.lk',
        activities: ['Traditional Arts', 'Music Classes', 'Sports', 'Cultural Programs', 'Study Support'],
        services: ['Academic Support', 'Cultural Training', 'Health Education', 'Community Service'],
        capacity: 150,
        established: '2011',
        coordinator: 'Ms. Nilmini Rajapaksa',
        operatingHours: {
          weekdays: '3:00 PM - 7:00 PM',
          weekend: '8:00 AM - 5:00 PM'
        },
        specialPrograms: ['Cultural Heritage Program', 'Eco-tourism Initiative', 'Traditional Crafts Workshop']
      },
      {
        id: '3',
        name: 'Galle Coastal Youth Hub',
        description: 'Vibrant center focusing on marine conservation and coastal community development.',
        address: 'No. 45, Beach Road, Galle',
        city: 'Galle',
        district: 'Galle',
        province: 'Southern',
        phone: '+94 91 567 8901',
        email: 'galle@youthcenters.lk',
        activities: ['Beach Sports', 'Marine Education', 'Photography', 'Surfing', 'Art Therapy'],
        services: ['Marine Conservation Training', 'Tourism Skills', 'Language Classes', 'Health Services'],
        capacity: 120,
        established: '2014',
        coordinator: 'Mr. Rohan Fernando',
        operatingHours: {
          weekdays: '2:30 PM - 7:30 PM',
          weekend: '8:30 AM - 5:30 PM'
        },
        specialPrograms: ['Ocean Cleanup Initiative', 'Sustainable Tourism Program', 'Youth Marine Rangers']
      },
      {
        id: '4',
        name: 'Jaffna Cultural Youth Center',
        description: 'Dedicated to preserving Tamil culture while promoting multicultural understanding.',
        address: 'No. 89, Kankesanthurai Road, Jaffna',
        city: 'Jaffna',
        district: 'Jaffna',
        province: 'Northern',
        phone: '+94 21 567 8901',
        email: 'jaffna@youthcenters.lk',
        activities: ['Classical Dance', 'Music', 'Literature', 'Drama', 'Language Exchange', 'Sports'],
        services: ['Cultural Education', 'Peace Building', 'Career Guidance', 'Mental Health Support'],
        capacity: 100,
        established: '2017',
        coordinator: 'Ms. Priya Krishnan',
        operatingHours: {
          weekdays: '3:00 PM - 7:00 PM',
          weekend: '9:00 AM - 4:00 PM'
        },
        specialPrograms: ['Cultural Bridge Program', 'Peace Through Arts', 'Youth Reconciliation Forum']
      }
    ];
    setCenters(sampleCenters);
  }, []);

  const provinces = ['all', 'Western', 'Central', 'Southern', 'Northern', 'Eastern', 'North Western', 'North Central', 'Uva', 'Sabaragamuwa'];

  const filteredCenters = centers.filter(center => {
    return selectedProvince === 'all' || center.province === selectedProvince;
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
                isDark ? 'bg-purple-500/20' : 'bg-purple-100'
              }`}>
                <Heart className={`w-12 h-12 ${
                  isDark ? 'text-purple-300' : 'text-purple-600'
                }`} />
              </div>
            </div>
            <h1 className={`text-4xl lg:text-6xl font-bold mb-6 ${
              isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
            }`}>
              Youth Centers
            </h1>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
            }`}>
              Safe and supportive spaces where young people can connect, learn, and grow through recreational activities and community programs.
            </p>
          </div>
        </div>
      </div>

      {/* Province Filter */}
      <div className={`border-b ${
        isDark ? colors.border.subtle.dark : colors.border.subtle.light
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h2 className={`text-lg font-semibold ${
              isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
            }`}>
              Youth Centers ({filteredCenters.length})
            </h2>
            
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

      {/* Centers Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredCenters.map((center) => (
            <div key={center.id} className={`rounded-lg border transition-all duration-300 hover:shadow-xl ${
              isDark 
                ? `${getThemeColor('background.secondary', true)} ${colors.border.subtle.dark}`
                : `${getThemeColor('background.primary', false)} ${colors.border.subtle.light}`
            }`}>
              <div className="aspect-video bg-gradient-to-r from-purple-400 to-pink-400 rounded-t-lg flex items-center justify-center">
                <Heart className="w-16 h-16 text-white" />
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className={`text-xl font-bold mb-2 ${
                      isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                    }`}>
                      {center.name}
                    </h3>
                    <div className={`flex items-center gap-2 text-sm ${
                      isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                    }`}>
                      <MapPin className="w-4 h-4" />
                      <span>{center.city}, {center.province}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-600'
                  }`}>
                    Est. {center.established}
                  </span>
                </div>

                <p className={`text-sm mb-4 ${
                  isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                }`}>
                  {center.description}
                </p>

                <div className={`grid grid-cols-2 gap-4 mb-4 text-sm ${
                  isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                }`}>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>Capacity: {center.capacity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    <span>{center.activities.length} Activities</span>
                  </div>
                </div>

                <div className={`space-y-2 mb-4 text-sm ${
                  isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                }`}>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{center.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{center.operatingHours.weekdays}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className={`text-sm font-semibold mb-2 ${
                    isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                  }`}>
                    Activities:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {center.activities.slice(0, 4).map((activity) => (
                      <span key={activity} className={`px-2 py-1 rounded text-xs ${
                        isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {activity}
                      </span>
                    ))}
                    {center.activities.length > 4 && (
                      <span className={`px-2 py-1 rounded text-xs ${
                        isDark ? 'bg-gray-500/20 text-gray-300' : 'bg-gray-100 text-gray-600'
                      }`}>
                        +{center.activities.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                <button className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                  isDark
                    ? `${colors.brand.primary.background} ${colors.brand.primary.text} hover:bg-orange-600`
                    : `${colors.brand.primary.background} ${colors.brand.primary.text} hover:bg-orange-600`
                }`}>
                  <ExternalLink className="w-4 h-4" />
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YouthCenters;