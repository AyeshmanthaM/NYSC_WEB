import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Language types
export type Language = 'en' | 'si' | 'ta';

// Translation interface
interface Translations {
  [key: string]: string | string[] | Translations;
}

// Context interface
interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  translations: Translations;
}

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data structure
const translations: Record<Language, Translations> = {
  en: {
    common: {
      search: 'Search...',
      language: 'Language',
      theme: 'Theme',
      home: 'Home',
      about: 'About',
      programs: 'Programs',
      contact: 'Contact',
      loading: 'Loading...'
    },
    header: {
      youthClub: 'Youth Club',
      divisions: 'Divisions',
      services: 'Services',
      ourCenters: 'Our Centers',
      searchPlaceholder: 'Search...',
      newsEvents: 'News & Events',
      resources: 'Resources'
    },
    dropdown: {
      // About section
      leadership: 'Leadership',
      ourHistory: 'Our History',
      mission: 'Mission & Vision',
      // Programs section
      youthAwards: 'Youth Awards',
      skillDevelopment: 'Skill Development',
      culturalAffairs: 'Cultural Programs',
      youthParliament: 'Youth Parliament',
      findCourses: 'Find Courses',
      // News & Events section
      latestNews: 'Latest News',
      events: 'Events',
      achievements: 'Achievements',
      gallery: 'Photo Gallery',
      // Resources section
      downloads: 'Downloads',
      contact: 'Contact Us',
      studentPortal: 'Student Portal',
      // Legacy items (keeping for compatibility)
      aboutClubs: 'About Clubs',
      registerClub: 'Register Club',
      findClubs: 'Find Clubs',
      clubActivities: 'Club Activities',
      sportsDevelopment: 'Sports Development',
      educationTraining: 'Education & Training',
      internationalRelations: 'International Relations',
      careerGuidance: 'Career Guidance',
      volunteerPrograms: 'Volunteer Programs',
      trainingCenters: 'Training Centers',
      districtOffices: 'District Offices',
      youthCenters: 'Youth Centers',
      contactInfo: 'Contact Info'
    },
    footer: {
      newsletterTitle: 'Stay Updated with NYSC News',
      newsletterDescription: 'Get the latest updates on programs, events, and opportunities delivered to your inbox',
      subscribeButton: 'Subscribe',
      subscribedMessage: 'Subscribed!',
      emailPlaceholder: 'Enter your email address',
      empoweringYouth: 'Empowering Youth Since 1972',
      organizationDescription: 'Building stronger communities through youth development, leadership training, and positive social impact across Sri Lanka.',
      quickLinks: 'Quick Links',
      programs: 'Programs',
      contact: 'Contact',
      generalInquiries: 'General inquiries',
      officeHours: 'Mon - Fri, 8:00 AM - 5:00 PM',
      organizationAddress: 'National Youth Services Council',
      location: 'Maharagama, Sri Lanka',
      copyright: 'National Youth Service Council. All rights reserved.',
      madeWith: 'Made with',
      forYouth: 'for Sri Lankan Youth',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      accessibility: 'Accessibility',
      sitemap: 'Sitemap'
    },
    links: {
      aboutNYSC: 'About NYSC',
      programs: 'Programs',
      youthClubs: 'Youth Clubs',
      downloads: 'Downloads',
      annualReports: 'Annual Reports',
      contactUs: 'Contact Us'
    },
    programsList: {
      sportsExcellence: 'Sports Excellence',
      culturalActivities: 'Cultural Activities',
      leadershipTraining: 'Leadership Training',
      communityService: 'Community Service',
      skillDevelopment: 'Skill Development',
      youthAwards: 'Youth Awards'
    },
    hero: {
      subtitle: 'AN EMPOWERED SRI LANKA YOUTH',
      title: 'NATIONAL YOUTH SERVICES COUNCIL OF',
      titleHighlight: 'SRI LANKA',
      description: 'Youth of Sri Lanka are also having an undertaking for economic and social upliftment of the country.',
      statsActiveMembers: 'Active Members',
      statsYouthClubs: 'Youth Clubs',
      statsDistricts: 'Districts',
      joinButton: 'Join With Us',
      youthStatement: 'Youth Statement to COP28'
    },
    keyServices: {
      sportsTitle: 'Sports',
      sportsShortDesc: 'Athletic Excellence',
      sportsDescription: 'Developing athletic excellence through comprehensive sports programs and competitive training',
      sportsStats: '50+ Clubs',
      aestheticsTitle: 'Aesthetics',
      aestheticsShortDesc: 'Cultural Arts',
      aestheticsDescription: 'Nurturing creativity and artistic expression through music, dance, and visual arts',
      aestheticsStats: '30+ Programs',
      educationTitle: 'Education',
      educationShortDesc: 'Knowledge Growth',
      educationDescription: 'Empowering minds through innovative learning and skill development programs',
      educationStats: '100+ Courses',
      administrationTitle: 'Administration',
      administrationShortDesc: 'Leadership',
      administrationDescription: 'Building effective youth organizations through governance and management training',
      administrationStats: '25 Districts',
      learnMore: 'Learn More'
    },
    youthOfferings: {
      badgeText: 'Youth Programs',
      title: 'What We Offer to',
      titleHighlight: 'Youth',
      subtitle: 'Comprehensive programs and opportunities designed to unlock your potential',
      careerTitle: 'Career Development',
      careerDescription: 'Professional skills training and career guidance programs',
      careerFeatures: ['Job Training', 'Career Counseling', 'Internships'],
      volunteerTitle: 'Volunteer Programs',
      volunteerDescription: 'Community service and social development initiatives',
      volunteerFeatures: ['Community Service', 'Social Projects', 'Environmental Work'],
      internationalTitle: 'International Exchange',
      internationalDescription: 'Global youth exchange and cultural programs',
      internationalFeatures: ['Exchange Programs', 'Cultural Tours', 'Global Networks'],
      educationalTitle: 'Educational Support',
      educationalDescription: 'Scholarships and educational assistance programs',
      educationalFeatures: ['Scholarships', 'Tutoring', 'Study Materials'],
      clubsTitle: 'Youth Clubs',
      clubsDescription: 'Join or establish youth clubs in your area',
      clubsFeatures: ['Club Formation', 'Activities', 'Networking'],
      innovationTitle: 'Innovation Hub',
      innovationDescription: 'Entrepreneurship and innovation support',
      innovationFeatures: ['Startup Support', 'Mentorship', 'Funding Access'],
      learnMore: 'Learn More'
    },
    organizations: {
      badge: 'Sri Lanka Youth',
      title: 'Our Other',
      titleHighlight: 'Organizations',
      exploreMore: 'Explore more',
      youthClub: {
        title: 'Youth Club',
        description: 'Sri Lanka Youth Club Movement Implemented by Sri Lanka Federation of Youth Clubs.'
      },
      youthServices: {
        title: 'Youth Services Limited',
        description: 'Encouraging and improving the economic power of youth by providing essential services'
      },
      nysco: {
        title: 'NYSCO',
        description: 'Young entrepreneurs can improve their ideas and services to increase the productivity and revenue'
      }
    },
    leaders: {
      badge: 'Get To Know',
      title: 'Our Leaders',
      subtitle: 'We Have Powerful Leaders With Great Vision On Sri Lankan Youth',
      minister: {
        name: 'Hon. Sunil Kumara Gamage',
        position: 'Minister Of Youth Affairs and Sports'
      },
      deputyMinister: {
        name: 'Hon. Eranga Gunasekara',
        position: 'Deputy Minister Of Youth Affairs'
      },
      secretary: {
        name: 'Mr. A.H.M.U.Aruna Bandara',
        position: 'Secretary'
      },
      chairman: {
        name: 'Attorney at Law Mr. Supun Wijerathna',
        position: 'Chairman/Director General'
      },
      directorsTitle: 'Meet Our Board of Directors',
      directorsDescription: 'Discover the visionary leaders shaping the future of Sri Lankan youth development',
      viewAllDirectors: 'View All Directors'
    },
    services: {
      badge: 'Interactive Services',
      title: 'Discover Our Youth Programs',
      subtitle: 'Click on any service tile to explore detailed information and opportunities',
      learnMore: 'Learn More',
      keyFeatures: 'Key Features',
      stats: {
        members: 'Members',
        programs: 'Programs',
        awards: 'Awards'
      },
      youthClub: {
        title: 'Youth Club',
        description: 'Join our vibrant youth communities across Sri Lanka. Connect, learn, and grow with like-minded young people in your area.',
        features: ['Community Building', 'Leadership Training', 'Social Activities', 'Volunteer Opportunities', 'Networking Events']
      },
      youthParliament: {
        title: 'Youth Parliament',
        description: 'Participate in democratic processes and develop your political awareness through our youth parliament program.',
        features: ['Democratic Participation', 'Public Speaking', 'Policy Making', 'Civic Education', 'Leadership Skills']
      },
      youthDancing: {
        title: 'Youth Dancing Team',
        description: 'Express yourself through traditional and modern dance forms. Join our talented dancing teams and showcase Sri Lankan culture.',
        features: ['Traditional Dance', 'Modern Choreography', 'Cultural Performances', 'Competition Training', 'International Shows']
      },
      youthMusic: {
        title: 'Youth Music Band',
        description: 'Discover your musical talents with our youth music bands. Learn instruments, compose, and perform across various genres.',
        features: ['Instrumental Training', 'Vocal Development', 'Music Composition', 'Live Performances', 'Recording Opportunities']
      },
      youthDrama: {
        title: 'Youth Drama Team',
        description: 'Explore the world of theater and dramatic arts. Develop acting skills and participate in meaningful productions.',
        features: ['Acting Workshops', 'Script Writing', 'Stage Production', 'Character Development', 'Theater Festivals']
      },
      youthSports: {
        title: 'Youth Sports',
        description: 'Stay active and competitive with our comprehensive sports programs. From traditional games to modern athletics.',
        features: ['Athletic Training', 'Team Sports', 'Individual Competitions', 'Fitness Programs', 'International Tournaments']
      }
    },
    popularCourses: {
      badge: 'Popular Courses',
      title: 'Start Your Career Journey',
      subtitle: 'Discover our most popular vocational training programs designed to equip you with industry-relevant skills',
      viewAllCourses: 'View All Courses',
      applyNow: 'Apply Now',
      duration: 'Duration',
      students: 'students',
      months: 'Months',
      fullTime: 'Full Time',
      partTime: 'Part Time',
      categories: {
        hospitality: 'Hospitality',
        it: 'Information Technology',
        fashion: 'Design & Fashion',
        technical: 'Technical Skills',
        automotive: 'Automotive',
        beauty: 'Beauty & Wellness'
      },
      courses: {
        hotelManagement: {
          title: 'Hotel Management and Catering Technology',
          description: 'Comprehensive program covering hospitality management, food service operations, and tourism industry practices.',
          institute: 'NYSC Vocational Training Institute'
        },
        computerApplications: {
          title: 'Computer Applications and IT Support',
          description: 'Learn essential computer skills, software applications, hardware troubleshooting, and network basics.',
          institute: 'NYSC Technical Training Center'
        },
        fashionDesign: {
          title: 'Fashion Design and Garment Technology',
          description: 'Creative program focusing on fashion illustration, pattern making, garment construction, and textile knowledge.',
          institute: 'NYSC Creative Arts Center'
        },
        electrical: {
          title: 'Electrical Installation and Maintenance',
          description: 'Hands-on training in electrical systems, wiring, safety protocols, and maintenance procedures.',
          institute: 'NYSC Technical Institute'
        },
        automotive: {
          title: 'Automotive Technology and Repair',
          description: 'Complete automotive training covering engine diagnostics, repair techniques, and modern vehicle systems.',
          institute: 'NYSC Technical Training Center'
        },
        beautyCulture: {
          title: 'Beauty Culture and Cosmetology',
          description: 'Professional beauty training including skincare, makeup artistry, hair styling, and salon management.',
          institute: 'NYSC Beauty Academy'
        }
      }
    },
    newsEvents: {
      news: {
        badge: 'Breaking Stories',
        title: 'Latest',
        titleHighlight: 'News',
        subtitle: 'Stay informed with the latest developments and success stories from the NYSC community',
        exploreAll: 'Explore All News',
        readTime: 'min read',
        views: 'views',
        likes: 'likes',
        clickToRead: 'Click to read',
        hoverToPreview: 'Hover to preview',
        trending: 'TRENDING',
        featured: 'FEATURED',
        updated: 'Updated',
        categories: {
          sport: 'Sport',
          achievement: 'Achievement',
          event: 'Event',
          programLaunch: 'Program Launch',
          cultural: 'Cultural',
          environment: 'Environment',
          technology: 'Technology',
          leadership: 'Leadership',
          community: 'Community'
        }
      },
      events: {
        badge: 'Upcoming Events',
        title: 'Join',
        titleHighlight: 'Events',
        subtitle: 'Discover exciting opportunities to connect, learn, and grow with the NYSC community',
        viewAll: 'View All Events',
        nextEvent: 'Next event in',
        days: 'days',
        featured: 'Featured',
        clickToView: 'Click to view',
        viewDetails: 'View Details',
        learnMore: 'Learn More',
        types: {
          upcoming: 'upcoming',
          recent: 'recent',
          past: 'past'
        }
      }
    },
    testimonials: {
      badge: 'Read Testimonials',
      title: 'What Peoples Say About Us',
      writeStory: 'Write Your Story',
      clickToStart: 'Click to start writing'
    }
  },
  si: {
    common: {
      search: 'සොයන්න...',
      language: 'භාෂාව',
      theme: 'තේමාව',
      home: 'මුල්',
      about: 'පිලිබඳව',
      programs: 'වැඩසටහන්',
      contact: 'සම්බන්ධතා',
      loading: 'පූරණය වෙමින්...'
    },
    header: {
      youthClub: 'තරුණ සමාජය',
      divisions: 'අංශ',
      services: 'සේවා',
      ourCenters: 'අපගේ මධ්‍යස්ථාන',
      searchPlaceholder: 'සොයන්න...',
      newsEvents: 'පුවත් සහ සිදුවීම්',
      resources: 'සම්පත්'
    },
    dropdown: {
      // About section
      leadership: 'නායකත්වය',
      ourHistory: 'අපගේ ඉතිහාසය',
      mission: 'මෙහෙවර සහ දැක්ම',
      // Programs section
      youthAwards: 'තරුණ සම්මාන',
      skillDevelopment: 'නිපුණතා සංවර්ධනය',
      culturalAffairs: 'සංස්කෘතික වැඩසටහන්',
      youthParliament: 'තරුණ පාර්ලිමේන්තුව',
      findCourses: 'පාඨමාලා සොයන්න',
      // News & Events section
      latestNews: 'නවතම පුවත්',
      events: 'සිදුවීම්',
      achievements: 'ජයග්‍රහණ',
      gallery: 'ඡායාරූප ගැලරිය',
      // Resources section
      downloads: 'බාගැනීම්',
      contact: 'අප සම්බන්ධ කර ගන්න',
      studentPortal: 'ශිෂ්‍ය ද්වාරය',
      // Legacy items (keeping for compatibility)
      aboutClubs: 'සමාජ අමබුව',
      registerClub: 'සමාජ රජිස්ටර් කිරීම',
      findClubs: 'සමාජ සොයා ගන්න',
      clubActivities: 'සමාජ ක්‍රියාකාරකම්',
      sportsDevelopment: 'ක්‍රීඩා සංවර්ධනය',
      educationTraining: 'අධ්‍යාපන සහ පුහුණුව',
      internationalRelations: 'අන්තර්‍ජාතික සම්බන්ධතා',
      careerGuidance: 'කරියර සංවර්ධන මාර්ගදර්ශනය',
      volunteerPrograms: 'ස්වන්නනට සේවා වැඩසටහන්',
      trainingCenters: 'පුහුණු මධ්‍යස්ථාන',
      districtOffices: 'ශ්‍රීෂ්ඨමන්ඩල කාර්යාල',
      youthCenters: 'තරුණ මධ්‍යස්ථාන',
      contactInfo: 'සම්බන්ධතා තොරතුරු'
    },
    footer: {
      newsletterTitle: 'NYSC පුවත් සමඟ යාවත්කාලීන වන්න',
      newsletterDescription: 'වැඩසටහන්, සිදුවීම් සහ අවස්ථා පිළිබඳ නවතම යාවත්කාලීන කිරීම් ඔබගේ ඉන්බොක්ස් වෙත ලබා ගන්න',
      subscribeButton: 'දායක වන්න',
      subscribedMessage: 'දායක විය!',
      emailPlaceholder: 'ඔබගේ විද්‍යුත් තැපෑල ලිපිනය ඇතුළත් කරන්න',
      empoweringYouth: '1972 සිට තරුණයින් සවිබල ගැන්වීම',
      organizationDescription: 'ශ්‍රී ලංකාව පුරා තරුණ සංවර්ධනය, නායකත්ව පුහුණුව සහ ධනාත්මක සමාජ බලපෑම හරහා ශක්තිමත් ප්‍රජාවන් ගොඩනැගීම.',
      quickLinks: 'ඉක්මන් සබැඳි',
      programs: 'වැඩසටහන්',
      contact: 'සම්බන්ධතා',
      generalInquiries: 'සාමාන්‍ය විමසීම්',
      officeHours: 'සඳුදා - සිකුරාදා, පෙ.ව. 8:00 - ප.ව. 5:00',
      organizationAddress: 'ජාතික තරුණ සේවා සභාව',
      location: 'මහරගම, ශ්‍රී ලංකාව',
      copyright: 'ජාතික තරුණ සේවා සභාව. සියලුම හිමිකම් ඇවිරිණි.',
      madeWith: 'සාදන ලද්දේ',
      forYouth: 'ශ්‍රී ලංකාවේ තරුණයින් සඳහා',
      privacyPolicy: 'පෞද්ගලිකත්ව ප්‍රතිපත්තිය',
      termsOfService: 'සේවා නියම',
      accessibility: 'ප්‍රවේශ්‍යතාව',
      sitemap: 'වෙබ් අඩවි සිතියම'
    },
    links: {
      aboutNYSC: 'NYSC පිළිබඳව',
      programs: 'වැඩසටහන්',
      youthClubs: 'තරුණ සමාජ',
      downloads: 'බාගැනීම්',
      annualReports: 'වාර්ෂික වාර්තා',
      contactUs: 'අප සම්බන්ධ කර ගන්න'
    },
    programsList: {
      sportsExcellence: 'ක්‍රීඩා විශිෂ්ටත්වය',
      culturalActivities: 'සංස්කෘතික ක්‍රියාකාරකම්',
      leadershipTraining: 'නායකත්ව පුහුණුව',
      communityService: 'ප්‍රජා සේවය',
      skillDevelopment: 'නිපුණතා සංවර්ධනය',
      youthAwards: 'තරුණ සම්මාන'
    },
    hero: {
      subtitle: 'සවිබල ගත වූ ශ්‍රී ලංකා තරුණයා',
      title: 'ශ්‍රී ලංකාවේ ජාතික තරුණ සේවා',
      titleHighlight: 'සභාව',
      description: 'ශ්‍රී ලංකාවේ තරුණයෝ රටේ ආර්ථික සහ සමාජ කැපවීම සදහා ද කටයුතු කරති.',
      statsActiveMembers: 'සක්‍රීය සාමාජිකයින්',
      statsYouthClubs: 'තරුණ සමාජ',
      statsDistricts: 'දිස්ත්‍රික්ක',
      joinButton: 'අප සමග එකතු වන්න',
      youthStatement: 'COP28 සදහා තරුණ ප්‍රකාශනය'
    },
    keyServices: {
      sportsTitle: 'ක්‍රීඩා',
      sportsShortDesc: 'ක්‍රීඩා විශිෂ්ටත්වය',
      sportsDescription: 'විස්තර සහිත ක්‍රීඩා වැඩසටහන් සහ තරඟකාරී පුහුණුව හරහා ක්‍රීඩා විශිෂ්ටත්වය වර්ධනය කිරීම',
      sportsStats: 'සමාජ 50+',
      aestheticsTitle: 'සෞන්දර්යය',
      aestheticsShortDesc: 'සංස්කෘතික කලා',
      aestheticsDescription: 'සංගීතය, නර්තනය සහ දෘශ්‍ය කලාවන් හරහා නිර්මාණශීලිත්වය සහ කලාත්මක ප්‍රකාශනය පෝෂණය කිරීම',
      aestheticsStats: 'වැඩසටහන් 30+',
      educationTitle: 'අධ්‍යාපනය',
      educationShortDesc: 'දැනුම වර්ධනය',
      educationDescription: 'නව්‍ය ඉගෙනීම් සහ කුසලතා සංවර්ධන වැඩසටහන් හරහා මනසට බලය ලබා දීම',
      educationStats: 'පා්ශ්ව 100+',
      administrationTitle: 'පරිපාලනය',
      administrationShortDesc: 'නායකත්වය',
      administrationDescription: 'පාලනය සහ කළමනාකරණ පුහුණුව හරහා ඵලදායී තරුණ සංවිධාන ගොඩ නැගීම',
      administrationStats: 'දිස්ත්‍රික්ක 25',
      learnMore: 'වැඩිදුර ඉගෙන ගන්න'
    },
    youthOfferings: {
      badgeText: 'තරුණ වැඩසටහන්',
      title: 'අප පිරිනමන්නේ',
      titleHighlight: 'තරුණයන්ට',
      subtitle: 'ඔබේ හැකියාවන් විකාශනය කිරීම සඳහා සැලසුම් කර ඇති සවිස්තර වැඩසටහන් සහ අවස්ථා',
      careerTitle: 'වෘත්තීය සංවර්ධනය',
      careerDescription: 'වෘත්තීය කුසලතා පුහුණුව සහ වෘත්තීය මාර්ගදර්ශන වැඩසටහන්',
      careerFeatures: ['රැකියා පුහුණුව', 'වෘත්තීය උපදේශනය', 'රුද්ධ පුහුණුව'],
      volunteerTitle: 'ස්වේච්ඡා සේවක වැඩසටහන්',
      volunteerDescription: 'ප්‍රජා සේවාව සහ සමාජ සංවර්ධන මුලපිරීම්',
      volunteerFeatures: ['ප්‍රජා සේවාව', 'සමාජ ව්‍යාපෘති', 'පරිසර කාර්යයන්'],
      internationalTitle: 'ජාත්‍යන්තර හුවමාරුව',
      internationalDescription: 'ගෝලීය තරුණ හුවමාරු සහ සංස්කෘතික වැඩසටහන්',
      internationalFeatures: ['හුවමාරු වැඩසටහන්', 'සංස්කෘතික සංචාර', 'ගෝලීය ජාල'],
      educationalTitle: 'අධ්‍යාපන ආධාර',
      educationalDescription: 'ශිෂ්‍යත්ව සහ අධ්‍යාපන සහාය වැඩසටහන්',
      educationalFeatures: ['ශිෂ්‍යත්ව', 'පෞද්ගලික පන්ති', 'අධ්‍යයන ද්‍රව්‍ය'],
      clubsTitle: 'තරුණ සමාජ',
      clubsDescription: 'ඔබේ ප්‍රදේශයේ තරුණ සමාජවලට සම්බන්ධ වන්න හෝ ස්ථාපනය කරන්න',
      clubsFeatures: ['සමාජ පිහිටුවීම', 'ක්‍රියාකාරකම්', 'ජාල කිරීම'],
      innovationTitle: 'නවෝත්පාදන මධ්‍යස්ථානය',
      innovationDescription: 'ව්‍යවසායකත්වය සහ නවෝත්පාදන ආධාර',
      innovationFeatures: ['ආරම්භක ආධාර', 'උපදේශනය', 'අරමුදල් ප්‍රවේශය'],
      learnMore: 'වැඩිදුර ඉගෙන ගන්න'
    },
    organizations: {
      badge: 'ශ්‍රී ලංකා තරුණ',
      title: 'අපගේ අනෙක්',
      titleHighlight: 'සංවිධාන',
      exploreMore: 'වැඩිදුර සොයන්න',
      youthClub: {
        title: 'තරුණ සමාජය',
        description: 'ශ්‍රී ලංකා තරුණ සමාජ සම්මේලනය මගින් ක්‍රියාත්මක කරන ලද ශ්‍රී ලංකා තරුණ සමාජ ව්‍යාපාරය.'
      },
      youthServices: {
        title: 'තරුණ සේවා සීමාසහිත',
        description: 'අත්‍යවශ්‍ය සේවා සැපයීම මගින් තරුණයින්ගේ ආර්ථික බලය දිරිමත් කිරීම සහ වැඩි දියුණු කිරීම'
      },
      nysco: {
        title: 'NYSCO',
        description: 'තරුණ ව්‍යවසායකයින්ට ඔවුන්ගේ අදහස් සහ සේවා වැඩි දියුණු කර ඵලදායිතාව සහ ආදායම වැඩි කර ගත හැකිය'
      }
    },
    leaders: {
      badge: 'දැන ගන්න',
      title: 'අපගේ නායකයින්',
      subtitle: 'ශ්‍රී ලංකා තරුණයින් සම්බන්ධයෙන් විශිෂ්ට දැක්මක් සහිත බලවත් නායකයින් අප සතුව ඇත',
      minister: {
        name: 'ගරු සුනිල් කුමාර ගමගේ මැතිතුමා',
        position: 'තරුණ කටයුතු හා ක්‍රීඩා අමාත්‍ය'
      },
      deputyMinister: {
        name: 'ගරු එරංග ගුණසේකර මැතිතුමා',
        position: 'තරුණ කටයුතු නියෝජ්‍ය අමාත්‍ය'
      },
      secretary: {
        name: 'ඒ.එච්.එම්.යූ.අරුණ බණ්ඩාර මහතා',
        position: 'ලේකම්'
      },
      chairman: {
        name: 'නීතිඥ සුපුන් විජේරත්න මහතා',
        position: 'සභාපති/අධ්‍යක්ෂ ජනරාල්'
      },
      directorsTitle: 'අපගේ අධ්‍යක්ෂ මණ්ඩලය හමුවන්න',
      directorsDescription: 'ශ්‍රී ලංකා තරුණ සංවර්ධනයේ අනාගතය හැඩගස්වන දූරදර්ශී නායකයින් සොයා ගන්න',
      viewAllDirectors: 'සියලුම අධ්‍යක්ෂවරුන් බලන්න'
    },
    services: {
      badge: 'අපේ සේවාවන්',
      title: 'අප පිරිනමන',
      subtitle: 'ශ්‍රී ලංකාවේ තරුණයින් සවිබල ගැන්වීම සඳහා නිර්මාණය කර ඇති විස්තරශීලී වැඩසටහන් ගවේෂණය කරන්න',
      youthClub: {
        title: 'තරුණ සමාජය',
        description: 'ජාතිය පුරා ඇති තරුණ නායකයින්ගේ සහ වෙනස් කරන්නන්ගේ ගනුදෙනුවේ ප්‍රජාවට එකතු වන්න',
        features: ['නායකත්ව පුහුණුව', 'ප්‍රජා සේවාව', 'කුසලතා සංවර්ධනය', 'ජාල ක්‍රියාකාරකම්']
      },
      youthParliament: {
        title: 'තරුණ පාර්ලිමේන්තුව',
        description: 'ප්‍රජාතන්ත්‍රවාදී ක්‍රියාවලියන්හි සහභාගී වන්න සහ ඔබේ දේශපාලන දැනුවත්භාවය වර්ධනය කරන්න',
        features: ['ප්‍රතිපත්ති විවාද', 'නායකත්ව සභා', 'සිවිල් අධ්‍යාපනය', 'තරුණ ප්‍රතිපාදන']
      },
      youthDancing: {
        title: 'තරුණ නර්තන කණ්ඩායම',
        description: 'සාම්ප්‍රදායික සහ නවීන නර්තන ආකෘති හරහා ඔබ ප්‍රකාශ කරන්න',
        features: ['සාම්ප්‍රදායික නර්තනය', 'නවීන නර්තන සැකසුම', 'සංස්කෘතික සංදර්ශන', 'ජාත්‍යන්තර සිදුවීම්']
      },
      youthMusic: {
        title: 'තරුණ සංගීත කණ්ඩායම',
        description: 'ඔබේ සංගීත දක්ෂතා සොයා ගෙන ජාතික වේදිකාවල ප්‍රසාදනය කරන්න',
        features: ['සංගීත භාණ්ඩ පුහුණුව', 'කටහඬ පුහුණුව', 'කණ්ඩායම් ගොඩනගාගැනීම', 'ප්‍රසංග ප්‍රසාදනය']
      },
      youthDrama: {
        title: 'තරුණ නාට්‍ය කණ්ඩායම',
        description: 'රංගනයේ සහ නිර්මාණාත්මක ප්‍රකාශනයේ හරහා කතා ජීවන්තව ගෙන එන්න',
        features: ['රංගන පුහුණු සැසි', 'කතන්දර ලිවීම', 'වේදිකා නිෂ්පාදන', 'නාට්‍ය සම්මන්ත්‍රණ']
      },
      youthSports: {
        title: 'තරුණ ක්‍රීඩා',
        description: 'ක්‍රීඩාවන්හි විශිෂ්ට වී ඔබේ ප්‍රදේශය තරඟ සිදුවීම්වල නියෝජනය කරන්න',
        features: ['මලල ක්‍රීඩා පුහුණුව', 'කණ්ඩායම් ක්‍රීඩා', 'තරඟකාරී අභියෝග', 'ක්‍රීඩා නායකත්වය']
      },
      stats: {
        members: 'සාමාජිකයින්',
        programs: 'වැඩසටහන්',
        awards: 'සම්මාන'
      },
      keyFeatures: 'ප්‍රධාන සාධක',
      learnMore: 'වැඩිදුර ඉගෙන ගන්න'
    },
    popularCourses: {
      badge: 'ජනප්‍රිය පාඨමාලා',
      title: 'ඔබේ වෘත්තීය ගමන ආරම්භ කරන්න',
      subtitle: 'කර්මාන්ත අදාල කුසලතා වලින් ඔබව සන්නද්ධ කිරීම සඳහා නිර්මාණය කරන ලද අපගේ වඩාත් ජනප්‍රිය වෘත්තීය පුහුණු වැඩසටහන් සොයා ගන්න',
      viewAllCourses: 'සියලුම පාඨමාලා බලන්න',
      applyNow: 'දැන් අයදුම් කරන්න',
      duration: 'කාලය',
      students: 'සිසුන්',
      months: 'මාස',
      fullTime: 'පූර්ණ කාලීන',
      partTime: 'අර්ධ කාලීන',
      categories: {
        hospitality: 'සත්කාරක සේවා',
        it: 'තොරතුරු තාක්ෂණය',
        fashion: 'නිර්මාණ සහ විලාසිතා',
        technical: 'තාක්ෂණික කුසලතා',
        automotive: 'මෝටර් රථ',
        beauty: 'රූපලාවන්‍ය සහ සුවතා'
      },
      courses: {
        hotelManagement: {
          title: 'හෝටල් කළමනාකරණය සහ ආහාර සැපයුම් තාක්ෂණය',
          description: 'සත්කාරක කළමනාකරණය, ආහාර සේවා මෙහෙයුම් සහ සංචාරක කර්මාන්ත පරිචයන් ආවරණය කරන විස්තීර්ණ වැඩසටහන.',
          institute: 'ජාතික තරුණ සේවා සභා වෘත්තීය පුහුණු ආයතනය'
        },
        computerApplications: {
          title: 'පරිගණක යෙදුම් සහ තොරතුරු තාක්ෂණ සහාය',
          description: 'අත්‍යවශ්‍ය පරිගණක කුසලතා, මෘදුකාංග යෙදුම්, දෘඩාංග දෝෂ නිරාකරණය සහ ජාල මූලික කරුණු ඉගෙන ගන්න.',
          institute: 'ජාතික තරුණ සේවා සභා තාක්ෂණික පුහුණු මධ්‍යස්ථානය'
        },
        fashionDesign: {
          title: 'විලාසිතා නිර්මාණ සහ ඇඟලුම් තාක්ෂණය',
          description: 'විලාසිතා නිදර්ශන, රටා සෑදීම, ඇඟලුම් ඉදිකිරීම සහ රෙදිපිළි දැනුම කෙරෙහි අවධානය යොමු කරන නිර්මාණාත්මක වැඩසටහන.',
          institute: 'ජාතික තරුණ සේවා සභා නිර්මාණාත්මක කලා මධ්‍යස්ථානය'
        },
        electrical: {
          title: 'විදුලි ස්ථාපනය සහ නඩත්තු කිරීම',
          description: 'විදුලි පද්ධති, වයර් කිරීම, ආරක්ෂක ප්‍රෝටෝකෝල සහ නඩත්තු ක්‍රියා පටිපාටි පිළිබඳ ප්‍රායෝගික පුහුණුව.',
          institute: 'ජාතික තරුණ සේවා සභා තාක්ෂණික ආයතනය'
        },
        automotive: {
          title: 'මෝටර් රථ තාක්ෂණය සහ අලුත්වැඩියාව',
          description: 'එන්ජින් රෝග විනිශ්චය, අලුත්වැඩියා තාක්ෂණ සහ නවීන වාහන පද්ධති ආවරණය කරන සම්පූර්ණ මෝටර් රථ පුහුණුව.',
          institute: 'ජාතික තරුණ සේවා සභා තාක්ෂණික පුහුණු මධ්‍යස්ථානය'
        },
        beautyCulture: {
          title: 'රූපලාවන්‍ය සංස්කෘතිය සහ රූපලාවන්‍ය විද්‍යාව',
          description: 'සම රැකවරණය, වේශ නිරූපණ කලාව, හිසකෙස් මෝස්තර සහ රූපලාවන්‍යාගාර කළමනාකරණය ඇතුළු වෘත්තීය රූපලාවන්‍ය පුහුණුව.',
          institute: 'ජාතික තරුණ සේවා සභා රූපලාවන්‍ය ඇකඩමිය'
        }
      }
    },
    newsEvents: {
      news: {
        badge: 'නවතම පුවත්',
        title: 'නවතම',
        titleHighlight: 'ප්‍රවෘත්ති',
        subtitle: 'ජාතික තරුණ සේවා සභා ප්‍රජාවේ නවතම සංවර්ධන සහ සාර්ථක කතා සමඟ දැනුවත්ව සිටින්න',
        exploreAll: 'සියලු ප්‍රවෘත්ති ගවේෂණය කරන්න',
        readTime: 'මිනිත්තු කියවීම',
        views: 'නැරඹීම්',
        likes: 'කැමතියි',
        clickToRead: 'කියවීමට ක්ලික් කරන්න',
        hoverToPreview: 'පෙරදසුන සඳහා හෝවර් කරන්න',
        trending: 'ප්‍රවණතා',
        featured: 'විශේෂාංග',
        updated: 'යාවත්කාලීන කළේ',
        categories: {
          sport: 'ක්‍රීඩා',
          achievement: 'ජයග්‍රහණ',
          event: 'සිදුවීම',
          programLaunch: 'වැඩසටහන් දියත් කිරීම',
          cultural: 'සංස්කෘතික',
          environment: 'පරිසරය',
          technology: 'තාක්ෂණය',
          leadership: 'නායකත්වය',
          community: 'ප්‍රජාව'
        }
      },
      events: {
        badge: 'ඉදිරි සිදුවීම්',
        title: 'සම්බන්ධ වන්න',
        titleHighlight: 'සිදුවීම්',
        subtitle: 'ජාතික තරුණ සේවා සභා ප්‍රජාව සමඟ සම්බන්ධ වීමට, ඉගෙන ගැනීමට සහ වර්ධනය වීමට ඇති රසවත් අවස්ථා සොයා ගන්න',
        viewAll: 'සියලු සිදුවීම් බලන්න',
        nextEvent: 'ඊළඟ සිදුවීම',
        days: 'දින',
        featured: 'විශේෂාංග',
        clickToView: 'බැලීමට ක්ලික් කරන්න',
        viewDetails: 'විස්තර බලන්න',
        learnMore: 'වැඩිදුර ඉගෙන ගන්න',
        types: {
          upcoming: 'ඉදිරි',
          recent: 'මෑත',
          past: 'අතීත'
        }
      }
    },
    testimonials: {
      badge: 'සාක්ෂි කියවන්න',
      title: 'අප ගැන මිනිසුන් පවසන දේ',
      writeStory: 'ඔබේ කතාව ලියන්න',
      clickToStart: 'ලිවීම ආරම්භ කිරීමට ක්ලික් කරන්න'
    }
  },
  ta: {
    common: {
      search: 'தேடல்...',
      language: 'மொழி',
      theme: 'தீம்',
      home: 'முகப்பு',
      about: 'பற்றி',
      programs: 'திட்டங்கள்',
      contact: 'தொடர்பு',
      loading: 'ஏற்றுகிறது...'
    },
    header: {
      youthClub: 'இளைஞர் சங்கம்',
      divisions: 'பிரிவுகள்',
      services: 'சேவைகள்',
      ourCenters: 'எங்கள் மையங்கள்',
      searchPlaceholder: 'தேடல்...',
      newsEvents: 'செய்திகள் மற்றும் நிகழ்வுகள்',
      resources: 'வளங்கள்'
    },
    dropdown: {
      // About section
      leadership: 'தலைமை',
      ourHistory: 'எங்கள் வரலாறு',
      mission: 'நோக்கம் மற்றும் தொலைநோக்கு',
      // Programs section
      youthAwards: 'இளைஞர் விருதுகள்',
      skillDevelopment: 'திறன் மேம்பாடு',
      culturalAffairs: 'கலாச்சார திட்டங்கள்',
      youthParliament: 'இளைஞர் நாடாளுமன்றம்',
      findCourses: 'பாடநெறிகளைக் கண்டறியுங்கள்',
      // News & Events section
      latestNews: 'சமீபத்திய செய்திகள்',
      events: 'நிகழ்வுகள்',
      achievements: 'சாதனைகள்',
      gallery: 'புகைப்படத் தொகுப்பு',
      // Resources section
      downloads: 'பதிவிறக்கங்கள்',
      contact: 'எங்களைத் தொடர்பு கொள்ளுங்கள்',
      studentPortal: 'மாணவர் போர்டல்',
      // Legacy items (keeping for compatibility)
      aboutClubs: 'சங்கங்கள் பற்றி',
      registerClub: 'சங்கத்தை பதிவு செய்யுங்கள்',
      findClubs: 'சங்கங்களை கண்டறியுங்கள்',
      clubActivities: 'சங்க நடவடிக்கைகள்',
      sportsDevelopment: 'விளையாட்டு மேம்பாடு',
      educationTraining: 'கல்வி மற்றும் பயிற்சி',
      internationalRelations: 'சர்வதேச உறவுகள்',
      careerGuidance: 'தொழில் வழிகாட்டுதல்',
      volunteerPrograms: 'தன்னார்வ திட்டங்கள்',
      trainingCenters: 'பயிற்சி மையங்கள்',
      districtOffices: 'மாவட்ட அலுவலகங்கள்',
      youthCenters: 'இளைஞர் மையங்கள்',
      contactInfo: 'தொடர்பு தகவல்'
    },
    footer: {
      newsletterTitle: 'NYSC செய்திகளுடன் புதுப்பித்த நிலையில் இருங்கள்',
      newsletterDescription: 'திட்டங்கள், நிகழ்வுகள் மற்றும் வாய்ப்புகள் குறித்த சமீபத்திய புதுப்பிப்புகளை உங்கள் இன்பாக்ஸில் பெறுங்கள்',
      subscribeButton: 'சந்தா',
      subscribedMessage: 'சந்தா செய்யப்பட்டது!',
      emailPlaceholder: 'உங்கள் மின்னஞ்சல் முகவரியை உள்ளிடவும்',
      empoweringYouth: '1972 முதல் இளைஞர்களை வலுப்படுத்துதல்',
      organizationDescription: 'இலங்கை முழுவதும் இளைஞர் அபிவிருத்தி, தலைமைத்துவ பயிற்சி மற்றும் நேர்மறை சமூக தாக்கத்தின் மூலம் வலுவான சமூகங்களை உருவாக்குதல்.',
      quickLinks: 'விரைவு இணைப்புகள்',
      programs: 'திட்டங்கள்',
      contact: 'தொடர்பு',
      generalInquiries: 'பொதுவான விசாரணைகள்',
      officeHours: 'திங்கள் - வெள்ளி, காலை 8:00 - மாலை 5:00',
      organizationAddress: 'தேசிய இளைஞர் சேவை கவுன்சில்',
      location: 'மஹரகம, இலங்கை',
      copyright: 'தேசிய இளைஞர் சேவை கவுன்சில். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
      madeWith: 'உருவாக்கப்பட்டது',
      forYouth: 'இலங்கை இளைஞர்களுக்காக',
      privacyPolicy: 'தனியுரிமை கொள்கை',
      termsOfService: 'சேவை விதிமுறைகள்',
      accessibility: 'அணுகல்தன்மை',
      sitemap: 'தள வரைபடம்'
    },
    links: {
      aboutNYSC: 'NYSC பற்றி',
      programs: 'திட்டங்கள்',
      youthClubs: 'இளைஞர் சங்கங்கள்',
      downloads: 'பதிவிறக்கங்கள்',
      annualReports: 'வருடாந்திர அறிக்கைகள்',
      contactUs: 'எங்களை தொடர்பு கொள்ளுங்கள்'
    },
    programsList: {
      sportsExcellence: 'விளையாட்டு சிறப்பு',
      culturalActivities: 'கலாச்சார நடவடிக்கைகள்',
      leadershipTraining: 'தலைமைத்துவ பயிற்சி',
      communityService: 'சமூக சேவை',
      skillDevelopment: 'திறன் மேம்பாடு',
      youthAwards: 'இளைஞர் விருதுகள்'
    },
    hero: {
      subtitle: 'வலுவூட்டப்பட்ட இலங்கை இளைஞர்கள்',
      title: 'இலங்கையின் தேசிய இளைஞர் சேவை',
      titleHighlight: 'கவுன்சில்',
      description: 'இலங்கையின் இளைஞர்கள் நாட்டின் பொருளாதார மற்றும் சமூக முன்னேற்றத்திற்கான பொறுப்பை ஏற்றுள்ளனர்.',
      statsActiveMembers: 'செயலில் உள்ள உறுப்பினர்கள்',
      statsYouthClubs: 'இளைஞர் கழகங்கள்',
      statsDistricts: 'மாவட்டங்கள்',
      joinButton: 'எங்களுடன் சேருங்கள்',
      youthStatement: 'COP28க்கான இளைஞர் அறிக்கை'
    },
    keyServices: {
      sportsTitle: 'விளையாட்டு',
      sportsShortDesc: 'விளையாட்டு சிறப்பு',
      sportsDescription: 'விரிவான விளையாட்டு திட்டங்கள் மற்றும் போட்டி பயிற்சி மூலம் விளையாட்டு சிறப்பை வளர்த்தல்',
      sportsStats: '50+ கழகங்கள்',
      aestheticsTitle: 'அழகியல்',
      aestheticsShortDesc: 'கலாச்சார கலை',
      aestheticsDescription: 'இசை, நடனம் மற்றும் காட்சி கலைகள் மூலம் படைப்பாற்றல் மற்றும் கலை வெளிப்பாட்டை வளர்த்தல்',
      aestheticsStats: '30+ திட்டங்கள்',
      educationTitle: 'கல்வி',
      educationShortDesc: 'அறிவு வளர்ச்சி',
      educationDescription: 'புதுமையான கற்றல் மற்றும் திறன் மேம்பாட்டு திட்டங்கள் மூலம் மனதை வலுப்படுத்துதல்',
      educationStats: '100+ பாடநெறிகள்',
      administrationTitle: 'நிர்வாகம்',
      administrationShortDesc: 'தலைமைத்துவம்',
      administrationDescription: 'நிர்வாகம் மற்றும் மேலாண்மை பயிற்சி மூலம் பயனுள்ள இளைஞர் அமைப்புகளை கட்டியெழுப்புதல்',
      administrationStats: '25 மாவட்டங்கள்',
      learnMore: 'மேலும் அறிக'
    },
    youthOfferings: {
      badgeText: 'இளைஞர் திட்டங்கள்',
      title: 'நாங்கள் வழங்குவது',
      titleHighlight: 'இளைஞர்களுக்கு',
      subtitle: 'உங்கள் திறனை திறக்க வடிவமைக்கப்பட்ட விரிவான திட்டங்கள் மற்றும் வாய்ப்புகள்',
      careerTitle: 'தொழில் மேம்பாடு',
      careerDescription: 'தொழில்முறை திறன் பயிற்சி மற்றும் தொழில் வழிகாட்டுதல் திட்டங்கள்',
      careerFeatures: ['வேலை பயிற்சி', 'தொழில் ஆலோசனை', 'உள்ளீட்டு பயிற்சி'],
      volunteerTitle: 'தன்னார்வ திட்டங்கள்',
      volunteerDescription: 'சமூக சேவை மற்றும் சமூக மேம்பாட்டு முன்னெடுப்புகள்',
      volunteerFeatures: ['சமூக சேவை', 'சமூக திட்டங்கள்', 'சுற்றுச்சூழல் பணி'],
      internationalTitle: 'சர்வதேச பரிமாற்றம்',
      internationalDescription: 'உலகளவிலான இளைஞர் பரிமாற்றம் மற்றும் கலாச்சார திட்டங்கள்',
      internationalFeatures: ['பரிமாற்ற திட்டங்கள்', 'கலாச்சார சுற்றுலா', 'உலகளாவிய வலையமைப்புகள்'],
      educationalTitle: 'கல்வி ஆதரவு',
      educationalDescription: 'உதவித்தொகை மற்றும் கல்வி உதவி திட்டங்கள்',
      educationalFeatures: ['உதவித்தொகை', 'பயிற்சி', 'படிப்பு பொருட்கள்'],
      clubsTitle: 'இளைஞர் கழகங்கள்',
      clubsDescription: 'உங்கள் பகுதியில் இளைஞர் கழகங்களில் சேரவும் அல்லது நிறுவுங்கள்',
      clubsFeatures: ['கழக உருவாக்கம்', 'செயல்பாடுகள்', 'வலையமைப்பு'],
      innovationTitle: 'புதுமை மையம்',
      innovationDescription: 'தொழில் முனைவு மற்றும் புதுமை ஆதரவு',
      innovationFeatures: ['துவக்க ஆதரவு', 'வழிகாட்டுதல்', 'நிதி அணுகல்'],
      learnMore: 'மேலும் அறிக'
    },
    organizations: {
      badge: 'இலங்கை இளைஞர்',
      title: 'எங்கள் பிற',
      titleHighlight: 'அமைப்புகள்',
      exploreMore: 'மேலும் ஆராயுங்கள்',
      youthClub: {
        title: 'இளைஞர் கழகம்',
        description: 'இலங்கை இளைஞர் கழக கூட்டமைப்பால் செயல்படுத்தப்படும் இலங்கை இளைஞர் கழக இயக்கம்.'
      },
      youthServices: {
        title: 'இளைஞர் சேவைகள் நிறுவனம்',
        description: 'அத்தியாவசிய சேவைகளை வழங்குவதன் மூலம் இளைஞர்களின் பொருளாதார சக்தியை ஊக்குவித்தல் மற்றும் மேம்படுத்துதல்'
      },
      nysco: {
        title: 'NYSCO',
        description: 'இளம் தொழில் முனைவோர் தங்கள் யோசனைகள் மற்றும் சேவைகளை மேம்படுத்தி உற்பத்தித்திறன் மற்றும் வருவாயை அதிகரிக்க முடியும்'
      }
    },
    leaders: {
      badge: 'அறிந்து கொள்ளுங்கள்',
      title: 'எங்கள் தலைவர்கள்',
      subtitle: 'இலங்கை இளைஞர்கள் குறித்த சிறந்த பார்வையுடன் சக்திவாய்ந்த தலைவர்கள் எங்களிடம் உள்ளனர்',
      minister: {
        name: 'கௌரவ சுனில் குமார கமகே',
        position: 'இளைஞர் விவகாரங்கள் மற்றும் விளையாட்டு அமைச்சர்'
      },
      deputyMinister: {
        name: 'கௌரவ எரங்க குணசேகர',
        position: 'இளைஞர் விவகாரங்கள் பிரதி அமைச்சர்'
      },
      secretary: {
        name: 'திரு. ஏ.எச்.எம்.யூ.அருண பண்டார',
        position: 'செயலாளர்'
      },
      chairman: {
        name: 'சட்டத்தரணி திரு. சுபுன் விஜேரத்ன',
        position: 'தலைவர்/பணிப்பாளர் நாயகம்'
      },
      directorsTitle: 'எங்கள் இயக்குநர் குழுவை சந்திக்கவும்',
      directorsDescription: 'இலங்கை இளைஞர் அபிவிருத்தியின் எதிர்காலத்தை வடிவமைக்கும் தொலைநோக்கு தலைவர்களை கண்டறியுங்கள்',
      viewAllDirectors: 'அனைத்து இயக்குநர்களையும் பார்க்க'
    },
    services: {
      badge: 'எங்கள் சேவைகள்',
      title: 'நாங்கள் வழங்குவது',
      subtitle: 'இலங்கையின் இளைஞர்களை வலுப்படுத்துவதற்காக வடிவமைக்கப்பட்ட விரிவான திட்டங்களை ஆராயுங்கள்',
      youthClub: {
        title: 'இளைஞர் சங்கம்',
        description: 'நாடு முழுவதும் உள்ள இளம் தலைவர்கள் மற்றும் மாற்றம் கொண்டுவருபவர்களின் துடிப்பான சமூகத்தில் சேருங்கள்',
        features: ['தலைமைத்துவ பயிற்சி', 'சமூக சேவை', 'திறன் மேம்பாடு', 'நெட்வொர்க்கிங் நிகழ்வுகள்']
      },
      youthParliament: {
        title: 'இளைஞர் நாடாளுமன்றம்',
        description: 'ஜனநாயக செயல்முறைகளில் பங்கேற்று உங்கள் அரசியல் விழிப்புணர்வை வளர்த்துக் கொள்ளுங்கள்',
        features: ['கொள்கை விவாதங்கள்', 'தலைமைத்துவ மன்றங்கள்', 'குடிமைக் கல்வி', 'இளைஞர் வக்காலத்து']
      },
      youthDancing: {
        title: 'இளைஞர் நடன குழு',
        description: 'பாரம்பரிய மற்றும் நவீன நடன வடிவங்கள் மூலம் உங்களை வெளிப்படுத்துங்கள்',
        features: ['பாரம்பரிய நடனம்', 'நவீன நடன அமைப்பு', 'கலாச்சார நிகழ்ச்சிகள்', 'சர்வதேச நிகழ்வுகள்']
      },
      youthMusic: {
        title: 'இளைஞர் இசை குழு',
        description: 'உங்கள் இசைத் திறமையை கண்டறிந்து தேசிய மேடைகளில் நிகழ்த்துங்கள்',
        features: ['இசைக்கருவி பயிற்சி', 'குரல் பயிற்சி', 'குழு உருவாக்கம்', 'இசை நிகழ்ச்சிகள்']
      },
      youthDrama: {
        title: 'இளைஞர் நாடக குழு',
        description: 'நாடக நிகழ்ச்சிகள் மற்றும் ஆக்கப்பூர்வமான வெளிப்பாடு மூலம் கதைகளை உயிர்ப்பிக்கவும்',
        features: ['நடிப்பு பட்டறைகள்', 'திரைக்கதை எழுதுதல்', 'மேடை நிகழ்ச்சிகள்', 'நாடக திருவிழாக்கள்']
      },
      youthSports: {
        title: 'இளைஞர் விளையாட்டு',
        description: 'விளையாட்டில் சிறந்து விளங்கி போட்டி நிகழ்வுகளில் உங்கள் பகுதியை பிரதிநிதித்துவப்படுத்துங்கள்',
        features: ['தடகள பயிற்சி', 'குழு விளையாட்டுகள்', 'போட்டிகள்', 'விளையாட்டு தலைமைத்துவம்']
      },
      stats: {
        members: 'உறுப்பினர்கள்',
        programs: 'திட்டங்கள்',
        awards: 'விருதுகள்'
      },
      keyFeatures: 'முக்கிய அம்சங்கள்',
      learnMore: 'மேலும் அறியவும்'
    },
    popularCourses: {
      badge: 'பிரபலமான பாடநெறிகள்',
      title: 'உங்கள் தொழில் பயணத்தை தொடங்குங்கள்',
      subtitle: 'தொழில் தொடர்புடைய திறன்களுடன் உங்களை தயார்படுத்த வடிவமைக்கப்பட்ட எங்கள் மிகவும் பிரபலமான தொழில் பயிற்சி திட்டங்களை கண்டறியுங்கள்',
      viewAllCourses: 'அனைத்து பாடநெறிகளையும் பார்க்கவும்',
      applyNow: 'இப்போது விண்ணப்பிக்கவும்',
      duration: 'காலம்',
      students: 'மாணவர்கள்',
      months: 'மாதங்கள்',
      fullTime: 'முழு நேரம்',
      partTime: 'பகுதி நேரம்',
      categories: {
        hospitality: 'விருந்தோம்பல்',
        it: 'தகவல் தொழில்நுட்பம்',
        fashion: 'வடிவமைப்பு மற்றும் ஃபேஷன்',
        technical: 'தொழில்நுட்ப திறன்கள்',
        automotive: 'வாகனம்',
        beauty: 'அழகு மற்றும் நலன்'
      },
      courses: {
        hotelManagement: {
          title: 'ஹோட்டல் மேலாண்மை மற்றும் உணவளிப்பு தொழில்நுட்பம்',
          description: 'விருந்தோம்பல் மேலாண்மை, உணவு சேவை செயல்பாடுகள் மற்றும் சுற்றுலா தொழில் நடைமுறைகளை உள்ளடக்கிய விரிவான திட்டம்.',
          institute: 'தேசிய இளைஞர் சேவை சபை தொழில் பயிற்சி நிறுவனம்'
        },
        computerApplications: {
          title: 'கணினி பயன்பாடுகள் மற்றும் ஐடி ஆதரவு',
          description: 'அத்தியாவசிய கணினி திறன்கள், மென்பொருள் பயன்பாடுகள், வன்பொருள் பிரச்சனை தீர்வு மற்றும் நெட்வொர்க் அடிப்படைகளை கற்றுக்கொள்ளுங்கள்.',
          institute: 'தேசிய இளைஞர் சேவை சபை தொழில்நுட்ப பயிற்சி மையம்'
        },
        fashionDesign: {
          title: 'ஃபேஷன் வடிவமைப்பு மற்றும் ஆடை தொழில்நுட்பம்',
          description: 'ஃபேஷன் விளக்கப்படம், பாணி உருவாக்கம், ஆடை கட்டுமானம் மற்றும் துணி அறிவில் கவனம் செலுத்தும் ஆக்கப்பூர்வமான திட்டம்.',
          institute: 'தேசிய இளைஞர் சேவை சபை ஆக்கப்பூர்வ கலை மையம்'
        },
        electrical: {
          title: 'மின் நிறுவல் மற்றும் பராமரிப்பு',
          description: 'மின் அமைப்புகள், வயரிங், பாதுகாப்பு நெறிமுறைகள் மற்றும் பராமரிப்பு நடைமுறைகளில் நடைமுறை பயிற்சி.',
          institute: 'தேசிய இளைஞர் சேவை சபை தொழில்நுட்ப நிறுவனம்'
        },
        automotive: {
          title: 'வாகன தொழில்நுட்பம் மற்றும் பழுது',
          description: 'இயந்திர கண்டறிதல், பழுது நுட்பங்கள் மற்றும் நவீன வாகன அமைப்புகளை உள்ளடக்கிய முழுமையான வாகன பயிற்சி.',
          institute: 'தேசிய இளைஞர் சேவை சபை தொழில்நுட்ப பயிற்சி மையம்'
        },
        beautyCulture: {
          title: 'அழகு கலாச்சாரம் மற்றும் அழகுக்கலை',
          description: 'தோல் பராமரிப்பு, மேக்கப் கலை, முடி வடிவமைப்பு மற்றும் சலூன் மேலாண்மை உள்ளிட்ட தொழில்முறை அழகு பயிற்சி.',
          institute: 'தேசிய இளைஞர் சேவை சபை அழகு அகாடமி'
        }
      }
    },
    newsEvents: {
      news: {
        badge: 'சமீபத்திய செய்திகள்',
        title: 'சமீபத்திய',
        titleHighlight: 'செய்திகள்',
        subtitle: 'தேசிய இளைஞர் சேவை சபை சமூகத்தின் சமீபத்திய முன்னேற்றங்கள் மற்றும் வெற்றிக் கதைகளுடன் தொடர்பில் இருங்கள்',
        exploreAll: 'அனைத்து செய்திகளையும் ஆராயுங்கள்',
        readTime: 'நிமிட வாசிப்பு',
        views: 'பார்வைகள்',
        likes: 'விருப்பங்கள்',
        clickToRead: 'படிக்க கிளிக் செய்யவும்',
        hoverToPreview: 'முன்னோட்டத்திற்கு ஹோவர் செய்யவும்',
        trending: 'டிரெண்டிங்',
        featured: 'சிறப்பு',
        updated: 'புதுப்பிக்கப்பட்டது',
        categories: {
          sport: 'விளையாட்டு',
          achievement: 'சாதனை',
          event: 'நிகழ்வு',
          programLaunch: 'திட்ட தொடக்கம்',
          cultural: 'கலாச்சாரம்',
          environment: 'சுற்றுச்சூழல்',
          technology: 'தொழில்நுட்பம்',
          leadership: 'தலைமைத்துவம்',
          community: 'சமூகம்'
        }
      },
      events: {
        badge: 'வரவிருக்கும் நிகழ்வுகள்',
        title: 'சேருங்கள்',
        titleHighlight: 'நிகழ்வுகள்',
        subtitle: 'தேசிய இளைஞர் சேவை சபை சமூகத்துடன் இணைய, கற்றுக்கொள்ள மற்றும் வளர சுவாரஸ்யமான வாய்ப்புகளை கண்டறியுங்கள்',
        viewAll: 'அனைத்து நிகழ்வுகளையும் காண்க',
        nextEvent: 'அடுத்த நிகழ்வு',
        days: 'நாட்கள்',
        featured: 'சிறப்பு',
        clickToView: 'பார்க்க கிளிக் செய்யவும்',
        viewDetails: 'விவரங்களைக் காண்க',
        learnMore: 'மேலும் அறிக',
        types: {
          upcoming: 'வரவிருக்கும்',
          recent: 'சமீபத்திய',
          past: 'கடந்த'
        }
      }
    },
    testimonials: {
      badge: 'பரிந்துரைகளைப் படிக்கவும்',
      title: 'எங்களைப் பற்றி மக்கள் என்ன சொல்கிறார்கள்',
      writeStory: 'உங்கள் கதையை எழுதுங்கள்',
      clickToStart: 'எழுத தொடங்க கிளிக் செய்யவும்'
    }
  }
};

// Provider component
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  // Load saved language from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('nysc-language') as Language;
    if (savedLanguage && ['en', 'si', 'ta'].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('nysc-language', language);
  };

  // Translation function with nested key support
  const t = (key: string): string => {
    const keys = key.split('.');
    let result: any = translations[currentLanguage];
    
    for (const k of keys) {
      result = result?.[k];
    }
    
    return result || key; // Return key if translation not found
  };

  const value: LanguageContextType = {
    currentLanguage,
    setLanguage,
    t,
    translations: translations[currentLanguage]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;