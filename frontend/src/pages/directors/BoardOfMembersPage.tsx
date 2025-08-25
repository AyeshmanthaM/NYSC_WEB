import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor, colors } from '../../config/colors';
import { User, Award, Mail, Phone, Linkedin, Globe } from 'lucide-react';
import { useTranslationWithNamespace } from '../../hooks/useTranslationWithNamespace';

const BoardOfMembersPage = () => {
  const { isDark } = useTheme();
  const { t, ready } = useTranslationWithNamespace('directors');

  const boardMembers = [
    {
      id: 1,
      name: "Hon. Pavithra Wanniarachchi",
      position: "Chairman",
      description: "Former Cabinet Minister with extensive experience in youth development and public administration.",
      image: "/images/board/chairman.jpg",
      email: "chairman@nysc.lk",
      phone: "+94 11 234 5678",
      linkedin: "#",
      badge: "Chairman"
    },
    {
      id: 2,
      name: "Dr. Samantha Jayawardena",
      position: "Vice Chairman",
      description: "Renowned educationist and policy maker specializing in vocational training and skill development.",
      image: "/images/board/vice-chairman.jpg",
      email: "vice.chairman@nysc.lk",
      phone: "+94 11 234 5679",
      linkedin: "#",
      badge: "Vice Chairman"
    },
    {
      id: 3,
      name: "Mr. Ruwan Fernando",
      position: "Secretary",
      description: "Senior public administrator with 20+ years experience in government service and youth affairs.",
      image: "/images/board/secretary.jpg",
      email: "secretary@nysc.lk",
      phone: "+94 11 234 5680",
      linkedin: "#",
      badge: "Secretary"
    },
    {
      id: 4,
      name: "Ms. Dilani Perera",
      position: "Treasurer",
      description: "Chartered accountant with expertise in financial management and nonprofit governance.",
      image: "/images/board/treasurer.jpg",
      email: "treasurer@nysc.lk",
      phone: "+94 11 234 5681",
      linkedin: "#",
      badge: "Treasurer"
    },
    {
      id: 5,
      name: "Mr. Ajith Rajapaksa",
      position: "Board Member",
      description: "Sports administrator and former national athlete promoting youth sports development.",
      image: "/images/board/member1.jpg",
      email: "ajith.r@nysc.lk",
      phone: "+94 11 234 5682",
      linkedin: "#",
      badge: "Member"
    },
    {
      id: 6,
      name: "Dr. Kamani Silva",
      position: "Board Member",
      description: "Cultural affairs expert specializing in preserving and promoting Sri Lankan heritage.",
      image: "/images/board/member2.jpg",
      email: "kamani.s@nysc.lk",
      phone: "+94 11 234 5683",
      linkedin: "#",
      badge: "Member"
    },
    {
      id: 7,
      name: "Mr. Prasanna Wickramasinghe",
      position: "Board Member",
      description: "Technology entrepreneur advocating for digital literacy and innovation among youth.",
      image: "/images/board/member3.jpg",
      email: "prasanna.w@nysc.lk",
      phone: "+94 11 234 5684",
      linkedin: "#",
      badge: "Member"
    },
    {
      id: 8,
      name: "Ms. Nadeeka Gunasekara",
      position: "Board Member",
      description: "Social worker dedicated to community development and youth empowerment initiatives.",
      image: "/images/board/member4.jpg",
      email: "nadeeka.g@nysc.lk",
      phone: "+94 11 234 5685",
      linkedin: "#",
      badge: "Member"
    }
  ];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Directors", href: "/directors" },
    { label: "Board of Members" }
  ];

  const getBadgeColor = (position: string) => {
    if (position === "Chairman") return colors.brand.gradient.primary;
    if (position === "Vice Chairman") return colors.brand.gradient.primaryReverse;
    return getThemeColor('badge.brand', isDark);
  };

  return (
    <PageLayout 
      title="Board of Members" 
      subtitle="Meet the distinguished leaders guiding the National Youth Services Council towards excellence in youth development."
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Introduction Section */}
        <div className={`mb-12 ${getThemeColor('card.glassy', isDark)} rounded-2xl p-8 border ${getThemeColor('border.subtle', isDark)}`}>
          <div className="text-center max-w-4xl mx-auto">
            <h2 className={`text-2xl font-bold mb-4 ${colors.brand.gradient.text}`}>
              Leadership Excellence
            </h2>
            <p className={`${getThemeColor('text.secondary', isDark)} leading-relaxed`}>
              Our Board of Members comprises distinguished individuals from diverse backgrounds, bringing together expertise 
              in education, public administration, finance, sports, culture, and social development. Together, they provide 
              strategic direction and governance oversight to advance youth development across Sri Lanka.
            </p>
          </div>
        </div>

        {/* Board Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {boardMembers.map((member) => (
            <div 
              key={member.id}
              className={`${getThemeColor('card.glassy', isDark)} rounded-xl overflow-hidden border ${getThemeColor('border.subtle', isDark)} ${colors.effects.glow.subtle} ${colors.hover.shadow.brand} transition-all duration-300 group hover:scale-[1.02]`}
            >
              {/* Profile Image Section */}
              <div className="relative h-48 bg-gradient-to-b from-transparent to-black/20">
                {/* Placeholder for profile image - using User icon */}
                <div className={`w-full h-full ${colors.brand.gradient.primary} flex items-center justify-center`}>
                  <User className="w-24 h-24 text-white/50" />
                </div>
                
                {/* Position Badge - Top Center */}
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2">
                  <span className={`px-4 py-1 rounded-full text-xs font-bold text-white ${getBadgeColor(member.badge)} shadow-lg`}>
                    {member.badge}
                  </span>
                </div>
              </div>

              {/* Member Info Section */}
              <div className="p-5">
                {/* Name - Second Position */}
                <h3 className={`text-lg font-bold mb-1 text-center ${getThemeColor('text.primary', isDark)} group-hover:${colors.brand.primary.text} transition-colors`}>
                  {member.name}
                </h3>
                
                {/* Position/Title */}
                <p className={`text-sm font-semibold text-center mb-3 ${colors.brand.secondary.text}`}>
                  {member.position}
                </p>

                {/* Description - Bottom */}
                <p className={`text-xs ${getThemeColor('text.secondary', isDark)} text-center leading-relaxed mb-4 line-clamp-3`}>
                  {member.description}
                </p>

                {/* Contact Icons */}
                <div className="flex justify-center space-x-3">
                  <a 
                    href={`mailto:${member.email}`}
                    className={`p-2 rounded-lg ${getThemeColor('hover.background', isDark)} transition-all duration-300 hover:scale-110`}
                    title="Email"
                  >
                    <Mail className={`w-4 h-4 ${getThemeColor('text.muted', isDark)}`} />
                  </a>
                  <a 
                    href={`tel:${member.phone}`}
                    className={`p-2 rounded-lg ${getThemeColor('hover.background', isDark)} transition-all duration-300 hover:scale-110`}
                    title="Phone"
                  >
                    <Phone className={`w-4 h-4 ${getThemeColor('text.muted', isDark)}`} />
                  </a>
                  <a 
                    href={member.linkedin}
                    className={`p-2 rounded-lg ${getThemeColor('hover.background', isDark)} transition-all duration-300 hover:scale-110`}
                    title="LinkedIn"
                  >
                    <Linkedin className={`w-4 h-4 ${getThemeColor('text.muted', isDark)}`} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Board Meeting Schedule */}
        <div className={`${getThemeColor('background.gradient.brand', isDark)} rounded-2xl p-8 border ${getThemeColor('border.brand.subtle', isDark)}`}>
          <h2 className={`text-2xl font-bold text-center mb-6 ${getThemeColor('text.primary', isDark)}`}>
            Board Governance
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 border ${getThemeColor('border.brand.subtle', isDark)}`}>
              <Award className={`w-10 h-10 mx-auto mb-3 ${colors.brand.primary.text}`} />
              <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                Monthly Meetings
              </h3>
              <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                Regular board meetings held on the first Tuesday of each month
              </p>
            </div>
            <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 border ${getThemeColor('border.brand.subtle', isDark)}`}>
              <Globe className={`w-10 h-10 mx-auto mb-3 ${colors.brand.secondary.text}`} />
              <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                Strategic Planning
              </h3>
              <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                Annual strategic review and five-year development planning
              </p>
            </div>
            <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 border ${getThemeColor('border.brand.subtle', isDark)}`}>
              <User className={`w-10 h-10 mx-auto mb-3 ${colors.brand.primary.text}`} />
              <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                Public Engagement
              </h3>
              <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                Quarterly stakeholder meetings and community consultations
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default BoardOfMembersPage;