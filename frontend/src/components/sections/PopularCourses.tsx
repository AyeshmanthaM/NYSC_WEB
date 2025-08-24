import { Clock, Users, ArrowRight, ChevronLeft, ChevronRight, Award, BookOpen, Briefcase, Palette, GraduationCap } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslationWithNamespace } from '../../hooks/useTranslationWithNamespace';
import { useState, useRef, useEffect } from 'react';
import { colors, getThemeColor } from '../../config/colors';

const PopularCourses = () => {
  const { isDark } = useTheme();
  const { t, ready } = useTranslationWithNamespace('courses');
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const coursesPerPage = 3;
  
  const nextSlide = () => {
    setCurrentSlide((prev) => {
      const totalSlides = Math.ceil(6 / coursesPerPage);
      return (prev + 1) % totalSlides;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      const totalSlides = Math.ceil(6 / coursesPerPage);
      return (prev - 1 + totalSlides) % totalSlides;
    });
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  // Show loading state while translations are not ready
  if (!ready) {
    return (
      <section className="relative py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        </div>
      </section>
    );
  }

  const courses = [
    {
      id: 1,
      title: t('hotelManagement.title'),
      description: t('hotelManagement.description'),
      category: t('categories.hospitality'),
      duration: `12 ${t('months')}`,
      timeType: t('fullTime'),
      enrolled: 186,
      image: '/images/courses/hotel-management.jpg',
      nvqLevel: 'NVQ 4',
      institute: t('hotelManagement.institute'),
      icon: Briefcase
    },
    {
      id: 2,
      title: t('computerApplications.title'),
      description: t('computerApplications.description'),
      category: t('categories.it'),
      duration: `6 ${t('months')}`,
      timeType: t('partTime'),
      enrolled: 342,
      image: '/images/courses/computer-applications.jpg',
      nvqLevel: 'NVQ 3',
      institute: t('computerApplications.institute'),
      icon: BookOpen
    },
    {
      id: 3,
      title: t('fashionDesign.title'),
      description: t('fashionDesign.description'),
      category: t('categories.fashion'),
      duration: `10 ${t('months')}`,
      timeType: t('fullTime'),
      enrolled: 127,
      image: '/images/courses/fashion-design.jpg',
      nvqLevel: 'NVQ 4',
      institute: t('fashionDesign.institute'),
      icon: Palette
    },
    {
      id: 4,
      title: t('electrical.title'),
      description: t('electrical.description'),
      category: t('categories.technical'),
      duration: `8 ${t('months')}`,
      timeType: t('fullTime'),
      enrolled: 203,
      image: '/images/courses/electrical.jpg',
      nvqLevel: 'NVQ 3',
      institute: t('electrical.institute'),
      icon: Award
    },
    {
      id: 5,
      title: t('automotive.title'),
      description: t('automotive.description'),
      category: t('categories.automotive'),
      duration: `9 ${t('months')}`,
      timeType: t('fullTime'),
      enrolled: 158,
      image: '/images/courses/automotive.jpg',
      nvqLevel: 'NVQ 3',
      institute: t('automotive.institute'),
      icon: Award
    },
    {
      id: 6,
      title: t('beautyCulture.title'),
      description: t('beautyCulture.description'),
      category: t('categories.beauty'),
      duration: `7 ${t('months')}`,
      timeType: t('partTime'),
      enrolled: 94,
      image: '/images/courses/beauty-culture.jpg',
      nvqLevel: 'NVQ 3',
      institute: t('beautyCulture.institute'),
      icon: Palette
    }
  ];

  const totalSlides = Math.ceil(courses.length / coursesPerPage);


  return (
    <section className={`relative py-16 overflow-hidden ${getThemeColor('card.secondary', isDark)} backdrop-blur-sm`}>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        
        {/* Animated Flowing Waves */}
        <div className="absolute inset-0 -m-4">
          <svg 
            className="w-full h-full opacity-10 scale-110" 
            viewBox="0 0 1200 800" 
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={colors.raw.nysc.primary} />
                <stop offset="100%" stopColor={colors.raw.nysc.secondary} />
              </linearGradient>
              <linearGradient id="waveGradient2" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={colors.raw.nysc.secondary} />
                <stop offset="100%" stopColor={colors.raw.nysc.primary} />
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
              <circle cx="150" cy="150" r="3" fill={colors.raw.nysc.primary}>
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0; 20,-30; 0,0"
                  dur="8s"
                  repeatCount="indefinite"
                />
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="6s" repeatCount="indefinite" />
              </circle>
              
              <circle cx="900" cy="200" r="4" fill={colors.raw.nysc.secondary}>
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0; -25,35; 0,0"
                  dur="10s"
                  repeatCount="indefinite"
                />
                <animate attributeName="opacity" values="0.4;0.9;0.4" dur="7s" repeatCount="indefinite" />
              </circle>
              
              <circle cx="300" cy="600" r="2" fill={colors.raw.nysc.primary}>
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0; 15,20; 0,0"
                  dur="12s"
                  repeatCount="indefinite"
                />
                <animate attributeName="opacity" values="0.2;0.7;0.2" dur="8s" repeatCount="indefinite" />
              </circle>
              
              <circle cx="1000" cy="500" r="5" fill={colors.raw.nysc.secondary}>
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
            isDark ? colors.brand.primary.bg : `${colors.brand.primary.bg}/40`
          }`} 
          style={{ 
            animation: 'float 6s ease-in-out infinite, pulse 4s ease-in-out infinite' 
          }} />
        </div>
        
        <div className="absolute bottom-32 right-20">
          <div className={`w-40 h-40 rounded-full blur-3xl opacity-20 animate-pulse ${
            isDark ? colors.brand.secondary.bg : `${colors.brand.secondary.bg}/40`
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
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke={colors.raw.nysc.primary} strokeWidth="0.2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Animated Learning Icons */}
        <div className="absolute top-40 right-40 opacity-10">
          <svg width="60" height="60" viewBox="0 0 60 60" className="animate-spin" style={{ animationDuration: '20s' }}>
            <circle cx="30" cy="30" r="25" fill="none" stroke={colors.raw.nysc.primary} strokeWidth="2" strokeDasharray="10,5"/>
            <circle cx="30" cy="30" r="15" fill="none" stroke={colors.raw.nysc.secondary} strokeWidth="1" strokeDasharray="5,3"/>
            <circle cx="30" cy="30" r="5" fill={colors.raw.nysc.primary} opacity="0.6">
              <animate attributeName="r" values="5;8;5" dur="3s" repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>
        
        <div className="absolute bottom-40 left-40 opacity-10">
          <svg width="80" height="80" viewBox="0 0 80 80" className="animate-pulse">
            <polygon points="40,10 55,30 40,50 25,30" fill="none" stroke={colors.raw.nysc.secondary} strokeWidth="2">
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="0 40 40; 360 40 40"
                dur="25s"
                repeatCount="indefinite"
              />
            </polygon>
            <polygon points="40,20 50,35 40,40 30,35" fill={colors.raw.nysc.primary} opacity="0.4">
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
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-20px) translateX(10px); }
          66% { transform: translateY(10px) translateX(-5px); }
        }
        `
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-nysc-primary/10 to-nysc-secondary/10 border border-nysc-primary/20 mb-4">
            <GraduationCap className="w-4 h-4 text-nysc-primary" />
            <span className="text-sm font-medium text-nysc-primary">{t('badge')}</span>
          </div>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${getThemeColor('text.primary', isDark)}`}>
            {t('title')}
          </h2>
          <p className={`text-lg mb-8 max-w-2xl mx-auto ${getThemeColor('text.secondary', isDark)}`}>
            {t('subtitle')}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${getThemeColor('button.secondary', isDark)} shadow-lg hover:shadow-xl hover:scale-110 backdrop-blur-sm`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${getThemeColor('button.secondary', isDark)} shadow-lg hover:shadow-xl hover:scale-110 backdrop-blur-sm`}
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
                          className={`group relative rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl ${getThemeColor('card.primary', isDark)} border ${getThemeColor('border.subtle', isDark)} backdrop-blur-sm`}
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
                              <div className={`flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${getThemeColor('category.category', isDark)} ${colors.brand.primary.text} backdrop-blur-sm border ${getThemeColor('border.brand.subtle', isDark)}`}>
                                <IconComponent className="w-3 h-3 mr-1" />
                                {course.category}
                              </div>
                            </div>

                            {/* NVQ Level Badge */}
                            <div className="absolute top-4 right-4">
                              <span className={`px-3 py-1.5 ${colors.badge.nvq} text-xs font-bold rounded-full shadow-lg`}>
                                {course.nvqLevel}
                              </span>
                            </div>

                            {/* Time Type Badge */}
                            <div className="absolute bottom-4 left-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                course.timeType === t('fullTime')
                                  ? colors.badge.fullTime
                                  : colors.badge.partTime
                              }`}>
                                {course.timeType}
                              </span>
                            </div>
                          </div>
                          
                          {/* Course Content - Fixed height container */}
                          <div className="p-6 flex flex-col h-80">
                            {/* Course Title - Fixed height */}
                            <div className="h-14 flex items-start mb-3">
                              <h3 className={`font-bold text-lg line-clamp-2 leading-tight ${getThemeColor('text.primary', isDark)} ${colors.hover.text.brand} transition-colors duration-300`}>
                                {course.title}
                              </h3>
                            </div>

                            {/* Course Description - Fixed height */}
                            <div className="h-12 flex items-start mb-4">
                              <p className={`text-sm line-clamp-2 ${getThemeColor('text.secondary', isDark)}`}>
                                {course.description}
                              </p>
                            </div>

                            {/* Institute Name - Fixed height */}
                            <div className="h-8 flex items-center mb-4">
                              <div className={`text-xs font-medium ${getThemeColor('text.muted', isDark)}`}>
                                {course.institute}
                              </div>
                            </div>
                            
                            {/* Course Stats - Fixed height */}
                            <div className="h-12 flex items-center justify-between mb-6">
                              <div className="flex items-center space-x-4 text-sm">
                                <div className={`flex items-center ${getThemeColor('text.secondary', isDark)}`}>
                                  <Clock className="w-4 h-4 mr-1" />
                                  <span>{course.duration}</span>
                                </div>
                                <div className={`flex items-center ${getThemeColor('text.secondary', isDark)}`}>
                                  <Users className="w-4 h-4 mr-1" />
                                  <span>{course.enrolled} {t('students')}</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Action Button - Pushed to bottom with flex-1 spacer */}
                            <div className="flex-1 flex items-end">
                              <button className={`group/btn w-full flex items-center justify-center px-6 py-3 ${colors.button.primary.base} font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
                                <span>{t('applyNow')}</span>
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
                    ? `${colors.brand.gradient.primary} scale-125`
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
          <button className={`group inline-flex items-center px-8 py-4 font-semibold rounded-full transition-all duration-300 hover:scale-105 ${getThemeColor('button.secondary', isDark)} shadow-lg hover:shadow-xl backdrop-blur-sm`}>
            <span>{t('viewAllCourses')}</span>
            <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;