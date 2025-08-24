import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

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
  ta: { native: 'தமிழ்', english: 'Tamil' }
};

// Dynamic import function for translations
const loadTranslation = async (language: Language, namespace: Namespace) => {
  try {
    const translation = await import(`../locales/${language}/${namespace}.json`);
    return translation.default;
  } catch (error) {
    console.warn(`Failed to load translation for ${language}/${namespace}:`, error);
    
    // Fallback to English if not already English
    if (language !== 'en') {
      try {
        const fallback = await import(`../locales/en/${namespace}.json`);
        return fallback.default;
      } catch (fallbackError) {
        console.error(`Failed to load fallback translation for en/${namespace}:`, fallbackError);
        return {};
      }
    }
    
    return {};
  }
};

// Initialize i18next with lazy loading
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV === 'development',
    
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
      useSuspense: false, // Disable suspense for now
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'em']
    },
    
    // Backend configuration for dynamic loading
    backend: {
      loadPath: async (lngs: string[], namespaces: string[]) => {
        // This will be handled by our custom loader
        return '';
      }
    }
  });

// Custom resource loading
export const loadResources = async (language: Language, namespace: Namespace) => {
  if (i18n.hasResourceBundle(language, namespace)) {
    return; // Already loaded
  }
  
  const resources = await loadTranslation(language, namespace);
  i18n.addResourceBundle(language, namespace, resources);
};

// Load initial resources
export const loadInitialResources = async () => {
  const currentLanguage = i18n.language as Language || defaultLanguage;
  
  // Load common namespace first
  await loadResources(currentLanguage, 'common');
  await loadResources(currentLanguage, 'header');
  await loadResources(currentLanguage, 'dropdown');
  await loadResources(currentLanguage, 'home');
  await loadResources(currentLanguage, 'footer');
};

// Language change handler with resource loading
export const changeLanguage = async (language: Language) => {
  // Load required resources for the new language
  await loadResources(language, 'common');
  await loadResources(language, 'header');
  await loadResources(language, 'home');
  await loadResources(language, 'dropdown');
  await loadResources(language, 'footer');
  
  // Change the language
  await i18n.changeLanguage(language);
  
  // Store in localStorage
  localStorage.setItem('nysc-language', language);
};

export default i18n;