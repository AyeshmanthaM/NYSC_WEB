import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor, colors } from '../../config/colors';
import { FileCheck, Award, Calendar, BookOpen, Users, TrendingUp, CheckCircle, Clock, Phone, Mail, Building2, Target } from 'lucide-react';

const ExaminationAssessmentPage = () => {
  const { isDark } = useTheme();

  const keyServices = [
    {
      icon: Calendar,
      title: "Unified Examination Management",
      description: "Conducting final examinations for all NYSC training centers within synchronized time periods to ensure standardized assessment.",
      features: ["Centralized scheduling", "Standardized question papers", "Simultaneous testing", "Quality control"]
    },
    {
      icon: Award,
      title: "NVQ Certification Services",
      description: "Issuing locally and internationally accredited National Vocational Training certificates for skills-based courses.",
      features: ["International recognition", "Industry standards", "Skills validation", "Career advancement"]
    },
    {
      icon: BookOpen,
      title: "Curriculum Development",
      description: "Formulating comprehensive general curricula for non-NVQ courses and distributing to all training centers.",
      features: ["Course design", "Content development", "Standards alignment", "Quality assurance"]
    },
    {
      icon: Users,
      title: "Recognition of Prior Learning",
      description: "Implementing RPL methods to provide NVQ certificates to youth with existing vocational experience and skills.",
      features: ["Experience assessment", "Skills recognition", "Flexible pathways", "Provincial awareness"]
    }
  ];

  const certificationProcess = [
    {
      step: 1,
      title: "Course Completion",
      description: "Trainees complete their vocational training programs at NYSC centers",
      duration: "3-12 months",
      color: "from-blue-500 to-cyan-500"
    },
    {
      step: 2,
      title: "Final Examination",
      description: "Standardized final examinations conducted simultaneously across all centers",
      duration: "1-2 weeks",
      color: "from-green-500 to-teal-500"
    },
    {
      step: 3,
      title: "Skills Assessment",
      description: "Practical skills evaluation and competency-based assessment for NVQ certification",
      duration: "2-4 weeks",
      color: "from-orange-500 to-yellow-500"
    },
    {
      step: 4,
      title: "Certificate Issuance",
      description: "Certificates issued within 3 months of examination completion with award ceremonies",
      duration: "Within 3 months",
      color: "from-purple-500 to-indigo-500"
    }
  ];

  const employmentSupport = [
    {
      program: "On-the-Job Training (OJT)",
      description: "Creating direct employment opportunities through structured workplace training programs",
      benefits: ["Industry experience", "Skill application", "Job placement", "Career development"]
    },
    {
      program: "Industry Partnerships",
      description: "Collaborative relationships with employers for graduate placement and career progression",
      benefits: ["Direct recruitment", "Industry connections", "Career pathways", "Professional networks"]
    },
    {
      program: "Employment Facilitation",
      description: "Active support in connecting certified graduates with employment opportunities",
      benefits: ["Job matching", "Career counseling", "Interview preparation", "Follow-up support"]
    }
  ];

  const divisionStats = [
    {
      metric: "All Centers",
      value: "100%",
      description: "Training centers covered for examinations",
      icon: Building2,
      color: "from-blue-500 to-cyan-500"
    },
    {
      metric: "3 Months",
      value: "Maximum",
      description: "Certificate delivery timeline",
      icon: Clock,
      color: "from-green-500 to-teal-500"
    },
    {
      metric: "NVQ Standards",
      value: "International",
      description: "Accreditation recognition level",
      icon: Award,
      color: "from-orange-500 to-yellow-500"
    },
    {
      metric: "RPL Program",
      value: "Provincial",
      description: "Recognition of Prior Learning coverage",
      icon: Users,
      color: "from-purple-500 to-indigo-500"
    }
  ];

  const contactInfo = {
    phone: "011-2837065",
    email: "exam.assessment@gmail.com",
    services: ["Examination coordination", "Certificate inquiries", "Curriculum information", "Assessment support"]
  };

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Divisions", href: "/divisions" },
    { label: "Examination & Assessment Division" }
  ];

  return (
    <PageLayout 
      title="Examination and Assessment Division" 
      subtitle="Ensuring excellence in skills assessment, certification, and employment facilitation through comprehensive examination management and NVQ certification services."
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Division Overview */}
        <div className={`mb-12 ${getThemeColor('card.glassy', isDark)} rounded-2xl p-8 border ${getThemeColor('border.subtle', isDark)}`}>
          <div className="flex items-center gap-6 mb-8">
            <div className={`p-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full ${colors.effects.glow.brand}`}>
              <FileCheck className="w-12 h-12 text-white" />
            </div>
            <div>
              <h2 className={`text-3xl font-bold ${colors.brand.gradient.text}`}>Examination & Assessment Division</h2>
              <p className={`${colors.brand.secondary.text} font-semibold text-lg`}>Skills Certification & Employment</p>
            </div>
          </div>
          <p className={`text-lg ${getThemeColor('text.secondary', isDark)} leading-relaxed max-w-4xl`}>
            The Examination and Assessment Division plays a pivotal role in youth development by managing comprehensive 
            examination systems, issuing internationally recognized NVQ certificates, and creating employment opportunities 
            for NYSC graduates through strategic industry partnerships.
          </p>
        </div>

        {/* Key Services */}
        <div className="mb-12">
          <h2 className={`text-2xl font-bold text-center mb-8 ${colors.brand.gradient.text}`}>
            Core Services & Functions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {keyServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div 
                  key={index}
                  className={`${getThemeColor('card.glassy', isDark)} rounded-xl p-6 border ${getThemeColor('border.subtle', isDark)} ${colors.effects.glow.subtle} transition-all duration-300 hover:scale-[1.02]`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                        {service.title}
                      </h3>
                      <p className={`text-sm ${getThemeColor('text.secondary', isDark)} leading-relaxed`}>
                        {service.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className={`text-sm font-semibold mb-3 ${getThemeColor('text.primary', isDark)}`}>
                      Key Features:
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className={`flex items-center text-xs ${getThemeColor('text.secondary', isDark)}`}>
                          <CheckCircle className={`w-3 h-3 mr-2 ${colors.brand.secondary.text} flex-shrink-0`} />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Certification Process */}
        <div className="mb-12">
          <h2 className={`text-2xl font-bold text-center mb-8 ${colors.brand.gradient.text}`}>
            Certification Journey
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certificationProcess.map((process, index) => (
              <div 
                key={index}
                className={`${getThemeColor('card.primary', isDark)} rounded-xl overflow-hidden border ${getThemeColor('border.brand.subtle', isDark)} transition-all duration-300 hover:scale-[1.02]`}
              >
                <div className={`bg-gradient-to-r ${process.color} p-4 text-white text-center`}>
                  <div className={`w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2`}>
                    <span className="font-bold">{process.step}</span>
                  </div>
                  <h3 className="font-bold">{process.title}</h3>
                </div>
                
                <div className="p-4">
                  <p className={`text-sm ${getThemeColor('text.secondary', isDark)} mb-3 leading-relaxed`}>
                    {process.description}
                  </p>
                  <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${process.color} text-white text-xs font-semibold text-center`}>
                    {process.duration}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Employment Support */}
        <div className="mb-12">
          <h2 className={`text-2xl font-bold text-center mb-8 ${colors.brand.gradient.text}`}>
            Employment & Career Support
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {employmentSupport.map((support, index) => (
              <div 
                key={index}
                className={`${getThemeColor('card.glassy', isDark)} rounded-xl p-6 border ${getThemeColor('border.subtle', isDark)} ${colors.effects.glow.subtle}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg`}>
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className={`font-bold ${getThemeColor('text.primary', isDark)}`}>
                    {support.program}
                  </h3>
                </div>
                <p className={`text-sm ${getThemeColor('text.secondary', isDark)} mb-4 leading-relaxed`}>
                  {support.description}
                </p>
                
                <div>
                  <h4 className={`text-sm font-semibold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                    Benefits:
                  </h4>
                  <div className="grid grid-cols-2 gap-1">
                    {support.benefits.map((benefit, idx) => (
                      <div key={idx} className={`flex items-center text-xs ${getThemeColor('text.secondary', isDark)}`}>
                        <Target className={`w-3 h-3 mr-1 ${colors.brand.primary.text} flex-shrink-0`} />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Division Statistics */}
        <div className="mb-12">
          <h2 className={`text-2xl font-bold text-center mb-8 ${colors.brand.gradient.text}`}>
            Service Excellence Metrics
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {divisionStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 text-center border ${getThemeColor('border.brand.subtle', isDark)} transition-all duration-300 hover:scale-[1.02]`}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className={`font-bold mb-1 ${getThemeColor('text.primary', isDark)}`}>
                    {stat.metric}
                  </h3>
                  <p className={`text-2xl font-bold mb-2 ${colors.brand.gradient.text}`}>
                    {stat.value}
                  </p>
                  <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                    {stat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact & Support */}
        <div className={`${getThemeColor('background.gradient.brand', isDark)} rounded-2xl p-8 border ${getThemeColor('border.brand.subtle', isDark)}`}>
          <h2 className={`text-2xl font-bold text-center mb-8 ${getThemeColor('text.primary', isDark)}`}>
            Contact & Support Services
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Contact Information */}
            <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 border ${getThemeColor('border.brand.subtle', isDark)}`}>
              <h3 className={`text-lg font-bold mb-4 ${getThemeColor('text.primary', isDark)}`}>
                Get in Touch
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg`}>
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className={`font-semibold ${getThemeColor('text.primary', isDark)}`}>Phone</p>
                    <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>{contactInfo.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className={`p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg`}>
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className={`font-semibold ${getThemeColor('text.primary', isDark)}`}>Email</p>
                    <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>{contactInfo.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Available Services */}
            <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 border ${getThemeColor('border.brand.subtle', isDark)}`}>
              <h3 className={`text-lg font-bold mb-4 ${getThemeColor('text.primary', isDark)}`}>
                Support Services
              </h3>
              <ul className="space-y-2">
                {contactInfo.services.map((service, index) => (
                  <li key={index} className={`flex items-center ${getThemeColor('text.secondary', isDark)}`}>
                    <CheckCircle className={`w-4 h-4 mr-3 ${colors.brand.secondary.text} flex-shrink-0`} />
                    <span className="text-sm">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Impact Summary */}
          <div className="text-center">
            <p className={`${getThemeColor('text.secondary', isDark)} max-w-3xl mx-auto leading-relaxed`}>
              Empowering Sri Lankan youth through rigorous assessment, internationally recognized certification, 
              and strategic employment facilitation to build a skilled and productive workforce for national development.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ExaminationAssessmentPage;