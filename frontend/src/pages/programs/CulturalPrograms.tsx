import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor } from '../../config/colors';
import { Music, Palette, Theater, Camera } from 'lucide-react';

const CulturalPrograms = () => {
  const { isDark } = useTheme();

  const programs = [
    {
      icon: Music,
      title: "Music & Dance",
      description: "Traditional and contemporary music and dance programs celebrating Sri Lankan heritage.",
      activities: ["Classical Dance", "Folk Music", "Modern Dance", "Instrumental Training"]
    },
    {
      icon: Theater,
      title: "Drama & Theatre",
      description: "Dramatic arts programs fostering creativity and cultural expression.",
      activities: ["Stage Drama", "Street Theatre", "Scriptwriting", "Acting Workshops"]
    },
    {
      icon: Palette,
      title: "Visual Arts",
      description: "Artistic expression through various visual mediums and traditional crafts.",
      activities: ["Painting", "Sculpture", "Traditional Crafts", "Digital Art"]
    },
    {
      icon: Camera,
      title: "Media Arts",
      description: "Modern media and digital content creation skills for the digital age.",
      activities: ["Photography", "Videography", "Content Creation", "Graphic Design"]
    }
  ];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Programs", href: "/programs" },
    { label: "Cultural Programs" }
  ];

  return (
    <PageLayout 
      title="Cultural Programs" 
      subtitle="Preserving and promoting Sri Lankan cultural heritage while fostering creative expression among youth."
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Cultural Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
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
              <ul className={`space-y-2 ${getThemeColor('text.secondary', isDark)} text-xs`}>
                {program.activities.map((activity, idx) => (
                  <li key={idx} className="flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Featured Section */}
        <div className={`${getThemeColor('background.secondary', isDark)} rounded-2xl p-8 md:p-12 text-center`}>
          <h2 className={`text-3xl font-bold mb-6 ${getThemeColor('text.primary', isDark)}`}>
            Cultural Heritage & Modern Expression
          </h2>
          <p className={`text-lg ${getThemeColor('text.secondary', isDark)} mb-8 max-w-4xl mx-auto leading-relaxed`}>
            Our cultural programs bridge the gap between traditional Sri Lankan arts and contemporary creative expression, 
            helping youth appreciate their heritage while developing modern artistic skills.
          </p>
          <button className="inline-flex items-center px-8 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors">
            Join Cultural Programs
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default CulturalPrograms;