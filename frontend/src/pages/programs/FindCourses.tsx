import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor } from '../../config/colors';
import { Search, Filter, MapPin, Calendar, Users, Clock } from 'lucide-react';

const FindCourses = () => {
  const { isDark } = useTheme();

  const courses = [
    {
      title: "Web Development Fundamentals",
      category: "IT & Technology",
      duration: "3 months",
      location: "Colombo District",
      participants: "25 students",
      startDate: "March 2024",
      level: "Beginner",
      description: "Learn HTML, CSS, JavaScript, and modern web development frameworks."
    },
    {
      title: "Automotive Technology",
      category: "Technical Vocations",
      duration: "6 months",
      location: "Gampaha District",
      participants: "20 students",
      startDate: "April 2024",
      level: "Intermediate",
      description: "Comprehensive training in automotive repair and maintenance."
    },
    {
      title: "Digital Marketing",
      category: "Business & Entrepreneurship",
      duration: "2 months",
      location: "Kandy District",
      participants: "30 students",
      startDate: "February 2024",
      level: "Beginner",
      description: "Master modern digital marketing strategies and social media management."
    },
    {
      title: "Traditional Crafts",
      category: "Cultural Programs",
      duration: "4 months",
      location: "Matara District",
      participants: "15 students",
      startDate: "May 2024",
      level: "All Levels",
      description: "Learn traditional Sri Lankan handicrafts and preserve cultural heritage."
    }
  ];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Programs", href: "/programs" },
    { label: "Find Courses" }
  ];

  return (
    <PageLayout 
      title="Find Courses" 
      subtitle="Discover the perfect course to develop your skills and advance your career with NYSC training programs."
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Search and Filter Section */}
        <div className={`mb-12 ${getThemeColor('background.card', isDark)} rounded-2xl p-8`}>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="md:col-span-2">
              <label className={`block text-sm font-medium mb-2 ${getThemeColor('text.primary', isDark)}`}>
                Search Courses
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by course name or keyword..."
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${getThemeColor('background.input', isDark)}`}
                />
              </div>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${getThemeColor('text.primary', isDark)}`}>
                Category
              </label>
              <select className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${getThemeColor('background.input', isDark)}`}>
                <option>All Categories</option>
                <option>IT & Technology</option>
                <option>Technical Vocations</option>
                <option>Business & Entrepreneurship</option>
                <option>Cultural Programs</option>
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${getThemeColor('text.primary', isDark)}`}>
                District
              </label>
              <select className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${getThemeColor('background.input', isDark)}`}>
                <option>All Districts</option>
                <option>Colombo</option>
                <option>Gampaha</option>
                <option>Kandy</option>
                <option>Matara</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <button className="inline-flex items-center px-8 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors">
              <Filter className="w-4 h-4 mr-2" />
              Apply Filters
            </button>
          </div>
        </div>

        {/* Course Results */}
        <div className="grid md:grid-cols-2 gap-8">
          {courses.map((course, index) => (
            <div 
              key={index} 
              className={`${getThemeColor('background.card', isDark)} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-2">
                    {course.category}
                  </div>
                  <h3 className={`text-xl font-bold ${getThemeColor('text.primary', isDark)} group-hover:text-primary-600 transition-colors`}>
                    {course.title}
                  </h3>
                </div>
                <div className="inline-block px-2 py-1 bg-secondary-100 text-secondary-700 rounded text-xs font-medium">
                  {course.level}
                </div>
              </div>
              
              <p className={`${getThemeColor('text.secondary', isDark)} mb-6 leading-relaxed`}>
                {course.description}
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm">
                  <Clock className="w-4 h-4 mr-3 text-primary-500" />
                  <span className={getThemeColor('text.secondary', isDark)}>
                    Duration: {course.duration}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="w-4 h-4 mr-3 text-primary-500" />
                  <span className={getThemeColor('text.secondary', isDark)}>
                    Location: {course.location}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 mr-3 text-primary-500" />
                  <span className={getThemeColor('text.secondary', isDark)}>
                    Starts: {course.startDate}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="w-4 h-4 mr-3 text-primary-500" />
                  <span className={getThemeColor('text.secondary', isDark)}>
                    Class Size: {course.participants}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors text-sm">
                  Apply Now
                </button>
                <button className={`flex-1 px-4 py-2 border-2 border-primary-500 text-primary-500 rounded-lg font-semibold hover:bg-primary-500 hover:text-white transition-all text-sm`}>
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className={`inline-flex items-center px-8 py-3 border-2 border-primary-500 text-primary-500 rounded-lg font-semibold hover:bg-primary-500 hover:text-white transition-all`}>
            Load More Courses
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default FindCourses;