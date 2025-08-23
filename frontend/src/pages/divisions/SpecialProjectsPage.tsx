import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor, colors } from '../../config/colors';
import { Briefcase, Lightbulb, Rocket, Target, Globe, Users, TrendingUp, CheckCircle, Star, Zap, Cog, Award } from 'lucide-react';

const SpecialProjectsPage = () => {
  const { isDark } = useTheme();

  const projectCategories = [
    {
      icon: Rocket,
      title: "Innovation Initiatives",
      description: "Cutting-edge projects introducing new technologies, methodologies, and approaches to youth development.",
      projects: ["Digital Skills Academy", "AI-Powered Career Guidance", "Virtual Reality Training", "Blockchain Certification"],
      impact: "Tech-savvy youth workforce",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Globe,
      title: "International Partnerships",
      description: "Collaborative projects with global organizations to bring international best practices to Sri Lankan youth.",
      projects: ["UN Youth Programs", "Commonwealth Youth Exchange", "ASEAN Skills Initiative", "EU Green Skills Project"],
      impact: "Global perspective & opportunities",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: Target,
      title: "Strategic Development",
      description: "Long-term strategic projects aimed at transforming youth development landscape and organizational capacity.",
      projects: ["NYSC 2030 Vision", "Digital Transformation", "Center Modernization", "Leadership Academy"],
      impact: "Organizational excellence",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: Users,
      title: "Community Impact Projects",
      description: "Special initiatives addressing specific community needs and social challenges through youth engagement.",
      projects: ["Rural Youth Empowerment", "Urban Skills Initiative", "Climate Action Youth", "Social Enterprise Hub"],
      impact: "Community transformation",
      color: "from-orange-500 to-yellow-500"
    }
  ];

  const activeProjects = [
    {
      title: "Digital Youth Skills Academy",
      category: "Innovation",
      status: "Active",
      progress: 75,
      description: "Comprehensive digital skills training program preparing youth for the digital economy",
      beneficiaries: "2,000+",
      timeline: "2024-2025",
      outcomes: ["Digital literacy", "Job readiness", "Entrepreneurship skills", "Industry certifications"]
    },
    {
      title: "Green Skills Initiative",
      category: "Environment",
      status: "Active",
      progress: 60,
      description: "Environmental sustainability training and green job creation for climate-conscious youth",
      beneficiaries: "1,500+",
      timeline: "2024-2026",
      outcomes: ["Environmental awareness", "Green careers", "Sustainable practices", "Climate action"]
    },
    {
      title: "Youth Leadership Academy",
      category: "Leadership",
      status: "Planning",
      progress: 25,
      description: "Advanced leadership development program for high-potential youth leaders",
      beneficiaries: "500+",
      timeline: "2025-2027",
      outcomes: ["Leadership skills", "Strategic thinking", "Network building", "Mentorship capacity"]
    },
    {
      title: "Rural Innovation Hubs",
      category: "Rural Development",
      status: "Active",
      progress: 40,
      description: "Technology and innovation centers in rural areas to bridge the digital divide",
      beneficiaries: "3,000+",
      timeline: "2024-2026",
      outcomes: ["Rural connectivity", "Innovation culture", "Local solutions", "Economic development"]
    }
  ];

  const innovationAreas = [
    {
      area: "Digital Transformation",
      description: "Leveraging technology to enhance service delivery and youth engagement",
      technologies: ["AI & Machine Learning", "Mobile Applications", "Cloud Platforms", "Data Analytics"],
      initiatives: "15+"
    },
    {
      area: "Sustainable Development",
      description: "Integrating sustainability principles into all youth development programs",
      technologies: ["Green Technologies", "Renewable Energy", "Waste Management", "Sustainable Agriculture"],
      initiatives: "12+"
    },
    {
      area: "Social Innovation",
      description: "Developing creative solutions to address social challenges and community needs",
      technologies: ["Social Platforms", "Community Apps", "Impact Measurement", "Collaboration Tools"],
      initiatives: "20+"
    },
    {
      area: "Skills Evolution",
      description: "Anticipating and preparing for future skill requirements in emerging industries",
      technologies: ["VR/AR Training", "Simulation Platforms", "Adaptive Learning", "Skill Assessment"],
      initiatives: "18+"
    }
  ];

  const projectManagement = [
    {
      phase: "Ideation & Design",
      description: "Identifying opportunities, stakeholder consultation, and project conceptualization",
      duration: "2-3 months",
      activities: ["Needs assessment", "Stakeholder mapping", "Design thinking workshops", "Feasibility studies"]
    },
    {
      phase: "Planning & Approval",
      description: "Detailed project planning, resource allocation, and formal approval processes",
      duration: "1-2 months",
      activities: ["Project planning", "Budget allocation", "Risk assessment", "Approval workflows"]
    },
    {
      phase: "Implementation",
      description: "Project execution, monitoring, and adaptive management throughout delivery",
      duration: "6-24 months",
      activities: ["Execution management", "Progress monitoring", "Quality assurance", "Stakeholder communication"]
    },
    {
      phase: "Evaluation & Scale",
      description: "Impact assessment, learning capture, and scaling successful interventions",
      duration: "3-6 months",
      activities: ["Impact evaluation", "Learning documentation", "Scaling strategy", "Knowledge transfer"]
    }
  ];

  const impactMetrics = [
    {
      metric: "Active Projects",
      value: "25+",
      description: "Ongoing special initiatives across all categories",
      icon: Briefcase
    },
    {
      metric: "Youth Beneficiaries",
      value: "15K+",
      description: "Young people directly impacted by special projects",
      icon: Users
    },
    {
      metric: "Innovation Rate",
      value: "85%",
      description: "Projects incorporating innovative approaches",
      icon: Lightbulb
    },
    {
      metric: "Success Rate",
      value: "92%",
      description: "Projects meeting or exceeding objectives",
      icon: Target
    }
  ];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Divisions", href: "/divisions" },
    { label: "Special Project Division" }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Planning': return 'bg-blue-100 text-blue-700';
      case 'Completed': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <PageLayout 
      title="Special Project Division" 
      subtitle="Driving innovation and strategic development through transformative special projects that shape the future of youth development in Sri Lanka."
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Division Overview */}
        <div className={`mb-12 ${getThemeColor('card.glassy', isDark)} rounded-2xl p-8 border ${getThemeColor('border.subtle', isDark)}`}>
          <div className="flex items-center gap-6 mb-8">
            <div className={`p-4 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full ${colors.effects.glow.brand}`}>
              <Briefcase className="w-12 h-12 text-white" />
            </div>
            <div>
              <h2 className={`text-3xl font-bold ${colors.brand.gradient.text}`}>Special Project Division</h2>
              <p className={`${colors.brand.secondary.text} font-semibold text-lg`}>Innovation & Strategic Development</p>
            </div>
          </div>
          <p className={`text-lg ${getThemeColor('text.secondary', isDark)} leading-relaxed max-w-4xl`}>
            The Special Project Division serves as NYSC's innovation engine, implementing transformative initiatives 
            that pioneer new approaches, integrate cutting-edge technologies, and create strategic partnerships to 
            enhance youth development services and organizational excellence.
          </p>
        </div>

        {/* Project Categories */}
        <div className="mb-12">
          <h2 className={`text-2xl font-bold text-center mb-8 ${colors.brand.gradient.text}`}>
            Project Categories & Focus Areas
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projectCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div 
                  key={index}
                  className={`${getThemeColor('card.glassy', isDark)} rounded-xl overflow-hidden border ${getThemeColor('border.subtle', isDark)} ${colors.effects.glow.subtle} transition-all duration-300 hover:scale-[1.02]`}
                >
                  <div className={`bg-gradient-to-r ${category.color} p-6 text-white`}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                        <Icon className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{category.title}</h3>
                        <p className="text-sm opacity-90">{category.impact}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className={`${getThemeColor('text.secondary', isDark)} mb-4 leading-relaxed`}>
                      {category.description}
                    </p>
                    
                    <div>
                      <h4 className={`text-sm font-semibold mb-3 ${getThemeColor('text.primary', isDark)}`}>
                        Example Projects:
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {category.projects.map((project, idx) => (
                          <div key={idx} className={`flex items-center text-xs ${getThemeColor('text.secondary', isDark)}`}>
                            <Star className={`w-3 h-3 mr-2 ${colors.brand.secondary.text} flex-shrink-0`} />
                            {project}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Projects */}
        <div className="mb-12">
          <h2 className={`text-2xl font-bold text-center mb-8 ${colors.brand.gradient.text}`}>
            Current Active Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {activeProjects.map((project, index) => (
              <div 
                key={index}
                className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 border ${getThemeColor('border.brand.subtle', isDark)} transition-all duration-300 hover:scale-[1.02]`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className={`font-bold mb-1 ${getThemeColor('text.primary', isDark)}`}>
                      {project.title}
                    </h3>
                    <p className={`text-sm ${colors.brand.secondary.text} mb-2`}>
                      {project.category} • {project.timeline}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>

                <p className={`text-sm ${getThemeColor('text.secondary', isDark)} mb-4 leading-relaxed`}>
                  {project.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className={`${getThemeColor('text.primary', isDark)}`}>Progress</span>
                    <span className={`${colors.brand.primary.text} font-semibold`}>{project.progress}%</span>
                  </div>
                  <div className={`w-full ${getThemeColor('background.primary', isDark)} rounded-full h-2`}>
                    <div 
                      className={`${colors.brand.gradient.primary} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className={`text-xs ${getThemeColor('text.muted', isDark)}`}>Beneficiaries</p>
                    <p className={`font-bold ${colors.brand.primary.text}`}>{project.beneficiaries}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${getThemeColor('text.muted', isDark)}`}>Timeline</p>
                    <p className={`font-bold ${colors.brand.secondary.text}`}>{project.timeline}</p>
                  </div>
                </div>

                <div>
                  <h4 className={`text-sm font-semibold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                    Expected Outcomes:
                  </h4>
                  <div className="grid grid-cols-2 gap-1">
                    {project.outcomes.map((outcome, idx) => (
                      <div key={idx} className={`flex items-center text-xs ${getThemeColor('text.secondary', isDark)}`}>
                        <CheckCircle className={`w-3 h-3 mr-1 ${colors.brand.primary.text} flex-shrink-0`} />
                        {outcome}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Innovation Areas */}
        <div className="mb-12">
          <h2 className={`text-2xl font-bold text-center mb-8 ${colors.brand.gradient.text}`}>
            Innovation Focus Areas
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {innovationAreas.map((area, index) => (
              <div 
                key={index}
                className={`${getThemeColor('card.glassy', isDark)} rounded-xl p-6 border ${getThemeColor('border.subtle', isDark)} ${colors.effects.glow.subtle} transition-all duration-300 hover:scale-[1.02]`}
              >
                <div className={`w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg flex items-center justify-center mb-4`}>
                  <Zap className="w-6 h-6 text-white" />
                </div>
                
                <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                  {area.area}
                </h3>
                
                <p className={`text-sm ${getThemeColor('text.secondary', isDark)} mb-4 leading-relaxed`}>
                  {area.description}
                </p>

                <div className="mb-4">
                  <div className={`px-3 py-1 rounded-full ${getThemeColor('badge.brand', isDark)} ${colors.brand.primary.text} text-xs font-semibold inline-block`}>
                    {area.initiatives} Initiatives
                  </div>
                </div>

                <div>
                  <h4 className={`text-xs font-semibold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                    Key Technologies:
                  </h4>
                  <ul className="space-y-1">
                    {area.technologies.slice(0, 2).map((tech, idx) => (
                      <li key={idx} className={`text-xs ${getThemeColor('text.secondary', isDark)} flex items-start`}>
                        <span className={`w-1.5 h-1.5 ${colors.brand.primary.bg} rounded-full mr-2 mt-1.5 flex-shrink-0`}></span>
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Management Process */}
        <div className="mb-12">
          <h2 className={`text-2xl font-bold text-center mb-8 ${colors.brand.gradient.text}`}>
            Project Management Framework
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projectManagement.map((phase, index) => (
              <div 
                key={index}
                className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 border ${getThemeColor('border.brand.subtle', isDark)} relative transition-all duration-300 hover:scale-[1.02]`}
              >
                <div className={`absolute -top-4 left-6 w-8 h-8 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg`}>
                  {index + 1}
                </div>
                
                <div className="mt-4">
                  <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                    {phase.phase}
                  </h3>
                  <p className={`text-sm ${getThemeColor('text.secondary', isDark)} mb-3 leading-relaxed`}>
                    {phase.description}
                  </p>
                  <div className={`px-3 py-1 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 text-white text-xs font-semibold inline-block mb-3`}>
                    {phase.duration}
                  </div>
                  
                  <div>
                    <h4 className={`text-xs font-semibold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                      Key Activities:
                    </h4>
                    <ul className="space-y-1">
                      {phase.activities.slice(0, 2).map((activity, idx) => (
                        <li key={idx} className={`text-xs ${getThemeColor('text.secondary', isDark)} flex items-start`}>
                          <Cog className={`w-3 h-3 mr-1 ${colors.brand.secondary.text} mt-0.5 flex-shrink-0`} />
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Metrics & CTA */}
        <div className={`${getThemeColor('background.gradient.brand', isDark)} rounded-2xl p-8 border ${getThemeColor('border.brand.subtle', isDark)}`}>
          <h2 className={`text-2xl font-bold text-center mb-8 ${getThemeColor('text.primary', isDark)}`}>
            Innovation Impact & Achievements
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {impactMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div 
                  key={index}
                  className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 text-center border ${getThemeColor('border.brand.subtle', isDark)}`}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className={`font-bold mb-1 ${getThemeColor('text.primary', isDark)}`}>
                    {metric.metric}
                  </h3>
                  <p className={`text-3xl font-bold mb-2 ${colors.brand.gradient.text}`}>
                    {metric.value}
                  </p>
                  <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                    {metric.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <p className={`${getThemeColor('text.secondary', isDark)} max-w-3xl mx-auto leading-relaxed mb-6`}>
              Through innovative special projects, we continuously push boundaries, embrace new technologies, 
              and create transformative opportunities that prepare Sri Lankan youth for the challenges and 
              opportunities of tomorrow's world.
            </p>
            <div className="flex justify-center gap-4">
              <button className={`inline-flex items-center px-6 py-3 ${colors.button.primary.base} ${colors.button.primary.hover} ${colors.button.primary.shadow} rounded-lg font-semibold transition-all duration-300`}>
                <Rocket className="w-4 h-4 mr-2" />
                Explore Projects
              </button>
              <button className={`inline-flex items-center px-6 py-3 ${getThemeColor('button.secondary', isDark)} rounded-lg font-semibold transition-all duration-300 hover:scale-[1.02]`}>
                <Award className="w-4 h-4 mr-2" />
                Project Proposals
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SpecialProjectsPage;