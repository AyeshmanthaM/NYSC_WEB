import React from 'react';
import { Building, Target, Users, Award, TrendingUp, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { colors, getThemeColor } from '../../config/colors';

const YouthServicesLimited: React.FC = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const services = [
    {
      icon: Target,
      title: 'Business Consulting',
      description: 'Strategic business guidance and consultancy services for youth entrepreneurs and startups.'
    },
    {
      icon: Users,
      title: 'Training & Development',
      description: 'Professional development programs and specialized training courses for various industries.'
    },
    {
      icon: TrendingUp,
      title: 'Market Research',
      description: 'Comprehensive market analysis and research services to support business decision-making.'
    },
    {
      icon: Award,
      title: 'Certification Programs',
      description: 'Industry-recognized certification programs to enhance professional qualifications.'
    }
  ];

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
                isDark ? 'bg-blue-500/20' : 'bg-blue-100'
              }`}>
                <Building className={`w-12 h-12 ${
                  isDark ? 'text-blue-300' : 'text-blue-600'
                }`} />
              </div>
            </div>
            <h1 className={`text-4xl lg:text-6xl font-bold mb-6 ${
              isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
            }`}>
              Youth Services Limited
            </h1>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
            }`}>
              A specialized subsidiary of NYSC providing commercial training, consultancy, and business development services to support youth entrepreneurship and professional growth.
            </p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className={`text-3xl font-bold mb-6 ${
              isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
            }`}>
              About Youth Services Limited
            </h2>
            <div className="space-y-4">
              <p className={`text-lg leading-relaxed ${
                isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
              }`}>
                Youth Services Limited is the commercial arm of the National Youth Services Council, established to provide sustainable, market-driven solutions for youth development and empowerment.
              </p>
              <p className={`text-lg leading-relaxed ${
                isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
              }`}>
                Through innovative programs and strategic partnerships, we bridge the gap between traditional youth services and modern business requirements, creating pathways for economic empowerment and professional success.
              </p>
            </div>
          </div>
          
          <div className="aspect-square bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
            <Building className="w-24 h-24 text-white" />
          </div>
        </div>
      </div>

      {/* Services */}
      <div className={`py-16 ${
        isDark ? getThemeColor('background.secondary', true) : getThemeColor('background.secondary', false)
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-6 ${
              isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
            }`}>
              Our Services
            </h2>
            <p className={`text-lg max-w-3xl mx-auto ${
              isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
            }`}>
              Comprehensive business solutions designed to empower youth entrepreneurship
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className={`p-6 rounded-lg border transition-all duration-300 hover:shadow-lg ${
                  isDark 
                    ? `${getThemeColor('background.primary', true)} ${colors.border.subtle.dark} ${colors.hover.border.subtle.dark}`
                    : `${getThemeColor('background.primary', false)} ${colors.border.subtle.light} ${colors.hover.border.subtle.light}`
                }`}>
                  <div className={`inline-flex p-3 rounded-lg mb-4 ${
                    isDark ? 'bg-blue-500/20' : 'bg-blue-100'
                  }`}>
                    <IconComponent className={`w-6 h-6 ${
                      isDark ? 'text-blue-300' : 'text-blue-600'
                    }`} />
                  </div>
                  <h3 className={`text-lg font-bold mb-3 ${
                    isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                  }`}>
                    {service.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${
                    isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                  }`}>
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className={`p-8 rounded-lg border ${
          isDark 
            ? `${getThemeColor('background.secondary', true)} ${colors.border.subtle.dark}`
            : `${getThemeColor('background.secondary', false)} ${colors.border.subtle.light}`
        }`}>
          <div className="text-center mb-8">
            <h2 className={`text-2xl font-bold mb-4 ${
              isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
            }`}>
              Contact Youth Services Limited
            </h2>
            <p className={`text-lg ${
              isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
            }`}>
              Ready to take your business to the next level? Get in touch with our team.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className={`inline-flex p-3 rounded-lg mb-3 ${
                isDark ? 'bg-green-500/20' : 'bg-green-100'
              }`}>
                <Phone className={`w-6 h-6 ${
                  isDark ? 'text-green-300' : 'text-green-600'
                }`} />
              </div>
              <h3 className={`font-bold mb-2 ${
                isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
              }`}>
                Phone
              </h3>
              <p className={`text-sm ${
                isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
              }`}>
                +94 11 234 5680
              </p>
            </div>
            
            <div className="text-center">
              <div className={`inline-flex p-3 rounded-lg mb-3 ${
                isDark ? 'bg-blue-500/20' : 'bg-blue-100'
              }`}>
                <Mail className={`w-6 h-6 ${
                  isDark ? 'text-blue-300' : 'text-blue-600'
                }`} />
              </div>
              <h3 className={`font-bold mb-2 ${
                isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
              }`}>
                Email
              </h3>
              <p className={`text-sm ${
                isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
              }`}>
                info@youthservices.lk
              </p>
            </div>
            
            <div className="text-center">
              <div className={`inline-flex p-3 rounded-lg mb-3 ${
                isDark ? 'bg-purple-500/20' : 'bg-purple-100'
              }`}>
                <MapPin className={`w-6 h-6 ${
                  isDark ? 'text-purple-300' : 'text-purple-600'
                }`} />
              </div>
              <h3 className={`font-bold mb-2 ${
                isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
              }`}>
                Address
              </h3>
              <p className={`text-sm ${
                isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
              }`}>
                NYSC Building, Colombo 03
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouthServicesLimited;