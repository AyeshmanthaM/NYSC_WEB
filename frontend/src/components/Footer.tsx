import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin,
  ArrowRight,
  Heart
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeColor } from '../config/colors';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { isDark } = useTheme();

  const quickLinks = [
    'About NYSC',
    'Programs',
    'Youth Clubs',
    'Downloads',
    'Annual Reports',
    'Contact Us'
  ];

  const programs = [
    'Sports Excellence',
    'Cultural Activities',
    'Leadership Training',
    'Community Service',
    'Skill Development',
    'Youth Awards'
  ];

  return (
    <footer className={`relative overflow-hidden w-full max-w-full ${getThemeColor('section', isDark)} ${getThemeColor('text.primary', isDark)}`}>
      

      <div className="container mx-auto px-4 pt-24 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:pr-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className={`w-14 h-14 bg-gradient-to-br ${getThemeColor('brand.primary', isDark)} rounded-full flex items-center justify-center shadow-xl`}>
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <span className={`font-bold text-2xl ${getThemeColor('text.primary', isDark)}`}>
                NYSC
              </span>
            </div>
            
            <p className={`mb-4 leading-relaxed text-lg font-semibold ${getThemeColor('text.secondary', isDark)}`}>
              Empowering Youth Since 1972
            </p>
            
            <p className={`text-sm mb-6 ${getThemeColor('text.muted', isDark)}`}>
              Building stronger communities through youth development, leadership training, 
              and positive social impact across Sri Lanka.
            </p>
            
            {/* Social Media with Modern Design */}
            <div className="flex space-x-4">
              {[
                { icon: '📘', color: 'hover:bg-blue-500' },
                { icon: '🐦', color: 'hover:bg-blue-400' },
                { icon: '📷', color: 'hover:bg-pink-500' },
                { icon: '📺', color: 'hover:bg-red-500' }
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className={`w-12 h-12 ${getThemeColor('card', isDark)} ${getThemeColor('hover', isDark)} rounded-full flex items-center justify-center ${getThemeColor('text.muted', isDark)} ${social.color} hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg`}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`text-lg font-bold mb-6 ${getThemeColor('text.primary', isDark)}`}>Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className={`${getThemeColor('text.muted', isDark)} hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2 group`}
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                    <span>{link}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className={`text-lg font-bold mb-6 ${getThemeColor('text.primary', isDark)}`}>Programs</h3>
            <ul className="space-y-3">
              {programs.map((program, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className={`${getThemeColor('text.muted', isDark)} hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300 flex items-center space-x-2 group`}
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                    <span>{program}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className={`text-lg font-bold mb-6 ${getThemeColor('text.primary', isDark)}`}>Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className={`font-medium ${getThemeColor('text.secondary', isDark)}`}>
                    info@nysc.lk
                  </p>
                  <p className={`text-sm ${getThemeColor('text.muted', isDark)}`}>
                    General inquiries
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className={`font-medium ${getThemeColor('text.secondary', isDark)}`}>
                    +94 11 234 5678
                  </p>
                  <p className={`text-sm ${getThemeColor('text.muted', isDark)}`}>
                    Mon - Fri, 8:00 AM - 5:00 PM
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className={`font-medium ${getThemeColor('text.secondary', isDark)}`}>
                    123 Youth Plaza
                  </p>
                  <p className={`${getThemeColor('text.muted', isDark)}`}>
                    Colombo 07, Sri Lanka
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Bottom Bar */}
        <div className={`border-t ${getThemeColor('border', isDark)} pt-8 flex flex-col sm:flex-row justify-between items-center gap-4`}>
          <p className={`text-sm ${getThemeColor('text.muted', isDark)}`}>
            © {currentYear} National Youth Service Council. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-6">
            <a href="#" className={`text-sm ${getThemeColor('text.muted', isDark)} hover:text-blue-600 dark:hover:text-blue-400 transition-colors`}>
              Privacy Policy
            </a>
            <a href="#" className={`text-sm ${getThemeColor('text.muted', isDark)} hover:text-blue-600 dark:hover:text-blue-400 transition-colors`}>
              Terms of Service
            </a>
            <a href="#" className={`text-sm ${getThemeColor('text.muted', isDark)} hover:text-blue-600 dark:hover:text-blue-400 transition-colors`}>
              Sitemap
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;