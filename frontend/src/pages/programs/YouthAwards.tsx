import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor } from '../../config/colors';
import { Award, Trophy, Star, Users, Calendar, FileText } from 'lucide-react';

const YouthAwards = () => {
  const { isDark } = useTheme();

  const awards = [
    {
      icon: Trophy,
      title: "Outstanding Youth Achievement Award",
      description: "Recognizes exceptional contributions to community development, leadership, and social impact.",
      criteria: ["Age 15-29", "Significant community contribution", "Leadership demonstration", "Innovation in approach"],
      deadline: "December 31, 2024"
    },
    {
      icon: Star,
      title: "Youth Innovation Award",
      description: "Celebrates creative solutions to social, environmental, or technological challenges.",
      criteria: ["Original innovation", "Measurable impact", "Scalability potential", "Presentation skills"],
      deadline: "November 30, 2024"
    },
    {
      icon: Users,
      title: "Community Service Excellence Award",
      description: "Honors sustained commitment to volunteerism and community service.",
      criteria: ["Minimum 100 service hours", "Consistent engagement", "Community testimonials", "Project documentation"],
      deadline: "January 15, 2025"
    }
  ];

  const process = [
    {
      step: 1,
      title: "Application Submission",
      description: "Submit your application with required documents through our online portal or district offices."
    },
    {
      step: 2,
      title: "Initial Review",
      description: "Applications are reviewed by district-level committees for eligibility and completeness."
    },
    {
      step: 3,
      title: "Evaluation",
      description: "Qualified applications undergo comprehensive evaluation by expert panels."
    },
    {
      step: 4,
      title: "Selection",
      description: "Final selection by the national awards committee and notification of winners."
    },
    {
      step: 5,
      title: "Recognition",
      description: "Award ceremony and public recognition of achievements at the national level."
    }
  ];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Programs", href: "/programs" },
    { label: "Youth Awards" }
  ];

  return (
    <PageLayout 
      title="Youth Awards" 
      subtitle="Recognizing and celebrating exceptional achievements of Sri Lankan youth across various fields."
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Introduction */}
        <div className={`mb-16 ${getThemeColor('background.card', isDark)} rounded-2xl p-8 md:p-12 text-center`}>
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full">
              <Award className="w-12 h-12 text-white" />
            </div>
          </div>
          <h2 className={`text-3xl font-bold mb-6 ${getThemeColor('text.primary', isDark)}`}>
            Celebrating Youth Excellence
          </h2>
          <p className={`text-lg ${getThemeColor('text.secondary', isDark)} max-w-4xl mx-auto leading-relaxed`}>
            The NYSC Youth Awards program recognizes outstanding young individuals who have made significant 
            contributions to their communities, demonstrated exceptional leadership, or created innovative 
            solutions to societal challenges. These awards inspire and motivate youth to strive for excellence.
          </p>
        </div>

        {/* Award Categories */}
        <div className="mb-16">
          <h2 className={`text-3xl font-bold text-center mb-12 ${getThemeColor('text.primary', isDark)}`}>
            Award Categories
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {awards.map((award, index) => (
              <div 
                key={index} 
                className={`${getThemeColor('background.card', isDark)} rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group`}
              >
                <div className="flex justify-center mb-6">
                  <div className="p-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <award.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className={`text-xl font-bold mb-4 text-center ${getThemeColor('text.primary', isDark)}`}>
                  {award.title}
                </h3>
                <p className={`${getThemeColor('text.secondary', isDark)} mb-6 text-center leading-relaxed`}>
                  {award.description}
                </p>
                
                <div className="mb-6">
                  <h4 className={`font-semibold mb-3 ${getThemeColor('text.primary', isDark)}`}>
                    Eligibility Criteria:
                  </h4>
                  <ul className={`space-y-2 ${getThemeColor('text.secondary', isDark)} text-sm`}>
                    {award.criteria.map((criterion, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {criterion}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className={`flex items-center justify-center text-sm ${getThemeColor('text.primary', isDark)} font-semibold`}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Deadline: {award.deadline}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Process */}
        <div className="mb-16">
          <h2 className={`text-3xl font-bold text-center mb-12 ${getThemeColor('text.primary', isDark)}`}>
            Application Process
          </h2>
          <div className="relative">
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-px top-12 bottom-12 w-0.5 bg-gradient-to-b from-primary-500 to-secondary-500"></div>
            
            <div className="space-y-12">
              {process.map((item, index) => (
                <div key={index} className="relative flex items-center">
                  <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm z-10">
                    {item.step}
                  </div>
                  
                  <div className={`ml-20 md:ml-0 ${index % 2 === 0 ? 'md:mr-8 md:text-right' : 'md:ml-8'} md:w-1/2`}>
                    <div className={`${getThemeColor('background.card', isDark)} rounded-xl p-6 shadow-lg`}>
                      <h3 className={`text-xl font-bold mb-3 ${getThemeColor('text.primary', isDark)}`}>
                        {item.title}
                      </h3>
                      <p className={`${getThemeColor('text.secondary', isDark)} leading-relaxed`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Application Requirements */}
        <div className={`mb-16 ${getThemeColor('background.secondary', isDark)} rounded-2xl p-8 md:p-12`}>
          <h2 className={`text-3xl font-bold text-center mb-8 ${getThemeColor('text.primary', isDark)}`}>
            Required Documents
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className={`text-xl font-semibold mb-4 ${getThemeColor('text.primary', isDark)}`}>
                Personal Documents
              </h3>
              <ul className={`space-y-3 ${getThemeColor('text.secondary', isDark)}`}>
                <li className="flex items-start">
                  <FileText className="w-4 h-4 mt-1 mr-3 text-primary-500 flex-shrink-0" />
                  National Identity Card (copy)
                </li>
                <li className="flex items-start">
                  <FileText className="w-4 h-4 mt-1 mr-3 text-primary-500 flex-shrink-0" />
                  Birth Certificate (copy)
                </li>
                <li className="flex items-start">
                  <FileText className="w-4 h-4 mt-1 mr-3 text-primary-500 flex-shrink-0" />
                  Recent passport-size photographs (2)
                </li>
                <li className="flex items-start">
                  <FileText className="w-4 h-4 mt-1 mr-3 text-primary-500 flex-shrink-0" />
                  Educational certificates
                </li>
              </ul>
            </div>
            <div>
              <h3 className={`text-xl font-semibold mb-4 ${getThemeColor('text.primary', isDark)}`}>
                Supporting Documents
              </h3>
              <ul className={`space-y-3 ${getThemeColor('text.secondary', isDark)}`}>
                <li className="flex items-start">
                  <FileText className="w-4 h-4 mt-1 mr-3 text-secondary-500 flex-shrink-0" />
                  Project documentation or portfolio
                </li>
                <li className="flex items-start">
                  <FileText className="w-4 h-4 mt-1 mr-3 text-secondary-500 flex-shrink-0" />
                  Community recommendation letters (2)
                </li>
                <li className="flex items-start">
                  <FileText className="w-4 h-4 mt-1 mr-3 text-secondary-500 flex-shrink-0" />
                  Evidence of achievements/impact
                </li>
                <li className="flex items-start">
                  <FileText className="w-4 h-4 mt-1 mr-3 text-secondary-500 flex-shrink-0" />
                  Personal statement (500 words)
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center ${getThemeColor('background.card', isDark)} rounded-2xl p-8 md:p-12`}>
          <h2 className={`text-3xl font-bold mb-6 ${getThemeColor('text.primary', isDark)}`}>
            Ready to Apply?
          </h2>
          <p className={`text-lg ${getThemeColor('text.secondary', isDark)} mb-8 max-w-3xl mx-auto leading-relaxed`}>
            Take the first step towards recognition of your achievements. Join the community of exceptional 
            young leaders who are making a difference in Sri Lanka.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center px-8 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors">
              Start Application
            </button>
            <button className={`inline-flex items-center px-8 py-3 border-2 border-primary-500 text-primary-500 rounded-lg font-semibold hover:bg-primary-500 hover:text-white transition-all`}>
              Download Guidelines
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default YouthAwards;