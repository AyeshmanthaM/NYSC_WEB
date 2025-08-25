import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor, colors } from '../../config/colors';
import { Shield, Building2, FileText, CheckCircle, AlertCircle, TrendingUp, MapPin, Users, Phone, Mail, Target } from 'lucide-react';
import { useTranslationWithNamespace } from '../../hooks/useTranslationWithNamespace';

const InternalAuditPage = () => {
  const { isDark } = useTheme();
  const { t, ready } = useTranslationWithNamespace('divisions');

  const auditScope = [
    {
      category: "Provincial Offices",
      count: 10,
      description: "Comprehensive audit coverage across all provincial headquarters",
      color: "from-blue-500 to-cyan-500"
    },
    {
      category: "District Offices",
      count: 26,
      description: "District-level operational and financial administration review",
      color: "from-green-500 to-teal-500"
    },
    {
      category: "Training Centers & Farms",
      count: 47,
      description: "Specialized facilities offering vocational training and agricultural programs",
      color: "from-orange-500 to-yellow-500"
    }
  ];

  const keyResponsibilities = [
    {
      icon: Shield,
      title: "Financial Administration Audit",
      description: "Comprehensive inspection of financial administration across all NYSC facilities and ensuring compliance with Finance Act No. 38 of 1971."
    },
    {
      icon: FileText,
      title: "Audit Report Preparation",
      description: "Preparing detailed audit observations, response reports to Auditor General, and forwarding findings to relevant authorities."
    },
    {
      icon: TrendingUp,
      title: "Committee on Public Enterprises",
      description: "Preparing specialized reports for the Committee on Public Enterprises and ensuring transparency in public sector operations."
    },
    {
      icon: Target,
      title: "Special Investigations",
      description: "Conducting special investigations under Director General's directives and maintaining organizational integrity."
    }
  ];

  const auditProcess = [
    {
      step: 1,
      title: "Annual Audit Plan",
      description: "Preparation and submission of comprehensive Annual Audit Plan to the Auditor General",
      timeline: "January"
    },
    {
      step: 2,
      title: "Field Audits",
      description: "Systematic inspection of development and financial administration across all locations",
      timeline: "Year-round"
    },
    {
      step: 3,
      title: "Report Preparation",
      description: "Compilation of audit observations and preparation of response reports",
      timeline: "Monthly"
    },
    {
      step: 4,
      title: "Authority Submission",
      description: "Forwarding audit observations and answers to Auditor General and relevant authorities",
      timeline: "Ongoing"
    }
  ];

  const complianceFramework = [
    {
      regulation: "Finance Act No. 38 of 1971",
      sections: "F.R. 133 and 134",
      purpose: "Legal foundation for internal audit establishment and operations"
    },
    {
      regulation: "National Youth Services Act",
      sections: "Organizational Requirements",
      purpose: "NYSC-specific governance and audit requirements"
    },
    {
      regulation: "Auditor General Guidelines",
      sections: "Audit Standards",
      purpose: "Professional audit standards and reporting requirements"
    }
  ];

  const contactInfo = {
    address: "Internal Audit and Investigation Division, National Youth Services Council, No. 65, High Level Road, Maharagama",
    departments: ["Chief Internal Auditor", "Audit Officers", "Internal Audit Officers", "Management Assistants", "Office Assistants"]
  };

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Divisions", href: "/divisions" },
    { label: "Internal Audit & Investigation Division" }
  ];

  return (
    <PageLayout 
      title="Internal Audit and Investigation Division" 
      subtitle="Ensuring financial oversight, accountability, and integrity across 83 NYSC offices and centers through comprehensive audit and investigation services."
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Division Overview */}
        <div className={`mb-12 ${getThemeColor('card.glassy', isDark)} rounded-2xl p-8 border ${getThemeColor('border.subtle', isDark)}`}>
          <div className="flex items-center gap-6 mb-8">
            <div className={`p-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full ${colors.effects.glow.brand}`}>
              <Shield className="w-12 h-12 text-white" />
            </div>
            <div>
              <h2 className={`text-3xl font-bold ${colors.brand.gradient.text}`}>Internal Audit & Investigation</h2>
              <p className={`${colors.brand.secondary.text} font-semibold text-lg`}>Financial Oversight & Integrity</p>
            </div>
          </div>
          <p className={`text-lg ${getThemeColor('text.secondary', isDark)} leading-relaxed max-w-4xl`}>
            Established to fulfill the requirements of Finance Act No. 38 of 1971 (F.R. 133 and 134), this division 
            ensures comprehensive financial oversight, accountability, and organizational integrity across all NYSC operations 
            through systematic auditing and investigation processes.
          </p>
        </div>

        {/* Audit Scope */}
        <div className="mb-12">
          <h2 className={`text-2xl font-bold text-center mb-8 ${colors.brand.gradient.text}`}>
            Comprehensive Audit Coverage
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {auditScope.map((scope, index) => (
              <div 
                key={index}
                className={`${getThemeColor('card.glassy', isDark)} rounded-xl overflow-hidden border ${getThemeColor('border.subtle', isDark)} ${colors.effects.glow.subtle} transition-all duration-300 hover:scale-[1.02]`}
              >
                <div className={`bg-gradient-to-r ${scope.color} p-6 text-white text-center`}>
                  <div className={`text-4xl font-bold mb-2`}>{scope.count}</div>
                  <h3 className="text-lg font-bold">{scope.category}</h3>
                </div>
                <div className="p-6">
                  <p className={`${getThemeColor('text.secondary', isDark)} leading-relaxed text-center`}>
                    {scope.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 text-center border ${getThemeColor('border.brand.subtle', isDark)}`}>
            <div className="flex items-center justify-center gap-4 mb-4">
              <Building2 className={`w-8 h-8 ${colors.brand.primary.text}`} />
              <h3 className={`text-2xl font-bold ${colors.brand.gradient.text}`}>83 Total Locations</h3>
            </div>
            <p className={`${getThemeColor('text.secondary', isDark)}`}>
              Complete audit coverage ensuring financial administration compliance across the entire NYSC network
            </p>
          </div>
        </div>

        {/* Key Responsibilities */}
        <div className="mb-12">
          <h2 className={`text-2xl font-bold text-center mb-8 ${colors.brand.gradient.text}`}>
            Core Audit Functions
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyResponsibilities.map((responsibility, index) => {
              const Icon = responsibility.icon;
              return (
                <div 
                  key={index}
                  className={`${getThemeColor('card.glassy', isDark)} rounded-xl p-6 border ${getThemeColor('border.subtle', isDark)} ${colors.effects.glow.subtle} transition-all duration-300 hover:scale-[1.02]`}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                    {responsibility.title}
                  </h3>
                  <p className={`text-sm ${getThemeColor('text.secondary', isDark)} leading-relaxed`}>
                    {responsibility.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Audit Process */}
        <div className="mb-12">
          <h2 className={`text-2xl font-bold text-center mb-8 ${colors.brand.gradient.text}`}>
            Systematic Audit Process
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {auditProcess.map((process, index) => (
              <div 
                key={index}
                className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 border ${getThemeColor('border.brand.subtle', isDark)} relative`}
              >
                <div className={`absolute -top-4 left-6 w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg`}>
                  {process.step}
                </div>
                <div className="mt-4">
                  <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                    {process.title}
                  </h3>
                  <p className={`text-sm ${getThemeColor('text.secondary', isDark)} mb-3 leading-relaxed`}>
                    {process.description}
                  </p>
                  <div className={`px-3 py-1 rounded-full ${colors.brand.secondary.bg} text-white text-xs font-semibold inline-block`}>
                    {process.timeline}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Framework */}
        <div className="mb-12">
          <h2 className={`text-2xl font-bold text-center mb-8 ${colors.brand.gradient.text}`}>
            Legal & Regulatory Framework
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {complianceFramework.map((framework, index) => (
              <div 
                key={index}
                className={`${getThemeColor('card.glassy', isDark)} rounded-xl p-6 border ${getThemeColor('border.subtle', isDark)} ${colors.effects.glow.subtle}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex-shrink-0`}>
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-grow">
                    <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                      {framework.regulation}
                    </h3>
                    <p className={`text-sm mb-2 px-2 py-1 rounded-full ${colors.brand.primary.bg} text-white inline-block`}>
                      {framework.sections}
                    </p>
                    <p className={`text-sm ${getThemeColor('text.secondary', isDark)} leading-relaxed`}>
                      {framework.purpose}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Division Structure & Contact */}
        <div className={`${getThemeColor('background.gradient.brand', isDark)} rounded-2xl p-8 border ${getThemeColor('border.brand.subtle', isDark)}`}>
          <h2 className={`text-2xl font-bold text-center mb-8 ${getThemeColor('text.primary', isDark)}`}>
            Division Structure & Contact
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Organizational Structure */}
            <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 border ${getThemeColor('border.brand.subtle', isDark)}`}>
              <h3 className={`text-lg font-bold mb-4 ${getThemeColor('text.primary', isDark)} flex items-center gap-2`}>
                <Users className={`w-6 h-6 ${colors.brand.primary.text}`} />
                Team Structure
              </h3>
              <ul className="space-y-2">
                {contactInfo.departments.map((department, index) => (
                  <li key={index} className={`flex items-center ${getThemeColor('text.secondary', isDark)}`}>
                    <CheckCircle className={`w-4 h-4 mr-3 ${colors.brand.secondary.text} flex-shrink-0`} />
                    <span className="text-sm">{department}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Information */}
            <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 border ${getThemeColor('border.brand.subtle', isDark)}`}>
              <h3 className={`text-lg font-bold mb-4 ${getThemeColor('text.primary', isDark)} flex items-center gap-2`}>
                <MapPin className={`w-6 h-6 ${colors.brand.primary.text}`} />
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Building2 className={`w-5 h-5 ${colors.brand.secondary.text} mt-1 flex-shrink-0`} />
                  <p className={`text-sm ${getThemeColor('text.secondary', isDark)} leading-relaxed`}>
                    {contactInfo.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Statistics */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-4 text-center border ${getThemeColor('border.brand.subtle', isDark)}`}>
              <FileText className={`w-8 h-8 mx-auto mb-2 ${colors.brand.primary.text}`} />
              <p className={`text-2xl font-bold ${colors.brand.gradient.text}`}>Annual</p>
              <p className={`text-sm ${getThemeColor('text.muted', isDark)}`}>Audit Plans</p>
            </div>
            <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-4 text-center border ${getThemeColor('border.brand.subtle', isDark)}`}>
              <Building2 className={`w-8 h-8 mx-auto mb-2 ${colors.brand.secondary.text}`} />
              <p className={`text-2xl font-bold ${colors.brand.gradient.text}`}>83</p>
              <p className={`text-sm ${getThemeColor('text.muted', isDark)}`}>Audit Locations</p>
            </div>
            <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-4 text-center border ${getThemeColor('border.brand.subtle', isDark)}`}>
              <CheckCircle className={`w-8 h-8 mx-auto mb-2 ${colors.brand.primary.text}`} />
              <p className={`text-2xl font-bold ${colors.brand.gradient.text}`}>Monthly</p>
              <p className={`text-sm ${getThemeColor('text.muted', isDark)}`}>Reports</p>
            </div>
            <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-4 text-center border ${getThemeColor('border.brand.subtle', isDark)}`}>
              <Shield className={`w-8 h-8 mx-auto mb-2 ${colors.brand.secondary.text}`} />
              <p className={`text-2xl font-bold ${colors.brand.gradient.text}`}>100%</p>
              <p className={`text-sm ${getThemeColor('text.muted', isDark)}`}>Compliance</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default InternalAuditPage;