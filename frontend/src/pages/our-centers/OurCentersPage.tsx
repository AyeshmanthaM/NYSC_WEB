import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor, colors } from '../../config/colors';
import { MapPin, Building, Users, Phone, Clock, ArrowRight } from 'lucide-react';

const OurCentersPage = () => {
  const { isDark } = useTheme();

  const centerTypes = [
    {
      type: "Training Centers",
      count: 25,
      description: "Vocational training facilities across all districts",
      icon: Building
    },
    {
      type: "Youth Centers",
      count: 50,
      description: "Community hubs for youth activities and programs",
      icon: Users
    },
    {
      type: "District Offices",
      count: 25,
      description: "Administrative offices serving each district",
      icon: MapPin
    }
  ];

  const featuredCenters = [
    {
      name: "Colombo District Training Center",
      location: "Colombo",
      type: "Training Center",
      capacity: "500 Students",
      programs: ["IT Training", "Business Skills", "Language Courses"],
      contact: "+94 11 269 1234",
      hours: "8:00 AM - 6:00 PM"
    },
    {
      name: "Kandy Youth Development Center",
      location: "Kandy",
      type: "Youth Center",
      capacity: "300 Members",
      programs: ["Cultural Programs", "Sports", "Community Service"],
      contact: "+94 81 222 3456",
      hours: "9:00 AM - 8:00 PM"
    },
    {
      name: "Galle Vocational Institute",
      location: "Galle",
      type: "Training Center",
      capacity: "250 Students",
      programs: ["Technical Skills", "Tourism", "Arts & Crafts"],
      contact: "+94 91 234 5678",
      hours: "8:30 AM - 5:30 PM"
    }
  ];

  const provinces = [
    "Western", "Central", "Southern", "Northern", "Eastern", 
    "North Western", "North Central", "Uva", "Sabaragamuwa"
  ];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Our Centers" }
  ];

  return (
    <PageLayout 
      title="Our Centers" 
      subtitle="Discover NYSC training centers, youth hubs, and district offices across Sri Lanka providing comprehensive youth services."
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Center Overview */}
        <div className={`mb-16 ${getThemeColor('card.glassy', isDark)} rounded-2xl p-8 md:p-12 border ${getThemeColor('border.subtle', isDark)}`}>
          <h2 className={`text-3xl font-bold text-center mb-12 ${colors.brand.gradient.text}`}>
            Nationwide Network
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {centerTypes.map((center, index) => (
              <div key={index} className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 text-center border ${getThemeColor('border.brand.subtle', isDark)} ${colors.hover.shadow.brand} transition-all duration-300`}>
                <div className="flex justify-center mb-4">
                  <div className={`p-3 ${colors.brand.gradient.primary} rounded-full ${colors.effects.glow.brand}`}>
                    <center.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className={`text-3xl font-bold mb-2 ${colors.brand.gradient.text}`}>{center.count}</div>
                <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>{center.type}</h3>
                <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>{center.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Centers */}
        <div className="mb-16">
          <h2 className={`text-3xl font-bold mb-8 ${colors.brand.gradient.text}`}>
            Featured Centers
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredCenters.map((center, index) => (
              <div key={index} className={`${getThemeColor('card.glassy', isDark)} rounded-xl p-6 border ${getThemeColor('border.subtle', isDark)} ${colors.effects.glow.subtle} ${colors.hover.shadow.brand} transition-all duration-300 group`}>
                <div className="flex items-start justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getThemeColor('badge.brand', isDark)}`}>
                    {center.type}
                  </span>
                  <MapPin className={`w-5 h-5 ${colors.brand.primary.text}`} />
                </div>
                <h3 className={`text-lg font-bold mb-2 ${getThemeColor('text.primary', isDark)} ${colors.hover.text.brand} transition-colors`}>
                  {center.name}
                </h3>
                <p className={`${getThemeColor('text.secondary', isDark)} text-sm mb-4`}>
                  {center.location} • {center.capacity}
                </p>
                
                <div className="mb-4">
                  <h4 className={`font-semibold mb-2 ${getThemeColor('text.primary', isDark)} text-sm`}>
                    Programs Offered:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {center.programs.map((program, idx) => (
                      <span key={idx} className={`px-2 py-1 rounded text-xs ${getThemeColor('badge.secondary', isDark)}`}>
                        {program}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Phone className={`w-4 h-4 mr-2 ${colors.brand.secondary.text}`} />
                    <span className={getThemeColor('text.secondary', isDark)}>{center.contact}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className={`w-4 h-4 mr-2 ${colors.brand.secondary.text}`} />
                    <span className={getThemeColor('text.secondary', isDark)}>{center.hours}</span>
                  </div>
                </div>
                
                <div className={`mt-4 pt-4 border-t ${getThemeColor('border.subtle', isDark)}`}>
                  <button className={`${colors.brand.primary.text} ${colors.hover.text.brand} font-semibold text-sm flex items-center transition-colors duration-300`}>
                    View Details
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Provincial Coverage */}
        <div className={`mb-16 ${getThemeColor('background.gradient.brand', isDark)} rounded-2xl p-8 md:p-12 border ${getThemeColor('border.brand.subtle', isDark)}`}>
          <h2 className={`text-3xl font-bold text-center mb-8 ${colors.brand.gradient.text}`}>
            Provincial Coverage
          </h2>
          <p className={`text-lg ${getThemeColor('text.secondary', isDark)} text-center mb-8 max-w-3xl mx-auto`}>
            NYSC centers are strategically located across all nine provinces of Sri Lanka, 
            ensuring accessible services for youth in every region.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {provinces.map((province, index) => (
              <div key={index} className={`${getThemeColor('card.primary', isDark)} rounded-lg p-4 text-center border ${getThemeColor('border.brand.subtle', isDark)} ${colors.hover.shadow.subtle} transition-all duration-300`}>
                <MapPin className={`w-5 h-5 mx-auto mb-2 ${colors.brand.secondary.text}`} />
                <span className={`font-semibold ${getThemeColor('text.primary', isDark)}`}>{province} Province</span>
              </div>
            ))}
          </div>
        </div>

        {/* Center Locator */}
        <div className={`text-center ${getThemeColor('card.glassy', isDark)} rounded-2xl p-8 md:p-12 border ${getThemeColor('border.subtle', isDark)}`}>
          <Building className={`w-16 h-16 mx-auto mb-6 ${colors.brand.primary.text}`} />
          <h2 className={`text-3xl font-bold mb-6 ${colors.brand.gradient.text}`}>
            Find a Center Near You
          </h2>
          <p className={`text-lg ${getThemeColor('text.secondary', isDark)} mb-8 max-w-3xl mx-auto leading-relaxed`}>
            Use our center locator to find the nearest NYSC facility in your area. Get directions, 
            contact information, and available programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className={`inline-flex items-center px-8 py-3 ${colors.button.primary.base} ${colors.button.primary.hover} ${colors.button.primary.shadow} rounded-lg font-semibold transition-all duration-300`}>
              <MapPin className="w-4 h-4 mr-2" />
              Find Centers
            </button>
            <button className={`inline-flex items-center px-8 py-3 ${colors.button.outline.brand} rounded-lg font-semibold transition-all duration-300`}>
              Download Directory
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default OurCentersPage;