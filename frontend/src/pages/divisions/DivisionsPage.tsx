import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor, colors } from '../../config/colors';
import { Link } from 'react-router-dom';
import { Building2, DollarSign, Scale, Award, Shield, FileCheck, Briefcase, ArrowRight, Target, TrendingUp, Users, CheckCircle, Star, Globe } from 'lucide-react';

const DivisionsPage = () => {
  const { isDark } = useTheme();

  const divisions = [
    {
      icon: DollarSign,
      title: "Finance Division",
      description: "Operating accounting activities in compliance with Financial Regulations and following the Finance Act No. 38 of 1971.",
      link: "/divisions/finance",
      color: "bg-gradient-to-r from-green-500 to-emerald-500",
      keyMetrics: { staff: "12+", processes: "50+", reports: "Quarterly" },
      responsibilities: ["Treasury Operations", "Financial Reports", "Asset Management", "Budget Control"]
    },
    {
      icon: Scale,
      title: "Legal Investigation Division",
      description: "Representing NYSC in legal institutions and conducting disciplinary investigations across multiple court levels.",
      link: "/divisions/legal-investigation",
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
      keyMetrics: { courts: "7", institutions: "5", staff: "5" },
      responsibilities: ["Court Representation", "Legal Coordination", "Disciplinary Action", "Legal Compliance"]
    },
    {
      icon: Award,
      title: "National Youth Award Division",
      description: "Recognizing outstanding youth achievements and coordinating national award programs for excellence.",
      link: "/divisions/youth-awards",
      color: "bg-gradient-to-r from-yellow-500 to-orange-500",
      keyMetrics: { awards: "15+", recipients: "500+", ceremonies: "Annual" },
      responsibilities: ["Award Programs", "Recognition Ceremonies", "Achievement Evaluation", "Excellence Promotion"]
    },
    {
      icon: Shield,
      title: "Internal Audit and Investigation Division",
      description: "Conducting internal audits across 83 offices and centers, ensuring financial administration compliance.",
      link: "/divisions/internal-audit",
      color: "bg-gradient-to-r from-purple-500 to-indigo-500",
      keyMetrics: { offices: "83", audits: "Annual", reports: "Monthly" },
      responsibilities: ["Internal Auditing", "Financial Oversight", "Compliance Monitoring", "Investigation Reports"]
    },
    {
      icon: FileCheck,
      title: "Examination and Assessment Division",
      description: "Managing examinations, NVQ certifications, and skills assessment for youth training programs nationwide.",
      link: "/divisions/examination-assessment",
      color: "bg-gradient-to-r from-red-500 to-pink-500",
      keyMetrics: { centers: "All", certificates: "NVQ", timeline: "3 Months" },
      responsibilities: ["Exam Management", "NVQ Certification", "Skills Assessment", "Curriculum Development"]
    },
    {
      icon: Briefcase,
      title: "Special Project Division",
      description: "Implementing innovative initiatives and strategic special projects to enhance youth development services.",
      link: "/divisions/special-projects",
      color: "bg-gradient-to-r from-teal-500 to-blue-500",
      keyMetrics: { projects: "15+", initiatives: "Ongoing", impact: "National" },
      responsibilities: ["Project Management", "Innovation Development", "Strategic Implementation", "Impact Assessment"]
    }
  ];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Divisions" }
  ];

  return (
    <PageLayout 
      title="Divisions" 
      subtitle="Explore the specialized divisions that drive the operations and excellence of the National Youth Services Council."
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Enhanced Overview */}
        <div className={`mb-16 ${getThemeColor('card.glassy', isDark)} rounded-2xl overflow-hidden border ${getThemeColor('border.subtle', isDark)}`}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-[#1aa79e] to-[#f38621] blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-[#f38621] to-[#1aa79e] blur-3xl"></div>
          </div>
          
          <div className="relative z-10 p-8 md:p-12 text-center">
            <Building2 className={`w-16 h-16 mx-auto mb-6 ${colors.brand.primary.text}`} />
            <h2 className={`text-3xl font-bold mb-6 ${colors.brand.gradient.text}`}>
              Specialized Divisions
            </h2>
            <p className={`text-lg ${getThemeColor('text.secondary', isDark)} max-w-4xl mx-auto leading-relaxed mb-8`}>
              Six specialized divisions working in harmony to ensure excellence in governance, 
              financial management, legal compliance, and program delivery across Sri Lanka.
            </p>

            {/* Division Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-4 border ${getThemeColor('border.brand.subtle', isDark)}`}>
                <Building2 className={`w-6 h-6 mx-auto mb-2 ${colors.brand.primary.text}`} />
                <p className={`text-2xl font-bold ${colors.brand.gradient.text}`}>6</p>
                <p className={`text-xs ${getThemeColor('text.muted', isDark)}`}>Divisions</p>
              </div>
              <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-4 border ${getThemeColor('border.brand.subtle', isDark)}`}>
                <Users className={`w-6 h-6 mx-auto mb-2 ${colors.brand.secondary.text}`} />
                <p className={`text-2xl font-bold ${colors.brand.gradient.text}`}>100+</p>
                <p className={`text-xs ${getThemeColor('text.muted', isDark)}`}>Staff</p>
              </div>
              <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-4 border ${getThemeColor('border.brand.subtle', isDark)}`}>
                <Target className={`w-6 h-6 mx-auto mb-2 ${colors.brand.primary.text}`} />
                <p className={`text-2xl font-bold ${colors.brand.gradient.text}`}>200+</p>
                <p className={`text-xs ${getThemeColor('text.muted', isDark)}`}>Processes</p>
              </div>
              <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-4 border ${getThemeColor('border.brand.subtle', isDark)}`}>
                <Globe className={`w-6 h-6 mx-auto mb-2 ${colors.brand.secondary.text}`} />
                <p className={`text-2xl font-bold ${colors.brand.gradient.text}`}>9</p>
                <p className={`text-xs ${getThemeColor('text.muted', isDark)}`}>Provinces</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Divisions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {divisions.map((division, index) => (
            <Link 
              key={index} 
              to={division.link}
              className={`${getThemeColor('card.glassy', isDark)} rounded-2xl overflow-hidden border ${getThemeColor('border.subtle', isDark)} ${colors.effects.glow.subtle} ${colors.hover.shadow.brand} transition-all duration-300 group block hover:scale-[1.02]`}
            >
              {/* Division Header */}
              <div className={`${division.color} p-6 text-white text-center`}>
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                    <division.icon className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-xl font-bold">
                  {division.title}
                </h3>
              </div>

              {/* Division Content */}
              <div className="p-6">
                <p className={`${getThemeColor('text.secondary', isDark)} mb-6 leading-relaxed text-sm`}>
                  {division.description}
                </p>
                
                {/* Key Metrics */}
                <div className="mb-6">
                  <h4 className={`font-semibold mb-3 ${getThemeColor('text.primary', isDark)} text-sm`}>
                    Key Metrics:
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(division.keyMetrics).map(([key, value], idx) => (
                      <div key={idx} className={`${getThemeColor('card.primary', isDark)} rounded-lg p-2 text-center`}>
                        <p className={`text-sm font-bold ${colors.brand.primary.text}`}>{value}</p>
                        <p className={`text-xs ${getThemeColor('text.muted', isDark)} capitalize`}>{key}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Key Responsibilities */}
                <div className="mb-6">
                  <h4 className={`font-semibold mb-3 ${getThemeColor('text.primary', isDark)} text-sm`}>
                    Core Functions:
                  </h4>
                  <ul className="space-y-2">
                    {division.responsibilities.map((responsibility, idx) => (
                      <li key={idx} className={`flex items-center text-xs ${getThemeColor('text.secondary', isDark)}`}>
                        <CheckCircle className={`w-3 h-3 mr-2 ${colors.brand.secondary.text} flex-shrink-0`} />
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-center">
                  <div className={`flex items-center ${colors.brand.primary.text} ${colors.hover.text.brand} font-semibold text-sm`}>
                    Explore Division
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Excellence Framework */}
        <div className={`${getThemeColor('background.gradient.brand', isDark)} rounded-2xl p-8 md:p-12 border ${getThemeColor('border.brand.subtle', isDark)}`}>
          <h2 className={`text-2xl font-bold text-center mb-8 ${getThemeColor('text.primary', isDark)}`}>
            Divisional Excellence Framework
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 text-center border ${getThemeColor('border.brand.subtle', isDark)}`}>
              <Star className={`w-10 h-10 mx-auto mb-3 ${colors.brand.primary.text}`} />
              <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                Specialized Expertise
              </h3>
              <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                Each division brings focused expertise to ensure operational excellence
              </p>
            </div>
            <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 text-center border ${getThemeColor('border.brand.subtle', isDark)}`}>
              <Target className={`w-10 h-10 mx-auto mb-3 ${colors.brand.secondary.text}`} />
              <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                Process Integration
              </h3>
              <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                Coordinated workflows across divisions for seamless service delivery
              </p>
            </div>
            <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 text-center border ${getThemeColor('border.brand.subtle', isDark)}`}>
              <CheckCircle className={`w-10 h-10 mx-auto mb-3 ${colors.brand.primary.text}`} />
              <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                Quality Assurance
              </h3>
              <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                Continuous monitoring and improvement of divisional performance
              </p>
            </div>
            <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 text-center border ${getThemeColor('border.brand.subtle', isDark)}`}>
              <TrendingUp className={`w-10 h-10 mx-auto mb-3 ${colors.brand.secondary.text}`} />
              <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                Strategic Alignment
              </h3>
              <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                All divisions aligned with NYSC's mission and strategic objectives
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default DivisionsPage;