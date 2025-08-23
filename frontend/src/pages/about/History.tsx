import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor } from '../../config/colors';

const History = () => {
  const { isDark } = useTheme();

  const milestones = [
    {
      year: "1963",
      title: "Foundation of NYSC",
      description: "The National Youth Services Council was established to coordinate and promote youth development activities across Sri Lanka."
    },
    {
      year: "1975",
      title: "Expansion of Services",
      description: "Introduction of vocational training programs and establishment of regional youth centers in all 25 districts."
    },
    {
      year: "1985",
      title: "Youth Parliament Initiative",
      description: "Launch of the Youth Parliament program to engage young people in democratic processes and governance."
    },
    {
      year: "1995",
      title: "International Cooperation",
      description: "Establishment of international youth exchange programs and partnerships with global youth organizations."
    },
    {
      year: "2005",
      title: "Digital Transformation",
      description: "Introduction of digital platforms and online services to better serve the tech-savvy generation."
    },
    {
      year: "2015",
      title: "Modernization Program",
      description: "Comprehensive modernization of facilities and programs to align with contemporary youth needs."
    },
    {
      year: "2020",
      title: "Pandemic Adaptation",
      description: "Rapid adaptation to provide virtual programs and support during the COVID-19 pandemic."
    },
    {
      year: "2024",
      title: "Digital Excellence",
      description: "Launch of the new digital platform and enhanced online services for modern youth engagement."
    }
  ];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "About NYSC", href: "/about" },
    { label: "Our History" }
  ];

  return (
    <PageLayout 
      title="Our History" 
      subtitle="Six decades of empowering Sri Lankan youth and building a stronger nation through dedicated service."
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Introduction */}
        <div className={`mb-16 ${getThemeColor('background.card', isDark)} rounded-2xl p-8 md:p-12`}>
          <h2 className={`text-3xl font-bold mb-6 ${getThemeColor('text.primary', isDark)}`}>
            A Legacy of Youth Empowerment
          </h2>
          <p className={`text-lg ${getThemeColor('text.secondary', isDark)} mb-6 leading-relaxed`}>
            For over six decades, the National Youth Services Council has been at the forefront of youth development 
            in Sri Lanka. From humble beginnings in 1963, we have grown to become the nation's premier organization 
            dedicated to empowering young people through education, skills training, sports, cultural activities, 
            and community service.
          </p>
          <p className={`text-lg ${getThemeColor('text.secondary', isDark)} leading-relaxed`}>
            Our journey reflects the evolution of Sri Lankan society itself, adapting to changing times while 
            maintaining our core commitment to nurturing the potential of every young person in our nation.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-gradient-to-b from-primary-500 to-secondary-500"></div>
          
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-white shadow-lg z-10"></div>
                
                {/* Content card */}
                <div className={`ml-12 md:ml-0 ${index % 2 === 0 ? 'md:mr-8 md:text-right' : 'md:ml-8'} md:w-1/2`}>
                  <div className={`${getThemeColor('background.card', isDark)} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group`}>
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4 ${getThemeColor('background.accent', isDark)} text-white`}>
                      {milestone.year}
                    </div>
                    <h3 className={`text-xl font-bold mb-3 ${getThemeColor('text.primary', isDark)}`}>
                      {milestone.title}
                    </h3>
                    <p className={`${getThemeColor('text.secondary', isDark)} leading-relaxed`}>
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Looking Forward */}
        <div className={`mt-16 text-center ${getThemeColor('background.secondary', isDark)} rounded-2xl p-8 md:p-12`}>
          <h2 className={`text-3xl font-bold mb-6 ${getThemeColor('text.primary', isDark)}`}>
            Looking Forward
          </h2>
          <p className={`text-lg ${getThemeColor('text.secondary', isDark)} max-w-4xl mx-auto leading-relaxed`}>
            As we move forward, NYSC remains committed to innovation and excellence in youth development. 
            We continue to adapt our programs and services to meet the evolving needs of Sri Lankan youth, 
            preparing them for the challenges and opportunities of the 21st century.
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default History;