import { Accessibility } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function AccessibilityPage() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Accessibility className="h-8 w-8 text-[#2E7C6D]" />
            <h1 className="text-3xl font-bold text-gray-900">{t('accessibility.title')}</h1>
          </div>

          <div className="prose max-w-none text-gray-700">
            <p className="text-sm text-gray-500 mb-6">{t('accessibility.lastUpdated')}</p>

            <p className="text-lg mb-6">
              {t('accessibility.intro')}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('accessibility.commitmentTitle')}</h2>
            <p>
              {t('accessibility.commitmentDesc')}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('accessibility.featuresTitle')}</h2>
            <p>{t('accessibility.featuresDesc')}</p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{t('accessibility.navTitle')}</h3>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>{t('accessibility.navItem1')}</li>
              <li>{t('accessibility.navItem2')}</li>
              <li>{t('accessibility.navItem3')}</li>
              <li>{t('accessibility.navItem4')}</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{t('accessibility.visualTitle')}</h3>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>{t('accessibility.visualItem1')}</li>
              <li>{t('accessibility.visualItem2')}</li>
              <li>{t('accessibility.visualItem3')}</li>
              <li>{t('accessibility.visualItem4')}</li>
              <li>{t('accessibility.visualItem5')}</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{t('accessibility.keyboardTitle')}</h3>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>{t('accessibility.keyboardItem1')}</li>
              <li>{t('accessibility.keyboardItem2')}</li>
              <li>{t('accessibility.keyboardItem3')}</li>
              <li>{t('accessibility.keyboardItem4')}</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{t('accessibility.screenReaderTitle')}</h3>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>{t('accessibility.screenReaderItem1')}</li>
              <li>{t('accessibility.screenReaderItem2')}</li>
              <li>{t('accessibility.screenReaderItem3')}</li>
              <li>{t('accessibility.screenReaderItem4')}</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{t('accessibility.multimediaTitle')}</h3>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>{t('accessibility.multimediaItem1')}</li>
              <li>{t('accessibility.multimediaItem2')}</li>
              <li>{t('accessibility.multimediaItem3')}</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('accessibility.limitationsTitle')}</h2>
            <p>
              {t('accessibility.limitationsDesc')}
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>{t('accessibility.limitationItem1')}</li>
              <li>{t('accessibility.limitationItem2')}</li>
              <li>{t('accessibility.limitationItem3')}</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('accessibility.assistiveTitle')}</h2>
            <p>
              {t('accessibility.assistiveDesc')}
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>{t('accessibility.assistiveItem1')}</li>
              <li>{t('accessibility.assistiveItem2')}</li>
              <li>{t('accessibility.assistiveItem3')}</li>
              <li>{t('accessibility.assistiveItem4')}</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('accessibility.browserTitle')}</h2>
            <p>
              {t('accessibility.browserDesc')}
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Google Chrome</li>
              <li>Mozilla Firefox</li>
              <li>Apple Safari</li>
              <li>Microsoft Edge</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('accessibility.feedbackTitle')}</h2>
            <p>
              {t('accessibility.feedbackDesc')}
            </p>
            <p className="mt-4">
              {t('accessibility.email')}: <a href="mailto:accessibility@carunity.ch" className="text-[#2E7C6D] hover:text-[#256B5E]">accessibility@carunity.ch</a><br />
              {t('accessibility.phone')}: <a href="tel:+41431234567" className="text-[#2E7C6D] hover:text-[#256B5E]">+41 43 123 45 67</a><br />
              {t('accessibility.address')}: Bahnhofstrasse 123, 8001 Zürich, Switzerland
            </p>

            <p className="mt-4">
              {t('accessibility.responseTime')}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('accessibility.ongoingTitle')}</h2>
            <p>
              {t('accessibility.ongoingDesc')}
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>{t('accessibility.ongoingItem1')}</li>
              <li>{t('accessibility.ongoingItem2')}</li>
              <li>{t('accessibility.ongoingItem3')}</li>
              <li>{t('accessibility.ongoingItem4')}</li>
              <li>{t('accessibility.ongoingItem5')}</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('accessibility.thirdPartyTitle')}</h2>
            <p>
              {t('accessibility.thirdPartyDesc')}
            </p>

            <div className="bg-[#E8F5E9] border-l-4 border-[#2E7C6D] p-4 mt-6">
              <p className="text-gray-800">
                <strong>{t('accessibility.promiseLabel')}</strong> {t('accessibility.promiseText')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
