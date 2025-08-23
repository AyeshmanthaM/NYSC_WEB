import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor, colors } from '../../config/colors';
import { User, Award, Mail, Phone, MapPin, Building2, Target, Users, Clock, TrendingUp } from 'lucide-react';

const AssistantDirectorsPage = () => {
  const { isDark } = useTheme();

  const assistantDirectors = [
    // Programs & Development
    { id: 1, name: "Ms. Ruvini Jayasinghe", position: "Assistant Director - Youth Programs", department: "Programs & Development", region: "Western Province", specialization: "Program Coordination", email: "ruvini.j@nysc.lk", phone: "+94 11 234 5720" },
    { id: 2, name: "Mr. Dinesh Bandara", position: "Assistant Director - Skills Development", department: "Programs & Development", region: "Central Province", specialization: "Skills Training", email: "dinesh.b@nysc.lk", phone: "+94 81 234 5721" },
    { id: 3, name: "Mrs. Kumari Fernando", position: "Assistant Director - Community Programs", department: "Programs & Development", region: "Southern Province", specialization: "Community Outreach", email: "kumari.f@nysc.lk", phone: "+94 91 234 5722" },
    
    // Sports & Recreation
    { id: 4, name: "Mr. Chathura Perera", position: "Assistant Director - Athletics", department: "Sports & Recreation", region: "Western Province", specialization: "Track & Field", email: "chathura.p@nysc.lk", phone: "+94 11 234 5723" },
    { id: 5, name: "Ms. Thilini Silva", position: "Assistant Director - Team Sports", department: "Sports & Recreation", region: "North Central Province", specialization: "Team Sports", email: "thilini.s@nysc.lk", phone: "+94 25 234 5724" },
    { id: 6, name: "Mr. Kasun Wickramasinghe", position: "Assistant Director - Aquatic Sports", department: "Sports & Recreation", region: "Eastern Province", specialization: "Swimming & Water Sports", email: "kasun.w@nysc.lk", phone: "+94 65 234 5725" },
    
    // Cultural Affairs
    { id: 7, name: "Dr. Anoma Rajapaksa", position: "Assistant Director - Traditional Arts", department: "Cultural Affairs", region: "Uva Province", specialization: "Traditional Performing Arts", email: "anoma.r@nysc.lk", phone: "+94 55 234 5726" },
    { id: 8, name: "Mr. Nimal Gunasekara", position: "Assistant Director - Modern Arts", department: "Cultural Affairs", region: "Sabaragamuwa Province", specialization: "Contemporary Arts", email: "nimal.g@nysc.lk", phone: "+94 45 234 5727" },
    { id: 9, name: "Ms. Sunethra Mendis", position: "Assistant Director - Folk Culture", department: "Cultural Affairs", region: "North Western Province", specialization: "Folk Traditions", email: "sunethra.m@nysc.lk", phone: "+94 37 234 5728" },
    
    // Vocational Training
    { id: 10, name: "Mr. Upul Dissanayake", position: "Assistant Director - Technical Training", department: "Vocational Training", region: "Western Province", specialization: "Technical Education", email: "upul.d@nysc.lk", phone: "+94 11 234 5729" },
    { id: 11, name: "Mrs. Sachini Kumari", position: "Assistant Director - Hospitality Training", department: "Vocational Training", region: "Southern Province", specialization: "Hotel & Tourism", email: "sachini.k@nysc.lk", phone: "+94 91 234 5730" },
    { id: 12, name: "Mr. Roshan Amarasinghe", position: "Assistant Director - IT Training", department: "Vocational Training", region: "Central Province", specialization: "Information Technology", email: "roshan.a@nysc.lk", phone: "+94 81 234 5731" },
    
    // International Affairs
    { id: 13, name: "Ms. Dilani Wickremaratne", position: "Assistant Director - Exchange Programs", department: "International Affairs", region: "All Provinces", specialization: "Student Exchange", email: "dilani.w@nysc.lk", phone: "+94 11 234 5732" },
    { id: 14, name: "Mr. Tharaka Jayawardena", position: "Assistant Director - Partnerships", department: "International Affairs", region: "All Provinces", specialization: "International Relations", email: "tharaka.j@nysc.lk", phone: "+94 11 234 5733" },
    
    // Administration
    { id: 15, name: "Mrs. Chandrika Perera", position: "Assistant Director - HR Operations", department: "Administration", region: "All Provinces", specialization: "Human Resources", email: "chandrika.p@nysc.lk", phone: "+94 11 234 5734" },
    { id: 16, name: "Mr. Pradeep Silva", position: "Assistant Director - Facilities", department: "Administration", region: "All Provinces", specialization: "Facility Management", email: "pradeep.s@nysc.lk", phone: "+94 11 234 5735" },
    { id: 17, name: "Ms. Ramani Fernando", position: "Assistant Director - Procurement", department: "Administration", region: "All Provinces", specialization: "Procurement & Supply", email: "ramani.f@nysc.lk", phone: "+94 11 234 5736" },
    
    // Finance & Planning
    { id: 18, name: "Mr. Gamini Rajapaksa", position: "Assistant Director - Budget Planning", department: "Finance & Planning", region: "All Provinces", specialization: "Financial Planning", email: "gamini.r@nysc.lk", phone: "+94 11 234 5737" },
    { id: 19, name: "Mrs. Kamani Gunawardena", position: "Assistant Director - Accounts", department: "Finance & Planning", region: "All Provinces", specialization: "Accounting", email: "kamani.g@nysc.lk", phone: "+94 11 234 5738" },
    { id: 20, name: "Mr. Indika Bandara", position: "Assistant Director - Audit", department: "Finance & Planning", region: "All Provinces", specialization: "Internal Audit", email: "indika.b@nysc.lk", phone: "+94 11 234 5739" },
    
    // Information Technology
    { id: 21, name: "Mr. Amila Wickramasinghe", position: "Assistant Director - Systems", department: "Information Technology", region: "All Provinces", specialization: "IT Systems", email: "amila.w@nysc.lk", phone: "+94 11 234 5740" },
    { id: 22, name: "Ms. Nethmi Jayasuriya", position: "Assistant Director - Data Management", department: "Information Technology", region: "All Provinces", specialization: "Data Analytics", email: "nethmi.j@nysc.lk", phone: "+94 11 234 5741" },
    
    // Research & Policy
    { id: 23, name: "Dr. Mihiri Perera", position: "Assistant Director - Policy Research", department: "Research & Policy", region: "All Provinces", specialization: "Policy Analysis", email: "mihiri.p@nysc.lk", phone: "+94 11 234 5742" },
    { id: 24, name: "Mr. Rukshan Fernando", position: "Assistant Director - Program Evaluation", department: "Research & Policy", region: "All Provinces", specialization: "Impact Assessment", email: "rukshan.f@nysc.lk", phone: "+94 11 234 5743" },
    
    // Public Relations
    { id: 25, name: "Ms. Shyamali Silva", position: "Assistant Director - Communications", department: "Public Relations", region: "All Provinces", specialization: "Media Relations", email: "shyamali.s@nysc.lk", phone: "+94 11 234 5744" }
  ];

  const departmentGroups = assistantDirectors.reduce((groups, director) => {
    const dept = director.department;
    if (!groups[dept]) {
      groups[dept] = [];
    }
    groups[dept].push(director);
    return groups;
  }, {} as Record<string, typeof assistantDirectors>);

  const operationalStats = [
    { label: "Assistant Directors", value: "25", description: "Operational Leaders", icon: Users },
    { label: "Departments", value: "10", description: "Specialized Units", icon: Building2 },
    { label: "Regional Coverage", value: "9", description: "Provinces", icon: MapPin },
    { label: "Daily Operations", value: "100+", description: "Programs Managed", icon: Target }
  ];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Directors", href: "/directors" },
    { label: "Assistant Directors" }
  ];

  const departmentColors = [
    colors.brand.gradient.primary,
    colors.brand.gradient.primaryReverse,
    'bg-gradient-to-r from-green-500 to-blue-500',
    'bg-gradient-to-r from-purple-500 to-pink-500',
    'bg-gradient-to-r from-blue-500 to-indigo-500',
    'bg-gradient-to-r from-red-500 to-orange-500',
    'bg-gradient-to-r from-teal-500 to-cyan-500',
    'bg-gradient-to-r from-yellow-500 to-green-500',
    'bg-gradient-to-r from-indigo-500 to-purple-500',
    'bg-gradient-to-r from-pink-500 to-red-500'
  ];

  return (
    <PageLayout 
      title="Assistant Directors" 
      subtitle="Dedicated professionals managing day-to-day operations and ensuring quality service delivery across all NYSC programs and departments."
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Operational Statistics */}
        <div className={`mb-12 ${getThemeColor('card.glassy', isDark)} rounded-2xl p-8 border ${getThemeColor('border.subtle', isDark)}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {operationalStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 text-center border ${getThemeColor('border.brand.subtle', isDark)} ${colors.effects.glow.subtle}`}
                >
                  <Icon className={`w-8 h-8 mx-auto mb-3 ${colors.brand.primary.text}`} />
                  <div className={`text-3xl font-bold mb-2 ${colors.brand.gradient.text}`}>{stat.value}</div>
                  <h3 className={`font-semibold mb-1 ${getThemeColor('text.primary', isDark)}`}>{stat.label}</h3>
                  <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>{stat.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Assistant Directors by Department */}
        {Object.entries(departmentGroups).map(([department, directors], deptIndex) => (
          <div key={department} className="mb-12">
            <div className="mb-6 text-center">
              <h2 className={`text-2xl font-bold mb-3 ${colors.brand.gradient.text}`}>
                {department}
              </h2>
              <div className={`w-32 h-1 mx-auto rounded-full ${departmentColors[deptIndex % departmentColors.length]}`}></div>
              <p className={`mt-2 text-sm ${getThemeColor('text.secondary', isDark)}`}>
                {directors.length} Assistant Director{directors.length > 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {directors.map((director) => (
                <div 
                  key={director.id}
                  className={`${getThemeColor('card.glassy', isDark)} rounded-xl overflow-hidden border ${getThemeColor('border.subtle', isDark)} ${colors.effects.glow.subtle} ${colors.hover.shadow.brand} transition-all duration-300 group hover:scale-[1.02]`}
                >
                  {/* Profile Section */}
                  <div className="relative h-32 bg-gradient-to-b from-transparent to-black/20">
                    <div className={`w-full h-full ${departmentColors[deptIndex % departmentColors.length]} flex items-center justify-center`}>
                      <User className="w-12 h-12 text-white/50" />
                    </div>
                    
                    {/* Position Badge */}
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold text-white bg-black/30 backdrop-blur-sm`}>
                        Assistant Director
                      </span>
                    </div>
                  </div>

                  {/* Information Section */}
                  <div className="p-4 space-y-3">
                    {/* Name and Position */}
                    <div className="text-center">
                      <h3 className={`text-sm font-bold mb-1 ${getThemeColor('text.primary', isDark)} group-hover:${colors.brand.primary.text} transition-colors line-clamp-2`}>
                        {director.name}
                      </h3>
                      <p className={`text-xs font-semibold ${colors.brand.secondary.text} line-clamp-2`}>
                        {director.position}
                      </p>
                    </div>

                    {/* Specialization */}
                    <div className={`flex items-center justify-center gap-1 py-1 px-2 rounded-lg ${getThemeColor('card.primary', isDark)}`}>
                      <Target className={`w-3 h-3 ${colors.brand.primary.text}`} />
                      <span className={`text-xs ${getThemeColor('text.secondary', isDark)}`}>
                        {director.specialization}
                      </span>
                    </div>

                    {/* Region */}
                    <div className="flex items-center justify-center gap-1">
                      <MapPin className={`w-3 h-3 ${colors.brand.secondary.text}`} />
                      <span className={`text-xs ${getThemeColor('text.muted', isDark)}`}>
                        {director.region}
                      </span>
                    </div>

                    {/* Contact Icons */}
                    <div className="flex justify-center space-x-2 pt-1">
                      <a 
                        href={`mailto:${director.email}`}
                        className={`p-1 rounded ${getThemeColor('hover.background', isDark)} transition-all duration-300 hover:scale-110`}
                        title="Email"
                      >
                        <Mail className={`w-3 h-3 ${colors.brand.primary.text}`} />
                      </a>
                      <a 
                        href={`tel:${director.phone}`}
                        className={`p-1 rounded ${getThemeColor('hover.background', isDark)} transition-all duration-300 hover:scale-110`}
                        title="Phone"
                      >
                        <Phone className={`w-3 h-3 ${colors.brand.secondary.text}`} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Operational Excellence Framework */}
        <div className={`${getThemeColor('background.gradient.brand', isDark)} rounded-2xl p-8 border ${getThemeColor('border.brand.subtle', isDark)}`}>
          <h2 className={`text-2xl font-bold text-center mb-8 ${getThemeColor('text.primary', isDark)}`}>
            Operational Excellence Framework
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 text-center border ${getThemeColor('border.brand.subtle', isDark)}`}>
              <Clock className={`w-10 h-10 mx-auto mb-3 ${colors.brand.primary.text}`} />
              <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                Daily Operations
              </h3>
              <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                Managing day-to-day activities and ensuring smooth program delivery
              </p>
            </div>
            <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 text-center border ${getThemeColor('border.brand.subtle', isDark)}`}>
              <Target className={`w-10 h-10 mx-auto mb-3 ${colors.brand.secondary.text}`} />
              <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                Quality Delivery
              </h3>
              <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                Ensuring high standards in all services provided to youth participants
              </p>
            </div>
            <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 text-center border ${getThemeColor('border.brand.subtle', isDark)}`}>
              <TrendingUp className={`w-10 h-10 mx-auto mb-3 ${colors.brand.primary.text}`} />
              <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                Continuous Improvement
              </h3>
              <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                Implementing feedback and innovation for enhanced program effectiveness
              </p>
            </div>
            <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 text-center border ${getThemeColor('border.brand.subtle', isDark)}`}>
              <Users className={`w-10 h-10 mx-auto mb-3 ${colors.brand.secondary.text}`} />
              <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                Team Coordination
              </h3>
              <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                Leading teams and coordinating with other departments for integrated service delivery
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AssistantDirectorsPage;