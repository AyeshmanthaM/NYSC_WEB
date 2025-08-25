import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor, colors } from '../../config/colors';
import { Heart, Users, Calendar, Trophy, Star, Play, Camera, UserPlus, Clock, MapPin, Award, Sparkles } from 'lucide-react';
import { useTranslationWithNamespace } from '../../hooks/useTranslationWithNamespace';
import { useState } from 'react';

const YouthDancingTeam = () => {
  const { isDark } = useTheme();
  const { t, ready } = useTranslationWithNamespace('services');
  const [activeStyle, setActiveStyle] = useState(0);
  const [selectedPerformance, setSelectedPerformance] = useState(null);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Youth Dancing Team" }
  ];

  // Dance styles and specializations
  const danceStyles = [
    {
      icon: Star,
      title: "Traditional Kandyan",
      description: "Classical Kandyan dance preserving ancient Sri Lankan cultural heritage",
      features: ["Ves Dance", "Naiyandi", "Uddekki", "Pantheru"],
      color: "from-amber-500 to-orange-500",
      performers: 25
    },
    {
      icon: Heart,
      title: "Low Country Dance",
      description: "Southern coastal traditional dance forms with vibrant expressions",
      features: ["Ruhunu Dance", "Pahatharata", "Folk Stories", "Coastal Culture"],
      color: "from-blue-500 to-cyan-500",
      performers: 20
    },
    {
      icon: Trophy,
      title: "Sabaragamuwa Dance",
      description: "Central highland dance traditions with unique rhythms and movements",
      features: ["Sabaragamu", "Hill Country", "Tea Estate Culture", "Mountain Folk"],
      color: "from-green-500 to-emerald-500",
      performers: 18
    },
    {
      icon: Users,
      title: "Contemporary Fusion",
      description: "Modern interpretations blending traditional and contemporary styles",
      features: ["Cultural Fusion", "Modern Choreography", "International Elements", "Youth Expression"],
      color: "from-purple-500 to-pink-500",
      performers: 30
    }
  ];

  // Performance gallery (sample data)
  const performanceGallery = [
    {
      id: 1,
      title: "National Independence Day Celebration",
      venue: "Galle Face Green, Colombo",
      date: "2024-02-04",
      type: "National Event",
      audience: "50,000+",
      image: "🎭"
    },
    {
      id: 2,
      title: "Vesak Festival Cultural Show",
      venue: "Temple of the Tooth, Kandy",
      date: "2024-05-23",
      type: "Religious Festival",
      audience: "10,000+",
      image: "🏛️"
    },
    {
      id: 3,
      title: "SAARC Cultural Festival",
      venue: "BMICH, Colombo",
      date: "2024-03-15",
      type: "International",
      audience: "5,000+",
      image: "🌏"
    },
    {
      id: 4,
      title: "Youth Cultural Showcase",
      venue: "Nelum Pokuna Theatre",
      date: "2024-01-20",
      type: "Youth Event",
      audience: "2,000+",
      image: "🎨"
    }
  ];

  // Training programs
  const trainingPrograms = [
    {
      level: "Beginner",
      duration: "3 Months",
      sessions: "2 per week",
      focus: "Basic movements and cultural understanding",
      spots: 20
    },
    {
      level: "Intermediate",
      duration: "6 Months",
      sessions: "3 per week",
      focus: "Advanced techniques and choreography",
      spots: 15
    },
    {
      level: "Advanced",
      duration: "1 Year",
      sessions: "4 per week",
      focus: "Performance preparation and mastery",
      spots: 10
    },
    {
      level: "Professional",
      duration: "Ongoing",
      sessions: "Daily",
      focus: "International performances and competitions",
      spots: 8
    }
  ];

  // Achievements and awards
  const achievements = [
    {
      year: "2023",
      event: "National Cultural Festival",
      award: "Gold Medal - Traditional Dance",
      description: "Outstanding performance in Kandyan dance category"
    },
    {
      year: "2023",
      event: "SAARC Youth Festival",
      award: "Best Cultural Representation",
      description: "Exceptional showcase of Sri Lankan heritage"
    },
    {
      year: "2022",
      event: "Asian Cultural Exchange",
      award: "Excellence in Traditional Arts",
      description: "Recognition for preserving cultural authenticity"
    },
    {
      year: "2022",
      event: "International Folk Dance Competition",
      award: "Silver Medal",
      description: "Second place in South Asian category"
    }
  ];

  // Upcoming events
  const upcomingEvents = [
    {
      title: "Annual Cultural Gala",
      date: "2024-04-15",
      venue: "Colombo Theatre",
      type: "Performance",
      description: "Grand showcase featuring all dance styles"
    },
    {
      title: "Traditional Dance Workshop",
      date: "2024-03-20",
      venue: "NYSC Cultural Center",
      type: "Workshop",
      description: "Intensive training for aspiring dancers"
    },
    {
      title: "International Youth Festival",
      date: "2024-05-10",
      venue: "Various Venues",
      type: "Competition",
      description: "Compete with international youth dance teams"
    }
  ];

  return (
    <PageLayout 
      title="Youth Dancing Team" 
      subtitle="Preserving Sri Lankan cultural heritage through traditional and contemporary dance artistry"
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className={`mb-12 ${getThemeColor('card.glassy', isDark)} rounded-3xl p-8 md:p-12 relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-4">
                <Heart className="w-10 h-10 text-pink-500 mr-3" />
                <h2 className={`text-3xl font-bold ${colors.brand.gradient.text}`}>
                  Cultural Heritage in Motion
                </h2>
              </div>
              <p className={`text-lg ${getThemeColor('text.secondary', isDark)} mb-6 leading-relaxed`}>
                The NYSC Youth Dancing Team serves as cultural ambassadors, preserving and promoting 
                Sri Lanka's rich dance traditions while fostering artistic innovation. Our talented performers 
                represent the beauty and diversity of Sri Lankan culture on national and international stages.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className={`px-4 py-2 ${getThemeColor('background.secondary', isDark)} rounded-lg`}>
                  <Star className="inline-block w-4 h-4 mr-2 text-yellow-500" />
                  <span className={`text-sm ${getThemeColor('text.primary', isDark)}`}>Traditional Arts</span>
                </div>
                <div className={`px-4 py-2 ${getThemeColor('background.secondary', isDark)} rounded-lg`}>
                  <Trophy className="inline-block w-4 h-4 mr-2 text-gold-500" />
                  <span className={`text-sm ${getThemeColor('text.primary', isDark)}`}>Award Winning</span>
                </div>
                <div className={`px-4 py-2 ${getThemeColor('background.secondary', isDark)} rounded-lg`}>
                  <Users className="inline-block w-4 h-4 mr-2 text-blue-500" />
                  <span className={`text-sm ${getThemeColor('text.primary', isDark)}`}>93 Dancers</span>
                </div>
              </div>
            </div>
            
            {/* Team Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className={`${getThemeColor('background.card', isDark)} rounded-xl p-6 text-center hover:scale-105 transition-transform`}>
                <Trophy className={`w-8 h-8 mx-auto mb-2 ${colors.brand.primary.text}`} />
                <div className={`text-2xl font-bold ${colors.brand.gradient.text}`}>50+</div>
                <div className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>Performances</div>
              </div>
              <div className={`${getThemeColor('background.card', isDark)} rounded-xl p-6 text-center hover:scale-105 transition-transform`}>
                <Award className={`w-8 h-8 mx-auto mb-2 ${colors.brand.primary.text}`} />
                <div className={`text-2xl font-bold ${colors.brand.gradient.text}`}>15</div>
                <div className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>Awards</div>
              </div>
              <div className={`${getThemeColor('background.card', isDark)} rounded-xl p-6 text-center hover:scale-105 transition-transform`}>
                <Calendar className={`w-8 h-8 mx-auto mb-2 ${colors.brand.primary.text}`} />
                <div className={`text-2xl font-bold ${colors.brand.gradient.text}`}>12</div>
                <div className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>Annual Shows</div>
              </div>
              <div className={`${getThemeColor('background.card', isDark)} rounded-xl p-6 text-center hover:scale-105 transition-transform`}>
                <Sparkles className={`w-8 h-8 mx-auto mb-2 ${colors.brand.primary.text}`} />
                <div className={`text-2xl font-bold ${colors.brand.gradient.text}`}>4</div>
                <div className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>Dance Styles</div>
              </div>
            </div>
          </div>
        </div>

        {/* Dance Styles */}
        <div className="mb-16">
          <h2 className={`text-2xl font-bold mb-8 text-center ${getThemeColor('text.primary', isDark)}`}>
            Our Dance Specializations
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {danceStyles.map((style, index) => (
              <div 
                key={index}
                onMouseEnter={() => setActiveStyle(index)}
                className={`${getThemeColor('card.glassy', isDark)} rounded-xl p-6 border ${getThemeColor('border.subtle', isDark)} transition-all duration-300 hover:shadow-xl group ${
                  activeStyle === index ? 'scale-105' : ''
                }`}
              >
                <div className={`p-3 bg-gradient-to-r ${style.color} rounded-xl mb-4 inline-block group-hover:scale-110 transition-transform`}>
                  <style.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-lg font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                  {style.title}
                </h3>
                <p className={`text-sm ${getThemeColor('text.secondary', isDark)} mb-4`}>
                  {style.description}
                </p>
                <div className={`text-center mb-4 px-3 py-2 ${getThemeColor('background.secondary', isDark)} rounded-lg`}>
                  <span className={`text-sm font-semibold ${colors.brand.primary.text}`}>
                    {style.performers} Active Performers
                  </span>
                </div>
                <ul className="space-y-1">
                  {style.features.map((feature, idx) => (
                    <li key={idx} className={`text-xs ${getThemeColor('text.secondary', isDark)} flex items-center`}>
                      <Star className="w-3 h-3 mr-2 text-yellow-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Gallery */}
        <div className={`mb-16 ${getThemeColor('card.glassy', isDark)} rounded-3xl p-8 md:p-12`}>
          <h2 className={`text-2xl font-bold mb-8 text-center ${getThemeColor('text.primary', isDark)}`}>
            Recent Performance Highlights
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {performanceGallery.map((performance) => (
              <div 
                key={performance.id}
                className={`${getThemeColor('background.card', isDark)} rounded-xl p-6 hover:scale-105 transition-transform cursor-pointer`}
                onClick={() => setSelectedPerformance(performance)}
              >
                <div className="text-6xl mb-4 text-center">{performance.image}</div>
                <h3 className={`font-bold mb-2 text-sm ${getThemeColor('text.primary', isDark)}`}>
                  {performance.title}
                </h3>
                <p className={`text-xs mb-2 ${getThemeColor('text.secondary', isDark)}`}>
                  {performance.venue}
                </p>
                <div className="flex justify-between items-center">
                  <span className={`text-xs ${colors.brand.primary.text}`}>
                    {new Date(performance.date).toLocaleDateString()}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs ${getThemeColor('background.secondary', isDark)} ${getThemeColor('text.primary', isDark)}`}>
                    {performance.audience}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Training Programs */}
        <div className="mb-16">
          <h2 className={`text-2xl font-bold mb-8 text-center ${getThemeColor('text.primary', isDark)}`}>
            Training Programs
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trainingPrograms.map((program, index) => (
              <div 
                key={index}
                className={`${getThemeColor('card.glassy', isDark)} rounded-xl p-6 border ${getThemeColor('border.subtle', isDark)} hover:scale-105 transition-transform`}
              >
                <div className={`text-center mb-4`}>
                  <h3 className={`text-xl font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                    {program.level}
                  </h3>
                  <div className={`px-3 py-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full text-sm font-semibold inline-block`}>
                    {program.spots} Spots Available
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>Duration:</span>
                    <span className={`text-sm font-semibold ${getThemeColor('text.primary', isDark)}`}>{program.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>Sessions:</span>
                    <span className={`text-sm font-semibold ${getThemeColor('text.primary', isDark)}`}>{program.sessions}</span>
                  </div>
                  <div className={`p-3 ${getThemeColor('background.secondary', isDark)} rounded-lg`}>
                    <p className={`text-xs ${getThemeColor('text.primary', isDark)}`}>
                      {program.focus}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-16">
          <h2 className={`text-2xl font-bold mb-8 text-center ${getThemeColor('text.primary', isDark)}`}>
            Awards & Recognition
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className={`${getThemeColor('card.glassy', isDark)} rounded-xl p-6 border ${getThemeColor('border.subtle', isDark)} hover:scale-105 transition-transform`}
              >
                <div className="flex items-start">
                  <div className="p-3 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl mr-4 flex-shrink-0">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm font-semibold mb-1 ${colors.brand.primary.text}`}>
                      {achievement.year}
                    </div>
                    <h3 className={`text-lg font-bold mb-1 ${getThemeColor('text.primary', isDark)}`}>
                      {achievement.event}
                    </h3>
                    <div className={`text-sm font-semibold mb-2 ${colors.brand.gradient.text}`}>
                      {achievement.award}
                    </div>
                    <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className={`mb-16 ${getThemeColor('card.glassy', isDark)} rounded-3xl p-8 md:p-12`}>
          <h2 className={`text-2xl font-bold mb-8 text-center ${getThemeColor('text.primary', isDark)}`}>
            Upcoming Performances & Events
          </h2>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div 
                key={index}
                className={`${getThemeColor('background.card', isDark)} rounded-xl p-6 border ${getThemeColor('border.subtle', isDark)} hover:scale-105 transition-transform`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className={`w-8 h-8 mr-4 ${colors.brand.primary.text}`} />
                    <div>
                      <h3 className={`text-lg font-bold ${getThemeColor('text.primary', isDark)}`}>
                        {event.title}
                      </h3>
                      <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                        {event.description}
                      </p>
                      <div className="flex items-center mt-2 space-x-4">
                        <span className={`text-sm ${colors.brand.primary.text}`}>
                          📅 {new Date(event.date).toLocaleDateString()}
                        </span>
                        <span className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                          📍 {event.venue}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={`px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg text-sm font-semibold`}>
                    {event.type}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center ${getThemeColor('card.glassy', isDark)} rounded-3xl p-8 md:p-12 border ${getThemeColor('border.subtle', isDark)}`}>
          <h2 className={`text-3xl font-bold mb-6 ${colors.brand.gradient.text}`}>
            Join Our Dance Family
          </h2>
          <p className={`text-lg ${getThemeColor('text.secondary', isDark)} mb-8 max-w-3xl mx-auto`}>
            Discover your passion for Sri Lankan cultural dance. Whether you're a beginner or experienced dancer, 
            we welcome you to be part of preserving and celebrating our beautiful heritage.
          </p>
          
          <div className="max-w-2xl mx-auto">
            <div className={`grid md:grid-cols-2 gap-4 mb-8 ${getThemeColor('background.secondary', isDark)} rounded-xl p-6`}>
              <div className="text-left">
                <h4 className={`font-semibold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                  Training Schedule
                </h4>
                <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                  Monday - Friday: 5:00 PM - 8:00 PM<br/>
                  Saturday: 9:00 AM - 4:00 PM<br/>
                  Sunday: Performance practice
                </p>
              </div>
              <div className="text-left">
                <h4 className={`font-semibold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                  Requirements
                </h4>
                <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                  Ages 16-29<br/>
                  Basic fitness level<br/>
                  Passion for cultural arts
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg">
                <UserPlus className="w-4 h-4 mr-2" />
                Apply for Audition
              </button>
              <button className={`inline-flex items-center px-8 py-3 ${getThemeColor('background.secondary', isDark)} ${getThemeColor('text.primary', isDark)} rounded-lg font-semibold hover:scale-105 transition-transform`}>
                <Calendar className="w-4 h-4 mr-2" />
                View Schedule
              </button>
              <button className={`inline-flex items-center px-8 py-3 ${getThemeColor('background.secondary', isDark)} ${getThemeColor('text.primary', isDark)} rounded-lg font-semibold hover:scale-105 transition-transform`}>
                <Camera className="w-4 h-4 mr-2" />
                Performance Gallery
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default YouthDancingTeam;