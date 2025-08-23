import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { useTheme } from './contexts/ThemeContext';
import { getThemeColor } from './config/colors';
import AnimatedBackground from './components/ui/AnimatedBackground';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/about/AboutPage';
import Leadership from './pages/about/Leadership';
import History from './pages/about/History';
import MissionVision from './pages/about/MissionVision';

// Official NYSC Structure Pages
import DirectorsPage from './pages/directors/DirectorsPage';
import BoardOfMembersPage from './pages/directors/BoardOfMembersPage';
import ChairmanPage from './pages/directors/ChairmanPage';
import DirectorsListPage from './pages/directors/DirectorsListPage';
import DeputyDirectorsPage from './pages/directors/DeputyDirectorsPage';
import AssistantDirectorsPage from './pages/directors/AssistantDirectorsPage';
import ProvincialDirectorsPage from './pages/directors/ProvincialDirectorsPage';
import ProvincialAssistantDirectorsPage from './pages/directors/ProvincialAssistantDirectorsPage';
import DivisionsPage from './pages/divisions/DivisionsPage';
import FinancePage from './pages/divisions/FinancePage';
import LegalInvestigationPage from './pages/divisions/LegalInvestigationPage';
import YouthAwardsPage from './pages/divisions/YouthAwardsPage';
import InternalAuditPage from './pages/divisions/InternalAuditPage';
import ExaminationAssessmentPage from './pages/divisions/ExaminationAssessmentPage';
import SpecialProjectsPage from './pages/divisions/SpecialProjectsPage';
import ServicesPage from './pages/services/ServicesPage';
import StudentPage from './pages/student/StudentPage';
import OurCentersPage from './pages/our-centers/OurCentersPage';
import DownloadsPage from './pages/downloads/DownloadsPage';

// Legacy Routes (keeping for now)
import ProgramsPage from './pages/programs/ProgramsPage';
import YouthAwards from './pages/programs/YouthAwards';
import SkillDevelopment from './pages/programs/SkillDevelopment';
import CulturalPrograms from './pages/programs/CulturalPrograms';
import YouthParliament from './pages/programs/YouthParliament';
import FindCourses from './pages/programs/FindCourses';
import YouthClubs from './pages/services/YouthClubs';
import NewsEventsPage from './pages/news-events/NewsEventsPage';
import LatestNews from './pages/news-events/LatestNews';
import EventsCalendar from './pages/news-events/EventsCalendar';
import Achievements from './pages/news-events/Achievements';
import PhotoGallery from './pages/news-events/PhotoGallery';
import ResourcesPage from './pages/resources/ResourcesPage';
import Downloads from './pages/resources/Downloads';
import StudentPortal from './pages/resources/StudentPortal';
import ContactPage from './pages/contact/ContactPage';

const AppContent = () => {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen w-full max-w-full overflow-x-hidden relative transition-colors duration-300 ${getThemeColor('background.primary', isDark)
      }`}>
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-full overflow-x-hidden">
        <Header />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          {/* Official NYSC Structure Routes */}
          <Route path="/directors" element={<DirectorsPage />} />
          <Route path="/directors/board-of-members" element={<BoardOfMembersPage />} />
          <Route path="/directors/chairman" element={<ChairmanPage />} />
          <Route path="/directors/directors" element={<DirectorsListPage />} />
          <Route path="/directors/deputy-directors" element={<DeputyDirectorsPage />} />
          <Route path="/directors/assistant-directors" element={<AssistantDirectorsPage />} />
          <Route path="/directors/provincial-directors" element={<ProvincialDirectorsPage />} />
          <Route path="/directors/provincial-assistant-directors" element={<ProvincialAssistantDirectorsPage />} />
          <Route path="/divisions" element={<DivisionsPage />} />
          <Route path="/divisions/finance" element={<FinancePage />} />
          <Route path="/divisions/legal-investigation" element={<LegalInvestigationPage />} />
          <Route path="/divisions/youth-awards" element={<YouthAwardsPage />} />
          <Route path="/divisions/internal-audit" element={<InternalAuditPage />} />
          <Route path="/divisions/examination-assessment" element={<ExaminationAssessmentPage />} />
          <Route path="/divisions/special-projects" element={<SpecialProjectsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/student" element={<StudentPage />} />
          <Route path="/our-centers" element={<OurCentersPage />} />
          <Route path="/downloads" element={<DownloadsPage />} />
          
          {/* About Routes (Legacy) */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about/leadership" element={<Leadership />} />
          <Route path="/about/history" element={<History />} />
          <Route path="/about/mission-vision" element={<MissionVision />} />
          
          {/* Programs Routes (Legacy) */}
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/programs/youth-awards" element={<YouthAwards />} />
          <Route path="/programs/skill-development" element={<SkillDevelopment />} />
          <Route path="/programs/cultural-programs" element={<CulturalPrograms />} />
          <Route path="/programs/youth-parliament" element={<YouthParliament />} />
          <Route path="/programs/find-courses" element={<FindCourses />} />
          
          {/* Legacy Services Routes */}
          <Route path="/services/youth-clubs" element={<YouthClubs />} />
          
          {/* News & Events Routes (Legacy) */}
          <Route path="/news-events" element={<NewsEventsPage />} />
          <Route path="/news-events/latest-news" element={<LatestNews />} />
          <Route path="/news-events/events-calendar" element={<EventsCalendar />} />
          <Route path="/news-events/achievements" element={<Achievements />} />
          <Route path="/news-events/photo-gallery" element={<PhotoGallery />} />
          
          {/* Resources Routes (Legacy) */}
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/resources/downloads" element={<Downloads />} />
          <Route path="/resources/student-portal" element={<StudentPortal />} />
          
          {/* Contact Routes */}
          <Route path="/contact" element={<ContactPage />} />
        </Routes>

        <Footer />
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <AppContent />
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;