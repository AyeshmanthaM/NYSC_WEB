import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor, colors } from '../../config/colors';
import { User, Award, Mail, Phone, Users, Target, TrendingUp, Globe } from 'lucide-react';
import { useTranslationWithNamespace } from '../../hooks/useTranslationWithNamespace';

const DeputyDirectorsPage = () => {
  const { isDark } = useTheme();
  const { t, ready } = useTranslationWithNamespace('directors');

  const deputyDirectors = [
    {
      id: 1,
      name: "Mrs. Chamari Jayasekara",
      position: "Deputy Director - Programs",
      department: "Programs & Development",
      description: "Program management specialist ensuring effective implementation of youth development initiatives across all provinces.",
      email: "chamari.j@nysc.lk",
      phone: "+94 11 234 5700",
      specialization: "Program Management",
      provinces: ["Western", "Central", "Southern"]
    },
    {
      id: 2,
      name: "Mr. Asanka Rathnayake",
      position: "Deputy Director - Sports",
      department: "Sports & Recreation",
      description: "Sports development coordinator managing athletics, team sports, and fitness programs nationwide.",
      email: "asanka.r@nysc.lk",
      phone: "+94 11 234 5701",
      specialization: "Sports Management",
      provinces: ["Northern", "Eastern", "North Central"]
    },
    {
      id: 3,
      name: "Ms. Sandamali Perera",
      position: "Deputy Director - Cultural Affairs",
      department: "Cultural Affairs",
      description: "Cultural program coordinator preserving traditional arts while promoting contemporary cultural expression.",
      email: "sandamali.p@nysc.lk",
      phone: "+94 11 234 5702",
      specialization: "Cultural Programs",
      provinces: ["North Western", "Sabaragamuwa", "Uva"]
    },
    {
      id: 4,
      name: "Mr. Nuwan Silva",
      position: "Deputy Director - Training",
      department: "Vocational Training",
      description: "Skills development coordinator managing technical education and vocational training programs.",
      email: "nuwan.s@nysc.lk",
      phone: "+94 11 234 5703",
      specialization: "Technical Training",
      provinces: ["Western", "Southern", "Central"]
    },
    {
      id: 5,
      name: "Dr. Priyanka Fernando",
      position: "Deputy Director - International",
      department: "International Affairs",
      description: "International programs coordinator managing exchange programs and global partnerships.",
      email: "priyanka.f@nysc.lk",
      phone: "+94 11 234 5704",
      specialization: "International Relations",
      provinces: ["All Provinces"]
    },
    {
      id: 6,
      name: "Mr. Thilak Bandara",
      position: "Deputy Director - Administration",
      department: "Administration",
      description: "Administrative operations manager ensuring efficient organizational processes and resource management.",
      email: "thilak.b@nysc.lk",
      phone: "+94 11 234 5705",
      specialization: "Administration",
      provinces: ["All Provinces"]
    },
    {
      id: 7,
      name: "Mrs. Malini Wickramasinghe",
      position: "Deputy Director - Finance",
      department: "Finance & Planning",
      description: "Financial planning specialist managing budgets, financial reporting, and resource allocation.",
      email: "malini.w@nysc.lk",
      phone: "+94 11 234 5706",
      specialization: "Financial Management",
      provinces: ["All Provinces"]
    },
    {
      id: 8,
      name: "Mr. Lalith Gunasekara",
      position: "Deputy Director - IT",
      department: "Information Technology",
      description: "Technology systems coordinator managing digital transformation and IT infrastructure.",
      email: "lalith.g@nysc.lk",
      phone: "+94 11 234 5707",
      specialization: "IT Systems",
      provinces: ["All Provinces"]
    },
    {
      id: 9,
      name: "Ms. Shirani Mendis",
      position: "Deputy Director - HR",
      department: "Human Resources",
      description: "Human resources specialist managing talent development, training, and organizational development.",
      email: "shirani.m@nysc.lk",
      phone: "+94 11 234 5708",
      specialization: "Human Resources",
      provinces: ["All Provinces"]
    },
    {
      id: 10,
      name: "Mr. Duminda Rajapaksa",
      position: "Deputy Director - Research",
      department: "Research & Development",
      description: "Research coordinator leading policy analysis, program evaluation, and impact assessment studies.",
      email: "duminda.r@nysc.lk",
      phone: "+94 11 234 5709",
      specialization: "Research & Analysis",
      provinces: ["All Provinces"]
    },
    {
      id: 11,
      name: "Mrs. Gayani Kumari",
      position: "Deputy Director - Communications",
      department: "Public Relations",
      description: "Communications specialist managing public relations, media engagement, and stakeholder communications.",
      email: "gayani.k@nysc.lk",
      phone: "+94 11 234 5710",
      specialization: "Communications",
      provinces: ["All Provinces"]
    },
    {
      id: 12,
      name: "Mr. Janaka Dissanayake",
      position: "Deputy Director - Quality Assurance",
      department: "Quality Assurance",
      description: "Quality management specialist ensuring program standards, compliance, and continuous improvement.",
      email: "janaka.d@nysc.lk",
      phone: "+94 11 234 5711",
      specialization: "Quality Management",
      provinces: ["All Provinces"]
    }
  ];

  const departmentGroups = [
    {
      title: "Program Delivery",
      color: colors.brand.gradient.primary,
      deputies: deputyDirectors.filter(d => 
        d.department.includes('Programs') || 
        d.department.includes('Sports') || 
        d.department.includes('Cultural') ||
        d.department.includes('Training')
      )
    },
    {
      title: "Support Services",
      color: colors.brand.gradient.primaryReverse,
      deputies: deputyDirectors.filter(d => 
        d.department.includes('Administration') ||
        d.department.includes('Finance') ||
        d.department.includes('IT') ||
        d.department.includes('Human')
      )
    },
    {
      title: "Strategic Functions",
      color: 'bg-gradient-to-r from-blue-500 to-purple-500',
      deputies: deputyDirectors.filter(d => 
        d.department.includes('International') ||
        d.department.includes('Research') ||
        d.department.includes('Public') ||
        d.department.includes('Quality')
      )
    }
  ];

  const organizationStats = [
    { label: "Deputy Directors", value: "12", description: "Senior Leadership" },
    { label: "Departments", value: "10", description: "Specialized Units" },
    { label: "Provinces Covered", value: "9", description: "National Reach" },
    { label: "Combined Experience", value: "180+", description: "Years of Expertise" }
  ];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Directors", href: "/directors" },
    { label: "Deputy Directors" }
  ];

  return (
    <PageLayout 
      title="Deputy Directors" 
      subtitle="Experienced professionals supporting strategic leadership and ensuring operational excellence across all NYSC departments."
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Overview Statistics */}
        <div className={`mb-12 ${getThemeColor('card.glassy', isDark)} rounded-2xl p-8 border ${getThemeColor('border.subtle', isDark)}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {organizationStats.map((stat, index) => (
              <div 
                key={index}
                className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 text-center border ${getThemeColor('border.brand.subtle', isDark)} ${colors.effects.glow.subtle}`}
              >
                <div className={`text-3xl font-bold mb-2 ${colors.brand.gradient.text}`}>{stat.value}</div>
                <h3 className={`font-semibold mb-1 ${getThemeColor('text.primary', isDark)}`}>{stat.label}</h3>
                <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>{stat.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Deputy Directors by Department Groups */}
        {departmentGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-12">
            <div className={`mb-6 text-center`}>
              <h2 className={`text-2xl font-bold mb-2 ${colors.brand.gradient.text}`}>
                {group.title}
              </h2>
              <div className={`w-24 h-1 mx-auto rounded-full ${group.color}`}></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {group.deputies.map((deputy) => (
                <div 
                  key={deputy.id}
                  className={`${getThemeColor('card.glassy', isDark)} rounded-xl overflow-hidden border ${getThemeColor('border.subtle', isDark)} ${colors.effects.glow.subtle} ${colors.hover.shadow.brand} transition-all duration-300 group hover:scale-[1.02]`}
                >
                  {/* Profile Section */}
                  <div className="relative h-40 bg-gradient-to-b from-transparent to-black/20">
                    <div className={`w-full h-full ${group.color} flex items-center justify-center`}>
                      <User className="w-16 h-16 text-white/50" />
                    </div>
                    
                    {/* Position Badge */}
                    <div className="absolute top-3 left-1/2 transform -translate-x-1/2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${colors.brand.gradient.primary} shadow-lg`}>
                        Deputy Director
                      </span>
                    </div>
                  </div>

                  {/* Information Section */}
                  <div className="p-5 space-y-3">
                    {/* Name and Position */}
                    <div className="text-center">
                      <h3 className={`text-lg font-bold mb-1 ${getThemeColor('text.primary', isDark)} group-hover:${colors.brand.primary.text} transition-colors`}>
                        {deputy.name}
                      </h3>
                      <p className={`text-sm font-semibold ${colors.brand.secondary.text}`}>
                        {deputy.position}
                      </p>
                      <p className={`text-xs ${getThemeColor('text.muted', isDark)}`}>
                        {deputy.department}
                      </p>
                    </div>

                    {/* Specialization */}
                    <div className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg ${getThemeColor('card.primary', isDark)}`}>
                      <Target className={`w-4 h-4 ${colors.brand.primary.text}`} />
                      <span className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                        {deputy.specialization}
                      </span>
                    </div>

                    {/* Description */}
                    <p className={`text-xs ${getThemeColor('text.secondary', isDark)} text-center leading-relaxed line-clamp-3`}>
                      {deputy.description}
                    </p>

                    {/* Province Coverage */}
                    <div className="text-center">
                      <h4 className={`text-xs font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                        Coverage:
                      </h4>
                      <div className="flex flex-wrap justify-center gap-1">
                        {deputy.provinces.map((province, index) => (
                          <span 
                            key={index}
                            className={`px-2 py-1 rounded-full text-xs ${getThemeColor('badge.brand', isDark)} ${colors.brand.primary.text}`}
                          >
                            {province}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Contact Icons */}
                    <div className="flex justify-center space-x-3 pt-2">
                      <a 
                        href={`mailto:${deputy.email}`}
                        className={`p-2 rounded-lg ${getThemeColor('hover.background', isDark)} transition-all duration-300 hover:scale-110`}
                        title="Email"
                      >
                        <Mail className={`w-4 h-4 ${colors.brand.primary.text}`} />
                      </a>
                      <a 
                        href={`tel:${deputy.phone}`}
                        className={`p-2 rounded-lg ${getThemeColor('hover.background', isDark)} transition-all duration-300 hover:scale-110`}
                        title="Phone"
                      >
                        <Phone className={`w-4 h-4 ${colors.brand.secondary.text}`} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Leadership Support Framework */}
        <div className={`${getThemeColor('background.gradient.brand', isDark)} rounded-2xl p-8 border ${getThemeColor('border.brand.subtle', isDark)}`}>
          <h2 className={`text-2xl font-bold text-center mb-8 ${getThemeColor('text.primary', isDark)}`}>
            Deputy Leadership Framework
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 border ${getThemeColor('border.brand.subtle', isDark)}`}>
              <Users className={`w-10 h-10 mx-auto mb-3 ${colors.brand.primary.text}`} />
              <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                Team Leadership
              </h3>
              <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                Leading departmental teams and ensuring effective collaboration across all levels of the organization
              </p>
            </div>
            <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 border ${getThemeColor('border.brand.subtle', isDark)}`}>
              <TrendingUp className={`w-10 h-10 mx-auto mb-3 ${colors.brand.secondary.text}`} />
              <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                Performance Management
              </h3>
              <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                Monitoring and improving program effectiveness through data-driven decision making and continuous enhancement
              </p>
            </div>
            <div className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 border ${getThemeColor('border.brand.subtle', isDark)}`}>
              <Globe className={`w-10 h-10 mx-auto mb-3 ${colors.brand.primary.text}`} />
              <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                Strategic Implementation
              </h3>
              <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                Translating organizational vision into actionable programs that deliver measurable impact for Sri Lankan youth
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default DeputyDirectorsPage;