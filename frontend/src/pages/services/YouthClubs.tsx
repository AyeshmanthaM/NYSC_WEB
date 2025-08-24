import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor, colors } from '../../config/colors';
import { Users, MapPin, Calendar, Activity, Award, Globe, Heart, ArrowRight, CheckCircle, Clock, Building, UserPlus, Phone, Eye, UserCheck } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const YouthClubs = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [showEligibility, setShowEligibility] = useState(false);

  const clubTypes = [
    {
      icon: Users,
      title: "Community Service Clubs",
      description: "Focus on community development and social service projects.",
      activities: ["Environmental Projects", "Elder Care", "Education Support", "Health Awareness"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Activity,
      title: "Sports & Recreation Clubs",
      description: "Athletic and recreational activities for fitness and fun.",
      activities: ["Football", "Cricket", "Volleyball", "Athletics"],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Calendar,
      title: "Cultural Arts Clubs",
      description: "Preserve and promote Sri Lankan cultural heritage.",
      activities: ["Traditional Dance", "Music", "Drama", "Arts & Crafts"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Globe,
      title: "International Exchange",
      description: "Connect with youth globally through exchange programs.",
      activities: ["Youth Exchange", "Cultural Programs", "Leadership Summits", "Global Forums"],
      color: "from-indigo-500 to-blue-500"
    }
  ];

  // Organizational structure
  const organizationalStructure = [
    { level: "National", title: "Sri Lanka Federation of Youth Clubs", icon: Building },
    { level: "Regional", title: "Regional Boards of Youth Clubs", icon: MapPin },
    { level: "District", title: "District Boards of Youth Clubs", icon: Users },
    { level: "Division", title: "Grama Niladhari Division Clubs", icon: Heart }
  ];

  // Registration process steps
  const registrationSteps = [
    { step: 1, title: "Check Eligibility", description: "Verify you are between 15-29 years old" },
    { step: 2, title: "Find Your Division", description: "Locate your Grama Niladhari Division" },
    { step: 3, title: "Visit on Wednesday", description: "Inquire at Divisional Secretariat" },
    { step: 4, title: "Join General Meeting", description: "Attend club meeting and register" },
    { step: 5, title: "Get Involved", description: "Participate in activities and programs" }
  ];

  // Key activities and programs
  const keyPrograms = [
    { title: "Leadership Training", icon: Award, description: "Develop essential leadership skills" },
    { title: "Youth Parliament", icon: Building, description: "Engage in democratic processes" },
    { title: "Sports Competitions", icon: Activity, description: "District and national level tournaments" },
    { title: "Social Welfare", icon: Heart, description: "Community service initiatives" }
  ];

  // Districts list
  const districts = [
    "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", 
    "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara",
    "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar",
    "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya",
    "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
  ];

  // Board of Staff - Main positions to display directly (positions 3, 4, 5)
  const mainBoardMembers = [
    {
      id: 3,
      name: "Mr. A. M. Tharindu Naveen Kumara",
      position: "Secretary",
      district: "Kandy",
      phone: "070 248 2522",
      image: "/images/sammelanaya/01.jpeg"
    },
    {
      id: 4,
      name: "Mr. Ranil Madanayaka",
      position: "Treasurer",
      district: "Rathnapura",
      phone: "070 495 9236",
      image: "/images/sammelanaya/02.jpg"
    },
    {
      id: 5,
      name: "Mr. S. M. Mihindu Rusith",
      position: "Organizer",
      district: "Puthlam",
      phone: "076 333 9739",
      image: "/images/sammelanaya/03.jpeg"
    }
  ];

  // Summary stats for all board members
  const boardStats = {
    totalMembers: 55,
    chairmanAndVice: 3,
    committees: 8,
    districts: 25
  };

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Youth Clubs" }
  ];

  return (
    <PageLayout 
      title="Youth Clubs" 
      subtitle="Empowering youth since 1983 through community engagement and leadership development"
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Hero Section with Key Info */}
        <div className={`mb-12 ${getThemeColor('card.glassy', isDark)} rounded-3xl p-8 md:p-12 relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className={`text-3xl font-bold mb-4 ${colors.brand.gradient.text}`}>
                  Established March 23, 1983
                </h2>
                <p className={`text-lg ${getThemeColor('text.secondary', isDark)} mb-6 leading-relaxed`}>
                  Youth Clubs provide a platform for young people aged 15-29 to express their views freely and independently, 
                  develop leadership skills, and contribute to national and religious reconciliation.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className={`px-4 py-2 ${getThemeColor('background.secondary', isDark)} rounded-lg`}>
                    <span className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>Age Group:</span>
                    <span className={`ml-2 font-bold ${colors.brand.primary.text}`}>15-29 Years</span>
                  </div>
                  <div className={`px-4 py-2 ${getThemeColor('background.secondary', isDark)} rounded-lg`}>
                    <span className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>Coverage:</span>
                    <span className={`ml-2 font-bold ${colors.brand.primary.text}`}>25 Districts</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className={`${getThemeColor('card.glassy', isDark)} rounded-2xl p-6 border ${getThemeColor('border.subtle', isDark)}`}>
                  <h3 className={`text-xl font-bold mb-4 ${getThemeColor('text.primary', isDark)}`}>
                    Quick Eligibility Check
                  </h3>
                  <button
                    onClick={() => setShowEligibility(!showEligibility)}
                    className="w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-semibold hover:scale-105 transition-transform"
                  >
                    <UserPlus className="inline-block w-5 h-5 mr-2" />
                    Check Your Eligibility
                  </button>
                  {showEligibility && (
                    <div className={`mt-4 p-4 ${getThemeColor('background.secondary', isDark)} rounded-lg`}>
                      <p className={`text-sm ${getThemeColor('text.primary', isDark)}`}>
                        ✅ You must be between 15-29 years old<br/>
                        ✅ Sri Lankan citizen<br/>
                        ✅ Resident in the district you wish to join
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Organizational Structure */}
        <div className="mb-16">
          <h2 className={`text-2xl font-bold mb-8 text-center ${getThemeColor('text.primary', isDark)}`}>
            Organizational Structure
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {organizationalStructure.map((org, index) => (
              <div 
                key={index}
                className={`${getThemeColor('card.glassy', isDark)} rounded-xl p-6 text-center border ${getThemeColor('border.subtle', isDark)} hover:scale-105 transition-transform`}
              >
                <org.icon className={`w-10 h-10 mx-auto mb-3 ${colors.brand.primary.text}`} />
                <div className={`text-sm font-semibold mb-1 ${colors.brand.primary.text}`}>
                  {org.level}
                </div>
                <div className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                  {org.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Board of Staff Section */}
        <div className="mb-16">
          <h2 className={`text-2xl font-bold mb-8 text-center ${getThemeColor('text.primary', isDark)}`}>
            The Present Board of Staff of Sri Lanka Federation of Youth Clubs
          </h2>
          
          {/* Main Board Members (Secretary, Treasurer, Organizer) */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {mainBoardMembers.map((member) => (
              <div 
                key={member.id}
                className={`${getThemeColor('card.glassy', isDark)} rounded-xl p-6 border ${getThemeColor('border.subtle', isDark)} hover:shadow-xl transition-all duration-300 group`}
              >
                <div className="text-center">
                  <div className="relative mb-4 mx-auto w-24 h-24 rounded-full overflow-hidden bg-gradient-to-r from-primary-500 to-secondary-500 p-1">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3E%3Cpath d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/%3E%3Ccircle cx="12" cy="7" r="4"/%3E%3C/svg%3E';
                        }}
                      />
                    </div>
                  </div>
                  
                  <h3 className={`text-lg font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                    {member.name}
                  </h3>
                  
                  <div className={`inline-flex items-center px-3 py-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm rounded-full mb-3`}>
                    <UserCheck className="w-3 h-3 mr-1" />
                    {member.position}
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-center">
                      <MapPin className={`w-4 h-4 mr-2 ${colors.brand.primary.text}`} />
                      <span className={getThemeColor('text.secondary', isDark)}>
                        {member.district}
                      </span>
                    </div>
                    <div className="flex items-center justify-center">
                      <Phone className={`w-4 h-4 mr-2 ${colors.brand.primary.text}`} />
                      <span className={getThemeColor('text.secondary', isDark)}>
                        {member.phone}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action for Full Board */}
          <div className={`text-center ${getThemeColor('background.secondary', isDark)} rounded-xl p-6`}>
            <h3 className={`text-lg font-bold mb-3 ${getThemeColor('text.primary', isDark)}`}>
              Complete Board Directory
            </h3>
            <p className={`${getThemeColor('text.secondary', isDark)} mb-4`}>
              View detailed profiles of all {boardStats.totalMembers} board members including 
              committee chairs, auditors, and national board members from all districts.
            </p>
            <button 
              onClick={() => navigate('/services/board-members')}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg"
            >
              <Eye className="w-4 h-4 mr-2" />
              View All Board Members
            </button>
          </div>
        </div>

        {/* Club Types Enhanced */}
        <div className="mb-16">
          <h2 className={`text-2xl font-bold mb-8 text-center ${getThemeColor('text.primary', isDark)}`}>
            Types of Youth Clubs
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clubTypes.map((club, index) => (
              <div 
                key={index} 
                className={`${getThemeColor('card.glassy', isDark)} rounded-xl p-6 border ${getThemeColor('border.subtle', isDark)} hover:shadow-xl transition-all duration-300 group`}
              >
                <div className="flex justify-center mb-4">
                  <div className={`p-3 bg-gradient-to-r ${club.color} rounded-full group-hover:scale-110 transition-transform duration-300`}>
                    <club.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className={`text-lg font-bold mb-3 text-center ${getThemeColor('text.primary', isDark)}`}>
                  {club.title}
                </h3>
                <p className={`${getThemeColor('text.secondary', isDark)} text-sm mb-4 text-center leading-relaxed`}>
                  {club.description}
                </p>
                <ul className={`space-y-2 ${getThemeColor('text.secondary', isDark)} text-xs`}>
                  {club.activities.map((activity, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Registration Process */}
        <div className={`mb-16 ${getThemeColor('card.glassy', isDark)} rounded-3xl p-8 md:p-12`}>
          <h2 className={`text-2xl font-bold mb-8 text-center ${getThemeColor('text.primary', isDark)}`}>
            How to Join a Youth Club
          </h2>
          <div className="grid md:grid-cols-5 gap-4">
            {registrationSteps.map((step, index) => (
              <div key={index} className="text-center relative">
                {index < registrationSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
                )}
                <div className={`relative z-10 mb-3 mx-auto w-16 h-16 ${getThemeColor('background.card', isDark)} rounded-full flex items-center justify-center border-2 border-primary-500`}>
                  <span className={`text-lg font-bold ${colors.brand.primary.text}`}>{step.step}</span>
                </div>
                <h4 className={`font-semibold mb-1 ${getThemeColor('text.primary', isDark)}`}>
                  {step.title}
                </h4>
                <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <div className={`inline-flex items-center px-4 py-2 ${getThemeColor('background.secondary', isDark)} rounded-lg`}>
              <Clock className="w-5 h-5 mr-2 text-primary-500" />
              <span className={`${getThemeColor('text.primary', isDark)}`}>
                Visit Divisional Secretariat on <strong>Wednesdays</strong> for registration
              </span>
            </div>
          </div>
        </div>

        {/* Key Programs */}
        <div className="mb-16">
          <h2 className={`text-2xl font-bold mb-8 text-center ${getThemeColor('text.primary', isDark)}`}>
            Key Activities & Programs
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyPrograms.map((program, index) => (
              <div 
                key={index}
                className={`${getThemeColor('card.glassy', isDark)} rounded-xl p-6 text-center border ${getThemeColor('border.subtle', isDark)} hover:scale-105 transition-transform group`}
              >
                <div className={`p-3 mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform`}>
                  <program.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                  {program.title}
                </h3>
                <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                  {program.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* District Selector */}
        <div className={`mb-16 ${getThemeColor('card.glassy', isDark)} rounded-3xl p-8`}>
          <h2 className={`text-2xl font-bold mb-6 text-center ${getThemeColor('text.primary', isDark)}`}>
            Find Clubs in Your District
          </h2>
          <div className="max-w-2xl mx-auto">
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg ${getThemeColor('background.secondary', isDark)} ${getThemeColor('text.primary', isDark)} border ${getThemeColor('border.subtle', isDark)} focus:outline-none focus:ring-2 focus:ring-primary-500`}
            >
              <option value="">Select Your District</option>
              {districts.map((district) => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
            {selectedDistrict && (
              <div className={`mt-6 p-4 ${getThemeColor('background.secondary', isDark)} rounded-lg`}>
                <p className={`${getThemeColor('text.primary', isDark)}`}>
                  Youth clubs are available in <strong>{selectedDistrict}</strong> district.
                  Contact your local Divisional Secretariat for more information.
                </p>
                <button className="mt-4 px-6 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-semibold hover:scale-105 transition-transform">
                  <MapPin className="inline-block w-4 h-4 mr-2" />
                  Get Contact Details
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center ${getThemeColor('card.glassy', isDark)} rounded-3xl p-8 md:p-12 border ${getThemeColor('border.subtle', isDark)}`}>
          <h2 className={`text-3xl font-bold mb-6 ${colors.brand.gradient.text}`}>
            Be Part of Something Greater
          </h2>
          <p className={`text-lg ${getThemeColor('text.secondary', isDark)} mb-8 max-w-3xl mx-auto leading-relaxed`}>
            Join thousands of young Sri Lankans who are developing leadership skills, serving their communities, 
            and building lasting friendships through Youth Clubs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg">
              <UserPlus className="w-4 h-4 mr-2" />
              Register Now
            </button>
            <button className={`inline-flex items-center px-8 py-3 ${getThemeColor('background.secondary', isDark)} ${getThemeColor('text.primary', isDark)} rounded-lg font-semibold hover:scale-105 transition-transform`}>
              <Globe className="w-4 h-4 mr-2" />
              Learn More
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default YouthClubs;