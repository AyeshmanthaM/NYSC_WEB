import React from 'react';
import { Music2, Users, Trophy, Calendar, Volume2, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { colors, getThemeColor } from '../../config/colors';

const YouthMusicBand: React.FC = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const instruments = [
    {
      category: 'Traditional',
      instruments: ['Tabla', 'Mridangam', 'Flute', 'Sitar', 'Harmonium'],
      members: 15,
      description: 'Classical and traditional Sri Lankan instruments preserving cultural heritage.'
    },
    {
      category: 'Western',
      instruments: ['Guitar', 'Violin', 'Piano', 'Drums', 'Bass'],
      members: 12,
      description: 'Western classical and contemporary instruments for diverse musical expressions.'
    },
    {
      category: 'Brass',
      instruments: ['Trumpet', 'Trombone', 'French Horn', 'Tuba', 'Saxophone'],
      members: 8,
      description: 'Brass section providing powerful ceremonial and concert performances.'
    },
    {
      category: 'Percussion',
      instruments: ['Drums', 'Cymbals', 'Xylophone', 'Timpani', 'Congas'],
      members: 10,
      description: 'Rhythm section creating the heartbeat of our musical performances.'
    }
  ];

  const performances = [
    {
      title: 'National Day Ceremony',
      date: '2024-02-04',
      venue: 'Independence Square',
      audience: '5000+',
      type: 'Ceremonial'
    },
    {
      title: 'Annual Youth Concert',
      date: '2024-03-20',
      venue: 'Nelum Pokuna Theatre',
      audience: '1500',
      type: 'Concert'
    },
    {
      title: 'International Music Festival',
      date: '2024-04-15',
      venue: 'BMICH',
      audience: '3000',
      type: 'Festival'
    },
    {
      title: 'Community Outreach Program',
      date: '2024-05-10',
      venue: 'Various Schools',
      audience: '2000+',
      type: 'Educational'
    }
  ];

  const achievements = [
    {
      year: '2023',
      award: 'Best Youth Band',
      event: 'National Music Competition',
      level: 'National'
    },
    {
      year: '2023',
      award: 'Excellence in Traditional Music',
      event: 'Cultural Arts Festival',
      level: 'National'
    },
    {
      year: '2022',
      award: 'Outstanding Performance',
      event: 'SAARC Youth Festival',
      level: 'International'
    },
    {
      year: '2022',
      award: 'Community Service Award',
      event: 'Youth Volunteer Recognition',
      level: 'National'
    }
  ];

  const programs = [
    {
      title: 'Beginner Music Classes',
      duration: '3 months',
      schedule: 'Weekends',
      fee: 'Free',
      description: 'Introduction to various instruments for newcomers'
    },
    {
      title: 'Advanced Ensemble Training',
      duration: '6 months',
      schedule: 'Twice weekly',
      fee: 'Nominal',
      description: 'Intensive training for experienced musicians'
    },
    {
      title: 'Music Theory Workshop',
      duration: '1 month',
      schedule: 'Intensive',
      fee: 'Free',
      description: 'Understanding music theory and composition'
    },
    {
      title: 'Performance Preparation',
      duration: 'Ongoing',
      schedule: 'As needed',
      fee: 'Free',
      description: 'Preparation for concerts and competitions'
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
                isDark ? 'bg-indigo-500/20' : 'bg-indigo-100'
              }`}>
                <Music2 className={`w-12 h-12 ${
                  isDark ? 'text-indigo-300' : 'text-indigo-600'
                }`} />
              </div>
            </div>
            <h1 className={`text-4xl lg:text-6xl font-bold mb-6 ${
              isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
            }`}>
              Youth Music Band
            </h1>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
            }`}>
              Harmonizing traditions and innovation through music, fostering musical excellence and cultural appreciation among young musicians across Sri Lanka.
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
              Creating Musical Excellence
            </h2>
            <div className="space-y-4">
              <p className={`text-lg leading-relaxed ${
                isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
              }`}>
                The NYSC Youth Music Band brings together talented young musicians from across Sri Lanka, creating a platform for musical education, cultural exchange, and artistic excellence.
              </p>
              <p className={`text-lg leading-relaxed ${
                isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
              }`}>
                Our ensemble performs at national ceremonies, cultural festivals, and community events, serving as ambassadors of Sri Lankan musical heritage while embracing contemporary expressions.
              </p>
            </div>
          </div>
          
          <div className="aspect-square bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center">
            <Volume2 className="w-24 h-24 text-white" />
          </div>
        </div>
      </div>

      {/* Instrument Sections */}
      <div className={`py-16 ${
        isDark ? getThemeColor('background.secondary', true) : getThemeColor('background.secondary', false)
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-6 ${
              isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
            }`}>
              Musical Sections
            </h2>
            <p className={`text-lg max-w-3xl mx-auto ${
              isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
            }`}>
              Our diverse ensemble combines traditional and contemporary instruments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {instruments.map((section, index) => (
              <div key={index} className={`p-6 rounded-lg border transition-all duration-300 hover:shadow-lg ${
                isDark 
                  ? `${getThemeColor('background.primary', true)} ${colors.border.subtle.dark} ${colors.hover.border.subtle.dark}`
                  : `${getThemeColor('background.primary', false)} ${colors.border.subtle.light} ${colors.hover.border.subtle.light}`
              }`}>
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${
                    isDark ? 'bg-indigo-500/20' : 'bg-indigo-100'
                  }`}>
                    <Music2 className={`w-8 h-8 ${
                      isDark ? 'text-indigo-300' : 'text-indigo-600'
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className={`text-xl font-bold ${
                        isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                      }`}>
                        {section.category}
                      </h3>
                      <span className={`px-2 py-1 rounded text-sm font-medium ${
                        isDark ? 'bg-gray-500/20 text-gray-300' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {section.members} members
                      </span>
                    </div>
                    
                    <p className={`text-sm mb-4 ${
                      isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                    }`}>
                      {section.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {section.instruments.map((instrument, idx) => (
                        <span key={idx} className={`px-2 py-1 rounded text-xs font-medium ${
                          isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-600'
                        }`}>
                          {instrument}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Performances */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-6 ${
            isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
          }`}>
            Upcoming Performances
          </h2>
        </div>

        <div className="space-y-6">
          {performances.map((performance, index) => (
            <div key={index} className={`p-6 rounded-lg border transition-all duration-300 hover:shadow-lg ${
              isDark 
                ? `${getThemeColor('background.secondary', true)} ${colors.border.subtle.dark}`
                : `${getThemeColor('background.secondary', false)} ${colors.border.subtle.light}`
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
                    <h3 className={`text-xl font-bold ${
                      isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                    }`}>
                      {performance.title}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      performance.type === 'Ceremonial' 
                        ? isDark ? 'bg-red-500/20 text-red-300' : 'bg-red-100 text-red-600'
                        : performance.type === 'Concert'
                        ? isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-600'
                        : performance.type === 'Festival'
                        ? isDark ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-100 text-orange-600'
                        : isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {performance.type}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className={`text-sm ${
                      isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                    }`}>
                      <strong>Date:</strong> {new Date(performance.date).toLocaleDateString()}
                    </div>
                    <div className={`text-sm ${
                      isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                    }`}>
                      <strong>Venue:</strong> {performance.venue}
                    </div>
                    <div className={`text-sm ${
                      isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                    }`}>
                      <strong>Expected Audience:</strong> {performance.audience}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className={`py-16 ${
        isDark ? getThemeColor('background.secondary', true) : getThemeColor('background.secondary', false)
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  ? `${getThemeColor('background.primary', true)} ${colors.border.subtle.dark}`
                  : `${getThemeColor('background.primary', false)} ${colors.border.subtle.light}`
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
                  {achievement.award}
                </h3>
                <p className={`text-sm mb-2 ${
                  isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                }`}>
                  {achievement.event}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    isDark ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-100 text-indigo-600'
                  }`}>
                    {achievement.year}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    achievement.level === 'International'
                      ? isDark ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-600'
                      : isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {achievement.level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Training Programs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-6 ${
            isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
          }`}>
            Training Programs
          </h2>
          <p className={`text-lg max-w-3xl mx-auto ${
            isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
          }`}>
            Comprehensive music education programs for all skill levels
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programs.map((program, index) => (
            <div key={index} className={`p-6 rounded-lg border transition-all duration-300 hover:shadow-lg ${
              isDark 
                ? `${getThemeColor('background.secondary', true)} ${colors.border.subtle.dark}`
                : `${getThemeColor('background.secondary', false)} ${colors.border.subtle.light}`
            }`}>
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${
                  isDark ? 'bg-orange-500/20' : 'bg-orange-100'
                }`}>
                  <Users className={`w-8 h-8 ${
                    isDark ? 'text-orange-300' : 'text-orange-600'
                  }`} />
                </div>
                
                <div className="flex-1">
                  <h3 className={`text-lg font-bold mb-3 ${
                    isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                  }`}>
                    {program.title}
                  </h3>
                  <p className={`text-sm mb-4 ${
                    isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                  }`}>
                    {program.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className={isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)}>
                      <strong>Duration:</strong> {program.duration}
                    </div>
                    <div className={isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)}>
                      <strong>Schedule:</strong> {program.schedule}
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      program.fee === 'Free'
                        ? isDark ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-600'
                        : isDark ? 'bg-yellow-500/20 text-yellow-300' : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {program.fee}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className={`py-16 ${
        isDark ? getThemeColor('background.secondary', true) : getThemeColor('background.secondary', false)
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`p-8 rounded-lg border ${
            isDark 
              ? `${getThemeColor('background.primary', true)} ${colors.border.subtle.dark}`
              : `${getThemeColor('background.primary', false)} ${colors.border.subtle.light}`
          }`}>
            <div className="text-center mb-8">
              <h2 className={`text-2xl font-bold mb-4 ${
                isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
              }`}>
                Join the Youth Music Band
              </h2>
              <p className={`text-lg ${
                isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
              }`}>
                Auditions and music classes open to all youth interested in musical excellence.
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
                  +94 11 234 5684
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
                  music@nysc.lk
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
                  NYSC Music Center
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouthMusicBand;