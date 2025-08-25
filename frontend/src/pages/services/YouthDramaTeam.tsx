import PageLayout from '../../components/layout/PageLayout';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColor, colors } from '../../config/colors';
import { Theater, Users, Award, Calendar, Star, UserPlus, Clock, MapPin, BookOpen, Lightbulb, Camera, Play } from 'lucide-react';
import { useTranslationWithNamespace } from '../../hooks/useTranslationWithNamespace';
import { useState } from 'react';

const YouthDramaTeam = () => {
  const { isDark } = useTheme();
  const { t, ready } = useTranslationWithNamespace('services');
  const [activeGenre, setActiveGenre] = useState(0);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Youth Drama Team" }
  ];

  // Drama specializations and styles
  const dramaGenres = [
    {
      icon: Theater,
      title: "Traditional Sri Lankan Drama",
      description: "Classical forms including Kolam, Sokari, and folk drama preserving cultural heritage",
      features: ["Kolam Dance Drama", "Sokari", "Folk Theatre", "Ritual Performances"],
      color: "from-red-500 to-orange-500",
      productions: 12,
      participants: 30
    },
    {
      icon: Star,
      title: "Contemporary Theatre",
      description: "Modern dramatic expressions addressing social issues and contemporary themes",
      features: ["Social Commentary", "Modern Drama", "Experimental Theatre", "Youth Issues"],
      color: "from-purple-500 to-pink-500",
      productions: 18,
      participants: 35
    },
    {
      icon: Users,
      title: "Educational Theatre",
      description: "Interactive performances for schools and communities promoting awareness",
      features: ["School Programs", "Community Outreach", "Health Education", "Social Awareness"],
      color: "from-blue-500 to-cyan-500",
      productions: 25,
      participants: 40
    },
    {
      icon: Lightbulb,
      title: "Experimental Arts",
      description: "Innovative theatrical expressions blending traditional and modern techniques",
      features: ["Fusion Theatre", "Multimedia Productions", "Interactive Drama", "New Forms"],
      color: "from-green-500 to-emerald-500",
      productions: 8,
      participants: 20
    }
  ];

  // Drama school information (established July 15, 1998)
  const dramaSchoolInfo = {
    established: "July 15, 1998",
    focus: "Practical training and theoretical lectures",
    faculty: "Veteran artistes and university lecturers",
    approach: "Comprehensive theatre education"
  };

  // Training programs
  const trainingPrograms = [
    {
      level: "Foundation Acting",
      duration: "3 Months",
      focus: "Basic acting techniques and stage presence",
      schedule: "Weekends",
      capacity: 25,
      fee: "Free",
      instructor: "Prof. Nimal Perera"
    },
    {
      level: "Advanced Performance",
      duration: "6 Months",
      focus: "Character development and advanced techniques",
      schedule: "Twice weekly",
      capacity: 20,
      fee: "Subsidized",
      instructor: "Ms. Kumari Silva"
    },
    {
      level: "Direction & Production",
      duration: "4 Months",
      focus: "Directing, stage management, and production",
      schedule: "Flexible",
      capacity: 15,
      fee: "Nominal",
      instructor: "Mr. Rohan Fernando"
    },
    {
      level: "Professional Theatre",
      duration: "1 Year",
      focus: "Professional performance and teaching skills",
      schedule: "Intensive",
      capacity: 12,
      fee: "Scholarship based",
      instructor: "Dr. Priya Jayasuriya"
    }
  ];

  // Recent productions showcase
  const recentProductions = [
    {
      title: "Maname",
      genre: "Traditional",
      year: "2023",
      performances: 15,
      audience: 8000,
      description: "Classical Sinhala drama depicting ancient Sri Lankan values and cultural traditions",
      awards: ["Best Traditional Performance"]
    },
    {
      title: "Voices of Tomorrow",
      genre: "Contemporary",
      year: "2023",
      performances: 12,
      audience: 6500,
      description: "Modern play addressing youth empowerment and social transformation in Sri Lanka",
      awards: ["Outstanding Social Impact"]
    },
    {
      title: "Unity Through Art",
      genre: "Educational",
      year: "2023",
      performances: 30,
      audience: 12000,
      description: "Interactive performance promoting national unity and cultural harmony",
      awards: ["Community Engagement Excellence"]
    },
    {
      title: "Digital Crossroads",
      genre: "Experimental",
      year: "2023",
      performances: 8,
      audience: 4000,
      description: "Innovative multimedia production exploring technology's impact on human connection",
      awards: ["Innovation in Theatre"]
    }
  ];

  // Faculty and instructors
  const faculty = [
    {
      name: "Prof. Nimal Perera",
      specialization: "Traditional Drama",
      experience: "25+ Years",
      credentials: "PhD in Theatre Arts"
    },
    {
      name: "Ms. Kumari Silva",
      specialization: "Contemporary Theatre",
      experience: "20+ Years",
      credentials: "MA in Dramatic Arts"
    },
    {
      name: "Mr. Rohan Fernando",
      specialization: "Stage Design & Direction",
      experience: "18+ Years",
      credentials: "Professional Director"
    },
    {
      name: "Dr. Priya Jayasuriya",
      specialization: "Voice & Movement",
      experience: "22+ Years",
      credentials: "PhD in Performance Studies"
    }
  ];

  // Achievements and recognition
  const achievements = [
    {
      year: "2023",
      title: "National Theatre Festival",
      award: "Best Youth Drama Group",
      category: "Excellence in Performance",
      description: "Outstanding overall performance across multiple productions"
    },
    {
      year: "2023",
      title: "Cultural Heritage Awards",
      award: "Excellence in Traditional Arts",
      category: "Cultural Preservation",
      description: "Recognition for preserving and promoting traditional Sri Lankan drama"
    },
    {
      year: "2022",
      title: "International Youth Arts Festival",
      award: "Innovation in Theatre",
      category: "Creative Excellence",
      description: "Groundbreaking fusion of traditional and contemporary theatrical forms"
    },
    {
      year: "2022",
      title: "Community Service Recognition",
      award: "Outstanding Social Impact",
      category: "Community Engagement",
      description: "Educational theatre programs reaching over 50,000 students"
    }
  ];

  // Upcoming events and productions
  const upcomingEvents = [
    {
      title: "Annual Drama Festival",
      date: "2024-04-12",
      venue: "Lionel Wendt Theatre",
      type: "Festival",
      description: "Showcase of all drama genres with special guest performances"
    },
    {
      title: "Theatre Workshop Series",
      date: "2024-03-18",
      venue: "NYSC Drama School",
      type: "Workshop",
      description: "Intensive workshops by veteran artists and university lecturers"
    },
    {
      title: "International Theatre Exchange",
      date: "2024-05-08",
      venue: "Multiple Venues",
      type: "Exchange",
      description: "Cultural exchange program with international youth theatre groups"
    }
  ];

  return (
    <PageLayout 
      title="Youth Drama Team" 
      subtitle="Creating impactful performances and developing dramatic arts through comprehensive theatre education since 1998"
      breadcrumbs={breadcrumbs}
    >
      <div className="container mx-auto px-4">
        {/* Hero Section with Drama School Info */}
        <div className={`mb-12 ${getThemeColor('card.glassy', isDark)} rounded-3xl p-8 md:p-12 relative overflow-hidden`}>
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-4">
                <Theater className="w-10 h-10 text-red-500 mr-3" />
                <h2 className={`text-3xl font-bold ${colors.brand.gradient.text}`}>
                  Drama & Theatre School
                </h2>
              </div>
              <div className={`px-4 py-2 ${getThemeColor('background.secondary', isDark)} rounded-lg mb-6 inline-block`}>
                <span className={`text-sm font-semibold ${colors.brand.primary.text}`}>
                  🎭 Established: {dramaSchoolInfo.established}
                </span>
              </div>
              <p className={`text-lg ${getThemeColor('text.secondary', isDark)} mb-6 leading-relaxed`}>
                The NYSC Drama and Theatre School provides dedicated training in dramatic arts through both 
                practical experience and theoretical education. Our faculty of veteran artists and university 
                lecturers ensure comprehensive development of theatrical skills and cultural understanding.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className={`px-4 py-2 ${getThemeColor('background.secondary', isDark)} rounded-lg`}>
                  <BookOpen className="inline-block w-4 h-4 mr-2 text-blue-500" />
                  <span className={`text-sm ${getThemeColor('text.primary', isDark)}`}>Practical & Theoretical</span>
                </div>
                <div className={`px-4 py-2 ${getThemeColor('background.secondary', isDark)} rounded-lg`}>
                  <Award className="inline-block w-4 h-4 mr-2 text-yellow-500" />
                  <span className={`text-sm ${getThemeColor('text.primary', isDark)}`}>Expert Faculty</span>
                </div>
                <div className={`px-4 py-2 ${getThemeColor('background.secondary', isDark)} rounded-lg`}>
                  <Users className="inline-block w-4 h-4 mr-2 text-green-500" />
                  <span className={`text-sm ${getThemeColor('text.primary', isDark)}`}>125 Students</span>
                </div>
              </div>
            </div>
            
            {/* School Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className={`${getThemeColor('background.card', isDark)} rounded-xl p-6 text-center hover:scale-105 transition-transform`}>
                <Theater className={`w-8 h-8 mx-auto mb-2 ${colors.brand.primary.text}`} />
                <div className={`text-2xl font-bold ${colors.brand.gradient.text}`}>63</div>
                <div className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>Productions</div>
              </div>
              <div className={`${getThemeColor('background.card', isDark)} rounded-xl p-6 text-center hover:scale-105 transition-transform`}>
                <Award className={`w-8 h-8 mx-auto mb-2 ${colors.brand.primary.text}`} />
                <div className={`text-2xl font-bold ${colors.brand.gradient.text}`}>18</div>
                <div className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>Awards</div>
              </div>
              <div className={`${getThemeColor('background.card', isDark)} rounded-xl p-6 text-center hover:scale-105 transition-transform`}>
                <Users className={`w-8 h-8 mx-auto mb-2 ${colors.brand.primary.text}`} />
                <div className={`text-2xl font-bold ${colors.brand.gradient.text}`}>26</div>
                <div className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>Years Active</div>
              </div>
              <div className={`${getThemeColor('background.card', isDark)} rounded-xl p-6 text-center hover:scale-105 transition-transform`}>
                <BookOpen className={`w-8 h-8 mx-auto mb-2 ${colors.brand.primary.text}`} />
                <div className={`text-2xl font-bold ${colors.brand.gradient.text}`}>4</div>
                <div className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>Specializations</div>
              </div>
            </div>
          </div>
        </div>

        {/* Drama Genres and Specializations */}
        <div className="mb-16">
          <h2 className={`text-2xl font-bold mb-8 text-center ${getThemeColor('text.primary', isDark)}`}>
            Theatrical Specializations
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dramaGenres.map((genre, index) => (
              <div 
                key={index}
                onMouseEnter={() => setActiveGenre(index)}
                className={`${getThemeColor('card.glassy', isDark)} rounded-xl p-6 border ${getThemeColor('border.subtle', isDark)} transition-all duration-300 hover:shadow-xl group ${
                  activeGenre === index ? 'scale-105' : ''
                }`}
              >
                <div className={`p-3 bg-gradient-to-r ${genre.color} rounded-xl mb-4 inline-block group-hover:scale-110 transition-transform`}>
                  <genre.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-lg font-bold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                  {genre.title}
                </h3>
                <p className={`text-sm ${getThemeColor('text.secondary', isDark)} mb-4`}>
                  {genre.description}
                </p>
                <div className="grid grid-cols-2 gap-2 mb-4 text-center">
                  <div className={`px-2 py-1 ${getThemeColor('background.secondary', isDark)} rounded`}>
                    <span className={`text-xs font-semibold ${colors.brand.primary.text}`}>
                      {genre.productions} Shows
                    </span>
                  </div>
                  <div className={`px-2 py-1 ${getThemeColor('background.secondary', isDark)} rounded`}>
                    <span className={`text-xs font-semibold ${colors.brand.primary.text}`}>
                      {genre.participants} Artists
                    </span>
                  </div>
                </div>
                <ul className="space-y-1">
                  {genre.features.map((feature, idx) => (
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

        {/* Faculty & Expert Instructors */}
        <div className={`mb-16 ${getThemeColor('card.glassy', isDark)} rounded-3xl p-8 md:p-12`}>
          <h2 className={`text-2xl font-bold mb-8 text-center ${getThemeColor('text.primary', isDark)}`}>
            Veteran Artists & University Lecturers
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {faculty.map((instructor, index) => (
              <div 
                key={index}
                className={`${getThemeColor('background.card', isDark)} rounded-xl p-6 text-center hover:scale-105 transition-transform`}
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className={`font-bold mb-1 ${getThemeColor('text.primary', isDark)}`}>
                  {instructor.name}
                </h3>
                <p className={`text-sm mb-2 ${colors.brand.primary.text}`}>
                  {instructor.specialization}
                </p>
                <div className={`text-xs ${getThemeColor('text.secondary', isDark)} space-y-1`}>
                  <div>{instructor.experience} Experience</div>
                  <div className={`px-2 py-1 ${getThemeColor('background.secondary', isDark)} rounded`}>
                    {instructor.credentials}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Training Programs */}
        <div className="mb-16">
          <h2 className={`text-2xl font-bold mb-8 text-center ${getThemeColor('text.primary', isDark)}`}>
            Comprehensive Training Programs
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
                    {program.capacity} Places
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
                  <div className="text-center">
                    <div className={`text-xs font-semibold mb-1 ${getThemeColor('text.secondary', isDark)}`}>
                      Instructor: {program.instructor}
                    </div>
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

        {/* Recent Productions */}
        <div className="mb-16">
          <h2 className={`text-2xl font-bold mb-8 text-center ${getThemeColor('text.primary', isDark)}`}>
            Recent Production Highlights
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {recentProductions.map((production, index) => (
              <div 
                key={index}
                className={`${getThemeColor('card.glassy', isDark)} rounded-xl p-6 border ${getThemeColor('border.subtle', isDark)} hover:scale-105 transition-transform`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className={`text-lg font-bold mb-1 ${getThemeColor('text.primary', isDark)}`}>
                      {production.title}
                    </h3>
                    <p className={`text-sm ${getThemeColor('text.secondary', isDark)} mb-2`}>
                      {production.description}
                    </p>
                    <div className={`px-3 py-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full text-xs font-semibold inline-block`}>
                      {production.genre}
                    </div>
                  </div>
                  <div className={`text-sm font-semibold ${colors.brand.primary.text}`}>
                    {production.year}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className={`text-center p-3 ${getThemeColor('background.secondary', isDark)} rounded-lg`}>
                    <div className={`text-lg font-bold ${colors.brand.gradient.text}`}>
                      {production.performances}
                    </div>
                    <div className={`text-xs ${getThemeColor('text.secondary', isDark)}`}>
                      Performances
                    </div>
                  </div>
                  <div className={`text-center p-3 ${getThemeColor('background.secondary', isDark)} rounded-lg`}>
                    <div className={`text-lg font-bold ${colors.brand.gradient.text}`}>
                      {production.audience.toLocaleString()}
                    </div>
                    <div className={`text-xs ${getThemeColor('text.secondary', isDark)}`}>
                      Total Audience
                    </div>
                  </div>
                </div>
                {production.awards && (
                  <div className="space-y-1">
                    {production.awards.map((award, idx) => (
                      <div key={idx} className={`px-2 py-1 ${getThemeColor('background.secondary', isDark)} rounded text-xs ${colors.brand.primary.text}`}>
                        🏆 {award}
                      </div>
                    ))}
                  </div>
                )}
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
                    <Award className="w-6 h-6 text-white" />
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

        {/* Upcoming Events */}
        <div className={`mb-16 ${getThemeColor('card.glassy', isDark)} rounded-3xl p-8 md:p-12`}>
          <h2 className={`text-2xl font-bold mb-8 text-center ${getThemeColor('text.primary', isDark)}`}>
            Upcoming Events & Productions
          </h2>
          <div className="space-y-6">
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
            Join Our Theatrical Community
          </h2>
          <p className={`text-lg ${getThemeColor('text.secondary', isDark)} mb-8 max-w-3xl mx-auto`}>
            Discover your passion for dramatic arts at the NYSC Drama & Theatre School. Whether you're interested 
            in traditional Sri Lankan drama or contemporary theatre, our expert faculty will guide your artistic journey.
          </p>
          
          <div className="max-w-2xl mx-auto">
            <div className={`grid md:grid-cols-2 gap-4 mb-8 ${getThemeColor('background.secondary', isDark)} rounded-xl p-6`}>
              <div className="text-left">
                <h4 className={`font-semibold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                  Training Schedule
                </h4>
                <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                  Monday - Friday: 4:00 PM - 7:00 PM<br/>
                  Saturday: 10:00 AM - 4:00 PM<br/>
                  Sunday: Performance workshops
                </p>
              </div>
              <div className="text-left">
                <h4 className={`font-semibold mb-2 ${getThemeColor('text.primary', isDark)}`}>
                  Admission Requirements
                </h4>
                <p className={`text-sm ${getThemeColor('text.secondary', isDark)}`}>
                  Ages 16-29<br/>
                  Interest in dramatic arts<br/>
                  Basic audition process
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg">
                <UserPlus className="w-4 h-4 mr-2" />
                Apply for Admission
              </button>
              <button className={`inline-flex items-center px-8 py-3 ${getThemeColor('background.secondary', isDark)} ${getThemeColor('text.primary', isDark)} rounded-lg font-semibold hover:scale-105 transition-transform`}>
                <Calendar className="w-4 h-4 mr-2" />
                View Workshop Schedule
              </button>
              <button className={`inline-flex items-center px-8 py-3 ${getThemeColor('background.secondary', isDark)} ${getThemeColor('text.primary', isDark)} rounded-lg font-semibold hover:scale-105 transition-transform`}>
                <Play className="w-4 h-4 mr-2" />
                Watch Productions
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default YouthDramaTeam;