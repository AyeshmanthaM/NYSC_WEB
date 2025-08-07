import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Quote, Star, PenTool, Plus } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [screenSize, setScreenSize] = useState('lg');
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();

  const testimonials = [
    {
      name: 'Mrs. Madhavi Malwattage',
      title: 'Actress',
      image: '/images/testimonials/madhavi-malwattage.jpg',
      quote: "The NYSC is a very unique place where the youth is guided to achieve their goals. I was moulded by NYSC to the position where I am today. I invite the youth to join with NYSC to move forward to have a better future.",
      rating: 5,
      featured: true
    },
    {
      name: 'Mr. Sarath Kothalawala',
      title: 'Actor / Director',
      image: '/images/testimonials/sarath-kothalawala.jpg',
      quote: "The NYSC is the best place to choose the right orientation for yourself. As a government institution it has been providing a good heaven for future generations. This is the best place to carve the talents of the youth and it gave me the first step to walk to the world of Art.",
      rating: 5,
      featured: false
    },
    {
      name: 'Mr. Shriyantha Mendis',
      title: 'Actor',
      image: '/images/testimonials/shriyantha-mendis.jpg',
      quote: "The NYSC is the best identity card needed to travel with a straight spine in the World of Art. It safely keeps in my heart forever.",
      rating: 5,
      featured: false
    },
    {
      name: 'Mr. Mihira Sirithilaka',
      title: 'Actor',
      image: '/images/testimonials/mihira-sirithilaka.jpg',
      quote: "NYSC was the place where made to believe in myself that I can go the journey in the field of Performing Art. I wish that the NYSC will serve the youth in the same manner in the future too. Wish you good luck NYSC.",
      rating: 5,
      featured: false
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonials.length, isHovered]);

  // Screen size detection for responsive design
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize('sm');
      } else if (width < 1024) {
        setScreenSize('md');
      } else {
        setScreenSize('lg');
      }
    };

    handleResize(); // Set initial screen size
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mouse tracking for 3D effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);


  return (
    <section
      ref={sectionRef}
      className={`py-18 relative overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-gray-50'
        }`}
      style={{ perspective: '1350px' }}
    >
      {/* Dynamic Background with Lighting Effects */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 opacity-20" style={{
          background: `radial-gradient(circle at ${50 + mousePosition.x * 20}% ${50 + mousePosition.y * 20}%, #1aa79e 0%, transparent 40%), 
                       radial-gradient(circle at ${50 - mousePosition.x * 20}% ${50 - mousePosition.y * 20}%, #f38621 0%, transparent 40%)`,
        }} />

        {/* Mysterious fog effect */}
        <div className="absolute inset-0 opacity-30" style={{
          background: `radial-gradient(ellipse at ${50 + mousePosition.x * 30}% bottom, rgba(26, 167, 158, 0.3), transparent 50%)`,
        }} />

        {/* Animated light beams */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="light-beam light-beam-1" />
          <div className="light-beam light-beam-2" />
          <div className="light-beam light-beam-3" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative mt-12 z-10">
        {/* Section Header with 3D Transform */}
        <div
          className="text-center mb-7 sm:mb-11 lg:mb-14"
          style={{
            transform: `translateZ(45px) rotateX(${mousePosition.y * 4.5}deg) rotateY(${mousePosition.x * 4.5}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          <span className={`inline-block px-2.5 sm:px-3.5 py-1.5 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-2.5 sm:mb-3.5 ${isDark
              ? 'bg-gradient-to-r from-[#1aa79e]/20 to-[#f38621]/20 text-[#1aa79e] border border-[#1aa79e]/30'
              : 'bg-gradient-to-r from-[#1aa79e]/10 to-[#f38621]/10 text-[#1aa79e] border border-[#1aa79e]/20'
            } backdrop-blur-md shadow-lg`}>
            <Quote className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 inline mr-1.5 sm:mr-2" />
            Read Testimonials
          </span>
          <h2 className={`text-xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-2 sm:mb-3.5 px-3.5 sm:px-0 ${isDark ? 'text-white' : 'text-gray-900'
            }`}>
            What Peoples Say About Us
          </h2>
        </div>

        {/* 3D Carousel Container */}
        <div
          className="relative h-[360px] sm:h-[450px] lg:h-[540px] mb-2 sm:mb-5 lg:mb-7"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${mousePosition.y * 1.8}deg) rotateY(${mousePosition.x * 1.8}deg)`,
          }}
        >
          {/* 3D Testimonial Cards */}
          {testimonials.map((testimonial, index) => {
            const offset = index - currentTestimonial;
            const absOffset = Math.abs(offset);
            const isActive = index === currentTestimonial;

            // Calculate 3D positioning with responsive adjustments
            const translateZ = isActive ? 100 : -absOffset * 150;
            const getTranslateX = () => {
              switch (screenSize) {
                case 'sm': return offset * 200;
                case 'md': return offset * 275;
                default: return offset * 350;
              }
            };
            const translateX = getTranslateX();
            const rotateY = offset * -25;
            const opacity = absOffset > 1 ? 0 : 1 - absOffset * 0.3;
            const blur = absOffset * 2;
            const scale = isActive ? 1 : 0.85 - absOffset * 0.1;

            return (
              <div
                key={testimonial.name}
                className={`absolute top-1/2 left-1/2 w-full max-w-xs sm:max-w-lg lg:max-w-2xl transition-all duration-700 px-2 sm:px-4 ${isActive ? 'z-20 cursor-default' : absOffset === 1 ? 'z-10 cursor-pointer' : 'z-0 cursor-pointer'
                  }`}
                style={{
                  transform: `
                    translate(-50%, -50%)
                    translateX(${translateX}px)
                    translateZ(${translateZ}px)
                    rotateY(${rotateY}deg)
                    scale(${scale})
                  `,
                  opacity,
                  filter: `blur(${blur}px)`,
                  transformStyle: 'preserve-3d',
                }}
                onClick={() => {
                  if (!isActive) {
                    setCurrentTestimonial(index);
                  } else {
                    // Open testimonial in modal or navigate to detail page
                    console.log('View full testimonial:', testimonial.name);
                  }
                }}
              >
                <div className={`relative p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl ${isDark
                    ? 'bg-gray-800/80 border border-gray-700/50'
                    : 'bg-white/90 border border-gray-200/50'
                  } backdrop-blur-md shadow-2xl hover:shadow-3xl transition-shadow duration-300`}>

                  {/* Glowing effect for active card */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-50">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#1aa79e] to-[#f38621] blur-xl animate-pulse" />
                    </div>
                  )}

                  {/* Quote Icon with 3D effect - responsive sizing */}
                  <div
                    className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 lg:-top-6 lg:-left-6 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-[#1aa79e] to-[#f38621] rounded-full flex items-center justify-center shadow-lg"
                    style={{ transform: 'translateZ(20px)' }}
                  >
                    <Quote className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                  </div>

                  <div className="relative flex flex-col items-center gap-4 sm:gap-6">
                    {/* Image with 3D depth - responsive sizing */}
                    <div
                      className="flex-shrink-0"
                      style={{ transform: 'translateZ(10px)' }}
                    >
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-lg sm:rounded-xl object-cover shadow-xl"
                        onError={(e) => {
                          e.currentTarget.src = '/images/default-avatar.png';
                        }}
                      />
                    </div>

                    <div className="flex-1 text-center">
                      {/* Rating Stars - responsive sizing */}
                      <div className="flex justify-center space-x-1 mb-2 sm:mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400"
                            style={{
                              transform: `translateZ(${5 + i * 2}px)`,
                              animationDelay: `${i * 100}ms`
                            }}
                          />
                        ))}
                      </div>

                      {/* Quote Text - responsive sizing and line clamping */}
                      <blockquote className={`text-sm sm:text-base lg:text-lg leading-relaxed mb-3 sm:mb-4 font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'
                        } ${isActive ? '' : 'line-clamp-2 sm:line-clamp-3'}`}>
                        "{testimonial.quote}"
                      </blockquote>

                      {/* Author Info - responsive sizing */}
                      <div className="space-y-0.5">
                        <h4 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                          {testimonial.name}
                        </h4>
                        <p className="text-[#1aa79e] font-semibold text-xs sm:text-sm">
                          {testimonial.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Dots with 3D effect - responsive sizing */}
        <div className="flex justify-center space-x-2 sm:space-x-3 mb-6 sm:mb-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`transition-all duration-500 ${index === currentTestimonial
                  ? 'w-8 h-2 sm:w-10 sm:h-2.5'
                  : 'w-2 h-2 sm:w-2.5 sm:h-2.5'
                } rounded-full relative`}
              style={{
                background: index === currentTestimonial
                  ? 'linear-gradient(90deg, #1aa79e, #f38621)'
                  : isDark ? '#4b5563' : '#d1d5db',
                boxShadow: index === currentTestimonial
                  ? '0 4px 20px rgba(26, 167, 158, 0.5)'
                  : 'none',
                transform: `translateZ(${index === currentTestimonial ? '10px' : '0'})`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Creative Writer Button - Fixed Position with responsive sizing */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 z-50 group">
        <button
          className="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-r from-[#1aa79e] to-[#f38621] shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 group-hover:rotate-90"
          style={{
            transform: 'translateZ(50px)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Pulsing ring effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#1aa79e] to-[#f38621] animate-ping opacity-75" />

          {/* Inner button */}
          <div className="relative w-full h-full rounded-full bg-gradient-to-r from-[#1aa79e] to-[#f38621] flex items-center justify-center">
            <Plus className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white transition-transform duration-500 group-hover:rotate-180" />
          </div>

          {/* Hover tooltip - hidden on mobile */}
          <div className="absolute bottom-full right-0 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none hidden sm:block">
            <div className={`px-3 py-2 lg:px-4 lg:py-2 rounded-lg whitespace-nowrap ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
              } shadow-xl`}>
              <div className="flex items-center gap-2">
                <PenTool className="w-3 h-3 lg:w-4 lg:h-4" />
                <span className="font-medium text-sm lg:text-base">Write Your Story</span>
              </div>
              <div className="text-xs opacity-75 mt-1">Click to start writing</div>
            </div>
            {/* Tooltip arrow */}
            <div className={`absolute top-full right-6 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 ${isDark ? 'border-t-gray-800' : 'border-t-white'
              }`} />
          </div>
        </button>

        {/* Floating text particles effect - adjusted for mobile */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="floating-particle floating-particle-1 text-sm sm:text-base lg:text-xl">✍️</div>
          <div className="floating-particle floating-particle-2 text-sm sm:text-base lg:text-xl">📝</div>
          <div className="floating-particle floating-particle-3 text-sm sm:text-base lg:text-xl">✨</div>
        </div>
      </div>

      {/* Enhanced CSS Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
        /* Light beam animations */
        .light-beam {
          position: absolute;
          width: 2px;
          height: 100%;
          background: linear-gradient(to bottom, transparent, rgba(26, 167, 158, 0.5), transparent);
          animation: moveBeam 8s linear infinite;
        }
        
        .light-beam-1 {
          left: 20%;
          animation-delay: 0s;
        }
        
        .light-beam-2 {
          left: 50%;
          animation-delay: 2.5s;
          background: linear-gradient(to bottom, transparent, rgba(243, 135, 33, 0.5), transparent);
        }
        
        .light-beam-3 {
          left: 80%;
          animation-delay: 5s;
        }
        
        @keyframes moveBeam {
          0% {
            transform: translateY(-100%) scaleY(0);
            opacity: 0;
          }
          10% {
            transform: translateY(-50%) scaleY(0.5);
            opacity: 1;
          }
          90% {
            transform: translateY(50%) scaleY(0.5);
            opacity: 1;
          }
          100% {
            transform: translateY(100%) scaleY(0);
            opacity: 0;
          }
        }
        
        /* Floating particles animation */
        .floating-particle {
          position: absolute;
          font-size: 20px;
          opacity: 0;
          animation: float 3s ease-in-out infinite;
        }
        
        .floating-particle-1 {
          top: -10px;
          left: -10px;
          animation-delay: 0s;
        }
        
        .floating-particle-2 {
          top: -10px;
          right: -10px;
          animation-delay: 1s;
        }
        
        .floating-particle-3 {
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          animation-delay: 2s;
        }
        
        @keyframes float {
          0% {
            transform: translateY(0) scale(0);
            opacity: 0;
          }
          50% {
            transform: translateY(-30px) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-60px) scale(0);
            opacity: 0;
          }
        }
        
        /* Enhanced shadow classes */
        .shadow-3xl {
          box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
        }
        
        /* Star animation */
        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        
        /* Line clamp utilities */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Mobile-specific responsive adjustments */
        @media (max-width: 640px) {
          .perspective-mobile {
            perspective: 800px;
          }
          
          /* Reduce 3D effects on mobile for better performance */
          .mobile-reduced-3d {
            transform: none !important;
          }
          
          /* Ensure text remains readable on small screens */
          .mobile-text-adjust {
            line-height: 1.4;
          }
        }
        `
      }} />
    </section>
  );
};

export default TestimonialsSection;