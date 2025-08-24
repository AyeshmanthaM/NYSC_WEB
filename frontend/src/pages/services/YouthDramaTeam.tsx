import React from 'react';
import { Theater, Users, Award, Calendar, Star, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { colors, getThemeColor } from '../../config/colors';

const YouthDramaTeam: React.FC = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const genres = [
    {
      icon: Theater,
      title: 'Traditional Drama',
      description: 'Classical Sri Lankan theatrical forms including Kolam, Sokari, and traditional folk drama.',
      productions: 8,
      participants: 25
    },
    {
      icon: Star,
      title: 'Contemporary Theatre',
      description: 'Modern theatrical productions addressing contemporary social issues and themes.',
      productions: 12,
      participants: 35
    },
    {
      icon: Users,
      title: 'Educational Theatre',
      description: 'Interactive performances for schools and communities promoting social awareness.',
      productions: 15,
      participants: 40
    },
    {
      icon: Award,
      title: 'Experimental Arts',
      description: 'Innovative theatrical expressions blending traditional and modern performance techniques.',
      productions: 6,
      participants: 20
    }
  ];

  const recentProductions = [
    {
      title: 'Maname',
      genre: 'Traditional',
      performances: 12,
      audience: 5000,
      year: '2023',
      description: 'A classical Sinhala drama depicting ancient Sri Lankan values and traditions.'
    },
    {
      title: 'Voices of Change',
      genre: 'Contemporary',
      performances: 8,
      audience: 3200,
      year: '2023',
      description: 'Modern play addressing youth empowerment and social transformation.'
    },
    {
      title: 'Unity in Diversity',
      genre: 'Educational',
      performances: 20,
      audience: 8000,
      year: '2023',
      description: 'Interactive performance promoting national unity and cultural harmony.'
    },
    {
      title: 'Digital Dreams',
      genre: 'Experimental',
      performances: 6,
      audience: 2400,
      year: '2023',
      description: 'Innovative production exploring technology\'s impact on youth culture.'
    }
  ];

  const workshops = [
    {
      title: 'Acting Fundamentals',
      duration: '6 weeks',
      level: 'Beginner',
      schedule: 'Weekends',
      instructor: 'Prof. Nimal Perera',
      maxParticipants: 20
    },
    {
      title: 'Script Writing & Direction',
      duration: '8 weeks',
      level: 'Intermediate',
      schedule: 'Evenings',
      instructor: 'Ms. Kumari Silva',
      maxParticipants: 15
    },
    {
      title: 'Stage Design & Production',
      duration: '4 weeks',
      level: 'All Levels',
      schedule: 'Flexible',
      instructor: 'Mr. Rohan Fernando',
      maxParticipants: 12
    },
    {
      title: 'Voice & Movement Training',
      duration: '10 weeks',
      level: 'All Levels',
      schedule: 'Twice weekly',
      instructor: 'Dr. Priya Jayasuriya',
      maxParticipants: 25
    }
  ];

  const upcomingEvents = [
    {
      title: 'Annual Drama Festival',
      date: '2024-03-25',
      venue: 'Lionel Wendt Theatre',
      type: 'Festival',
      duration: '3 days'
    },
    {
      title: 'Youth Theatre Workshop Series',
      date: '2024-02-15',
      venue: 'NYSC Drama Center',
      type: 'Workshop',
      duration: '2 weeks'
    },
    {
      title: 'International Theatre Exchange',
      date: '2024-04-20',
      venue: 'Various Venues',
      type: 'Exchange',
      duration: '1 week'
    },
    {
      title: 'Community Outreach Performance',
      date: '2024-05-05',
      venue: 'Schools & Community Centers',
      type: 'Outreach',
      duration: '1 month'
    }
  ];

  const achievements = [
    { year: '2023', award: 'Best Youth Drama Group', event: 'National Theatre Awards' },
    { year: '2023', award: 'Excellence in Traditional Arts', event: 'Cultural Heritage Festival' },
    { year: '2022', award: 'Outstanding Social Impact', event: 'Community Service Awards' },
    { year: '2022', award: 'Innovation in Theatre', event: 'International Youth Arts Festival' }
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
                isDark ? 'bg-rose-500/20' : 'bg-rose-100'
              }`}>
                <Theater className={`w-12 h-12 ${
                  isDark ? 'text-rose-300' : 'text-rose-600'
                }`} />
              </div>
            </div>
            <h1 className={`text-4xl lg:text-6xl font-bold mb-6 ${
              isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
            }`}>
              Youth Drama Team
            </h1>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
            }`}>
              Bringing stories to life through theatrical excellence, fostering creativity, cultural preservation, and social awareness among young performers.
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
              Theatre for Social Change
            </h2>
            <div className="space-y-4">
              <p className={`text-lg leading-relaxed ${
                isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
              }`}>
                The NYSC Youth Drama Team serves as a dynamic platform for young artists to explore, create, and perform meaningful theatrical works that resonate with audiences across Sri Lanka.
              </p>
              <p className={`text-lg leading-relaxed ${
                isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
              }`}>
                Through diverse productions ranging from traditional folk drama to contemporary social commentary, our team contributes to cultural preservation while addressing modern societal issues.
              </p>
            </div>
          </div>
          
          <div className="aspect-square bg-gradient-to-br from-rose-400 to-orange-500 rounded-lg flex items-center justify-center">
            <Theater className="w-24 h-24 text-white" />
          </div>
        </div>
      </div>

      {/* Drama Genres */}
      <div className={`py-16 ${
        isDark ? getThemeColor('background.secondary', true) : getThemeColor('background.secondary', false)
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-6 ${
              isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
            }`}>
              Our Theatrical Repertoire
            </h2>
            <p className={`text-lg max-w-3xl mx-auto ${
              isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
            }`}>
              Diverse dramatic expressions from traditional to contemporary theatre
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {genres.map((genre, index) => {
              const IconComponent = genre.icon;
              return (
                <div key={index} className={`p-6 rounded-lg border transition-all duration-300 hover:shadow-lg ${
                  isDark 
                    ? `${getThemeColor('background.primary', true)} ${colors.border.subtle.dark} ${colors.hover.border.subtle.dark}`
                    : `${getThemeColor('background.primary', false)} ${colors.border.subtle.light} ${colors.hover.border.subtle.light}`
                }`}>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${
                      isDark ? 'bg-rose-500/20' : 'bg-rose-100'
                    }`}>
                      <IconComponent className={`w-8 h-8 ${
                        isDark ? 'text-rose-300' : 'text-rose-600'
                      }`} />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold mb-3 ${
                        isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                      }`}>
                        {genre.title}
                      </h3>
                      <p className={`text-sm mb-4 ${
                        isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                      }`}>
                        {genre.description}
                      </p>
                      
                      <div className="flex gap-6 text-sm">
                        <div className={isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)}>
                          <strong>{genre.productions}</strong> productions
                        </div>
                        <div className={isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)}>
                          <strong>{genre.participants}</strong> active members
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

      {/* Recent Productions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-6 ${
            isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
          }`}>
            Recent Productions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentProductions.map((production, index) => (
            <div key={index} className={`p-6 rounded-lg border transition-all duration-300 hover:shadow-lg ${
              isDark 
                ? `${getThemeColor('background.secondary', true)} ${colors.border.subtle.dark}`
                : `${getThemeColor('background.secondary', false)} ${colors.border.subtle.light}`
            }`}>
              <div className="text-center mb-4">
                <div className={`inline-flex p-3 rounded-lg mb-3 ${
                  isDark ? 'bg-purple-500/20' : 'bg-purple-100'
                }`}>
                  <Star className={`w-6 h-6 ${
                    isDark ? 'text-purple-300' : 'text-purple-600'
                  }`} />
                </div>
                
                <h3 className={`text-lg font-bold mb-2 ${
                  isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                }`}>
                  {production.title}
                </h3>
                
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  isDark ? 'bg-rose-500/20 text-rose-300' : 'bg-rose-100 text-rose-600'
                }`}>
                  {production.genre}
                </span>
              </div>
              
              <p className={`text-sm mb-4 ${
                isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
              }`}>
                {production.description}
              </p>
              
              <div className="space-y-2 text-xs">
                <div className={`flex justify-between ${
                  isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
                }`}>
                  <span>Performances:</span>
                  <strong>{production.performances}</strong>
                </div>
                <div className={`flex justify-between ${
                  isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
                }`}>
                  <span>Total Audience:</span>
                  <strong>{production.audience.toLocaleString()}</strong>
                </div>
                <div className={`flex justify-between ${
                  isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
                }`}>
                  <span>Year:</span>
                  <strong>{production.year}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Training Workshops */}
      <div className={`py-16 ${
        isDark ? getThemeColor('background.secondary', true) : getThemeColor('background.secondary', false)
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-6 ${
              isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
            }`}>
              Training Workshops
            </h2>
            <p className={`text-lg max-w-3xl mx-auto ${
              isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
            }`}>
              Comprehensive training programs to develop theatrical skills and artistry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {workshops.map((workshop, index) => (
              <div key={index} className={`p-6 rounded-lg border transition-all duration-300 hover:shadow-lg ${
                isDark 
                  ? `${getThemeColor('background.primary', true)} ${colors.border.subtle.dark}`
                  : `${getThemeColor('background.primary', false)} ${colors.border.subtle.light}`
              }`}>
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${
                    isDark ? 'bg-indigo-500/20' : 'bg-indigo-100'
                  }`}>
                    <Users className={`w-8 h-8 ${
                      isDark ? 'text-indigo-300' : 'text-indigo-600'
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-lg font-bold ${
                        isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                      }`}>
                        {workshop.title}
                      </h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        workshop.level === 'Beginner'
                          ? isDark ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-600'
                          : workshop.level === 'Intermediate'
                          ? isDark ? 'bg-yellow-500/20 text-yellow-300' : 'bg-yellow-100 text-yellow-600'
                          : isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {workshop.level}
                      </span>
                    </div>
                    
                    <div className={`grid grid-cols-2 gap-4 text-sm mb-3 ${
                      isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                    }`}>
                      <div>
                        <strong>Duration:</strong> {workshop.duration}
                      </div>
                      <div>
                        <strong>Schedule:</strong> {workshop.schedule}
                      </div>
                      <div>
                        <strong>Max Participants:</strong> {workshop.maxParticipants}
                      </div>
                      <div>
                        <strong>Instructor:</strong> {workshop.instructor}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
                      {event.title}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      event.type === 'Festival' 
                        ? isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-600'
                        : event.type === 'Workshop'
                        ? isDark ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-100 text-orange-600'
                        : event.type === 'Exchange'
                        ? isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-600'
                        : isDark ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-600'
                    }`}>
                      {event.type}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className={isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)}>
                      <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className={isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)}>
                      <strong>Venue:</strong> {event.venue}
                    </div>
                    <div className={isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)}>
                      <strong>Duration:</strong> {event.duration}
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
        isDark ? colors.background.gradient.dark : colors.background.gradient.light
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
              <div key={index} className="text-center">
                <div className={`inline-flex p-4 rounded-full mb-4 ${
                  isDark ? 'bg-yellow-500/20' : 'bg-yellow-100'
                }`}>
                  <Award className={`w-8 h-8 ${
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
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  isDark ? 'bg-rose-500/20 text-rose-300' : 'bg-rose-100 text-rose-600'
                }`}>
                  {achievement.year}
                </span>
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
              Join the Youth Drama Team
            </h2>
            <p className={`text-lg ${
              isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
            }`}>
              Auditions and workshops open to passionate young performers and theatre enthusiasts.
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
                +94 11 234 5686
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
                drama@nysc.lk
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
                NYSC Drama Theater
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouthDramaTeam;