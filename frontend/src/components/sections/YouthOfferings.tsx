import { ArrowRight, Briefcase, Heart, Globe, BookOpen, Users, Lightbulb, Star, TrendingUp } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface YouthOfferingsProps {
  extraTopSpace?: number;
}

const YouthOfferings = ({ extraTopSpace = 0 }: YouthOfferingsProps) => {
  const { isDark } = useTheme();

  const offerings = [
    {
      id: 1,
      title: 'Career Development',
      description: 'Professional skills training and career guidance programs',
      icon: Briefcase,
      link: '#',
      features: ['Job Training', 'Career Counseling', 'Internships']
    },
    {
      id: 2,
      title: 'Volunteer Programs',
      description: 'Community service and social development initiatives',
      icon: Heart,
      link: '#',
      features: ['Community Service', 'Social Projects', 'Environmental Work']
    },
    {
      id: 3,
      title: 'International Exchange',
      description: 'Global youth exchange and cultural programs',
      icon: Globe,
      link: '#',
      features: ['Exchange Programs', 'Cultural Tours', 'Global Networks']
    },
    {
      id: 4,
      title: 'Educational Support',
      description: 'Scholarships and educational assistance programs',
      icon: BookOpen,
      link: '#',
      features: ['Scholarships', 'Tutoring', 'Study Materials']
    },
    {
      id: 5,
      title: 'Youth Clubs',
      description: 'Join or establish youth clubs in your area',
      icon: Users,
      link: '#',
      features: ['Club Formation', 'Activities', 'Networking']
    },
    {
      id: 6,
      title: 'Innovation Hub',
      description: 'Entrepreneurship and innovation support',
      icon: Lightbulb,
      link: '#',
      features: ['Startup Support', 'Mentorship', 'Funding Access']
    }
  ];

  return (
    <section className={`relative py-12 ${isDark ? 'bg-gray-900/60' : 'bg-gray-50/80'} backdrop-blur-sm overflow-hidden`}>
      {/* Decorative background patterns */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-gradient-to-r from-[#1aa79e]/20 to-[#f38621]/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-gradient-to-r from-[#f38621]/20 to-[#1aa79e]/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-[#1aa79e]/20 to-[#f38621]/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingTop: `${extraTopSpace}px` }}>
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#1aa79e]/10 to-[#f38621]/10 border border-[#1aa79e]/20 mb-6">
            <Star className={`w-4 h-4 ${isDark ? 'text-[#1aa79e]' : 'text-[#1aa79e]'}`} />
            <span className={`text-sm font-medium ${isDark ? 'text-[#1aa79e]' : 'text-[#1aa79e]'}`}>Youth Programs</span>
          </div>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            What We Offer to
            <span className="block bg-gradient-to-r from-[#1aa79e] to-[#f38621] bg-clip-text text-transparent">
              Youth
            </span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Comprehensive programs and opportunities designed to unlock your potential
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-3 lg:gap-6">
          {offerings.map((offering) => {
            const IconComponent = offering.icon;
            return (
              <div
                key={offering.id}
                className={`group relative p-5 sm:p-4 rounded-2xl transition-all duration-500 hover:scale-[1.04] ${
                  isDark ? 'bg-gray-800/80' : 'bg-white/90'
                } border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} backdrop-blur-sm hover:shadow-2xl hover:shadow-[#1aa79e]/5 hover:-translate-y-2 focus-within:ring-2 focus-within:ring-[#1aa79e]/30 focus-within:ring-offset-2 ${isDark ? 'focus-within:ring-offset-gray-900' : 'focus-within:ring-offset-white'}`}
                role="article"
                tabIndex={0}
              >
                <div className="flex flex-col">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="flex-shrink-0">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#1aa79e] to-[#f38621] 
                        p-2.5 sm:p-3 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg group-hover:shadow-xl`}>
                        <IconComponent className="w-full h-full text-white" />
                      </div>
                    </div>
                    <div className={`opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0`}>
                      <TrendingUp className={`w-5 h-5 ${isDark ? 'text-[#1aa79e]' : 'text-[#1aa79e]'}`} />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={`text-base sm:text-lg font-bold mb-2 group-hover:text-[#1aa79e] transition-colors duration-300 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {offering.title}
                    </h3>
                    
                    <p className={`text-sm mb-3 sm:mb-4 leading-relaxed ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {offering.description}
                    </p>

                    <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5">
                      {offering.features.map((feature, index) => (
                        <li key={index} className={`text-xs sm:text-sm flex items-center group/item transition-all duration-200 hover:translate-x-1 ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-[#1aa79e] to-[#f38621] rounded-full mr-2 sm:mr-3 group-hover/item:scale-125 transition-transform duration-200" />
                          <span className="group-hover/item:text-[#1aa79e] transition-colors duration-200">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <a 
                      href={offering.link}
                      className={`inline-flex items-center px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-gradient-to-r from-[#1aa79e] to-[#f38621] text-white font-semibold text-xs sm:text-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#1aa79e]/25 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#1aa79e]/50 focus:ring-offset-2 ${isDark ? 'focus:ring-offset-gray-800' : 'focus:ring-offset-white'} transform active:scale-95`}
                      aria-label={`Learn more about ${offering.title}`}
                    >
                      Learn More
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 transition-transform duration-300 group-hover:translate-x-2" />
                    </a>
                  </div>
                </div>
                
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1aa79e]/5 via-transparent to-[#f38621]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default YouthOfferings;