/**
 * Translation encryption/decryption utilities
 * Use with caution - client-side encryption is security through obscurity
 */

class TranslationCrypto {
  private key: string;

  constructor(key?: string) {
    // Use environment key or fallback (not truly secure since it's client-side)
    this.key = key || import.meta.env.VITE_TRANSLATION_KEY || 'nysc-default-key-2024';
  }

  /**
   * Simple AES-like encryption using Web Crypto API
   */
  async encrypt(text: string): Promise<string> {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      
      // Generate key from string
      const keyMaterial = await crypto.subtle.importKey(
        'raw',
        encoder.encode(this.key),
        { name: 'PBKDF2' },
        false,
        ['deriveBits', 'deriveKey']
      );
      
      const salt = crypto.getRandomValues(new Uint8Array(16));
      
      const derivedKey = await crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt,
          iterations: 100000,
          hash: 'SHA-256'
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt']
      );
      
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const encrypted = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        derivedKey,
        data
      );
      
      // Combine salt + iv + encrypted data
      const combined = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
      combined.set(salt, 0);
      combined.set(iv, salt.length);
      combined.set(new Uint8Array(encrypted), salt.length + iv.length);
      
      return btoa(String.fromCharCode(...combined));
    } catch (error) {
      console.error('Encryption failed:', error);
      throw new Error('Translation encryption failed');
    }
  }

  /**
   * Decrypt encrypted translation
   */
  async decrypt(encryptedData: string): Promise<string> {
    try {
      const combined = new Uint8Array(
        atob(encryptedData).split('').map(char => char.charCodeAt(0))
      );
      
      const salt = combined.slice(0, 16);
      const iv = combined.slice(16, 28);
      const encrypted = combined.slice(28);
      
      const encoder = new TextEncoder();
      const keyMaterial = await crypto.subtle.importKey(
        'raw',
        encoder.encode(this.key),
        { name: 'PBKDF2' },
        false,
        ['deriveBits', 'deriveKey']
      );
      
      const derivedKey = await crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt,
          iterations: 100000,
          hash: 'SHA-256'
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false,
        ['decrypt']
      );
      
      const decrypted = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        derivedKey,
        encrypted
      );
      
      return new TextDecoder().decode(decrypted);
    } catch (error) {
      console.error('Decryption failed:', error);
      throw new Error('Translation decryption failed');
    }
  }

  /**
   * Base64 obfuscation (lighter than encryption)
   */
  obfuscate(text: string): string {
    // Simple Base64 + character shifting
    const base64 = btoa(text);
    return base64.split('').map(char => 
      String.fromCharCode(char.charCodeAt(0) + 1)
    ).join('');
  }

  deobfuscate(obfuscated: string): string {
    const shifted = obfuscated.split('').map(char => 
      String.fromCharCode(char.charCodeAt(0) - 1)
    ).join('');
    return atob(shifted);
  }
}

/**
 * Translation loader with decryption support
 */
export class EncryptedTranslationLoader {
  private crypto: TranslationCrypto;
  private cache = new Map<string, any>();

  constructor(encryptionKey?: string) {
    this.crypto = new TranslationCrypto(encryptionKey);
  }

  /**
   * Load encrypted translation file
   */
  async loadEncrypted(language: string, namespace: string): Promise<any> {
    const cacheKey = `${language}-${namespace}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      // Load encrypted file
      const response = await fetch(`/translations-encrypted/${language}/${namespace}.enc`);
      const encryptedData = await response.text();
      
      // Decrypt
      const decryptedJson = await this.crypto.decrypt(encryptedData);
      const translations = JSON.parse(decryptedJson);
      
      this.cache.set(cacheKey, translations);
      return translations;
    } catch (error) {
      console.error('Failed to load encrypted translations:', error);
      return {};
    }
  }

  /**
   * Load obfuscated translation file (lighter approach)
   */
  async loadObfuscated(language: string, namespace: string): Promise<any> {
    const cacheKey = `${language}-${namespace}-obf`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await fetch(`/translations-obf/${language}/${namespace}.obf`);
      const obfuscatedData = await response.text();
      
      const deobfuscatedJson = this.crypto.deobfuscate(obfuscatedData);
      const translations = JSON.parse(deobfuscatedJson);
      
      this.cache.set(cacheKey, translations);
      return translations;
    } catch (error) {
      console.error('Failed to load obfuscated translations:', error);
      return {};
    }
  }
}

// Build-time encryption utility
export const createEncryptionScript = () => {
  return `
// Node.js script to encrypt translation files
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ENCRYPTION_KEY = process.env.TRANSLATION_ENCRYPTION_KEY || 'nysc-default-key-2024';

async function encryptFile(inputPath, outputPath) {
  const content = fs.readFileSync(inputPath, 'utf8');
  
  // Simple encryption
  const cipher = crypto.createCipher('aes192', ENCRYPTION_KEY);
  let encrypted = cipher.update(content, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  
  fs.writeFileSync(outputPath, encrypted);
}

// Encrypt all translation files
const languages = ['en', 'si', 'ta'];
const namespaces = ['common', 'home', 'news'];

for (const lang of languages) {
  for (const namespace of namespaces) {
    const inputPath = path.join('public/locales', lang, \`\${namespace}.json\`);
    const outputPath = path.join('public/translations-encrypted', lang, \`\${namespace}.enc\`);
    
    if (fs.existsSync(inputPath)) {
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      encryptFile(inputPath, outputPath);
      console.log(\`Encrypted: \${inputPath} -> \${outputPath}\`);
    }
  }
}
`;
};

export default TranslationCrypto;