import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor } from '../../config/colors';

const Leadership = () => {
  const { isDark } = useTheme();

  const leaders = [
    {
      name: "Hon. Aruna Bandara",
      position: "Minister of Youth Affairs and Sports",
      image: "/images/leaders/aruna-bandara.jpg",
      bio: "Leading Sri Lanka's youth development initiatives with vision and dedication."
    },
    {
      name: "Mr. Eranga Gunasekara",
      position: "Secretary of Ministry of Youth Affairs and Sports",
      image: "/images/leaders/eranga-gunasekara.jpg",
      bio: "Overseeing strategic implementation of youth programs across the nation."
    },
    {
      name: "Mr. Sunil Kumara Gamage",
      position: "Director General, National Youth Services Council",
      image: "/images/leaders/sunil-kumara-gamage.jpg",
      bio: "Driving innovation in youth services and community development programs."
    },
    {
      name: "Mr. Supun Wijerathna",
      position: "Additional Secretary, Youth Affairs",
      image: "/images/leaders/supun-wijerathna.jpg",
      bio: "Coordinating youth affairs and ensuring effective program delivery."
    }
  ];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "About NYSC", href: "/about" },
    { label: "Leadership" }
  ];

  return (
    <PageLayout 
      title="Leadership" 
      subtitle="Meet the visionary leaders driving Sri Lanka's youth development initiatives forward."
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {leaders.map((leader, index) => (
            <div 
              key={index} 
              className={`${getThemeColor('background.card', isDark)} rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-primary-500 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                  {leader.name}
                </h3>
                <p className={`text-primary-600 font-semibold mb-4`}>
                  {leader.position}
                </p>
                <p className={`${getThemeColor('text.secondary', isDark)} leading-relaxed`}>
                  {leader.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className={`mt-16 ${getThemeColor('background.secondary', isDark)} rounded-2xl p-8 md:p-12`}>
          <h2 className={`text-3xl font-bold mb-6 text-center ${getThemeColor('text.primary', isDark)}`}>
            Our Leadership Vision
          </h2>
          <p className={`text-lg ${getThemeColor('text.secondary', isDark)} text-center max-w-4xl mx-auto leading-relaxed`}>
            Under the guidance of our distinguished leaders, the National Youth Services Council continues to 
            empower Sri Lankan youth through comprehensive programs in education, skills development, sports, 
            cultural activities, and community service. Together, we build a stronger, more capable generation 
            ready to lead Sri Lanka into the future.
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default Leadership;