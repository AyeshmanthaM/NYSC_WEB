import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin, Filter } from 'lucide-react';
import { useLanguage } from '../../contexts/CompatibilityLanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { colors, getThemeColor } from '../../config/colors';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
}

const EventsCalendar: React.FC = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [view, setView] = useState<'month' | 'agenda'>('month');

  // Sample data - replace with actual API call
  useEffect(() => {
    const sampleEvents: CalendarEvent[] = [
      {
        id: '1',
        title: 'Leadership Workshop',
        date: '2024-02-15',
        time: '09:00',
        location: 'NYSC Head Office',
        category: 'Training',
        description: 'Comprehensive leadership development program for youth leaders.'
      },
      {
        id: '2',
        title: 'Cultural Performance',
        date: '2024-02-20',
        time: '18:00',
        location: 'National Theatre',
        category: 'Cultural',
        description: 'Traditional dance and music performance by youth groups.'
      },
      {
        id: '3',
        title: 'Sports Championship',
        date: '2024-02-25',
        time: '08:00',
        location: 'Sports Complex',
        category: 'Sports',
        description: 'Annual inter-district sports competition.'
      },
      {
        id: '4',
        title: 'Career Fair',
        date: '2024-03-05',
        time: '10:00',
        location: 'Convention Center',
        category: 'Career',
        description: 'Job opportunities and career guidance for graduates.'
      }
    ];
    setEvents(sampleEvents);
  }, []);

  const categories = ['all', 'Training', 'Cultural', 'Sports', 'Career', 'Community'];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => 
      event.date === dateString && 
      (selectedCategory === 'all' || event.category === selectedCategory)
    );
  };

  const getEventsForMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && 
             eventDate.getMonth() === month &&
             (selectedCategory === 'all' || event.category === selectedCategory);
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="aspect-square p-2 border-b border-r border-gray-200 dark:border-gray-700" />
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = getEventsForDate(date);
      const isToday = date.getTime() === today.getTime();
      const isSelected = selectedDate && date.getTime() === selectedDate.getTime();

      days.push(
        <div
          key={day}
          className={`aspect-square p-2 border-b border-r cursor-pointer transition-colors relative ${
            isDark ? 'border-gray-700' : 'border-gray-200'
          } ${
            isToday 
              ? isDark 
                ? 'bg-orange-500/20 border-orange-400' 
                : 'bg-orange-100 border-orange-500'
              : isSelected
                ? isDark
                  ? 'bg-blue-500/20 border-blue-400'
                  : 'bg-blue-100 border-blue-500'
                : isDark
                  ? 'hover:bg-gray-700/50'
                  : 'hover:bg-gray-50'
          }`}
          onClick={() => setSelectedDate(date)}
        >
          <div className={`text-sm font-medium ${
            isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
          }`}>
            {day}
          </div>
          {dayEvents.length > 0 && (
            <div className="mt-1 space-y-1">
              {dayEvents.slice(0, 2).map((event, index) => (
                <div 
                  key={event.id}
                  className={`text-xs p-1 rounded truncate ${
                    event.category === 'Training' ? 'bg-blue-500/20 text-blue-300' :
                    event.category === 'Cultural' ? 'bg-purple-500/20 text-purple-300' :
                    event.category === 'Sports' ? 'bg-green-500/20 text-green-300' :
                    event.category === 'Career' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-gray-500/20 text-gray-300'
                  }`}
                >
                  {event.title}
                </div>
              ))}
              {dayEvents.length > 2 && (
                <div className={`text-xs text-center ${
                  isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
                }`}>
                  +{dayEvents.length - 2} more
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    return days;
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
              Events Calendar
            </h1>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
            }`}>
              Stay up-to-date with all NYSC events, workshops, and programs throughout the year.
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className={`border-b ${
        isDark ? colors.border.subtle.dark : colors.border.subtle.light
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* View Toggle */}
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setView('month')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  view === 'month'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Month View
              </button>
              <button
                onClick={() => setView('agenda')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  view === 'agenda'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Agenda View
              </button>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className={`w-4 h-4 ${
                isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
              }`} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`px-3 py-2 rounded-lg border transition-colors ${
                  isDark 
                    ? `${getThemeColor('background.secondary', true)} ${getThemeColor('border.primary', true)} ${getThemeColor('text.primary', true)}`
                    : `${getThemeColor('background.primary', false)} ${getThemeColor('border.secondary', false)} ${getThemeColor('text.primary', false)}`
                }`}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'month' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar */}
            <div className="lg:col-span-2">
              <div className={`rounded-lg border ${
                isDark 
                  ? `${getThemeColor('background.secondary', true)} ${colors.border.subtle.dark}`
                  : `${getThemeColor('background.primary', false)} ${colors.border.subtle.light}`
              }`}>
                {/* Calendar Header */}
                <div className={`flex items-center justify-between p-4 border-b ${
                  isDark ? colors.border.subtle.dark : colors.border.subtle.light
                }`}>
                  <button
                    onClick={() => navigateMonth('prev')}
                    className={`p-2 rounded-lg transition-colors ${
                      isDark 
                        ? `${colors.hover.background.dark} ${colors.hover.text.primary.dark}`
                        : `${colors.hover.background.light} ${colors.hover.text.primary.light}`
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  <h2 className={`text-xl font-semibold ${
                    isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                  }`}>
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h2>
                  
                  <button
                    onClick={() => navigateMonth('next')}
                    className={`p-2 rounded-lg transition-colors ${
                      isDark 
                        ? `${colors.hover.background.dark} ${colors.hover.text.primary.dark}`
                        : `${colors.hover.background.light} ${colors.hover.text.primary.light}`
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Days of Week */}
                <div className={`grid grid-cols-7 border-b ${
                  isDark ? colors.border.subtle.dark : colors.border.subtle.light
                }`}>
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className={`p-3 text-center text-sm font-medium ${
                      isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                    }`}>
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7">
                  {renderCalendarGrid()}
                </div>
              </div>
            </div>

            {/* Selected Date Events */}
            <div className={`rounded-lg border ${
              isDark 
                ? `${getThemeColor('background.secondary', true)} ${colors.border.subtle.dark}`
                : `${getThemeColor('background.primary', false)} ${colors.border.subtle.light}`
            }`}>
              <div className={`p-4 border-b ${
                isDark ? colors.border.subtle.dark : colors.border.subtle.light
              }`}>
                <h3 className={`text-lg font-semibold ${
                  isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                }`}>
                  {selectedDate ? selectedDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric'
                  }) : 'Select a date'}
                </h3>
              </div>
              
              <div className="p-4">
                {selectedDate ? (
                  <div className="space-y-3">
                    {getEventsForDate(selectedDate).map(event => (
                      <div key={event.id} className={`p-3 rounded-lg ${
                        isDark ? getThemeColor('background.primary', true) : 'bg-gray-50'
                      }`}>
                        <h4 className={`font-medium mb-1 ${
                          isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                        }`}>
                          {event.title}
                        </h4>
                        <div className={`text-sm space-y-1 ${
                          isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                        }`}>
                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3 h-3" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    {getEventsForDate(selectedDate).length === 0 && (
                      <p className={`text-sm text-center py-4 ${
                        isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
                      }`}>
                        No events scheduled
                      </p>
                    )}
                  </div>
                ) : (
                  <p className={`text-sm text-center py-4 ${
                    isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
                  }`}>
                    Click on a date to view events
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Agenda View */
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold ${
              isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
            }`}>
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} Events
            </h2>
            
            {getEventsForMonth().map(event => (
              <div key={event.id} className={`p-6 rounded-lg border ${
                isDark 
                  ? `${getThemeColor('background.secondary', true)} ${colors.border.subtle.dark}`
                  : `${getThemeColor('background.primary', false)} ${colors.border.subtle.light}`
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                  <h3 className={`text-lg font-semibold ${
                    isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                  }`}>
                    {event.title}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    event.category === 'Training' ? 'bg-blue-500/20 text-blue-300' :
                    event.category === 'Cultural' ? 'bg-purple-500/20 text-purple-300' :
                    event.category === 'Sports' ? 'bg-green-500/20 text-green-300' :
                    event.category === 'Career' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-gray-500/20 text-gray-300'
                  }`}>
                    {event.category}
                  </span>
                </div>
                
                <p className={`text-sm mb-3 ${
                  isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                }`}>
                  {event.description}
                </p>
                
                <div className={`flex flex-wrap gap-4 text-sm ${
                  isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                }`}>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            ))}
            
            {getEventsForMonth().length === 0 && (
              <div className="text-center py-12">
                <Calendar className={`w-16 h-16 mx-auto mb-4 ${
                  isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
                }`} />
                <p className={`text-lg ${
                  isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                }`}>
                  No events scheduled for this month
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsCalendar;