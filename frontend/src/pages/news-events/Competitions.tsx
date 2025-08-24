import React, { useState, useEffect } from 'react';
import { Trophy, Calendar, Clock, MapPin, Users, Award, Star, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../contexts/CompatibilityLanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { colors, getThemeColor } from '../../config/colors';

interface Competition {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'Individual' | 'Team' | 'Group';
  registrationDeadline: string;
  eventDate: string;
  venue: string;
  prizePool: number;
  maxParticipants?: number;
  currentParticipants: number;
  eligibility: string[];
  rules: string[];
  prizes: {
    position: string;
    prize: string;
    amount?: number;
  }[];
  registrationUrl?: string;
  status: 'Open' | 'Closed' | 'Upcoming' | 'Completed';
  image?: string;
}

const Competitions: React.FC = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Sample data - replace with actual API call
  useEffect(() => {
    const sampleCompetitions: Competition[] = [
      {
        id: '1',
        title: 'National Youth Innovation Challenge',
        description: 'Present innovative solutions to address social and environmental challenges facing Sri Lanka. Teams will pitch their ideas to a panel of expert judges.',
        category: 'Innovation',
        type: 'Team',
        registrationDeadline: '2024-02-28',
        eventDate: '2024-03-15',
        venue: 'National Conference Hall, Colombo',
        prizePool: 500000,
        maxParticipants: 100,
        currentParticipants: 78,
        eligibility: ['Age 18-30', 'Sri Lankan citizen', 'Team of 3-5 members'],
        rules: ['Original ideas only', '10-minute presentation', 'Demo/prototype required'],
        prizes: [
          { position: '1st Place', prize: 'Cash Prize + Mentorship', amount: 200000 },
          { position: '2nd Place', prize: 'Cash Prize + Equipment', amount: 150000 },
          { position: '3rd Place', prize: 'Cash Prize + Certification', amount: 100000 }
        ],
        registrationUrl: '/register/innovation-challenge',
        status: 'Open'
      },
      {
        id: '2',
        title: 'Photography Contest 2024',
        description: 'Capture the beauty and diversity of Sri Lankan culture, nature, and people. Submit your best photographs showcasing the essence of our nation.',
        category: 'Arts',
        type: 'Individual',
        registrationDeadline: '2024-02-20',
        eventDate: '2024-03-01',
        venue: 'Online Submission + Exhibition at Art Gallery',
        prizePool: 150000,
        maxParticipants: 200,
        currentParticipants: 145,
        eligibility: ['Age 16-35', 'Amateur or professional photographers', 'Maximum 5 submissions per person'],
        rules: ['Original photographs only', 'High resolution (minimum 300 DPI)', 'No excessive digital manipulation'],
        prizes: [
          { position: '1st Place', prize: 'Professional Camera + Cash', amount: 75000 },
          { position: '2nd Place', prize: 'Photography Equipment + Cash', amount: 45000 },
          { position: '3rd Place', prize: 'Cash Prize + Certificate', amount: 30000 }
        ],
        registrationUrl: '/register/photography-contest',
        status: 'Open'
      },
      {
        id: '3',
        title: 'Inter-District Sports Championship',
        description: 'Multi-sport competition featuring cricket, volleyball, badminton, and athletics. Districts compete for the overall championship trophy.',
        category: 'Sports',
        type: 'Team',
        registrationDeadline: '2024-03-01',
        eventDate: '2024-03-20',
        venue: 'National Sports Complex, Colombo',
        prizePool: 300000,
        currentParticipants: 25, // 25 districts
        eligibility: ['District-level teams', 'Age 18-28', 'Pass fitness requirements'],
        rules: ['Standard international rules apply', 'Drug testing mandatory', 'Fair play conduct required'],
        prizes: [
          { position: 'Overall Champion', prize: 'Championship Trophy + Prize Money', amount: 150000 },
          { position: 'Runner-up', prize: 'Silver Trophy + Prize Money', amount: 100000 },
          { position: '3rd Place', prize: 'Bronze Trophy + Prize Money', amount: 50000 }
        ],
        registrationUrl: '/register/sports-championship',
        status: 'Open'
      },
      {
        id: '4',
        title: 'Digital Content Creation Competition',
        description: 'Create engaging digital content (videos, podcasts, blog posts) that promotes youth development and social awareness.',
        category: 'Digital Media',
        type: 'Individual',
        registrationDeadline: '2024-02-25',
        eventDate: '2024-03-10',
        venue: 'Online Platform + Awards Ceremony',
        prizePool: 200000,
        maxParticipants: 150,
        currentParticipants: 89,
        eligibility: ['Age 16-30', 'Content must be in Sinhala, Tamil, or English', 'Original content only'],
        rules: ['Maximum 5 minutes for videos', 'Family-friendly content', 'Proper attribution for music/images'],
        prizes: [
          { position: 'Best Video', prize: 'Equipment Package + Cash', amount: 80000 },
          { position: 'Best Podcast', prize: 'Recording Equipment + Cash', amount: 60000 },
          { position: 'Best Blog Post', prize: 'Tech Package + Cash', amount: 40000 }
        ],
        registrationUrl: '/register/digital-content-contest',
        status: 'Open'
      },
      {
        id: '5',
        title: 'Debate Championship 2024',
        description: 'Parliamentary-style debate competition on contemporary social, political, and economic issues affecting youth and society.',
        category: 'Debate',
        type: 'Team',
        registrationDeadline: '2024-02-15',
        eventDate: '2024-02-28',
        venue: 'University Auditorium, Colombo',
        prizePool: 100000,
        maxParticipants: 64, // 32 teams
        currentParticipants: 60,
        eligibility: ['Teams of 2 members', 'Age 18-25', 'University students or graduates'],
        rules: ['Oxford Union debate format', '6 minutes per speaker', 'No electronic devices during debate'],
        prizes: [
          { position: 'Winning Team', prize: 'Trophy + Scholarships', amount: 50000 },
          { position: 'Runner-up', prize: 'Certificates + Cash Prize', amount: 30000 },
          { position: 'Best Speaker', prize: 'Individual Award + Cash', amount: 20000 }
        ],
        registrationUrl: '/register/debate-championship',
        status: 'Closed'
      },
      {
        id: '6',
        title: 'Environmental Project Challenge',
        description: 'Develop and implement environmental conservation projects in your local community. Projects will be evaluated on impact and sustainability.',
        category: 'Environment',
        type: 'Group',
        registrationDeadline: '2024-04-01',
        eventDate: '2024-05-15',
        venue: 'Various Locations + Final Presentation in Colombo',
        prizePool: 400000,
        maxParticipants: 50, // 50 groups
        currentParticipants: 12,
        eligibility: ['Groups of 5-10 members', 'Age 16-30', 'Project must be implementable'],
        rules: ['3-month implementation period', 'Monthly progress reports', 'Community involvement required'],
        prizes: [
          { position: 'Most Impactful Project', prize: 'Funding + Recognition', amount: 200000 },
          { position: 'Most Innovative', prize: 'Equipment + Funding', amount: 100000 },
          { position: 'Community Choice', prize: 'Cash Prize + Mentorship', amount: 100000 }
        ],
        registrationUrl: '/register/environmental-challenge',
        status: 'Upcoming'
      }
    ];
    setCompetitions(sampleCompetitions);
  }, []);

  const categories = ['all', 'Innovation', 'Arts', 'Sports', 'Digital Media', 'Debate', 'Environment'];
  const types = ['all', 'Individual', 'Team', 'Group'];
  const statuses = ['all', 'Open', 'Closed', 'Upcoming', 'Completed'];

  const filteredCompetitions = competitions.filter(competition => {
    return (selectedCategory === 'all' || competition.category === selectedCategory) &&
           (selectedType === 'all' || competition.type === selectedType) &&
           (selectedStatus === 'all' || competition.status === selectedStatus);
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-green-500/20 text-green-300';
      case 'Closed': return 'bg-red-500/20 text-red-300';
      case 'Upcoming': return 'bg-blue-500/20 text-blue-300';
      case 'Completed': return 'bg-gray-500/20 text-gray-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Individual': return Users;
      case 'Team': return Users;
      case 'Group': return Users;
      default: return Users;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? getThemeColor('background.primary', true) : getThemeColor('background.primary', false)
    }`}>
      {/* Hero Section */}
      <div className={`relative py-16 lg:py-24 ${
        isDark ? colors.background.gradient.dark : colors.background.gradient.light
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className={`p-4 rounded-full ${
                isDark ? 'bg-yellow-500/20' : 'bg-yellow-100'
              }`}>
                <Trophy className={`w-12 h-12 ${
                  isDark ? 'text-yellow-300' : 'text-yellow-600'
                }`} />
              </div>
            </div>
            <h1 className={`text-4xl lg:text-6xl font-bold mb-6 ${
              isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
            }`}>
              Competitions & Contests
            </h1>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
            }`}>
              Showcase your talents, compete with peers, and win exciting prizes in our diverse range of competitions designed for young achievers.
            </p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className={`border-b ${
        isDark ? colors.border.subtle.dark : colors.border.subtle.light
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4 justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? isDark
                        ? `${colors.brand.primary.background} ${colors.brand.primary.text} ${colors.effects.glow.brand}`
                        : `${colors.brand.primary.background} ${colors.brand.primary.text} ${colors.effects.glow.brand}`
                      : isDark
                        ? `${getThemeColor('background.secondary', true)} ${getThemeColor('text.secondary', true)} ${colors.hover.background.dark} ${colors.hover.text.primary.dark}`
                        : `${getThemeColor('background.secondary', false)} ${getThemeColor('text.secondary', false)} ${colors.hover.background.light} ${colors.hover.text.primary.light}`
                  }`}
                >
                  {category === 'all' ? 'All Categories' : category}
                </button>
              ))}
            </div>

            {/* Type and Status Filters */}
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className={`px-3 py-2 rounded-lg border transition-colors ${
                  isDark 
                    ? `${getThemeColor('background.secondary', true)} ${getThemeColor('border.primary', true)} ${getThemeColor('text.primary', true)}`
                    : `${getThemeColor('background.primary', false)} ${getThemeColor('border.secondary', false)} ${getThemeColor('text.primary', false)}`
                }`}
              >
                {types.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className={`px-3 py-2 rounded-lg border transition-colors ${
                  isDark 
                    ? `${getThemeColor('background.secondary', true)} ${getThemeColor('border.primary', true)} ${getThemeColor('text.primary', true)}`
                    : `${getThemeColor('background.primary', false)} ${getThemeColor('border.secondary', false)} ${getThemeColor('text.primary', false)}`
                }`}
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Status' : status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Competitions Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <h2 className={`text-2xl font-bold mb-2 ${
            isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
          }`}>
            Available Competitions ({filteredCompetitions.length})
          </h2>
          <p className={`${
            isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
          }`}>
            Participate in competitions that match your interests and skills
          </p>
        </div>

        {filteredCompetitions.length === 0 ? (
          <div className="text-center py-12">
            <Trophy className={`w-16 h-16 mx-auto mb-4 ${
              isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
            }`} />
            <h3 className={`text-xl font-semibold mb-2 ${
              isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
            }`}>
              No competitions found
            </h3>
            <p className={`${
              isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
            }`}>
              Try adjusting your filters or check back later for new competitions
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredCompetitions.map((competition) => {
              const TypeIcon = getTypeIcon(competition.type);
              const participationPercentage = competition.maxParticipants ? 
                (competition.currentParticipants / competition.maxParticipants) * 100 : 0;
              
              return (
                <div key={competition.id} className={`rounded-lg border transition-all duration-300 hover:shadow-xl ${
                  isDark 
                    ? `${getThemeColor('background.secondary', true)} ${colors.border.subtle.dark} ${colors.hover.border.subtle.dark}`
                    : `${getThemeColor('background.primary', false)} ${colors.border.subtle.light} ${colors.hover.border.subtle.light}`
                }`}>
                  {competition.image && (
                    <div className="aspect-video bg-gradient-to-r from-orange-400 to-yellow-400 rounded-t-lg flex items-center justify-center">
                      <Trophy className="w-16 h-16 text-white" />
                    </div>
                  )}
                  
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          isDark ? 'bg-yellow-500/20' : 'bg-yellow-100'
                        }`}>
                          <Trophy className={`w-5 h-5 ${
                            isDark ? 'text-yellow-300' : 'text-yellow-600'
                          }`} />
                        </div>
                        <div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-600'
                          }`}>
                            {competition.category}
                          </span>
                          <div className="flex items-center gap-2 mt-1">
                            <TypeIcon className="w-3 h-3" />
                            <span className={`text-xs ${
                              isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
                            }`}>
                              {competition.type}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(competition.status)}`}>
                        {competition.status}
                      </span>
                    </div>

                    {/* Title and Description */}
                    <h3 className={`text-xl font-bold mb-3 ${
                      isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                    }`}>
                      {competition.title}
                    </h3>
                    
                    <p className={`text-sm mb-4 leading-relaxed ${
                      isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                    }`}>
                      {competition.description}
                    </p>

                    {/* Competition Details */}
                    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-sm ${
                      isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                    }`}>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Event: {new Date(competition.eventDate).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Deadline: {new Date(competition.registrationDeadline).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 sm:col-span-2">
                        <MapPin className="w-4 h-4" />
                        <span>{competition.venue}</span>
                      </div>
                    </div>

                    {/* Prize Pool */}
                    <div className="mb-4">
                      <div className={`flex items-center gap-2 mb-2 ${
                        isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                      }`}>
                        <Award className="w-4 h-4" />
                        <span className="font-semibold">Prize Pool: Rs. {competition.prizePool.toLocaleString()}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {competition.prizes.slice(0, 3).map((prize, index) => (
                          <div key={index} className={`px-2 py-1 rounded text-xs ${
                            index === 0 ? 'bg-yellow-500/20 text-yellow-300' :
                            index === 1 ? 'bg-gray-500/20 text-gray-300' :
                            'bg-orange-500/20 text-orange-300'
                          }`}>
                            <Star className="w-3 h-3 inline mr-1" />
                            {prize.position}: Rs. {prize.amount?.toLocaleString()}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Participation Status */}
                    {competition.maxParticipants && (
                      <div className="mb-4">
                        <div className={`flex justify-between text-sm mb-1 ${
                          isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                        }`}>
                          <span>Participants</span>
                          <span>{competition.currentParticipants}/{competition.maxParticipants}</span>
                        </div>
                        <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2`}>
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              participationPercentage >= 90 ? 'bg-red-500' : 
                              participationPercentage >= 70 ? 'bg-yellow-500' : 
                              'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(participationPercentage, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Registration Button */}
                    {competition.registrationUrl && competition.status === 'Open' && (
                      <button className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all duration-300 font-medium ${
                        participationPercentage >= 100 
                          ? isDark 
                            ? `${getThemeColor('background.secondary', true)} ${getThemeColor('text.muted', true)} cursor-not-allowed`
                            : `${getThemeColor('background.secondary', false)} ${getThemeColor('text.muted', false)} cursor-not-allowed`
                          : isDark
                            ? `${colors.brand.primary.background} ${colors.brand.primary.text} hover:bg-orange-600 ${colors.effects.glow.brand}`
                            : `${colors.brand.primary.background} ${colors.brand.primary.text} hover:bg-orange-600 ${colors.effects.glow.brand}`
                      } hover:shadow-md`}
                        disabled={participationPercentage >= 100}
                      >
                        <ExternalLink className="w-4 h-4" />
                        {participationPercentage >= 100 ? 'Registration Full' : 'Register Now'}
                      </button>
                    )}

                    {competition.status !== 'Open' && (
                      <div className={`w-full text-center py-3 rounded-lg border ${
                        isDark ? `${colors.border.subtle.dark} ${getThemeColor('text.muted', true)}` : `${colors.border.subtle.light} ${getThemeColor('text.muted', false)}`
                      }`}>
                        {competition.status === 'Closed' && 'Registration Closed'}
                        {competition.status === 'Upcoming' && 'Registration Opens Soon'}
                        {competition.status === 'Completed' && 'Competition Completed'}
                      </div>
                    )}

                    {/* Eligibility Criteria */}
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h4 className={`text-sm font-semibold mb-2 ${
                        isDark ? getThemeColor('text.primary', true) : getThemeColor('text.primary', false)
                      }`}>
                        Eligibility:
                      </h4>
                      <ul className={`text-xs space-y-1 ${
                        isDark ? getThemeColor('text.secondary', true) : getThemeColor('text.secondary', false)
                      }`}>
                        {competition.eligibility.slice(0, 3).map((criteria, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-blue-500 mt-0.5">•</span>
                            <span>{criteria}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Competitions;