import React from 'react';
import { Music, Users, Calendar, Trophy, Star, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { colors, getThemeColor } from '../../config/colors';

const YouthDancingTeam: React.FC = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const danceStyles = [
    {
      icon: Star,
      title: 'Traditional Sri Lankan',
      description: 'Kandyan, Low Country, and Sabaragamuwa traditional dance forms preserving cultural heritage.',
      performances: 12,
      students: 45
    },
    {
      icon: Music,
      title: 'Contemporary Dance',
      description: 'Modern dance expressions blending traditional and contemporary movement styles.',
      performances: 8,
      students: 32
    },
    {
      icon: Users,
      title: 'Folk Dance',
      description: 'Regional folk dances celebrating diversity and cultural unity across Sri Lanka.',
      performances: 15,
      students: 38
    },
    {
      icon: Trophy,
      title: 'Cultural Presentations',
      description: 'Ceremonial and festival performances for national and international events.',
      performances: 20,
      students: 55
    }
  ];

  const achievements = [
    { title: 'National Cultural Festival', year: '2023', award: 'Gold Medal' },
    { title: 'SAARC Youth Festival', year: '2023', award: 'Best Traditional Performance' },
    { title: 'International Folk Dance Competition', year: '2022', award: 'Silver Medal' },
    { title: 'Asian Cultural Exchange', year: '2022', award: 'Excellence Award' }
  ];

  const upcomingEvents = [
    {
      title: 'Annual Cultural Showcase',
      date: '2024-03-15',
      venue: 'BMICH, Colombo',
      type: 'Performance'
    },
    {
      title: 'Traditional Dance Workshop',
      date: '2024-02-20',
      venue: 'NYSC Training Center',
      type: 'Workshop'
    },
    {
      title: 'International Youth Festival',
      date: '2024-04-10',
      venue: 'Various Venues',
      type: 'Competition'
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
                isDark ? 'bg-purple-500/20' : 'bg-purple-100'
              }`}>
                <Music className={`w-12 h-12 ${
                  isDark ? 'text-purple-300' : 'text-purple-600'
                }`} />
              </div>
            </div>
            <h1 className={`text-4xl lg:text-6xl font-bold mb-6 ${
              isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
            }`}>
              Youth Dancing Team
            </h1>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
            }`}>
              Preserving Sri Lankan cultural heritage through traditional and contemporary dance, fostering artistic expression and cultural pride among young dancers.
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
              Celebrating Cultural Heritage
            </h2>
            <div className="space-y-4">
              <p className={`text-lg leading-relaxed ${
                isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
              }`}>
                The NYSC Youth Dancing Team is dedicated to preserving and promoting Sri Lanka's rich cultural dance traditions while encouraging artistic innovation and excellence among young performers.
              </p>
              <p className={`text-lg leading-relaxed ${
                isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
              }`}>
                Our team performs at national celebrations, cultural festivals, and international events, serving as cultural ambassadors representing the beauty and diversity of Sri Lankan dance forms.
              </p>
            </div>
          </div>
          
          <div className="aspect-square bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
            <Music className="w-24 h-24 text-white" />
          </div>
        </div>
      </div>

      {/* Dance Styles */}
      <div className={`py-16 ${
        isDark ? getThemeColor('background.secondary', true) : getThemeColor('background.secondary', false)
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-6 ${
              isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
            }`}>
              Dance Specializations
            </h2>
            <p className={`text-lg max-w-3xl mx-auto ${
              isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
            }`}>
              Our diverse repertoire celebrates Sri Lankan cultural heritage through various dance forms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {danceStyles.map((style, index) => {
              const IconComponent = style.icon;
              return (
                <div key={index} className={`p-6 rounded-lg border transition-all duration-300 hover:shadow-lg ${
                  isDark 
                    ? `${getThemeColor('background.primary', true)} ${colors.border.subtle.dark} ${colors.hover.border.subtle.dark}`
                    : `${getThemeColor('background.primary', false)} ${colors.border.subtle.light} ${colors.hover.border.subtle.light}`
                }`}>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${
                      isDark ? 'bg-purple-500/20' : 'bg-purple-100'
                    }`}>
                      <IconComponent className={`w-8 h-8 ${
                        isDark ? 'text-purple-300' : 'text-purple-600'
                      }`} />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold mb-3 ${
                        isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                      }`}>
                        {style.title}
                      </h3>
                      <p className={`text-sm mb-4 ${
                        isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                      }`}>
                        {style.description}
                      </p>
                      
                      <div className="flex gap-4">
                        <div className={`text-sm ${
                          isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
                        }`}>
                          <strong>{style.performances}</strong> performances
                        </div>
                        <div className={`text-sm ${
                          isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
                        }`}>
                          <strong>{style.students}</strong> active dancers
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-6 ${
            isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
          }`}>
            Recent Achievements
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <div key={index} className={`p-6 rounded-lg border text-center transition-all duration-300 hover:shadow-lg ${
              isDark 
                ? `${getThemeColor('background.secondary', true)} ${colors.border.subtle.dark}`
                : `${getThemeColor('background.secondary', false)} ${colors.border.subtle.light}`
            }`}>
              <div className={`inline-flex p-3 rounded-full mb-4 ${
                isDark ? 'bg-yellow-500/20' : 'bg-yellow-100'
              }`}>
                <Trophy className={`w-6 h-6 ${
                  isDark ? 'text-yellow-300' : 'text-yellow-600'
                }`} />
              </div>
              
              <h3 className={`font-bold mb-2 ${
                isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
              }`}>
                {achievement.title}
              </h3>
              <p className={`text-sm mb-2 ${
                isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
              }`}>
                {achievement.year}
              </p>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-600'
              }`}>
                {achievement.award}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className={`py-16 ${
        isDark ? getThemeColor('background.secondary', true) : getThemeColor('background.secondary', false)
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-6 ${
              isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
            }`}>
              Upcoming Events
            </h2>
          </div>

          <div className="space-y-6">
            {upcomingEvents.map((event, index) => (
              <div key={index} className={`p-6 rounded-lg border transition-all duration-300 hover:shadow-lg ${
                isDark 
                  ? `${getThemeColor('background.primary', true)} ${colors.border.subtle.dark}`
                  : `${getThemeColor('background.primary', false)} ${colors.border.subtle.light}`
              }`}>
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${
                    isDark ? 'bg-green-500/20' : 'bg-green-100'
                  }`}>
                    <Calendar className={`w-8 h-8 ${
                      isDark ? 'text-green-300' : 'text-green-600'
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className={`text-lg font-bold ${
                        isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                      }`}>
                        {event.title}
                      </h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        event.type === 'Performance' 
                          ? isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-600'
                          : event.type === 'Workshop'
                          ? isDark ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-100 text-orange-600'
                          : isDark ? 'bg-red-500/20 text-red-300' : 'bg-red-100 text-red-600'
                      }`}>
                        {event.type}
                      </span>
                    </div>
                    
                    <div className={`text-sm space-y-1 ${
                      isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                    }`}>
                      <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                      <p>Venue: {event.venue}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
              Join the Youth Dancing Team
            </h2>
            <p className={`text-lg ${
              isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
            }`}>
              Auditions and training opportunities available throughout the year.
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
                +94 11 234 5685
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
                dancing@nysc.lk
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
                Location
              </h3>
              <p className={`text-sm ${
                isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
              }`}>
                NYSC Cultural Center
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouthDancingTeam;