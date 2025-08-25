// Translation bundles - compiled at build time
import enCommon from '../locales/en/common.json';
import siCommon from '../locales/si/common.json';
import taCommon from '../locales/ta/common.json';

import enHome from '../locales/en/home.json';
import siHome from '../locales/si/home.json';
import taHome from '../locales/ta/home.json';

import enHeader from '../locales/en/header.json';
import siHeader from '../locales/si/header.json';
import taHeader from '../locales/ta/header.json';

import enFooter from '../locales/en/footer.json';
import siFooter from '../locales/si/footer.json';
import taFooter from '../locales/ta/footer.json';

import enServices from '../locales/en/services.json';
import siServices from '../locales/si/services.json';
import taServices from '../locales/ta/services.json';

export type Language = 'en' | 'si' | 'ta';
export type Namespace = 'common' | 'home' | 'header' | 'footer' | 'services';

export const translations: Record<Language, Record<Namespace, any>> = {
  en: {
    common: enCommon,
    home: enHome,
    header: enHeader,
    footer: enFooter,
    services: enServices,
  },
  si: {
    common: siCommon,
    home: siHome,
    header: siHeader,
    footer: siFooter,
    services: siServices,
  },
  ta: {
    common: taCommon,
    home: taHome,
    header: taHeader,
    footer: taFooter,
    services: taServices,
  },
};

// Optional: Lazy loading for performance
export const loadTranslations = async (
  language: Language,
  namespace: Namespace
): Promise<any> => {
  switch (`${language}-${namespace}`) {
    case 'en-common':
      return (await import('../locales/en/common.json')).default;
    case 'si-common':
      return (await import('../locales/si/common.json')).default;
    case 'ta-common':
      return (await import('../locales/ta/common.json')).default;
    case 'en-home':
      return (await import('../locales/en/home.json')).default;
    case 'si-home':
      return (await import('../locales/si/home.json')).default;
    case 'ta-home':
      return (await import('../locales/ta/home.json')).default;
    case 'en-header':
      return (await import('../locales/en/header.json')).default;
    case 'si-header':
      return (await import('../locales/si/header.json')).default;
    case 'ta-header':
      return (await import('../locales/ta/header.json')).default;
    case 'en-footer':
      return (await import('../locales/en/footer.json')).default;
    case 'si-footer':
      return (await import('../locales/si/footer.json')).default;
    case 'ta-footer':
      return (await import('../locales/ta/footer.json')).default;
    case 'en-services':
      return (await import('../locales/en/services.json')).default;
    case 'si-services':
      return (await import('../locales/si/services.json')).default;
    case 'ta-services':
      return (await import('../locales/ta/services.json')).default;
    default:
      throw new Error(`Unknown translation: ${language}-${namespace}`);
  }
};