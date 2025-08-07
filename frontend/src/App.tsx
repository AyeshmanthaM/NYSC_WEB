import { ThemeProvider } from './contexts/ThemeContext';
import { useTheme } from './contexts/ThemeContext';
import { getThemeColor } from './config/colors';
import { useRef, useEffect, useState } from 'react';
import AnimatedBackground from './components/ui/AnimatedBackground';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import KeyServiceAreas from './components/sections/KeyServiceAreas';
import YouthOfferings from './components/sections/YouthOfferings';
import OrganizationsSection from './components/sections/OrganizationsSection';
import LeadersSection from './components/sections/LeadersSection';
import PopularCourses from './components/sections/PopularCourses';
import ServicesSection from './components/sections/ServicesSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import NewsEventsSection from './components/sections/NewsEventsSection';
import NewsletterSection from './components/sections/NewsletterSection';

const AppContent = () => {
  const { isDark } = useTheme();
  const keyServiceRef = useRef<HTMLDivElement>(null);
  const [serviceAreaHeight, setServiceAreaHeight] = useState(0);
  const [isCardHovered, setIsCardHovered] = useState(false);

  // Dynamically calculate KeyServiceAreas height
  useEffect(() => {
    const calculateHeight = () => {
      if (keyServiceRef.current) {
        const height = keyServiceRef.current.offsetHeight;
        setServiceAreaHeight(height);
      }
    };

    // Calculate initially
    calculateHeight();

    // Recalculate on window resize
    window.addEventListener('resize', calculateHeight);

    // Recalculate after a short delay to ensure content is loaded
    const timer = setTimeout(calculateHeight, 100);

    return () => {
      window.removeEventListener('resize', calculateHeight);
      clearTimeout(timer);
    };
  }, []);

  // Calculate the offset values
  const halfHeight = Math.round(serviceAreaHeight / 2);
  const baseMarginOffset = halfHeight > 0 ? halfHeight : 128; // Default to 128px if not calculated yet

  // Add compensation when card is hovered
  // When scale-105 is applied, the card height increases by ~5%
  // We need to compensate more to prevent the YouthOfferings from moving
  const hoverCompensation = isCardHovered ? 30 : 0; //<--- 30 is depend by card hight
  const marginOffset = baseMarginOffset + hoverCompensation;

  // Debug logging
  // console.log('Hover state:', isCardHovered, 'MarginOffset:', marginOffset);

  return (
    <div className={`min-h-screen w-full max-w-full overflow-x-hidden relative transition-colors duration-300 ${getThemeColor('background', isDark)
      }`}>
      {/* Animated Background */}
      <AnimatedBackground />

      {/* ================= home page Content =========================== */}
      <div className="relative z-10 w-full max-w-full overflow-x-hidden">
        <Header />

        {/* Container with continuous background that flows behind KeyServiceAreas */}
        <div className="relative">

          {/* Content layers on top of background */}
          <div className="relative">

            {/* Hero Section takes full viewport height and extends down */}
            <HeroSection extraBottomSpace={marginOffset} />

            {/* KeyServiceAreas floating centered between sections */}
            <div
              ref={keyServiceRef}
              className="relative z-20 transition-all duration-500"
              style={{
                marginTop: `-${marginOffset}px`,
                marginBottom: `-${marginOffset}px`
              }}
            >
              <KeyServiceAreas onHoverChange={setIsCardHovered} />
            </div>

            {/* Youth Offerings - pass extra top space as prop */}
            <YouthOfferings extraTopSpace={marginOffset} />
          </div>
        </div>

        {/* Organizations Section */}
        <OrganizationsSection />

        {/* Leaders section */}
        <LeadersSection />

        {/* popular courses */}
        <PopularCourses />
        <ServicesSection />

        {/* Leadership and testimonials */}
        <div className="mt-16">
          
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