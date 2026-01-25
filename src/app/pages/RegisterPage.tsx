import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Car, AlertCircle, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const routerLocation = useLocation();
  const { t } = useTranslation();

  const handleGoBack = () => {
    // Check if we have a previous location in state
    const from = (routerLocation.state as any)?.from;
    
    if (from) {
      // If redirected from a protected route, go to that route
      navigate(from);
    } else if (window.history.length > 2) {
      // If we have history, go back
      navigate(-1);
    } else {
      // Otherwise, go to homepage
      navigate('/');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError(t('register.passwordMismatch') || 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError(t('register.passwordLength') || 'Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);

    try {
      await register(name, email, password, phone, location);
      navigate('/profile');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('register.registrationFailed') || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <button
          onClick={handleGoBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-[#2E7C6D] transition-colors mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>{t('register.goBack')}</span>
        </button>

        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Car className="h-12 w-12 text-[#2E7C6D]" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">{t('register.title')}</h2>
          <p className="mt-2 text-gray-600">
            {t('register.haveAccount')}{' '}
            <Link to="/login" className="text-[#2E7C6D] hover:text-[#256B5E] font-medium">
              {t('register.signIn')}
            </Link>
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                {t('register.name')}
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7C6D] focus:border-transparent"
                placeholder={t('register.namePlaceholder')}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {t('register.email')}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7C6D] focus:border-transparent"
                placeholder={t('register.emailPlaceholder')}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                {t('register.password')}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7C6D] focus:border-transparent"
                placeholder={t('register.passwordPlaceholder')}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                {t('register.confirmPassword')}
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7C6D] focus:border-transparent"
                placeholder={t('register.confirmPasswordPlaceholder')}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                {t('register.phone')}
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7C6D] focus:border-transparent"
                placeholder={t('register.phonePlaceholder')}
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                {t('register.location')}
              </label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7C6D] focus:border-transparent"
                placeholder={t('register.locationPlaceholder')}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#2E7C6D] text-white py-3 rounded-lg font-medium hover:bg-[#256B5E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? t('register.signingUp') : t('register.signUp')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}