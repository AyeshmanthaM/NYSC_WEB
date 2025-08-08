import { ExternalLink, Plus } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { colors, getThemeColor } from '../../config/colors';

const OrganizationsSection = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  const organizations = [
    {
      id: 1,
      title: t('organizations.youthClub.title'),
      description: t('organizations.youthClub.description'),
      image: '/images/organizations/club2.png',
      link: 'https://www.nysc.lk/page/view/youth-club'
    },
    {
      id: 2,
      title: t('organizations.youthServices.title'),
      description: t('organizations.youthServices.description'),
      image: '/images/organizations/youth-service-logo.png',
      link: 'https://www.nysc.lk/page/view/youth-services-limited'
    },
    {
      id: 3,
      title: t('organizations.nysco.title'),
      description: t('organizations.nysco.description'),
      image: '/images/organizations/nysco.png',
      link: 'https://www.nysc.lk/page/view/nysco'
    }
  ];

  return (
    <section 
      className="relative py-20 overflow-hidden"
      style={{
        backgroundImage: 'url("/images/backgrounds/offer-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay */}
      <div className={`absolute inset-0 ${getThemeColor('background.overlay', isDark)}`} />

      {/* Decorative particles/bubbles */}
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 ${getThemeColor('badge.brand', isDark)}`}>
            {t('organizations.badge')}
          </span>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${getThemeColor('text.primary', isDark)}`}>
            {t('organizations.title')}
            <span className={`pb-2 block ${colors.brand.gradient.text}`}>
              {t('organizations.titleHighlight')}
            </span>
          </h2>
        </div>

        {/* Organizations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {organizations.map((org) => (
            <a
              key={org.id}
              href={org.link}
              className="group relative block"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={`relative p-8 rounded-2xl transition-all duration-500 transform group-hover:scale-105 group-hover:-translate-y-2 ${getThemeColor('card.primary', isDark)} border ${getThemeColor('border.subtle', isDark)} ${colors.hover.shadow.brand} backdrop-blur-sm`}>
                
                {/* Image Container */}
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 flex items-center justify-center">
                    <img 
                      src={org.image} 
                      alt={org.title}
                      className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className={`text-xl font-bold mb-4 ${getThemeColor('text.primary', isDark)}`}>
                    {org.title}
                  </h3>
                  
                  <p className={`text-sm leading-relaxed mb-6 ${getThemeColor('text.secondary', isDark)}`}>
                    {org.description}
                  </p>

                  {/* Explore Button */}
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${colors.button.primary.base} ${colors.button.primary.shadow} group-hover:scale-105`}>
                    {t('organizations.exploreMore')}
                    <Plus className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" />
                  </div>
                </div>

                {/* External Link Icon */}
                <div className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${getThemeColor('button.secondary', isDark)} group-hover:scale-110 group-hover:text-white hover:${colors.brand.gradient.primary}`}>
                  <ExternalLink className="w-3 h-3" />
                </div>

                {/* Hover Gradient Overlay */}
                <div className={`absolute inset-0 rounded-2xl ${colors.background.gradient.brand.light} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrganizationsSection;