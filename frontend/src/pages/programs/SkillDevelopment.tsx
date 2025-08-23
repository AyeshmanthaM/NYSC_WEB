import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor } from '../../config/colors';
import { BookOpen, Wrench, Computer, Briefcase, Users, Award } from 'lucide-react';

const SkillDevelopment = () => {
  const { isDark } = useTheme();

  const programs = [
    {
      icon: Computer,
      title: "IT & Technology",
      description: "Modern computing skills, programming, and digital literacy programs.",
      courses: ["Web Development", "Mobile App Development", "Database Management", "Digital Marketing"]
    },
    {
      icon: Wrench,
      title: "Technical Vocations",
      description: "Hands-on technical skills for various industries and trades.",
      courses: ["Automotive Technology", "Electrical Installation", "Plumbing", "Carpentry"]
    },
    {
      icon: Briefcase,
      title: "Business & Entrepreneurship",
      description: "Business skills and entrepreneurship development programs.",
      courses: ["Business Planning", "Financial Management", "Marketing", "Leadership"]
    },
    {
      icon: Users,
      title: "Soft Skills",
      description: "Communication, leadership, and interpersonal skills development.",
      courses: ["Public Speaking", "Team Leadership", "Project Management", "Critical Thinking"]
    }
  ];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Programs", href: "/programs" },
    { label: "Skill Development" }
  ];

  return (
    <PageLayout 
      title="Skill Development" 
      subtitle="Comprehensive training programs designed to equip Sri Lankan youth with essential skills for the modern workforce."
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Overview */}
        <div className={`mb-16 ${getThemeColor('background.card', isDark)} rounded-2xl p-8 md:p-12`}>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className={`text-3xl font-bold mb-6 ${getThemeColor('text.primary', isDark)}`}>
                Empowering Through Skills
              </h2>
              <p className={`text-lg ${getThemeColor('text.secondary', isDark)} mb-6 leading-relaxed`}>
                Our skill development programs are designed to bridge the gap between education and employment, 
                providing practical skills that are in demand in today's job market.
              </p>
              <p className={`text-lg ${getThemeColor('text.secondary', isDark)} leading-relaxed`}>
                From technical vocations to digital literacy, we offer comprehensive training that prepares 
                youth for successful careers and entrepreneurship opportunities.
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center mr-4">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className={`font-semibold ${getThemeColor('text.primary', isDark)}`}>50+ Courses</p>
                  <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>Diverse skill programs</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-secondary-500 rounded-full flex items-center justify-center mr-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className={`font-semibold ${getThemeColor('text.primary', isDark)}`}>Certified Training</p>
                  <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>Nationally recognized certificates</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className={`font-semibold ${getThemeColor('text.primary', isDark)}`}>Expert Instructors</p>
                  <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>Industry professionals</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Program Categories */}
        <div className="mb-16">
          <h2 className={`text-3xl font-bold text-center mb-12 ${getThemeColor('text.primary', isDark)}`}>
            Program Categories
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programs.map((program, index) => (
              <div 
                key={index} 
                className={`${getThemeColor('background.card', isDark)} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group`}
              >
                <div className="flex justify-center mb-6">
                  <div className="p-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <program.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className={`text-xl font-bold mb-4 text-center ${getThemeColor('text.primary', isDark)}`}>
                  {program.title}
                </h3>
                <p className={`${getThemeColor('text.secondary', isDark)} mb-6 text-center leading-relaxed text-sm`}>
                  {program.description}
                </p>
                <div>
                  <h4 className={`font-semibold mb-3 text-center ${getThemeColor('text.primary', isDark)} text-sm`}>
                    Popular Courses:
                  </h4>
                  <ul className={`space-y-1 ${getThemeColor('text.secondary', isDark)} text-xs`}>
                    {program.courses.map((course, idx) => (
                      <li key={idx} className="flex items-center justify-center">
                        <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                        {course}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center ${getThemeColor('background.secondary', isDark)} rounded-2xl p-8 md:p-12`}>
          <h2 className={`text-3xl font-bold mb-6 ${getThemeColor('text.primary', isDark)}`}>
            Start Your Learning Journey
          </h2>
          <p className={`text-lg ${getThemeColor('text.secondary', isDark)} mb-8 max-w-3xl mx-auto leading-relaxed`}>
            Take the first step towards building valuable skills that will enhance your career prospects 
            and open doors to new opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center px-8 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors">
              Browse Courses
            </button>
            <button className={`inline-flex items-center px-8 py-3 border-2 border-primary-500 text-primary-500 rounded-lg font-semibold hover:bg-primary-500 hover:text-white transition-all`}>
              Contact Centers
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SkillDevelopment;