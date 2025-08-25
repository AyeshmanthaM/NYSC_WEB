import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor, colors } from '../../config/colors';
import { Link } from 'react-router-dom';
import { Users, Trophy, GraduationCap, Globe, Briefcase, Heart, ArrowRight, Music, Theater, MapPin, Award, TrendingUp, Sparkles } from 'lucide-react';
import { useTranslationWithNamespace } from '../../hooks/useTranslationWithNamespace';
import { useState, useEffect } from 'react';

const ServicesPage = () => {
  const { isDark } = useTheme();
  const { t, ready } = useTranslationWithNamespace('services');
  const [activeService, setActiveService] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const services = [
    {
      icon: Users,
      title: "Youth Clubs",
      description: "Dynamic community organizations fostering leadership and social development since 1983.",
      link: "/services/youth-clubs",
      color: "from-blue-500 to-cyan-500",
      stats: "25 Districts",
      highlight: "15-29 Age Group"
    },
    {
      icon: Briefcase,
      title: "Youth Services Limited",
      description: "Commercial arm of NYSC providing specialized services and business solutions.",
      link: "/services/youth-services-limited",
      color: "from-purple-500 to-pink-500",
      stats: "Business Solutions",
      highlight: "Professional Services"
    },
    {
      icon: Trophy,
      title: "Youth Parliament",
      description: "Democratic platform for youth to engage in governance and policy discussions.",
      link: "/services/youth-parliament",
      color: "from-green-500 to-emerald-500",
      stats: "National Platform",
      highlight: "Civic Engagement"
    },
    {
      icon: Heart,
      title: "Youth Dancing Team",
      description: "Professional cultural dance troupe representing Sri Lankan heritage and artistry.",
      link: "/services/youth-dancing-team",
      color: "from-red-500 to-orange-500",
      stats: "Cultural Heritage",
      highlight: "Traditional & Modern"
    },
    {
      icon: Music,
      title: "Youth Music Band",
      description: "Musical ensemble showcasing talent and promoting cultural expression through music.",
      link: "/services/youth-music-band",
      color: "from-indigo-500 to-blue-500",
      stats: "Musical Excellence",
      highlight: "Creative Expression"
    },
    {
      icon: Theater,
      title: "Youth Drama Team",
      description: "Theatrical group creating impactful performances and developing dramatic arts since 1998.",
      link: "/services/youth-drama-team",
      color: "from-yellow-500 to-amber-500",
      stats: "Drama School",
      highlight: "Since 1998"
    }
  ];

  // Auto-rotate active service for hero section
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Services" }
  ];

  // Statistics for impact section
  const impactStats = [
    { value: "50K+", label: "Active Members", icon: Users },
    { value: "25", label: "Districts Covered", icon: MapPin },
    { value: "100+", label: "Annual Programs", icon: Award },
    { value: "40+", label: "Years of Service", icon: TrendingUp }
  ];

  return (
    <PageLayout 
      title="Services" 
      subtitle="Empowering youth through diverse programs and opportunities for growth"
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Hero Section with Rotating Service Highlights */}
        <div className={`mb-16 ${getThemeColor('card.glassy', isDark)} rounded-3xl p-8 md:p-12 overflow-hidden relative`}>
          <div className="absolute inset-0 opacity-10">
            <div className={`absolute inset-0 bg-gradient-to-r ${services[activeService].color}`}></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-yellow-500 mr-3 animate-pulse" />
              <h2 className={`text-3xl md:text-4xl font-bold ${colors.brand.gradient.text}`}>
                Discover Your Path
              </h2>
              <Sparkles className="w-8 h-8 text-yellow-500 ml-3 animate-pulse" />
            </div>
            
            <div className="max-w-4xl mx-auto text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className={`p-3 bg-gradient-to-r ${services[activeService].color} rounded-full animate-bounce`}>
                  {(() => {
                    const IconComponent = services[activeService].icon;
                    return <IconComponent className="w-6 h-6 text-white" />;
                  })()}
                </div>
              </div>
              <h3 className={`text-2xl font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                {services[activeService].title}
              </h3>
              <p className={`text-lg ${getThemeColor('text.secondary', isDark)}`}>
                {services[activeService].description}
              </p>
            </div>

            {/* Service Indicators */}
            <div className="flex justify-center space-x-2">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveService(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeService 
                      ? 'w-8 bg-gradient-to-r ' + services[index].color 
                      : 'w-2 bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Impact Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {impactStats.map((stat, index) => (
            <div 
              key={index}
              className={`${getThemeColor('card.glassy', isDark)} rounded-xl p-6 text-center border ${getThemeColor('border.subtle', isDark)} hover:scale-105 transition-transform duration-300`}
            >
              <stat.icon className={`w-8 h-8 mx-auto mb-3 ${colors.brand.primary.text}`} />
              <div className={`text-3xl font-bold mb-1 ${colors.brand.gradient.text}`}>
                {stat.value}
              </div>
              <div className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link 
              key={index} 
              to={service.link}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`relative ${getThemeColor('card.glassy', isDark)} rounded-2xl p-8 border ${getThemeColor('border.subtle', isDark)} transition-all duration-500 group block overflow-hidden ${
                hoveredCard === index ? 'scale-105 shadow-2xl' : ''
              }`}
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              {/* Badge */}
              <div className={`absolute top-4 right-4 px-3 py-1 bg-gradient-to-r ${service.color} rounded-full text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                {service.highlight}
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <div className={`p-4 bg-gradient-to-r ${service.color} rounded-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <h3 className={`text-xl font-bold mb-3 text-center ${getThemeColor('text.primary', isDark)}`}>
                  {service.title}
                </h3>
                
                <p className={`${getThemeColor('text.secondary', isDark)} text-center mb-4 leading-relaxed text-sm`}>
                  {service.description}
                </p>

                {/* Stats Badge */}
                <div className={`text-center mb-4 px-4 py-2 ${getThemeColor('background.secondary', isDark)} rounded-lg`}>
                  <span className={`text-sm font-semibold ${colors.brand.primary.text}`}>
                    {service.stats}
                  </span>
                </div>
                
                <div className="flex justify-center">
                  <div className={`flex items-center bg-gradient-to-r ${service.color} bg-clip-text text-transparent font-semibold group-hover:scale-110 transition-transform`}>
                    Explore Service
                    <ArrowRight className={`w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform ${colors.brand.primary.text}`} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`mt-16 text-center ${getThemeColor('card.glassy', isDark)} rounded-3xl p-12 border ${getThemeColor('border.subtle', isDark)}`}>
          <h2 className={`text-3xl font-bold mb-6 ${colors.brand.gradient.text}`}>
            Ready to Make a Difference?
          </h2>
          <p className={`text-lg ${getThemeColor('text.secondary', isDark)} mb-8 max-w-3xl mx-auto`}>
            Join thousands of young Sri Lankans who are building their skills, serving their communities, 
            and shaping the future of our nation.
          </p>
          <button className={`px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-semibold hover:scale-105 transition-transform duration-300 shadow-lg`}>
            Get Started Today
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default ServicesPage;