import { Award, Crown, Building, Shield, Facebook, Twitter, Instagram, Linkedin, Eye, ArrowRight, Users } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { colors, getThemeColor } from '../../config/colors';

const LeadersSection = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  
  const leaders = [
    {
      name: t('leaders.minister.name'),
      position: t('leaders.minister.position'),
      image: '/images/leaders/sunil-kumara-gamage.jpg',
      socialLinks: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
        linkedin: '#'
      },
      icon: Crown,
      color: 'from-purple-600 to-purple-700'
    },
    {
      name: t('leaders.deputyMinister.name'),
      position: t('leaders.deputyMinister.position'),
      image: '/images/leaders/eranga-gunasekara.jpg',
      socialLinks: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
        linkedin: '#'
      },
      icon: Award,
      color: 'from-blue-600 to-blue-700'
    },
    {
      name: t('leaders.secretary.name'),
      position: t('leaders.secretary.position'),
      image: '/images/leaders/aruna-bandara.jpg',
      socialLinks: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
        linkedin: '#'
      },
      icon: Building,
      color: 'from-green-600 to-green-700'
    },
    {
      name: t('leaders.chairman.name'),
      position: t('leaders.chairman.position'),
      image: '/images/leaders/supun-wijerathna.jpg',
      socialLinks: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
        linkedin: '#'
      },
      icon: Shield,
      color: 'from-orange-600 to-orange-700'
    }
  ];

  return (
    <section className={`relative py-16 overflow-hidden ${getThemeColor('background.primary', isDark)}`}>
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-10 w-4 h-4 rounded-full ${
          isDark ? 'bg-blue-400/30' : 'bg-blue-500/30'
        } animate-pulse`} />
        <div className={`absolute top-40 right-20 w-6 h-6 rounded-full ${
          isDark ? 'bg-purple-400/30' : 'bg-purple-500/30'
        } animate-pulse animation-delay-1000`} />
        <div className={`absolute bottom-32 left-1/4 w-5 h-5 rounded-full ${
          isDark ? 'bg-teal-400/30' : 'bg-teal-500/30'
        } animate-pulse animation-delay-2000`} />
        <div className={`absolute bottom-20 right-1/3 w-3 h-3 rounded-full ${
          isDark ? 'bg-orange-400/30' : 'bg-orange-500/30'
        } animate-pulse animation-delay-3000`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-nysc-primary/10 to-nysc-secondary/10 border border-nysc-primary/20 mb-4">
            <Users className="w-4 h-4 text-nysc-primary" />
            <span className="text-sm font-medium text-nysc-primary">{t('leaders.badge')}</span>
          </div>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${getThemeColor('text.primary', isDark)}`}>
            {t('leaders.title')}
          </h2>
          <p className={`text-lg mb-6 max-w-2xl mx-auto ${getThemeColor('text.secondary', isDark)}`}>
            {t('leaders.subtitle')}
          </p>
        </div>

        {/* Leaders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {leaders.map((leader, index) => {
            const IconComponent = leader.icon;
            return (
              <div
                key={index}
                className={`group relative rounded-2xl overflow-hidden shadow-xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 ${getThemeColor('card.primary', isDark)} border ${getThemeColor('border.subtle', isDark)} ${getThemeColor('hover.background', isDark)} hover:shadow-2xl hover:shadow-blue-500/20 backdrop-blur-sm mb-8`}
              >
                {/* Image Container */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Icon Badge - Fixed position for consistent alignment */}
                  <div className={`absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center ${getThemeColor('card.secondary', isDark)} backdrop-blur-sm border border-white/20 transition-all duration-300 group-hover:scale-110`}>
                    <IconComponent className={`w-6 h-6 ${colors.brand.primary.text}`} />
                  </div>
                </div>

                {/* Content - Fixed height container for consistency */}
                <div className="p-6 text-center h-44 flex flex-col">
                  {/* Title with fixed height */}
                  <div className="h-14 flex items-center justify-center mb-3">
                    <h3 className={`text-base font-bold leading-tight text-center ${getThemeColor('text.primary', isDark)} ${colors.hover.text.brand} transition-colors duration-300`}>
                      {leader.name}
                    </h3>
                  </div>
                  
                  {/* Position with fixed height */}
                  <div className="h-12 flex items-center justify-center mb-4">
                    <p className={`text-sm font-medium text-center ${getThemeColor('text.secondary', isDark)}`}>
                      {leader.position}
                    </p>
                  </div>

                  {/* Social Links - Flexible container to fill remaining space */}
                  <div className="flex-1 flex items-center justify-center">
                    <div className="flex justify-center space-x-3">
                    <a
                      href={leader.socialLinks.facebook}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isDark 
                          ? 'bg-gray-700/50 text-gray-400 hover:bg-blue-600 hover:text-white' 
                          : 'bg-gray-100 text-gray-500 hover:bg-blue-600 hover:text-white'
                      } hover:scale-110 hover:shadow-lg`}
                    >
                      <Facebook className="w-4 h-4" />
                    </a>
                    <a
                      href={leader.socialLinks.twitter}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isDark 
                          ? 'bg-gray-700/50 text-gray-400 hover:bg-sky-500 hover:text-white' 
                          : 'bg-gray-100 text-gray-500 hover:bg-sky-500 hover:text-white'
                      } hover:scale-110 hover:shadow-lg`}
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a
                      href={leader.socialLinks.instagram}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isDark 
                          ? 'bg-gray-700/50 text-gray-400 hover:bg-pink-600 hover:text-white' 
                          : 'bg-gray-100 text-gray-500 hover:bg-pink-600 hover:text-white'
                      } hover:scale-110 hover:shadow-lg`}
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a
                      href={leader.socialLinks.linkedin}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isDark 
                          ? 'bg-gray-700/50 text-gray-400 hover:bg-blue-700 hover:text-white' 
                          : 'bg-gray-100 text-gray-500 hover:bg-blue-700 hover:text-white'
                      } hover:scale-110 hover:shadow-lg`}
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    </div>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className={`h-1 bg-gradient-to-r ${leader.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
              </div>
            );
          })}
        </div>
        
        {/* Directors Button Section - Enhanced Design */}
        <div className="mt-4 mb-4">
          <div className={`relative rounded-3xl p-4 text-center ${
            isDark 
              ? 'bg-gradient-to-br from-gray-800/50 via-gray-800/30 to-gray-800/50 border border-gray-700/30' 
              : 'bg-gradient-to-br from-white/50 via-white/30 to-white/50 border border-gray-200/30'
          } backdrop-blur-sm shadow-xl`}>
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className={`w-20 h-20 rounded-full ${
                isDark ? 'bg-gradient-to-r from-[#1aa79e]/20 to-[#f38621]/20' : 'bg-gradient-to-r from-[#1aa79e]/10 to-[#f38621]/10'
              } blur-xl`} />
            </div>
            
            {/* Content */}
            <div className="relative">
              <h3 className={`text-xl font-bold mb-3 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {t('leaders.directorsTitle')}
              </h3>
              <p className={`text-sm mb-6 max-w-md mx-auto ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {t('leaders.directorsDescription')}
              </p>
              
              {/* Enhanced Button */}
              <button className="group relative inline-flex items-center justify-center">
                {/* Button background with animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#1aa79e] to-[#f38621] rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Button content */}
                <div className="relative flex items-center px-10 py-4 bg-gradient-to-r from-[#1aa79e] to-[#f38621] rounded-full text-white font-semibold transition-all duration-300 group-hover:scale-105 shadow-lg">
                  <span className="text-base">{t('leaders.viewAllDirectors')}</span>
                </div>
              </button>
              
              {/* Decorative dots */}
              <div className="flex justify-center space-x-2 mt-6">
                <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-gray-600' : 'bg-gray-300'} animate-pulse`} />
                <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-gray-600' : 'bg-gray-300'} animate-pulse animation-delay-1000`} />
                <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-gray-600' : 'bg-gray-300'} animate-pulse animation-delay-2000`} />
              </div>
            </div>
            
            {/* Side decorations */}
            <div className={`absolute top-1/2 left-8 transform -translate-y-1/2 w-16 h-16 rounded-full ${
              isDark ? 'bg-gradient-to-r from-[#1aa79e]/10 to-[#f38621]/10' : 'bg-gradient-to-r from-[#1aa79e]/5 to-[#f38621]/5'
            } blur-xl`} />
            <div className={`absolute top-1/2 right-8 transform -translate-y-1/2 w-16 h-16 rounded-full ${
              isDark ? 'bg-gradient-to-r from-[#f38621]/10 to-[#1aa79e]/10' : 'bg-gradient-to-r from-[#f38621]/5 to-[#1aa79e]/5'
            } blur-xl`} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadersSection;