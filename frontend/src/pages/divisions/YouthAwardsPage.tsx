import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor, colors } from '../../config/colors';
import { Award, Star, Trophy, Medal, Users, Calendar, Target, TrendingUp, CheckCircle, Sparkles, Crown, Gift } from 'lucide-react';
import { useTranslationWithNamespace } from '../../hooks/useTranslationWithNamespace';

const YouthAwardsPage = () => {
  const { isDark } = useTheme();
  const { t, ready } = useTranslationWithNamespace('divisions');

  const awardCategories = [
    {
      icon: Crown,
      title: "Presidential Youth Awards",
      description: "The highest recognition for exceptional youth achievements in leadership, innovation, and community service.",
      criteria: ["Outstanding leadership", "Community impact", "Innovation excellence", "National recognition"],
      recipients: "5-10 annually",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Star,
      title: "Youth Excellence Awards",
      description: "Recognizing outstanding achievements in academics, sports, arts, and vocational training programs.",
      criteria: ["Academic excellence", "Sports achievements", "Artistic talent", "Vocational mastery"],
      recipients: "50+ annually",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Trophy,
      title: "Community Service Awards",
      description: "Honoring youth who have made significant contributions to community development and social welfare.",
      criteria: ["Community impact", "Volunteer service", "Social initiatives", "Sustained commitment"],
      recipients: "100+ annually",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: Medal,
      title: "Skills Championship Awards",
      description: "Celebrating excellence in technical and vocational skills across various industries and trades.",
      criteria: ["Technical mastery", "Innovation in skills", "Industry recognition", "Mentorship contribution"],
      recipients: "200+ annually",
      color: "from-purple-500 to-indigo-500"
    }
  ];

  const recognitionPrograms = [
    {
      program: "Annual Youth Awards Ceremony",
      description: "Grand celebration of youth achievements with dignitaries, parents, and community leaders",
      frequency: "Annual",
      participants: "500+",
      features: ["Award presentations", "Cultural performances", "Networking opportunities", "Media coverage"]
    },
    {
      program: "Monthly Recognition Events",
      description: "Regular recognition of outstanding achievements at provincial and district levels",
      frequency: "Monthly",
      participants: "100+",
      features: ["Local recognition", "Community involvement", "Peer celebrations", "Motivation building"]
    },
    {
      program: "Digital Achievement Portfolio",
      description: "Online showcase of award recipients and their achievements for inspiration and networking",
      frequency: "Ongoing",
      participants: "All recipients",
      features: ["Digital certificates", "Achievement profiles", "Success stories", "Alumni network"]
    }
  ];

  const awardProcess = [
    {
      step: 1,
      title: "Nomination Process",
      description: "Open nominations from training centers, communities, and self-nominations with comprehensive application",
      duration: "3 months",
      activities: ["Application submission", "Documentation review", "Eligibility verification", "Initial screening"]
    },
    {
      step: 2,
      title: "Evaluation & Assessment",
      description: "Expert panels evaluate nominees based on established criteria and merit-based assessment",
      duration: "2 months",
      activities: ["Panel reviews", "Criteria assessment", "Background verification", "Interview process"]
    },
    {
      step: 3,
      title: "Selection & Approval",
      description: "Final selection by award committees and approval by senior management and board members",
      duration: "1 month",
      activities: ["Committee decisions", "Final approvals", "Winner notifications", "Ceremony planning"]
    },
    {
      step: 4,
      title: "Recognition & Celebration",
      description: "Official award ceremonies, media coverage, and ongoing recognition through various platforms",
      duration: "Ongoing",
      activities: ["Award ceremonies", "Media releases", "Certificate presentations", "Follow-up support"]
    }
  ];

  const impactMetrics = [
    {
      metric: "Awards Presented",
      value: "500+",
      description: "Annual recognition across all categories",
      icon: Award,
      trend: "+15% yearly"
    },
    {
      metric: "Youth Inspired",
      value: "10K+",
      description: "Young people motivated through recognition",
      icon: Users,
      trend: "+25% yearly"
    },
    {
      metric: "Community Impact",
      value: "1M+",
      description: "Lives touched through award recipients' work",
      icon: Target,
      trend: "+30% yearly"
    },
    {
      metric: "Success Stories",
      value: "1K+",
      description: "Documented achievement narratives",
      icon: Star,
      trend: "+20% yearly"
    }
  ];

  const excellenceStandards = [
    {
      standard: "Merit-Based Selection",
      description: "All awards based purely on merit, achievement, and contribution without bias or favoritism"
    },
    {
      standard: "Transparent Process",
      description: "Open and transparent nomination, evaluation, and selection processes with clear criteria"
    },
    {
      standard: "Comprehensive Recognition",
      description: "Multiple categories ensuring recognition across diverse fields and achievement types"
    },
    {
      standard: "Ongoing Support",
      description: "Continued mentorship and support for award recipients in their future endeavors"
    },
    {
      standard: "Community Involvement",
      description: "Engaging communities, families, and peers in the recognition and celebration process"
    }
  ];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Divisions", href: "/divisions" },
    { label: "National Youth Award Division" }
  ];

  return (
    <PageLayout 
      title="National Youth Award Division" 
      subtitle="Celebrating excellence and inspiring achievement through comprehensive recognition programs that honor outstanding youth contributions across Sri Lanka."
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Division Overview */}
        <div className={`mb-12 ${getThemeColor('card.glassy', isDark)} rounded-2xl p-8 border ${getThemeColor('border.subtle', isDark)}`}>
          <div className="flex items-center gap-6 mb-8">
            <div className={`p-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full ${colors.effects.glow.brand}`}>
              <Award className="w-12 h-12 text-white" />
            </div>
            <div>
              <h2 className={`text-3xl font-bold ${colors.brand.gradient.text}`}>National Youth Award Division</h2>
              <p className={`${colors.brand.secondary.text} font-semibold text-lg`}>Excellence Recognition & Celebration</p>
            </div>
          </div>
          <p className={`text-lg ${getThemeColor('text.secondary', isDark)} leading-relaxed max-w-4xl`}>
            The National Youth Award Division serves as the pinnacle of recognition for Sri Lankan youth, celebrating 
            exceptional achievements, inspiring excellence, and creating a culture of recognition that motivates young 
            people to reach their full potential across diverse fields of endeavor.
          </p>
        </div>

        {/* Award Categories */}
        <div className="mb-12">
          <h2 className={`text-2xl font-bold text-center mb-8 ${colors.brand.gradient.text}`}>
            Award Categories & Recognition Levels
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {awardCategories.map((category, index) => {
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
                        <p className="text-sm opacity-90">{category.recipients}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className={`${getThemeColor('text.secondary', isDark)} mb-4 leading-relaxed`}>
                      {category.description}
                    </p>
                    
                    <div>
                      <h4 className={`text-sm font-semibold mb-3 ${getThemeColor('text.primary', isDark)}`}>
                        Selection Criteria:
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {category.criteria.map((criterion, idx) => (
                          <div key={idx} className={`flex items-center text-xs ${getThemeColor('text.secondary', isDark)}`}>
                            <Sparkles className={`w-3 h-3 mr-2 ${colors.brand.secondary.text} flex-shrink-0`} />
                            {criterion}
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

        {/* Recognition Programs */}
        <div className="mb-12">
          <h2 className={`text-2xl font-bold text-center mb-8 ${colors.brand.gradient.text}`}>
            Recognition Programs & Events
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {recognitionPrograms.map((program, index) => (
              <div 
                key={index}
                className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 border ${getThemeColor('border.brand.subtle', isDark)} transition-all duration-300 hover:scale-[1.02]`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg`}>
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`font-bold ${getThemeColor('text.primary', isDark)}`}>
                      {program.program}
                    </h3>
                    <p className={`text-sm ${colors.brand.secondary.text}`}>
                      {program.frequency} • {program.participants}
                    </p>
                  </div>
                </div>
                
                <p className={`text-sm ${getThemeColor('text.secondary', isDark)} mb-4 leading-relaxed`}>
                  {program.description}
                </p>
                
                <div>
                  <h4 className={`text-sm font-semibold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                    Program Features:
                  </h4>
                  <ul className="space-y-1">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className={`flex items-center text-xs ${getThemeColor('text.secondary', isDark)}`}>
                        <CheckCircle className={`w-3 h-3 mr-2 ${colors.brand.primary.text} flex-shrink-0`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Award Process */}
        <div className="mb-12">
          <h2 className={`text-2xl font-bold text-center mb-8 ${colors.brand.gradient.text}`}>
            Award Selection Process
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {awardProcess.map((process, index) => (
              <div 
                key={index}
                className={`${getThemeColor('card.glassy', isDark)} rounded-xl p-6 border ${getThemeColor('border.subtle', isDark)} relative ${colors.effects.glow.subtle}`}
              >
                <div className={`absolute -top-4 left-6 w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg`}>
                  {process.step}
                </div>
                
                <div className="mt-4">
                  <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                    {process.title}
                  </h3>
                  <p className={`text-sm ${getThemeColor('text.secondary', isDark)} mb-3 leading-relaxed`}>
                    {process.description}
                  </p>
                  <div className={`px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-semibold inline-block mb-3`}>
                    {process.duration}
                  </div>
                  
                  <div>
                    <h4 className={`text-xs font-semibold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                      Key Activities:
                    </h4>
                    <ul className="space-y-1">
                      {process.activities.slice(0, 2).map((activity, idx) => (
                        <li key={idx} className={`text-xs ${getThemeColor('text.secondary', isDark)} flex items-start`}>
                          <span className={`w-1.5 h-1.5 ${colors.brand.secondary.bg} rounded-full mr-2 mt-1.5 flex-shrink-0`}></span>
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

        {/* Impact Metrics */}
        <div className="mb-12">
          <h2 className={`text-2xl font-bold text-center mb-8 ${colors.brand.gradient.text}`}>
            Recognition Impact & Growth
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div 
                  key={index}
                  className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 text-center border ${getThemeColor('border.brand.subtle', isDark)} transition-all duration-300 hover:scale-[1.02]`}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className={`font-bold mb-1 ${getThemeColor('text.primary', isDark)}`}>
                    {metric.metric}
                  </h3>
                  <p className={`text-3xl font-bold mb-1 ${colors.brand.gradient.text}`}>
                    {metric.value}
                  </p>
                  <p className={`text-sm ${getThemeColor('text.secondary', isDark)} mb-2`}>
                    {metric.description}
                  </p>
                  <div className={`px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold inline-flex items-center gap-1`}>
                    <TrendingUp className="w-3 h-3" />
                    {metric.trend}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Excellence Standards */}
        <div className={`${getThemeColor('background.gradient.brand', isDark)} rounded-2xl p-8 border ${getThemeColor('border.brand.subtle', isDark)}`}>
          <h2 className={`text-2xl font-bold text-center mb-8 ${getThemeColor('text.primary', isDark)}`}>
            Excellence Standards & Principles
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {excellenceStandards.map((standard, index) => (
              <div 
                key={index}
                className={`${getThemeColor('card.primary', isDark)} rounded-xl p-6 border ${getThemeColor('border.brand.subtle', isDark)}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex-shrink-0`}>
                    <Gift className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className={`font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                      {standard.standard}
                    </h3>
                    <p className={`text-sm ${getThemeColor('text.secondary', isDark)} leading-relaxed`}>
                      {standard.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className={`${getThemeColor('text.secondary', isDark)} max-w-3xl mx-auto leading-relaxed`}>
              Through comprehensive recognition programs, we celebrate achievement, inspire excellence, and create 
              a culture where every young person's contribution is valued and their potential is recognized and nurtured.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default YouthAwardsPage;