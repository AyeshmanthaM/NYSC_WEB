import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { translations, Language, Namespace } from './translations';

// Secure i18n configuration using bundled translations
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // Remove HTTP backend - translations are bundled
    resources: translations,
    
    lng: 'si', // Default language
    fallbackLng: 'en',
    
    debug: import.meta.env.DEV,
    
    interpolation: {
      escapeValue: false, // React already escapes
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    
    // Security: Prevent namespace loading from external sources
    loadPath: false,
    backend: false,
  });

export default i18n;