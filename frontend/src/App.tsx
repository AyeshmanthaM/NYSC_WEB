import { ThemeProvider } from './contexts/ThemeContext';
import { useTheme } from './contexts/ThemeContext';
import { getThemeColor } from './config/colors';
import AnimatedBackground from './components/ui/AnimatedBackground';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import KeyServiceAreas from './components/sections/KeyServiceAreas';
import YouthOfferings from './components/sections/YouthOfferings';
import LeadersSection from './components/sections/LeadersSection';
import PopularCourses from './components/sections/PopularCourses';
import ServicesSection from './components/sections/ServicesSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import NewsEventsSection from './components/sections/NewsEventsSection';
import NewsletterSection from './components/sections/NewsletterSection';

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
        
        {/* Add spacing wrapper for better flow */}
        <div className="py-8">
          <KeyServiceAreas />
        </div>
        
        {/* Group related sections with proper spacing */}
        <div className="space-y-16">
          <YouthOfferings />
          <PopularCourses />
          <ServicesSection />
        </div>
        
        {/* Leadership and testimonials */}
        <div className="mt-16">
          <LeadersSection />
          <TestimonialsSection />
        </div>
        
        {/* News and newsletter before footer */}
        <div className="mt-16">
          <NewsEventsSection />
          <NewsletterSection />
        </div>
        
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