/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'nysc-primary': '#1aa79e',
        'nysc-secondary': '#f38621',
        'nysc-primary-hover': '#148a82',
        'nysc-secondary-hover': '#e67411'
      }
    },
  },
  plugins: [],
  safelist: [
    'from-nysc-primary',
    'to-nysc-secondary', 
    'via-nysc-primary',
    'via-nysc-secondary',
    'bg-nysc-primary',
    'bg-nysc-secondary',
    'text-nysc-primary',
    'text-nysc-secondary',
    'border-nysc-primary',
    'border-nysc-secondary'
  ]
};
