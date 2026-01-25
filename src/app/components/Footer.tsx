import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">CarUnity</h3>
            <p className="text-sm mb-4">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#A5D6A7] transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#A5D6A7] transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#A5D6A7] transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#A5D6A7] transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-[#A5D6A7] transition-colors">
                  {t('navbar.home')}
                </Link>
              </li>
              <li>
                <Link to="/offers" className="hover:text-[#A5D6A7] transition-colors">
                  {t('footer.browseOffers')}
                </Link>
              </li>
              <li>
                <Link to="/wheels" className="hover:text-[#A5D6A7] transition-colors">
                  {t('navbar.wheels')}
                </Link>
              </li>
              <li>
                <Link to="/feed" className="hover:text-[#A5D6A7] transition-colors">
                  {t('navbar.feed')}
                </Link>
              </li>
              <li>
                <Link to="/profile/create-offer" className="hover:text-[#A5D6A7] transition-colors">
                  {t('footer.sellYourCar')}
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-[#A5D6A7] transition-colors">
                  {t('footer.myProfile')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.support')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/help-center" className="hover:text-[#A5D6A7] transition-colors">
                  {t('footer.helpCenter')}
                </Link>
              </li>
              <li>
                <Link to="/safety-tips" className="hover:text-[#A5D6A7] transition-colors">
                  {t('footer.safetyTips')}
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="hover:text-[#A5D6A7] transition-colors">
                  {t('footer.termsOfService')}
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-[#A5D6A7] transition-colors">
                  {t('footer.privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="hover:text-[#A5D6A7] transition-colors">
                  {t('footer.cookiePolicy')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.contactUs')}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-[#A5D6A7] flex-shrink-0 mt-0.5" />
                <span>{t('footer.address')}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-[#A5D6A7] flex-shrink-0" />
                <a href="tel:+41431234567" className="hover:text-[#A5D6A7] transition-colors">
                  +41 43 123 45 67
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-[#A5D6A7] flex-shrink-0" />
                <a href="mailto:info@carunity.ch" className="hover:text-[#A5D6A7] transition-colors">
                  info@carunity.ch
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              {t('footer.copyright')}
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/accessibility" className="hover:text-[#A5D6A7] transition-colors">
                {t('footer.accessibility')}
              </Link>
              <Link to="/sitemap" className="hover:text-[#A5D6A7] transition-colors">
                {t('footer.sitemap')}
              </Link>
              <Link to="/legal-notice" className="hover:text-[#A5D6A7] transition-colors">
                {t('footer.legalNotice')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}