import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, ChevronDown, Menu, X, Moon, Sun, XCircle,
  Users, Target, Award, FileText,
  Trophy, Music, GraduationCap, Star,
  UserPlus, Lightbulb, Heart, HandHeart, Mail
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const [searchValue, setSearchValue] = useState('');
  const [dropdownTimeout, setDropdownTimeout] = useState<number | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState('About');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.navigation-container')) {
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
  }, []);

  const dropdownItems = {
    About: [
      { label: 'Our Story', icon: Users },
      { label: 'Vision & Mission', icon: Target },
      { label: 'Leadership', icon: Award },
      { label: 'Annual Reports', icon: FileText }
    ],
    Programs: [
      { label: 'Sports Programs', icon: Trophy },
      { label: 'Cultural Activities', icon: Music },
      { label: 'Training Centers', icon: GraduationCap },
      { label: 'Youth Awards', icon: Star }
    ],
    Services: [
      { label: 'Youth Clubs', icon: UserPlus },
      { label: 'Skill Development', icon: Lightbulb },
      { label: 'Mentorship', icon: Heart },
      { label: 'Community Service', icon: HandHeart }
    ],
    Contact: [
      { label: 'General Inquiries', icon: Mail },
      { label: 'Support Center', icon: Heart },
      { label: 'Media Relations', icon: FileText },
      { label: 'Partner With Us', icon: HandHeart }
    ]
  };

  // Enhanced dropdown handlers with delay
  const handleDropdownEnter = (item: string) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setActiveDropdown(item);
  };

  const handleDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 150); // 150ms delay before closing
    setDropdownTimeout(timeout);
  };

  // Search handlers
  const handleSearchSubmit = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      console.log('Searching for:', searchValue);
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
    <header className={`fixed top-0 left-0 right-0 z-50 w-full max-w-full transition-all duration-300`}>
      
      <div className="w-full max-w-full px-4 sm:px-6 py-4 relative z-10">
        <div className="h-20 flex justify-center">
          {/* Fixed Width Navigation Bar for Large Screens */}
          <div className={`navigation-container flex items-center justify-between h-full px-4 sm:px-6 py-3 mx-2 sm:mx-4 rounded-xl transition-all duration-300 w-full max-w-7xl ${
            isScrolled 
              ? isDark 
                ? 'bg-gray-900/30 backdrop-blur-md border border-gray-700/50 shadow-sm'
                : 'bg-white/30 backdrop-blur-md border border-gray-200/50 shadow-sm'
              : 'bg-white/10 backdrop-blur-md border border-white/20'
          }`}>
            {/* Left Section - Logo */}
            <div className="flex items-center">
              <a 
                href="#" 
                className="flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-white/5 group"
                aria-label="NYSC Home"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-[#1aa79e] to-[#f38621] rounded-full flex items-center justify-center shadow-lg transition-all duration-200 group-hover:scale-110 group-hover:shadow-xl">
                  <span className="text-white font-bold text-base transition-transform duration-200 group-hover:scale-105">N</span>
                </div>
                <span className={`font-bold text-xl transition-all duration-200 group-hover:scale-105 ${
                  isScrolled 
                    ? isDark ? 'text-white' : 'text-gray-900'
                    : 'text-white'
                }`}>
                  NYSC
                </span>
              </a>
            </div>

            {/* Center Section - Desktop Navigation */}
            <div className="hidden lg:flex items-center absolute left-1/2 transform -translate-x-1/2 max-w-fit">
              {Object.entries(dropdownItems).map(([item, subitems]) => (
                <div
                  key={item}
                  className="relative"
                  onMouseEnter={() => handleDropdownEnter(item)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <button 
                    className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group hover:scale-105 ${
                      activeDropdown === item
                        ? isDark
                          ? 'bg-gray-700 text-white shadow-md'
                          : 'bg-gray-100 text-gray-900 shadow-md'
                        : isScrolled 
                          ? isDark
                            ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                    aria-expanded={activeDropdown === item}
                    aria-haspopup="true"
                    aria-label={`${item} menu`}
                  >
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">{item}</span>
                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                      activeDropdown === item ? 'rotate-180' : 'group-hover:translate-y-0.5'
                    }`} />
                  </button>
                  
                  {activeDropdown === item && (
                    <div 
                      className={`absolute top-full left-0 mt-2 w-56 ${
                        isDark 
                          ? 'bg-gray-900/95 border-gray-700' 
                          : 'bg-white/95 border-gray-200'
                      } backdrop-blur-xl border rounded-2xl shadow-2xl py-2 animate-fadeIn z-50`}
                      data-dropdown={item}
                      onMouseEnter={() => handleDropdownEnter(item)}
                      onMouseLeave={handleDropdownLeave}
                      role="menu"
                      aria-label={`${item} submenu`}
                    >
                      <div className="px-3 py-2">
                        <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {item}
                        </div>
                        {subitems.map((subitem, index) => {
                          const IconComponent = subitem.icon;
                          return (
                            <a
                              key={subitem.label}
                              href="#"
                              className={`flex items-center space-x-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-200 hover:scale-105 hover:translate-x-1 ${
                                isDark 
                                  ? 'text-gray-300 hover:bg-gray-800 hover:text-white' 
                                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                              }`}
                              role="menuitem"
                              tabIndex={activeDropdown === item ? 0 : -1}
                              style={{ animationDelay: `${index * 50}ms` }}
                            >
                              <IconComponent className={`w-4 h-4 transition-colors duration-200 ${
                                isDark ? 'text-gray-400' : 'text-gray-500'
                              }`} />
                              <span>{subitem.label}</span>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Section - Utilities */}
            <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
              {/* Enhanced Search with Animation */}
              <div className="relative flex items-center">
                {isSearchOpen ? (
                  <div className={`relative flex items-center px-3 py-2 rounded-lg transition-all duration-300 ${
                    isSearchFocused 
                      ? isDark 
                        ? 'bg-gray-700/80 ring-2 ring-[#1aa79e]/50' 
                        : 'bg-white/80 ring-2 ring-[#1aa79e]/50'
                      : isDark 
                        ? isScrolled 
                          ? 'bg-gray-800/80' 
                          : 'bg-gray-800/60'
                        : isScrolled 
                          ? 'bg-white/80' 
                          : 'bg-white/60'
                  }`}>
                    <Search className={`absolute left-3 w-4 h-4 pointer-events-none transition-colors duration-200 ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search..."
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      onKeyDown={handleSearchSubmit}
                      onFocus={handleSearchFocus}
                      onBlur={handleSearchBlur}
                      className={`w-32 sm:w-40 lg:w-48 bg-transparent border-0 focus:outline-none text-sm transition-all duration-300 pl-6 ${
                        isDark 
                          ? 'text-white placeholder-gray-400' 
                          : isScrolled 
                            ? 'text-gray-900 placeholder-gray-500'
                            : 'text-gray-800 placeholder-gray-600'
                      }`}
                      aria-label="Search"
                      autoFocus
                    />
                    {searchValue && (
                      <button
                        onClick={handleSearchClear}
                        className={`absolute right-2 p-0.5 rounded-full transition-all duration-200 hover:scale-110 ${
                          isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
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
                      className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
                        isScrolled 
                          ? isDark
                            ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                      aria-label="Open search"
                    >
                      <Search className="w-4 h-4" />
                    </button>

                    {/* Separator */}
                    <div className={`hidden lg:block w-px h-6 mx-2 xl:mx-3 transition-all duration-300 ${
                      isDark ? 'bg-gray-600' : 'bg-gray-300'
                    } opacity-50`}></div>

                    {/* Language Toggle */}
                    <div className="hidden lg:flex items-center space-x-1 px-1 xl:px-2 transition-all duration-300">
                      <span className={`text-xs font-medium mr-2 ${
                        isScrolled 
                          ? isDark ? 'text-gray-400' : 'text-gray-500'
                          : 'text-white/70'
                      }`}>
                        Lang:
                      </span>
                      {['SI', 'TA', 'EN'].map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setCurrentLang(lang)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 hover:scale-105 ${
                            currentLang === lang
                              ? 'bg-[#1aa79e] text-white shadow-md transform scale-105'
                              : isScrolled
                                ? isDark
                                  ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                : 'text-white/90 hover:text-white hover:bg-white/10'
                          }`}
                          aria-label={`Switch to ${lang === 'EN' ? 'English' : lang === 'SI' ? 'Sinhala' : 'Tamil'}`}
                          aria-pressed={currentLang === lang}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Separator */}
              <div className={`hidden sm:block w-px h-6 mx-2 xl:mx-3 ${
                isDark ? 'bg-gray-600' : 'bg-gray-300'
              } opacity-50`}></div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 sm:p-2.5 rounded-lg transition-all duration-200 hover:scale-110 hover:rotate-12 ${
                isScrolled 
                  ? isDark
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
            >
              <div className="transition-all duration-300">
                {isDark ? 
                  <Sun className="w-4 h-4 transition-transform duration-300 hover:rotate-45" /> : 
                  <Moon className="w-4 h-4 transition-transform duration-300 hover:-rotate-12" />
                }
              </div>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-all duration-200 hover:scale-110 ml-1 ${
                isScrolled 
                  ? isDark
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <div className="transition-transform duration-200">
                {isMobileMenuOpen ? 
                  <X className="w-5 h-5 transition-transform duration-200 hover:rotate-90" /> : 
                  <Menu className="w-5 h-5 transition-transform duration-200 hover:scale-110" />
                }
              </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Tabbed Interface */}
        {isMobileMenuOpen && (
          <div className={`lg:hidden absolute top-full left-0 right-0 mt-2 mx-2 sm:mx-4 max-w-full ${
            isDark 
              ? 'bg-gray-900/95 border-gray-700' 
              : 'bg-white/95 border-gray-200'
          } backdrop-blur-xl border rounded-2xl shadow-2xl animate-slideDown z-40`}>
            
            {/* Tab Headers */}
            <div className="p-4 pb-0">
              <div className={`flex items-center justify-between rounded-xl p-1 ${
                isDark ? 'bg-gray-800/50' : 'bg-gray-100/50'
              }`}>
                {Object.keys(dropdownItems).map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveMobileTab(category)}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      activeMobileTab === category
                        ? 'bg-[#1aa79e] text-white shadow-md transform scale-105'
                        : isDark
                          ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/50'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6 pt-4">
              <div className="space-y-1">
                {dropdownItems[activeMobileTab as keyof typeof dropdownItems].map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <a
                      key={item.label}
                      href="#"
                      className={`flex items-center space-x-3 px-3 py-3 text-sm rounded-lg transition-all duration-200 hover:scale-105 hover:translate-x-1 ${
                        isDark 
                          ? 'text-gray-300 hover:bg-gray-800 hover:text-white' 
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <IconComponent className={`w-4 h-4 transition-colors duration-200 ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <span>{item.label}</span>
                    </a>
                  );
                })}
              </div>
              
              {/* Bottom Actions */}
              <div className={`mt-6 pt-6 border-t ${
                isDark ? 'border-gray-800' : 'border-gray-100'
              }`}>
                {/* Theme & Language Row */}
                <div className="flex items-center justify-between">
                  {/* Theme Toggle */}
                  <button
                    onClick={toggleTheme}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                      isDark 
                        ? 'text-gray-300 hover:bg-gray-800 hover:text-white' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
                  >
                    <div className="transition-transform duration-300">
                      {isDark ? 
                        <Sun className="w-4 h-4 transition-transform duration-300 hover:rotate-45" /> : 
                        <Moon className="w-4 h-4 transition-transform duration-300 hover:-rotate-12" />
                      }
                    </div>
                    <span className="text-sm">Theme</span>
                  </button>
                  
                  {/* Language Toggle */}
                  <div className={`flex items-center rounded-full p-1 ${
                    isDark ? 'bg-gray-800' : 'bg-gray-100'
                  }`}>
                    {['SI', 'TA', 'EN'].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setCurrentLang(lang)}
                        className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 hover:scale-105 ${
                          currentLang === lang
                            ? 'bg-[#1aa79e] text-white shadow-md transform scale-105'
                            : isDark 
                              ? 'text-gray-400 hover:text-gray-300' 
                              : 'text-gray-600 hover:text-gray-900'
                        }`}
                        aria-label={`Switch to ${lang === 'EN' ? 'English' : lang === 'SI' ? 'Sinhala' : 'Tamil'}`}
                        aria-pressed={currentLang === lang}
                      >
                        {lang}
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