import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor } from '../../config/colors';
import { User, BookOpen, Award, Calendar, BarChart, Settings } from 'lucide-react';
import { useTranslationWithNamespace } from '../../hooks/useTranslationWithNamespace';

const StudentPortal = () => {
  const { isDark } = useTheme();
  const { t, ready } = useTranslationWithNamespace('students');

  const portalFeatures = [
    {
      icon: BookOpen,
      title: "Course Management",
      description: "View enrolled courses, track progress, and access learning materials"
    },
    {
      icon: Award,
      title: "Certificates & Awards",
      description: "Download certificates and view your achievement records"
    },
    {
      icon: Calendar,
      title: "Schedule & Events",
      description: "Manage your class schedule and register for upcoming events"
    },
    {
      icon: BarChart,
      title: "Progress Tracking",
      description: "Monitor your learning progress with detailed analytics"
    },
    {
      icon: User,
      title: "Profile Management",
      description: "Update your personal information and account settings"
    },
    {
      icon: Settings,
      title: "Preferences",
      description: "Customize your learning experience and notification settings"
    }
  ];

  const quickStats = [
    { label: "Active Students", value: "15,000+" },
    { label: "Completed Courses", value: "45,000+" },
    { label: "Certificates Issued", value: "32,000+" },
    { label: "Success Rate", value: "92%" }
  ];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Resources", href: "/resources" },
    { label: "Student Portal" }
  ];

  return (
    <PageLayout 
      title="Student Portal" 
      subtitle="Access your personalized learning dashboard to track progress, manage courses, and download certificates."
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Login Section */}
        <div className={`mb-16 ${getThemeColor('background.card', isDark)} rounded-2xl p-8 md:p-12`}>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className={`text-3xl font-bold mb-6 ${getThemeColor('text.primary', isDark)}`}>
                Access Your Learning Dashboard
              </h2>
              <p className={`text-lg ${getThemeColor('text.secondary', isDark)} mb-8 leading-relaxed`}>
                Login to your student portal to access course materials, track your progress, 
                and manage your learning journey with NYSC.
              </p>
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                {quickStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-primary-500 mb-1">{stat.value}</div>
                    <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={`${getThemeColor('background.secondary', isDark)} rounded-xl p-8`}>
              <h3 className={`text-xl font-bold mb-6 text-center ${getThemeColor('text.primary', isDark)}`}>
                Student Login
              </h3>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${getThemeColor('text.primary', isDark)}`}>
                    Student ID or Email
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your student ID or email"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${getThemeColor('background.input', isDark)}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${getThemeColor('text.primary', isDark)}`}>
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${getThemeColor('background.input', isDark)}`}
                  />
                </div>
                <button className="w-full px-4 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors">
                  Login to Portal
                </button>
                <div className="text-center space-y-2">
                  <a href="#" className="text-primary-500 hover:text-primary-600 text-sm font-medium">
                    Forgot Password?
                  </a>
                  <br />
                  <a href="#" className="text-primary-500 hover:text-primary-600 text-sm font-medium">
                    New Student? Register Here
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Portal Features */}
        <div className="mb-16">
          <h2 className={`text-3xl font-bold text-center mb-12 ${getThemeColor('text.primary', isDark)}`}>
            Portal Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portalFeatures.map((feature, index) => (
              <div key={index} className={`${getThemeColor('background.card', isDark)} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group text-center`}>
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className={`text-lg font-bold mb-3 ${getThemeColor('text.primary', isDark)}`}>
                  {feature.title}
                </h3>
                <p className={`${getThemeColor('text.secondary', isDark)} text-sm leading-relaxed`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* System Requirements */}
        <div className={`${getThemeColor('background.secondary', isDark)} rounded-2xl p-8 md:p-12`}>
          <h2 className={`text-3xl font-bold text-center mb-8 ${getThemeColor('text.primary', isDark)}`}>
            System Requirements & Support
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className={`text-xl font-semibold mb-4 ${getThemeColor('text.primary', isDark)}`}>
                Technical Requirements
              </h3>
              <ul className={`space-y-2 ${getThemeColor('text.secondary', isDark)}`}>
                <li>• Modern web browser (Chrome, Firefox, Safari, Edge)</li>
                <li>• Stable internet connection (minimum 1 Mbps)</li>
                <li>• JavaScript enabled</li>
                <li>• PDF reader for downloading certificates</li>
                <li>• Mobile responsive (works on phones and tablets)</li>
              </ul>
            </div>
            <div>
              <h3 className={`text-xl font-semibold mb-4 ${getThemeColor('text.primary', isDark)}`}>
                Need Help?
              </h3>
              <ul className={`space-y-2 ${getThemeColor('text.secondary', isDark)}`}>
                <li>• Email: support@nysc.gov.lk</li>
                <li>• Phone: +94 11 269 1234</li>
                <li>• Help Desk: Monday - Friday, 8:30 AM - 4:30 PM</li>
                <li>• User Guide: Available after login</li>
                <li>• Video Tutorials: Interactive help section</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default StudentPortal;