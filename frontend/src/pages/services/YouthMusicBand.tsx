import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor, colors } from '../../config/colors';
import { Music, Users, Calendar, Trophy, Volume2, Play, UserPlus, Clock, MapPin, Award, Headphones, Guitar } from 'lucide-react';
import { useTranslationWithNamespace } from '../../hooks/useTranslationWithNamespace';
import { useState } from 'react';

const YouthMusicBand = () => {
  const { isDark } = useTheme();
  const { t, ready } = useTranslationWithNamespace('services');
  const [activeSection, setActiveSection] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState('Traditional');

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Youth Music Band" }
  ];

  // Musical sections and instruments
  const musicalSections = [
    {
      icon: Guitar,
      category: "Traditional",
      description: "Preserving Sri Lankan musical heritage through classical instruments",
      instruments: ["Tabla", "Mridangam", "Flute", "Sitar", "Harmonium", "Geta Beraya"],
      members: 20,
      color: "from-amber-500 to-orange-500",
      repertoire: ["Classical Ragas", "Folk Songs", "Religious Music", "Cultural Ceremonies"]
    },
    {
      icon: Music,
      category: "Western Classical",
      description: "Orchestral excellence with classical Western instruments",
      instruments: ["Violin", "Cello", "Piano", "Clarinet", "Oboe", "French Horn"],
      members: 18,
      color: "from-blue-500 to-cyan-500",
      repertoire: ["Symphony", "Chamber Music", "Concertos", "Classical Pieces"]
    },
    {
      icon: Volume2,
      category: "Brass Ensemble",
      description: "Powerful brass section for ceremonial and concert performances",
      instruments: ["Trumpet", "Trombone", "Tuba", "Saxophone", "Euphonium", "Cornet"],
      members: 15,
      color: "from-yellow-500 to-gold-500",
      repertoire: ["Ceremonial Music", "March Music", "Jazz Standards", "Popular Songs"]
    },
    {
      icon: Users,
      category: "Contemporary",
      description: "Modern musical expressions and contemporary arrangements",
      instruments: ["Electric Guitar", "Bass Guitar", "Drums", "Keyboard", "Vocals", "Electronics"],
      members: 22,
      color: "from-purple-500 to-pink-500",
      repertoire: ["Pop Music", "Rock Fusion", "Contemporary Arrangements", "Youth Anthems"]
    }
  ];

  // Musical genres and styles
  const musicalGenres = [
    { name: "Traditional", performances: 25, description: "Classical Sri Lankan music" },
    { name: "Western Classical", performances: 20, description: "Orchestral and chamber music" },
    { name: "Contemporary", performances: 30, description: "Modern and fusion styles" },
    { name: "Cultural Fusion", performances: 18, description: "East-West musical blends" }
  ];

  // Performance highlights
  const performanceHighlights = [
    {
      title: "National Independence Day Parade",
      date: "2024-02-04",
      venue: "Galle Face Green",
      type: "National Ceremony",
      audience: "100,000+",
      description: "Grand patriotic musical performance"
    },
    {
      title: "Youth Music Festival",
      date: "2024-03-25",
      venue: "BMICH Colombo",
      type: "Competition",
      audience: "5,000+",
      description: "Competitive musical showcase"
    },
    {
      title: "Cultural Heritage Concert",
      date: "2024-04-20",
      venue: "Nelum Pokuna Theatre",
      type: "Concert",
      audience: "2,000+",
      description: "Traditional and contemporary fusion"
    },
    {
      title: "International Youth Orchestra",
      date: "2024-05-15",
      venue: "Various International Venues",
      type: "International",
      audience: "Global",
      description: "Cultural exchange program"
    }
  ];

  // Training and development programs
  const trainingPrograms = [
    {
      level: "Foundation",
      duration: "3 Months",
      focus: "Basic music theory and instrument introduction",
      schedule: "Weekends",
      capacity: 30,
      fee: "Free"
    },
    {
      level: "Intermediate",
      duration: "6 Months",
      focus: "Advanced techniques and ensemble playing",
      schedule: "Twice weekly",
      capacity: 25,
      fee: "Subsidized"
    },
    {
      level: "Advanced",
      duration: "1 Year",
      focus: "Performance mastery and composition",
      schedule: "Regular rehearsals",
      capacity: 20,
      fee: "Nominal"
    },
    {
      level: "Elite Ensemble",
      duration: "Ongoing",
      focus: "Professional-level performances",
      schedule: "Intensive",
      capacity: 15,
      fee: "Scholarship based"
    }
  ];

  // Recent achievements
  const achievements = [
    {
      year: "2023",
      title: "National Youth Music Competition",
      award: "Grand Prize Winner",
      category: "Best Overall Ensemble",
      description: "Outstanding performance across multiple categories"
    },
    {
      year: "2023",
      title: "SAARC Cultural Festival",
      award: "Excellence in Traditional Music",
      category: "Cultural Preservation",
      description: "Recognized for authentic Sri Lankan musical presentation"
    },
    {
      year: "2022",
      title: "International Youth Orchestra Festival",
      award: "Best Fusion Performance",
      category: "Innovation",
      description: "Creative blend of Eastern and Western musical traditions"
    },
    {
      year: "2022",
      title: "Community Service Awards",
      award: "Outstanding Community Engagement",
      category: "Social Impact",
      description: "Music education outreach to rural communities"
    }
  ];

  return (
    <PageLayout 
      title="Youth Music Band" 
      subtitle="Harmonizing talent and tradition through musical excellence and cultural expression"
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className={`mb-12 ${getThemeColor('card.glassy', isDark)} rounded-3xl p-8 md:p-12 relative overflow-hidden`}>
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-4">
                <Music className="w-10 h-10 text-indigo-500 mr-3" />
                <h2 className={`text-3xl font-bold ${colors.brand.gradient.text}`}>
                  Musical Excellence
                </h2>
              </div>
              <p className={`text-lg ${getThemeColor('text.secondary', isDark)} mb-6 leading-relaxed`}>
                The NYSC Youth Music Band represents the harmonious blend of Sri Lankan cultural heritage 
                and contemporary musical expression. As one of the most attractive resources of the youth community, 
                our ensemble serves as cultural ambassadors, preserving traditional music while embracing innovation.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className={`px-4 py-2 ${getThemeColor('background.secondary', isDark)} rounded-lg`}>
                  <Music className="inline-block w-4 h-4 mr-2 text-indigo-500" />
                  <span className={`text-sm ${getThemeColor('text.primary', isDark)}`}>Cultural Heritage</span>
                </div>
                <div className={`px-4 py-2 ${getThemeColor('background.secondary', isDark)} rounded-lg`}>
                  <Trophy className="inline-block w-4 h-4 mr-2 text-yellow-500" />
                  <span className={`text-sm ${getThemeColor('text.primary', isDark)}`}>Award Winning</span>
                </div>
                <div className={`px-4 py-2 ${getThemeColor('background.secondary', isDark)} rounded-lg`}>
                  <Users className="inline-block w-4 h-4 mr-2 text-green-500" />
                  <span className={`text-sm ${getThemeColor('text.primary', isDark)}`}>75 Musicians</span>
                </div>
              </div>
            </div>
            
            {/* Music Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className={`${getThemeColor('background.card', isDark)} rounded-xl p-6 text-center hover:scale-105 transition-transform`}>
                <Calendar className={`w-8 h-8 mx-auto mb-2 ${colors.brand.primary.text}`} />
                <div className={`text-2xl font-bold ${colors.brand.gradient.text}`}>60+</div>
                <div className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>Annual Shows</div>
              </div>
              <div className={`${getThemeColor('background.card', isDark)} rounded-xl p-6 text-center hover:scale-105 transition-transform`}>
                <Trophy className={`w-8 h-8 mx-auto mb-2 ${colors.brand.primary.text}`} />
                <div className={`text-2xl font-bold ${colors.brand.gradient.text}`}>12</div>
                <div className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>Awards</div>
              </div>
              <div className={`${getThemeColor('background.card', isDark)} rounded-xl p-6 text-center hover:scale-105 transition-transform`}>
                <Guitar className={`w-8 h-8 mx-auto mb-2 ${colors.brand.primary.text}`} />
                <div className={`text-2xl font-bold ${colors.brand.gradient.text}`}>40+</div>
                <div className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>Instruments</div>
              </div>
              <div className={`${getThemeColor('background.card', isDark)} rounded-xl p-6 text-center hover:scale-105 transition-transform`}>
                <Volume2 className={`w-8 h-8 mx-auto mb-2 ${colors.brand.primary.text}`} />
                <div className={`text-2xl font-bold ${colors.brand.gradient.text}`}>4</div>
                <div className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>Ensembles</div>
              </div>
            </div>
          </div>
        </div>

        {/* Musical Sections */}
        <div className="mb-16">
          <h2 className={`text-2xl font-bold mb-8 text-center ${getThemeColor('text.primary', isDark)}`}>
            Our Musical Ensembles
          </h2>
          
          {/* Genre Filter */}
          <div className="flex justify-center mb-8">
            <div className={`flex gap-2 p-2 ${getThemeColor('background.secondary', isDark)} rounded-lg`}>
              {musicalGenres.map((genre, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedGenre(genre.name)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    selectedGenre === genre.name
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                      : `${getThemeColor('text.secondary', isDark)} hover:${getThemeColor('text.primary', isDark)}`
                  }`}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {musicalSections.map((section, index) => (
              <div 
                key={index}
                onMouseEnter={() => setActiveSection(index)}
                className={`${getThemeColor('card.glassy', isDark)} rounded-xl p-6 border ${getThemeColor('border.subtle', isDark)} transition-all duration-300 hover:shadow-xl group ${
                  activeSection === index ? 'scale-105' : ''
                }`}
              >
                <div className={`p-3 bg-gradient-to-r ${section.color} rounded-xl mb-4 inline-block group-hover:scale-110 transition-transform`}>
                  <section.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-lg font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                  {section.category}
                </h3>
                <p className={`text-sm ${getThemeColor('text.secondary', isDark)} mb-4`}>
                  {section.description}
                </p>
                <div className={`text-center mb-4 px-3 py-2 ${getThemeColor('background.secondary', isDark)} rounded-lg`}>
                  <span className={`text-sm font-semibold ${colors.brand.primary.text}`}>
                    {section.members} Musicians
                  </span>
                </div>
                <div className="space-y-2">
                  <h4 className={`text-xs font-semibold ${getThemeColor('text.primary', isDark)}`}>Instruments:</h4>
                  <div className="flex flex-wrap gap-1">
                    {section.instruments.slice(0, 4).map((instrument, idx) => (
                      <span key={idx} className={`text-xs px-2 py-1 ${getThemeColor('background.secondary', isDark)} rounded`}>
                        {instrument}
                      </span>
                    ))}
                    {section.instruments.length > 4 && (
                      <span className={`text-xs px-2 py-1 ${colors.brand.primary.text}`}>
                        +{section.instruments.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Highlights */}
        <div className={`mb-16 ${getThemeColor('card.glassy', isDark)} rounded-3xl p-8 md:p-12`}>
          <h2 className={`text-2xl font-bold mb-8 text-center ${getThemeColor('text.primary', isDark)}`}>
            Performance Highlights
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {performanceHighlights.map((performance, index) => (
              <div 
                key={index}
                className={`${getThemeColor('background.card', isDark)} rounded-xl p-6 border ${getThemeColor('border.subtle', isDark)} hover:scale-105 transition-transform`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className={`text-lg font-bold mb-1 ${getThemeColor('text.primary', isDark)}`}>
                      {performance.title}
                    </h3>
                    <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                      {performance.description}
                    </p>
                  </div>
                  <div className={`px-3 py-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full text-xs font-semibold`}>
                    {performance.type}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>Date:</span>
                    <span className={`text-sm font-semibold ${colors.brand.primary.text}`}>
                      {new Date(performance.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>Venue:</span>
                    <span className={`text-sm font-semibold ${getThemeColor('text.primary', isDark)}`}>
                      {performance.venue}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>Audience:</span>
                    <span className={`text-sm font-semibold ${colors.brand.gradient.text}`}>
                      {performance.audience}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Training Programs */}
        <div className="mb-16">
          <h2 className={`text-2xl font-bold mb-8 text-center ${getThemeColor('text.primary', isDark)}`}>
            Music Training Programs
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trainingPrograms.map((program, index) => (
              <div 
                key={index}
                className={`${getThemeColor('card.glassy', isDark)} rounded-xl p-6 border ${getThemeColor('border.subtle', isDark)} hover:scale-105 transition-transform`}
              >
                <div className="text-center mb-4">
                  <h3 className={`text-xl font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                    {program.level}
                  </h3>
                  <div className={`px-3 py-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full text-sm font-semibold inline-block`}>
                    {program.capacity} Seats
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>Duration:</span>
                    <span className={`text-sm font-semibold ml-2 ${getThemeColor('text.primary', isDark)}`}>{program.duration}</span>
                  </div>
                  <div>
                    <span className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>Schedule:</span>
                    <span className={`text-sm font-semibold ml-2 ${getThemeColor('text.primary', isDark)}`}>{program.schedule}</span>
                  </div>
                  <div className={`p-3 ${getThemeColor('background.secondary', isDark)} rounded-lg`}>
                    <p className={`text-xs ${getThemeColor('text.primary', isDark)}`}>
                      {program.focus}
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      program.fee === 'Free' ? 'bg-green-500 text-white' : 
                      program.fee === 'Subsidized' ? 'bg-blue-500 text-white' :
                      program.fee === 'Nominal' ? 'bg-yellow-500 text-white' :
                      'bg-purple-500 text-white'
                    }`}>
                      {program.fee}
                    </span>
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
                      {achievement.title}
                    </h3>
                    <div className={`text-sm font-semibold mb-1 ${colors.brand.gradient.text}`}>
                      {achievement.award}
                    </div>
                    <div className={`text-xs mb-2 ${getThemeColor('text.secondary', isDark)} italic`}>
                      {achievement.category}
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

        {/* Call to Action */}
        <div className={`text-center ${getThemeColor('card.glassy', isDark)} rounded-3xl p-8 md:p-12 border ${getThemeColor('border.subtle', isDark)}`}>
          <h2 className={`text-3xl font-bold mb-6 ${colors.brand.gradient.text}`}>
            Join Our Musical Journey
          </h2>
          <p className={`text-lg ${getThemeColor('text.secondary', isDark)} mb-8 max-w-3xl mx-auto`}>
            Whether you're a beginner or experienced musician, discover your musical potential 
            with the NYSC Youth Music Band. Experience the joy of creating beautiful music while 
            preserving our cultural heritage.
          </p>
          
          <div className="max-w-2xl mx-auto">
            <div className={`grid md:grid-cols-2 gap-4 mb-8 ${getThemeColor('background.secondary', isDark)} rounded-xl p-6`}>
              <div className="text-left">
                <h4 className={`font-semibold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                  Rehearsal Schedule
                </h4>
                <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                  Monday - Wednesday: 6:00 PM - 8:30 PM<br/>
                  Saturday: 2:00 PM - 6:00 PM<br/>
                  Special sessions for performances
                </p>
              </div>
              <div className="text-left">
                <h4 className={`font-semibold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                  Requirements
                </h4>
                <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                  Ages 16-29<br/>
                  Basic musical aptitude<br/>
                  Commitment to regular practice
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg">
                <UserPlus className="w-4 h-4 mr-2" />
                Apply for Audition
              </button>
              <button className={`inline-flex items-center px-8 py-3 ${getThemeColor('background.secondary', isDark)} ${getThemeColor('text.primary', isDark)} rounded-lg font-semibold hover:scale-105 transition-transform`}>
                <Calendar className="w-4 h-4 mr-2" />
                View Schedule
              </button>
              <button className={`inline-flex items-center px-8 py-3 ${getThemeColor('background.secondary', isDark)} ${getThemeColor('text.primary', isDark)} rounded-lg font-semibold hover:scale-105 transition-transform`}>
                <Headphones className="w-4 h-4 mr-2" />
                Listen to Performances
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default YouthMusicBand;