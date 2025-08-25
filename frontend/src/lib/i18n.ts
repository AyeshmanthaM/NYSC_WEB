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

// Import API client
import { translationApi, TranslationWebSocket } from './translationApi';

// Track API availability
let isApiAvailable = false;
let apiCheckPromise: Promise<boolean> | null = null;

// WebSocket for real-time updates
let translationWebSocket: TranslationWebSocket | null = null;

// Check API availability once at startup
const checkApiAvailability = async (): Promise<boolean> => {
  if (apiCheckPromise) return apiCheckPromise;
  
  apiCheckPromise = translationApi.checkApiAvailability().then(available => {
    isApiAvailable = available;
    
    if (available && !translationWebSocket) {
      // Initialize WebSocket for real-time updates
      translationWebSocket = new TranslationWebSocket((data) => {
        // Handle real-time translation updates
        if (data && data.namespace && data.language) {
          i18n.reloadResources(data.language, data.namespace);
        }
      });
    }
    
    return available;
  });
  
  return apiCheckPromise;
};

// Dynamic translation loading with API fallback
const loadTranslation = async (language: Language, namespace: Namespace) => {
  // First, try to load from API if available
  if (isApiAvailable || await checkApiAvailability()) {
    try {
      const apiTranslations = await translationApi.getTranslations(language, namespace);
      if (Object.keys(apiTranslations).length > 0) {
        console.log(`✅ Loaded ${language}/${namespace} from API`);
        return apiTranslations;
      }
    } catch (error) {
      console.warn(`API translation load failed for ${language}/${namespace}, falling back to files:`, error);
    }
  }

  // Fallback to file-based translations
  try {
    const translation = await import(`../locales/${language}/${namespace}.json`);
    console.log(`📁 Loaded ${language}/${namespace} from files`);
    return translation.default;
  } catch (error) {
    console.warn(`Failed to load translation file for ${language}/${namespace}:`, error);
    
    // Fallback to English if not already English
    if (language !== 'en') {
      try {
        const fallback = await import(`../locales/en/${namespace}.json`);
        console.log(`🔄 Fallback to English for ${namespace}`);
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

// Force reload translations from API
export const reloadTranslationsFromApi = async () => {
  const currentLanguage = i18n.language as Language || defaultLanguage;
  
  if (await checkApiAvailability()) {
    // Clear existing resources
    namespaces.forEach(namespace => {
      i18n.removeResourceBundle(currentLanguage, namespace);
    });
    
    // Reload from API
    await loadInitialResources();
    
    console.log('🔄 Reloaded all translations from API');
  }
};

// Get translation source information
export const getTranslationSource = () => {
  return {
    apiAvailable: isApiAvailable,
    hasWebSocket: !!translationWebSocket,
    mode: isApiAvailable ? 'api-primary' : 'file-only'
  };
};

// Manual API availability check
export const recheckApiAvailability = async () => {
  apiCheckPromise = null;
  return await checkApiAvailability();
};

// Cleanup function for WebSocket
export const cleanup = () => {
  if (translationWebSocket) {
    translationWebSocket.disconnect();
    translationWebSocket = null;
  }
};

// Add cleanup to window beforeunload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', cleanup);
}

export default i18n;