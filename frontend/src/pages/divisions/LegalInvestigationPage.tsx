import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor, colors } from '../../config/colors';
import { Scale, User, Building2, Shield, FileText, Users, CheckCircle, Gavel } from 'lucide-react';
import { useTranslationWithNamespace } from '../../hooks/useTranslationWithNamespace';

const LegalInvestigationPage = () => {
  const { isDark } = useTheme();
  const { t, ready } = useTranslationWithNamespace('divisions');

  const courtsRepresented = [
    { name: "Supreme Court", level: "Apex", jurisdiction: "Constitutional & Final Appeals" },
    { name: "Appeal Court", level: "Appellate", jurisdiction: "Civil & Criminal Appeals" },
    { name: "Civil Appeal Court", level: "Appellate", jurisdiction: "Civil Matter Appeals" },
    { name: "High Court", level: "Superior", jurisdiction: "Serious Criminal & Civil Cases" },
    { name: "Regional Court", level: "District", jurisdiction: "Regional Civil & Criminal Matters" },
    { name: "Magistrate Court", level: "Local", jurisdiction: "Minor Offences & Preliminary Inquiries" },
    { name: "Labour Tribunal", level: "Specialized", jurisdiction: "Employment Disputes" },
    { name: "Labour Compensation Court", level: "Specialized", jurisdiction: "Workers' Compensation Claims" }
  ];

  const legalInstitutions = [
    {
      name: "Human Rights Commission",
      role: "Rights Protection",
      description: "Ensuring NYSC operations comply with human rights standards"
    },
    {
      name: "Ombudsman's Office",
      role: "Administrative Justice",
      description: "Addressing administrative complaints and procedural fairness"
    },
    {
      name: "Bribery Commission",
      role: "Anti-Corruption",
      description: "Maintaining organizational integrity and transparency"
    },
    {
      name: "Labour Commissioner's Department",
      role: "Employment Law",
      description: "Compliance with employment regulations and labor standards"
    },
    {
      name: "Criminal Investigation Department",
      role: "Criminal Matters",
      description: "Coordinating on criminal investigation matters affecting NYSC"
    }
  ];

  const divisionStaff = [
    {
      name: "Mr. Sarath Ukwatta",
      position: "Assistant Director",
      role: "Division Leadership",
      responsibilities: ["Legal strategy", "Court representation", "Staff supervision"]
    },
    {
      name: "Mr. P.D. Rathnasiri",
      position: "District Youth Services Officer",
      role: "Field Operations",
      responsibilities: ["District coordination", "Investigation support", "Compliance monitoring"]
    },
    {
      name: "Mrs. P. Ruvini",
      position: "Management Assistant",
      role: "Administrative Support",
      responsibilities: ["Case documentation", "Administrative coordination", "Report preparation"]
    },
    {
      name: "Mr. W. Ajith Prasad",
      position: "Management Assistant",
      role: "Administrative Support",
      responsibilities: ["Legal documentation", "Process coordination", "Administrative support"]
    },
    {
      name: "Mr. Indika Perera",
      position: "Office Employee",
      role: "Operational Support",
      responsibilities: ["Office operations", "Document management", "General support"]
    }
  ];

  const keyResponsibilities = [
    {
      icon: Gavel,
      title: "Legal Representation",
      description: "Representing NYSC before various courts and legal institutions on behalf of the Chairman and Director General."
    },
    {
      icon: FileText,
      title: "Legal Documentation",
      description: "Conducting written matters, legal discussions, and maintaining comprehensive legal records."
    },
    {
      icon: Shield,
      title: "Disciplinary Investigations",
      description: "Coordinating and conducting disciplinary investigations within the organization."
    },
    {
      icon: Building2,
      title: "Institutional Coordination",
      description: "Organizing pre-planning and post-trust activities with various legal institutions."
    }
  ];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Divisions", href: "/divisions" },
    { label: "Legal Investigation Division" }
  ];

  return (
    <PageLayout 
      title="Legal Investigation Division" 
      subtitle="Ensuring legal compliance, conducting investigations, and representing NYSC interests across multiple courts and legal institutions throughout Sri Lanka."
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Division Overview */}
        <div className={`mb-12 ${getThemeColor('card.glassy', isDark)} rounded-2xl p-8 border ${getThemeColor('border.subtle', isDark)}`}>
          <div className="flex items-center gap-6 mb-8">
            <div className={`p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full ${colors.effects.glow.brand}`}>
              <Scale className="w-12 h-12 text-white" />
            </div>
            <div>
              <h2 className={`text-3xl font-bold ${colors.brand.gradient.text}`}>Legal Investigation Division</h2>
              <p className={`${colors.brand.secondary.text} font-semibold text-lg`}>Justice, Compliance & Investigation</p>
            </div>
          </div>
          <p className={`text-lg ${getThemeColor('text.secondary', isDark)} leading-relaxed max-w-4xl`}>
            The Legal Investigation Division serves as the primary legal arm of NYSC, handling all legal matters, 
            court representations, and disciplinary investigations while ensuring full compliance with Sri Lankan law 
            and maintaining organizational integrity.
          </p>
        </div>

        {/* Key Responsibilities */}
        <div className="mb-12">
          <h2 className={`text-2xl font-bold text-center mb-8 ${colors.brand.gradient.text}`}>
            Core Responsibilities
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyResponsibilities.map((responsibility, index) => {
              const Icon = responsibility.icon;
              return (
                <div 
                  key={index}
                  className={`${getThemeColor('card.glassy', isDark)} rounded-xl p-6 border ${getThemeColor('border.subtle', isDark)} ${colors.effects.glow.subtle} transition-all duration-300 hover:scale-[1.02]`}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4`}>
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

        {/* Courts Represented */}
        <div className="mb-12">
          <h2 className={`text-2xl font-bold text-center mb-8 ${colors.brand.gradient.text}`}>
            Court Representation Network
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courtsRepresented.map((court, index) => {
              const getLevelColor = (level: string) => {
                switch(level) {
                  case 'Apex': return 'from-red-500 to-pink-500';
                  case 'Appellate': return 'from-purple-500 to-indigo-500';
                  case 'Superior': return 'from-blue-500 to-cyan-500';
                  case 'District': return 'from-green-500 to-teal-500';
                  case 'Local': return 'from-orange-500 to-yellow-500';
                  case 'Specialized': return 'from-gray-500 to-gray-600';
                  default: return 'from-blue-500 to-cyan-500';
                }
              };

              return (
                <div 
                  key={index}
                  className={`${getThemeColor('card.primary', isDark)} rounded-xl p-5 border ${getThemeColor('border.brand.subtle', isDark)} transition-all duration-300 hover:scale-[1.02]`}
                >
                  <div className={`w-10 h-10 bg-gradient-to-r ${getLevelColor(court.level)} rounded-lg flex items-center justify-center mb-3`}>
                    <Gavel className="w-5 h-5 text-white" />
                  </div>
                  <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)} text-sm`}>
                    {court.name}
                  </h3>
                  <p className={`text-xs mb-2 px-2 py-1 rounded-full bg-gradient-to-r ${getLevelColor(court.level)} text-white inline-block`}>
                    {court.level}
                  </p>
                  <p className={`text-xs ${getThemeColor('text.secondary', isDark)} leading-relaxed`}>
                    {court.jurisdiction}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legal Institutions */}
        <div className="mb-12">
          <h2 className={`text-2xl font-bold text-center mb-8 ${colors.brand.gradient.text}`}>
            Partner Legal Institutions
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {legalInstitutions.map((institution, index) => (
              <div 
                key={index}
                className={`${getThemeColor('card.glassy', isDark)} rounded-xl p-6 border ${getThemeColor('border.subtle', isDark)} ${colors.effects.glow.subtle} transition-all duration-300 hover:scale-[1.02]`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex-shrink-0`}>
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-grow">
                    <h3 className={`font-bold mb-1 ${getThemeColor('text.primary', isDark)}`}>
                      {institution.name}
                    </h3>
                    <p className={`text-xs mb-2 px-2 py-1 rounded-full ${getThemeColor('badge.brand', isDark)} ${colors.brand.primary.text} inline-block`}>
                      {institution.role}
                    </p>
                    <p className={`text-sm ${getThemeColor('text.secondary', isDark)} leading-relaxed`}>
                      {institution.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Division Staff */}
        <div className="mb-12">
          <h2 className={`text-2xl font-bold text-center mb-8 ${colors.brand.gradient.text}`}>
            Division Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {divisionStaff.map((staff, index) => (
              <div 
                key={index}
                className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 border ${getThemeColor('border.brand.subtle', isDark)} transition-all duration-300 hover:scale-[1.02]`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center`}>
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`font-bold ${getThemeColor('text.primary', isDark)}`}>
                      {staff.name}
                    </h3>
                    <p className={`text-sm ${colors.brand.secondary.text} font-semibold`}>
                      {staff.position}
                    </p>
                    <p className={`text-xs ${getThemeColor('text.muted', isDark)}`}>
                      {staff.role}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className={`text-sm font-semibold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                    Key Responsibilities:
                  </h4>
                  <ul className="space-y-1">
                    {staff.responsibilities.map((responsibility, idx) => (
                      <li key={idx} className={`flex items-center text-xs ${getThemeColor('text.secondary', isDark)}`}>
                        <CheckCircle className={`w-3 h-3 mr-2 ${colors.brand.secondary.text} flex-shrink-0`} />
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact & Statistics */}
        <div className={`${getThemeColor('background.gradient.brand', isDark)} rounded-2xl p-8 border ${getThemeColor('border.brand.subtle', isDark)}`}>
          <h2 className={`text-2xl font-bold text-center mb-8 ${getThemeColor('text.primary', isDark)}`}>
            Legal Services Impact
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 text-center border ${getThemeColor('border.brand.subtle', isDark)}`}>
              <Gavel className={`w-10 h-10 mx-auto mb-3 ${colors.brand.primary.text}`} />
              <p className={`text-3xl font-bold mb-2 ${colors.brand.gradient.text}`}>8</p>
              <h3 className={`font-bold mb-1 ${getThemeColor('text.primary', isDark)}`}>Courts</h3>
              <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>Representation Levels</p>
            </div>
            <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 text-center border ${getThemeColor('border.brand.subtle', isDark)}`}>
              <Building2 className={`w-10 h-10 mx-auto mb-3 ${colors.brand.secondary.text}`} />
              <p className={`text-3xl font-bold mb-2 ${colors.brand.gradient.text}`}>5</p>
              <h3 className={`font-bold mb-1 ${getThemeColor('text.primary', isDark)}`}>Institutions</h3>
              <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>Legal Partnerships</p>
            </div>
            <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 text-center border ${getThemeColor('border.brand.subtle', isDark)}`}>
              <Users className={`w-10 h-10 mx-auto mb-3 ${colors.brand.primary.text}`} />
              <p className={`text-3xl font-bold mb-2 ${colors.brand.gradient.text}`}>5</p>
              <h3 className={`font-bold mb-1 ${getThemeColor('text.primary', isDark)}`}>Staff Members</h3>
              <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>Legal Professionals</p>
            </div>
            <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 text-center border ${getThemeColor('border.brand.subtle', isDark)}`}>
              <Shield className={`w-10 h-10 mx-auto mb-3 ${colors.brand.secondary.text}`} />
              <p className={`text-3xl font-bold mb-2 ${colors.brand.gradient.text}`}>100%</p>
              <h3 className={`font-bold mb-1 ${getThemeColor('text.primary', isDark)}`}>Compliance</h3>
              <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>Legal Standards</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className={`${getThemeColor('text.secondary', isDark)} max-w-3xl mx-auto leading-relaxed`}>
              Ensuring justice, maintaining integrity, and protecting NYSC interests through comprehensive 
              legal services and professional representation across all levels of the Sri Lankan judicial system.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default LegalInvestigationPage;