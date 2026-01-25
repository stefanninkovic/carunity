import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { OffersPage } from './pages/OffersPage';
import { CarDetailPage } from './pages/CarDetailPage';
import { WheelsPage } from './pages/WheelsPage';
import { ProfilePage } from './pages/ProfilePage';
import { UserProfilePage } from './pages/UserProfilePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';
import { EditProfilePage } from './pages/EditProfilePage';
import { CreateOfferPage } from './pages/CreateOfferPage';
import { CreateWheelPage } from './pages/CreateWheelPage';
import { EditWheelPage } from './pages/EditWheelPage';
import { ManageOffersPage } from './pages/ManageOffersPage';
import { ManageWheelsPage } from './pages/ManageWheelsPage';
import { FollowingPage } from './pages/FollowingPage';
import { FollowersPage } from './pages/FollowersPage';
import { FeedPage } from './pages/FeedPage';
import { HelpCenterPage } from './pages/HelpCenterPage';
import { SafetyTipsPage } from './pages/SafetyTipsPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { CookiePolicyPage } from './pages/CookiePolicyPage';
import { AccessibilityPage } from './pages/AccessibilityPage';
import { SitemapPage } from './pages/SitemapPage';
import { LegalNoticePage } from './pages/LegalNoticePage';
import { CarsProvider } from './context/CarsContext';
import { WheelsProvider } from './context/WheelsContext';
import { FollowProvider } from './context/FollowContext';
import { AuthProvider } from './context/AuthContext';
import { ReportProvider } from './context/ReportContext';
import './i18n';
import '../styles/index.css';
import '../styles/slick.css';

function AppContent() {
  const location = useLocation();
  const isWheelsPage = location.pathname === '/wheels';
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="min-h-screen bg-gray-50">
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/offers/:id" element={<CarDetailPage />} />
        <Route path="/wheels" element={<WheelsPage />} />
        <Route path="/user/:userId" element={<UserProfilePage />} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}>
          <Route path="edit" element={<EditProfilePage />} />
          <Route path="create-offer" element={<CreateOfferPage />} />
          <Route path="edit-offer/:id" element={<CreateOfferPage />} />
          <Route path="create-wheel" element={<CreateWheelPage />} />
          <Route path="edit-wheel/:id" element={<EditWheelPage />} />
          <Route path="manage-offers" element={<ManageOffersPage />} />
          <Route path="manage-wheels" element={<ManageWheelsPage />} />
          <Route path="following" element={<FollowingPage />} />
          <Route path="followers" element={<FollowersPage />} />
        </Route>
        <Route path="/feed" element={<ProtectedRoute><FeedPage /></ProtectedRoute>} />
        <Route path="/help-center" element={<HelpCenterPage />} />
        <Route path="/safety-tips" element={<SafetyTipsPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/cookie-policy" element={<CookiePolicyPage />} />
        <Route path="/accessibility" element={<AccessibilityPage />} />
        <Route path="/sitemap" element={<SitemapPage />} />
        <Route path="/legal-notice" element={<LegalNoticePage />} />
      </Routes>
      {!isWheelsPage && !isAuthPage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CarsProvider>
        <WheelsProvider>
          <FollowProvider>
            <ReportProvider>
              <BrowserRouter>
                <AppContent />
              </BrowserRouter>
            </ReportProvider>
          </FollowProvider>
        </WheelsProvider>
      </CarsProvider>
    </AuthProvider>
  );
}