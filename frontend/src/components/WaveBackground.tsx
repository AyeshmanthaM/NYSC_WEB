import React from 'react';

interface WaveBackgroundProps {
  variant?: 'header' | 'footer' | 'section';
  className?: string;
  isDark?: boolean;
}

const WaveBackground: React.FC<WaveBackgroundProps> = ({ 
  variant = 'header', 
  className = '',
  isDark = false 
}) => {
  const getWaveDesign = () => {
    switch (variant) {
      case 'header':
        return (
          <svg
            className="absolute inset-0 w-full h-full"
            width="100%"
            height="100%"
            viewBox="0 0 1125 98"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 1.41421 }}
          >
            <defs>
              <linearGradient id="headerGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={isDark ? '#4ade80' : '#5ec0b3'} />
                <stop offset="50%" stopColor={isDark ? '#3b82f6' : '#28aab4'} />
                <stop offset="100%" stopColor={isDark ? '#8b5cf6' : '#0092b0'} />
              </linearGradient>
              <linearGradient id="headerGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={isDark ? '#10b981' : '#6fc696'} />
                <stop offset="100%" stopColor={isDark ? '#059669' : '#5ec0b3'} />
              </linearGradient>
              <linearGradient id="headerGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={isDark ? '#0ea5e9' : '#28aab4'} />
                <stop offset="100%" stopColor={isDark ? '#0284c7' : '#0092b0'} />
              </linearGradient>
            </defs>
            <g>
              <path 
                d="M833.85,61.67c-18.9,1.2 -36.45,5.85 -53.25,5.25c-55.95,-2.025 -104.175,-14.55 -154.5,-24l-9,-0.75c-31.125,-5.85 -47.175,-13.2 -74.25,-18.75c-74.625,-15.3 -141.375,-24.825 -220.5,-23.25c-40.2,0.825 -85.8,0.375 -137.25,9.75c-15.225,2.775 -37.425,12.375 -54.75,17.25c-32.925,9.3 -72.45,30 -115.5,52.5c-6.9,3.6 -7.575,9.75 -14.85,13.8l0,3.6c38.1,-5.85 76.65,-10.95 114.675,-15.075c6.525,-0.675 13.05,-1.425 19.575,-2.025c64.2,-6.45 126.075,-9.975 180,-9.825c75.9,0.225 183.675,10.875 300,18.6c68.025,4.575 139.05,8.175 208.275,8.175c112.125,0.075 219.6,-9.3 302.475,-39.225l-0.15,-57.525c-38.1,10.65 -86.55,20.775 -141.75,35.25c-40.725,10.65 -94.875,22.725 -149.25,26.25Z" 
                fill="url(#headerGradient1)"
                className="animate-wave opacity-90"
              />
              <path 
                d="M867.75,0.395l-129.675,0c-23.925,10.35 -40.425,0.225 -60.225,9.525c-4.275,2.025 -13.95,7.8 -18,9.75c-13.35,6.3 -25.575,28.575 -36.6,33.6c0,0.075 0,0.075 -0.075,0.15l0.075,0c50.325,9.45 96.9,20.175 152.85,22.2c16.8,0.6 34.5,0.45 53.4,-0.75c54.375,-3.525 114.525,-19.35 155.25,-30c55.2,-14.475 102.15,-29.7 140.25,-40.35l0,-4.125l-257.25,0Z" 
                fill="url(#headerGradient2)"
                className="animate-wave-slow opacity-80"
              />
              <path 
                d="M134.25,36.095c17.325,-4.875 33.525,-8.475 48.75,-11.25c51.45,-9.375 95.55,-13.8 135.75,-14.55c79.125,-1.725 143.175,10.575 217.8,25.875c27.075,5.55 55.575,11.475 86.7,17.325c0,-0.075 0,-0.075 0.075,-0.15c10.95,-5.025 23.175,-10.8 36.525,-17.175c4.05,-1.95 31.05,-14.475 35.325,-16.5c-25.2,-10.425 -73.425,-9.9 -98.85,-19.275l-277.5,0l-184.5,0l-70.725,-0.225c-14.775,25.725 -28.95,45 -57.75,71.25c-2.55,2.325 -3.225,15.225 -5.85,17.475l0,4.575c7.2,-4.05 14.325,-7.875 21.225,-11.475c43.05,-22.5 80.1,-36.6 113.025,-45.9Z" 
                fill="url(#headerGradient3)"
                className="animate-wave-slower opacity-85"
              />
              <path 
                d="M738.075,0.395l-141.825,0c25.5,9.3 50.85,19.35 76.05,29.85c19.8,-9.3 41.85,-19.5 65.775,-29.85Z" 
                fill="url(#headerGradient3)"
                className="animate-wave opacity-70"
              />
              <path 
                d="M77.85,0.395l-77.85,0l0,88.425c2.625,-2.25 5.175,-4.575 7.725,-6.9c28.8,-26.175 55.35,-55.725 70.125,-81.525Z" 
                fill="url(#headerGradient3)"
                className="animate-wave-slow opacity-75"
              />
            </g>
          </svg>
        );
      
      case 'footer':
        return (
          <svg
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 1440 320"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={isDark ? '#1e40af' : '#3b82f6'} />
                <stop offset="25%" stopColor={isDark ? '#7c3aed' : '#8b5cf6'} />
                <stop offset="50%" stopColor={isDark ? '#db2777' : '#ec4899'} />
                <stop offset="75%" stopColor={isDark ? '#dc2626' : '#f97316'} />
                <stop offset="100%" stopColor={isDark ? '#059669' : '#10b981'} />
              </linearGradient>
            </defs>
            
            <path
              d="M0,96 C240,160,480,64,720,96 C960,128,1200,96,1440,64 L1440,320 L0,320 Z"
              fill="url(#footerGradient)"
              opacity="0.3"
              className="animate-wave"
            />
            <path
              d="M0,128 C320,224,640,96,960,128 C1280,160,1360,128,1440,96 L1440,320 L0,320 Z"
              fill="url(#footerGradient)"
              opacity="0.5"
              className="animate-wave-slow"
            />
            <path
              d="M0,192 C320,128,640,256,960,192 C1280,128,1360,192,1440,160 L1440,320 L0,320 Z"
              fill="url(#footerGradient)"
              opacity="0.7"
              className="animate-wave-slower"
            />
          </svg>
        );
      
      case 'section':
        return (
          <svg
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 1440 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="sectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={isDark ? '#0891b2' : '#06b6d4'} stopOpacity="0.2" />
                <stop offset="50%" stopColor={isDark ? '#8b5cf6' : '#a78bfa'} stopOpacity="0.1" />
                <stop offset="100%" stopColor={isDark ? '#ec4899' : '#f9a8d4'} stopOpacity="0.2" />
              </linearGradient>
            </defs>
            
            <path
              d="M0,100 Q360,50 720,100 T1440,100 L1440,200 L0,200 Z"
              fill="url(#sectionGradient)"
              className="animate-wave-slower"
            />
            <path
              d="M0,150 Q360,100 720,150 T1440,150 L1440,200 L0,200 Z"
              fill={isDark ? 'rgba(30, 41, 59, 0.1)' : 'rgba(241, 245, 249, 0.2)'}
              className="animate-wave"
            />
          </svg>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {getWaveDesign()}
      
      {/* Floating geometric shapes */}
      <div className="absolute inset-0">
        <div className={`absolute top-10 left-10 w-20 h-20 ${isDark ? 'bg-blue-500' : 'bg-blue-400'} rounded-full opacity-10 animate-float`} />
        <div className={`absolute top-20 right-20 w-16 h-16 ${isDark ? 'bg-purple-500' : 'bg-purple-400'} rotate-45 opacity-10 animate-float-delayed`} />
        <div className={`absolute bottom-20 left-1/4 w-24 h-24 ${isDark ? 'bg-pink-500' : 'bg-pink-400'} rounded-full opacity-10 animate-float-slow`} />
        <div className={`absolute top-1/3 right-1/3 w-14 h-14 ${isDark ? 'bg-green-500' : 'bg-green-400'} rotate-12 opacity-10 animate-float`} />
        <div className={`absolute bottom-10 right-1/4 w-18 h-18 ${isDark ? 'bg-orange-500' : 'bg-orange-400'} rounded-full opacity-10 animate-float-delayed`} />
      </div>
    </div>
  );
};

export default WaveBackground;