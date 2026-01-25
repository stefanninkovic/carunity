import { Cookie } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function CookiePolicyPage() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Cookie className="h-8 w-8 text-[#2E7C6D]" />
            <h1 className="text-3xl font-bold text-gray-900">{t('cookiePolicy.title')}</h1>
          </div>

          <div className="prose max-w-none text-gray-700">
            <p className="text-sm text-gray-500 mb-6">{t('cookiePolicy.lastUpdated')}</p>

            <p className="text-lg mb-6">
              {t('cookiePolicy.intro')}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('cookiePolicy.whatAreCookies')}</h2>
            <p>
              {t('cookiePolicy.whatAreCookiesDesc')}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('cookiePolicy.typesTitle')}</h2>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{t('cookiePolicy.type1Title')}</h3>
            <p>
              {t('cookiePolicy.type1Desc')}
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>{t('cookiePolicy.type1Item1')}</li>
              <li>{t('cookiePolicy.type1Item2')}</li>
              <li>{t('cookiePolicy.type1Item3')}</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{t('cookiePolicy.type2Title')}</h3>
            <p>
              {t('cookiePolicy.type2Desc')}
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>{t('cookiePolicy.type2Item1')}</li>
              <li>{t('cookiePolicy.type2Item2')}</li>
              <li>{t('cookiePolicy.type2Item3')}</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{t('cookiePolicy.type3Title')}</h3>
            <p>
              {t('cookiePolicy.type3Desc')}
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>{t('cookiePolicy.type3Item1')}</li>
              <li>{t('cookiePolicy.type3Item2')}</li>
              <li>{t('cookiePolicy.type3Item3')}</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{t('cookiePolicy.type4Title')}</h3>
            <p>
              {t('cookiePolicy.type4Desc')}
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>{t('cookiePolicy.type4Item1')}</li>
              <li>{t('cookiePolicy.type4Item2')}</li>
              <li>{t('cookiePolicy.type4Item3')}</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('cookiePolicy.thirdPartyTitle')}</h2>
            <p>
              {t('cookiePolicy.thirdPartyDesc')}
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>{t('cookiePolicy.thirdPartyItem1')}</li>
              <li>{t('cookiePolicy.thirdPartyItem2')}</li>
              <li>{t('cookiePolicy.thirdPartyItem3')}</li>
              <li>{t('cookiePolicy.thirdPartyItem4')}</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('cookiePolicy.howLongTitle')}</h2>
            <p>
              {t('cookiePolicy.howLongDesc')}
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li><strong>{t('cookiePolicy.sessionLabel')}</strong> {t('cookiePolicy.sessionDesc')}</li>
              <li><strong>{t('cookiePolicy.persistentLabel')}</strong> {t('cookiePolicy.persistentDesc')}</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('cookiePolicy.managingTitle')}</h2>
            <p>
              {t('cookiePolicy.managingDesc')}
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{t('cookiePolicy.browserSettingsTitle')}</h3>
            <p>
              {t('cookiePolicy.browserSettingsDesc')}
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>{t('cookiePolicy.browserOption1')}</li>
              <li>{t('cookiePolicy.browserOption2')}</li>
              <li>{t('cookiePolicy.browserOption3')}</li>
              <li>{t('cookiePolicy.browserOption4')}</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{t('cookiePolicy.preferenceCenter')}</h3>
            <p>
              {t('cookiePolicy.preferenceCenterDesc')}
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
              <p className="text-yellow-800">
                <strong>{t('cookiePolicy.noteLabel')}</strong> {t('cookiePolicy.noteText')}
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('cookiePolicy.dntTitle')}</h2>
            <p>
              {t('cookiePolicy.dntDesc')}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('cookiePolicy.changesTitle')}</h2>
            <p>
              {t('cookiePolicy.changesDesc')}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('cookiePolicy.contactTitle')}</h2>
            <p>
              {t('cookiePolicy.contactIntro')}
            </p>
            <p className="mt-2">
              {t('cookiePolicy.email')}: <a href="mailto:privacy@carunity.ch" className="text-[#2E7C6D] hover:text-[#256B5E]">privacy@carunity.ch</a><br />
              {t('cookiePolicy.phone')}: <a href="tel:+41431234567" className="text-[#2E7C6D] hover:text-[#256B5E]">+41 43 123 45 67</a><br />
              {t('cookiePolicy.address')}: Bahnhofstrasse 123, 8001 Zürich, Switzerland
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
