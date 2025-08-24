import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor, colors } from '../../config/colors';
import { Briefcase, TrendingUp, Users, Award, Building, Lightbulb, Target, DollarSign, Globe, ShieldCheck, ArrowRight, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const YouthServicesLimited = () => {
  const { isDark } = useTheme();
  const [activeService, setActiveService] = useState(0);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Youth Services Limited" }
  ];

  // Business services offered
  const businessServices = [
    {
      icon: Building,
      title: "Corporate Training",
      description: "Professional development programs for organizations",
      features: ["Leadership Development", "Team Building", "Soft Skills Training", "Technical Workshops"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Lightbulb,
      title: "Consultancy Services",
      description: "Expert guidance for business growth and development",
      features: ["Business Strategy", "Process Optimization", "Market Analysis", "Youth Employment"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Target,
      title: "Event Management",
      description: "End-to-end event planning and execution",
      features: ["Corporate Events", "Conferences", "Workshops", "Cultural Programs"],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Globe,
      title: "International Programs",
      description: "Global partnerships and exchange initiatives",
      features: ["Exchange Programs", "International Training", "Partnership Development", "Global Forums"],
      color: "from-orange-500 to-red-500"
    }
  ];

  // Value propositions
  const valueProps = [
    { icon: Users, value: "10K+", label: "Clients Served" },
    { icon: Award, value: "500+", label: "Programs Delivered" },
    { icon: Building, value: "100+", label: "Corporate Partners" },
    { icon: TrendingUp, value: "95%", label: "Client Satisfaction" }
  ];

  // Case studies/Success stories
  const caseStudies = [
    {
      title: "National Youth Leadership Summit",
      client: "Ministry of Youth Affairs",
      outcome: "Trained 1,000+ youth leaders across 25 districts",
      year: "2023"
    },
    {
      title: "Corporate Skills Development Program",
      client: "Leading Private Sector Companies",
      outcome: "Enhanced employability of 5,000+ young professionals",
      year: "2023"
    },
    {
      title: "International Youth Exchange",
      client: "Global Youth Network",
      outcome: "Facilitated cultural exchange for 200+ participants",
      year: "2022"
    }
  ];

  // Service process
  const processSteps = [
    { step: 1, title: "Consultation", description: "Understanding your requirements" },
    { step: 2, title: "Proposal", description: "Customized solution design" },
    { step: 3, title: "Agreement", description: "Terms and contract finalization" },
    { step: 4, title: "Execution", description: "Professional service delivery" },
    { step: 5, title: "Evaluation", description: "Impact assessment and feedback" }
  ];

  return (
    <PageLayout 
      title="Youth Services Limited" 
      subtitle="The commercial arm of NYSC delivering professional services and business solutions"
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className={`mb-12 ${getThemeColor('card.glassy', isDark)} rounded-3xl p-8 md:p-12 relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-4">
                <Briefcase className="w-10 h-10 text-primary-500 mr-3" />
                <h2 className={`text-3xl font-bold ${colors.brand.gradient.text}`}>
                  Professional Excellence
                </h2>
              </div>
              <p className={`text-lg ${getThemeColor('text.secondary', isDark)} mb-6 leading-relaxed`}>
                Youth Services Limited operates as the commercial division of NYSC, providing specialized 
                services to government institutions, private sector organizations, and international partners. 
                We bridge the gap between youth potential and market opportunities.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className={`px-4 py-2 ${getThemeColor('background.secondary', isDark)} rounded-lg`}>
                  <ShieldCheck className="inline-block w-4 h-4 mr-2 text-green-500" />
                  <span className={`text-sm ${getThemeColor('text.primary', isDark)}`}>ISO Certified</span>
                </div>
                <div className={`px-4 py-2 ${getThemeColor('background.secondary', isDark)} rounded-lg`}>
                  <Award className="inline-block w-4 h-4 mr-2 text-yellow-500" />
                  <span className={`text-sm ${getThemeColor('text.primary', isDark)}`}>Award Winning</span>
                </div>
                <div className={`px-4 py-2 ${getThemeColor('background.secondary', isDark)} rounded-lg`}>
                  <Globe className="inline-block w-4 h-4 mr-2 text-blue-500" />
                  <span className={`text-sm ${getThemeColor('text.primary', isDark)}`}>Global Network</span>
                </div>
              </div>
            </div>
            
            {/* Value Stats */}
            <div className="grid grid-cols-2 gap-4">
              {valueProps.map((prop, index) => (
                <div 
                  key={index}
                  className={`${getThemeColor('background.card', isDark)} rounded-xl p-6 text-center hover:scale-105 transition-transform`}
                >
                  <prop.icon className={`w-8 h-8 mx-auto mb-2 ${colors.brand.primary.text}`} />
                  <div className={`text-2xl font-bold ${colors.brand.gradient.text}`}>
                    {prop.value}
                  </div>
                  <div className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                    {prop.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Business Services */}
        <div className="mb-16">
          <h2 className={`text-2xl font-bold mb-8 text-center ${getThemeColor('text.primary', isDark)}`}>
            Our Business Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessServices.map((service, index) => (
              <div 
                key={index}
                onMouseEnter={() => setActiveService(index)}
                className={`${getThemeColor('card.glassy', isDark)} rounded-xl p-6 border ${getThemeColor('border.subtle', isDark)} transition-all duration-300 hover:shadow-xl group ${
                  activeService === index ? 'scale-105' : ''
                }`}
              >
                <div className={`p-3 bg-gradient-to-r ${service.color} rounded-xl mb-4 inline-block group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-lg font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                  {service.title}
                </h3>
                <p className={`text-sm ${getThemeColor('text.secondary', isDark)} mb-4`}>
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className={`text-xs ${getThemeColor('text.secondary', isDark)} flex items-start`}>
                      <CheckCircle className="w-3 h-3 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Service Process */}
        <div className={`mb-16 ${getThemeColor('card.glassy', isDark)} rounded-3xl p-8 md:p-12`}>
          <h2 className={`text-2xl font-bold mb-8 text-center ${getThemeColor('text.primary', isDark)}`}>
            Our Service Process
          </h2>
          <div className="grid md:grid-cols-5 gap-4">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center relative">
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 opacity-50"></div>
                )}
                <div className={`relative z-10 mb-3 mx-auto w-16 h-16 ${getThemeColor('background.card', isDark)} rounded-full flex items-center justify-center border-2 border-primary-500`}>
                  <span className={`text-lg font-bold ${colors.brand.primary.text}`}>{step.step}</span>
                </div>
                <h4 className={`font-semibold mb-1 text-sm ${getThemeColor('text.primary', isDark)}`}>
                  {step.title}
                </h4>
                <p className={`text-xs ${getThemeColor('text.secondary', isDark)}`}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Case Studies */}
        <div className="mb-16">
          <h2 className={`text-2xl font-bold mb-8 text-center ${getThemeColor('text.primary', isDark)}`}>
            Success Stories
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.map((study, index) => (
              <div 
                key={index}
                className={`${getThemeColor('card.glassy', isDark)} rounded-xl p-6 border ${getThemeColor('border.subtle', isDark)} hover:scale-105 transition-transform`}
              >
                <div className={`text-sm font-semibold mb-2 ${colors.brand.primary.text}`}>
                  {study.year}
                </div>
                <h3 className={`text-lg font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                  {study.title}
                </h3>
                <p className={`text-sm mb-3 ${getThemeColor('text.secondary', isDark)}`}>
                  Client: {study.client}
                </p>
                <div className={`p-3 ${getThemeColor('background.secondary', isDark)} rounded-lg`}>
                  <p className={`text-sm ${colors.brand.primary.text}`}>
                    <TrendingUp className="inline-block w-4 h-4 mr-2" />
                    {study.outcome}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className={`text-center ${getThemeColor('card.glassy', isDark)} rounded-3xl p-8 md:p-12 border ${getThemeColor('border.subtle', isDark)}`}>
          <h2 className={`text-3xl font-bold mb-6 ${colors.brand.gradient.text}`}>
            Partner With Us
          </h2>
          <p className={`text-lg ${getThemeColor('text.secondary', isDark)} mb-8 max-w-3xl mx-auto`}>
            Transform your organization with our professional services. 
            Let's work together to create impactful solutions that drive growth and development.
          </p>
          
          <div className="max-w-2xl mx-auto">
            <div className={`grid md:grid-cols-2 gap-4 mb-8 ${getThemeColor('background.secondary', isDark)} rounded-xl p-6`}>
              <div className="text-left">
                <h4 className={`font-semibold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                  Contact Information
                </h4>
                <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                  📍 No 65, High Level Road, Maharagama<br/>
                  📞 +94 112 850 986<br/>
                  ✉️ services@nysc.lk
                </p>
              </div>
              <div className="text-left">
                <h4 className={`font-semibold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                  Business Hours
                </h4>
                <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                  Monday - Friday: 8:30 AM - 4:30 PM<br/>
                  Saturday: 9:00 AM - 1:00 PM<br/>
                  Sunday: Closed
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg">
                <DollarSign className="w-4 h-4 mr-2" />
                Request Quote
              </button>
              <button className={`inline-flex items-center px-8 py-3 ${getThemeColor('background.secondary', isDark)} ${getThemeColor('text.primary', isDark)} rounded-lg font-semibold hover:scale-105 transition-transform`}>
                <Briefcase className="w-4 h-4 mr-2" />
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default YouthServicesLimited;