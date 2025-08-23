import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor, colors } from '../../config/colors';
import { Link } from 'react-router-dom';
import { Users, Crown, UserCheck, UserCog, MapPin, Building2, Award, TrendingUp } from 'lucide-react';

const DirectorsPage = () => {
  const { isDark } = useTheme();

  // Hierarchical structure for creative layout
  const nationalLeadership = [
    {
      icon: Crown,
      title: "Board of Members",
      description: "The governing board providing strategic oversight and policy direction for NYSC.",
      link: "/directors/board-of-members",
      count: "7",
      label: "Members",
      color: "primary",
      size: "large"
    }
  ];

  const executiveLeadership = [
    {
      icon: Users,
      title: "Directors",
      description: "Senior leadership team responsible for operational management and strategic implementation.",
      link: "/directors/directors",
      count: "5",
      label: "Directors",
      color: "primary"
    },
    {
      icon: UserCheck,
      title: "Deputy Directors",
      description: "Deputy leadership supporting directors in program management and operational oversight.",
      link: "/directors/deputy-directors",
      count: "12",
      label: "Deputies",
      color: "secondary"
    },
    {
      icon: UserCog,
      title: "Assistant Directors",
      description: "Assistant leadership managing specific departments and specialized functions.",
      link: "/directors/assistant-directors",
      count: "25",
      label: "Assistants",
      color: "tertiary"
    }
  ];

  const regionalLeadership = [
    {
      icon: MapPin,
      title: "Provincial Directors",
      description: "Regional leadership overseeing NYSC operations across all provinces of Sri Lanka.",
      link: "/directors/provincial-directors",
      count: "9",
      label: "Provinces",
      color: "primary"
    },
    {
      icon: MapPin,
      title: "Provincial Assistant Directors",
      description: "Provincial support leadership managing district-level operations and programs.",
      link: "/directors/provincial-assistant-directors",
      count: "25",
      label: "Districts",
      color: "secondary"
    }
  ];

  const organizationStats = [
    { label: "Total Leadership", value: "83", description: "Across all levels" },
    { label: "Provinces Covered", value: "9", description: "Complete coverage" },
    { label: "Districts Managed", value: "25", description: "Nationwide reach" },
    { label: "Years of Experience", value: "60+", description: "Combined leadership" }
  ];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Directors" }
  ];

  return (
    <PageLayout 
      title="Directors" 
      subtitle="Meet the dedicated leadership team guiding the National Youth Services Council towards excellence in youth development."
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Leadership Overview */}
        <div className={`mb-16 ${getThemeColor('card.glassy', isDark)} rounded-2xl p-8 md:p-12 border ${getThemeColor('border.subtle', isDark)}`}>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className={`text-3xl font-bold mb-6 ${colors.brand.gradient.text}`}>
                Leadership Excellence
              </h2>
              <p className={`text-lg ${getThemeColor('text.secondary', isDark)} mb-6 leading-relaxed`}>
                Our multi-tiered leadership structure ensures effective governance and management 
                across all levels of the organization, from national policy to local implementation.
              </p>
              <p className={`text-lg ${getThemeColor('text.secondary', isDark)} leading-relaxed`}>
                With decades of combined experience in youth development, public administration, 
                and community service, our leaders drive innovation and excellence in all programs.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {organizationStats.map((stat, index) => (
                <div key={index} className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 text-center border ${getThemeColor('border.brand.subtle', isDark)} ${colors.effects.glow.subtle}`}>
                  <div className={`text-3xl font-bold mb-2 ${colors.brand.gradient.text}`}>{stat.value}</div>
                  <h3 className={`font-semibold mb-1 ${getThemeColor('text.primary', isDark)}`}>{stat.label}</h3>
                  <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Creative Organizational Hierarchy*/}
        <div className={`${getThemeColor('background.gradient.brand', isDark)} rounded-2xl p-8 mb-16 md:p-12 border ${getThemeColor('border.brand.subtle', isDark)} overflow-hidden relative`}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-[#1aa79e] to-[#f38621] blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-[#f38621] to-[#1aa79e] blur-3xl"></div>
          </div>
          
          <h2 className={`text-3xl font-bold text-center mb-12 ${colors.brand.gradient.text} relative z-10`}>
            Organizational Hierarchy
          </h2>
          
          <div className="relative max-w-6xl mx-auto">
            {/* Top Level - Board of Members */}
            <div className="flex justify-center mb-8 relative">
              <div className={`group relative`}>
                <Link to="/directors/board-of-members">
                  <div className={`px-8 py-4 rounded-2xl ${getThemeColor('card.glassy', isDark)} border-2 ${colors.brand.primary.border} ${colors.effects.glow.brand} backdrop-blur-md hover:scale-105 transition-all duration-300 cursor-pointer`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-3 ${colors.brand.gradient.primary} rounded-full shadow-lg`}>
                        <Crown className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <span className={`font-bold text-lg ${getThemeColor('text.primary', isDark)}`}>Board of Members</span>
                        <p className={`text-sm ${colors.brand.primary.text}`}>7 Members</p>
                      </div>
                    </div>
                  </div>
                </Link>
                {/* Connecting Line */}
                <div className={`absolute left-1/2 transform -translate-x-1/2 w-0.5 h-12 ${colors.brand.gradient.primary} top-full`}></div>
              </div>
            </div>

            {/* Second Level - Chairman/Director General */}
            <div className="flex justify-center mb-8 relative">
              <div className={`group relative`}>
                <Link to="/directors/chairman">
                  <div className={`px-7 py-4 rounded-xl ${getThemeColor('card.glassy', isDark)} border-2 ${colors.brand.secondary.border} ${colors.effects.glow.brand} backdrop-blur-md hover:scale-105 transition-all duration-300 cursor-pointer`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-3 bg-gradient-to-r from-[#f38621] to-[#1aa79e] rounded-full shadow-lg`}>
                        <Users className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <span className={`font-bold text-lg ${getThemeColor('text.primary', isDark)}`}>Chairman/Director General</span>
                        <p className={`text-sm ${colors.brand.secondary.text}`}>Chief Executive</p>
                      </div>
                    </div>
                  </div>
                </Link>
                {/* Connecting Line */}
                <div className={`absolute left-1/2 transform -translate-x-1/2 w-0.5 h-12 ${colors.brand.gradient.primary} top-full`}></div>
              </div>
            </div>

            {/* Third Level - Directors */}
            <div className="flex justify-center mb-8 relative">
              <div className={`group relative`}>
                <Link to="/directors/directors">
                  <div className={`px-6 py-3 rounded-xl ${getThemeColor('card.glassy', isDark)} border ${getThemeColor('border.brand.subtle', isDark)} backdrop-blur-md hover:scale-105 transition-all duration-300 cursor-pointer`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 ${colors.brand.gradient.primaryReverse} rounded-lg shadow-md`}>
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className={`font-semibold ${getThemeColor('text.primary', isDark)}`}>Directors</span>
                        <p className={`text-xs ${colors.brand.secondary.text}`}>5 Directors</p>
                      </div>
                    </div>
                  </div>
                </Link>
                {/* Branch Lines */}
                <div className={`absolute left-1/2 transform -translate-x-1/2 w-0.5 h-8 ${colors.brand.gradient.primary} top-full`}></div>
                <div className={`absolute left-1/2 transform -translate-x-1/2 w-96 h-0.5 ${colors.brand.gradient.primary} top-full mt-8`}></div>
              </div>
            </div>

            {/* Fourth Level - Deputy & Assistant Directors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 relative">
              {/* Deputy Directors */}
              <div className="flex justify-end">
                <div className={`group relative`}>
                  <Link to="/directors/deputy-directors">
                    <div className={`px-5 py-3 rounded-xl ${getThemeColor('card.glassy', isDark)} border ${getThemeColor('border.subtle', isDark)} backdrop-blur-md hover:scale-105 transition-all duration-300 cursor-pointer`}>
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-gradient-to-r from-[#f38621] to-[#1aa79e] rounded-lg shadow">
                          <UserCheck className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <span className={`font-medium text-sm ${getThemeColor('text.primary', isDark)}`}>Deputy Directors</span>
                          <p className={`text-xs ${getThemeColor('text.muted', isDark)}`}>12 Deputies</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                  {/* Connecting Line to Provincial */}
                  <div className={`absolute left-1/2 transform -translate-x-1/2 w-0.5 h-12 bg-gradient-to-b from-[#f38621] to-transparent top-full`}></div>
                </div>
              </div>

              {/* Assistant Directors */}
              <div className="flex justify-start">
                <div className={`group relative`}>
                  <Link to="/directors/assistant-directors">
                    <div className={`px-5 py-3 rounded-xl ${getThemeColor('card.glassy', isDark)} border ${getThemeColor('border.subtle', isDark)} backdrop-blur-md hover:scale-105 transition-all duration-300 cursor-pointer`}>
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-gradient-to-r from-gray-400 to-gray-600 rounded-lg shadow">
                          <UserCog className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <span className={`font-medium text-sm ${getThemeColor('text.primary', isDark)}`}>Assistant Directors</span>
                          <p className={`text-xs ${getThemeColor('text.muted', isDark)}`}>25 Assistants</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                  {/* Connecting Line to Provincial */}
                  <div className={`absolute left-1/2 transform -translate-x-1/2 w-0.5 h-12 bg-gradient-to-b from-gray-500 to-transparent top-full`}></div>
                </div>
              </div>
            </div>

            {/* Fifth Level - Provincial Teams */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative mt-12">
              {/* Provincial Directors */}
              <div className={`group relative`}>
                <div className={`px-5 py-4 rounded-xl ${getThemeColor('card.glassy', isDark)} border ${getThemeColor('border.subtle', isDark)} backdrop-blur-md hover:scale-105 transition-all duration-300 cursor-pointer`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 ${colors.brand.gradient.primary} rounded-lg shadow`}>
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <span className={`font-medium ${getThemeColor('text.primary', isDark)}`}>Provincial Directors</span>
                        <p className={`text-xs ${getThemeColor('text.muted', isDark)}`}>9 Provinces</p>
                      </div>
                    </div>
                    <div className="flex -space-x-2">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className={`w-6 h-6 rounded-full ${colors.brand.gradient.primary} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}>
                          {i + 1}
                        </div>
                      ))}
                      <div className={`w-6 h-6 rounded-full ${getThemeColor('card.primary', isDark)} border-2 border-white flex items-center justify-center text-xs font-bold`}>
                        +6
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Provincial Assistant Directors */}
              <div className={`group relative`}>
                <div className={`px-5 py-4 rounded-xl ${getThemeColor('card.glassy', isDark)} border ${getThemeColor('border.subtle', isDark)} backdrop-blur-md hover:scale-105 transition-all duration-300 cursor-pointer`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-[#f38621] to-[#1aa79e] rounded-lg shadow">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <span className={`font-medium ${getThemeColor('text.primary', isDark)}`}>Provincial Assistants</span>
                        <p className={`text-xs ${getThemeColor('text.muted', isDark)}`}>25 Districts</p>
                      </div>
                    </div>
                    <div className="flex -space-x-2">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className={`w-6 h-6 rounded-full bg-gradient-to-r from-[#f38621] to-[#1aa79e] border-2 border-white flex items-center justify-center text-white text-xs font-bold`}>
                          {i + 1}
                        </div>
                      ))}
                      <div className={`w-6 h-6 rounded-full ${getThemeColor('card.primary', isDark)} border-2 border-white flex items-center justify-center text-xs font-bold`}>
                        +21
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistical Summary at Bottom */}
            <div className="mt-12 grid grid-cols-3 gap-4 text-center">
              <div className={`py-3 px-4 rounded-lg ${getThemeColor('card.glassy', isDark)} backdrop-blur-md`}>
                <p className={`text-2xl font-bold ${colors.brand.gradient.text}`}>83</p>
                <p className={`text-xs ${getThemeColor('text.muted', isDark)}`}>Total Leaders</p>
              </div>
              <div className={`py-3 px-4 rounded-lg ${getThemeColor('card.glassy', isDark)} backdrop-blur-md`}>
                <p className={`text-2xl font-bold ${colors.brand.gradient.text}`}>6</p>
                <p className={`text-xs ${getThemeColor('text.muted', isDark)}`}>Hierarchy Levels</p>
              </div>
              <div className={`py-3 px-4 rounded-lg ${getThemeColor('card.glassy', isDark)} backdrop-blur-md`}>
                <p className={`text-2xl font-bold ${colors.brand.gradient.text}`}>25</p>
                <p className={`text-xs ${getThemeColor('text.muted', isDark)}`}>Districts Covered</p>
              </div>
            </div>
          </div>
        </div>
        

        
      </div>
    </PageLayout>
  );
};

export default DirectorsPage;