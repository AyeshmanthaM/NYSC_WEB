#!/usr/bin/env tsx

/**
 * Translation validation script
 * 
 * Usage: npx tsx src/scripts/validate-translations.ts
 * Or: npm run validate-translations (if added to package.json)
 */

import { TranslationValidator } from '../utils/translationValidator';

async function main() {
  console.log('🔍 Validating translations...\n');
  
  const validator = new TranslationValidator();
  
  try {
    const result = await validator.validateAll();
    console.log(validator.formatReport(result));
    
    if (result.isValid) {
      console.log('\n✅ All translations are valid!');
      process.exit(0);
    } else {
      console.log('\n❌ Translation validation failed.');
      console.log('Please fix the missing translations before deploying.');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error during validation:', error);
    process.exit(1);
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  main();
}