import React from 'react';
import { ArrowRight, Briefcase, Heart, Globe, BookOpen, Users, Lightbulb } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const YouthOfferings = () => {
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
    <section className={`relative py-16 ${isDark ? 'bg-gray-900/60' : 'bg-gray-50/80'} backdrop-blur-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            What We Offer to Youth
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Comprehensive programs and opportunities designed to unlock your potential
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offerings.map((offering) => {
            const IconComponent = offering.icon;
            return (
              <div
                key={offering.id}
                className={`group relative p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                  isDark ? 'bg-gray-800' : 'bg-white'
                } border ${isDark ? 'border-gray-700' : 'border-gray-200'} hover:shadow-xl`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-[#1aa79e] to-[#f38621] 
                      p-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                      <IconComponent className="w-full h-full text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold mb-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {offering.title}
                    </h3>
                    
                    <p className={`text-sm mb-3 ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {offering.description}
                    </p>

                    <ul className="space-y-1 mb-4">
                      {offering.features.map((feature, index) => (
                        <li key={index} className={`text-xs flex items-center ${
                          isDark ? 'text-gray-500' : 'text-gray-500'
                        }`}>
                          <span className="w-1 h-1 bg-gradient-to-r from-[#1aa79e] to-[#f38621] rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <a 
                      href={offering.link}
                      className={`inline-flex items-center text-sm font-medium transition-colors duration-200 ${
                        isDark 
                          ? 'text-[#1aa79e] hover:text-[#f38621]' 
                          : 'text-[#1aa79e] hover:text-[#f38621]'
                      }`}
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default YouthOfferings;