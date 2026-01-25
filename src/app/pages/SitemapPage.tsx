import { Link } from 'react-router-dom';
import { Map, Home, Car, Video, User, FileText, Shield, Lock, Cookie, Accessibility as AccessibilityIcon, Scale } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function SitemapPage() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Map className="h-8 w-8 text-[#2E7C6D]" />
            <h1 className="text-3xl font-bold text-gray-900">{t('sitemap.title')}</h1>
          </div>

          <p className="text-gray-700 mb-8">
            {t('sitemap.intro')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Main Pages */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Home className="h-6 w-6 text-[#2E7C6D]" />
                <h2 className="text-xl font-semibold text-gray-900">{t('sitemap.mainPages')}</h2>
              </div>
              <ul className="space-y-2 ml-8">
                <li>
                  <Link to="/" className="text-[#2E7C6D] hover:text-[#256B5E] hover:underline">
                    {t('navbar.home')}
                  </Link>
                </li>
                <li>
                  <Link to="/offers" className="text-[#2E7C6D] hover:text-[#256B5E] hover:underline">
                    {t('footer.browseOffers')}
                  </Link>
                </li>
                <li>
                  <Link to="/wheels" className="text-[#2E7C6D] hover:text-[#256B5E] hover:underline">
                    {t('sitemap.wheelsVideo')}
                  </Link>
                </li>
                <li>
                  <Link to="/feed" className="text-[#2E7C6D] hover:text-[#256B5E] hover:underline">
                    {t('navbar.feed')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* User Pages */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <User className="h-6 w-6 text-[#2E7C6D]" />
                <h2 className="text-xl font-semibold text-gray-900">{t('sitemap.userPages')}</h2>
              </div>
              <ul className="space-y-2 ml-8">
                <li>
                  <Link to="/profile" className="text-[#2E7C6D] hover:text-[#256B5E] hover:underline">
                    {t('footer.myProfile')}
                  </Link>
                </li>
                <li>
                  <Link to="/profile/edit" className="text-[#2E7C6D] hover:text-[#256B5E] hover:underline">
                    {t('editProfile.title')}
                  </Link>
                </li>
                <li>
                  <Link to="/profile/create-offer" className="text-[#2E7C6D] hover:text-[#256B5E] hover:underline">
                    {t('sitemap.createOffer')}
                  </Link>
                </li>
                <li>
                  <Link to="/profile/manage-offers" className="text-[#2E7C6D] hover:text-[#256B5E] hover:underline">
                    {t('sitemap.manageOffers')}
                  </Link>
                </li>
                <li>
                  <Link to="/profile/create-wheel" className="text-[#2E7C6D] hover:text-[#256B5E] hover:underline">
                    {t('sitemap.createWheel')}
                  </Link>
                </li>
                <li>
                  <Link to="/profile/manage-wheels" className="text-[#2E7C6D] hover:text-[#256B5E] hover:underline">
                    {t('sitemap.manageWheels')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support & Help */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="h-6 w-6 text-[#2E7C6D]" />
                <h2 className="text-xl font-semibold text-gray-900">{t('sitemap.supportHelp')}</h2>
              </div>
              <ul className="space-y-2 ml-8">
                <li>
                  <Link to="/help-center" className="text-[#2E7C6D] hover:text-[#256B5E] hover:underline">
                    {t('footer.helpCenter')}
                  </Link>
                </li>
                <li>
                  <Link to="/safety-tips" className="text-[#2E7C6D] hover:text-[#256B5E] hover:underline">
                    {t('footer.safetyTips')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal & Privacy */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Scale className="h-6 w-6 text-[#2E7C6D]" />
                <h2 className="text-xl font-semibold text-gray-900">{t('sitemap.legalPrivacy')}</h2>
              </div>
              <ul className="space-y-2 ml-8">
                <li>
                  <Link to="/terms-of-service" className="text-[#2E7C6D] hover:text-[#256B5E] hover:underline">
                    {t('footer.termsOfService')}
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy" className="text-[#2E7C6D] hover:text-[#256B5E] hover:underline">
                    {t('footer.privacyPolicy')}
                  </Link>
                </li>
                <li>
                  <Link to="/cookie-policy" className="text-[#2E7C6D] hover:text-[#256B5E] hover:underline">
                    {t('footer.cookiePolicy')}
                  </Link>
                </li>
                <li>
                  <Link to="/legal-notice" className="text-[#2E7C6D] hover:text-[#256B5E] hover:underline">
                    {t('footer.legalNotice')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Accessibility */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <AccessibilityIcon className="h-6 w-6 text-[#2E7C6D]" />
                <h2 className="text-xl font-semibold text-gray-900">{t('footer.accessibility')}</h2>
              </div>
              <ul className="space-y-2 ml-8">
                <li>
                  <Link to="/accessibility" className="text-[#2E7C6D] hover:text-[#256B5E] hover:underline">
                    {t('sitemap.accessibilityStatement')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('sitemap.contactInfo')}</h2>
            <div className="text-gray-700 space-y-2">
              <p>
                <strong>{t('sitemap.emailLabel')}</strong>{' '}
                <a href="mailto:info@carunity.ch" className="text-[#2E7C6D] hover:text-[#256B5E]">
                  info@carunity.ch
                </a>
              </p>
              <p>
                <strong>{t('sitemap.phoneLabel')}</strong>{' '}
                <a href="tel:+41431234567" className="text-[#2E7C6D] hover:text-[#256B5E]">
                  +41 43 123 45 67
                </a>
              </p>
              <p>
                <strong>{t('sitemap.addressLabel')}</strong> Bahnhofstrasse 123, 8001 Zürich, Switzerland
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
