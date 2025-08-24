import { useState, useEffect } from 'react';
import { useModernLanguage } from '../../contexts/ModernLanguageContext';
import { TranslationValidator } from '../../utils/translationValidator';
import { namespaces } from '../../lib/i18n';

interface TranslationDebuggerProps {
  show?: boolean;
}

/**
 * Development component to debug translation status
 * Only renders in development mode
 */
export const TranslationDebugger: React.FC<TranslationDebuggerProps> = ({ 
  show = process.env.NODE_ENV === 'development' 
}) => {
  const { currentLanguage, availableLanguages } = useModernLanguage();
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!show) return;

    const validateTranslations = async () => {
      const validator = new TranslationValidator();
      const result = await validator.validateAll();
      setDebugInfo(result);
    };

    validateTranslations();
  }, [show, currentLanguage]);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-purple-600 text-white px-3 py-2 rounded-lg shadow-lg text-sm hover:bg-purple-700 transition-colors"
      >
        🌐 i18n Debug
      </button>

      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-4 w-80 max-h-96 overflow-y-auto">
          <div className="space-y-3">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
              <h3 className="font-semibold text-lg">Translation Debug Info</h3>
            </div>

            <div>
              <h4 className="font-medium text-sm mb-1">Current Language</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{currentLanguage}</p>
            </div>

            <div>
              <h4 className="font-medium text-sm mb-1">Available Languages</h4>
              <div className="flex gap-1">
                {availableLanguages.map(lang => (
                  <span
                    key={lang}
                    className={`text-xs px-2 py-1 rounded ${
                      lang === currentLanguage 
                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-sm mb-1">Loaded Namespaces</h4>
              <div className="grid grid-cols-2 gap-1">
                {namespaces.map(ns => (
                  <span
                    key={ns}
                    className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                  >
                    {ns}
                  </span>
                ))}
              </div>
            </div>

            {debugInfo && (
              <div>
                <h4 className="font-medium text-sm mb-1">Validation Status</h4>
                <div className="text-sm space-y-1">
                  <div className={`px-2 py-1 rounded ${
                    debugInfo.isValid 
                      ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                      : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                  }`}>
                    {debugInfo.isValid ? '✅ Valid' : '❌ Invalid'}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {debugInfo.stats.completionPercentage.toFixed(1)}% complete
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {debugInfo.stats.translatedKeys}/{debugInfo.stats.totalKeys} keys
                  </div>
                </div>
              </div>
            )}

            {debugInfo && debugInfo.errors.length > 0 && (
              <div>
                <h4 className="font-medium text-sm mb-1 text-red-600">Errors</h4>
                <div className="text-xs text-red-600 max-h-20 overflow-y-auto">
                  {debugInfo.errors.slice(0, 3).map((error: string, i: number) => (
                    <div key={i}>• {error}</div>
                  ))}
                  {debugInfo.errors.length > 3 && (
                    <div>... and {debugInfo.errors.length - 3} more</div>
                  )}
                </div>
              </div>
            )}

            {debugInfo && debugInfo.warnings.length > 0 && (
              <div>
                <h4 className="font-medium text-sm mb-1 text-yellow-600">Warnings</h4>
                <div className="text-xs text-yellow-600 max-h-20 overflow-y-auto">
                  {debugInfo.warnings.slice(0, 3).map((warning: string, i: number) => (
                    <div key={i}>• {warning}</div>
                  ))}
                  {debugInfo.warnings.length > 3 && (
                    <div>... and {debugInfo.warnings.length - 3} more</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};