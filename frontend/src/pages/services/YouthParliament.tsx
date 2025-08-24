import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor, colors } from '../../config/colors';
import { Building2, Users, Vote, BookOpen, Trophy, Globe, Search, Calendar, ExternalLink, MapPin, UserPlus, Award, Clock, Star, CheckCircle, ArrowRight, Medal, Target, Briefcase } from 'lucide-react';
import { useState } from 'react';

const YouthParliament = () => {
  const { isDark } = useTheme();
  const [searchDistrict, setSearchDistrict] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Youth Parliament" }
  ];

  // Key features of Youth Parliament
  const features = [
    {
      icon: Building2,
      title: "Parliamentary Procedure",
      description: "Learn formal procedures and protocols of democratic governance",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Leadership Development",
      description: "Build essential leadership and public speaking skills",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Vote,
      title: "Democratic Participation",
      description: "Experience the democratic process firsthand through debates and voting",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: BookOpen,
      title: "Policy Making",
      description: "Draft and debate policies on issues affecting young Sri Lankans",
      color: "from-orange-500 to-red-500"
    }
  ];

  // Districts with representative counts (sample data)
  const districts = [
    { name: "Ampara", representatives: 20, website: "www.slyp.lk" },
    { name: "Anuradhapura", representatives: 25, website: "www.slyp.lk" },
    { name: "Badulla", representatives: 22, website: "www.slyp.lk" },
    { name: "Batticaloa", representatives: 18, website: "www.slyp.lk" },
    { name: "Colombo", representatives: 35, website: "www.slyp.lk" },
    { name: "Galle", representatives: 28, website: "www.slyp.lk" },
    { name: "Gampaha", representatives: 32, website: "www.slyp.lk" },
    { name: "Hambantota", representatives: 19, website: "www.slyp.lk" },
    { name: "Jaffna", representatives: 24, website: "www.slyp.lk" },
    { name: "Kalutara", representatives: 26, website: "www.slyp.lk" },
    { name: "Kandy", representatives: 30, website: "www.slyp.lk" },
    { name: "Kegalle", representatives: 21, website: "www.slyp.lk" },
    { name: "Kilinochchi", representatives: 15, website: "www.slyp.lk" },
    { name: "Kurunegala", representatives: 29, website: "www.slyp.lk" },
    { name: "Mannar", representatives: 16, website: "www.slyp.lk" },
    { name: "Matale", representatives: 20, website: "www.slyp.lk" },
    { name: "Matara", representatives: 25, website: "www.slyp.lk" },
    { name: "Monaragala", representatives: 17, website: "www.slyp.lk" },
    { name: "Mullaitivu", representatives: 14, website: "www.slyp.lk" },
    { name: "Nuwara Eliya", representatives: 23, website: "www.slyp.lk" },
    { name: "Polonnaruwa", representatives: 18, website: "www.slyp.lk" },
    { name: "Puttalam", representatives: 22, website: "www.slyp.lk" },
    { name: "Ratnapura", representatives: 27, website: "www.slyp.lk" },
    { name: "Trincomalee", representatives: 19, website: "www.slyp.lk" },
    { name: "Vavuniya", representatives: 16, website: "www.slyp.lk" }
  ];

  // Parliament structure
  const parliamentStructure = [
    { role: "Speaker", description: "Presides over sessions and maintains order" },
    { role: "Deputy Speaker", description: "Assists the Speaker and deputizes when needed" },
    { role: "Government Members", description: "Youth representing the ruling party" },
    { role: "Opposition Members", description: "Youth representing opposition parties" },
    { role: "Committee Chairs", description: "Lead specialized committees on various issues" }
  ];

  // Key programs and activities
  const programs = [
    {
      title: "Annual Parliament Sessions",
      description: "Participate in structured parliamentary sessions with debates and voting",
      icon: Building2
    },
    {
      title: "Committee Work",
      description: "Join specialized committees focusing on youth-relevant issues",
      icon: Users
    },
    {
      title: "Bill Drafting",
      description: "Learn to draft and present bills on matters affecting youth",
      icon: BookOpen
    },
    {
      title: "Public Engagement",
      description: "Connect with local communities to understand their concerns",
      icon: Globe
    }
  ];

  // Participation timeline
  const participationSteps = [
    { step: 1, title: "Application", description: "Submit application through district office" },
    { step: 2, title: "Selection", description: "District-level selection process" },
    { step: 3, title: "Training", description: "Parliamentary procedure training" },
    { step: 4, title: "Participation", description: "Active involvement in sessions" },
    { step: 5, title: "Leadership", description: "Opportunity for leadership roles" }
  ];

  // Recent achievements and milestones
  const achievements = [
    {
      year: "2024",
      title: "National Youth Policy Contribution",
      description: "Youth Parliament contributed to the development of Sri Lanka's National Youth Policy framework",
      icon: Trophy
    },
    {
      year: "2023",
      title: "International Youth Parliament Exchange",
      description: "Successful exchange program with Commonwealth Youth Parliaments",
      icon: Globe
    },
    {
      year: "2022",
      title: "Digital Democracy Initiative",
      description: "Launched digital platform for youth engagement and virtual parliamentary sessions",
      icon: Star
    },
    {
      year: "2021",
      title: "COVID-19 Youth Response",
      description: "Developed youth-focused policies for pandemic recovery and education continuity",
      icon: Medal
    }
  ];

  // Parliamentary committees and their focus areas
  const committees = [
    {
      name: "Education & Skills Development",
      focus: "Educational reforms, vocational training, digital literacy",
      members: 45,
      chair: "Rotational",
      icon: BookOpen
    },
    {
      name: "Environment & Climate Action",
      focus: "Climate change policies, environmental protection, sustainability",
      members: 38,
      chair: "Rotational",
      icon: Globe
    },
    {
      name: "Employment & Entrepreneurship",
      focus: "Youth employment, startup support, economic opportunities",
      members: 42,
      chair: "Rotational",
      icon: Briefcase
    },
    {
      name: "Health & Sports",
      focus: "Youth health initiatives, sports development, mental wellness",
      members: 40,
      chair: "Rotational",
      icon: Target
    }
  ];

  // Upcoming events and sessions
  const upcomingEvents = [
    {
      date: "2024-09-15",
      title: "Annual Youth Parliament Session",
      description: "National assembly of district representatives",
      type: "Parliament Session",
      location: "Parliament Complex, Colombo"
    },
    {
      date: "2024-10-03",
      title: "Committee Week",
      description: "Specialized committee meetings and policy drafting",
      type: "Committee Meeting",
      location: "NYSC Headquarters"
    },
    {
      date: "2024-11-20",
      title: "Youth Leaders Summit",
      description: "Leadership development and capacity building",
      type: "Training",
      location: "Various Districts"
    },
    {
      date: "2024-12-10",
      title: "Policy Presentation Day",
      description: "Present youth-drafted policies to government officials",
      type: "Presentation",
      location: "Ministry of Youth Affairs"
    }
  ];

  // Benefits of participation
  const benefits = [
    "Develop leadership and public speaking skills",
    "Understand democratic processes and governance",
    "Network with like-minded youth across Sri Lanka",
    "Gain experience in policy development and debate",
    "Contribute to national youth policy framework",
    "Receive certificates of participation and recognition",
    "Opportunity for international exchange programs",
    "Access to specialized training and workshops"
  ];

  const filteredDistricts = districts.filter(district =>
    district.name.toLowerCase().includes(searchDistrict.toLowerCase())
  );

  return (
    <PageLayout 
      title="Youth Parliament" 
      subtitle="Empowering young voices in democracy through civic engagement and leadership development"
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className={`mb-12 ${getThemeColor('card.glassy', isDark)} rounded-3xl p-8 md:p-12 relative overflow-hidden`}>
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-4">
                <Building2 className="w-10 h-10 text-primary-500 mr-3" />
                <h2 className={`text-3xl font-bold ${colors.brand.gradient.text}`}>
                  Democratic Platform
                </h2>
              </div>
              <p className={`text-lg ${getThemeColor('text.secondary', isDark)} mb-6 leading-relaxed`}>
                The Youth Parliament provides a democratic platform for young people to engage in governance 
                and policy discussions. Representatives from all 25 districts participate in structured sessions, 
                learning parliamentary procedures while addressing issues affecting Sri Lankan youth.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className={`px-4 py-2 ${getThemeColor('background.secondary', isDark)} rounded-lg`}>
                  <Trophy className="inline-block w-4 h-4 mr-2 text-yellow-500" />
                  <span className={`text-sm ${getThemeColor('text.primary', isDark)}`}>National Platform</span>
                </div>
                <div className={`px-4 py-2 ${getThemeColor('background.secondary', isDark)} rounded-lg`}>
                  <Users className="inline-block w-4 h-4 mr-2 text-blue-500" />
                  <span className={`text-sm ${getThemeColor('text.primary', isDark)}`}>25 Districts</span>
                </div>
                <div className={`px-4 py-2 ${getThemeColor('background.secondary', isDark)} rounded-lg`}>
                  <Globe className="inline-block w-4 h-4 mr-2 text-green-500" />
                  <span className={`text-sm ${getThemeColor('text.primary', isDark)}`}>Civic Engagement</span>
                </div>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className={`${getThemeColor('background.card', isDark)} rounded-2xl p-6`}>
              <h3 className={`text-xl font-bold mb-4 text-center ${getThemeColor('text.primary', isDark)}`}>
                Parliament Overview
              </h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className={`text-3xl font-bold ${colors.brand.gradient.text}`}>
                    500+
                  </div>
                  <div className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                    Active Members
                  </div>
                </div>
                <div>
                  <div className={`text-3xl font-bold ${colors.brand.gradient.text}`}>
                    25
                  </div>
                  <div className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                    Districts
                  </div>
                </div>
                <div>
                  <div className={`text-3xl font-bold ${colors.brand.gradient.text}`}>
                    12
                  </div>
                  <div className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                    Annual Sessions
                  </div>
                </div>
                <div>
                  <div className={`text-3xl font-bold ${colors.brand.gradient.text}`}>
                    50+
                  </div>
                  <div className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                    Bills Debated
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <a 
                  href="http://www.slyp.lk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg text-sm font-semibold hover:scale-105 transition-transform"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit Official Website
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Program Features */}
        <div className="mb-16">
          <h2 className={`text-2xl font-bold mb-8 text-center ${getThemeColor('text.primary', isDark)}`}>
            What You'll Experience
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`${getThemeColor('card.glassy', isDark)} rounded-xl p-6 border ${getThemeColor('border.subtle', isDark)} hover:shadow-xl transition-all duration-300 group`}
              >
                <div className={`p-3 bg-gradient-to-r ${feature.color} rounded-xl mb-4 inline-block group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-lg font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                  {feature.title}
                </h3>
                <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Participation Process */}
        <div className={`mb-16 ${getThemeColor('card.glassy', isDark)} rounded-3xl p-8 md:p-12`}>
          <h2 className={`text-2xl font-bold mb-8 text-center ${getThemeColor('text.primary', isDark)}`}>
            How to Join Youth Parliament
          </h2>
          <div className="grid md:grid-cols-5 gap-4">
            {participationSteps.map((step, index) => (
              <div key={index} className="text-center relative">
                {index < participationSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 opacity-50"></div>
                )}
                <div className={`relative z-10 mb-3 mx-auto w-16 h-16 ${getThemeColor('background.card', isDark)} rounded-full flex items-center justify-center border-2 border-primary-500`}>
                  <span className={`text-lg font-bold ${colors.brand.primary.text}`}>{step.step}</span>
                </div>
                <h4 className={`font-semibold mb-1 text-sm ${getThemeColor('text.primary', isDark)}`}>
                  {step.title}
                </h4>
                <p className={`text-xs ${getThemeColor('text.secondary', isDark)}`}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* District Representatives */}
        <div className="mb-16">
          <h2 className={`text-2xl font-bold mb-8 text-center ${getThemeColor('text.primary', isDark)}`}>
            District Representatives
          </h2>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search districts..."
                value={searchDistrict}
                onChange={(e) => setSearchDistrict(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg ${getThemeColor('background.secondary', isDark)} ${getThemeColor('text.primary', isDark)} border ${getThemeColor('border.subtle', isDark)} focus:outline-none focus:ring-2 focus:ring-primary-500`}
              />
            </div>
          </div>

          {/* Districts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
            {filteredDistricts.map((district, index) => (
              <div 
                key={index}
                className={`${getThemeColor('card.glassy', isDark)} rounded-lg p-4 border ${getThemeColor('border.subtle', isDark)} hover:scale-105 transition-transform`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className={`font-semibold ${getThemeColor('text.primary', isDark)}`}>
                      {district.name}
                    </h3>
                    <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                      {district.representatives} Representatives
                    </p>
                  </div>
                  <MapPin className={`w-5 h-5 ${colors.brand.primary.text}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Programs */}
        <div className="mb-16">
          <h2 className={`text-2xl font-bold mb-8 text-center ${getThemeColor('text.primary', isDark)}`}>
            Programs & Activities
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {programs.map((program, index) => (
              <div 
                key={index}
                className={`${getThemeColor('card.glassy', isDark)} rounded-xl p-6 border ${getThemeColor('border.subtle', isDark)} hover:scale-105 transition-transform`}
              >
                <div className="flex items-start">
                  <div className={`p-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl mr-4 flex-shrink-0`}>
                    <program.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                      {program.title}
                    </h3>
                    <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                      {program.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Parliamentary Committees */}
        <div className="mb-16">
          <h2 className={`text-2xl font-bold mb-8 text-center ${getThemeColor('text.primary', isDark)}`}>
            Parliamentary Committees
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {committees.map((committee, index) => (
              <div 
                key={index}
                className={`${getThemeColor('card.glassy', isDark)} rounded-xl p-6 border ${getThemeColor('border.subtle', isDark)} hover:scale-105 transition-all duration-300 group`}
              >
                <div className="flex items-start mb-4">
                  <div className={`p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mr-4 group-hover:scale-110 transition-transform`}>
                    <committee.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-bold mb-1 ${getThemeColor('text.primary', isDark)}`}>
                      {committee.name}
                    </h3>
                    <p className={`text-sm ${getThemeColor('text.secondary', isDark)} mb-2`}>
                      {committee.focus}
                    </p>
                    <div className="flex items-center gap-4 text-xs">
                      <span className={`${getThemeColor('text.secondary', isDark)}`}>
                        <Users className="inline w-3 h-3 mr-1" />
                        {committee.members} Members
                      </span>
                      <span className={`${getThemeColor('text.secondary', isDark)}`}>
                        <Award className="inline w-3 h-3 mr-1" />
                        {committee.chair} Chair
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Achievements */}
        <div className={`mb-16 ${getThemeColor('card.glassy', isDark)} rounded-3xl p-8 md:p-12`}>
          <h2 className={`text-2xl font-bold mb-8 text-center ${getThemeColor('text.primary', isDark)}`}>
            Recent Achievements & Milestones
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary-500 to-secondary-500"></div>
            
            <div className="space-y-8">
              {achievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center z-10">
                    <achievement.icon className="w-4 h-4 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className={`ml-16 md:ml-0 ${index % 2 === 0 ? 'md:mr-8 md:text-right' : 'md:ml-8 md:text-left'} md:w-1/2`}>
                    <div className={`${getThemeColor('background.card', isDark)} rounded-xl p-6 shadow-lg`}>
                      <div className={`text-lg font-bold ${colors.brand.gradient.text} mb-2`}>
                        {achievement.year}
                      </div>
                      <h3 className={`text-lg font-semibold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                        {achievement.title}
                      </h3>
                      <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className={`text-2xl font-bold mb-8 text-center ${getThemeColor('text.primary', isDark)}`}>
            Why Join Youth Parliament?
          </h2>
          <div className={`${getThemeColor('card.glassy', isDark)} rounded-3xl p-8 md:p-12`}>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className={`text-xl font-bold mb-6 ${colors.brand.gradient.text}`}>
                  Personal Development Benefits
                </h3>
                <div className="space-y-3">
                  {benefits.slice(0, 4).map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className={`text-xl font-bold mb-6 ${colors.brand.gradient.text}`}>
                  Career & Network Benefits
                </h3>
                <div className="space-y-3">
                  {benefits.slice(4).map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mb-16">
          <h2 className={`text-2xl font-bold mb-8 text-center ${getThemeColor('text.primary', isDark)}`}>
            Upcoming Events & Sessions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingEvents.map((event, index) => (
              <div 
                key={index}
                className={`${getThemeColor('card.glassy', isDark)} rounded-xl p-6 border ${getThemeColor('border.subtle', isDark)} hover:scale-105 transition-all duration-300`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`px-3 py-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs rounded-full`}>
                    {event.type}
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-semibold ${getThemeColor('text.primary', isDark)}`}>
                      {new Date(event.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
                <h3 className={`text-lg font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                  {event.title}
                </h3>
                <p className={`text-sm ${getThemeColor('text.secondary', isDark)} mb-3`}>
                  {event.description}
                </p>
                <div className="flex items-center">
                  <MapPin className={`w-4 h-4 ${colors.brand.primary.text} mr-2`} />
                  <span className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                    {event.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center ${getThemeColor('card.glassy', isDark)} rounded-3xl p-8 md:p-12 border ${getThemeColor('border.subtle', isDark)}`}>
          <h2 className={`text-3xl font-bold mb-6 ${colors.brand.gradient.text}`}>
            Ready to Make Your Voice Heard?
          </h2>
          <p className={`text-lg ${getThemeColor('text.secondary', isDark)} mb-8 max-w-3xl mx-auto`}>
            Join hundreds of young Sri Lankans who are shaping the future of our nation through 
            democratic participation and civic engagement.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg">
              <UserPlus className="w-4 h-4 mr-2" />
              Apply Now
            </button>
            <button className={`inline-flex items-center px-8 py-3 ${getThemeColor('background.secondary', isDark)} ${getThemeColor('text.primary', isDark)} rounded-lg font-semibold hover:scale-105 transition-transform`}>
              <Calendar className="w-4 h-4 mr-2" />
              View Sessions
            </button>
            <a 
              href="http://www.slyp.lk" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`inline-flex items-center px-8 py-3 ${getThemeColor('background.secondary', isDark)} ${getThemeColor('text.primary', isDark)} rounded-lg font-semibold hover:scale-105 transition-transform`}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Official Website
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default YouthParliament;