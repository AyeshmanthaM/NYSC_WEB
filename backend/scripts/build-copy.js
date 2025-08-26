#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Copy files and directories for production build
 */
function copyDirectory(src, dest) {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // Read source directory
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('📦 Copying non-TypeScript files...');

try {
  // Copy views to dist/src/views
  if (fs.existsSync('src/views')) {
    console.log('  → Copying src/views to dist/src/views');
    copyDirectory('src/views', 'dist/src/views');
  }

  // Copy public to dist/public
  if (fs.existsSync('public')) {
    console.log('  → Copying public to dist/public');
    copyDirectory('public', 'dist/public');
  }

  // Copy templates to dist/templates  
  if (fs.existsSync('templates')) {
    console.log('  → Copying templates to dist/templates');
    copyDirectory('templates', 'dist/templates');
  }

  console.log('✅ Build copy completed successfully!');
} catch (error) {
  console.error('❌ Build copy failed:', error);
  process.exit(1);
}