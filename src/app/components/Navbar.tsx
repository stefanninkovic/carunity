import { Link, useNavigate } from 'react-router-dom';
import { Car, User, Menu, Users } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useAuth } from '../context/AuthContext';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-emerald-600" />
              <span className="text-2xl font-bold text-gray-900">CarUnity</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-emerald-600 transition-colors"
            >
              {t('navbar.home')}
            </Link>
            <Link
              to="/offers"
              className="text-gray-700 hover:text-emerald-600 transition-colors"
            >
              {t('navbar.offers')}
            </Link>
            <Link
              to="/wheels"
              className="text-gray-700 hover:text-emerald-600 transition-colors"
            >
              {t('navbar.wheels')}
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/feed"
                  className="flex items-center space-x-1 text-gray-700 hover:text-emerald-600 transition-colors"
                >
                  <Users className="h-4 w-4" />
                  <span>Feed</span>
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center space-x-1 text-gray-700 hover:text-emerald-600 transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>{t('navbar.profile')}</span>
                </Link>
              </>
            )}
            {!isAuthenticated && (
              <Link
                to="/login"
                className="text-gray-700 hover:text-emerald-600 transition-colors"
              >
                Login
              </Link>
            )}
            <LanguageSwitcher />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('navbar.home')}
            </Link>
            <Link
              to="/offers"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('navbar.offers')}
            </Link>
            <Link
              to="/wheels"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('navbar.wheels')}
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/feed"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Feed
                </Link>
                <Link
                  to="/profile"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('navbar.profile')}
                </Link>
              </>
            )}
            {!isAuthenticated && (
              <Link
                to="/login"
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
            <div className="px-3 py-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}