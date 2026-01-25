import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Car, AlertCircle, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const handleGoBack = () => {
    // Check if we have a previous location in state
    const from = (location.state as any)?.from;
    
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
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/profile');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('login.loginFailed'));
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
          <span>{t('login.goBack')}</span>
        </button>

        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Car className="h-12 w-12 text-[#2E7C6D]" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">{t('login.title')}</h2>
          <p className="mt-2 text-gray-600">
            {t('login.dontHaveAccount')}{' '}
            <Link to="/register" className="text-[#2E7C6D] hover:text-[#256B5E] font-medium">
              {t('login.signUp')}
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
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {t('login.email')}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7C6D] focus:border-transparent"
                placeholder={t('login.emailPlaceholder')}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                {t('login.password')}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7C6D] focus:border-transparent"
                placeholder={t('login.passwordPlaceholder')}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#2E7C6D] text-white py-3 rounded-lg font-medium hover:bg-[#256B5E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? t('login.signingIn') : t('login.signIn')}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800 font-medium mb-2">{t('login.demoAccount')}</p>
            <p className="text-sm text-blue-700">{t('login.demoEmail')}</p>
            <p className="text-sm text-blue-700">{t('login.demoPassword')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}