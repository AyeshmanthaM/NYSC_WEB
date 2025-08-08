import { useState } from 'react';
import { Trophy, Music, GraduationCap, Briefcase, ChevronRight } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { colors, getThemeColor } from '../../config/colors';

interface KeyServiceAreasProps {
  onHoverChange?: (isHovered: boolean) => void;
}

const KeyServiceAreas = ({ onHoverChange }: KeyServiceAreasProps) => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  
  // Handle hover state changes
  const handleMouseEnter = (id: number) => {
    setHoveredId(id);
    onHoverChange?.(true);
  };
  
  const handleMouseLeave = () => {
    setHoveredId(null);
    onHoverChange?.(false);
  };

  const serviceAreas = [
    {
      id: 1,
      title: t('keyServices.sportsTitle'),
      shortDesc: t('keyServices.sportsShortDesc'),
      description: t('keyServices.sportsDescription'),
      icon: Trophy,
      gradient: 'from-blue-400 via-blue-500 to-cyan-500',
      hoverGradient: 'from-blue-500 via-blue-600 to-cyan-600',
      accentColor: '#3B82F6',
      stats: t('keyServices.sportsStats')
    },
    {
      id: 2,
      title: t('keyServices.aestheticsTitle'),
      shortDesc: t('keyServices.aestheticsShortDesc'),
      description: t('keyServices.aestheticsDescription'),
      icon: Music,
      gradient: 'from-purple-400 via-purple-500 to-pink-500',
      hoverGradient: 'from-purple-500 via-purple-600 to-pink-600',
      accentColor: '#8B5CF6',
      stats: t('keyServices.aestheticsStats')
    },
    {
      id: 3,
      title: t('keyServices.educationTitle'),
      shortDesc: t('keyServices.educationShortDesc'),
      description: t('keyServices.educationDescription'),
      icon: GraduationCap,
      gradient: 'from-emerald-400 via-emerald-500 to-teal-500',
      hoverGradient: 'from-emerald-500 via-emerald-600 to-teal-600',
      accentColor: '#10B981',
      stats: t('keyServices.educationStats')
    },
    {
      id: 4,
      title: t('keyServices.administrationTitle'),
      shortDesc: t('keyServices.administrationShortDesc'),
      description: t('keyServices.administrationDescription'),
      icon: Briefcase,
      gradient: 'from-amber-400 via-amber-500 to-orange-500',
      hoverGradient: 'from-amber-500 via-amber-600 to-orange-600',
      accentColor: '#F59E0B',
      stats: t('keyServices.administrationStats')
    }
  ];

  return (
    <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* No background - transparent section */}
  
      <div className="relative z-10 max-w-7xl mx-auto">
 
        {/* Compact Modern Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {serviceAreas.map((area, index) => {
            const IconComponent = area.icon;
            const isHovered = hoveredId === area.id;
            
            return (
              <div
                key={area.id}
                className="relative group"
                onMouseEnter={() => handleMouseEnter(area.id)}
                onMouseLeave={handleMouseLeave}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Card Container - No background */}
                <div className={`relative h-full overflow-hidden rounded-2xl transition-all duration-500 transform ${
                  isHovered ? 'scale-105 -translate-y-1' : ''
                } backdrop-blur-sm border ${getThemeColor('border.subtle', isDark)} shadow-lg hover:shadow-2xl`}>
                  
                  {/* Gradient Background Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${
                    isHovered ? area.hoverGradient : area.gradient
                  } opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* Top Accent Line */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${area.gradient}`} />
                  
                  {/* Content */}
                  <div className="relative p-5">
                    {/* Icon and Stats Row */}
                    <div className="flex items-start justify-between mb-3">
                      <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${area.gradient} 
                        p-2.5 shadow-lg transform transition-all duration-500 ${
                        isHovered ? 'rotate-6 scale-110' : ''
                      }`}>
                        <IconComponent className="w-full h-full text-white" />
                        {/* Icon Glow */}
                        <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${area.gradient} 
                          blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
                      </div>
                      
                      {/* Stats Badge - No background */}
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${getThemeColor('border.subtle', isDark)} ${getThemeColor('text.muted', isDark)}`}>
                        {area.stats}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h3 className={`text-lg font-bold mb-1 transition-colors duration-300 ${getThemeColor('text.primary', isDark)}`}>
                      {area.title}
                    </h3>
                    
                    {/* Short Description */}
                    <p className={`text-xs font-medium mb-2 ${getThemeColor('text.muted', isDark)}`}>
                      {area.shortDesc}
                    </p>
                    
                    {/* Expandable Description */}
                    <p className={`text-xs leading-relaxed overflow-hidden transition-all duration-500 ${
                      isHovered ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
                    } ${getThemeColor('text.secondary', isDark)}`}>
                      {area.description}
                    </p>
                    
                    {/* Action Link */}
                    <div className={`flex items-center justify-between mt-3 pt-3 border-t transition-all duration-500 ${
                      isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    } ${getThemeColor('border.subtle', isDark)}`}>
                      <span className={`text-xs font-semibold ${colors.brand.primary.text}`}>
                        {t('keyServices.learnMore')}
                      </span>
                      <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${
                        isHovered ? 'translate-x-1' : ''
                      } ${colors.brand.primary.text}`} />
                    </div>
                  </div>
                  
                  {/* Corner Decoration */}
                  <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full opacity-10"
                    style={{ background: `radial-gradient(circle, ${area.accentColor}, transparent)` }} />
                </div>
                
                {/* Hover Indicator Line */}
                <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r ${
                  area.gradient
                } transition-all duration-500 ${
                  isHovered ? 'w-full' : 'w-0'
                }`} />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default KeyServiceAreas;