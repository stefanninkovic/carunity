import { Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function PrivacyPolicyPage() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Lock className="h-8 w-8 text-[#2E7C6D]" />
            <h1 className="text-3xl font-bold text-gray-900">{t('privacyPolicy.title')}</h1>
          </div>

          <div className="prose max-w-none text-gray-700">
            <p className="text-sm text-gray-500 mb-6">{t('privacyPolicy.lastUpdated')}</p>

            <p className="text-lg mb-6">
              {t('privacyPolicy.intro')}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('privacyPolicy.section1Title')}</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{t('privacyPolicy.section1Subtitle1')}</h3>
            <p>{t('privacyPolicy.section1SubIntro1')}</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>{t('privacyPolicy.section1Item1')}</li>
              <li>{t('privacyPolicy.section1Item2')}</li>
              <li>{t('privacyPolicy.section1Item3')}</li>
              <li>{t('privacyPolicy.section1Item4')}</li>
              <li>{t('privacyPolicy.section1Item5')}</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{t('privacyPolicy.section1Subtitle2')}</h3>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>{t('privacyPolicy.section1Item6')}</li>
              <li>{t('privacyPolicy.section1Item7')}</li>
              <li>{t('privacyPolicy.section1Item8')}</li>
              <li>{t('privacyPolicy.section1Item9')}</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('privacyPolicy.section2Title')}</h2>
            <p>{t('privacyPolicy.section2Intro')}</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>{t('privacyPolicy.section2Item1')}</li>
              <li>{t('privacyPolicy.section2Item2')}</li>
              <li>{t('privacyPolicy.section2Item3')}</li>
              <li>{t('privacyPolicy.section2Item4')}</li>
              <li>{t('privacyPolicy.section2Item5')}</li>
              <li>{t('privacyPolicy.section2Item6')}</li>
              <li>{t('privacyPolicy.section2Item7')}</li>
              <li>{t('privacyPolicy.section2Item8')}</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('privacyPolicy.section3Title')}</h2>
            <p>{t('privacyPolicy.section3Intro')}</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li><strong>{t('privacyPolicy.section3Item1Label')}</strong> {t('privacyPolicy.section3Item1Text')}</li>
              <li><strong>{t('privacyPolicy.section3Item2Label')}</strong> {t('privacyPolicy.section3Item2Text')}</li>
              <li><strong>{t('privacyPolicy.section3Item3Label')}</strong> {t('privacyPolicy.section3Item3Text')}</li>
              <li><strong>{t('privacyPolicy.section3Item4Label')}</strong> {t('privacyPolicy.section3Item4Text')}</li>
              <li><strong>{t('privacyPolicy.section3Item5Label')}</strong> {t('privacyPolicy.section3Item5Text')}</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('privacyPolicy.section4Title')}</h2>
            <p>
              {t('privacyPolicy.section4Content')}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('privacyPolicy.section5Title')}</h2>
            <p>{t('privacyPolicy.section5Intro')}</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>{t('privacyPolicy.section5Item1')}</li>
              <li>{t('privacyPolicy.section5Item2')}</li>
              <li>{t('privacyPolicy.section5Item3')}</li>
              <li>{t('privacyPolicy.section5Item4')}</li>
              <li>{t('privacyPolicy.section5Item5')}</li>
              <li>{t('privacyPolicy.section5Item6')}</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('privacyPolicy.section6Title')}</h2>
            <p>
              {t('privacyPolicy.section6Content')}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('privacyPolicy.section7Title')}</h2>
            <p>
              {t('privacyPolicy.section7Content')}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('privacyPolicy.section8Title')}</h2>
            <p>
              {t('privacyPolicy.section8Content')}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('privacyPolicy.section9Title')}</h2>
            <p>
              {t('privacyPolicy.section9Content')}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('privacyPolicy.section10Title')}</h2>
            <p>
              {t('privacyPolicy.section10Content')}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('privacyPolicy.section11Title')}</h2>
            <p>
              {t('privacyPolicy.section11Intro')}
            </p>
            <p className="mt-2">
              {t('privacyPolicy.email')}: <a href="mailto:privacy@carunity.ch" className="text-[#2E7C6D] hover:text-[#256B5E]">privacy@carunity.ch</a><br />
              {t('privacyPolicy.phone')}: <a href="tel:+41431234567" className="text-[#2E7C6D] hover:text-[#256B5E]">+41 43 123 45 67</a><br />
              {t('privacyPolicy.address')}: Bahnhofstrasse 123, 8001 Zürich, Switzerland
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
