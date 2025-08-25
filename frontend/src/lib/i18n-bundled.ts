import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import bundled translations
import enCommon from '../locales/en/common.json';
import siCommon from '../locales/si/common.json';
import taCommon from '../locales/ta/common.json';

import enHeader from '../locales/en/header.json';
import siHeader from '../locales/si/header.json';
import taHeader from '../locales/ta/header.json';

import enDropdown from '../locales/en/dropdown.json';
import siDropdown from '../locales/si/dropdown.json';
import taDropdown from '../locales/ta/dropdown.json';

import enHome from '../locales/en/home.json';
import siHome from '../locales/si/home.json';
import taHome from '../locales/ta/home.json';

import enServices from '../locales/en/services.json';
import siServices from '../locales/si/services.json';
import taServices from '../locales/ta/services.json';

import enFooter from '../locales/en/footer.json';
import siFooter from '../locales/si/footer.json';
import taFooter from '../locales/ta/footer.json';

import enCourses from '../locales/en/courses.json';
import siCourses from '../locales/si/courses.json';
import taCourses from '../locales/ta/courses.json';

import enTestimonials from '../locales/en/testimonials.json';
import siTestimonials from '../locales/si/testimonials.json';
import taTestimonials from '../locales/ta/testimonials.json';

import enNewsEvents from '../locales/en/newsevents.json';
import siNewsEvents from '../locales/si/newsevents.json';
import taNewsEvents from '../locales/ta/newsevents.json';

// Translation namespaces
export const namespaces = [
  'common',
  'header', 
  'dropdown',
  'home',
  'services',
  'courses',
  'testimonials',
  'newsevents',
  'footer'
] as const;

export type Namespace = typeof namespaces[number];
export type Language = 'en' | 'si' | 'ta';

// Supported languages configuration
export const languages: Language[] = ['si', 'ta', 'en'];
export const defaultLanguage: Language = 'si';

// Language display names
export const languageNames: Record<Language, { native: string; english: string }> = {
  en: { native: 'English', english: 'English' },
  si: { native: 'සිංහල', english: 'Sinhala' },
  ta: { native: 'தமிழ්', english: 'Tamil' }
};

// Bundled translations resources - no network requests needed!
const resources = {
  en: {
    common: enCommon,
    header: enHeader,
    dropdown: enDropdown,
    home: enHome,
    services: enServices,
    courses: enCourses,
    testimonials: enTestimonials,
    newsevents: enNewsEvents,
    footer: enFooter,
  },
  si: {
    common: siCommon,
    header: siHeader,
    dropdown: siDropdown,
    home: siHome,
    services: siServices,
    courses: siCourses,
    testimonials: siTestimonials,
    newsevents: siNewsEvents,
    footer: siFooter,
  },
  ta: {
    common: taCommon,
    header: taHeader,
    dropdown: taDropdown,
    home: taHome,
    services: taServices,
    courses: taCourses,
    testimonials: taTestimonials,
    newsevents: taNewsEvents,
    footer: taFooter,
  },
};

// Initialize i18next with bundled translations
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // Use bundled resources - no loading needed!
    resources,
    
    debug: import.meta.env.DEV,
    
    fallbackLng: defaultLanguage,
    supportedLngs: languages,
    
    // Language detection
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'nysc-language',
      caches: ['localStorage']
    },
    
    // Namespaces configuration
    defaultNS: 'common',
    ns: namespaces,
    
    // Interpolation
    interpolation: {
      escapeValue: false // React already handles XSS
    },
    
    // Loading configuration
    react: {
      useSuspense: false,
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'em']
    }
  });

// Language change handler - no resource loading needed!
export const changeLanguage = async (language: Language) => {
  // Change the language immediately - resources are already bundled
  await i18n.changeLanguage(language);
  
  // Store in localStorage
  localStorage.setItem('nysc-language', language);
};

// Get current language
export const getCurrentLanguage = (): Language => {
  return (i18n.language as Language) || defaultLanguage;
};

// Check if a namespace is loaded (always true now)
export const isNamespaceLoaded = (language: Language, namespace: Namespace): boolean => {
  return i18n.hasResourceBundle(language, namespace);
};

// Initialize translations - instant since they're bundled
export const initializeTranslations = () => {
  console.log('🚀 Translations initialized with bundled resources');
  console.log('📦 Available languages:', languages);
  console.log('📦 Available namespaces:', namespaces);
  console.log('🌍 Current language:', getCurrentLanguage());
  
  // Set default language if none is set
  const currentLang = getCurrentLanguage();
  if (!currentLang || !languages.includes(currentLang)) {
    i18n.changeLanguage(defaultLanguage);
  }
};

// Initialize on import
initializeTranslations();

export default i18n;