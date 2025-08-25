import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Language, 
  languages, 
  defaultLanguage, 
  languageNames,
  changeLanguage,
  Namespace
} from '../lib/i18n-bundled';

// Enhanced context interface with modern features
interface ModernLanguageContextType {
  currentLanguage: Language;
  availableLanguages: Language[];
  languageNames: Record<Language, { native: string; english: string }>;
  setLanguage: (language: Language) => Promise<void>;
  t: (key: string, options?: any) => string;
  isLoading: boolean;
  loadNamespace: (namespace: Namespace) => Promise<void>;
  isNamespaceLoaded: (namespace: Namespace) => boolean;
  direction: 'ltr' | 'rtl';
}

const ModernLanguageContext = createContext<ModernLanguageContextType | undefined>(undefined);

interface ModernLanguageProviderProps {
  children: ReactNode;
}

export const ModernLanguageProvider: React.FC<ModernLanguageProviderProps> = ({ children }) => {
  const { i18n, t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const currentLanguage = (i18n.language || defaultLanguage) as Language;
  
  // Direction mapping (for future RTL support)
  const getTextDirection = (_lang: Language): 'ltr' | 'rtl' => {
    // Currently all supported languages are LTR
    // This can be extended for RTL languages like Arabic in the future
    return 'ltr';
  };

  useEffect(() => {
    // With bundled translations, no async loading needed
    setIsLoading(false);
    console.log('🚀 Language context initialized with bundled translations');
  }, []);

  const handleLanguageChange = async (language: Language) => {
    if (language === currentLanguage) return;
    
    setIsLoading(true);
    try {
      await changeLanguage(language);
      console.log(`🌍 Language changed to: ${language}`);
    } catch (error) {
      console.error('Failed to change language:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadNamespace = async (namespace: Namespace) => {
    // With bundled translations, all namespaces are already loaded
    console.log(`📦 Namespace ${namespace} already bundled and available`);
  };

  const isNamespaceLoaded = (namespace: Namespace): boolean => {
    return i18n.hasResourceBundle(currentLanguage, namespace);
  };

  const contextValue: ModernLanguageContextType = {
    currentLanguage,
    availableLanguages: languages,
    languageNames,
    setLanguage: handleLanguageChange,
    t,
    isLoading,
    loadNamespace,
    isNamespaceLoaded,
    direction: getTextDirection(currentLanguage)
  };

  return (
    <ModernLanguageContext.Provider value={contextValue}>
      {children}
    </ModernLanguageContext.Provider>
  );
};

// Enhanced hook with type safety and error handling
export const useModernLanguage = (): ModernLanguageContextType => {
  const context = useContext(ModernLanguageContext);
  if (context === undefined) {
    throw new Error('useModernLanguage must be used within a ModernLanguageProvider');
  }
  return context;
};

// Utility hooks for common use cases
export const useLanguageLoader = () => {
  const { loadNamespace, isNamespaceLoaded } = useModernLanguage();
  
  const ensureNamespaceLoaded = async (namespace: Namespace) => {
    if (!isNamespaceLoaded(namespace)) {
      await loadNamespace(namespace);
    }
  };

  return { ensureNamespaceLoaded, isNamespaceLoaded };
};

export const useLanguageDirection = () => {
  const { direction } = useModernLanguage();
  return direction;
};

export default ModernLanguageContext;