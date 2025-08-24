import { ArrowRight, Briefcase, Heart, Globe, BookOpen, Users, Lightbulb, Star, TrendingUp } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslationWithNamespace } from '../../hooks/useTranslationWithNamespace';
import { colors, getThemeColor } from '../../config/colors';

interface YouthOfferingsProps {
  extraTopSpace?: number;
}

const YouthOfferings = ({ extraTopSpace = 0 }: YouthOfferingsProps) => {
  const { isDark } = useTheme();
  const { t, ready } = useTranslationWithNamespace('home');

  if (!ready) {
    return (
      <section className="relative py-16 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        </div>
      </section>
    );
  }

  // Helper function to safely convert translation result to array
  const getFeatureArray = (translationKey: string): string[] => {
    const result = t(translationKey);
    if (Array.isArray(result)) {
      return result;
    }
    // If it's a string (fallback key), return empty array to avoid map error
    return [];
  };

  const offerings = [
    {
      id: 1,
      title: t('youthOfferings.careerTitle'),
      description: t('youthOfferings.careerDescription'),
      icon: Briefcase,
      link: '#',
      features: getFeatureArray('youthOfferings.careerFeatures')
    },
    {
      id: 2,
      title: t('youthOfferings.volunteerTitle'),
      description: t('youthOfferings.volunteerDescription'),
      icon: Heart,
      link: '#',
      features: getFeatureArray('youthOfferings.volunteerFeatures')
    },
    {
      id: 3,
      title: t('youthOfferings.internationalTitle'),
      description: t('youthOfferings.internationalDescription'),
      icon: Globe,
      link: '#',
      features: getFeatureArray('youthOfferings.internationalFeatures')
    },
    {
      id: 4,
      title: t('youthOfferings.educationalTitle'),
      description: t('youthOfferings.educationalDescription'),
      icon: BookOpen,
      link: '#',
      features: getFeatureArray('youthOfferings.educationalFeatures')
    },
    {
      id: 5,
      title: t('youthOfferings.clubsTitle'),
      description: t('youthOfferings.clubsDescription'),
      icon: Users,
      link: '#',
      features: getFeatureArray('youthOfferings.clubsFeatures')
    },
    {
      id: 6,
      title: t('youthOfferings.innovationTitle'),
      description: t('youthOfferings.innovationDescription'),
      icon: Lightbulb,
      link: '#',
      features: getFeatureArray('youthOfferings.innovationFeatures')
    }
  ];

  return (
    <section className={`relative py-12 ${getThemeColor('background.gradient.subtle', isDark)} backdrop-blur-sm overflow-hidden`}>
      {/* Decorative background patterns */}
      <div className="absolute inset-0 opacity-30">
        <div className={`absolute top-0 -left-4 w-72 h-72 ${colors.effects.blob.primary} rounded-full mix-blend-multiply filter blur-xl animate-blob`}></div>
        <div className={`absolute top-0 -right-4 w-72 h-72 ${colors.effects.blob.secondary} rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000`}></div>
        <div className={`absolute -bottom-8 left-20 w-72 h-72 ${colors.effects.blob.primary} rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000`}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingTop: `${extraTopSpace}px` }}>
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#1aa79e]/10 to-[#f38621]/10 border border-[#1aa79e]/20 mb-6">
            <Star className={`w-4 h-4 ${isDark ? 'text-[#1aa79e]' : 'text-[#1aa79e]'}`} />
            <span className={`text-sm font-medium ${isDark ? 'text-[#1aa79e]' : 'text-[#1aa79e]'}`}>{t('youthOfferings.badgeText')}</span>
          </div>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight ${getThemeColor('text.primary', isDark)}`}>
            {t('youthOfferings.title')}
            <span className={`block ${colors.brand.gradient.text}`}>
              {t('youthOfferings.titleHighlight')}
            </span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${getThemeColor('text.secondary', isDark)}`}>
            {t('youthOfferings.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-3 lg:gap-6">
          {offerings.map((offering) => {
            const IconComponent = offering.icon;
            return (
              <div
                key={offering.id}
                className={`group relative p-5 sm:p-4 rounded-2xl transition-all duration-500 hover:scale-[1.04] ${
getThemeColor('card.primary', isDark)
                } border ${getThemeColor('border.subtle', isDark)} backdrop-blur-sm hover:shadow-2xl ${colors.hover.shadow.brand} hover:-translate-y-2 focus-within:ring-2 ${colors.focus.ring.brand} focus-within:ring-offset-2 ${getThemeColor('focus.ring.offset', isDark)}`}
                role="article"
                tabIndex={0}
              >
                <div className="flex flex-col">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="flex-shrink-0">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl ${colors.brand.gradient.primary} 
                        p-2.5 sm:p-3 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg group-hover:shadow-xl`}>
                        <IconComponent className="w-full h-full text-white" />
                      </div>
                    </div>
                    <div className={`opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0`}>
                      <TrendingUp className={`w-5 h-5 ${colors.brand.primary.text}`} />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={`text-base sm:text-lg font-bold mb-2 ${colors.hover.text.brand} transition-colors duration-300 ${getThemeColor('text.primary', isDark)}`}>
                      {offering.title}
                    </h3>
                    
                    <p className={`text-sm mb-3 sm:mb-4 leading-relaxed ${getThemeColor('text.secondary', isDark)}`}>
                      {offering.description}
                    </p>

                    <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5">
                      {offering.features.map((feature, index) => (
                        <li key={index} className={`text-xs sm:text-sm flex items-center group/item transition-all duration-200 hover:translate-x-1 ${getThemeColor('text.muted', isDark)}`}>
                          <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 ${colors.brand.gradient.primary} rounded-full mr-2 sm:mr-3 group-hover/item:scale-125 transition-transform duration-200`} />
                          <span className={`${colors.hover.text.brand} transition-colors duration-200`}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <a 
                      href={offering.link}
                      className={`inline-flex items-center px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg ${colors.button.primary.base} text-white font-semibold text-xs sm:text-sm transition-all duration-300 ${colors.button.primary.shadow} hover:scale-105 focus:outline-none focus:ring-2 ${colors.focus.ring.brand} focus:ring-offset-2 ${getThemeColor('focus.ring.offset', isDark)} transform active:scale-95`}
                      aria-label={`Learn more about ${offering.title}`}
                    >
                      {t('youthOfferings.learnMore')}
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 transition-transform duration-300 group-hover:translate-x-2" />
                    </a>
                  </div>
                </div>
                
                {/* Decorative gradient overlay */}
                <div className={`absolute inset-0 ${colors.background.gradient.brand.light} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default YouthOfferings;