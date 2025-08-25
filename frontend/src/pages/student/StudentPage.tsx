import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor, colors } from '../../config/colors';
import { Link } from 'react-router-dom';
import { Search, GraduationCap, User, BookOpen, ArrowRight, UserPlus } from 'lucide-react';
import { useTranslationWithNamespace } from '../../hooks/useTranslationWithNamespace';

const StudentPage = () => {
  const { isDark } = useTheme();
  const { t, ready } = useTranslationWithNamespace('students');

  const studentServices = [
    {
      icon: Search,
      title: "Find Courses",
      description: "Search and discover vocational training courses available across all NYSC centers.",
      link: "/student/find-courses",
      features: ["Course Search", "Center Locations", "Program Details", "Application Process"]
    },
    {
      icon: UserPlus,
      title: "Students Portal",
      description: "Access your personalized student dashboard for course management and progress tracking.",
      link: "/student/students-portal",
      features: ["Course Management", "Progress Tracking", "Certificates", "Schedule Management"]
    }
  ];

  const quickActions = [
    {
      icon: BookOpen,
      title: "Browse Courses",
      description: "Explore all available vocational training programs",
      action: "browse"
    },
    {
      icon: User,
      title: "Student Login",
      description: "Access your student portal and dashboard",
      action: "login"
    },
    {
      icon: GraduationCap,
      title: "Apply Now",
      description: "Start your application for training programs",
      action: "apply"
    }
  ];

  const stats = [
    { label: "Active Students", value: "15,000+" },
    { label: "Available Courses", value: "200+" },
    { label: "Training Centers", value: "50+" },
    { label: "Success Rate", value: "92%" }
  ];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Student" }
  ];

  return (
    <PageLayout 
      title="Student Services" 
      subtitle="Your gateway to vocational training, skill development, and educational opportunities with NYSC."
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Quick Actions */}
        <div className={`mb-16 ${getThemeColor('card.glassy', isDark)} rounded-2xl p-8 md:p-12 border ${getThemeColor('border.subtle', isDark)}`}>
          <h2 className={`text-3xl font-bold text-center mb-8 ${colors.brand.gradient.text}`}>
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <button key={index} className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 border ${getThemeColor('border.brand.subtle', isDark)} ${colors.hover.shadow.brand} transition-all duration-300 group text-center`}>
                <div className="flex justify-center mb-4">
                  <div className={`p-3 ${colors.brand.gradient.primary} rounded-full group-hover:scale-110 transition-transform duration-300 ${colors.effects.glow.brand}`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>{action.title}</h3>
                <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>{action.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Student Services */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {studentServices.map((service, index) => (
            <Link 
              key={index} 
              to={service.link}
              className={`${getThemeColor('card.glassy', isDark)} rounded-xl p-8 border ${getThemeColor('border.subtle', isDark)} ${colors.effects.glow.subtle} ${colors.hover.shadow.brand} transition-all duration-300 group block`}
            >
              <div className="flex justify-center mb-6">
                <div className={`p-4 ${colors.brand.gradient.primary} rounded-full group-hover:scale-110 transition-transform duration-300 ${colors.effects.glow.brand}`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className={`text-2xl font-bold mb-4 text-center ${getThemeColor('text.primary', isDark)}`}>
                {service.title}
              </h3>
              <p className={`${getThemeColor('text.secondary', isDark)} text-center mb-6 leading-relaxed`}>
                {service.description}
              </p>
              
              {/* Features */}
              <div className="mb-6">
                <h4 className={`font-semibold mb-3 text-center ${getThemeColor('text.primary', isDark)} text-sm`}>
                  Key Features:
                </h4>
                <ul className={`space-y-2 ${getThemeColor('text.secondary', isDark)} text-sm`}>
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center justify-center">
                      <span className={`w-2 h-2 ${colors.brand.secondary.bg} rounded-full mr-3`}></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex justify-center">
                <div className={`flex items-center ${colors.brand.primary.text} ${colors.hover.text.brand} font-semibold`}>
                  Access Now
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Statistics */}
        <div className={`mb-16 ${getThemeColor('background.gradient.brand', isDark)} rounded-2xl p-8 md:p-12 border ${getThemeColor('border.brand.subtle', isDark)}`}>
          <h2 className={`text-3xl font-bold text-center mb-12 ${colors.brand.gradient.text}`}>
            Student Success by Numbers
          </h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className={`text-4xl font-bold mb-2 ${colors.brand.gradient.text}`}>{stat.value}</div>
                <p className={`${getThemeColor('text.secondary', isDark)} font-semibold`}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Student Support */}
        <div className={`text-center ${getThemeColor('card.glassy', isDark)} rounded-2xl p-8 md:p-12 border ${getThemeColor('border.subtle', isDark)}`}>
          <GraduationCap className={`w-16 h-16 mx-auto mb-6 ${colors.brand.primary.text}`} />
          <h2 className={`text-3xl font-bold mb-6 ${colors.brand.gradient.text}`}>
            Student Support Services
          </h2>
          <p className={`text-lg ${getThemeColor('text.secondary', isDark)} mb-8 max-w-3xl mx-auto leading-relaxed`}>
            We provide comprehensive support services to help students succeed in their educational journey, 
            from course selection to career placement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className={`inline-flex items-center px-8 py-3 ${colors.button.primary.base} ${colors.button.primary.hover} ${colors.button.primary.shadow} rounded-lg font-semibold transition-all duration-300`}>
              Get Support
            </button>
            <button className={`inline-flex items-center px-8 py-3 ${colors.button.outline.brand} rounded-lg font-semibold transition-all duration-300`}>
              Contact Advisor
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default StudentPage;