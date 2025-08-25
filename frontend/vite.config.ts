import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // For CSR deployment
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable source maps for production
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          i18n: ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
          ui: ['lucide-react']
          // Note: JSON imports will be bundled automatically by Vite
        }
      }
    }
  },
  server: {
    port: 5173,
    host: true
  }
});
