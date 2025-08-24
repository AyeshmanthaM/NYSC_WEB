import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, ChevronDown, Moon, Sun, XCircle,
  Users, Award, FileText, Download, Crown, UserCheck, UserCog, MapPin,
  Trophy, Music, GraduationCap, Calendar, Newspaper, Building, Building2,
  UserPlus, Heart, Shield, DollarSign, Scale, FolderOpen,
  Briefcase, Globe, Phone, Info, Archive, Image
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useModernLanguage } from '../../contexts/ModernLanguageContext';
import { useMultipleNamespaces } from '../../hooks/useTranslationWithNamespace';
import { colors, getThemeColor } from '../../config/colors';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentLanguage, setLanguage } = useModernLanguage();
  const { t, ready } = useMultipleNamespaces(['header', 'dropdown', 'common']);
  const [searchValue, setSearchValue] = useState('');
  const [dropdownTimeout, setDropdownTimeout] = useState<number | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState('');
  const [isTabTransitioning, setIsTabTransitioning] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { isDark, toggleTheme } = useTheme();

  // Language configuration
  const languages = [
    { code: 'si' as const, label: 'Sinhala', native: 'සිංහල', flag: 'SI' },
    { code: 'ta' as const, label: 'Tamil', native: 'தமிழ්', flag: 'TA' },
    { code: 'en' as const, label: 'English', native: 'English', flag: 'EN' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      // Check if click is outside navigation and dropdown areas
      if (!target.closest('.navigation-container') && !target.closest('[data-dropdown]')) {
        setActiveDropdown(null);
        setIsSearchOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
        setSearchValue('');
        setIsSearchFocused(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      if (dropdownTimeout) {
        clearTimeout(dropdownTimeout);
      }
    };
  }, [activeDropdown, dropdownTimeout]);

  // Initialize mobile tab when language changes or menu opens
  useEffect(() => {
    if (isMobileMenuOpen) {
      const dropdownKeys = Object.keys(getDropdownItems());
      // When language changes, update the active tab to the first available key
      // or if there's an active tab, try to maintain the same position
      if (dropdownKeys.length > 0) {
        if (!activeMobileTab || !dropdownKeys.includes(activeMobileTab)) {
          // Find the same tab position or default to first
          const currentTabIndex = activeMobileTab ? 
            Object.keys(getDropdownItems()).findIndex(key => key === activeMobileTab) : 0;
          const newTabIndex = currentTabIndex >= 0 && currentTabIndex < dropdownKeys.length ? 
            currentTabIndex : 0;
          
          // Add a small delay for smooth animation when menu opens
          if (!activeMobileTab) {
            setIsTabTransitioning(true);
            setTimeout(() => {
              setActiveMobileTab(dropdownKeys[newTabIndex]);
              setTimeout(() => {
                setIsTabTransitioning(false);
              }, 50);
            }, 100);
          } else {
            setActiveMobileTab(dropdownKeys[newTabIndex]);
          }
        }
      }
      // Lock body scroll when mobile menu is open
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      // Restore body scroll position
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
  }, [currentLanguage, isMobileMenuOpen]);

  // Separate effect to handle language changes for active tab
  useEffect(() => {
    if (activeMobileTab && currentLanguage) {
      const dropdownKeys = Object.keys(getDropdownItems());
      // Check if current active tab exists in the new language
      if (!dropdownKeys.includes(activeMobileTab) && dropdownKeys.length > 0) {
        // Try to maintain the same position when language changes
        const allTabs = ['directors', 'divisions', 'services', 'newsEvents', 'resources', 'student', 'ourCenters'];
        const currentIndex = allTabs.findIndex(tab => 
          activeMobileTab.toLowerCase().includes(tab.toLowerCase()) || 
          t(`header.${tab}`) === activeMobileTab
        );
        
        // Add smooth transition for language change
        setIsTabTransitioning(true);
        setTimeout(() => {
          // Set to the same index position or default to first
          const newIndex = currentIndex >= 0 && currentIndex < dropdownKeys.length ? currentIndex : 0;
          setActiveMobileTab(dropdownKeys[newIndex]);
          setTimeout(() => {
            setIsTabTransitioning(false);
          }, 50);
        }, 150);
      }
    }
  }, [currentLanguage]);

  // Show loading state while translations are not ready
  if (!ready) {
    return (
      <header className="sticky top-0 z-50 w-full">
        <div className="h-16 bg-white dark:bg-gray-900 shadow-sm flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
        </div>
      </header>
    );
  }

  const getDropdownItems = () => ({
    // Creative NYSC navigation structure - streamlined and intuitive
    [t('header:directors')]: [
      { label: t('dropdown:boardOfMembers'), icon: Crown, route: '/directors/board-of-members' },
      { label: t('dropdown:directors'), icon: Users, route: '/directors/directors' },
      { label: t('dropdown:deputyDirectors'), icon: UserCheck, route: '/directors/deputy-directors' },
      { label: t('dropdown:assistantDirectors'), icon: UserCog, route: '/directors/assistant-directors' },
      { label: t('dropdown:provincialDirectors'), icon: MapPin, route: '/directors/provincial-directors' },
      { label: t('dropdown:provincialAssistantDirectors'), icon: MapPin, route: '/directors/provincial-assistant-directors' }
    ],
    [t('header:divisions')]: [
      { label: t('dropdown:financeDivision'), icon: DollarSign, route: '/divisions/finance' },
      { label: t('dropdown:legalInvestigationDivision'), icon: Scale, route: '/divisions/legal-investigation' },
      { label: t('dropdown:youthAwards'), icon: Award, route: '/divisions/youth-awards' },
      { label: t('dropdown:internalAuditDivision'), icon: Shield, route: '/divisions/internal-audit' },
      { label: t('dropdown:examinationAssessmentDivision'), icon: FolderOpen, route: '/divisions/examination-assessment' },
      { label: t('dropdown:specialProjectDivision'), icon: Building2, route: '/divisions/special-projects' }
    ],
    [t('header:services')]: [
      { label: t('dropdown:youthClubs'), icon: Users, route: '/services/youth-clubs' },
      { label: t('dropdown:youthServicesLimited'), icon: Briefcase, route: '/services/youth-services-limited' },
      { label: t('dropdown:youthParliament'), icon: Users, route: '/services/YouthParliament' },
      { label: t('dropdown:youthDancingTeam'), icon: Heart, route: '/services/youth-dancing-team' },
      { label: t('dropdown:youthMusicBand'), icon: Music, route: '/services/youth-music-band' },
      { label: t('dropdown:youthDramaTeam'), icon: Globe, route: '/services/youth-drama-team' }
    ],
    [t('header:newsEvents')]: [
      // News Section
      { label: t('dropdown:latestNews'), icon: Newspaper, route: '/news-events/latest-news' },
      { label: t('dropdown:newsArchive'), icon: Archive, route: '/news-events/news-archive' },
      { label: t('dropdown:pressReleases'), icon: FileText, route: '/news-events/press-releases' },
      // Events Section  
      { label: t('dropdown:upcomingEvents'), icon: Calendar, route: '/events/upcoming-events' },
      { label: t('dropdown:eventCalendar'), icon: Calendar, route: '/events/events-calendar' },
      { label: t('dropdown:workshops'), icon: Users, route: '/events/workshops' },
      { label: t('dropdown:competitions'), icon: Trophy, route: '/events/competitions' },
      // Gallery Section
      { label: t('dropdown:gallery'), icon: Image, route: '/news-events/gallery' }
    ],
    [t('header:resources')]: [
      // About Section
      { label: t('dropdown:aboutNYSC'), icon: Info, route: '/about' },
      // Contact Information
      { label: t('dropdown:contactUs'), icon: Phone, route: '/contact' },
      // Downloads Section
      { label: t('dropdown:annualReports'), icon: FileText, route: '/downloads/annual-reports' },
      { label: t('dropdown:applicationForms'), icon: FileText, route: '/downloads/application-forms' },
      { label: t('dropdown:policyDocuments'), icon: Shield, route: '/downloads/policy-documents' },
      { label: t('dropdown:mediaResources'), icon: Download, route: '/downloads/media-resources' }
    ],
    [t('header:student')]: [
      { label: t('dropdown:findCourses'), icon: GraduationCap, route: '/student/FindCourses' },
      { label: t('dropdown:studentPortal'), icon: UserPlus, route: '/student/StudentPortal' }
    ],
    [t('header:ourCenters')]: [
      { label: t('dropdown:trainingCenters'), icon: Building, route: '/our-centers/training-centers' },
      { label: t('dropdown:youthCenters'), icon: Users, route: '/our-centers/youth-centers' },
      { label: t('dropdown:districtOffices'), icon: MapPin, route: '/our-centers/district-offices' },
      { label: t('dropdown:centerLocator'), icon: MapPin, route: '/our-centers/center-locator' }
    ]
  });

  // Navigation helper - works with translated section names
  const getMainSectionRoute = (section: string) => {
    // Map translated section names to routes - streamlined structure
    const routeMap: { [key: string]: string } = {
      [t('header:directors')]: '/directors',
      [t('header:divisions')]: '/divisions',
      [t('header:services')]: '/services',
      [t('header:newsEvents')]: '/news-events',
      [t('header:resources')]: '/resources',
      [t('header:student')]: '/student',
      [t('header:ourCenters')]: '/our-centers'
    };

    return routeMap[section] || '#';
  };

  // Enhanced dropdown handlers with better hover mechanics
  const handleDropdownEnter = (item: string) => {
    // Clear any existing timeout
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    // Set active dropdown immediately for better responsiveness
    setActiveDropdown(item);
  };

  const handleDropdownLeave = () => {
    // Add a small delay before closing to prevent flickering
    const timeout = window.setTimeout(() => {
      setActiveDropdown(null);
    }, 150); // Optimal delay for smooth interaction
    setDropdownTimeout(timeout as unknown as number);
  };

  // Handle dropdown content hover to keep it open
  const handleDropdownContentEnter = (item: string) => {
    // Clear timeout to prevent closing
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    // Ensure dropdown stays open
    setActiveDropdown(item);
  };

  // Search handlers
  const handleSearchSubmit = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      // Search functionality to be implemented
      console.log('Search:', searchValue);
    }
  };

  const handleSearchClear = () => {
    setSearchValue('');
    searchInputRef.current?.focus();
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
    if (!searchValue.trim()) {
      setIsSearchOpen(false);
    }
  };

  // Helper function to get button styles
  const getButtonBaseStyle = () => `min-w-[40px] min-h-[40px] p-2 rounded-md border transition-all duration-300 ${isScrolled
    ? isDark
      ? `${getThemeColor('text.secondary', true)} ${colors.hover.text.primary.dark} ${colors.hover.background.dark} ${getThemeColor('border.primary', true)} ${colors.hover.border.subtle.dark}`
      : `${getThemeColor('text.primary', false)} ${colors.hover.text.primary.light} ${colors.hover.background.light} ${getThemeColor('border.secondary', false)} ${colors.hover.border.subtle.light}`
    : isDark
      ? `${getThemeColor('text.secondary', true)} ${colors.hover.text.primary.dark} ${getThemeColor('background.secondary', true)} ${colors.border.subtle.dark} ${colors.hover.border.subtle.dark}`
      : `${getThemeColor('text.secondary', false)} ${colors.hover.text.primary.light} ${getThemeColor('background.overlay', false)} ${colors.border.subtle.light} ${colors.hover.border.subtle.light}`
    }`;

  // Helper function to get consistent language dropdown button styles using colors config
  const getLanguageButtonStyles = (isActive: boolean) => ({
    button: `flex items-center gap-2 px-3 py-2 rounded-md border transition-all duration-300 ${isActive
      ? isScrolled
        ? isDark
          ? `${getThemeColor('background.secondary', true)} ${getThemeColor('text.primary', true)} border-orange-500 ${colors.effects.glow.subtle.dark}`
          : `${getThemeColor('background.tertiary', false)} ${getThemeColor('text.primary', false)} border-orange-500 ${colors.effects.glow.subtle.light}`
        : isDark
          ? `${getThemeColor('background.secondary', true)} ${getThemeColor('text.primary', true)} border-orange-400/70 ${colors.effects.glow.subtle.dark}`
          : `${getThemeColor('background.overlay', false)} ${getThemeColor('text.primary', false)} border-orange-500/70 ${colors.effects.glow.subtle.light}`
      : isScrolled
        ? isDark
          ? `${getThemeColor('text.secondary', true)} ${colors.hover.text.primary.dark} ${colors.hover.background.dark} ${getThemeColor('border.primary', true)} ${colors.hover.border.subtle.dark}`
          : `${getThemeColor('text.primary', false)} ${colors.hover.text.primary.light} ${colors.hover.background.light} ${getThemeColor('border.secondary', false)} ${colors.hover.border.subtle.light}`
        : isDark
          ? `${getThemeColor('text.secondary', true)} ${colors.hover.text.primary.dark} ${getThemeColor('background.secondary', true)} ${colors.border.subtle.dark} ${colors.hover.border.subtle.dark}`
          : `${getThemeColor('text.secondary', false)} ${colors.hover.text.primary.light} ${getThemeColor('background.overlay', false)} ${colors.border.subtle.light} ${colors.hover.border.subtle.light}`
      }`,
    dropdown: `absolute top-full right-0 mt-1 backdrop-blur-xl border rounded-lg shadow-xl py-1 z-50 ${isScrolled
      ? isDark
        ? `bg-gray-900/95 backdrop-blur-xl ${getThemeColor('border.primary', true)}`
        : `bg-white/95 backdrop-blur-xl ${getThemeColor('border.primary', false)}`
      : isDark
        ? `bg-gray-900/90 backdrop-blur-xl ${colors.border.subtle.dark}`
        : `bg-white/90 backdrop-blur-xl ${colors.border.subtle.light}`
      }`,
    option: (isSelected: boolean) => `w-full flex items-center gap-3 px-3 py-3 text-sm transition-all duration-150 ${isSelected
      ? isDark
        ? `bg-orange-500/20 text-orange-400 border-l-2 border-orange-400`
        : `bg-orange-500/10 text-orange-600 border-l-2 border-orange-500`
      : isDark
        ? `${getThemeColor('text.secondary', true)} ${colors.hover.background.dark} ${colors.hover.text.primary.dark}`
        : `${getThemeColor('text.primary', false)} ${colors.hover.background.light} ${colors.hover.text.primary.light}`
      }`
  });

  // Helper function to get language display code
  const getLanguageDisplayCode = (lang: string) => lang === 'si' ? 'SI' : lang === 'ta' ? 'TA' : 'EN';

  // Handle tab change with animation
  const handleMobileTabChange = (newTab: string) => {
    if (newTab === activeMobileTab) return;
    
    setIsTabTransitioning(true);
    setTimeout(() => {
      setActiveMobileTab(newTab);
      setTimeout(() => {
        setIsTabTransitioning(false);
      }, 50);
    }, 150);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full max-w-full transition-all duration-300 ${isScrolled
      ? isDark
        ? `bg-gray-900/85 backdrop-blur-xl border-b ${colors.border.subtle.dark} shadow-lg`
        : `bg-white/85 backdrop-blur-xl border-b ${colors.border.subtle.light} shadow-lg`
      : isDark
        ? `${colors.background.gradient.dark} backdrop-blur-sm`
        : `${colors.background.gradient.light} backdrop-blur-sm`
      }`}>

      {/* Sri Lankan Government Header Bar */}
      <div className={`w-full h-1 ${isDark
        ? 'bg-gradient-to-r from-orange-600 via-green-600 to-orange-600'
        : 'bg-gradient-to-r from-orange-500 via-green-500 to-orange-500'
        }`} />

      <div className="w-full max-w-full px-4 sm:px-6 lg:px-8 py-3 relative z-10">
        <div className="h-20 flex justify-center">
          {/* Government Navigation Bar */}
          <div className={`navigation-container flex items-center justify-between h-full w-full max-w-7xl transition-all duration-200`}>
            {/* Left Section - Logo */}
            <div className="flex items-center h-full">
              <Link
                to="/"
                className="flex items-center h-full py-2 px-1 transition-all duration-300 group"
                aria-label="National Youth Services Council - Home"
              >
                <div className="flex flex-col justify-center">
                  <div className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold transition-colors duration-300 ${isScrolled
                    ? isDark
                      ? getThemeColor('text.primary', true)
                      : getThemeColor('text.primary', false)
                    : isDark
                      ? getThemeColor('text.primary', true)
                      : getThemeColor('text.primary', false)
                    }`}>
                    NYSC
                  </div>
                  <div className={`text-xs sm:text-sm md:text-sm lg:text-sm font-medium transition-colors duration-300 ${isScrolled
                    ? isDark
                      ? getThemeColor('text.secondary', true)
                      : getThemeColor('text.secondary', false)
                    : isDark
                      ? getThemeColor('text.secondary', true)
                      : getThemeColor('text.muted', false)
                    }`}>
                    National Youth Services Council
                  </div>
                </div>
              </Link>
            </div>

            {/* Center Section - Government Navigation */}
            <div className="hidden xl:flex items-center flex-1 justify-center px-4">

              {/* Navigation Container */}
              <nav className={`flex items-center gap-1 border-l border-r ${isDark
                ? colors.border.subtle.dark
                : colors.border.subtle.light
                } px-2 max-w-fit`} role="navigation" aria-label="Main navigation">
                {Object.entries(getDropdownItems()).map(([item, subitems]) => (
                  <div
                    key={item}
                    className="relative"
                    onMouseEnter={() => handleDropdownEnter(item)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <Link
                      to={getMainSectionRoute(item)}
                      className={`flex items-center justify-center gap-1.5 px-3 py-2.5 text-sm font-semibold transition-all duration-300 border-b-2 whitespace-nowrap ${activeDropdown === item
                        ? isScrolled
                          ? isDark
                            ? `${getThemeColor('background.secondary', true)} ${getThemeColor('text.primary', true)} border-orange-500 ${colors.effects.glow.subtle.dark}`
                            : `${getThemeColor('background.tertiary', false)} ${getThemeColor('text.primary', false)} border-orange-500 ${colors.effects.glow.subtle.light}`
                          : isDark
                            ? `${getThemeColor('background.secondary', true)} ${getThemeColor('text.primary', true)} border-orange-400/70 ${colors.effects.glow.subtle.dark}`
                            : `${getThemeColor('background.overlay', false)} ${getThemeColor('text.primary', false)} border-orange-500/70 ${colors.effects.glow.subtle.light}`
                        : isScrolled
                          ? isDark
                            ? `${getThemeColor('text.secondary', true)} ${colors.hover.text.primary.dark} border-transparent ${colors.hover.border.subtle.dark}`
                            : `${getThemeColor('text.primary', false)} ${colors.hover.text.primary.light} border-transparent ${colors.hover.border.subtle.light}`
                          : isDark
                            ? `${getThemeColor('text.secondary', true)} ${colors.hover.text.primary.dark} border-transparent ${colors.hover.border.subtle.dark}`
                            : `${getThemeColor('text.secondary', false)} ${colors.hover.text.primary.light} border-transparent ${colors.hover.border.subtle.light}`
                        }`}
                      aria-expanded={activeDropdown === item}
                      aria-haspopup="true"
                      aria-label={`${item} menu`}
                    >
                      <span className="transition-all duration-300 whitespace-nowrap">{item}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-all duration-300 flex-shrink-0 ${activeDropdown === item ? 'rotate-180' : ''
                        } ${isScrolled
                          ? isDark
                            ? getThemeColor('text.secondary', true)
                            : getThemeColor('text.primary', false)
                          : isDark
                            ? getThemeColor('text.secondary', true)
                            : getThemeColor('text.secondary', false)
                        }`} />
                    </Link>

                    {/* dropdwon menu  */}
                    {activeDropdown === item && (
                      <div
                        className={`absolute top-full left-0 mt-2 w-72 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-transparent ${isScrolled
                          ? isDark
                            ? `bg-gray-900/90 backdrop-blur-xl ${getThemeColor('border.primary', true)}`
                            : `bg-white/90 backdrop-blur-xl ${getThemeColor('border.primary', false)}`
                          : isDark
                            ? `bg-gray-900/85 backdrop-blur-xl ${colors.border.subtle.dark}`
                            : `bg-white/85 backdrop-blur-xl ${colors.border.subtle.light}`
                          } border rounded-lg shadow-xl py-2 z-50 transition-all duration-200`}
                        data-dropdown={item}
                        onMouseEnter={() => handleDropdownContentEnter(item)}
                        onMouseLeave={handleDropdownLeave}
                        role="menu"
                        aria-label={`${item} submenu`}
                      >
                        <div className="px-1 py-1">
                          <div className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border-b ${isDark ? `text-orange-400 ${colors.border.subtle.dark}` : `text-orange-600 ${getThemeColor('border.primary', false)}`
                            }`}>
                            {item}
                          </div>
                          {subitems.map((subitem) => {
                            const IconComponent = subitem.icon;
                            return (
                              <Link
                                key={subitem.label}
                                to={subitem.route || '#'}
                                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-150 ${isDark
                                  ? `${getThemeColor('text.secondary', true)} ${colors.hover.background.dark} ${colors.hover.text.primary.dark}`
                                  : `${getThemeColor('text.primary', false)} ${colors.hover.background.light} ${colors.hover.text.primary.light}`
                                  } hover:border-l-4 hover:border-orange-500 hover:pl-3`}
                                role="menuitem"
                                tabIndex={activeDropdown === item ? 0 : -1}
                                onClick={() => setActiveDropdown(null)}
                              >
                                <IconComponent className={`w-4 h-4 flex-shrink-0 transition-colors duration-200 ${isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
                                  }`} />
                                <span className="flex-1">{subitem.label}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            {/* Right Section - Utilities */}
            <div className="flex items-center space-x-3 flex-shrink-0">

              {/* Mobile Language Dropdown */}
              <div className="xl:hidden relative"
                onMouseEnter={() => handleDropdownEnter('mobileLanguage')}
                onMouseLeave={handleDropdownLeave}>
                <button
                  className={getLanguageButtonStyles(activeDropdown === 'mobileLanguage').button}
                  aria-label="Select language"
                >
                  <Globe className={`w-4 h-4 ${isScrolled
                    ? isDark
                      ? getThemeColor('text.secondary', true)
                      : getThemeColor('text.primary', false)
                    : isDark
                      ? getThemeColor('text.secondary', true)
                      : getThemeColor('text.secondary', false)
                    }`} />
                  <span className="text-xs font-bold">
                    {getLanguageDisplayCode(currentLanguage)}
                  </span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === 'mobileLanguage' ? 'rotate-180' : ''
                    } ${isScrolled
                      ? isDark
                        ? getThemeColor('text.secondary', true)
                        : getThemeColor('text.primary', false)
                      : isDark
                        ? getThemeColor('text.secondary', true)
                        : getThemeColor('text.secondary', false)
                    }`} />
                </button>

                {activeDropdown === 'mobileLanguage' && (
                  <div className={`w-40 ${getLanguageButtonStyles(false).dropdown}`}
                    onMouseEnter={() => handleDropdownContentEnter('mobileLanguage')}
                    onMouseLeave={handleDropdownLeave}>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as 'si' | 'ta' | 'en');
                          setActiveDropdown(null);
                        }}
                        className={getLanguageButtonStyles(false).option(currentLanguage === lang.code)}
                      >
                        <span className={`text-xs font-bold px-1.5 py-0.5 ${isDark
                            ? getThemeColor('background.secondary', false)
                            : getThemeColor('background.secondary', true)
                          } ${isDark
                            ? getThemeColor('text.inverse', true)
                            : getThemeColor('text.inverse', false)
                          } rounded`}>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search */}
              <div className="relative flex items-center">
                {isSearchOpen ? (
                  <div className={`relative flex items-center px-3 py-2 rounded-md border transition-all duration-200 ${isSearchFocused
                    ? isDark
                      ? `${getThemeColor('background.secondary', true)} border-orange-400 ring-1 ring-orange-400/50`
                      : `${getThemeColor('background.secondary', false)} border-orange-500 ring-1 ring-orange-500/50`
                    : isDark
                      ? `${getThemeColor('background.secondary', true)} ${getThemeColor('border.primary', true)}`
                      : `${getThemeColor('background.secondary', false)} ${getThemeColor('border.secondary', false)}`
                    }`}>
                    <Search className={`absolute left-3 w-4 h-4 pointer-events-none ${isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
                      }`} />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder={t('header:searchPlaceholder')}
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      onKeyDown={handleSearchSubmit}
                      onFocus={handleSearchFocus}
                      onBlur={handleSearchBlur}
                      className={`w-40 sm:w-48 lg:w-56 bg-transparent border-0 focus:outline-none text-sm pl-6 pr-8 ${isDark
                        ? `${getThemeColor('text.primary', true)} placeholder-slate-400`
                        : `${getThemeColor('text.primary', false)} placeholder-slate-500`
                        }`}
                      aria-label="Search"
                      autoFocus
                    />
                    {searchValue && (
                      <button
                        onClick={handleSearchClear}
                        className={`absolute right-2 p-0.5 rounded transition-colors ${isDark ? `${getThemeColor('text.muted', true)} ${colors.hover.text.primary.dark}` : `${getThemeColor('text.muted', false)} ${colors.hover.text.primary.light}`
                          }`}
                        aria-label="Clear search"
                      >
                        <XCircle className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => setIsSearchOpen(true)}
                      className={getButtonBaseStyle()}
                      aria-label="Open search"
                    >
                      <Search className="w-4 h-4" />
                    </button>

                    {/* Desktop Language Dropdown */}
                    <div className="hidden xl:block relative ml-2"
                      onMouseEnter={() => handleDropdownEnter('desktopLanguage')}
                      onMouseLeave={handleDropdownLeave}>
                      <button
                        className={getLanguageButtonStyles(activeDropdown === 'desktopLanguage').button}
                        aria-label="Select language"
                      >
                        <Globe className={`w-4 h-4 ${isScrolled
                          ? isDark
                            ? getThemeColor('text.secondary', true)
                            : getThemeColor('text.primary', false)
                          : isDark
                            ? getThemeColor('text.secondary', true)
                            : getThemeColor('text.secondary', false)
                          }`} />
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-orange-500 text-white">
                          {getLanguageDisplayCode(currentLanguage)}
                        </span>
                        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === 'desktopLanguage' ? 'rotate-180' : ''
                          } ${isScrolled
                            ? isDark
                              ? getThemeColor('text.secondary', true)
                              : getThemeColor('text.primary', false)
                            : isDark
                              ? getThemeColor('text.secondary', true)
                              : getThemeColor('text.secondary', false)
                          }`} />
                      </button>

                      {/* destop mode language dropdwon menu */}
                      {activeDropdown === 'desktopLanguage' && (
                        <div className={`w-48 ${getLanguageButtonStyles(false).dropdown}`}
                          onMouseEnter={() => handleDropdownContentEnter('desktopLanguage')}
                          onMouseLeave={handleDropdownLeave}>
                          {languages.map((lang) => (
                            <button
                              key={lang.code}
                              onClick={() => {
                                setLanguage(lang.code as 'si' | 'ta' | 'en');
                                setActiveDropdown(null);
                              }}
                              className={getLanguageButtonStyles(false).option(currentLanguage === lang.code)}
                            >
                              <span className={`text-xs font-bold px-1.5 py-0.5 ${isDark
                                  ? getThemeColor('background.secondary', false)
                                  : getThemeColor('background.secondary', true)
                                } ${isDark
                                  ? getThemeColor('text.inverse', true)
                                  : getThemeColor('text.inverse', false)
                                } rounded`
                              }>{lang.flag} </span>
                              <div className="flex flex-col items-start">
                                <span className="font-medium">{lang.label}</span>
                                <span className={`text-xs ${currentLanguage === lang.code
                                  ? isDark ? colors.brand.secondary.text : colors.brand.secondary.text
                                  : isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
                                  }`}>
                                  {lang.native}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`${getButtonBaseStyle()} ml-2`}
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
              >
                <div className="transition-all duration-300">
                  {isDark ?
                    <Sun className="w-4 h-4" /> :
                    <Moon className="w-4 h-4" />
                  }
                </div>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`xl:hidden ml-2 relative ${isMobileMenuOpen
                  ? `min-w-[40px] min-h-[40px] p-2 rounded-md border transition-all duration-300 bg-orange-500 text-white border-orange-500 ${colors.effects.glow.brand}`
                  : getButtonBaseStyle()
                  }`}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
              >
                <div className="relative w-5 h-5 flex items-center justify-center">
                  <span className={`absolute h-0.5 w-5 bg-current transform transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45' : '-translate-y-1.5'
                    }`} />
                  <span className={`absolute h-0.5 w-5 bg-current transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                    }`} />
                  <span className={`absolute h-0.5 w-5 bg-current transform transition-all duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45' : 'translate-y-1.5'
                    }`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Integrated Below Navigation Bar */}
        <div className={`xl:hidden absolute top-full left-0 right-0 z-40 shadow-2xl transition-all duration-300 ease-out ${
          isMobileMenuOpen 
            ? 'translate-y-0 opacity-100 visible' 
            : '-translate-y-4 opacity-0 invisible pointer-events-none'
          } ${isDark
            ? `bg-gray-900/90 backdrop-blur-xl border-t ${colors.border.subtle.dark}`
            : `bg-white/90 backdrop-blur-xl border-t ${colors.border.subtle.light}`
            }`}>

            {/* Content Container */}
            <div className="relative z-10 max-h-[calc(100vh-120px)] overflow-y-auto">

              {/* Tab Selector - Responsive: Grid (Mobile) + Scroll (Tablet) */}
              <div className={`px-2 sm:px-3 py-2 sm:py-3 border-b ${isDark ? colors.border.subtle.dark : colors.border.subtle.light
                } backdrop-blur-xl ${isDark
                  ? `bg-gray-800/40`
                  : `bg-gray-100/40`
                }`}>

                {/* Mobile Grid View (< sm breakpoint) */}
                <div className="sm:hidden grid grid-cols-2 gap-2">
                  {Object.keys(getDropdownItems()).map((tab) => {
                    const isActive = activeMobileTab === tab;

                    return (
                      <button
                        key={tab}
                        onClick={() => handleMobileTabChange(tab)}
                        className={`group relative flex items-center justify-center px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${isActive
                          ? isDark
                            ? `${colors.brand.gradient.primary} ${getThemeColor('text.inverse', false)} ${colors.effects.glow.brand} scale-105`
                            : `${colors.brand.gradient.primary} ${getThemeColor('text.inverse', false)} ${colors.effects.glow.brand} scale-105`
                          : isDark
                            ? `${getThemeColor('text.secondary', true)} ${colors.hover.text.primary.dark} ${getThemeColor('background.secondary', true)} ${colors.hover.background.dark} border ${colors.border.subtle.dark}`
                            : `${getThemeColor('text.secondary', false)} ${colors.hover.text.primary.light} ${getThemeColor('background.overlay', false)} ${colors.hover.background.light} border ${colors.border.subtle.light}`
                          } ${isActive ? `ring-2 ${colors.focus.ring.brand} ring-offset-1 ring-offset-transparent` : ''}`}
                      >
                        <span className="text-center leading-tight">{tab}</span>
                        {isActive && (
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent animate-pulse rounded-full" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Tablet Scroll View (>= sm breakpoint) */}
                <div className="hidden sm:block overflow-x-auto scrollbar-hide">
                  <div className="flex gap-1 min-w-max pb-1">
                    {Object.keys(getDropdownItems()).map((tab) => {
                      const items = getDropdownItems()[tab];
                      const TabIcon = items[0]?.icon || Users;
                      const isActive = activeMobileTab === tab;

                      return (
                        <button
                          key={tab}
                          onClick={() => handleMobileTabChange(tab)}
                          className={`group relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-300 flex-shrink-0 ${isActive
                            ? isDark
                              ? `${colors.brand.gradient.primary} ${getThemeColor('text.inverse', false)} ${colors.effects.glow.subtle.dark}`
                              : `${colors.brand.gradient.primary} ${getThemeColor('text.inverse', false)} ${colors.effects.glow.subtle.light}`
                            : isDark
                              ? `${getThemeColor('text.secondary', true)} ${colors.hover.text.primary.dark} ${getThemeColor('background.secondary', true)} ${colors.hover.background.dark} border ${colors.border.subtle.dark}`
                              : `${getThemeColor('text.secondary', false)} ${colors.hover.text.primary.light} ${getThemeColor('background.overlay', false)} ${colors.hover.background.light} border ${colors.border.subtle.light}`
                            } ${isActive ? `ring-1 ${colors.focus.ring.brand}` : ''}`}
                        >
                          <TabIcon className={`w-3 h-3 transition-all duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'
                            }`} />
                          <span className="text-xs truncate">{tab}</span>
                          {isActive && (
                            <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent animate-pulse" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {/* Scroll Indicator for Tablet */}
                  <div className="flex justify-center mt-1">
                    <div className={`h-0.5 w-8 rounded-full ${isDark ? colors.border.subtle.dark : colors.border.subtle.light
                      }`} />
                  </div>
                </div>
              </div>

              {/* Tab Content */}
              <div className="px-4 py-4">
                <div className={`space-y-2 transition-all duration-300 ${
                  isTabTransitioning 
                    ? 'opacity-0 transform scale-95' 
                    : 'opacity-100 transform scale-100'
                }`}>
                  {/* Main Button - represents the active tab */}
                  {activeMobileTab && (() => {
                    const items = getDropdownItems()[activeMobileTab];
                    const MainIcon = items?.[0]?.icon || Users;
                    return (
                      <div
                        className="animate-in slide-in-from-right-5 fade-in duration-300"
                        style={{ animationDelay: '0ms' }}
                      >
                        <Link
                          to={getMainSectionRoute(activeMobileTab)}
                          className={`group relative flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 backdrop-blur-lg ${
                            isDark
                              ? `${colors.background.gradient.brand.dark} ${getThemeColor('text.primary', true)} border ${colors.border.brand.subtle.dark} hover:${colors.background.gradient.brand.dark} hover:scale-[1.02] ${colors.effects.glow.brand}`
                              : `${colors.background.gradient.brand.light} ${getThemeColor('text.primary', false)} border ${colors.border.brand.subtle.light} hover:${colors.background.gradient.brand.light} hover:scale-[1.02] ${colors.effects.glow.brand}`
                          } hover:translate-x-1 hover:shadow-xl overflow-hidden`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {/* Animated Background Gradient */}
                          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                            isDark 
                              ? colors.background.gradient.brand.dark 
                              : colors.background.gradient.brand.light
                          }`} />
                          
                          <div className={`relative z-10 p-2 rounded-lg ${
                            isDark
                              ? `bg-orange-500/30 text-orange-300 ${colors.effects.glow.subtle.dark} ${colors.effects.glow.brand}`
                              : `bg-orange-500/20 text-orange-600 ${colors.effects.glow.subtle.light} ${colors.effects.glow.brand}`
                          } group-hover:scale-110 transition-transform duration-300`}>
                            <MainIcon className="w-4 h-4" />
                          </div>
                          
                          <span className={`relative z-10 flex-1 font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {activeMobileTab}
                            <span className={`block text-xs font-normal mt-0.5 ${
                              isDark ? 'text-orange-300/70' : 'text-orange-600/70'
                            }`}>
                              Main Section
                            </span>
                          </span>
                          
                          <ChevronDown className={`relative z-10 w-3 h-3 -rotate-90 transition-all duration-300 ${
                            isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
                          } group-hover:translate-x-1`} />
                        </Link>
                      </div>
                    );
                  })()}

                  {/* Sub-items with left padding */}
                  {getDropdownItems()[activeMobileTab]?.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <div
                        key={item.label}
                        className="animate-in slide-in-from-right-5 fade-in duration-300 pl-4"
                        style={{ animationDelay: `${(index + 1) * 50}ms` }}
                      >
                        <Link
                          to={item.route || '#'}
                          className={`group relative flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 backdrop-blur-lg ${
                            isDark
                              ? `${getThemeColor('background.secondary', true)} ${getThemeColor('text.secondary', true)} ${colors.hover.background.dark} ${colors.hover.text.primary.dark} border ${colors.border.subtle.dark} ${colors.hover.border.subtle.dark}`
                              : `${getThemeColor('background.overlay', false)} ${getThemeColor('text.primary', false)} ${colors.hover.background.light} ${colors.hover.text.primary.light} border ${colors.border.subtle.light} ${colors.hover.border.subtle.light}`
                          } hover:translate-x-1 hover:shadow-xl overflow-hidden`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {/* Animated Background Gradient */}
                          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isDark
                            ? colors.background.gradient.brand.dark
                            : colors.background.gradient.brand.light
                            }`} />

                          <div className={`relative z-10 p-2 rounded-lg ${
                            isDark
                              ? `${getThemeColor('background.secondary', true)} ${getThemeColor('text.secondary', true)}`
                              : `${getThemeColor('background.tertiary', false)} ${getThemeColor('text.secondary', false)}`
                          } group-hover:scale-110 transition-transform duration-300`}>
                            <IconComponent className="w-3.5 h-3.5" />
                          </div>

                          <span className={`relative z-10 flex-1 font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {item.label}
                          </span>

                          <ChevronDown className={`relative z-10 w-3 h-3 -rotate-90 transition-all duration-300 ${isDark ? getThemeColor('text.muted', true) : getThemeColor('text.muted', false)
                            } group-hover:translate-x-1`} />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Controls */}
              <div className={`px-4 py-3 border-t backdrop-blur-xl ${isDark
                ? `${colors.border.subtle.dark} bg-gray-800/30`
                : `${colors.border.subtle.light} bg-gray-100/30`
                }`}>

                {/* Controls Row */}
                <div className="flex items-center justify-between gap-3">

                  {/* Theme Toggle */}
                  <button
                    onClick={toggleTheme}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200 ${isDark
                      ? `${getThemeColor('text.secondary', true)} ${colors.hover.background.dark} ${colors.hover.text.primary.dark} ${getThemeColor('border.primary', true)}`
                      : `${getThemeColor('text.primary', false)} ${colors.hover.background.light} ${colors.hover.text.primary.light} ${getThemeColor('border.secondary', false)}`
                      }`}
                    aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
                  >
                    <div className="transition-transform duration-300 hover:rotate-180">
                      {isDark ?
                        <Sun className="w-4 h-4" /> :
                        <Moon className="w-4 h-4" />
                      }
                    </div>
                    <span className="text-xs font-medium">Theme</span>
                  </button>

                  {/* Language Selection */}
                  <div className="flex items-center gap-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as 'si' | 'ta' | 'en');
                        }}
                        className={`relative px-2.5 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${currentLanguage === lang.code
                          ? `bg-orange-500 text-white ${colors.effects.glow.brand} scale-105`
                          : isDark
                            ? `${getThemeColor('text.muted', true)} ${colors.hover.text.primary.dark} ${colors.hover.background.dark} border ${getThemeColor('border.primary', true)}`
                            : `${getThemeColor('text.secondary', false)} ${colors.hover.text.primary.light} ${colors.hover.background.light} border ${getThemeColor('border.primary', false)}`
                          } hover:scale-105`}
                        aria-label={`Switch to ${lang.label}`}
                      >
                        {lang.flag}
                        {currentLanguage === lang.code && (
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        )}
                      </button>
                    ))}
                  </div>

                </div>
              </div>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;