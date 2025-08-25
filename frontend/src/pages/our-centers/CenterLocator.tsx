import React, { useState, useEffect } from 'react';
import { MapPin, Search, Filter, Navigation, Phone, Clock } from 'lucide-react';
import { useTranslationWithNamespace } from '../../hooks/useTranslationWithNamespace';
import { useTheme } from '../../contexts/ThemeContext';
import { colors, getThemeColor } from '../../config/colors';

interface Center {
  id: string;
  name: string;
  type: 'Training Center' | 'Youth Center' | 'District Office';
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
  distance?: number;
  operatingHours: string;
  services: string[];
}

const CenterLocator: React.FC = () => {
  const { t, ready } = useTranslationWithNamespace('centers');
  const { isDark } = useTheme();
  const [centers, setCenters] = useState<Center[]>([]);
  const [filteredCenters, setFilteredCenters] = useState<Center[]>([]);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedProvince, setSelectedProvince] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // Sample data - replace with actual API call
  useEffect(() => {
    const sampleCenters: Center[] = [
      {
        id: '1',
        name: 'NYSC Main Training Center',
        type: 'Training Center',
        address: 'No. 123, Galle Road, Colombo 03',
        city: 'Colombo',
        district: 'Colombo',
        province: 'Western',
        phone: '+94 11 234 5678',
        email: 'maintraining@nysc.lk',
        coordinates: { lat: 6.9271, lng: 79.8612 },
        operatingHours: '8:00 AM - 6:00 PM',
        services: ['IT Training', 'Digital Marketing', 'Leadership Development']
      },
      {
        id: '2',
        name: 'Colombo Youth Activity Center',
        type: 'Youth Center',
        address: 'No. 67, Independence Avenue, Colombo 07',
        city: 'Colombo',
        district: 'Colombo',
        province: 'Western',
        phone: '+94 11 567 8901',
        email: 'colombo@youthcenters.lk',
        coordinates: { lat: 6.9147, lng: 79.8774 },
        operatingHours: '2:00 PM - 8:00 PM',
        services: ['Sports', 'Music', 'Art & Crafts']
      },
      {
        id: '3',
        name: 'Colombo District Office',
        type: 'District Office',
        address: 'No. 456, Galle Road, Colombo 03',
        city: 'Colombo',
        district: 'Colombo',
        province: 'Western',
        phone: '+94 11 234 5670',
        email: 'colombo@nysc.gov.lk',
        coordinates: { lat: 6.9244, lng: 79.8540 },
        operatingHours: '8:30 AM - 4:15 PM',
        services: ['Registration', 'Certification', 'Information']
      },
      {
        id: '4',
        name: 'Kandy Regional Training Center',
        type: 'Training Center',
        address: 'No. 45, Peradeniya Road, Kandy',
        city: 'Kandy',
        district: 'Kandy',
        province: 'Central',
        phone: '+94 81 234 5678',
        email: 'kandy@nysc.lk',
        coordinates: { lat: 7.2906, lng: 80.6337 },
        operatingHours: '8:00 AM - 5:00 PM',
        services: ['Technical Training', 'Agriculture', 'Handicrafts']
      },
      {
        id: '5',
        name: 'Kandy Hills Youth Center',
        type: 'Youth Center',
        address: 'No. 23, Dalada Veediya, Kandy',
        city: 'Kandy',
        district: 'Kandy',
        province: 'Central',
        phone: '+94 81 567 8901',
        email: 'kandy@youthcenters.lk',
        coordinates: { lat: 7.2955, lng: 80.6357 },
        operatingHours: '3:00 PM - 7:00 PM',
        services: ['Cultural Arts', 'Traditional Music', 'Study Support']
      },
      {
        id: '6',
        name: 'Galle Southern Training Hub',
        type: 'Training Center',
        address: 'No. 78, Matara Road, Galle',
        city: 'Galle',
        district: 'Galle',
        province: 'Southern',
        phone: '+94 91 234 5678',
        email: 'galle@nysc.lk',
        coordinates: { lat: 6.0329, lng: 80.217 },
        operatingHours: '8:00 AM - 5:30 PM',
        services: ['Hospitality', 'Tourism', 'Marine Training']
      }
    ];
    setCenters(sampleCenters);
    setFilteredCenters(sampleCenters);
  }, []);

  const types = ['all', 'Training Center', 'Youth Center', 'District Office'];
  const provinces = ['all', 'Western', 'Central', 'Southern', 'Northern', 'Eastern', 'North Western', 'North Central', 'Uva', 'Sabaragamuwa'];

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Get user's current location
  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userCoords);
          
          // Calculate distances and sort by nearest
          const centersWithDistance = centers.map(center => ({
            ...center,
            distance: calculateDistance(
              userCoords.lat, userCoords.lng,
              center.coordinates.lat, center.coordinates.lng
            )
          }));
          
          setCenters(centersWithDistance);
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLoadingLocation(false);
          alert('Unable to get your location. Please enable location services.');
        }
      );
    } else {
      setIsLoadingLocation(false);
      alert('Geolocation is not supported by this browser.');
    }
  };

  // Filter centers based on selected criteria
  useEffect(() => {
    let filtered = centers.filter(center => {
      const matchesType = selectedType === 'all' || center.type === selectedType;
      const matchesProvince = selectedProvince === 'all' || center.province === selectedProvince;
      const matchesSearch = center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           center.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           center.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesType && matchesProvince && matchesSearch;
    });

    // Sort by distance if user location is available
    if (userLocation) {
      filtered = filtered.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }

    setFilteredCenters(filtered);
  }, [centers, selectedType, selectedProvince, searchTerm, userLocation]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Training Center': return '🎓';
      case 'Youth Center': return '🏢';
      case 'District Office': return '🏛️';
      default: return '📍';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Training Center': return isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-600';
      case 'Youth Center': return isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-600';
      case 'District Office': return isDark ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-600';
      default: return isDark ? 'bg-gray-500/20 text-gray-300' : 'bg-gray-100 text-gray-600';
    }
  };

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
                isDark ? 'bg-red-500/20' : 'bg-red-100'
              }`}>
                <MapPin className={`w-12 h-12 ${
                  isDark ? 'text-red-300' : 'text-red-600'
                }`} />
              </div>
            </div>
            <h1 className={`text-4xl lg:text-6xl font-bold mb-6 ${
              isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
            }`}>
              Center Locator
            </h1>
            <p className={`text-xl max-w-3xl mx-auto mb-8 ${
              isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
            }`}>
              Find the nearest NYSC facilities including training centers, youth centers, and district offices across Sri Lanka.
            </p>
            
            {/* Get Current Location Button */}
            <button
              onClick={getCurrentLocation}
              disabled={isLoadingLocation}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 font-medium ${
                isLoadingLocation
                  ? isDark
                    ? `${getThemeColor('background.secondary', true)} ${getThemeColor('text.muted', true)} cursor-not-allowed`
                    : `${getThemeColor('background.secondary', false)} ${getThemeColor('text.muted', false)} cursor-not-allowed`
                  : isDark
                    ? `${colors.brand.primary.background} ${colors.brand.primary.text} hover:bg-orange-600 ${colors.effects.glow.brand}`
                    : `${colors.brand.primary.background} ${colors.brand.primary.text} hover:bg-orange-600 ${colors.effects.glow.brand}`
              }`}
            >
              <Navigation className="w-5 h-5" />
              {isLoadingLocation ? 'Getting Location...' : 'Find Centers Near Me'}
            </button>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className={`border-b ${
        isDark ? colors.border.subtle.dark : colors.border.subtle.light
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
              }`} />
              <input
                type="text"
                placeholder="Search centers or services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
                  isDark 
                    ? `${getThemeColor('background.secondary', true)} ${getThemeColor('border.primary', true)} ${getThemeColor('text.primary', true)} placeholder-gray-400`
                    : `${getThemeColor('background.primary', false)} ${getThemeColor('border.secondary', false)} ${getThemeColor('text.primary', false)} placeholder-gray-500`
                }`}
              />
            </div>

            {/* Type Filter */}
            <div className="relative">
              <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
              }`} />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors appearance-none ${
                  isDark 
                    ? `${getThemeColor('background.secondary', true)} ${getThemeColor('border.primary', true)} ${getThemeColor('text.primary', true)}`
                    : `${getThemeColor('background.primary', false)} ${getThemeColor('border.secondary', false)} ${getThemeColor('text.primary', false)}`
                }`}
              >
                {types.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type}
                  </option>
                ))}
              </select>
            </div>

            {/* Province Filter */}
            <div className="relative">
              <MapPin className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
              }`} />
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors appearance-none ${
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

            {/* Results Count */}
            <div className={`flex items-center justify-center px-4 py-3 rounded-lg border ${
              isDark 
                ? `${getThemeColor('background.secondary', true)} ${colors.border.subtle.dark}`
                : `${getThemeColor('background.secondary', false)} ${colors.border.subtle.light}`
            }`}>
              <span className={`text-sm font-medium ${
                isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
              }`}>
                {filteredCenters.length} centers found
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Centers List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredCenters.length === 0 ? (
          <div className="text-center py-12">
            <MapPin className={`w-16 h-16 mx-auto mb-4 ${
              isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
            }`} />
            <h3 className={`text-xl font-semibold mb-2 ${
              isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
            }`}>
              No centers found
            </h3>
            <p className={`${
              isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
            }`}>
              Try adjusting your search criteria
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredCenters.map((center) => (
              <div key={center.id} className={`p-6 rounded-lg border transition-all duration-300 hover:shadow-lg ${
                isDark 
                  ? `${getThemeColor('background.secondary', true)} ${colors.border.subtle.dark} ${colors.hover.border.subtle.dark}`
                  : `${getThemeColor('background.primary', false)} ${colors.border.subtle.light} ${colors.hover.border.subtle.light}`
              }`}>
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-3xl">
                        {getTypeIcon(center.type)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className={`text-xl font-bold ${
                            isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                          }`}>
                            {center.name}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(center.type)}`}>
                            {center.type}
                          </span>
                          {center.distance && (
                            <span className={`px-2 py-1 rounded text-sm font-medium ${
                              isDark ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-100 text-orange-600'
                            }`}>
                              {center.distance.toFixed(1)} km away
                            </span>
                          )}
                        </div>
                        
                        <div className={`flex items-center gap-2 text-sm mb-3 ${
                          isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                        }`}>
                          <MapPin className="w-4 h-4" />
                          <span>{center.address}, {center.city}, {center.province}</span>
                        </div>
                        
                        <div className={`flex flex-wrap gap-4 text-sm mb-3 ${
                          isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                        }`}>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            <span>{center.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{center.operatingHours}</span>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className={`text-sm font-semibold mb-2 ${
                            isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                          }`}>
                            Services:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {center.services.map((service) => (
                              <span key={service} className={`px-2 py-1 rounded text-xs ${
                                isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-600'
                              }`}>
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
                      isDark 
                        ? `${getThemeColor('background.secondary', true)} ${getThemeColor('text.primary', true)} ${colors.border.subtle.dark} ${colors.hover.background.dark}`
                        : `${getThemeColor('background.primary', false)} ${getThemeColor('text.primary', false)} ${colors.border.subtle.light} ${colors.hover.background.light}`
                    }`}>
                      <Navigation className="w-4 h-4" />
                      <span className="text-sm">Directions</span>
                    </button>
                    
                    <button className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                      isDark
                        ? `${colors.brand.primary.background} ${colors.brand.primary.text} hover:bg-orange-600`
                        : `${colors.brand.primary.background} ${colors.brand.primary.text} hover:bg-orange-600`
                    }`}>
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">Contact</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CenterLocator;