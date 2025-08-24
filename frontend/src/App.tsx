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

// Official NYSC Structure Pages
import DirectorsPage from './pages/directors/DirectorsPage';
import BoardOfMembersPage from './pages/directors/BoardOfMembersPage';
import ChairmanPage from './pages/directors/ChairmanPage';
import DirectorsListPage from './pages/directors/DirectorsListPage';
import DeputyDirectorsPage from './pages/directors/DeputyDirectorsPage';
import AssistantDirectorsPage from './pages/directors/AssistantDirectorsPage';
import ProvincialDirectorsPage from './pages/directors/ProvincialDirectorsPage';
import ProvincialAssistantDirectorsPage from './pages/directors/ProvincialAssistantDirectorsPage';
// Division
import DivisionsPage from './pages/divisions/DivisionsPage';
import FinancePage from './pages/divisions/FinancePage';
import LegalInvestigationPage from './pages/divisions/LegalInvestigationPage';
import YouthAwardsPage from './pages/divisions/YouthAwardsPage';
import InternalAuditPage from './pages/divisions/InternalAuditPage';
import ExaminationAssessmentPage from './pages/divisions/ExaminationAssessmentPage';
import SpecialProjectsPage from './pages/divisions/SpecialProjectsPage';
// Services
import ServicesPage from './pages/services/ServicesPage';
import YouthClubs from './pages/services/YouthClubs';
import YouthServicesLimited from './pages/services/YouthServicesLimited';
import YouthParliament from './pages/services/YouthParliament';
import YouthDancingTeam from './pages/services/YouthDancingTeam';
import YouthMusicBand from './pages/services/YouthMusicBand';
import YouthDramaTeam from './pages/services/YouthDramaTeam';
// News & Events Pages
import NewsEventsPage from './pages/news-events/NewsEventsPage';
import LatestNews from './pages/news-events/LatestNews';
import NewsArchive from './pages/news-events/NewsArchive';
import PressReleases from './pages/news-events/PressReleases';
import UpcomingEvents from './pages/news-events/UpcomingEvents';
import EventsCalendar from './pages/news-events/EventsCalendar';
import Workshops from './pages/news-events/Workshops';
import Competitions from './pages/news-events/Competitions';
import Gallery from './pages/news-events/Gallery';
// Resources Pages
import ResourcesPage from './pages/resources/ResourcesPage';
import AboutNYSC from './pages/resources/AboutNYSC';
import ContactUs from './pages/resources/ContactUs';
import AnnualReports from './pages/resources/AnnualReports';
import ApplicationForms from './pages/resources/ApplicationForms';
import PolicyDocuments from './pages/resources/PolicyDocuments';
import MediaResources from './pages/resources/MediaResources';
// Students
import StudentPage from './pages/student/StudentPage';
import StudentPortal from './pages/student/StudentPortal';
import FindCourses from './pages/student/FindCourses';
// Our Centers
import OurCentersPage from './pages/our-centers/OurCentersPage';
import TrainingCenters from './pages/our-centers/TrainingCenters';
import YouthCenters from './pages/our-centers/YouthCenters';
import DistrictOffices from './pages/our-centers/DistrictOffices';
import CenterLocator from './pages/our-centers/CenterLocator';





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

          {/* Divisions Routes */}
          <Route path="/divisions" element={<DivisionsPage />} />
          <Route path="/divisions/finance" element={<FinancePage />} />
          <Route path="/divisions/legal-investigation" element={<LegalInvestigationPage />} />
          <Route path="/divisions/youth-awards" element={<YouthAwardsPage />} />
          <Route path="/divisions/internal-audit" element={<InternalAuditPage />} />
          <Route path="/divisions/examination-assessment" element={<ExaminationAssessmentPage />} />
          <Route path="/divisions/special-projects" element={<SpecialProjectsPage />} />

          {/* Services Routes */}
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/youth-clubs" element={<YouthClubs />} />
          <Route path="/services/youth-services-limited" element={<YouthServicesLimited />} />
          <Route path="/services/YouthParliament" element={<YouthParliament />} />
          <Route path="/services/youth-dancing-team" element={<YouthDancingTeam />} />
          <Route path="/services/youth-music-band" element={<YouthMusicBand />} />
          <Route path="/services/youth-drama-team" element={<YouthDramaTeam />} />

          {/* News & Events Routes */}
          <Route path="/news-events" element={<NewsEventsPage />} />
          <Route path="/news-events/latest-news" element={<LatestNews />} />
          <Route path="/news-events/news-archive" element={<NewsArchive />} />
          <Route path="/news-events/press-releases" element={<PressReleases />} />
          <Route path="/events/upcoming-events" element={<UpcomingEvents />} />
          <Route path="/events/events-calendar" element={<EventsCalendar />} />
          <Route path="/events/workshops" element={<Workshops />} />
          <Route path="/events/competitions" element={<Competitions />} />
          <Route path="/news-events/gallery" element={<Gallery />} />


          {/* Resources */}
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/about" element={<AboutNYSC />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/downloads/annual-reports" element={<AnnualReports />} />
          <Route path="/downloads/application-forms" element={<ApplicationForms />} />
          <Route path="/downloads/policy-documents" element={<PolicyDocuments />} />
          <Route path="/downloads/media-resources" element={<MediaResources />} />

          {/* Student */}
          <Route path="/student" element={<StudentPage />} />
          <Route path="/student/FindCourses" element={<FindCourses />} />
          <Route path="/student/StudentPortal" element={<StudentPortal />} />

          {/* Our Centers Routes */}
          <Route path="/our-centers" element={<OurCentersPage />} />
          <Route path="/our-centers/training-centers" element={<TrainingCenters />} />
          <Route path="/our-centers/youth-centers" element={<YouthCenters />} />
          <Route path="/our-centers/district-offices" element={<DistrictOffices />} />
          <Route path="/our-centers/center-locator" element={<CenterLocator />} />
        
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