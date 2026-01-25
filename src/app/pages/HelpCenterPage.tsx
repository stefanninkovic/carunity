import { HelpCircle, Mail, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function HelpCenterPage() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center space-x-3 mb-6">
            <HelpCircle className="h-8 w-8 text-[#2E7C6D]" />
            <h1 className="text-3xl font-bold text-gray-900">{t('helpCenter.title')}</h1>
          </div>

          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              {t('helpCenter.intro')}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('helpCenter.faqTitle')}</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('helpCenter.q1')}</h3>
                <p className="text-gray-700">
                  {t('helpCenter.a1')}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('helpCenter.q2')}</h3>
                <p className="text-gray-700">
                  {t('helpCenter.a2')}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('helpCenter.q3')}</h3>
                <p className="text-gray-700">
                  {t('helpCenter.a3')}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('helpCenter.q4')}</h3>
                <p className="text-gray-700">
                  {t('helpCenter.a4')}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('helpCenter.q5')}</h3>
                <p className="text-gray-700">
                  {t('helpCenter.a5')}
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('helpCenter.needMoreHelp')}</h2>
            <div className="bg-gray-50 rounded-lg p-6 mt-4">
              <p className="text-gray-700 mb-4">
                {t('helpCenter.supportMessage')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="mailto:info@carunity.ch" 
                  className="flex items-center space-x-2 text-[#2E7C6D] hover:text-[#256B5E] transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  <span>info@carunity.ch</span>
                </a>
                <a 
                  href="tel:+41431234567" 
                  className="flex items-center space-x-2 text-[#2E7C6D] hover:text-[#256B5E] transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  <span>+41 43 123 45 67</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}