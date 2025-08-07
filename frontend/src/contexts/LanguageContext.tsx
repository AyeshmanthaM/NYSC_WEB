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
      searchPlaceholder: 'Search...'
    },
    dropdown: {
      aboutClubs: 'About Clubs',
      registerClub: 'Register Club',
      findClubs: 'Find Clubs',
      clubActivities: 'Club Activities',
      sportsDevelopment: 'Sports Development',
      culturalAffairs: 'Cultural Affairs',
      educationTraining: 'Education & Training',
      internationalRelations: 'International Relations',
      youthAwards: 'Youth Awards',
      skillDevelopment: 'Skill Development',
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
      searchPlaceholder: 'සොයන්න...'
    },
    dropdown: {
      aboutClubs: 'සමාජ අමබුව',
      registerClub: 'සමාජ රජිස්ටර් කිරීම',
      findClubs: 'සමාජ සොයා ගන්න',
      clubActivities: 'සමාජ ක්‍රියාකාරකම්',
      sportsDevelopment: 'ක්‍රීඩා සංවර්ධනය',
      culturalAffairs: 'සාංස්කෘතික ව්‍යාපාර',
      educationTraining: 'අධ්‍යාපන සහ පුහුණුව',
      internationalRelations: 'අන්තර්‍ජාතික සම්බන්ධතා',
      youthAwards: 'තරුණ සම්මාන',
      skillDevelopment: 'නිපුණතා සංවර්ධනය',
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
      searchPlaceholder: 'தேடல்...'
    },
    dropdown: {
      aboutClubs: 'சங்கங்கள் பற்றி',
      registerClub: 'சங்கத்தை பதிவு செய்யுங்கள்',
      findClubs: 'சங்கங்களை கண்டறியுங்கள்',
      clubActivities: 'சங்க நடவடிக்கைகள்',
      sportsDevelopment: 'விளையாட்டு மேம்பாடு',
      culturalAffairs: 'கலாச்சார விவகாரங்கள்',
      educationTraining: 'கல்வி மற்றும் பயிற்சி',
      internationalRelations: 'சர்வதேச உறவுகள்',
      youthAwards: 'இளைஞர் விருதுகள்',
      skillDevelopment: 'திறன் மேம்பாட்டு',
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