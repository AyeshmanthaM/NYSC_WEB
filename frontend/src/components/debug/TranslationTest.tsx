import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const TranslationTest: React.FC = () => {
  const { t, i18n } = useTranslation(['header', 'dropdown']);
  const [manualImport, setManualImport] = useState<any>(null);
  
  useEffect(() => {
    const testImport = async () => {
      try {
        const headerEN = await import('../../locales/en/header.json');
        const headerSI = await import('../../locales/si/header.json');
        const dropdownEN = await import('../../locales/en/dropdown.json');
        
        console.log('Direct import test results:');
        console.log('EN Header:', headerEN.default);
        console.log('SI Header:', headerSI.default);
        console.log('EN Dropdown:', dropdownEN.default);
        
        setManualImport({
          headerEN: headerEN.default,
          headerSI: headerSI.default,
          dropdownEN: dropdownEN.default
        });
      } catch (error) {
        console.error('Direct import failed:', error);
      }
    };
    
    testImport();
  }, []);

  useEffect(() => {
    console.log('Translation test component:');
    console.log('i18n language:', i18n.language);
    console.log('i18n ready:', i18n.isInitialized);
    console.log('Namespaces:', i18n.options.ns);
    console.log('Has header bundle:', i18n.hasResourceBundle(i18n.language, 'header'));
    console.log('Has dropdown bundle:', i18n.hasResourceBundle(i18n.language, 'dropdown'));
    console.log('Header resource bundle:', i18n.getResourceBundle(i18n.language, 'header'));
    console.log('Dropdown resource bundle:', i18n.getResourceBundle(i18n.language, 'dropdown'));
    
    // Test direct translation calls
    console.log('Direct t() calls:');
    console.log('header:directors =', t('header:directors'));
    console.log('directors =', t('directors'));
    console.log('dropdown:boardOfMembers =', t('dropdown:boardOfMembers'));
    console.log('boardOfMembers =', t('boardOfMembers'));
  }, [t, i18n]);

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      left: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '500px',
      maxHeight: '300px',
      overflowY: 'auto'
    }}>
      <h3>Translation Test</h3>
      <div>
        <p>Current language: {i18n.language}</p>
        <p>Is initialized: {i18n.isInitialized ? 'Yes' : 'No'}</p>
        <p>Header directors: "{t('header:directors')}"</p>
        <p>Directors: "{t('directors')}"</p>
        <p>Dropdown board: "{t('dropdown:boardOfMembers')}"</p>
        <p>Board: "{t('boardOfMembers')}"</p>
        
        {manualImport && (
          <div>
            <h4>Manual Import Test:</h4>
            <p>EN directors: {manualImport.headerEN?.directors}</p>
            <p>SI directors: {manualImport.headerSI?.directors}</p>
            <p>EN board: {manualImport.dropdownEN?.boardOfMembers}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TranslationTest;