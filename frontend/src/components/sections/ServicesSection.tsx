import { 
  Trophy, 
  Palette, 
  GraduationCap, 
  Award, 
  Globe, 
  Calendar,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor } from '../../config/colors';

const ServicesSection = () => {
  const { isDark } = useTheme();
  const services = [
    {
      icon: Trophy,
      title: 'Sports Programs',
      description: 'Comprehensive athletic development programs for all skill levels',
      color: 'from-blue-500 to-blue-600',
      badge: 'Popular',
      badgeColor: 'bg-blue-100 text-blue-700'
    },
    {
      icon: Palette,
      title: 'Cultural Activities',
      description: 'Preserve and celebrate Sri Lankan heritage through arts and culture',
      color: 'from-pink-500 to-pink-600',
      badge: 'Hot',
      badgeColor: 'bg-pink-100 text-pink-700'
    },
    {
      icon: GraduationCap,
      title: 'Training Centers',
      description: 'Professional skill development and educational opportunities',
      color: 'from-green-500 to-green-600',
      badge: 'Featured',
      badgeColor: 'bg-green-100 text-green-700'
    },
    {
      icon: Award,
      title: 'Youth Awards',
      description: 'Recognition programs for outstanding youth achievements',
      color: 'from-orange-500 to-orange-600',
      badge: 'New',
      badgeColor: 'bg-orange-100 text-orange-700'
    },
    {
      icon: Globe,
      title: 'Global Programs',
      description: 'International exchange and collaboration opportunities',
      color: 'from-purple-500 to-purple-600',
      badge: 'Exclusive',
      badgeColor: 'bg-purple-100 text-purple-700'
    },
    {
      icon: Calendar,
      title: 'Event Calendar',
      description: 'Stay updated with upcoming events and activities',
      color: 'from-teal-500 to-teal-600',
      badge: 'Updated',
      badgeColor: 'bg-teal-100 text-teal-700'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-transparent dark:from-blue-900/20 rounded-full -translate-x-32 -translate-y-32" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-orange-100 to-transparent dark:from-orange-900/20 rounded-full translate-x-48 translate-y-48" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
            <Sparkles className="w-4 h-4" />
            <span>Our Services</span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${getThemeColor('text.primary', isDark)}`}>
            Discover Your Path
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${getThemeColor('text.secondary', isDark)}`}>
            Explore our comprehensive range of programs designed to empower youth, 
            build skills, and create lasting positive impact in communities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border ${getThemeColor('card', isDark)} ${getThemeColor('border', isDark)} ${getThemeColor('hover', isDark)}`}
            >
              {/* Badge */}
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${service.badgeColor}`}>
                {service.badge}
              </div>

              {/* Icon Container */}
              <div className="relative mb-6">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${service.color} text-white rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8" />
                </div>
                <div className={`absolute inset-0 w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
              </div>

              {/* Content */}
              <h3 className={`text-xl font-bold mb-3 ${getThemeColor('text.primary', isDark)} group-hover:text-opacity-90`}>
                {service.title}
              </h3>
              
              <p className={`mb-6 leading-relaxed ${getThemeColor('text.secondary', isDark)}`}>
                {service.description}
              </p>

              {/* CTA Button */}
              <button className={`group/btn inline-flex items-center space-x-2 font-medium transition-colors duration-300 ${getThemeColor('text.secondary', isDark)} hover:text-blue-600 dark:hover:text-blue-400`}>
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </button>

              {/* Hover Effect Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
              
              {/* Bottom Accent */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className={`bg-gradient-to-r ${getThemeColor('brand.primary', isDark)} rounded-2xl p-8 md:p-12 text-white`}>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Join thousands of young Sri Lankans who are building their future through NYSC programs. 
              Your journey to personal and professional growth starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg">
                Browse All Programs
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;