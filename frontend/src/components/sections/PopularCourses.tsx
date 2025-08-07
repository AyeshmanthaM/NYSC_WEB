import { Clock, Users, ArrowRight, ChevronLeft, ChevronRight, Award, BookOpen, Briefcase, Palette } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useState, useRef, useEffect } from 'react';

const PopularCourses = () => {
  const { isDark } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const courses = [
    {
      id: 1,
      title: 'Hotel Management and Catering Technology',
      description: 'Comprehensive program covering hospitality management, food service operations, and tourism industry practices.',
      category: 'Hospitality',
      duration: '12 Months',
      timeType: 'Full Time',
      enrolled: 186,
      image: '/images/courses/hotel-management.jpg',
      nvqLevel: 'NVQ 4',
      institute: 'NYSC Vocational Training Institute',
      icon: Briefcase
    },
    {
      id: 2,
      title: 'Computer Applications and IT Support',
      description: 'Learn essential computer skills, software applications, hardware troubleshooting, and network basics.',
      category: 'Information Technology',
      duration: '6 Months',
      timeType: 'Part Time',
      enrolled: 342,
      image: '/images/courses/computer-applications.jpg',
      nvqLevel: 'NVQ 3',
      institute: 'NYSC Technical Training Center',
      icon: BookOpen
    },
    {
      id: 3,
      title: 'Fashion Design and Garment Technology',
      description: 'Creative program focusing on fashion illustration, pattern making, garment construction, and textile knowledge.',
      category: 'Design & Fashion',
      duration: '10 Months',
      timeType: 'Full Time',
      enrolled: 127,
      image: '/images/courses/fashion-design.jpg',
      nvqLevel: 'NVQ 4',
      institute: 'NYSC Creative Arts Center',
      icon: Palette
    },
    {
      id: 4,
      title: 'Electrical Installation and Maintenance',
      description: 'Hands-on training in electrical systems, wiring, safety protocols, and maintenance procedures.',
      category: 'Technical Skills',
      duration: '8 Months',
      timeType: 'Full Time',
      enrolled: 203,
      image: '/images/courses/electrical.jpg',
      nvqLevel: 'NVQ 3',
      institute: 'NYSC Technical Institute',
      icon: Award
    },
    {
      id: 5,
      title: 'Automotive Technology and Repair',
      description: 'Complete automotive training covering engine diagnostics, repair techniques, and modern vehicle systems.',
      category: 'Automotive',
      duration: '9 Months',
      timeType: 'Full Time',
      enrolled: 158,
      image: '/images/courses/automotive.jpg',
      nvqLevel: 'NVQ 3',
      institute: 'NYSC Technical Training Center',
      icon: Award
    },
    {
      id: 6,
      title: 'Beauty Culture and Cosmetology',
      description: 'Professional beauty training including skincare, makeup artistry, hair styling, and salon management.',
      category: 'Beauty & Wellness',
      duration: '7 Months',
      timeType: 'Part Time',
      enrolled: 94,
      image: '/images/courses/beauty-culture.jpg',
      nvqLevel: 'NVQ 3',
      institute: 'NYSC Beauty Academy',
      icon: Palette
    }
  ];

  const coursesPerPage = 3;
  const totalSlides = Math.ceil(courses.length / coursesPerPage);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);


  return (
    <section className={`relative py-16 overflow-hidden ${
      isDark ? 'bg-gray-800/70' : 'bg-white/80'
    } backdrop-blur-sm`}>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        
        {/* Animated Flowing Waves */}
        <div className="absolute inset-0">
          <svg 
            className="w-full h-full opacity-10" 
            viewBox="0 0 1200 800" 
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1aa79e" />
                <stop offset="100%" stopColor="#f38621" />
              </linearGradient>
              <linearGradient id="waveGradient2" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f38621" />
                <stop offset="100%" stopColor="#1aa79e" />
              </linearGradient>
            </defs>
            
            {/* Flowing Wave 1 */}
            <path 
              d="M0,300 C300,200 600,400 900,250 C1000,220 1100,280 1200,200 L1200,0 L0,0 Z" 
              fill="url(#waveGradient1)"
              className="animate-pulse"
            >
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,0; 50,10; 0,0"
                dur="15s"
                repeatCount="indefinite"
              />
            </path>
            
            {/* Flowing Wave 2 */}
            <path 
              d="M0,600 C200,550 400,650 600,580 C800,520 1000,620 1200,550 L1200,800 L0,800 Z" 
              fill="url(#waveGradient2)"
              className="animate-pulse"
              style={{ animationDelay: '2s' }}
            >
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,0; -30,-15; 0,0"
                dur="20s"
                repeatCount="indefinite"
              />
            </path>
            
            {/* Floating Particles */}
            <g className="opacity-30">
              <circle cx="150" cy="150" r="3" fill="#1aa79e">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0; 20,-30; 0,0"
                  dur="8s"
                  repeatCount="indefinite"
                />
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="6s" repeatCount="indefinite" />
              </circle>
              
              <circle cx="900" cy="200" r="4" fill="#f38621">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0; -25,35; 0,0"
                  dur="10s"
                  repeatCount="indefinite"
                />
                <animate attributeName="opacity" values="0.4;0.9;0.4" dur="7s" repeatCount="indefinite" />
              </circle>
              
              <circle cx="300" cy="600" r="2" fill="#1aa79e">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0; 15,20; 0,0"
                  dur="12s"
                  repeatCount="indefinite"
                />
                <animate attributeName="opacity" values="0.2;0.7;0.2" dur="8s" repeatCount="indefinite" />
              </circle>
              
              <circle cx="1000" cy="500" r="5" fill="#f38621">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0; -20,-25; 0,0"
                  dur="14s"
                  repeatCount="indefinite"
                />
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="5s" repeatCount="indefinite" />
              </circle>
            </g>
          </svg>
        </div>
        
        {/* Animated Geometric Shapes */}
        <div className="absolute top-20 left-20">
          <div className={`w-32 h-32 rounded-full blur-2xl opacity-20 animate-pulse ${
            isDark ? 'bg-[#1aa79e]' : 'bg-[#1aa79e]/40'
          }`} 
          style={{ 
            animation: 'float 6s ease-in-out infinite, pulse 4s ease-in-out infinite' 
          }} />
        </div>
        
        <div className="absolute bottom-32 right-20">
          <div className={`w-40 h-40 rounded-full blur-3xl opacity-20 animate-pulse ${
            isDark ? 'bg-[#f38621]' : 'bg-[#f38621]/40'
          }`}
          style={{ 
            animation: 'float 8s ease-in-out infinite reverse, pulse 6s ease-in-out infinite' 
          }} />
        </div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg 
            className="w-full h-full" 
            viewBox="0 0 200 200" 
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke={isDark ? '#1aa79e' : '#1aa79e'} strokeWidth="0.2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Animated Learning Icons */}
        <div className="absolute top-40 right-40 opacity-10">
          <svg width="60" height="60" viewBox="0 0 60 60" className="animate-spin" style={{ animationDuration: '20s' }}>
            <circle cx="30" cy="30" r="25" fill="none" stroke="#1aa79e" strokeWidth="2" strokeDasharray="10,5"/>
            <circle cx="30" cy="30" r="15" fill="none" stroke="#f38621" strokeWidth="1" strokeDasharray="5,3"/>
            <circle cx="30" cy="30" r="5" fill="#1aa79e" opacity="0.6">
              <animate attributeName="r" values="5;8;5" dur="3s" repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>
        
        <div className="absolute bottom-40 left-40 opacity-10">
          <svg width="80" height="80" viewBox="0 0 80 80" className="animate-pulse">
            <polygon points="40,10 55,30 40,50 25,30" fill="none" stroke="#f38621" strokeWidth="2">
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="0 40 40; 360 40 40"
                dur="25s"
                repeatCount="indefinite"
              />
            </polygon>
            <polygon points="40,20 50,35 40,40 30,35" fill="#1aa79e" opacity="0.4">
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="360 40 40; 0 40 40"
                dur="15s"
                repeatCount="indefinite"
              />
            </polygon>
          </svg>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-20px) translateX(10px); }
          66% { transform: translateY(10px) translateX(-5px); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 ${
            isDark 
              ? 'bg-gradient-to-r from-[#1aa79e]/20 to-[#f38621]/20 text-[#1aa79e] border border-[#1aa79e]/30'
              : 'bg-gradient-to-r from-[#1aa79e]/10 to-[#f38621]/10 text-[#1aa79e] border border-[#1aa79e]/20'
          }`}>
            Popular Courses
          </span>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Start Your Career Journey
          </h2>
          <p className={`text-lg mb-8 max-w-2xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Discover our most popular vocational training programs designed to equip you with industry-relevant skills
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
              isDark 
                ? 'bg-gray-800/90 text-white hover:bg-gray-700 border border-gray-600' 
                : 'bg-white/90 text-gray-600 hover:bg-white border border-gray-200'
            } shadow-lg hover:shadow-xl hover:scale-110 backdrop-blur-sm`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
              isDark 
                ? 'bg-gray-800/90 text-white hover:bg-gray-700 border border-gray-600' 
                : 'bg-white/90 text-gray-600 hover:bg-white border border-gray-200'
            } shadow-lg hover:shadow-xl hover:scale-110 backdrop-blur-sm`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Course Cards */}
          <div 
            ref={carouselRef}
            className="overflow-hidden rounded-2xl"
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
                    {courses.slice(slideIndex * coursesPerPage, (slideIndex + 1) * coursesPerPage).map((course) => {
                      const IconComponent = course.icon;
                      return (
                        <div
                          key={course.id}
                          className={`group relative rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                            isDark ? 'bg-gray-900/90' : 'bg-white/90'
                          } border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} backdrop-blur-sm`}
                        >
                          {/* Course Image */}
                          <div className="relative h-48 overflow-hidden">
                            <img 
                              src={course.image} 
                              alt={course.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/images/courses/default-course.jpg';
                              }}
                            />
                            
                            {/* Course Category Badge */}
                            <div className="absolute top-4 left-4">
                              <div className={`flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${
                                isDark ? 'bg-gray-900/80 text-[#1aa79e]' : 'bg-white/90 text-[#1aa79e]'
                              } backdrop-blur-sm border border-[#1aa79e]/20`}>
                                <IconComponent className="w-3 h-3 mr-1" />
                                {course.category}
                              </div>
                            </div>

                            {/* NVQ Level Badge */}
                            <div className="absolute top-4 right-4">
                              <span className="px-3 py-1.5 bg-gradient-to-r from-[#1aa79e] to-[#f38621] text-white text-xs font-bold rounded-full shadow-lg">
                                {course.nvqLevel}
                              </span>
                            </div>

                            {/* Time Type Badge */}
                            <div className="absolute bottom-4 left-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                course.timeType === 'Full Time' 
                                  ? 'bg-green-100 text-green-700 border border-green-200'
                                  : 'bg-blue-100 text-blue-700 border border-blue-200'
                              }`}>
                                {course.timeType}
                              </span>
                            </div>
                          </div>
                          
                          {/* Course Content - Fixed height container */}
                          <div className="p-6 flex flex-col h-80">
                            {/* Course Title - Fixed height */}
                            <div className="h-14 flex items-start mb-3">
                              <h3 className={`font-bold text-lg line-clamp-2 leading-tight ${
                                isDark ? 'text-white' : 'text-gray-900'
                              } group-hover:text-[#1aa79e] transition-colors duration-300`}>
                                {course.title}
                              </h3>
                            </div>

                            {/* Course Description - Fixed height */}
                            <div className="h-12 flex items-start mb-4">
                              <p className={`text-sm line-clamp-2 ${
                                isDark ? 'text-gray-300' : 'text-gray-600'
                              }`}>
                                {course.description}
                              </p>
                            </div>

                            {/* Institute Name - Fixed height */}
                            <div className="h-8 flex items-center mb-4">
                              <div className={`text-xs font-medium ${
                                isDark ? 'text-gray-400' : 'text-gray-500'
                              }`}>
                                {course.institute}
                              </div>
                            </div>
                            
                            {/* Course Stats - Fixed height */}
                            <div className="h-12 flex items-center justify-between mb-6">
                              <div className="flex items-center space-x-4 text-sm">
                                <div className={`flex items-center ${
                                  isDark ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                  <Clock className="w-4 h-4 mr-1" />
                                  <span>{course.duration}</span>
                                </div>
                                <div className={`flex items-center ${
                                  isDark ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                  <Users className="w-4 h-4 mr-1" />
                                  <span>{course.enrolled} students</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Action Button - Pushed to bottom with flex-1 spacer */}
                            <div className="flex-1 flex items-end">
                              <button className="group/btn w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#1aa79e] to-[#f38621] text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                <span>Apply Now</span>
                                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover/btn:translate-x-1" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 mt-4">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-gradient-to-r from-[#1aa79e] to-[#f38621] scale-125'
                    : isDark 
                      ? 'bg-gray-600 hover:bg-gray-500'
                      : 'bg-gray-300 hover:bg-gray-400'
                } hover:scale-110`}
              />
            ))}
          </div>
        </div>

        {/* View All Courses Button */}
        <div className="text-center mt-10">
          <button className={`group inline-flex items-center px-8 py-4 font-semibold rounded-full transition-all duration-300 hover:scale-105 ${
            isDark 
              ? 'bg-gray-800/80 text-white hover:bg-gray-700 border border-gray-600' 
              : 'bg-white/80 text-gray-700 hover:bg-gray-50 border border-gray-200'
          } shadow-lg hover:shadow-xl backdrop-blur-sm`}>
            <span>View All Courses</span>
            <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;