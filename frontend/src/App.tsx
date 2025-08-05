import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { useTheme } from './contexts/ThemeContext';
import { getThemeColor } from './config/colors';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import ServicesSection from './components/ServicesSection';
import LeadersSection from './components/LeadersSection';
import TestimonialsSection from './components/TestimonialsSection';
import NewsEventsSection from './components/NewsEventsSection';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';

const AppContent = () => {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen w-full max-w-full overflow-x-hidden relative transition-colors duration-300 ${
      getThemeColor('background', isDark)
    }`}>

      {/* Content */}
      <div className="relative z-10 w-full max-w-full overflow-x-hidden">
        <Header />
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <LeadersSection />
        <TestimonialsSection />
        <NewsEventsSection />
        <NewsletterSection />
        <Footer />
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;