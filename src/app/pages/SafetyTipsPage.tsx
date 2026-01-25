import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function SafetyTipsPage() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="h-8 w-8 text-[#2E7C6D]" />
            <h1 className="text-3xl font-bold text-gray-900">{t('safetyTips.title')}</h1>
          </div>

          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              {t('safetyTips.intro')}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('safetyTips.forBuyers')}</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-[#2E7C6D] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">{t('safetyTips.buyer1Title')}</h3>
                  <p className="text-gray-700">{t('safetyTips.buyer1Desc')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-[#2E7C6D] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">{t('safetyTips.buyer2Title')}</h3>
                  <p className="text-gray-700">{t('safetyTips.buyer2Desc')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-[#2E7C6D] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">{t('safetyTips.buyer3Title')}</h3>
                  <p className="text-gray-700">{t('safetyTips.buyer3Desc')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-[#2E7C6D] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">{t('safetyTips.buyer4Title')}</h3>
                  <p className="text-gray-700">{t('safetyTips.buyer4Desc')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-[#2E7C6D] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">{t('safetyTips.buyer5Title')}</h3>
                  <p className="text-gray-700">{t('safetyTips.buyer5Desc')}</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('safetyTips.forSellers')}</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-[#2E7C6D] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">{t('safetyTips.seller1Title')}</h3>
                  <p className="text-gray-700">{t('safetyTips.seller1Desc')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-[#2E7C6D] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">{t('safetyTips.seller2Title')}</h3>
                  <p className="text-gray-700">{t('safetyTips.seller2Desc')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-[#2E7C6D] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">{t('safetyTips.seller3Title')}</h3>
                  <p className="text-gray-700">{t('safetyTips.seller3Desc')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-[#2E7C6D] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">{t('safetyTips.seller4Title')}</h3>
                  <p className="text-gray-700">{t('safetyTips.seller4Desc')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-[#2E7C6D] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">{t('safetyTips.seller5Title')}</h3>
                  <p className="text-gray-700">{t('safetyTips.seller5Desc')}</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-8">
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-900 mb-2">{t('safetyTips.redFlagsTitle')}</h3>
                  <ul className="list-disc list-inside text-yellow-800 space-y-1">
                    <li>{t('safetyTips.redFlag1')}</li>
                    <li>{t('safetyTips.redFlag2')}</li>
                    <li>{t('safetyTips.redFlag3')}</li>
                    <li>{t('safetyTips.redFlag4')}</li>
                    <li>{t('safetyTips.redFlag5')}</li>
                    <li>{t('safetyTips.redFlag6')}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}