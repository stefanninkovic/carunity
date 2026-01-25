import { FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function TermsOfServicePage() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center space-x-3 mb-6">
            <FileText className="h-8 w-8 text-[#2E7C6D]" />
            <h1 className="text-3xl font-bold text-gray-900">{t('termsOfService.title')}</h1>
          </div>

          <div className="prose max-w-none text-gray-700">
            <p className="text-sm text-gray-500 mb-6">{t('termsOfService.lastUpdated')}</p>

            <p className="text-lg mb-6">
              {t('termsOfService.intro')}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('termsOfService.section1Title')}</h2>
            <p>
              {t('termsOfService.section1Content')}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('termsOfService.section2Title')}</h2>
            <p>
              {t('termsOfService.section2Intro')}
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>{t('termsOfService.section2Item1')}</li>
              <li>{t('termsOfService.section2Item2')}</li>
              <li>{t('termsOfService.section2Item3')}</li>
              <li>{t('termsOfService.section2Item4')}</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('termsOfService.section3Title')}</h2>
            <p>
              {t('termsOfService.section3Intro')}
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>{t('termsOfService.section3Item1')}</li>
              <li>{t('termsOfService.section3Item2')}</li>
              <li>{t('termsOfService.section3Item3')}</li>
              <li>{t('termsOfService.section3Item4')}</li>
              <li>{t('termsOfService.section3Item5')}</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('termsOfService.section4Title')}</h2>
            <p>
              {t('termsOfService.section4Intro')}
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>{t('termsOfService.section4Item1')}</li>
              <li>{t('termsOfService.section4Item2')}</li>
              <li>{t('termsOfService.section4Item3')}</li>
              <li>{t('termsOfService.section4Item4')}</li>
              <li>{t('termsOfService.section4Item5')}</li>
              <li>{t('termsOfService.section4Item6')}</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('termsOfService.section5Title')}</h2>
            <p>
              {t('termsOfService.section5Content')}
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>{t('termsOfService.section5Item1')}</li>
              <li>{t('termsOfService.section5Item2')}</li>
              <li>{t('termsOfService.section5Item3')}</li>
              <li>{t('termsOfService.section5Item4')}</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('termsOfService.section6Title')}</h2>
            <p>
              {t('termsOfService.section6Content')}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('termsOfService.section7Title')}</h2>
            <p>
              {t('termsOfService.section7Intro')}
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>{t('termsOfService.section7Item1')}</li>
              <li>{t('termsOfService.section7Item2')}</li>
              <li>{t('termsOfService.section7Item3')}</li>
              <li>{t('termsOfService.section7Item4')}</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('termsOfService.section8Title')}</h2>
            <p>
              {t('termsOfService.section8Content')}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('termsOfService.section9Title')}</h2>
            <p>
              {t('termsOfService.section9Content')}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('termsOfService.section10Title')}</h2>
            <p>
              {t('termsOfService.section10Content')}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('termsOfService.section11Title')}</h2>
            <p>
              {t('termsOfService.section11Intro')}
            </p>
            <p className="mt-2">
              {t('termsOfService.email')}: <a href="mailto:legal@carunity.ch" className="text-[#2E7C6D] hover:text-[#256B5E]">legal@carunity.ch</a><br />
              {t('termsOfService.phone')}: <a href="tel:+41431234567" className="text-[#2E7C6D] hover:text-[#256B5E]">+41 43 123 45 67</a><br />
              {t('termsOfService.address')}: Bahnhofstrasse 123, 8001 Zürich, Switzerland
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}