import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor, colors } from '../../config/colors';
import { DollarSign, User, FileText, PieChart, TrendingUp, AlertCircle, CheckCircle, Calendar, Building2, Target } from 'lucide-react';

const FinancePage = () => {
  const { isDark } = useTheme();

  const keyFunctions = [
    {
      icon: FileText,
      title: "Treasury Operations",
      description: "Disbursing Recurrent and Capital receipts from General Treasury and managing internal revenue sources."
    },
    {
      icon: PieChart,
      title: "Financial Reporting",
      description: "Preparing quarterly financial reports and submitting year-end accounts to Auditor General by February 28th."
    },
    {
      icon: Building2,
      title: "Asset Management",
      description: "Managing asset acquisition, maintenance, development, and calculating Annual Assets for the organization."
    },
    {
      icon: TrendingUp,
      title: "Budget Control",
      description: "Processing salaries, recurrent expenses, and monitoring delegated authority within organizational structure."
    }
  ];

  const financialProvisions = [
    {
      source: "General Treasury",
      description: "Primary funding source for recurrent and capital expenditures",
      type: "External"
    },
    {
      source: "Internal Revenue",
      description: "Revenue generated through NYSC services and programs",
      type: "Internal"
    }
  ];

  const reportingSchedule = [
    { period: "Monthly", reports: ["Cash Book Records", "Revenue Collections"], timeline: "5th of each month" },
    { period: "Quarterly", reports: ["Financial Reports", "Treasury Submissions"], timeline: "15th after quarter" },
    { period: "Annual", reports: ["Final Accounts", "Auditor General Report"], timeline: "February 28th" }
  ];

  const complianceFramework = [
    "National Youth Services Act No. 69 of 1979",
    "Finance Act No. 38 of 1971",
    "Financial Regulations",
    "Establishment Code",
    "General Treasury Circulars"
  ];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Divisions", href: "/divisions" },
    { label: "Finance Division" }
  ];

  return (
    <PageLayout 
      title="Finance Division" 
      subtitle="Managing financial operations with accountability, transparency, and compliance to governmental regulations while supporting youth development activities."
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Division Overview */}
        <div className={`mb-12 ${getThemeColor('card.glassy', isDark)} rounded-2xl p-8 border ${getThemeColor('border.subtle', isDark)}`}>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full ${colors.effects.glow.brand}`}>
                  <DollarSign className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className={`text-3xl font-bold ${colors.brand.gradient.text}`}>Finance Division</h2>
                  <p className={`${colors.brand.secondary.text} font-semibold`}>Financial Excellence & Compliance</p>
                </div>
              </div>
              <p className={`text-lg ${getThemeColor('text.secondary', isDark)} leading-relaxed`}>
                The Finance Division operates under the National Youth Services Act No. 69 of 1979 and 
                follows the Finance Act No. 38 of 1971, ensuring financial accountability and transparency 
                in all NYSC operations.
              </p>
            </div>

            {/* Leadership Section */}
            <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 border ${getThemeColor('border.brand.subtle', isDark)}`}>
              <h3 className={`text-lg font-bold mb-4 ${getThemeColor('text.primary', isDark)}`}>Division Leadership</h3>
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center`}>
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className={`font-bold ${getThemeColor('text.primary', isDark)}`}>Mr. H.M.C.G. Dayarathne</h4>
                  <p className={`${colors.brand.secondary.text} font-semibold`}>Director of Finance</p>
                  <p className={`text-sm ${getThemeColor('text.muted', isDark)}`}>Financial Operations Leader</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Functions */}
        <div className="mb-12">
          <h2 className={`text-2xl font-bold text-center mb-8 ${colors.brand.gradient.text}`}>
            Core Financial Functions
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyFunctions.map((func, index) => {
              const Icon = func.icon;
              return (
                <div 
                  key={index}
                  className={`${getThemeColor('card.glassy', isDark)} rounded-xl p-6 border ${getThemeColor('border.subtle', isDark)} ${colors.effects.glow.subtle} transition-all duration-300 hover:scale-[1.02]`}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                    {func.title}
                  </h3>
                  <p className={`text-sm ${getThemeColor('text.secondary', isDark)} leading-relaxed`}>
                    {func.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Financial Provisions */}
        <div className="mb-12">
          <h2 className={`text-2xl font-bold text-center mb-8 ${colors.brand.gradient.text}`}>
            Revenue Sources
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {financialProvisions.map((provision, index) => (
              <div 
                key={index}
                className={`${getThemeColor('card.glassy', isDark)} rounded-xl p-6 border ${getThemeColor('border.subtle', isDark)} ${colors.effects.glow.subtle}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 ${provision.type === 'External' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gradient-to-r from-orange-500 to-yellow-500'} rounded-lg flex-shrink-0`}>
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className={`font-bold ${getThemeColor('text.primary', isDark)}`}>
                        {provision.source}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${provision.type === 'External' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                        {provision.type}
                      </span>
                    </div>
                    <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                      {provision.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reporting Schedule */}
        <div className="mb-12">
          <h2 className={`text-2xl font-bold text-center mb-8 ${colors.brand.gradient.text}`}>
            Financial Reporting Schedule
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {reportingSchedule.map((schedule, index) => (
              <div 
                key={index}
                className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 border ${getThemeColor('border.brand.subtle', isDark)}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className={`w-6 h-6 ${colors.brand.primary.text}`} />
                  <h3 className={`font-bold ${getThemeColor('text.primary', isDark)}`}>
                    {schedule.period} Reports
                  </h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className={`text-sm font-semibold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                      Report Types:
                    </h4>
                    <ul className="space-y-1">
                      {schedule.reports.map((report, idx) => (
                        <li key={idx} className={`flex items-center text-sm ${getThemeColor('text.secondary', isDark)}`}>
                          <CheckCircle className={`w-3 h-3 mr-2 ${colors.brand.secondary.text}`} />
                          {report}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={`pt-2 border-t ${getThemeColor('border.subtle', isDark)}`}>
                    <p className={`text-xs ${getThemeColor('text.muted', isDark)}`}>
                      <strong>Timeline:</strong> {schedule.timeline}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Framework */}
        <div className={`${getThemeColor('background.gradient.brand', isDark)} rounded-2xl p-8 border ${getThemeColor('border.brand.subtle', isDark)}`}>
          <h2 className={`text-2xl font-bold text-center mb-8 ${getThemeColor('text.primary', isDark)}`}>
            Legal & Regulatory Compliance
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className={`text-center mb-8 ${getThemeColor('text.secondary', isDark)}`}>
              The Finance Division operates under strict adherence to national legislation and financial regulations.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {complianceFramework.map((framework, index) => (
                <div 
                  key={index}
                  className={`${getThemeColor('card.primary', isDark)} rounded-xl p-4 border ${getThemeColor('border.brand.subtle', isDark)} flex items-center gap-3`}
                >
                  <AlertCircle className={`w-5 h-5 ${colors.brand.primary.text} flex-shrink-0`} />
                  <span className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                    {framework}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className={`text-sm ${getThemeColor('text.muted', isDark)}`}>
                All financial operations are conducted with full transparency and accountability 
                to support the youth development mission of NYSC.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default FinancePage;