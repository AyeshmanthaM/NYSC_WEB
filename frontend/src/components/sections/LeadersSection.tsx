import { Award, Crown, Building, Shield } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor } from '../../config/colors';

const LeadersSection = () => {
  const { isDark } = useTheme();
  const leaders = [
    {
      name: 'Hon. Sunil Kumara Gamage',
      position: 'Minister',
      program: 'Youth Affairs and Sports',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      achievement: 'Leading national youth development initiatives',
      icon: Crown,
      color: 'from-purple-600 to-purple-700'
    },
    {
      name: 'Hon. Eranga Gunasekara',
      position: 'Deputy Minister',
      program: 'Youth Affairs',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      achievement: 'Supporting ministerial vision and youth empowerment',
      icon: Award,
      color: 'from-blue-600 to-blue-700'
    },
    {
      name: 'Mr. A.H.M.U. Aruna Bandara',
      position: 'Secretary',
      program: 'Administrative Leadership',
      image: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      achievement: 'Overseeing operational excellence and policy implementation',
      icon: Building,
      color: 'from-green-600 to-green-700'
    },
    {
      name: 'Mr. Supun Wijerathna',
      position: 'Chairman/Director General',
      program: 'Strategic Leadership',
      image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      achievement: 'Attorney at Law leading organizational strategy and governance',
      icon: Shield,
      color: 'from-orange-600 to-orange-700'
    }
  ];

  return (
    <section className={`py-20 relative overflow-hidden ${getThemeColor('section', isDark)}`}>
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
            <Award className="w-4 h-4" />
            <span>Leadership Team</span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${getThemeColor('text.primary', isDark)}`}>
            Our Leadership
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${getThemeColor('text.secondary', isDark)}`}>
            Meet the distinguished leaders guiding Sri Lanka's youth development 
            through the National Youth Services Council
          </p>
        </div>

        {/* Leaders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {leaders.map((leader, index) => (
            <div
              key={index}
              className={`group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${getThemeColor('card', isDark)}`}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-1 ${getThemeColor('text.primary', isDark)}`}>
                  {leader.name}
                </h3>
                <p className="font-medium mb-2 text-blue-600 dark:text-blue-400">
                  {leader.position}
                </p>
                <p className={`text-sm mb-3 ${getThemeColor('text.muted', isDark)}`}>
                  {leader.program}
                </p>
                <p className={`font-medium mb-4 ${getThemeColor('text.secondary', isDark)}`}>
                  {leader.achievement}
                </p>
              </div>

              {/* Hover Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${leader.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className={`rounded-2xl p-8 md:p-12 shadow-lg border ${getThemeColor('card', isDark)} ${getThemeColor('border', isDark)}`}>
            <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${getThemeColor('text.primary', isDark)}`}>
              Join NYSC Programs
            </h3>
            <p className={`text-lg mb-6 max-w-2xl mx-auto ${getThemeColor('text.secondary', isDark)}`}>
              Under the guidance of our distinguished leadership team, explore diverse programs designed to empower Sri Lankan youth. 
              Develop skills, build networks, and contribute to national development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className={`bg-gradient-to-r ${getThemeColor('brand.primary', isDark)} hover:bg-gradient-to-r hover:${getThemeColor('brand.primaryHover', isDark)} text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg`}>
                Explore Programs
              </button>
              <button className={`border-2 px-8 py-3 rounded-full font-semibold transition-all duration-300 ${getThemeColor('border', isDark)} ${getThemeColor('text.secondary', isDark)} hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400`}>
                Contact Leadership
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadersSection;