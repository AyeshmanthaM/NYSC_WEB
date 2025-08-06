import React from 'react';
import { Trophy, Music, GraduationCap, Briefcase } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const KeyServiceAreas = () => {
  const { isDark } = useTheme();

  const serviceAreas = [
    {
      id: 1,
      title: 'Sports',
      description: 'Developing athletic excellence and sportsmanship',
      icon: Trophy,
      color: 'from-blue-500 to-cyan-500',
      bgColor: isDark ? 'bg-blue-900/20' : 'bg-blue-50'
    },
    {
      id: 2,
      title: 'Aesthetics',
      description: 'Nurturing cultural and artistic talents',
      icon: Music,
      color: 'from-purple-500 to-pink-500',
      bgColor: isDark ? 'bg-purple-900/20' : 'bg-purple-50'
    },
    {
      id: 3,
      title: 'Education',
      description: 'Empowering through knowledge and skills',
      icon: GraduationCap,
      color: 'from-green-500 to-teal-500',
      bgColor: isDark ? 'bg-green-900/20' : 'bg-green-50'
    },
    {
      id: 4,
      title: 'Administration',
      description: 'Supporting youth organizations effectively',
      icon: Briefcase,
      color: 'from-orange-500 to-red-500',
      bgColor: isDark ? 'bg-orange-900/20' : 'bg-orange-50'
    }
  ];

  return (
    <section className={`relative py-16 ${isDark ? 'bg-gray-900/80' : 'bg-white/70'} backdrop-blur-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Key Service Areas
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Comprehensive programs designed to empower youth across multiple dimensions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceAreas.map((area) => {
            const IconComponent = area.icon;
            return (
              <div
                key={area.id}
                className={`group relative p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                  area.bgColor
                } border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${area.color} p-3 mb-4 
                  transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  <IconComponent className="w-full h-full text-white" />
                </div>
                
                <h3 className={`text-xl font-semibold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {area.title}
                </h3>
                
                <p className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {area.description}
                </p>

                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${area.color} 
                  opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default KeyServiceAreas;