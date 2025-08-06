import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { useTheme } from './contexts/ThemeContext';
import { getThemeColor } from './config/colors';
import AnimatedBackground from './components/AnimatedBackground';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import KeyServiceAreas from './components/KeyServiceAreas';
import MembershipCounter from './components/MembershipCounter';
import YouthOfferings from './components/YouthOfferings';
import LeadersSection from './components/LeadersSection';
import PopularCourses from './components/PopularCourses';
import ServicesSection from './components/ServicesSection';
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
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Content */}
      <div className="relative z-10 w-full max-w-full overflow-x-hidden">
        <Header />
        <HeroSection />
        <KeyServiceAreas />
        <MembershipCounter />
        <YouthOfferings />
        <LeadersSection />
        <PopularCourses />
        <ServicesSection />
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