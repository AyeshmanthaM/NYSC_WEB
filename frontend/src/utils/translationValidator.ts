import { Language, languages, namespaces, Namespace } from '../lib/i18n';

interface TranslationValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  missing: { [key: string]: string[] };
  stats: {
    totalKeys: number;
    translatedKeys: number;
    completionPercentage: number;
  };
}

interface TranslationKeys {
  [key: string]: string | string[] | TranslationKeys;
}

/**
 * Validates translation completeness across all languages and namespaces
 */
export class TranslationValidator {
  private translations: Map<string, TranslationKeys> = new Map();

  /**
   * Load a translation file for validation
   */
  async loadTranslation(language: Language, namespace: Namespace): Promise<TranslationKeys> {
    try {
      const translation = await import(`../locales/${language}/${namespace}.json`);
      const key = `${language}_${namespace}`;
      this.translations.set(key, translation.default);
      return translation.default;
    } catch (error) {
      console.error(`Failed to load ${language}/${namespace}:`, error);
      return {};
    }
  }

  /**
   * Extract all translation keys from a nested object
   */
  private extractKeys(obj: TranslationKeys, prefix: string = ''): string[] {
    const keys: string[] = [];
    
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof value === 'string' || Array.isArray(value)) {
        keys.push(fullKey);
      } else if (typeof value === 'object' && value !== null) {
        keys.push(...this.extractKeys(value as TranslationKeys, fullKey));
      }
    }
    
    return keys;
  }

  /**
   * Validate a specific namespace across all languages
   */
  async validateNamespace(namespace: Namespace): Promise<TranslationValidationResult> {
    const result: TranslationValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
      missing: {},
      stats: {
        totalKeys: 0,
        translatedKeys: 0,
        completionPercentage: 0
      }
    };

    // Load all translations for this namespace
    const loadedTranslations: { [key in Language]?: TranslationKeys } = {};
    
    for (const language of languages) {
      loadedTranslations[language] = await this.loadTranslation(language, namespace);
    }

    // Use English as the reference for key completeness
    const englishKeys = this.extractKeys(loadedTranslations.en || {});
    result.stats.totalKeys = englishKeys.length;

    if (englishKeys.length === 0) {
      result.warnings.push(`No translations found for namespace "${namespace}" in English`);
      return result;
    }

    // Check each language against English
    for (const language of languages) {
      const translations = loadedTranslations[language] || {};
      const languageKeys = this.extractKeys(translations);
      const missingKeys = englishKeys.filter(key => !languageKeys.includes(key));

      if (missingKeys.length > 0) {
        result.missing[language] = missingKeys;
        result.isValid = false;
        result.errors.push(
          `Language "${language}" is missing ${missingKeys.length} keys in namespace "${namespace}"`
        );
      }

      // Calculate completion percentage
      const completionRate = ((languageKeys.length / englishKeys.length) * 100);
      result.stats.translatedKeys = Math.max(result.stats.translatedKeys, languageKeys.length);
      
      if (completionRate < 100 && completionRate > 0) {
        result.warnings.push(
          `Language "${language}" in namespace "${namespace}" is ${completionRate.toFixed(1)}% complete`
        );
      }
    }

    result.stats.completionPercentage = (result.stats.translatedKeys / result.stats.totalKeys) * 100;

    return result;
  }

  /**
   * Validate all namespaces and languages
   */
  async validateAll(): Promise<TranslationValidationResult> {
    const overallResult: TranslationValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
      missing: {},
      stats: {
        totalKeys: 0,
        translatedKeys: 0,
        completionPercentage: 0
      }
    };

    let totalKeys = 0;
    let totalTranslated = 0;

    for (const namespace of namespaces) {
      const namespaceResult = await this.validateNamespace(namespace);
      
      // Aggregate results
      overallResult.errors.push(...namespaceResult.errors);
      overallResult.warnings.push(...namespaceResult.warnings);
      
      // Merge missing keys
      for (const [language, keys] of Object.entries(namespaceResult.missing)) {
        if (!overallResult.missing[language]) {
          overallResult.missing[language] = [];
        }
        overallResult.missing[language].push(...keys);
      }

      totalKeys += namespaceResult.stats.totalKeys;
      totalTranslated += namespaceResult.stats.translatedKeys;

      if (!namespaceResult.isValid) {
        overallResult.isValid = false;
      }
    }

    overallResult.stats.totalKeys = totalKeys;
    overallResult.stats.translatedKeys = totalTranslated;
    overallResult.stats.completionPercentage = totalKeys > 0 ? (totalTranslated / totalKeys) * 100 : 0;

    return overallResult;
  }

  /**
   * Generate a formatted validation report
   */
  formatReport(result: TranslationValidationResult): string {
    const lines: string[] = [];
    
    lines.push('=== Translation Validation Report ===');
    lines.push(`Status: ${result.isValid ? '✅ VALID' : '❌ INVALID'}`);
    lines.push(`Completion: ${result.stats.completionPercentage.toFixed(1)}%`);
    lines.push(`Keys: ${result.stats.translatedKeys}/${result.stats.totalKeys}`);
    lines.push('');

    if (result.errors.length > 0) {
      lines.push('🚨 Errors:');
      result.errors.forEach(error => lines.push(`  - ${error}`));
      lines.push('');
    }

    if (result.warnings.length > 0) {
      lines.push('⚠️  Warnings:');
      result.warnings.forEach(warning => lines.push(`  - ${warning}`));
      lines.push('');
    }

    if (Object.keys(result.missing).length > 0) {
      lines.push('📝 Missing Keys:');
      for (const [language, keys] of Object.entries(result.missing)) {
        if (keys.length > 0) {
          lines.push(`  ${language}: ${keys.length} missing`);
          keys.slice(0, 5).forEach(key => lines.push(`    - ${key}`));
          if (keys.length > 5) {
            lines.push(`    ... and ${keys.length - 5} more`);
          }
        }
      }
    }

    return lines.join('\n');
  }
}

/**
 * Utility function to run translation validation
 */
export const validateTranslations = async (): Promise<void> => {
  const validator = new TranslationValidator();
  const result = await validator.validateAll();
  
  console.log(validator.formatReport(result));
  
  if (!result.isValid) {
    console.error('Translation validation failed!');
  }
};