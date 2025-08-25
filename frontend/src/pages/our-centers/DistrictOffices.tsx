import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Building2, User, ExternalLink } from 'lucide-react';
import { useTranslationWithNamespace } from '../../hooks/useTranslationWithNamespace';
import { useTheme } from '../../contexts/ThemeContext';
import { colors, getThemeColor } from '../../config/colors';

interface DistrictOffice {
  id: string;
  district: string;
  province: string;
  address: string;
  phone: string;
  fax?: string;
  email: string;
  districtOfficer: string;
  assistantOfficer?: string;
  services: string[];
  operatingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  establishedYear: string;
}

const DistrictOffices: React.FC = () => {
  const { t, ready } = useTranslationWithNamespace('centers');
  const { isDark } = useTheme();
  const [offices, setOffices] = useState<DistrictOffice[]>([]);
  const [selectedProvince, setSelectedProvince] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const sampleOffices: DistrictOffice[] = [
      {
        id: '1',
        district: 'Colombo',
        province: 'Western',
        address: 'No. 456, Galle Road, Colombo 03',
        phone: '+94 11 234 5670',
        fax: '+94 11 234 5671',
        email: 'colombo@nysc.gov.lk',
        districtOfficer: 'Mr. Sunil Perera',
        assistantOfficer: 'Ms. Kamala Silva',
        services: [
          'Youth Registration',
          'Program Enrollment',
          'Certificate Verification',
          'Complaint Handling',
          'Information Services',
          'Counseling Services'
        ],
        operatingHours: {
          weekdays: '8:30 AM - 4:15 PM',
          saturday: '8:30 AM - 12:30 PM',
          sunday: 'Closed'
        },
        establishedYear: '2005'
      },
      {
        id: '2',
        district: 'Kandy',
        province: 'Central',
        address: 'No. 78, Peradeniya Road, Kandy',
        phone: '+94 81 234 5670',
        email: 'kandy@nysc.gov.lk',
        districtOfficer: 'Mrs. Nilmini Rajapaksa',
        assistantOfficer: 'Mr. Asanka Fernando',
        services: [
          'Youth Development Programs',
          'Skills Training Coordination',
          'Event Management',
          'Documentation Services',
          'Guidance and Counseling',
          'Community Outreach'
        ],
        operatingHours: {
          weekdays: '8:30 AM - 4:15 PM',
          saturday: '8:30 AM - 12:00 PM',
          sunday: 'Closed'
        },
        establishedYear: '2007'
      },
      {
        id: '3',
        district: 'Galle',
        province: 'Southern',
        address: 'No. 123, Matara Road, Galle',
        phone: '+94 91 234 5670',
        email: 'galle@nysc.gov.lk',
        districtOfficer: 'Mr. Rohan Wickramasinghe',
        services: [
          'Coastal Development Programs',
          'Tourism Skills Training',
          'Marine Conservation Projects',
          'Youth Leadership Programs',
          'Cultural Programs',
          'Environmental Initiatives'
        ],
        operatingHours: {
          weekdays: '8:30 AM - 4:15 PM',
          saturday: '8:30 AM - 12:00 PM',
          sunday: 'Closed'
        },
        establishedYear: '2009'
      },
      {
        id: '4',
        district: 'Jaffna',
        province: 'Northern',
        address: 'No. 234, Kankesanthurai Road, Jaffna',
        phone: '+94 21 234 5670',
        email: 'jaffna@nysc.gov.lk',
        districtOfficer: 'Ms. Priya Krishnan',
        assistantOfficer: 'Mr. Vimal Selvarajah',
        services: [
          'Post-conflict Youth Programs',
          'Peace Building Initiatives',
          'Cultural Preservation',
          'Language Services',
          'Reconciliation Programs',
          'Economic Development'
        ],
        operatingHours: {
          weekdays: '8:30 AM - 4:15 PM',
          saturday: '8:30 AM - 12:00 PM',
          sunday: 'Closed'
        },
        establishedYear: '2015'
      },
      {
        id: '5',
        district: 'Batticaloa',
        province: 'Eastern',
        address: 'No. 567, Main Street, Batticaloa',
        phone: '+94 65 234 5670',
        email: 'batticaloa@nysc.gov.lk',
        districtOfficer: 'Mrs. Shanti Rajendran',
        services: [
          'Multi-ethnic Youth Programs',
          'Livelihood Development',
          'Disaster Preparedness',
          'Aquaculture Training',
          'Women Empowerment',
          'Community Development'
        ],
        operatingHours: {
          weekdays: '8:30 AM - 4:15 PM',
          saturday: '8:30 AM - 12:00 PM',
          sunday: 'Closed'
        },
        establishedYear: '2016'
      },
      {
        id: '6',
        district: 'Anuradhapura',
        province: 'North Central',
        address: 'No. 89, Maithripala Senanayake Mw, Anuradhapura',
        phone: '+94 25 234 5670',
        email: 'anuradhapura@nysc.gov.lk',
        districtOfficer: 'Mr. Bandula Jayasinghe',
        services: [
          'Rural Youth Development',
          'Agricultural Training',
          'Heritage Conservation',
          'Eco-tourism Development',
          'Traditional Skills Training',
          'Environmental Conservation'
        ],
        operatingHours: {
          weekdays: '8:30 AM - 4:15 PM',
          saturday: '8:30 AM - 12:00 PM',
          sunday: 'Closed'
        },
        establishedYear: '2010'
      }
    ];
    setOffices(sampleOffices);
  }, []);

  const provinces = ['all', 'Western', 'Central', 'Southern', 'Northern', 'Eastern', 'North Western', 'North Central', 'Uva', 'Sabaragamuwa'];

  const filteredOffices = offices.filter(office => {
    const matchesProvince = selectedProvince === 'all' || office.province === selectedProvince;
    const matchesSearch = office.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         office.districtOfficer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         office.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()));
    
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
                isDark ? 'bg-indigo-500/20' : 'bg-indigo-100'
              }`}>
                <Building2 className={`w-12 h-12 ${
                  isDark ? 'text-indigo-300' : 'text-indigo-600'
                }`} />
              </div>
            </div>
            <h1 className={`text-4xl lg:text-6xl font-bold mb-6 ${
              isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
            }`}>
              {t('districtOffices.title')}
            </h1>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
            }`}>
              {t('districtOffices.description')}
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
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder={t('districtOffices.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                  isDark 
                    ? `${getThemeColor('background.secondary', true)} ${getThemeColor('border.primary', true)} ${getThemeColor('text.primary', true)} placeholder-gray-400`
                    : `${getThemeColor('background.primary', false)} ${getThemeColor('border.secondary', false)} ${getThemeColor('text.primary', false)} placeholder-gray-500`
                }`}
              />
            </div>

            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className={`px-3 py-3 rounded-lg border transition-colors ${
                isDark 
                  ? `${getThemeColor('background.secondary', true)} ${getThemeColor('border.primary', true)} ${getThemeColor('text.primary', true)}`
                  : `${getThemeColor('background.primary', false)} ${getThemeColor('border.secondary', false)} ${getThemeColor('text.primary', false)}`
              }`}
            >
              {provinces.map(province => (
                <option key={province} value={province}>
                  {province === 'all' ? t('districtOffices.allProvinces') : province}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Offices Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <h2 className={`text-2xl font-bold mb-2 ${
            isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
          }`}>
            {t('districtOffices.listTitle', { count: filteredOffices.length })}
          </h2>
          <p className={`${
            isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
          }`}>
            {t('districtOffices.listDescription')}
          </p>
        </div>

        {filteredOffices.length === 0 ? (
          <div className="text-center py-12">
            <Building2 className={`w-16 h-16 mx-auto mb-4 ${
              isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
            }`} />
            <h3 className={`text-xl font-semibold mb-2 ${
              isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
            }`}>
              {t('districtOffices.noOfficesTitle')}
            </h3>
            <p className={`${
              isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
            }`}>
              {t('districtOffices.noOfficesDescription')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredOffices.map((office) => (
              <div key={office.id} className={`rounded-lg border transition-all duration-300 hover:shadow-xl ${
                isDark 
                  ? `${getThemeColor('background.secondary', true)} ${colors.border.subtle.dark}`
                  : `${getThemeColor('background.primary', false)} ${colors.border.subtle.light}`
              }`}>
                <div className={`p-4 border-b ${
                  isDark ? colors.border.subtle.dark : colors.border.subtle.light
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`text-lg font-bold ${
                      isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                    }`}>
                      {office.district} District
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      isDark ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-100 text-indigo-600'
                    }`}>
                      {office.province}
                    </span>
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${
                    isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                  }`}>
                    <MapPin className="w-4 h-4" />
                    <span>{office.address}</span>
                  </div>
                </div>

                <div className="p-4">
                  {/* Contact Information */}
                  <div className={`space-y-2 mb-4 text-sm ${
                    isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                  }`}>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{office.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{office.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{office.operatingHours.weekdays}</span>
                    </div>
                  </div>

                  {/* Staff */}
                  <div className={`mb-4 p-3 rounded-lg ${
                    isDark ? getThemeColor('background.primary', true) : 'bg-gray-50'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <User className={`w-4 h-4 ${
                        isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                      }`} />
                      <span className={`text-sm font-medium ${
                        isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                      }`}>
                        {t('districtOffices.districtOfficer')}
                      </span>
                    </div>
                    <p className={`text-sm font-semibold ${
                      isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                    }`}>
                      {office.districtOfficer}
                    </p>
                    {office.assistantOfficer && (
                      <p className={`text-xs mt-1 ${
                        isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                      }`}>
                        {t('districtOffices.assistant')}: {office.assistantOfficer}
                      </p>
                    )}
                  </div>

                  {/* Services */}
                  <div className="mb-4">
                    <h4 className={`text-sm font-semibold mb-2 ${
                      isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                    }`}>
                      {t('districtOffices.services')}:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {office.services.slice(0, 4).map((service) => (
                        <span key={service} className={`px-2 py-1 rounded text-xs ${
                          isDark ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-600'
                        }`}>
                          {service}
                        </span>
                      ))}
                      {office.services.length > 4 && (
                        <span className={`px-2 py-1 rounded text-xs ${
                          isDark ? 'bg-gray-500/20 text-gray-300' : 'bg-gray-100 text-gray-600'
                        }`}>
                          +{office.services.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex justify-between items-center">
                    <span className={`text-xs ${
                      isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
                    }`}>
                      {t('districtOffices.since', { year: office.establishedYear })}
                    </span>
                    <button className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 text-sm font-medium ${
                      isDark
                        ? `${colors.brand.primary.background} ${colors.brand.primary.text} hover:bg-orange-600`
                        : `${colors.brand.primary.background} ${colors.brand.primary.text} hover:bg-orange-600`
                    }`}>
                      <ExternalLink className="w-3 h-3" />
                      {t('districtOffices.contact')}
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

export default DistrictOffices;