import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor, colors } from '../../config/colors';
import { User, Award, Mail, Phone, MapPin, Building2, Users, TrendingUp, Target, Globe } from 'lucide-react';
import { useTranslationWithNamespace } from '../../hooks/useTranslationWithNamespace';

const ProvincialDirectorsPage = () => {
  const { isDark } = useTheme();
  const { t, ready } = useTranslationWithNamespace('directors');

  const provincialDirectors = [
    {
      id: 1,
      name: "Mr. Ajith Ratnayake",
      position: "Provincial Director - Western Province",
      province: "Western Province",
      headquarters: "Colombo",
      districts: ["Colombo", "Gampaha", "Kalutara"],
      population: "5.8M",
      centers: 45,
      description: "Leading youth development initiatives in the most populous province with focus on urban challenges and opportunities.",
      email: "ajith.r@nysc.lk",
      phone: "+94 11 234 5750",
      achievements: [
        "Established 15 new youth centers",
        "90% employment rate for vocational graduates",
        "Launched digital skills programs"
      ]
    },
    {
      id: 2,
      name: "Dr. Nirmala Perera",
      position: "Provincial Director - Central Province",
      province: "Central Province",
      headquarters: "Kandy",
      districts: ["Kandy", "Matale", "Nuwara Eliya"],
      population: "2.6M",
      centers: 28,
      description: "Coordinating mountain region programs with emphasis on traditional crafts and eco-tourism training.",
      email: "nirmala.p@nysc.lk",
      phone: "+94 81 234 5751",
      achievements: [
        "Traditional arts preservation programs",
        "Eco-tourism training initiatives",
        "Hill country youth empowerment"
      ]
    },
    {
      id: 3,
      name: "Mrs. Chandrika Silva",
      position: "Provincial Director - Southern Province",
      province: "Southern Province",
      headquarters: "Galle",
      districts: ["Galle", "Matara", "Hambantota"],
      population: "2.5M",
      centers: 32,
      description: "Managing coastal region programs with focus on maritime industries, fisheries, and tourism development.",
      email: "chandrika.s@nysc.lk",
      phone: "+94 91 234 5752",
      achievements: [
        "Maritime skills development",
        "Coastal tourism programs",
        "Fisheries youth training"
      ]
    },
    {
      id: 4,
      name: "Mr. Sunil Bandara",
      position: "Provincial Director - Northern Province",
      province: "Northern Province",
      headquarters: "Jaffna",
      districts: ["Jaffna", "Kilinochchi", "Mannar", "Mullaitivu", "Vavuniya"],
      population: "1.1M",
      centers: 22,
      description: "Rebuilding and strengthening youth services in post-conflict areas with focus on reconciliation and development.",
      email: "sunil.b@nysc.lk",
      phone: "+94 21 234 5753",
      achievements: [
        "Post-conflict youth integration",
        "Cross-cultural programs",
        "Economic revival initiatives"
      ]
    },
    {
      id: 5,
      name: "Ms. Kamala Fernando",
      position: "Provincial Director - Eastern Province",
      province: "Eastern Province",
      headquarters: "Trincomalee",
      districts: ["Ampara", "Batticaloa", "Trincomalee"],
      population: "1.6M",
      centers: 26,
      description: "Developing multi-ethnic youth programs with emphasis on unity, agricultural innovation, and coastal development.",
      email: "kamala.f@nysc.lk",
      phone: "+94 26 234 5754",
      achievements: [
        "Multi-ethnic harmony programs",
        "Agricultural innovation training",
        "Coastal development projects"
      ]
    },
    {
      id: 6,
      name: "Mr. Prasad Wickramasinghe",
      position: "Provincial Director - North Western Province",
      province: "North Western Province",
      headquarters: "Kurunegala",
      districts: ["Kurunegala", "Puttalam"],
      population: "2.4M",
      centers: 24,
      description: "Coordinating agricultural and industrial youth programs in the coconut triangle region.",
      email: "prasad.w@nysc.lk",
      phone: "+94 37 234 5755",
      achievements: [
        "Coconut industry programs",
        "Industrial skills training",
        "Agricultural modernization"
      ]
    },
    {
      id: 7,
      name: "Dr. Malini Jayasekara",
      position: "Provincial Director - North Central Province",
      province: "North Central Province",
      headquarters: "Anuradhapura",
      districts: ["Anuradhapura", "Polonnaruwa"],
      population: "1.3M",
      centers: 18,
      description: "Managing ancient cities region with focus on heritage conservation, archaeology, and cultural tourism.",
      email: "malini.j@nysc.lk",
      phone: "+94 25 234 5756",
      achievements: [
        "Heritage conservation training",
        "Archaeological skills programs",
        "Cultural tourism development"
      ]
    },
    {
      id: 8,
      name: "Mr. Gamini Rajapaksa",
      position: "Provincial Director - Uva Province",
      province: "Uva Province",
      headquarters: "Badulla",
      districts: ["Badulla", "Monaragala"],
      population: "1.3M",
      centers: 20,
      description: "Leading hill country programs with emphasis on tea industry, gem mining, and mountain tourism.",
      email: "gamini.r@nysc.lk",
      phone: "+94 55 234 5757",
      achievements: [
        "Tea industry skills programs",
        "Gem cutting training",
        "Mountain adventure tourism"
      ]
    },
    {
      id: 9,
      name: "Mrs. Sujatha Gunawardena",
      position: "Provincial Director - Sabaragamuwa Province",
      province: "Sabaragamuwa Province",
      headquarters: "Ratnapura",
      districts: ["Ratnapura", "Kegalle"],
      population: "1.9M",
      centers: 25,
      description: "Managing gem province programs with focus on mining, rubber plantation, and small-scale industries.",
      email: "sujatha.g@nysc.lk",
      phone: "+94 45 234 5758",
      achievements: [
        "Gem industry development",
        "Rubber plantation training",
        "Small industry promotion"
      ]
    }
  ];

  const provinceStats = [
    { label: "Provincial Directors", value: "9", description: "Provincial Leadership", icon: Users },
    { label: "Districts Covered", value: "25", description: "Complete Coverage", icon: MapPin },
    { label: "Youth Centers", value: "240+", description: "Service Points", icon: Building2 },
    { label: "Youth Served", value: "500K+", description: "Annual Beneficiaries", icon: Target }
  ];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Directors", href: "/directors" },
    { label: "Provincial Directors" }
  ];

  const getProvinceColor = (index: number) => {
    const colors = [
      'bg-gradient-to-r from-red-500 to-pink-500',
      'bg-gradient-to-r from-blue-500 to-indigo-500',
      'bg-gradient-to-r from-green-500 to-teal-500',
      'bg-gradient-to-r from-purple-500 to-violet-500',
      'bg-gradient-to-r from-orange-500 to-yellow-500',
      'bg-gradient-to-r from-cyan-500 to-blue-500',
      'bg-gradient-to-r from-pink-500 to-purple-500',
      'bg-gradient-to-r from-indigo-500 to-blue-500',
      'bg-gradient-to-r from-teal-500 to-green-500'
    ];
    return colors[index % colors.length];
  };

  return (
    <PageLayout 
      title="Provincial Directors" 
      subtitle="Regional leaders ensuring effective implementation of youth development programs across all nine provinces of Sri Lanka."
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Provincial Overview Statistics */}
        <div className={`mb-12 ${getThemeColor('card.glassy', isDark)} rounded-2xl p-8 border ${getThemeColor('border.subtle', isDark)}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {provinceStats.map((stat, index) => {
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

        {/* Sri Lanka Map Visualization */}
        <div className={`mb-12 ${getThemeColor('card.glassy', isDark)} rounded-2xl p-8 border ${getThemeColor('border.subtle', isDark)}`}>
          <h2 className={`text-2xl font-bold text-center mb-8 ${colors.brand.gradient.text}`}>
            Provincial Coverage Map
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {provincialDirectors.map((director, index) => (
              <div 
                key={director.id}
                className={`p-4 rounded-xl ${getProvinceColor(index)} text-white text-center transform hover:scale-105 transition-all duration-300`}
              >
                <h3 className="font-bold text-lg mb-1">{director.province}</h3>
                <p className="text-sm opacity-90">{director.headquarters}</p>
                <p className="text-xs opacity-75 mt-1">{director.centers} Centers • {director.population} Population</p>
              </div>
            ))}
          </div>
        </div>

        {/* Provincial Directors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {provincialDirectors.map((director, index) => (
            <div 
              key={director.id}
              className={`${getThemeColor('card.glassy', isDark)} rounded-xl overflow-hidden border ${getThemeColor('border.subtle', isDark)} ${colors.effects.glow.subtle} ${colors.hover.shadow.brand} transition-all duration-300 group hover:scale-[1.02]`}
            >
              {/* Province Header */}
              <div className={`${getProvinceColor(index)} p-4 text-white text-center`}>
                <h3 className="font-bold text-lg">{director.province}</h3>
                <p className="text-sm opacity-90">HQ: {director.headquarters}</p>
              </div>

              {/* Director Profile */}
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-full ${getProvinceColor(index)} flex items-center justify-center flex-shrink-0`}>
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-grow">
                    <h4 className={`font-bold ${getThemeColor('text.primary', isDark)} group-hover:${colors.brand.primary.text} transition-colors`}>
                      {director.name}
                    </h4>
                    <p className={`text-sm ${colors.brand.secondary.text}`}>
                      {director.position}
                    </p>
                  </div>
                </div>

                <p className={`text-sm ${getThemeColor('text.secondary', isDark)} leading-relaxed`}>
                  {director.description}
                </p>

                {/* Province Details */}
                <div className="grid grid-cols-2 gap-3">
                  <div className={`p-3 rounded-lg ${getThemeColor('card.primary', isDark)}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className={`w-4 h-4 ${colors.brand.primary.text}`} />
                      <span className={`text-sm font-semibold ${getThemeColor('text.primary', isDark)}`}>Districts</span>
                    </div>
                    <p className={`text-xs ${getThemeColor('text.secondary', isDark)}`}>
                      {director.districts.join(', ')}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${getThemeColor('card.primary', isDark)}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <Building2 className={`w-4 h-4 ${colors.brand.secondary.text}`} />
                      <span className={`text-sm font-semibold ${getThemeColor('text.primary', isDark)}`}>Centers</span>
                    </div>
                    <p className={`text-xs ${getThemeColor('text.secondary', isDark)}`}>
                      {director.centers} Service Points
                    </p>
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h5 className={`text-sm font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                    Key Achievements:
                  </h5>
                  <ul className="space-y-1">
                    {director.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className={`text-xs ${getThemeColor('text.secondary', isDark)} flex items-start gap-2`}>
                        <Award className={`w-3 h-3 mt-0.5 flex-shrink-0 ${colors.brand.primary.text}`} />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact Information */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <a 
                      href={`mailto:${director.email}`}
                      className={`p-2 rounded-lg ${getThemeColor('hover.background', isDark)} transition-all duration-300 hover:scale-110`}
                      title="Email"
                    >
                      <Mail className={`w-4 h-4 ${colors.brand.primary.text}`} />
                    </a>
                    <a 
                      href={`tel:${director.phone}`}
                      className={`p-2 rounded-lg ${getThemeColor('hover.background', isDark)} transition-all duration-300 hover:scale-110`}
                      title="Phone"
                    >
                      <Phone className={`w-4 h-4 ${colors.brand.secondary.text}`} />
                    </a>
                  </div>
                  <div className={`px-3 py-1 rounded-full ${getProvinceColor(index)} text-white text-xs font-bold`}>
                    Provincial Director
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Regional Excellence Framework */}
        <div className={`${getThemeColor('background.gradient.brand', isDark)} rounded-2xl p-8 border ${getThemeColor('border.brand.subtle', isDark)}`}>
          <h2 className={`text-2xl font-bold text-center mb-8 ${getThemeColor('text.primary', isDark)}`}>
            Regional Leadership Framework
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 text-center border ${getThemeColor('border.brand.subtle', isDark)}`}>
              <Globe className={`w-10 h-10 mx-auto mb-3 ${colors.brand.primary.text}`} />
              <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                Regional Adaptation
              </h3>
              <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                Tailoring programs to meet specific regional needs and cultural contexts
              </p>
            </div>
            <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 text-center border ${getThemeColor('border.brand.subtle', isDark)}`}>
              <Users className={`w-10 h-10 mx-auto mb-3 ${colors.brand.secondary.text}`} />
              <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                Community Engagement
              </h3>
              <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                Building strong partnerships with local communities and stakeholders
              </p>
            </div>
            <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 text-center border ${getThemeColor('border.brand.subtle', isDark)}`}>
              <TrendingUp className={`w-10 h-10 mx-auto mb-3 ${colors.brand.primary.text}`} />
              <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                Performance Excellence
              </h3>
              <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                Achieving consistent results through effective management and innovation
              </p>
            </div>
            <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 text-center border ${getThemeColor('border.brand.subtle', isDark)}`}>
              <Target className={`w-10 h-10 mx-auto mb-3 ${colors.brand.secondary.text}`} />
              <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                Impact Measurement
              </h3>
              <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                Monitoring and evaluating program effectiveness for continuous improvement
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProvincialDirectorsPage;