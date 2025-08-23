import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor } from '../../config/colors';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

const EventsCalendar = () => {
  const { isDark } = useTheme();

  const events = [
    {
      title: "Youth Leadership Summit 2025",
      date: "January 15, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "BMICH, Colombo",
      participants: "500 Youth Leaders",
      type: "Conference",
      description: "Annual summit bringing together young leaders from across Sri Lanka to discuss leadership, innovation, and community development."
    },
    {
      title: "Vocational Skills Fair",
      date: "January 20, 2025",
      time: "10:00 AM - 4:00 PM", 
      location: "Kandy District Center",
      participants: "300 Students",
      type: "Exhibition",
      description: "Showcase of vocational training programs and career opportunities available through NYSC training centers."
    },
    {
      title: "Cultural Heritage Festival",
      date: "February 5, 2025",
      time: "6:00 PM - 10:00 PM",
      location: "Galle Face Green",
      participants: "1000+ Participants",
      type: "Cultural",
      description: "Celebration of Sri Lankan cultural heritage through traditional music, dance, and arts performances by youth groups."
    },
    {
      title: "Digital Innovation Workshop",
      date: "February 12, 2025", 
      time: "2:00 PM - 6:00 PM",
      location: "Online Platform",
      participants: "200 Tech Enthusiasts",
      type: "Workshop",
      description: "Hands-on workshop on emerging technologies, digital entrepreneurship, and innovation for the digital age."
    }
  ];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "News & Events", href: "/news-events" },
    { label: "Events Calendar" }
  ];

  return (
    <PageLayout 
      title="Events Calendar" 
      subtitle="Discover upcoming events, workshops, programs, and activities organized by NYSC across Sri Lanka."
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Calendar View Placeholder */}
        <div className={`mb-16 ${getThemeColor('background.card', isDark)} rounded-2xl p-8 md:p-12 text-center`}>
          <Calendar className="w-16 h-16 mx-auto mb-6 text-primary-500" />
          <h2 className={`text-3xl font-bold mb-4 ${getThemeColor('text.primary', isDark)}`}>
            Interactive Calendar
          </h2>
          <p className={`text-lg ${getThemeColor('text.secondary', isDark)} mb-8 max-w-3xl mx-auto`}>
            Browse events by month, filter by type, and register for programs directly through our interactive calendar interface.
          </p>
          <button className="px-8 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors">
            Open Calendar View
          </button>
        </div>

        {/* Upcoming Events */}
        <div className="mb-12">
          <h2 className={`text-3xl font-bold mb-8 ${getThemeColor('text.primary', isDark)}`}>
            Upcoming Events
          </h2>
          <div className="space-y-6">
            {events.map((event, index) => (
              <div key={index} className={`${getThemeColor('background.card', isDark)} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group`}>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="md:col-span-3">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getThemeColor('background.accent', isDark)} text-white`}>
                        {event.type}
                      </span>
                      <h3 className={`text-xl font-bold ${getThemeColor('text.primary', isDark)} group-hover:text-primary-600 transition-colors`}>
                        {event.title}
                      </h3>
                    </div>
                    <p className={`${getThemeColor('text.secondary', isDark)} mb-4 leading-relaxed`}>
                      {event.description}
                    </p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-primary-500" />
                        <span className={getThemeColor('text.secondary', isDark)}>{event.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-primary-500" />
                        <span className={getThemeColor('text.secondary', isDark)}>{event.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-primary-500" />
                        <span className={getThemeColor('text.secondary', isDark)}>{event.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-primary-500" />
                        <span className={getThemeColor('text.secondary', isDark)}>{event.participants}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center space-y-3">
                    <button className="px-4 py-2 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors text-sm">
                      Register Now
                    </button>
                    <button className={`px-4 py-2 border-2 border-primary-500 text-primary-500 rounded-lg font-semibold hover:bg-primary-500 hover:text-white transition-all text-sm`}>
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Event Categories */}
        <div className={`${getThemeColor('background.secondary', isDark)} rounded-2xl p-8 md:p-12`}>
          <h2 className={`text-3xl font-bold text-center mb-8 ${getThemeColor('text.primary', isDark)}`}>
            Event Categories
          </h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>Conferences</h3>
              <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>Leadership summits and professional development</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>Workshops</h3>
              <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>Skills training and hands-on learning</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>Cultural Events</h3>
              <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>Festivals and cultural celebrations</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>Competitions</h3>
              <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>Awards and recognition events</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default EventsCalendar;