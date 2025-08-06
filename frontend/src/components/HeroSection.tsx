import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import HeroParticleMesh from './HeroParticleMesh';

const HeroSection = () => {
  const { isDark } = useTheme();

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-24">
      {/* Semi-transparent overlay for better text readability */}
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900/80' 
          : 'bg-gradient-to-b from-transparent via-white/30 to-white/60'
      }`} />

      {/* Particle Mesh Overlay */}
      <HeroParticleMesh className="z-10" />

      <div className="relative z-10 max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Sub Title */}
            <div className="inline-flex items-center space-x-2">
              <div className="w-12 h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500" />
              <span className={`text-sm font-semibold tracking-wider uppercase ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                AN EMPOWERED SRI LANKA YOUTH
              </span>
            </div>

            {/* Main Title */}
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              NATIONAL YOUTH SERVICES COUNCIL OF 
              <span className="bg-gradient-to-r from-[#1aa79e] to-[#f38621] bg-clip-text text-transparent"> SRI LANKA</span>
            </h1>

            {/* Description */}
            <p className={`text-lg md:text-xl leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Youth of Sri Lanka are also having an undertaking for economic and social upliftment of the country.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className={`text-3xl font-bold bg-gradient-to-r from-[#1aa79e] to-[#f38621] bg-clip-text text-transparent`}>
                  50K+
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Active Members
                </div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold bg-gradient-to-r from-[#1aa79e] to-[#f38621] bg-clip-text text-transparent`}>
                  200+
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Youth Clubs
                </div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold bg-gradient-to-r from-[#1aa79e] to-[#f38621] bg-clip-text text-transparent`}>
                  25
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Districts
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-200 bg-gradient-to-r from-[#1aa79e] to-[#f38621] rounded-full hover:scale-105 hover:shadow-2xl">
                <span className="relative flex items-center">
                  Join With Us
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
              
              <a 
                href="../youthstatements.pdf" 
                className={`inline-flex items-center justify-center px-8 py-4 font-semibold rounded-full border-2 transition-all duration-200 hover:scale-105 ${
                  isDark 
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-800' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Youth Statement to COP28
              </a>
            </div>
          </div>

          {/* Right Side - SVG Artwork - Hidden on small screens */}
          <div className="relative lg:col-span-1 hidden lg:block">
            <div className="relative overflow-visible">
              {/* Large SVG that breaks out of container */}
              <div className="absolute -inset-32 lg:-inset-48 xl:-inset-64 flex items-center justify-center">
                {/* Decorative Background Circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-br from-[#1aa79e]/10 to-[#f38621]/10 rounded-full blur-3xl" />
                </div>
                
                {/* Youth SVG Illustration - Oversized */}
                <img 
                  src="/src/assets/svg/youth.svg" 
                  alt="Youth Illustration" 
                  className="w-full h-auto relative z-10 max-w-none scale-110 transition-transform duration-500 opacity-90"
                  style={{ width: '120vw', maxWidth: '800px' }}
                />
              </div>
              
              {/* Placeholder to maintain grid spacing */}
              <div className="h-96 w-full"></div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;