import React from 'react';
import { Calendar, Clock, MapPin, ArrowRight, Newspaper, Users } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeColor } from '../config/colors';

const NewsEventsSection = () => {
  const { isDark } = useTheme();
  const news = [
    {
      id: 1,
      title: 'NYSC Launches New Digital Skills Program',
      excerpt: 'Empowering youth with essential digital literacy and coding skills for the modern workforce.',
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      date: '2024-01-15',
      category: 'Program Launch',
      readTime: '3 min read'
    },
    {
      id: 2,
      title: 'Youth Leadership Summit 2024 Announced',
      excerpt: 'Annual summit bringing together young leaders from across Sri Lanka to share ideas and innovations.',
      image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      date: '2024-01-12',
      category: 'Event',
      readTime: '2 min read'
    },
    {
      id: 3,
      title: 'Community Impact Awards Winners',
      excerpt: 'Celebrating outstanding youth who have made significant contributions to their communities.',
      image: 'https://images.pexels.com/photos/1157394/pexels-photo-1157394.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      date: '2024-01-10',
      category: 'Achievement',
      readTime: '4 min read'
    }
  ];

  const events = [
    {
      id: 1,
      title: 'Youth Entrepreneurship Workshop',
      date: '2024-02-15',
      time: '9:00 AM',
      location: 'Colombo Convention Center',
      attendees: 150,
      status: 'Open Registration',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      title: 'Cultural Heritage Festival',
      date: '2024-02-20',
      time: '6:00 PM',
      location: 'Independence Square',
      attendees: 500,
      status: 'Featured Event',
      color: 'from-pink-500 to-pink-600'
    },
    {
      id: 3,
      title: 'Sports Tournament Finals',
      date: '2024-02-25',
      time: '2:00 PM',
      location: 'Sugathadasa Stadium',
      attendees: 300,
      status: 'Registration Closing',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 4,
      title: 'Leadership Training Camp',
      date: '2024-03-01',
      time: '8:00 AM',
      location: 'Kandy Training Center',
      attendees: 80,
      status: 'Limited Spots',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
            <Newspaper className="w-4 h-4" />
            <span>Stay Updated</span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${getThemeColor('text.primary', isDark)}`}>
            News & Events
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${getThemeColor('text.secondary', isDark)}`}>
            Stay informed about the latest happenings, upcoming events, and success stories 
            from the NYSC community
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* News Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h3 className={`text-2xl font-bold ${getThemeColor('text.primary', isDark)}`}>Latest News</h3>
              <button className="font-medium inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                <span>View All</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-6">
              {news.map((article) => (
                <article
                  key={article.id}
                  className={`group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${getThemeColor('card', isDark)}`}
                >
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                          {article.category}
                        </span>
                        <span className={`text-sm ${getThemeColor('text.muted', isDark)}`}>
                          {new Date(article.date).toLocaleDateString()}
                        </span>
                        <span className={`text-sm ${getThemeColor('text.muted', isDark)}`}>•</span>
                        <span className={`text-sm ${getThemeColor('text.muted', isDark)}`}>{article.readTime}</span>
                      </div>
                      <h4 className={`text-xl font-bold mb-3 transition-colors ${getThemeColor('text.primary', isDark)} group-hover:text-blue-600 dark:group-hover:text-blue-400`}>
                        {article.title}
                      </h4>
                      <p className={`mb-4 leading-relaxed ${getThemeColor('text.secondary', isDark)}`}>
                        {article.excerpt}
                      </p>
                      <button className="font-medium inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                        <span>Read More</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Events Section */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className={`text-2xl font-bold ${getThemeColor('text.primary', isDark)}`}>Upcoming Events</h3>
              <button className="font-medium inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                <span>View Calendar</span>
                <Calendar className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className={`group rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border ${getThemeColor('card', isDark)} ${getThemeColor('border', isDark)}`}
                >
                  {/* Event Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`inline-flex items-center space-x-2 bg-gradient-to-r ${event.color} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                      <Calendar className="w-4 h-4" />
                      <span>{event.status}</span>
                    </div>
                  </div>

                  {/* Event Title */}
                  <h4 className={`text-lg font-bold mb-3 transition-colors ${getThemeColor('text.primary', isDark)} group-hover:text-blue-600 dark:group-hover:text-blue-400`}>
                    {event.title}
                  </h4>

                  {/* Event Details */}
                  <div className="space-y-2 mb-4">
                    <div className={`flex items-center space-x-2 ${getThemeColor('text.secondary', isDark)}`}>
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className={`flex items-center space-x-2 ${getThemeColor('text.secondary', isDark)}`}>
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className={`flex items-center space-x-2 ${getThemeColor('text.secondary', isDark)}`}>
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className={`flex items-center space-x-2 ${getThemeColor('text.secondary', isDark)}`}>
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{event.attendees} attendees</span>
                    </div>
                  </div>

                  {/* Register Button */}
                  <button className={`w-full bg-gradient-to-r ${event.color} hover:opacity-90 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 transform group-hover:scale-105`}>
                    Register Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsEventsSection;