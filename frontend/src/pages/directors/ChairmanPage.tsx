import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor, colors } from '../../config/colors';
import { User, Award, Mail, Phone, Linkedin, Calendar, Target, Globe, Briefcase } from 'lucide-react';
import { useTranslationWithNamespace } from '../../hooks/useTranslationWithNamespace';

const ChairmanPage = () => {
  const { isDark } = useTheme();
  const { t, ready } = useTranslationWithNamespace('directors');

  const chairmanInfo = {
    name: "Hon. Pavithra Wanniarachchi",
    title: "Chairman / Director General",
    description: "Visionary leader with over 25 years of experience in youth development and public administration. Former Cabinet Minister who has been instrumental in transforming youth services across Sri Lanka.",
    image: "/images/board/chairman.jpg",
    email: "chairman@nysc.lk",
    phone: "+94 11 234 5678",
    linkedin: "#",
    tenure: "2021 - Present",
    qualifications: [
      "Master of Public Administration - University of Colombo",
      "Bachelor of Arts - University of Peradeniya",
      "Diploma in Youth Development - International Youth Foundation"
    ],
    achievements: [
      "Established 50+ new youth centers across Sri Lanka",
      "Launched National Youth Skills Development Program",
      "Secured international partnerships with 10+ countries",
      "Increased youth employment by 35% through vocational programs"
    ],
    vision: "To create a vibrant ecosystem where every young person in Sri Lanka has access to opportunities for personal growth, skill development, and meaningful contribution to society."
  };

  const keyInitiatives = [
    {
      icon: Target,
      title: "Digital Transformation",
      description: "Modernizing NYSC services through digital platforms and online training programs"
    },
    {
      icon: Globe,
      title: "International Cooperation",
      description: "Building partnerships with global youth organizations for knowledge exchange"
    },
    {
      icon: Briefcase,
      title: "Employment Generation",
      description: "Creating pathways from training to employment through industry partnerships"
    },
    {
      icon: Award,
      title: "Excellence Recognition",
      description: "Establishing comprehensive youth award system to celebrate achievements"
    }
  ];

  const breadcrumbs = [
    { label: t('common:navigation.home'), href: "/" },
    { label: t('common:navigation.directors'), href: "/directors" },
    { label: t('sections.chairman.title') }
  ];

  // Show loading state while translations are not ready
  if (!ready) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDark ? getThemeColor('background.primary', true) : getThemeColor('background.primary', false)
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className={`${isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)}`}>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <PageLayout 
      title="Chairman / Director General" 
      subtitle="Leading the National Youth Services Council towards a brighter future for Sri Lankan youth."
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Chairman Profile Section */}
        <div className={`mb-12 ${getThemeColor('card.glassy', isDark)} rounded-2xl overflow-hidden border ${getThemeColor('border.subtle', isDark)}`}>
          <div className="grid md:grid-cols-3 gap-8 p-8">
            {/* Profile Image Column */}
            <div className="md:col-span-1">
              <div className={`relative rounded-xl overflow-hidden ${colors.effects.glow.subtle}`}>
                <div className={`aspect-[3/4] ${colors.brand.gradient.primary} flex items-center justify-center`}>
                  <User className="w-32 h-32 text-white/30" />
                </div>
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full ${colors.brand.gradient.primary} text-white text-xs font-bold shadow-lg`}>
                  Chairman
                </div>
              </div>
              
              {/* Contact Information */}
              <div className="mt-6 space-y-3">
                <a 
                  href={`mailto:${chairmanInfo.email}`}
                  className={`flex items-center gap-3 p-3 rounded-lg ${getThemeColor('hover.background', isDark)} transition-all duration-300`}
                >
                  <Mail className={`w-5 h-5 ${colors.brand.primary.text}`} />
                  <span className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>{chairmanInfo.email}</span>
                </a>
                <a 
                  href={`tel:${chairmanInfo.phone}`}
                  className={`flex items-center gap-3 p-3 rounded-lg ${getThemeColor('hover.background', isDark)} transition-all duration-300`}
                >
                  <Phone className={`w-5 h-5 ${colors.brand.secondary.text}`} />
                  <span className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>{chairmanInfo.phone}</span>
                </a>
                <a 
                  href={chairmanInfo.linkedin}
                  className={`flex items-center gap-3 p-3 rounded-lg ${getThemeColor('hover.background', isDark)} transition-all duration-300`}
                >
                  <Linkedin className={`w-5 h-5 text-blue-500`} />
                  <span className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>LinkedIn Profile</span>
                </a>
                <div className={`flex items-center gap-3 p-3 rounded-lg ${getThemeColor('card.primary', isDark)}`}>
                  <Calendar className={`w-5 h-5 ${colors.brand.primary.text}`} />
                  <span className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>Tenure: {chairmanInfo.tenure}</span>
                </div>
              </div>
            </div>

            {/* Information Columns */}
            <div className="md:col-span-2 space-y-6">
              {/* Name and Title */}
              <div>
                <h2 className={`text-3xl font-bold mb-2 ${colors.brand.gradient.text}`}>
                  {chairmanInfo.name}
                </h2>
                <p className={`text-xl font-semibold ${colors.brand.secondary.text}`}>
                  {chairmanInfo.title}
                </p>
              </div>

              {/* Description */}
              <p className={`text-lg leading-relaxed ${getThemeColor('text.secondary', isDark)}`}>
                {chairmanInfo.description}
              </p>

              {/* Vision Statement */}
              <div className={`p-6 rounded-xl ${getThemeColor('background.gradient.brand', isDark)} border ${getThemeColor('border.brand.subtle', isDark)}`}>
                <h3 className={`text-lg font-bold mb-3 ${getThemeColor('text.primary', isDark)}`}>
                  Vision for NYSC
                </h3>
                <p className={`italic ${getThemeColor('text.secondary', isDark)}`}>
                  "{chairmanInfo.vision}"
                </p>
              </div>

              {/* Qualifications */}
              <div>
                <h3 className={`text-lg font-bold mb-3 ${getThemeColor('text.primary', isDark)}`}>
                  Educational Qualifications
                </h3>
                <ul className="space-y-2">
                  {chairmanInfo.qualifications.map((qual, index) => (
                    <li key={index} className={`flex items-start gap-2 ${getThemeColor('text.secondary', isDark)}`}>
                      <span className={`${colors.brand.primary.text} mt-1`}>•</span>
                      <span>{qual}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Achievements */}
              <div>
                <h3 className={`text-lg font-bold mb-3 ${getThemeColor('text.primary', isDark)}`}>
                  Key Achievements
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {chairmanInfo.achievements.map((achievement, index) => (
                    <div 
                      key={index}
                      className={`p-3 rounded-lg ${getThemeColor('card.primary', isDark)} border ${getThemeColor('border.subtle', isDark)}`}
                    >
                      <Award className={`w-4 h-4 inline-block mr-2 ${colors.brand.secondary.text}`} />
                      <span className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Initiatives Section */}
        <div className={`mb-12`}>
          <h2 className={`text-2xl font-bold text-center mb-8 ${colors.brand.gradient.text}`}>
            Key Strategic Initiatives
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyInitiatives.map((initiative, index) => {
              const Icon = initiative.icon;
              return (
                <div 
                  key={index}
                  className={`${getThemeColor('card.glassy', isDark)} rounded-xl p-6 border ${getThemeColor('border.subtle', isDark)} ${colors.hover.shadow.brand} transition-all duration-300 hover:scale-[1.02]`}
                >
                  <div className={`w-12 h-12 rounded-lg ${colors.brand.gradient.primary} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                    {initiative.title}
                  </h3>
                  <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                    {initiative.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Message from Chairman */}
        <div className={`${getThemeColor('background.gradient.brand', isDark)} rounded-2xl p-8 border ${getThemeColor('border.brand.subtle', isDark)}`}>
          <h2 className={`text-2xl font-bold text-center mb-6 ${getThemeColor('text.primary', isDark)}`}>
            Message from the Chairman
          </h2>
          <div className={`max-w-3xl mx-auto text-center`}>
            <p className={`text-lg leading-relaxed mb-4 ${getThemeColor('text.secondary', isDark)}`}>
              "As we navigate the challenges and opportunities of the 21st century, our commitment to 
              empowering Sri Lankan youth remains unwavering. Through innovative programs, strategic 
              partnerships, and a dedicated team, we are building a foundation for our young people 
              to thrive and contribute meaningfully to our nation's progress."
            </p>
            <p className={`text-lg leading-relaxed ${getThemeColor('text.secondary', isDark)}`}>
              "I invite all young Sri Lankans to engage with NYSC's programs and services. Together, 
              we can unlock your potential and create a brighter future for our beloved nation."
            </p>
            <div className="mt-6">
              <p className={`font-bold ${colors.brand.gradient.text}`}>Hon. Pavithra Wanniarachchi</p>
              <p className={`text-sm ${getThemeColor('text.muted', isDark)}`}>Chairman / Director General</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ChairmanPage;