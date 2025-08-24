import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMultipleNamespaces } from '../../hooks/useTranslationWithNamespace';
import { useModernLanguage } from '../../contexts/ModernLanguageContext';

const TranslationDebug: React.FC = () => {
  const { currentLanguage } = useModernLanguage();
  const { t: headerT, ready: headerReady } = useMultipleNamespaces(['header', 'dropdown', 'common']);
  const { i18n } = useTranslation();
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    const checkResources = () => {
      const info = {
        currentLanguage,
        headerReady,
        hasHeaderResources: i18n.hasResourceBundle(currentLanguage, 'header'),
        hasDropdownResources: i18n.hasResourceBundle(currentLanguage, 'dropdown'),
        hasCommonResources: i18n.hasResourceBundle(currentLanguage, 'common'),
        headerDirectorsKey: headerT('header.directors'),
        dropdownBoardKey: headerT('dropdown.boardOfMembers'),
        allLoadedNamespaces: i18n.reportNamespaces?.list || [],
        i18nLanguage: i18n.language,
        isInitialized: i18n.isInitialized,
        
        // Try to get resource directly
        headerResources: i18n.getResourceBundle(currentLanguage, 'header'),
        dropdownResources: i18n.getResourceBundle(currentLanguage, 'dropdown')
      };
      setDebugInfo(info);
    };

    checkResources();
    
    // Re-check when language changes
    const interval = setInterval(checkResources, 1000);
    return () => clearInterval(interval);
  }, [currentLanguage, headerReady, headerT, i18n]);

  return (
    <div style={{
      position: 'fixed',
      top: '80px',
      right: '10px',
      width: '300px',
      backgroundColor: 'rgba(0,0,0,0.9)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '11px',
      zIndex: 9999,
      maxHeight: '400px',
      overflowY: 'auto'
    }}>
      <h3>Translation Debug</h3>
      <pre style={{ fontSize: '10px', whiteSpace: 'pre-wrap' }}>
        {JSON.stringify(debugInfo, null, 2)}
      </pre>
    </div>
  );
};

export default TranslationDebug;