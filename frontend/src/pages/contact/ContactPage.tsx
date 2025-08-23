import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor } from '../../config/colors';
import { Link } from 'react-router-dom';
import { MapPin, Building, Users, Mail, Phone, ArrowRight } from 'lucide-react';

const ContactPage = () => {
  const { isDark } = useTheme();

  const contactTypes = [
    {
      icon: Building,
      title: "District Offices",
      description: "Find your local NYSC district office for in-person assistance.",
      link: "/contact/district-offices"
    },
    {
      icon: MapPin,
      title: "Training Centers",
      description: "Locate vocational training centers and facilities near you.",
      link: "/contact/training-centers"
    },
    {
      icon: Users,
      title: "Youth Centers",
      description: "Connect with youth centers and community hubs in your area.",
      link: "/contact/youth-centers"
    },
    {
      icon: Mail,
      title: "Contact Form",
      description: "Send us a message and we'll get back to you promptly.",
      link: "/contact/contact-form"
    }
  ];

  const quickContacts = [
    {
      icon: Phone,
      title: "Main Office",
      details: ["+94 11 269 1234", "info@nysc.gov.lk"]
    },
    {
      icon: Mail,
      title: "Programs Inquiry",
      details: ["programs@nysc.gov.lk", "Mon-Fri 8:30 AM - 4:30 PM"]
    },
    {
      icon: Users,
      title: "Youth Services",
      details: ["youth@nysc.gov.lk", "24/7 Support Available"]
    }
  ];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Contact" }
  ];

  return (
    <PageLayout 
      title="Contact Us" 
      subtitle="Get in touch with NYSC offices, centers, and support teams across Sri Lanka."
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Quick Contact Section */}
        <div className={`mb-16 ${getThemeColor('background.card', isDark)} rounded-2xl p-8 md:p-12`}>
          <h2 className={`text-3xl font-bold mb-8 text-center ${getThemeColor('text.primary', isDark)}`}>
            Quick Contact
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {quickContacts.map((contact, index) => (
              <div key={index} className={`${getThemeColor('background.secondary', isDark)} rounded-xl p-6 text-center`}>
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary-500 rounded-full">
                    <contact.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className={`font-bold mb-3 ${getThemeColor('text.primary', isDark)}`}>
                  {contact.title}
                </h3>
                {contact.details.map((detail, idx) => (
                  <p key={idx} className={`text-sm ${getThemeColor('text.secondary', isDark)} mb-1`}>
                    {detail}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Options */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contactTypes.map((type, index) => (
            <Link 
              key={index} 
              to={type.link}
              className={`${getThemeColor('background.card', isDark)} rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group block`}
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <type.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className={`text-xl font-bold mb-4 text-center ${getThemeColor('text.primary', isDark)}`}>
                {type.title}
              </h3>
              <p className={`${getThemeColor('text.secondary', isDark)} text-center mb-6 leading-relaxed`}>
                {type.description}
              </p>
              <div className="flex justify-center">
                <div className="flex items-center text-primary-500 group-hover:text-primary-600 font-semibold">
                  Find Locations
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Emergency Contact */}
        <div className={`text-center ${getThemeColor('background.secondary', isDark)} rounded-2xl p-8 md:p-12`}>
          <h2 className={`text-3xl font-bold mb-6 ${getThemeColor('text.primary', isDark)}`}>
            Emergency Contact
          </h2>
          <p className={`text-lg ${getThemeColor('text.secondary', isDark)} mb-8 max-w-3xl mx-auto leading-relaxed`}>
            For urgent matters requiring immediate assistance, please contact our emergency hotline available 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+941234567890"
              className="inline-flex items-center px-8 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
            >
              <Phone className="w-4 h-4 mr-2" />
              Emergency Hotline
            </a>
            <a 
              href="mailto:emergency@nysc.gov.lk"
              className={`inline-flex items-center px-8 py-3 border-2 border-red-500 text-red-500 rounded-lg font-semibold hover:bg-red-500 hover:text-white transition-all`}
            >
              <Mail className="w-4 h-4 mr-2" />
              Emergency Email
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ContactPage;