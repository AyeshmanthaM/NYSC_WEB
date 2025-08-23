import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor, colors } from '../../config/colors';
import { User, Award, Mail, Phone, MapPin, Building2, Users, Target, Clock, TrendingUp } from 'lucide-react';

const ProvincialAssistantDirectorsPage = () => {
  const { isDark } = useTheme();

  const provincialAssistants = [
    // Western Province (3 districts)
    { id: 1, name: "Ms. Rashika Perera", position: "Provincial Assistant Director", province: "Western", district: "Colombo", headquarters: "Colombo", population: "2.3M", centers: 18, email: "rashika.p@nysc.lk", phone: "+94 11 234 5800", specialization: "Urban Programs" },
    { id: 2, name: "Mr. Dilshan Fernando", position: "Provincial Assistant Director", province: "Western", district: "Gampaha", headquarters: "Gampaha", population: "2.3M", centers: 15, email: "dilshan.f@nysc.lk", phone: "+94 33 234 5801", specialization: "Suburban Development" },
    { id: 3, name: "Mrs. Nilmini Silva", position: "Provincial Assistant Director", province: "Western", district: "Kalutara", headquarters: "Kalutara", population: "1.2M", centers: 12, email: "nilmini.s@nysc.lk", phone: "+94 34 234 5802", specialization: "Coastal Programs" },

    // Central Province (3 districts)
    { id: 4, name: "Dr. Chamara Jayasekara", position: "Provincial Assistant Director", province: "Central", district: "Kandy", headquarters: "Kandy", population: "1.4M", centers: 14, email: "chamara.j@nysc.lk", phone: "+94 81 234 5803", specialization: "Cultural Heritage" },
    { id: 5, name: "Ms. Sanduni Bandara", position: "Provincial Assistant Director", province: "Central", district: "Matale", headquarters: "Matale", population: "0.5M", centers: 8, email: "sanduni.b@nysc.lk", phone: "+94 66 234 5804", specialization: "Agricultural Programs" },
    { id: 6, name: "Mr. Roshan Wickramasinghe", position: "Provincial Assistant Director", province: "Central", district: "Nuwara Eliya", headquarters: "Nuwara Eliya", population: "0.7M", centers: 6, email: "roshan.w@nysc.lk", phone: "+94 52 234 5805", specialization: "Hill Country Development" },

    // Southern Province (3 districts)
    { id: 7, name: "Mrs. Kumari Rajapaksa", position: "Provincial Assistant Director", province: "Southern", district: "Galle", headquarters: "Galle", population: "1.1M", centers: 12, email: "kumari.r@nysc.lk", phone: "+94 91 234 5806", specialization: "Tourism Development" },
    { id: 8, name: "Mr. Asanka Gunawardena", position: "Provincial Assistant Director", province: "Southern", district: "Matara", headquarters: "Matara", population: "0.8M", centers: 10, email: "asanka.g@nysc.lk", phone: "+94 41 234 5807", specialization: "Maritime Industries" },
    { id: 9, name: "Ms. Thilini Mendis", position: "Provincial Assistant Director", province: "Southern", district: "Hambantota", headquarters: "Hambantota", population: "0.6M", centers: 10, email: "thilini.m@nysc.lk", phone: "+94 47 234 5808", specialization: "Port Development" },

    // Northern Province (5 districts)
    { id: 10, name: "Mr. Suresh Kumar", position: "Provincial Assistant Director", province: "Northern", district: "Jaffna", headquarters: "Jaffna", population: "0.6M", centers: 8, email: "suresh.k@nysc.lk", phone: "+94 21 234 5809", specialization: "Reconstruction Programs" },
    { id: 11, name: "Ms. Priya Selvam", position: "Provincial Assistant Director", province: "Northern", district: "Kilinochchi", headquarters: "Kilinochchi", population: "0.1M", centers: 4, email: "priya.s@nysc.lk", phone: "+94 21 234 5810", specialization: "Rural Development" },
    { id: 12, name: "Mr. Joseph Anthony", position: "Provincial Assistant Director", province: "Northern", district: "Mannar", headquarters: "Mannar", population: "0.1M", centers: 4, email: "joseph.a@nysc.lk", phone: "+94 23 234 5811", specialization: "Fisheries Development" },
    { id: 13, name: "Mrs. Kamala Sivaraj", position: "Provincial Assistant Director", province: "Northern", district: "Mullaitivu", headquarters: "Mullaitivu", population: "0.1M", centers: 3, email: "kamala.s@nysc.lk", phone: "+94 24 234 5812", specialization: "Agriculture & Livestock" },
    { id: 14, name: "Mr. Rajan Patel", position: "Provincial Assistant Director", province: "Northern", district: "Vavuniya", headquarters: "Vavuniya", population: "0.2M", centers: 3, email: "rajan.p@nysc.lk", phone: "+94 24 234 5813", specialization: "Community Integration" },

    // Eastern Province (3 districts)
    { id: 15, name: "Dr. Fazil Ahmed", position: "Provincial Assistant Director", province: "Eastern", district: "Ampara", headquarters: "Ampara", population: "0.6M", centers: 8, email: "fazil.a@nysc.lk", phone: "+94 63 234 5814", specialization: "Multi-ethnic Harmony" },
    { id: 16, name: "Ms. Shanti Perera", position: "Provincial Assistant Director", province: "Eastern", district: "Batticaloa", headquarters: "Batticaloa", population: "0.5M", centers: 9, email: "shanti.p@nysc.lk", phone: "+94 65 234 5815", specialization: "Lagoon Development" },
    { id: 17, name: "Mr. Arjun Selvam", position: "Provincial Assistant Director", province: "Eastern", district: "Trincomalee", headquarters: "Trincomalee", population: "0.4M", centers: 9, email: "arjun.s@nysc.lk", phone: "+94 26 234 5816", specialization: "Harbor Development" },

    // North Western Province (2 districts)
    { id: 18, name: "Mrs. Samanthi Fernando", position: "Provincial Assistant Director", province: "North Western", district: "Kurunegala", headquarters: "Kurunegala", population: "1.6M", centers: 16, email: "samanthi.f@nysc.lk", phone: "+94 37 234 5817", specialization: "Coconut Industries" },
    { id: 19, name: "Mr. Prasad Jayawardena", position: "Provincial Assistant Director", province: "North Western", district: "Puttalam", headquarters: "Puttalam", population: "0.8M", centers: 8, email: "prasad.j@nysc.lk", phone: "+94 32 234 5818", specialization: "Salt & Fisheries" },

    // North Central Province (2 districts)
    { id: 20, name: "Dr. Upali Bandara", position: "Provincial Assistant Director", province: "North Central", district: "Anuradhapura", headquarters: "Anuradhapura", population: "0.9M", centers: 10, email: "upali.b@nysc.lk", phone: "+94 25 234 5819", specialization: "Ancient Heritage" },
    { id: 21, name: "Ms. Malini Dissanayake", position: "Provincial Assistant Director", province: "North Central", district: "Polonnaruwa", headquarters: "Polonnaruwa", population: "0.4M", centers: 8, email: "malini.d@nysc.lk", phone: "+94 27 234 5820", specialization: "Archaeological Tourism" },

    // Uva Province (2 districts)
    { id: 22, name: "Mr. Lakshman Perera", position: "Provincial Assistant Director", province: "Uva", district: "Badulla", headquarters: "Badulla", population: "0.8M", centers: 12, email: "lakshman.p@nysc.lk", phone: "+94 55 234 5821", specialization: "Tea Industry" },
    { id: 23, name: "Mrs. Indira Ratnayake", position: "Provincial Assistant Director", province: "Uva", district: "Monaragala", headquarters: "Monaragala", population: "0.4M", centers: 8, email: "indira.r@nysc.lk", phone: "+94 55 234 5822", specialization: "Gem Mining" },

    // Sabaragamuwa Province (2 districts)
    { id: 24, name: "Dr. Nimal Silva", position: "Provincial Assistant Director", province: "Sabaragamuwa", district: "Ratnapura", headquarters: "Ratnapura", population: "1.1M", centers: 15, email: "nimal.s@nysc.lk", phone: "+94 45 234 5823", specialization: "Gem Industry" },
    { id: 25, name: "Ms. Chandrika Wickramasinghe", position: "Provincial Assistant Director", province: "Sabaragamuwa", district: "Kegalle", headquarters: "Kegalle", population: "0.8M", centers: 10, email: "chandrika.w@nysc.lk", phone: "+94 35 234 5824", specialization: "Rubber Plantations" }
  ];

  const districtStats = [
    { label: "District Directors", value: "25", description: "District Leadership", icon: Users },
    { label: "All Districts", value: "25", description: "Complete Coverage", icon: MapPin },
    { label: "Service Centers", value: "240+", description: "Local Presence", icon: Building2 },
    { label: "Direct Beneficiaries", value: "250K+", description: "Youth Reached", icon: Target }
  ];

  const provinceGroups = provincialAssistants.reduce((groups, assistant) => {
    const province = assistant.province;
    if (!groups[province]) {
      groups[province] = [];
    }
    groups[province].push(assistant);
    return groups;
  }, {} as Record<string, typeof provincialAssistants>);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Directors", href: "/directors" },
    { label: "Provincial Assistant Directors" }
  ];

  const getProvinceColor = (provinceName: string) => {
    const colorMap: Record<string, string> = {
      'Western': 'bg-gradient-to-r from-red-500 to-pink-500',
      'Central': 'bg-gradient-to-r from-blue-500 to-indigo-500',
      'Southern': 'bg-gradient-to-r from-green-500 to-teal-500',
      'Northern': 'bg-gradient-to-r from-purple-500 to-violet-500',
      'Eastern': 'bg-gradient-to-r from-orange-500 to-yellow-500',
      'North Western': 'bg-gradient-to-r from-cyan-500 to-blue-500',
      'North Central': 'bg-gradient-to-r from-pink-500 to-purple-500',
      'Uva': 'bg-gradient-to-r from-indigo-500 to-blue-500',
      'Sabaragamuwa': 'bg-gradient-to-r from-teal-500 to-green-500'
    };
    return colorMap[provinceName] || colors.brand.gradient.primary;
  };

  return (
    <PageLayout 
      title="Provincial Assistant Directors" 
      subtitle="District-level leaders ensuring direct service delivery and community engagement across all 25 districts of Sri Lanka."
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* District Overview Statistics */}
        <div className={`mb-12 ${getThemeColor('card.glassy', isDark)} rounded-2xl p-8 border ${getThemeColor('border.subtle', isDark)}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {districtStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 text-center border ${getThemeColor('border.brand.subtle', isDark)} ${colors.effects.glow.subtle}`}
                >
                  <Icon className={`w-8 h-8 mx-auto mb-3 ${colors.brand.primary.text}`} />
                  <div className={`text-3xl font-bold mb-2 ${colors.brand.gradient.text}`}>{stat.value}</div>
                  <h3 className={`font-semibold mb-1 ${getThemeColor('text.primary', isDark)}`}>{stat.label}</h3>
                  <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>{stat.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Provincial Assistant Directors by Province */}
        {Object.entries(provinceGroups).map(([province, assistants]) => (
          <div key={province} className="mb-12">
            <div className="mb-6 text-center">
              <h2 className={`text-2xl font-bold mb-3 ${colors.brand.gradient.text}`}>
                {province} Province
              </h2>
              <div className={`w-32 h-1 mx-auto rounded-full ${getProvinceColor(province)}`}></div>
              <p className={`mt-2 text-sm ${getThemeColor('text.secondary', isDark)}`}>
                {assistants.length} District{assistants.length > 1 ? 's' : ''} • {assistants.reduce((sum, a) => sum + a.centers, 0)} Centers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {assistants.map((assistant) => (
                <div 
                  key={assistant.id}
                  className={`${getThemeColor('card.glassy', isDark)} rounded-xl overflow-hidden border ${getThemeColor('border.subtle', isDark)} ${colors.effects.glow.subtle} ${colors.hover.shadow.brand} transition-all duration-300 group hover:scale-[1.02]`}
                >
                  {/* District Header */}
                  <div className={`${getProvinceColor(province)} p-3 text-white text-center`}>
                    <h3 className="font-bold text-sm">{assistant.district} District</h3>
                    <p className="text-xs opacity-90">{assistant.headquarters}</p>
                  </div>

                  {/* Profile Section */}
                  <div className="p-4 space-y-3">
                    <div className="text-center">
                      <div className={`w-12 h-12 rounded-full ${getProvinceColor(province)} flex items-center justify-center mx-auto mb-2`}>
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <h4 className={`font-bold text-sm ${getThemeColor('text.primary', isDark)} group-hover:${colors.brand.primary.text} transition-colors line-clamp-2`}>
                        {assistant.name}
                      </h4>
                      <p className={`text-xs font-semibold ${colors.brand.secondary.text}`}>
                        Provincial Assistant Director
                      </p>
                    </div>

                    {/* Specialization */}
                    <div className={`flex items-center justify-center gap-1 py-1 px-2 rounded-lg ${getThemeColor('card.primary', isDark)}`}>
                      <Target className={`w-3 h-3 ${colors.brand.primary.text}`} />
                      <span className={`text-xs ${getThemeColor('text.secondary', isDark)}`}>
                        {assistant.specialization}
                      </span>
                    </div>

                    {/* District Stats */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className={`p-2 rounded-lg ${getThemeColor('card.primary', isDark)} text-center`}>
                        <Users className={`w-3 h-3 mx-auto mb-1 ${colors.brand.primary.text}`} />
                        <p className={`text-xs font-bold ${getThemeColor('text.primary', isDark)}`}>{assistant.population}</p>
                        <p className={`text-xs ${getThemeColor('text.muted', isDark)}`}>Population</p>
                      </div>
                      <div className={`p-2 rounded-lg ${getThemeColor('card.primary', isDark)} text-center`}>
                        <Building2 className={`w-3 h-3 mx-auto mb-1 ${colors.brand.secondary.text}`} />
                        <p className={`text-xs font-bold ${getThemeColor('text.primary', isDark)}`}>{assistant.centers}</p>
                        <p className={`text-xs ${getThemeColor('text.muted', isDark)}`}>Centers</p>
                      </div>
                    </div>

                    {/* Contact Icons */}
                    <div className="flex justify-center space-x-2 pt-2">
                      <a 
                        href={`mailto:${assistant.email}`}
                        className={`p-1 rounded ${getThemeColor('hover.background', isDark)} transition-all duration-300 hover:scale-110`}
                        title="Email"
                      >
                        <Mail className={`w-3 h-3 ${colors.brand.primary.text}`} />
                      </a>
                      <a 
                        href={`tel:${assistant.phone}`}
                        className={`p-1 rounded ${getThemeColor('hover.background', isDark)} transition-all duration-300 hover:scale-110`}
                        title="Phone"
                      >
                        <Phone className={`w-3 h-3 ${colors.brand.secondary.text}`} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* District Operations Framework */}
        <div className={`${getThemeColor('background.gradient.brand', isDark)} rounded-2xl p-8 border ${getThemeColor('border.brand.subtle', isDark)}`}>
          <h2 className={`text-2xl font-bold text-center mb-8 ${getThemeColor('text.primary', isDark)}`}>
            District Operations Framework
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 text-center border ${getThemeColor('border.brand.subtle', isDark)}`}>
              <MapPin className={`w-10 h-10 mx-auto mb-3 ${colors.brand.primary.text}`} />
              <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                Local Presence
              </h3>
              <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                Direct community engagement through district-level leadership and local partnerships
              </p>
            </div>
            <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 text-center border ${getThemeColor('border.brand.subtle', isDark)}`}>
              <Clock className={`w-10 h-10 mx-auto mb-3 ${colors.brand.secondary.text}`} />
              <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                Responsive Service
              </h3>
              <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                Quick response to local needs and immediate support for youth development initiatives
              </p>
            </div>
            <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 text-center border ${getThemeColor('border.brand.subtle', isDark)}`}>
              <Target className={`w-10 h-10 mx-auto mb-3 ${colors.brand.primary.text}`} />
              <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                Targeted Programs
              </h3>
              <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                Specialized programs designed to meet specific district characteristics and opportunities
              </p>
            </div>
            <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 text-center border ${getThemeColor('border.brand.subtle', isDark)}`}>
              <TrendingUp className={`w-10 h-10 mx-auto mb-3 ${colors.brand.secondary.text}`} />
              <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                Impact Monitoring
              </h3>
              <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                Real-time tracking of program effectiveness and continuous improvement at district level
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProvincialAssistantDirectorsPage;