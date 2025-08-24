import { ArrowRight } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslationWithNamespace } from '../../hooks/useTranslationWithNamespace';
import { useEffect, useState } from 'react';
import HeroParticleMesh from '../ui/HeroParticleMesh';
import { colors, getThemeColor } from '../../config/colors';

interface HeroSectionProps {
  extraBottomSpace?: number;
}

const HeroSection = ({ extraBottomSpace = 0 }: HeroSectionProps) => {
  const { isDark } = useTheme();
  const { t, ready } = useTranslationWithNamespace('home');
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    // Get the viewport height
    const updateHeight = () => {
      setViewportHeight(window.innerHeight);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // Show loading state while translations are not ready
  if (!ready) {
    return (
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        minHeight: viewportHeight > 0 ? `${viewportHeight + extraBottomSpace + 100}px` : `calc(100vh + ${extraBottomSpace + 200}px)`,
      }}
    >
      {/* Semi-transparent overlay for better text readability */}
      <div className={`absolute inset-0 ${isDark
          ? 'bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900/80'
          : 'bg-gradient-to-b from-transparent via-white/30 to-white/60'
        }`} />

      {/* Particle Mesh Overlay */}
      <HeroParticleMesh className="z-10" />

      {/* Content container - stays centered in viewport */}
      <div
        className="absolute inset-x-0 flex items-center justify-center"
        style={{
          top: '96px', // Header height
          height: viewportHeight > 0 ? `${viewportHeight - 96}px` : 'calc(100vh - 96px)'
        }}
      >
        <div className="relative z-10 max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-7xl mx-auto">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Sub Title */}
              <div className="inline-flex items-center space-x-2">
                <div className="w-12 h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500" />
                <span className={`text-sm font-semibold tracking-wider uppercase ${getThemeColor('text.secondary', isDark)}`}>
                  {t('hero.subtitle')}
                </span>
              </div>

              {/* Main Title */}
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${getThemeColor('text.primary', isDark)}`}>
                {t('hero.title')}
                <span className={colors.brand.gradient.text}> {t('hero.titleHighlight')}</span>
              </h1>

              {/* Description */}
              <p className={`text-lg md:text-xl leading-relaxed ${getThemeColor('text.secondary', isDark)}`}>
                {t('hero.description')}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${colors.brand.gradient.text}`}>
                    50K+
                  </div>
                  <div className={`text-sm ${getThemeColor('text.muted', isDark)}`}>
                    {t('hero.statsActiveMembers')}
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${colors.brand.gradient.text}`}>
                    200+
                  </div>
                  <div className={`text-sm ${getThemeColor('text.muted', isDark)}`}>
                    {t('hero.statsYouthClubs')}
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${colors.brand.gradient.text}`}>
                    25
                  </div>
                  <div className={`text-sm ${getThemeColor('text.muted', isDark)}`}>
                    {t('hero.statsDistricts')}
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className={`group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-200 ${colors.button.primary.base} rounded-full hover:scale-105 hover:shadow-2xl`}>
                  <span className="relative flex items-center">
                    {t('hero.joinButton')}
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>

                <a
                  href="../youthstatements.pdf"
                  className={`inline-flex items-center justify-center px-8 py-4 font-semibold rounded-full border-2 transition-all duration-200 hover:scale-105 ${getThemeColor('button.secondary', isDark)}`}
                >
                  {t('hero.youthStatement')}
                </a>
              </div>
            </div>

            {/* Right Side - SVG Artwork - Hidden on small screens */}
            <div className="relative lg:col-span-1 hidden lg:block">
              <div className="relative overflow-visible">
                {/* Large SVG that breaks out of container */}
                <div className="absolute -inset-32 lg:-inset-48 xl:-inset-64 flex items-center justify-center">
                  {/* Decorative Background Circle */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-full h-full ${colors.background.gradient.brand.light} rounded-full blur-3xl`} />
                  </div>

                  {/* Youth SVG Illustration - Oversized */}
                  <img 
                    src="/assets/svg/youth.svg"
                    alt="Youth Illustration"
                    className="w-full h-auto relative z-10 max-w-none scale-110 transition-transform duration-500 opacity-90"
                    style={{ width: '120vw', maxWidth: '800px' }}
                  />
                </div>

                {/* Placeholder to maintain grid spacing */}
                <div className="h-96 w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;