import { ExternalLink, Plus } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const OrganizationsSection = () => {
  const { isDark } = useTheme();

  const organizations = [
    {
      id: 1,
      title: 'Youth Club',
      description: 'Sri Lanka Youth Club Movement Implemented by Sri Lanka Federation of Youth Clubs.',
      image: '/images/organizations/club2.png',
      link: 'https://www.nysc.lk/page/view/youth-club'
    },
    {
      id: 2,
      title: 'Youth Services Limited',
      description: 'Encouraging and improving the economic power of youth by providing essential services',
      image: '/images/organizations/youth-service-logo.png',
      link: 'https://www.nysc.lk/page/view/youth-services-limited'
    },
    {
      id: 3,
      title: 'NYSCO',
      description: 'Young entrepreneurs can improve their ideas and services to increase the productivity and revenue',
      image: '/images/organizations/nysco.png',
      link: 'https://www.nysc.lk/page/view/nysco'
    }
  ];

  return (
    <section 
      className="relative py-20 overflow-hidden"
      style={{
        backgroundImage: 'url("/images/backgrounds/offer-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay */}
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-gray-900/90' 
          : 'bg-white/90'
      }`} />

      {/* Decorative particles/bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-10 w-4 h-4 rounded-full ${
          isDark ? 'bg-blue-400/30' : 'bg-blue-500/30'
        } animate-pulse`} />
        <div className={`absolute top-40 right-20 w-6 h-6 rounded-full ${
          isDark ? 'bg-purple-400/30' : 'bg-purple-500/30'
        } animate-pulse animation-delay-1000`} />
        <div className={`absolute bottom-32 left-1/4 w-5 h-5 rounded-full ${
          isDark ? 'bg-teal-400/30' : 'bg-teal-500/30'
        } animate-pulse animation-delay-2000`} />
        <div className={`absolute bottom-20 right-1/3 w-3 h-3 rounded-full ${
          isDark ? 'bg-orange-400/30' : 'bg-orange-500/30'
        } animate-pulse animation-delay-3000`} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 ${
            isDark 
              ? 'bg-gradient-to-r from-[#1aa79e]/20 to-[#f38621]/20 text-[#1aa79e] border border-[#1aa79e]/30'
              : 'bg-gradient-to-r from-[#1aa79e]/10 to-[#f38621]/10 text-[#1aa79e] border border-[#1aa79e]/20'
          }`}>
            Sri Lanka Youth
          </span>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Our Other
            <span className="block bg-gradient-to-r from-[#1aa79e] to-[#f38621] bg-clip-text text-transparent">
              Organizations
            </span>
          </h2>
        </div>

        {/* Organizations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {organizations.map((org) => (
            <a
              key={org.id}
              href={org.link}
              className="group relative block"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={`relative p-8 rounded-2xl transition-all duration-500 transform group-hover:scale-105 group-hover:-translate-y-2 ${
                isDark 
                  ? 'bg-gray-800/90 border border-gray-700/50 hover:bg-gray-800 hover:shadow-2xl hover:shadow-blue-500/20' 
                  : 'bg-white/90 border border-gray-200/50 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/20'
              } backdrop-blur-sm`}>
                
                {/* Image Container */}
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 flex items-center justify-center">
                    <img 
                      src={org.image} 
                      alt={org.title}
                      className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className={`text-xl font-bold mb-4 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {org.title}
                  </h3>
                  
                  <p className={`text-sm leading-relaxed mb-6 ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {org.description}
                  </p>

                  {/* Explore Button */}
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                    isDark
                      ? 'bg-gradient-to-r from-[#1aa79e] to-[#f38621] text-white hover:shadow-lg hover:shadow-[#1aa79e]/30'
                      : 'bg-gradient-to-r from-[#1aa79e] to-[#f38621] text-white hover:shadow-lg hover:shadow-[#1aa79e]/30'
                  } group-hover:scale-105`}>
                    Explore more
                    <Plus className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" />
                  </div>
                </div>

                {/* External Link Icon */}
                <div className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'
                } group-hover:scale-110 group-hover:text-white group-hover:bg-gradient-to-r group-hover:from-[#1aa79e] group-hover:to-[#f38621]`}>
                  <ExternalLink className="w-3 h-3" />
                </div>

                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#1aa79e]/5 to-[#f38621]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrganizationsSection;