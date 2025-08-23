import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor, colors } from '../../config/colors';
import { Link } from 'react-router-dom';
import { Building2, DollarSign, Scale, Award, Shield, FolderOpen, ArrowRight, Target, TrendingUp } from 'lucide-react';

const DivisionsPage = () => {
  const { isDark } = useTheme();

  const divisions = [
    {
      icon: DollarSign,
      title: "Finance Division",
      description: "Managing financial operations, budgets, and fiscal planning for all NYSC activities.",
      link: "/divisions/finance",
      responsibilities: ["Budget Management", "Financial Planning", "Audit Coordination", "Expense Control"]
    },
    {
      icon: Scale,
      title: "Legal Investigation Division",
      description: "Handling legal matters, compliance, and investigation of organizational issues.",
      link: "/divisions/legal-investigation",
      responsibilities: ["Legal Compliance", "Investigation Procedures", "Policy Development", "Risk Management"]
    },
    {
      icon: Award,
      title: "National Youth Award Division",
      description: "Coordinating national youth awards, recognition programs, and achievement celebrations.",
      link: "/divisions/youth-awards",
      responsibilities: ["Award Programs", "Recognition Ceremonies", "Achievement Tracking", "Excellence Standards"]
    },
    {
      icon: Shield,
      title: "Internal Audit and Investigation Division",
      description: "Ensuring internal controls, audit processes, and organizational integrity.",
      link: "/divisions/internal-audit",
      responsibilities: ["Internal Auditing", "Process Review", "Compliance Monitoring", "Quality Assurance"]
    },
    {
      icon: FolderOpen,
      title: "Examination and Assessment Division",
      description: "Managing examinations, assessments, and evaluation processes for training programs.",
      link: "/divisions/examination-assessment",
      responsibilities: ["Exam Management", "Assessment Standards", "Evaluation Systems", "Certification Processes"]
    },
    {
      icon: Building2,
      title: "Special Project Division",
      description: "Overseeing special initiatives, innovative projects, and strategic developments.",
      link: "/divisions/special-projects",
      responsibilities: ["Project Management", "Innovation Initiatives", "Strategic Planning", "Development Programs"]
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
        {/* Overview */}
        <div className={`mb-16 ${getThemeColor('card.glassy', isDark)} rounded-2xl p-8 md:p-12 text-center border ${getThemeColor('border.subtle', isDark)}`}>
          <Building2 className={`w-16 h-16 mx-auto mb-6 ${colors.brand.primary.text}`} />
          <h2 className={`text-3xl font-bold mb-6 ${colors.brand.gradient.text}`}>
            Organizational Excellence
          </h2>
          <p className={`text-lg ${getThemeColor('text.secondary', isDark)} max-w-4xl mx-auto leading-relaxed`}>
            Our specialized divisions work together to ensure the highest standards of governance, 
            financial management, legal compliance, and program excellence across all NYSC operations.
          </p>
        </div>

        {/* Divisions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {divisions.map((division, index) => (
            <Link 
              key={index} 
              to={division.link}
              className={`${getThemeColor('card.glassy', isDark)} rounded-xl p-8 border ${getThemeColor('border.subtle', isDark)} ${colors.effects.glow.subtle} ${colors.hover.shadow.brand} transition-all duration-300 group block`}
            >
              <div className="flex justify-center mb-6">
                <div className={`p-4 ${colors.brand.gradient.primary} rounded-full group-hover:scale-110 transition-transform duration-300 ${colors.effects.glow.brand}`}>
                  <division.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className={`text-xl font-bold mb-4 text-center ${getThemeColor('text.primary', isDark)}`}>
                {division.title}
              </h3>
              <p className={`${getThemeColor('text.secondary', isDark)} text-center mb-6 leading-relaxed`}>
                {division.description}
              </p>
              
              {/* Key Responsibilities */}
              <div className="mb-6">
                <h4 className={`font-semibold mb-3 text-center ${getThemeColor('text.primary', isDark)} text-sm`}>
                  Key Responsibilities:
                </h4>
                <ul className={`space-y-1 ${getThemeColor('text.secondary', isDark)} text-xs`}>
                  {division.responsibilities.map((responsibility, idx) => (
                    <li key={idx} className="flex items-center justify-center">
                      <span className={`w-1.5 h-1.5 ${colors.brand.secondary.bg} rounded-full mr-2`}></span>
                      {responsibility}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex justify-center">
                <div className={`flex items-center ${colors.brand.primary.text} ${colors.hover.text.brand} font-semibold`}>
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Organizational Chart CTA */}
        <div className={`${getThemeColor('background.gradient.brand', isDark)} rounded-2xl p-8 md:p-12 text-center border ${getThemeColor('border.brand.subtle', isDark)}`}>
          <h2 className={`text-3xl font-bold mb-6 ${getThemeColor('text.primary', isDark)}`}>
            Organizational Structure
          </h2>
          <p className={`text-lg ${getThemeColor('text.secondary', isDark)} mb-8 max-w-3xl mx-auto leading-relaxed`}>
            Discover how our divisions work together in a coordinated structure to deliver 
            exceptional youth services across Sri Lanka.
          </p>
          <button className={`inline-flex items-center px-8 py-3 ${colors.button.primary.base} ${colors.button.primary.hover} ${colors.button.primary.shadow} rounded-lg font-semibold transition-all duration-300`}>
            <Building2 className="w-4 h-4 mr-2" />
            View Organizational Chart
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default DivisionsPage;