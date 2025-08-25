import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor, colors } from '../../config/colors';
import { User, Award, Mail, Phone, Linkedin, MapPin, Building2, Target } from 'lucide-react';
import { useTranslationWithNamespace } from '../../hooks/useTranslationWithNamespace';

const DirectorsListPage = () => {
  const { isDark } = useTheme();
  const { t, ready } = useTranslationWithNamespace('directors');

  const directors = [
    {
      id: 1,
      name: "Dr. Manjula Perera",
      position: "Director - Programs & Development",
      department: "Programs & Development",
      description: "Strategic leader overseeing all youth development programs, training initiatives, and capacity building projects across the nation.",
      image: "/images/directors/director1.jpg",
      email: "manjula.p@nysc.lk",
      phone: "+94 11 234 5690",
      linkedin: "#",
      specialization: "Youth Development",
      experience: "18 years",
      achievements: [
        "Developed National Youth Skills Framework",
        "Launched 25+ vocational training programs",
        "Established international partnerships"
      ]
    },
    {
      id: 2,
      name: "Mr. Saminda Fernando",
      position: "Director - Sports & Recreation",
      department: "Sports & Recreation",
      description: "Passionate sports administrator dedicated to promoting sports culture and physical fitness among Sri Lankan youth through innovative programs.",
      image: "/images/directors/director2.jpg",
      email: "saminda.f@nysc.lk",
      phone: "+94 11 234 5691",
      linkedin: "#",
      specialization: "Sports Development",
      experience: "15 years",
      achievements: [
        "Organized 50+ national youth championships",
        "Established youth sports academies",
        "International sports exchange programs"
      ]
    },
    {
      id: 3,
      name: "Ms. Nilmini Silva",
      position: "Director - Cultural Affairs",
      department: "Cultural Affairs",
      description: "Cultural heritage advocate promoting traditional arts, crafts, and cultural preservation through innovative youth engagement programs.",
      image: "/images/directors/director3.jpg",
      email: "nilmini.s@nysc.lk",
      phone: "+94 11 234 5692",
      linkedin: "#",
      specialization: "Cultural Development",
      experience: "20 years",
      achievements: [
        "Preserved 100+ traditional art forms",
        "Cultural ambassador training programs",
        "UNESCO heritage project coordination"
      ]
    },
    {
      id: 4,
      name: "Mr. Roshan Wickramasinghe",
      position: "Director - Vocational Training",
      department: "Vocational Training",
      description: "Industry expert focused on bridging the skills gap through modern vocational training programs aligned with market demands.",
      image: "/images/directors/director4.jpg",
      email: "roshan.w@nysc.lk",
      phone: "+94 11 234 5693",
      linkedin: "#",
      specialization: "Skills Development",
      experience: "16 years",
      achievements: [
        "90% job placement rate for graduates",
        "Partnership with 200+ companies",
        "Industry 4.0 training programs"
      ]
    },
    {
      id: 5,
      name: "Dr. Kamani Jayawardena",
      position: "Director - Research & Policy",
      department: "Research & Policy",
      description: "Policy research specialist developing evidence-based strategies for youth development and organizational effectiveness.",
      image: "/images/directors/director5.jpg",
      email: "kamani.j@nysc.lk",
      phone: "+94 11 234 5694",
      linkedin: "#",
      specialization: "Policy Development",
      experience: "22 years",
      achievements: [
        "Published 50+ research studies",
        "National youth policy framework",
        "Evidence-based program design"
      ]
    }
  ];

  const departmentStats = [
    { department: "Programs & Development", programs: 35, beneficiaries: "50,000+" },
    { department: "Sports & Recreation", events: 120, participants: "25,000+" },
    { department: "Cultural Affairs", projects: 45, artists: "15,000+" },
    { department: "Vocational Training", courses: 80, graduates: "30,000+" },
    { department: "Research & Policy", studies: 25, policies: "15" }
  ];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Directors", href: "/directors" },
    { label: "Directors" }
  ];

  return (
    <PageLayout 
      title="Directors" 
      subtitle="Meet the executive leadership team driving strategic initiatives and operational excellence across all NYSC departments."
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Department Overview */}
        <div className={`mb-12 ${getThemeColor('card.glassy', isDark)} rounded-2xl p-8 border ${getThemeColor('border.subtle', isDark)}`}>
          <h2 className={`text-2xl font-bold text-center mb-8 ${colors.brand.gradient.text}`}>
            Departmental Excellence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {departmentStats.map((stat, index) => (
              <div 
                key={index}
                className={`${getThemeColor('card.primary', isDark)} rounded-xl p-4 text-center border ${getThemeColor('border.brand.subtle', isDark)}`}
              >
                <h3 className={`font-bold text-sm mb-2 ${getThemeColor('text.primary', isDark)}`}>
                  {stat.department}
                </h3>
                <div className="space-y-1">
                  {stat.programs && (
                    <p className={`text-xs ${getThemeColor('text.secondary', isDark)}`}>
                      <span className={`font-bold ${colors.brand.primary.text}`}>{stat.programs}</span> Programs
                    </p>
                  )}
                  {stat.events && (
                    <p className={`text-xs ${getThemeColor('text.secondary', isDark)}`}>
                      <span className={`font-bold ${colors.brand.primary.text}`}>{stat.events}</span> Events
                    </p>
                  )}
                  {stat.projects && (
                    <p className={`text-xs ${getThemeColor('text.secondary', isDark)}`}>
                      <span className={`font-bold ${colors.brand.primary.text}`}>{stat.projects}</span> Projects
                    </p>
                  )}
                  {stat.courses && (
                    <p className={`text-xs ${getThemeColor('text.secondary', isDark)}`}>
                      <span className={`font-bold ${colors.brand.primary.text}`}>{stat.courses}</span> Courses
                    </p>
                  )}
                  {stat.studies && (
                    <p className={`text-xs ${getThemeColor('text.secondary', isDark)}`}>
                      <span className={`font-bold ${colors.brand.primary.text}`}>{stat.studies}</span> Studies
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Directors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {directors.map((director) => (
            <div 
              key={director.id}
              className={`${getThemeColor('card.glassy', isDark)} rounded-xl overflow-hidden border ${getThemeColor('border.subtle', isDark)} ${colors.effects.glow.subtle} ${colors.hover.shadow.brand} transition-all duration-300 group hover:scale-[1.02]`}
            >
              <div className="p-6">
                <div className="flex gap-6">
                  {/* Profile Image */}
                  <div className="flex-shrink-0">
                    <div className={`w-24 h-24 rounded-full ${colors.brand.gradient.primary} flex items-center justify-center relative`}>
                      <User className="w-12 h-12 text-white/50" />
                      <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full ${colors.brand.gradient.primaryReverse} flex items-center justify-center`}>
                        <Award className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Director Information */}
                  <div className="flex-grow space-y-3">
                    <div>
                      <h3 className={`text-lg font-bold ${getThemeColor('text.primary', isDark)} group-hover:${colors.brand.primary.text} transition-colors`}>
                        {director.name}
                      </h3>
                      <p className={`text-sm font-semibold ${colors.brand.secondary.text}`}>
                        {director.position}
                      </p>
                      <p className={`text-xs ${getThemeColor('text.muted', isDark)}`}>
                        {director.specialization} • {director.experience} Experience
                      </p>
                    </div>

                    <p className={`text-sm ${getThemeColor('text.secondary', isDark)} line-clamp-3`}>
                      {director.description}
                    </p>

                    {/* Achievements */}
                    <div>
                      <h4 className={`text-xs font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                        Key Achievements:
                      </h4>
                      <ul className="space-y-1">
                        {director.achievements.slice(0, 3).map((achievement, index) => (
                          <li key={index} className={`text-xs ${getThemeColor('text.secondary', isDark)} flex items-start gap-1`}>
                            <Target className={`w-3 h-3 mt-0.5 flex-shrink-0 ${colors.brand.primary.text}`} />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Contact Information */}
                    <div className="flex items-center gap-4 pt-2">
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
                      <a 
                        href={director.linkedin}
                        className={`p-2 rounded-lg ${getThemeColor('hover.background', isDark)} transition-all duration-300 hover:scale-110`}
                        title="LinkedIn"
                      >
                        <Linkedin className={`w-4 h-4 text-blue-500`} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Department Badge */}
              <div className={`px-6 py-3 ${getThemeColor('background.gradient.brand', isDark)} border-t ${getThemeColor('border.brand.subtle', isDark)}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className={`w-4 h-4 ${colors.brand.primary.text}`} />
                    <span className={`text-sm font-semibold ${getThemeColor('text.primary', isDark)}`}>
                      {director.department}
                    </span>
                  </div>
                  <div className={`px-3 py-1 rounded-full ${colors.brand.gradient.primary} text-white text-xs font-bold`}>
                    Director
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Leadership Philosophy */}
        <div className={`${getThemeColor('background.gradient.brand', isDark)} rounded-2xl p-8 border ${getThemeColor('border.brand.subtle', isDark)}`}>
          <h2 className={`text-2xl font-bold text-center mb-6 ${getThemeColor('text.primary', isDark)}`}>
            Our Leadership Philosophy
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 border ${getThemeColor('border.brand.subtle', isDark)}`}>
              <Target className={`w-10 h-10 mx-auto mb-3 ${colors.brand.primary.text}`} />
              <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                Strategic Vision
              </h3>
              <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                Long-term planning with clear objectives and measurable outcomes for youth development
              </p>
            </div>
            <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 border ${getThemeColor('border.brand.subtle', isDark)}`}>
              <Award className={`w-10 h-10 mx-auto mb-3 ${colors.brand.secondary.text}`} />
              <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                Excellence Commitment
              </h3>
              <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                Pursuing highest standards in all programs and services delivered to Sri Lankan youth
              </p>
            </div>
            <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 border ${getThemeColor('border.brand.subtle', isDark)}`}>
              <MapPin className={`w-10 h-10 mx-auto mb-3 ${colors.brand.primary.text}`} />
              <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                National Reach
              </h3>
              <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                Ensuring equitable access to opportunities across all provinces and communities
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default DirectorsListPage;