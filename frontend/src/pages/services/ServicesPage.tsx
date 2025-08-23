import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor, colors } from '../../config/colors';
import { Link } from 'react-router-dom';
import { Users, Trophy, GraduationCap, Globe, Briefcase, Heart, ArrowRight, Music } from 'lucide-react';

const ServicesPage = () => {
  const { isDark } = useTheme();

  const services = [
    {
      icon: Briefcase,
      title: "Youth Services Limited",
      description: "Commercial arm of NYSC providing specialized services and business solutions.",
      link: "/services/youth-services-limited"
    },
    {
      icon: Users,
      title: "Youth Parliament",
      description: "Democratic platform for youth to engage in governance and policy discussions.",
      link: "/services/youth-parliament"
    },
    {
      icon: Heart,
      title: "Youth Dancing Team",
      description: "Professional cultural dance troupe representing Sri Lankan heritage and artistry.",
      link: "/services/youth-dancing-team"
    },
    {
      icon: Music,
      title: "Youth Music Band",
      description: "Musical ensemble showcasing talent and promoting cultural expression through music.",
      link: "/services/youth-music-band"
    },
    {
      icon: Globe,
      title: "Youth Drama Team",
      description: "Theatrical group creating impactful performances and developing dramatic arts.",
      link: "/services/youth-drama-team"
    }
  ];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Services" }
  ];

  return (
    <PageLayout 
      title="Services" 
      subtitle="Comprehensive services designed to support the holistic development of Sri Lankan youth."
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Overview */}
        <div className={`mb-16 ${getThemeColor('card.glassy', isDark)} rounded-2xl p-8 md:p-12 text-center border ${getThemeColor('border.subtle', isDark)}`}>
          <h2 className={`text-3xl font-bold mb-6 ${colors.brand.gradient.text}`}>
            Supporting Every Step of Your Journey
          </h2>
          <p className={`text-lg ${getThemeColor('text.secondary', isDark)} max-w-4xl mx-auto leading-relaxed`}>
            From local community engagement to international opportunities, our services provide 
            comprehensive support for personal and professional development of Sri Lankan youth.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link 
              key={index} 
              to={service.link}
              className={`${getThemeColor('card.glassy', isDark)} rounded-xl p-8 border ${getThemeColor('border.subtle', isDark)} ${colors.effects.glow.subtle} ${colors.hover.shadow.brand} transition-all duration-300 group block`}
            >
              <div className="flex justify-center mb-6">
                <div className={`p-4 ${colors.brand.gradient.primary} rounded-full group-hover:scale-110 transition-transform duration-300 ${colors.effects.glow.brand}`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className={`text-xl font-bold mb-4 text-center ${getThemeColor('text.primary', isDark)}`}>
                {service.title}
              </h3>
              <p className={`${getThemeColor('text.secondary', isDark)} text-center mb-6 leading-relaxed`}>
                {service.description}
              </p>
              <div className="flex justify-center">
                <div className={`flex items-center ${colors.brand.primary.text} ${colors.hover.text.brand} font-semibold`}>
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default ServicesPage;