import { createContext, useContext, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useModernLanguage } from './ModernLanguageContext';

// Compatibility interface that matches the old LanguageContext
interface CompatibilityLanguageContextType {
  currentLanguage: 'en' | 'si' | 'ta';
  setLanguage: (language: 'en' | 'si' | 'ta') => Promise<void>;
  t: (key: string) => string | string[];
  translations: any; // For backward compatibility, though not recommended
  isLoading?: boolean; // Optional for backward compatibility
}

const CompatibilityLanguageContext = createContext<CompatibilityLanguageContextType | undefined>(undefined);

interface CompatibilityLanguageProviderProps {
  children: ReactNode;
}

/**
 * Compatibility provider that wraps ModernLanguageProvider
 * This allows old components to work while we migrate them
 */
export const CompatibilityLanguageProvider: React.FC<CompatibilityLanguageProviderProps> = ({ children }) => {
  const { currentLanguage, setLanguage: modernSetLanguage, isLoading } = useModernLanguage();
  const { t: i18nT } = useTranslation(['home', 'common', 'header', 'dropdown', 'services']);

  // Create a compatible translation function that handles both old and new key formats
  const compatibleT = (key: string): string | string[] => {
    try {
      if (isLoading) {
        // If resources are still loading, return the key to avoid flash
        return key;
      }
      
      // First, try the key as-is (for namespaced keys like 'home.hero.title')
      let result = i18nT(key);
      
      // Debug logging for development
      if (import.meta.env.DEV) {
        console.log(`Translation lookup for "${key}":`, result);
      }
      
      // If it returns the key itself or is empty, try with default namespace
      if (result === key || result === '' || result === undefined) {
        // Try with home namespace first since most content is there
        result = i18nT(`home.${key}`);
        
        if (result === `home.${key}` || result === '' || result === undefined) {
          // Try other common namespaces
          const patterns = [
            `common.${key}`,
            `header.${key}`,
            `dropdown.${key}`,
            `services.${key}`
          ];
          
          for (const pattern of patterns) {
            const attempt = i18nT(pattern);
            if (attempt !== pattern && attempt !== '' && attempt !== undefined) {
              return attempt;
            }
          }
        } else {
          return result;
        }
      } else {
        return result;
      }
        
      // Handle special cases for nested keys that should be arrays
      if (key.endsWith('Features')) {
        console.warn(`Array translation not found for key: ${key}, returning empty array`);
        return [];
      }
      
      // If still not found, return the key or a fallback
      console.warn(`Translation not found for key: ${key}`);
      return key.split('.').pop() || key; // Return the last part of the key as fallback
    } catch (error) {
      console.error(`Translation error for key ${key}:`, error);
      return key;
    }
  };

  const contextValue: CompatibilityLanguageContextType = {
    currentLanguage,
    setLanguage: modernSetLanguage,
    t: compatibleT,
    translations: {}, // Empty object for backward compatibility
    isLoading
  };

  return (
    <CompatibilityLanguageContext.Provider value={contextValue}>
      {children}
    </CompatibilityLanguageContext.Provider>
  );
};

/**
 * Compatibility hook that works with old component code
 * This prevents crashes while we migrate components
 */
export const useLanguage = (): CompatibilityLanguageContextType => {
  const context = useContext(CompatibilityLanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a CompatibilityLanguageProvider');
  }
  return context;
};

export default CompatibilityLanguageContext;