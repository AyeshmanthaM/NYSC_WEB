import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Tag, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../contexts/CompatibilityLanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { colors, getThemeColor } from '../../config/colors';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  capacity?: number;
  registered?: number;
  registrationUrl?: string;
  image?: string;
}

const UpcomingEvents: React.FC = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample data - replace with actual API call
  useEffect(() => {
    const sampleEvents: Event[] = [
      {
        id: '1',
        title: 'Youth Leadership Summit 2024',
        description: 'A comprehensive program designed to develop leadership skills among young people. Featuring workshops, panel discussions, and networking opportunities.',
        date: '2024-02-15',
        time: '09:00',
        location: 'NYSC Head Office, Colombo',
        category: 'Leadership',
        capacity: 200,
        registered: 156,
        registrationUrl: '/register/leadership-summit-2024'
      },
      {
        id: '2',
        title: 'Skills Development Workshop Series',
        description: 'Multi-day workshop covering digital skills, communication, and technical training for career advancement.',
        date: '2024-02-22',
        time: '10:00',
        location: 'Provincial Training Center, Kandy',
        category: 'Training',
        capacity: 100,
        registered: 89,
        registrationUrl: '/register/skills-workshop-2024'
      },
      {
        id: '3',
        title: 'Cultural Heritage Festival',
        description: 'Celebrating Sri Lankan culture through traditional music, dance, and art exhibitions. Youth participants will showcase their talents.',
        date: '2024-03-05',
        time: '16:00',
        location: 'National Theatre, Colombo',
        category: 'Cultural',
        capacity: 500,
        registered: 234,
        registrationUrl: '/register/cultural-festival-2024'
      },
      {
        id: '4',
        title: 'Entrepreneurship Bootcamp',
        description: 'Intensive 3-day program for aspiring young entrepreneurs. Includes mentorship, business planning, and pitch sessions.',
        date: '2024-03-12',
        time: '09:30',
        location: 'Innovation Hub, Galle',
        category: 'Entrepreneurship',
        capacity: 75,
        registered: 52,
        registrationUrl: '/register/entrepreneurship-bootcamp-2024'
      },
      {
        id: '5',
        title: 'Sports Championship 2024',
        description: 'Annual inter-district sports competition featuring various categories including cricket, volleyball, athletics, and traditional games.',
        date: '2024-03-20',
        time: '08:00',
        location: 'National Sports Complex, Colombo',
        category: 'Sports',
        capacity: 1000,
        registered: 678,
        registrationUrl: '/register/sports-championship-2024'
      }
    ];
    setEvents(sampleEvents);
  }, []);

  const categories = ['all', 'Leadership', 'Training', 'Cultural', 'Entrepreneurship', 'Sports', 'Volunteering'];

  const filteredEvents = events.filter(event => {
    return selectedCategory === 'all' || event.category === selectedCategory;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getDaysUntilEvent = (dateString: string) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

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
            <h1 className={`text-4xl lg:text-6xl font-bold mb-6 ${
              isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
            }`}>
              Upcoming Events
            </h1>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
            }`}>
              Join us for exciting events, workshops, and programs designed to empower and inspire young people across Sri Lanka.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className={`border-b ${
        isDark ? colors.border.subtle.dark : colors.border.subtle.light
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? isDark
                      ? `${colors.brand.primary.background} ${colors.brand.primary.text} ${colors.effects.glow.brand}`
                      : `${colors.brand.primary.background} ${colors.brand.primary.text} ${colors.effects.glow.brand}`
                    : isDark
                      ? `${getThemeColor('background.secondary', true)} ${getThemeColor('text.secondary', true)} ${colors.hover.background.dark} ${colors.hover.text.primary.dark}`
                      : `${getThemeColor('background.secondary', false)} ${getThemeColor('text.secondary', false)} ${colors.hover.background.light} ${colors.hover.text.primary.light}`
                }`}
              >
                {category === 'all' ? 'All Events' : category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className={`w-16 h-16 mx-auto mb-4 ${
              isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
            }`} />
            <h3 className={`text-xl font-semibold mb-2 ${
              isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
            }`}>
              No upcoming events
            </h3>
            <p className={`${
              isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
            }`}>
              Check back soon for new events and programs
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredEvents.map((event) => {
              const daysUntil = getDaysUntilEvent(event.date);
              const capacityPercentage = event.capacity ? (event.registered! / event.capacity) * 100 : 0;
              
              return (
                <div key={event.id} className={`p-6 rounded-lg border transition-all duration-300 hover:shadow-xl ${
                  isDark 
                    ? `${getThemeColor('background.secondary', true)} ${colors.border.subtle.dark} ${colors.hover.border.subtle.dark}`
                    : `${getThemeColor('background.primary', false)} ${colors.border.subtle.light} ${colors.hover.border.subtle.light}`
                }`}>
                  {/* Event Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-600'
                      }`}>
                        {event.category}
                      </span>
                      {daysUntil <= 7 && daysUntil > 0 && (
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${
                          isDark ? 'bg-red-500/20 text-red-300' : 'bg-red-100 text-red-600'
                        }`}>
                          {daysUntil} day{daysUntil === 1 ? '' : 's'} left
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Event Title */}
                  <h3 className={`text-xl font-bold mb-3 ${
                    isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                  }`}>
                    {event.title}
                  </h3>

                  {/* Event Description */}
                  <p className={`text-sm mb-4 leading-relaxed ${
                    isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                  }`}>
                    {event.description}
                  </p>

                  {/* Event Details */}
                  <div className="space-y-2 mb-4">
                    <div className={`flex items-center gap-2 text-sm ${
                      isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                    }`}>
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    
                    <div className={`flex items-center gap-2 text-sm ${
                      isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                    }`}>
                      <Clock className="w-4 h-4" />
                      <span>{formatTime(event.time)}</span>
                    </div>
                    
                    <div className={`flex items-center gap-2 text-sm ${
                      isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                    }`}>
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  {/* Capacity Information */}
                  {event.capacity && (
                    <div className="mb-4">
                      <div className={`flex items-center justify-between text-sm mb-2 ${
                        isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                      }`}>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          Registration Status
                        </span>
                        <span>{event.registered}/{event.capacity}</span>
                      </div>
                      <div className={`w-full bg-gray-200 rounded-full h-2 ${
                        isDark ? 'bg-gray-700' : 'bg-gray-200'
                      }`}>
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            capacityPercentage >= 90 ? 'bg-red-500' : 
                            capacityPercentage >= 70 ? 'bg-yellow-500' : 
                            'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(capacityPercentage, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Registration Button */}
                  {event.registrationUrl && (
                    <button className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all duration-300 font-medium ${
                      capacityPercentage >= 100 
                        ? isDark 
                          ? `${getThemeColor('background.secondary', true)} ${getThemeColor('text.muted', true)} cursor-not-allowed`
                          : `${getThemeColor('background.secondary', false)} ${getThemeColor('text.muted', false)} cursor-not-allowed`
                        : isDark
                          ? `${colors.brand.primary.background} ${colors.brand.primary.text} hover:bg-orange-600 ${colors.effects.glow.brand}`
                          : `${colors.brand.primary.background} ${colors.brand.primary.text} hover:bg-orange-600 ${colors.effects.glow.brand}`
                    } hover:shadow-md`}
                      disabled={capacityPercentage >= 100}
                    >
                      <ExternalLink className="w-4 h-4" />
                      {capacityPercentage >= 100 ? 'Event Full' : 'Register Now'}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingEvents;