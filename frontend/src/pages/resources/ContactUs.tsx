import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, User, MessageSquare } from 'lucide-react';
import { useLanguage } from '../../contexts/CompatibilityLanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { colors, getThemeColor } from '../../config/colors';

const ContactUs: React.FC = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    category: 'general'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+94 11 234 5678', '+94 11 234 5679'],
      description: 'Available Monday to Friday, 8:30 AM - 4:30 PM'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@nysc.gov.lk', 'programs@nysc.gov.lk'],
      description: 'We respond within 24 hours'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: ['National Youth Services Council', 'No. 456, Galle Road, Colombo 03, Sri Lanka'],
      description: 'Visit us during office hours'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: ['Monday - Friday: 8:30 AM - 4:30 PM', 'Saturday: 8:30 AM - 12:30 PM'],
      description: 'Closed on Sundays and public holidays'
    }
  ];

  const categories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'programs', label: 'Programs & Training' },
    { value: 'registration', label: 'Registration' },
    { value: 'events', label: 'Events' },
    { value: 'complaints', label: 'Complaints' },
    { value: 'media', label: 'Media Inquiries' }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? getThemeColor('background.primary', true) : getThemeColor('background.primary', false)
    }`}>
      {/* Hero Section */}
      <div className={`relative py-16 lg:py-24 ${
        isDark ? colors.background.gradient.dark : colors.background.gradient.light
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className={`p-4 rounded-full ${
                isDark ? 'bg-green-500/20' : 'bg-green-100'
              }`}>
                <Phone className={`w-12 h-12 ${
                  isDark ? 'text-green-300' : 'text-green-600'
                }`} />
              </div>
            </div>
            <h1 className={`text-4xl lg:text-6xl font-bold mb-6 ${
              isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
            }`}>
              Contact Us
            </h1>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
            }`}>
              Get in touch with NYSC for information about our programs, services, or to share your feedback. We're here to help!
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h2 className={`text-2xl font-bold mb-8 ${
              isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
            }`}>
              Get In Touch
            </h2>
            
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <div key={index} className={`p-6 rounded-lg border ${
                    isDark 
                      ? `${getThemeColor('background.secondary', true)} ${colors.border.subtle.dark}`
                      : `${getThemeColor('background.secondary', false)} ${colors.border.subtle.light}`
                  }`}>
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${
                        isDark ? 'bg-orange-500/20' : 'bg-orange-100'
                      }`}>
                        <IconComponent className={`w-6 h-6 ${
                          isDark ? 'text-orange-300' : 'text-orange-600'
                        }`} />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className={`font-bold mb-2 ${
                          isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                        }`}>
                          {info.title}
                        </h3>
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className={`text-sm mb-1 ${
                            isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                          }`}>
                            {detail}
                          </p>
                        ))}
                        <p className={`text-xs mt-2 ${
                          isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
                        }`}>
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Links */}
            <div className={`mt-8 p-6 rounded-lg border ${
              isDark 
                ? `${getThemeColor('background.secondary', true)} ${colors.border.subtle.dark}`
                : `${getThemeColor('background.secondary', false)} ${colors.border.subtle.light}`
            }`}>
              <h3 className={`font-bold mb-4 ${
                isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
              }`}>
                Quick Links
              </h3>
              <div className="space-y-2">
                <a href="/programs" className={`block text-sm hover:underline ${
                  isDark ? 'text-orange-400 hover:text-orange-300' : 'text-orange-600 hover:text-orange-500'
                }`}>
                  View Our Programs
                </a>
                <a href="/training" className={`block text-sm hover:underline ${
                  isDark ? 'text-orange-400 hover:text-orange-300' : 'text-orange-600 hover:text-orange-500'
                }`}>
                  Training Centers
                </a>
                <a href="/youth-clubs" className={`block text-sm hover:underline ${
                  isDark ? 'text-orange-400 hover:text-orange-300' : 'text-orange-600 hover:text-orange-500'
                }`}>
                  Register Youth Club
                </a>
                <a href="/downloads" className={`block text-sm hover:underline ${
                  isDark ? 'text-orange-400 hover:text-orange-300' : 'text-orange-600 hover:text-orange-500'
                }`}>
                  Download Forms
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className={`p-8 rounded-lg border ${
              isDark 
                ? `${getThemeColor('background.secondary', true)} ${colors.border.subtle.dark}`
                : `${getThemeColor('background.secondary', false)} ${colors.border.subtle.light}`
            }`}>
              <div className="flex items-center gap-3 mb-8">
                <div className={`p-3 rounded-lg ${
                  isDark ? 'bg-blue-500/20' : 'bg-blue-100'
                }`}>
                  <MessageSquare className={`w-6 h-6 ${
                    isDark ? 'text-blue-300' : 'text-blue-600'
                  }`} />
                </div>
                <h2 className={`text-2xl font-bold ${
                  isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                }`}>
                  Send us a Message
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                    }`}>
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                        isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
                      }`} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
                          isDark 
                            ? `${getThemeColor('background.primary', true)} ${getThemeColor('border.primary', true)} ${getThemeColor('text.primary', true)} placeholder-gray-400`
                            : `${getThemeColor('background.primary', false)} ${getThemeColor('border.secondary', false)} ${getThemeColor('text.primary', false)} placeholder-gray-500`
                        } focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500`}
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                    }`}>
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                        isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
                      }`} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
                          isDark 
                            ? `${getThemeColor('background.primary', true)} ${getThemeColor('border.primary', true)} ${getThemeColor('text.primary', true)} placeholder-gray-400`
                            : `${getThemeColor('background.primary', false)} ${getThemeColor('border.secondary', false)} ${getThemeColor('text.primary', false)} placeholder-gray-500`
                        } focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500`}
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>
                </div>

                {/* Phone and Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                    }`}>
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                        isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
                      }`} />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
                          isDark 
                            ? `${getThemeColor('background.primary', true)} ${getThemeColor('border.primary', true)} ${getThemeColor('text.primary', true)} placeholder-gray-400`
                            : `${getThemeColor('background.primary', false)} ${getThemeColor('border.secondary', false)} ${getThemeColor('text.primary', false)} placeholder-gray-500`
                        } focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500`}
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                    }`}>
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                        isDark 
                          ? `${getThemeColor('background.primary', true)} ${getThemeColor('border.primary', true)} ${getThemeColor('text.primary', true)}`
                          : `${getThemeColor('background.primary', false)} ${getThemeColor('border.secondary', false)} ${getThemeColor('text.primary', false)}`
                      } focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500`}
                    >
                      {categories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                  }`}>
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      isDark 
                        ? `${getThemeColor('background.primary', true)} ${getThemeColor('border.primary', true)} ${getThemeColor('text.primary', true)} placeholder-gray-400`
                        : `${getThemeColor('background.primary', false)} ${getThemeColor('border.secondary', false)} ${getThemeColor('text.primary', false)} placeholder-gray-500`
                    } focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500`}
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                  }`}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors resize-none ${
                      isDark 
                        ? `${getThemeColor('background.primary', true)} ${getThemeColor('border.primary', true)} ${getThemeColor('text.primary', true)} placeholder-gray-400`
                        : `${getThemeColor('background.primary', false)} ${getThemeColor('border.secondary', false)} ${getThemeColor('text.primary', false)} placeholder-gray-500`
                    } focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500`}
                    placeholder="Please provide detailed information about your inquiry"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className={`flex items-center gap-2 px-8 py-3 rounded-lg transition-all duration-300 font-medium ${
                      isDark
                        ? `${colors.brand.primary.background} ${colors.brand.primary.text} hover:bg-orange-600 ${colors.effects.glow.brand}`
                        : `${colors.brand.primary.background} ${colors.brand.primary.text} hover:bg-orange-600 ${colors.effects.glow.brand}`
                    } hover:shadow-lg`}
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className={`py-16 ${
        isDark ? getThemeColor('background.secondary', true) : getThemeColor('background.secondary', false)
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className={`text-3xl font-bold mb-4 ${
              isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
            }`}>
              Find Us
            </h2>
            <p className={`text-lg ${
              isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
            }`}>
              Visit our main office in Colombo
            </p>
          </div>
          
          <div className={`aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center ${
            isDark ? colors.border.subtle.dark : colors.border.subtle.light
          }`}>
            <div className="text-center">
              <MapPin className={`w-16 h-16 mx-auto mb-4 ${
                isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
              }`} />
              <p className={`text-lg ${
                isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
              }`}>
                Interactive Map
              </p>
              <p className={`text-sm ${
                isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
              }`}>
                (Map integration to be implemented)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;