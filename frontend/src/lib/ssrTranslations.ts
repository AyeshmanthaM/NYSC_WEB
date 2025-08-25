/**
 * SSR Translation injection - for Next.js or server-side rendering
 * Only injects translations needed for the current page
 */

interface SSRTranslationConfig {
  language: string;
  namespaces: string[];
  page: string;
  userRole?: string;
}

interface TranslationInjection {
  translations: Record<string, any>;
  metadata: {
    language: string;
    namespaces: string[];
    timestamp: number;
    checksum: string;
  };
}

export class SSRTranslationManager {
  /**
   * Server-side: Prepare translations for injection
   * This runs on the server during SSR/SSG
   */
  static async prepareTranslationsForPage(
    config: SSRTranslationConfig
  ): Promise<TranslationInjection> {
    const translations: Record<string, any> = {};
    
    // Load only required namespaces
    for (const namespace of config.namespaces) {
      try {
        // Server-side translation loading
        const translationData = await this.loadServerTranslation(
          config.language,
          namespace,
          config.userRole
        );
        
        // Page-specific filtering
        const filtered = this.filterTranslationsForPage(
          translationData,
          config.page
        );
        
        translations[namespace] = filtered;
      } catch (error) {
        console.error(`Failed to load ${config.language}/${namespace}:`, error);
        translations[namespace] = {};
      }
    }
    
    // Generate checksum for integrity
    const checksum = this.generateChecksum(translations);
    
    return {
      translations,
      metadata: {
        language: config.language,
        namespaces: config.namespaces,
        timestamp: Date.now(),
        checksum,
      },
    };
  }

  /**
   * Client-side: Initialize i18n with injected translations
   */
  static initializeFromInjection(injection: TranslationInjection) {
    // Verify checksum
    if (!this.verifyChecksum(injection.translations, injection.metadata.checksum)) {
      throw new Error('Translation integrity check failed');
    }
    
    // Initialize i18n with pre-loaded translations
    return {
      lng: injection.metadata.language,
      resources: {
        [injection.metadata.language]: injection.translations,
      },
      preload: [injection.metadata.language],
    };
  }

  /**
   * Load translation from server file system
   */
  private static async loadServerTranslation(
    language: string,
    namespace: string,
    userRole?: string
  ): Promise<any> {
    // This would run on the server
    const fs = await import('fs');
    const path = await import('path');
    
    const filePath = path.resolve(
      process.cwd(),
      'translations',
      language,
      `${namespace}.json`
    );
    
    if (!fs.existsSync(filePath)) {
      return {};
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    const translations = JSON.parse(content);
    
    // Apply role-based filtering on server
    return this.applyRoleBasedFiltering(translations, userRole);
  }

  /**
   * Filter translations based on current page
   */
  private static filterTranslationsForPage(
    translations: any,
    page: string
  ): any {
    // Define page-specific translation keys
    const pageKeyMappings: Record<string, string[]> = {
      home: ['hero', 'features', 'stats', 'newsletter'],
      about: ['mission', 'history', 'leadership'],
      news: ['articles', 'categories', 'filters'],
      programs: ['sports', 'cultural', 'vocational'],
      contact: ['form', 'offices', 'map'],
    };
    
    const allowedKeys = [
      'common', // Always include common keys
      ...(pageKeyMappings[page] || [])
    ];
    
    // Filter translation object
    const filtered: any = {};
    
    for (const [key, value] of Object.entries(translations)) {
      if (this.shouldIncludeKey(key, allowedKeys)) {
        filtered[key] = value;
      }
    }
    
    return filtered;
  }

  /**
   * Apply role-based filtering
   */
  private static applyRoleBasedFiltering(
    translations: any,
    userRole?: string
  ): any {
    if (!userRole || userRole === 'admin') {
      return translations; // Admin sees everything
    }
    
    const filtered: any = {};
    
    for (const [key, value] of Object.entries(translations)) {
      // Skip admin-only content
      if (key.startsWith('admin.') && userRole !== 'admin') {
        continue;
      }
      
      // Skip internal staff content
      if (key.startsWith('staff.') && !['admin', 'staff'].includes(userRole)) {
        continue;
      }
      
      filtered[key] = value;
    }
    
    return filtered;
  }

  /**
   * Check if a key should be included
   */
  private static shouldIncludeKey(key: string, allowedKeys: string[]): boolean {
    return allowedKeys.some(allowedKey => 
      key === allowedKey || key.startsWith(`${allowedKey}.`)
    );
  }

  /**
   * Generate checksum for integrity verification
   */
  private static generateChecksum(data: any): string {
    const jsonString = JSON.stringify(data, Object.keys(data).sort());
    
    // Simple hash (use crypto in production)
    let hash = 0;
    for (let i = 0; i < jsonString.length; i++) {
      const char = jsonString.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    return hash.toString(36);
  }

  /**
   * Verify translation integrity
   */
  private static verifyChecksum(data: any, expectedChecksum: string): boolean {
    const actualChecksum = this.generateChecksum(data);
    return actualChecksum === expectedChecksum;
  }
}

/**
 * Next.js getServerSideProps example
 */
export const getServerSideTranslations = async (
  locale: string,
  namespaces: string[],
  context: { req: any; resolvedUrl: string }
) => {
  const page = context.resolvedUrl.split('/')[1] || 'home';
  const userRole = context.req.user?.role || 'public';
  
  const injection = await SSRTranslationManager.prepareTranslationsForPage({
    language: locale,
    namespaces,
    page,
    userRole,
  });
  
  return {
    props: {
      translationInjection: injection,
    },
  };
};

/**
 * React hook for SSR translations
 */
import { useState, useEffect } from 'react';

export const useSSRTranslations = (injection: TranslationInjection) => {
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    try {
      const i18nConfig = SSRTranslationManager.initializeFromInjection(injection);
      
      // Note: i18n would be imported from your i18n configuration
      // Initialize i18n with server-provided translations
      // i18n.init({
      //   ...i18nConfig,
      //   // Additional client-side config
      // });
      
      setIsReady(true);
    } catch (error) {
      console.error('Failed to initialize SSR translations:', error);
    }
  }, [injection]);
  
  return { isReady };
};