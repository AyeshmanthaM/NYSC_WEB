import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, ChevronDown, Menu, X, Moon, Sun, XCircle,
  Users, Target, Award, FileText, Download, Crown, UserCheck, UserCog, MapPin,
  Trophy, Music, GraduationCap, Calendar, Newspaper, Building, Building2,
  UserPlus, Lightbulb, Heart, Mail, Shield, DollarSign, Scale, FolderOpen,
  Briefcase, Globe
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentLanguage, setLanguage, t } = useLanguage();
  const [searchValue, setSearchValue] = useState('');
  const [dropdownTimeout, setDropdownTimeout] = useState<number | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { isDark, toggleTheme } = useTheme();

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
    
    const handleKeyDown = (event: KeyboardEvent) => {
      // Handle dropdown navigation with arrow keys
      if (activeDropdown && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
        event.preventDefault();
        // Focus management for dropdown items
        const dropdownElement = document.querySelector(`[data-dropdown="${activeDropdown}"]`);
        if (dropdownElement) {
          const links = dropdownElement.querySelectorAll('a');
          const currentIndex = Array.from(links).findIndex(link => link === document.activeElement);
          const nextIndex = event.key === 'ArrowDown' 
            ? (currentIndex + 1) % links.length 
            : currentIndex <= 0 ? links.length - 1 : currentIndex - 1;
          (links[nextIndex] as HTMLElement)?.focus();
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleKeyDown);
      if (dropdownTimeout) {
        clearTimeout(dropdownTimeout);
      }
    };
  }, [activeDropdown, dropdownTimeout]);

  // Initialize mobile tab when language changes
  useEffect(() => {
    const dropdownKeys = Object.keys(getDropdownItems());
    if (dropdownKeys.length > 0 && !activeMobileTab) {
      setActiveMobileTab(dropdownKeys[0]);
    }
  }, [currentLanguage, activeMobileTab]);

  const getDropdownItems = () => ({
    // Official NYSC navigation structure with translations
    [t('header.directors')]: [
      { label: t('dropdown.boardOfMembers'), icon: Crown, route: '/directors/board-of-members' },
      { label: t('dropdown.directors'), icon: Users, route: '/directors/directors' },
      { label: t('dropdown.deputyDirectors'), icon: UserCheck, route: '/directors/deputy-directors' },
      { label: t('dropdown.assistantDirectors'), icon: UserCog, route: '/directors/assistant-directors' },
      { label: t('dropdown.provincialDirectors'), icon: MapPin, route: '/directors/provincial-directors' },
      { label: t('dropdown.provincialAssistantDirectors'), icon: MapPin, route: '/directors/provincial-assistant-directors' }
    ],
    [t('header.divisions')]: [
      { label: t('dropdown.financeDivision'), icon: DollarSign, route: '/divisions/finance' },
      { label: t('dropdown.legalInvestigationDivision'), icon: Scale, route: '/divisions/legal-investigation' },
      { label: t('dropdown.youthAwards'), icon: Award, route: '/divisions/youth-awards' },
      { label: t('dropdown.internalAuditDivision'), icon: Shield, route: '/divisions/internal-audit' },
      { label: t('dropdown.examinationAssessmentDivision'), icon: FolderOpen, route: '/divisions/examination-assessment' },
      { label: t('dropdown.specialProjectDivision'), icon: Building2, route: '/divisions/special-projects' }
    ],
    [t('header.services')]: [
      { label: t('dropdown.youthServicesLimited'), icon: Briefcase, route: '/services/youth-services-limited' },
      { label: t('dropdown.youthParliament'), icon: Users, route: '/services/youth-parliament' },
      { label: t('dropdown.youthDancingTeam'), icon: Heart, route: '/services/youth-dancing-team' },
      { label: t('dropdown.youthMusicBand'), icon: Music, route: '/services/youth-music-band' },
      { label: t('dropdown.youthDramaTeam'), icon: Globe, route: '/services/youth-drama-team' }
    ],
    [t('header.student')]: [
      { label: t('dropdown.findCourses'), icon: GraduationCap, route: '/student/find-courses' },
      { label: t('dropdown.studentPortal'), icon: UserPlus, route: '/student/students-portal' }
    ],
    [t('header.ourCenters')]: [
      { label: t('dropdown.trainingCenters'), icon: Building, route: '/our-centers/training-centers' },
      { label: t('dropdown.youthCenters'), icon: Users, route: '/our-centers/youth-centers' },
      { label: t('dropdown.districtOffices'), icon: MapPin, route: '/our-centers/district-offices' },
      { label: t('dropdown.centerLocator'), icon: MapPin, route: '/our-centers/center-locator' }
    ],
    [t('header.downloads')]: [
      { label: t('dropdown.annualReports'), icon: FileText, route: '/downloads/annual-reports' },
      { label: t('dropdown.applicationForms'), icon: FileText, route: '/downloads/application-forms' },
      { label: t('dropdown.policyDocuments'), icon: Shield, route: '/downloads/policy-documents' },
      { label: t('dropdown.mediaResources'), icon: Download, route: '/downloads/media-resources' }
    ]
  });

  // Navigation helper - works with translated section names
  const getMainSectionRoute = (section: string) => {
    // Map translated section names to routes
    const routeMap: { [key: string]: string } = {
      [t('header.directors')]: '/directors',
      [t('header.divisions')]: '/divisions',
      [t('header.services')]: '/services',
      [t('header.student')]: '/student',
      [t('header.ourCenters')]: '/our-centers',
      [t('header.downloads')]: '/downloads'
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
    }, 100); // Reduced delay for better UX
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
      // TODO: Implement search functionality
      // Add your search logic here
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

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full max-w-full transition-all duration-300 ${
      isScrolled 
        ? isDark 
          ? 'bg-slate-900/98 backdrop-blur-lg border-b border-slate-700/50 shadow-lg'
          : 'bg-white/98 backdrop-blur-lg border-b border-slate-200/50 shadow-lg'
        : isDark
          ? 'bg-gradient-to-b from-slate-900/90 to-slate-900/60 backdrop-blur-sm'
          : 'bg-gradient-to-b from-white/90 to-white/60 backdrop-blur-sm'
    }`}>
      
      {/* Sri Lankan Government Header Bar */}
      <div className={`w-full h-1 ${
        isDark 
          ? 'bg-gradient-to-r from-orange-600 via-green-600 to-orange-600'
          : 'bg-gradient-to-r from-orange-500 via-green-500 to-orange-500'
      }`} />
      
      <div className="w-full max-w-full px-4 sm:px-6 lg:px-8 py-3 relative z-10">
        <div className="h-20 flex justify-center">
          {/* Official Government Navigation Bar */}
          <div className={`navigation-container flex items-center justify-between h-full w-full max-w-7xl transition-all duration-200`}>
            {/* Left Section - Official Logo */}
            <div className="flex items-center h-full">
              <Link 
                to="/" 
                className="flex items-center h-full py-2 px-1 transition-all duration-300 group"
                aria-label="National Youth Services Council - Home"
              >
                <div className="flex flex-col justify-center">
                  <div className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold transition-colors duration-300 ${
                    isScrolled
                      ? isDark 
                        ? 'text-white' 
                        : 'text-slate-900'
                      : isDark 
                        ? 'text-white/95' 
                        : 'text-slate-800'
                  }`}>
                    NYSC
                  </div>
                  <div className={`text-xs sm:text-sm md:text-sm lg:text-sm font-medium transition-colors duration-300 ${
                    isScrolled
                      ? isDark 
                        ? 'text-slate-300' 
                        : 'text-slate-700'
                      : isDark 
                        ? 'text-slate-300/90' 
                        : 'text-slate-600'
                  }`}>
                    National Youth Services Council
                  </div>
                </div>
              </Link>
            </div>

            {/* Center Section - Official Government Navigation */}
            <div className="hidden lg:flex items-center absolute left-1/2 transform -translate-x-1/2 max-w-fit">
              
              {/* Official Navigation Container */}
              <nav className={`flex items-center border-l border-r ${
                isDark 
                  ? 'border-slate-600/30' 
                  : 'border-slate-300/30'
              } px-2`} role="navigation" aria-label="Main navigation">
                {Object.entries(getDropdownItems()).map(([item, subitems]) => (
                  <div
                    key={item}
                    className="relative"
                    onMouseEnter={() => handleDropdownEnter(item)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <Link
                      to={getMainSectionRoute(item)}
                      className={`flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold transition-all duration-300 border-b-2 ${
                        activeDropdown === item
                          ? isScrolled
                            ? isDark
                              ? 'bg-slate-700/70 text-white border-orange-400 shadow-sm'
                              : 'bg-slate-50 text-slate-900 border-orange-500 shadow-sm'
                            : isDark
                              ? 'bg-slate-700/40 text-white border-orange-400/70 shadow-sm'
                              : 'bg-white/40 text-slate-800 border-orange-500/70 shadow-sm'
                          : isScrolled
                            ? isDark
                              ? 'text-slate-100 hover:text-white hover:bg-slate-700/50 border-transparent hover:border-slate-500'
                              : 'text-slate-800 hover:text-slate-900 hover:bg-slate-100 border-transparent hover:border-slate-400'
                            : isDark
                              ? 'text-slate-200/90 hover:text-white hover:bg-slate-700/30 border-transparent hover:border-slate-500/50'
                              : 'text-slate-700/90 hover:text-slate-900 hover:bg-white/50 border-transparent hover:border-slate-300/50'
                      }`}
                      aria-expanded={activeDropdown === item}
                      aria-haspopup="true"
                      aria-label={`${item} menu`}
                    >
                      <span className="transition-all duration-300 whitespace-nowrap">{item}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-all duration-300 flex-shrink-0 ${
                        activeDropdown === item ? 'rotate-180' : ''
                      } ${
                        isScrolled
                          ? isDark
                            ? 'text-slate-100'
                            : 'text-slate-800'
                          : isDark
                            ? 'text-slate-200/90'
                            : 'text-slate-700/90'
                      }`} />
                    </Link>
                  
                  {activeDropdown === item && (
                    <div 
                      className={`absolute top-full left-0 mt-1 w-64 ${
                        isScrolled
                          ? isDark 
                            ? 'bg-slate-800 border-slate-600' 
                            : 'bg-white border-slate-200'
                          : isDark 
                            ? 'bg-slate-800/95 border-slate-600/70' 
                            : 'bg-white/95 border-slate-200/70'
                      } backdrop-blur-xl border rounded-lg shadow-xl py-2 z-50 transition-all duration-200`}
                      data-dropdown={item}
                      onMouseEnter={() => handleDropdownContentEnter(item)}
                      onMouseLeave={handleDropdownLeave}
                      role="menu"
                      aria-label={`${item} submenu`}
                    >
                      <div className="px-1 py-1">
                        <div className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border-b ${
                          isDark ? 'text-orange-400 border-slate-600/50' : 'text-orange-600 border-slate-200'
                        }`}>
                          {item}
                        </div>
                        {subitems.map((subitem) => {
                          const IconComponent = subitem.icon;
                          return (
                            <Link
                              key={subitem.label}
                              to={subitem.route || '#'}
                              className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-150 ${
                                isDark 
                                  ? 'text-slate-200 hover:bg-slate-700/80 hover:text-white' 
                                  : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                              } hover:border-l-4 hover:border-orange-500 hover:pl-3`}
                              role="menuitem"
                              tabIndex={activeDropdown === item ? 0 : -1}
                              onClick={() => setActiveDropdown(null)}
                            >
                              <IconComponent className={`w-4 h-4 flex-shrink-0 transition-colors duration-200 ${
                                isDark ? 'text-slate-400' : 'text-slate-500'
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

            {/* Right Section - Official Utilities */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              {/* Mobile Language Toggle - Official Style */}
              <div className="lg:hidden flex items-center bg-slate-100 dark:bg-slate-700 rounded-md p-1">
                {[{code: 'si', label: 'SI'}, {code: 'ta', label: 'TA'}, {code: 'en', label: 'EN'}].map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as 'si' | 'ta' | 'en')}
                    className={`min-w-[40px] min-h-[32px] px-2 py-1 text-xs font-bold rounded transition-all duration-200 ${
                      currentLanguage === lang.code
                        ? 'bg-orange-500 text-white shadow-sm'
                        : isDark
                          ? 'text-slate-300 hover:text-white hover:bg-slate-600'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                    }`}
                    aria-label={`Switch to ${lang.code === 'en' ? 'English' : lang.code === 'si' ? 'Sinhala' : 'Tamil'}`}
                    aria-pressed={currentLanguage === lang.code}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>

              {/* Official Search */}
              <div className="relative flex items-center">
                {isSearchOpen ? (
                  <div className={`relative flex items-center px-3 py-2 rounded-md border transition-all duration-200 ${
                    isSearchFocused 
                      ? isDark 
                        ? 'bg-slate-700 border-orange-400 ring-1 ring-orange-400/50' 
                        : 'bg-white border-orange-500 ring-1 ring-orange-500/50'
                      : isDark 
                        ? 'bg-slate-800 border-slate-600' 
                        : 'bg-white border-slate-300'
                  }`}>
                    <Search className={`absolute left-3 w-4 h-4 pointer-events-none ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`} />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder={t('header.searchPlaceholder')}
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      onKeyDown={handleSearchSubmit}
                      onFocus={handleSearchFocus}
                      onBlur={handleSearchBlur}
                      className={`w-32 sm:w-40 lg:w-48 bg-transparent border-0 focus:outline-none text-sm pl-6 pr-8 ${
                        isDark 
                          ? 'text-white placeholder-slate-400' 
                          : 'text-slate-900 placeholder-slate-500'
                      }`}
                      aria-label="Search"
                      autoFocus
                    />
                    {searchValue && (
                      <button
                        onClick={handleSearchClear}
                        className={`absolute right-2 p-0.5 rounded transition-colors ${
                          isDark ? 'text-slate-400 hover:text-slate-300' : 'text-slate-500 hover:text-slate-700'
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
                      className={`min-w-[40px] min-h-[40px] p-2 rounded-md border transition-all duration-300 ${
                        isScrolled
                          ? isDark
                            ? 'text-slate-200 hover:text-white hover:bg-slate-700 border-slate-600 hover:border-slate-500'
                            : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50 border-slate-300 hover:border-slate-400'
                          : isDark
                            ? 'text-slate-300/90 hover:text-white hover:bg-slate-700/50 border-slate-600/50 hover:border-slate-500'
                            : 'text-slate-600/90 hover:text-slate-900 hover:bg-white/50 border-slate-300/50 hover:border-slate-400'
                      }`}
                      aria-label="Open search"
                    >
                      <Search className="w-4 h-4" />
                    </button>

                    {/* Official Separator */}
                    <div className={`hidden lg:block w-px h-8 mx-3 transition-colors duration-300 ${
                      isScrolled
                        ? isDark ? 'bg-slate-600' : 'bg-slate-300'
                        : isDark ? 'bg-slate-600/60' : 'bg-slate-300/60'
                    }`}></div>

                    {/* Official Language Toggle */}
                    <div className="hidden lg:flex items-center bg-slate-100 dark:bg-slate-700 rounded-md p-1">
                      {/* <span className={`text-xs font-semibold mr-2 px-2 ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                       
                      </span> */}
                      {[{code: 'si', label: 'SI'}, {code: 'ta', label: 'TA'}, {code: 'en', label: 'EN'}].map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => setLanguage(lang.code as 'si' | 'ta' | 'en')}
                          className={`min-w-[40px] min-h-[32px] px-2 py-1 text-xs font-bold rounded transition-all duration-200 ${
                            currentLanguage === lang.code
                              ? 'bg-orange-500 text-white shadow-sm'
                              : isDark
                                ? 'text-slate-300 hover:text-white hover:bg-slate-600'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                          }`}
                          aria-label={`Switch to ${lang.code === 'en' ? 'English' : lang.code === 'si' ? 'Sinhala' : 'Tamil'}`}
                          aria-pressed={currentLanguage === lang.code}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Official Separator */}
              <div className={`hidden sm:block w-px h-8 mx-3 transition-colors duration-300 ${
                isScrolled
                  ? isDark ? 'bg-slate-600' : 'bg-slate-300'
                  : isDark ? 'bg-slate-600/60' : 'bg-slate-300/60'
              }`}></div>

            {/* Official Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`min-w-[40px] min-h-[40px] p-2 rounded-md border transition-all duration-300 ${
                isScrolled
                  ? isDark
                    ? 'text-slate-200 hover:text-white hover:bg-slate-700 border-slate-600 hover:border-slate-500'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50 border-slate-300 hover:border-slate-400'
                  : isDark
                    ? 'text-slate-300/90 hover:text-white hover:bg-slate-700/50 border-slate-600/50 hover:border-slate-500'
                    : 'text-slate-600/90 hover:text-slate-900 hover:bg-white/50 border-slate-300/50 hover:border-slate-400'
              }`}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
            >
              <div className="transition-all duration-300">
                {isDark ? 
                  <Sun className="w-4 h-4" /> : 
                  <Moon className="w-4 h-4" />
                }
              </div>
            </button>

            {/* Official Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden min-w-[40px] min-h-[40px] p-2 rounded-md border transition-all duration-300 ml-2 ${
                isMobileMenuOpen 
                  ? 'bg-orange-500 text-white border-orange-500' 
                  : isScrolled
                    ? isDark
                      ? 'text-slate-200 hover:text-white hover:bg-slate-700 border-slate-600 hover:border-slate-500'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50 border-slate-300 hover:border-slate-400'
                    : isDark
                      ? 'text-slate-300/90 hover:text-white hover:bg-slate-700/50 border-slate-600/50 hover:border-slate-500'
                      : 'text-slate-600/90 hover:text-slate-900 hover:bg-white/50 border-slate-300/50 hover:border-slate-400'
              }`}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <div className="transition-transform duration-200">
                {isMobileMenuOpen ? 
                  <X className="w-5 h-5" /> : 
                  <Menu className="w-5 h-5" />
                }
              </div>
            </button>
            </div>
          </div>
        </div>

        {/* Official Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`lg:hidden absolute top-full left-0 right-0 mt-2 mx-2 sm:mx-4 max-w-full ${
            isDark 
              ? 'bg-slate-900/98 border-slate-600' 
              : 'bg-white/98 border-slate-200'
          } backdrop-blur-lg border rounded-lg shadow-xl z-40`}>
            
            {/* Official Tab Headers */}
            <div className="p-3 pb-0">
              <div className={`flex items-center justify-between border rounded-lg p-1 ${
                isDark ? 'bg-slate-800/50 border-slate-600' : 'bg-slate-50 border-slate-200'
              }`}>
                {Object.keys(getDropdownItems()).map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveMobileTab(category)}
                    className={`flex-1 min-h-[40px] px-2 py-2 text-xs font-bold rounded-md transition-all duration-200 ${
                      activeMobileTab === category
                        ? 'bg-orange-500 text-white shadow-sm'
                        : isDark
                          ? 'text-slate-400 hover:text-slate-300 hover:bg-slate-700/50'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Official Tab Content */}
            <div className="p-4 pt-3">
              <div className="space-y-1">
                {getDropdownItems()[activeMobileTab]?.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <a
                      key={item.label}
                      href="#"
                      className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-md border-l-4 border-transparent transition-all duration-150 ${
                        isDark 
                          ? 'text-slate-200 hover:bg-slate-800 hover:text-white hover:border-orange-400' 
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 hover:border-orange-500'
                      }`}
                    >
                      <IconComponent className={`w-4 h-4 transition-colors duration-200 ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`} />
                      <span>{item.label}</span>
                    </a>
                  );
                })}
              </div>
              
              {/* Official Bottom Actions */}
              <div className={`mt-4 pt-4 border-t ${
                isDark ? 'border-slate-700' : 'border-slate-200'
              }`}>
                {/* Theme & Language Row */}
                <div className="flex items-center justify-between">
                  {/* Official Theme Toggle */}
                  <button
                    onClick={toggleTheme}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md border transition-all duration-200 ${
                      isDark 
                        ? 'text-slate-300 hover:bg-slate-800 hover:text-white border-slate-600' 
                        : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 border-slate-300'
                    }`}
                    aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
                  >
                    <div>
                      {isDark ? 
                        <Sun className="w-4 h-4" /> : 
                        <Moon className="w-4 h-4" />
                      }
                    </div>
                    <span className="text-sm font-medium">{t('common.theme')}</span>
                  </button>
                  
                  {/* Official Language Toggle */}
                  <div className={`flex items-center bg-slate-100 dark:bg-slate-700 rounded-md p-1 ${
                    isDark ? 'bg-slate-800' : 'bg-slate-100'
                  }`}>
                    {[{code: 'si', label: 'SI'}, {code: 'ta', label: 'TA'}, {code: 'en', label: 'EN'}].map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code as 'si' | 'ta' | 'en')}
                        className={`min-w-[36px] min-h-[32px] px-2 py-1 text-xs font-bold rounded transition-all duration-200 ${
                          currentLanguage === lang.code
                            ? 'bg-orange-500 text-white shadow-sm'
                            : isDark 
                              ? 'text-slate-400 hover:text-slate-300' 
                              : 'text-slate-600 hover:text-slate-900'
                        }`}
                        aria-label={`Switch to ${lang.code === 'en' ? 'English' : lang.code === 'si' ? 'Sinhala' : 'Tamil'}`}
                        aria-pressed={currentLanguage === lang.code}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;