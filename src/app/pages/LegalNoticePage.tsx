import { Scale } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function LegalNoticePage() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Scale className="h-8 w-8 text-[#2E7C6D]" />
            <h1 className="text-3xl font-bold text-gray-900">{t('legalNotice.title')}</h1>
          </div>

          <div className="prose max-w-none text-gray-700">
            <p className="text-sm text-gray-500 mb-6">{t('legalNotice.lastUpdated')}</p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('legalNotice.companyInfoTitle')}</h2>
            <p>
              <strong>{t('legalNotice.companyName')}</strong> CarUnity GmbH<br />
              <strong>{t('legalNotice.legalForm')}</strong> {t('legalNotice.legalFormValue')}<br />
              <strong>{t('legalNotice.registrationNumber')}</strong> CHE-123.456.789<br />
              <strong>{t('legalNotice.vatNumber')}</strong> CHE-123.456.789 MWST<br />
              <strong>{t('legalNotice.registeredOffice')}</strong> Bahnhofstrasse 123, 8001 Zürich, Switzerland
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('legalNotice.contactTitle')}</h2>
            <p>
              <strong>{t('legalNotice.emailLabel')}</strong> <a href="mailto:info@carunity.ch" className="text-[#2E7C6D] hover:text-[#256B5E]">info@carunity.ch</a><br />
              <strong>{t('legalNotice.phoneLabel')}</strong> <a href="tel:+41431234567" className="text-[#2E7C6D] hover:text-[#256B5E]">+41 43 123 45 67</a><br />
              <strong>{t('legalNotice.websiteLabel')}</strong> www.carunity.ch
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('legalNotice.managementTitle')}</h2>
            <p>
              <strong>{t('legalNotice.managingDirector')}</strong> Max Müller<br />
              <strong>{t('legalNotice.commercialRegister')}</strong> {t('legalNotice.commercialRegisterValue')}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('legalNotice.supervisoryTitle')}</h2>
            <p>
              <strong>{t('legalNotice.authority')}</strong> {t('legalNotice.authorityValue')}<br />
              <strong>{t('legalNotice.addressLabel')}</strong> Bundeshaus Ost, 3003 Bern, Switzerland
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('legalNotice.liabilityContentTitle')}</h2>
            <p>
              {t('legalNotice.liabilityContentPara1')}
            </p>
            <p className="mt-4">
              {t('legalNotice.liabilityContentPara2')}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('legalNotice.liabilityLinksTitle')}</h2>
            <p>
              {t('legalNotice.liabilityLinksPara1')}
            </p>
            <p className="mt-4">
              {t('legalNotice.liabilityLinksPara2')}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('legalNotice.copyrightTitle')}</h2>
            <p>
              {t('legalNotice.copyrightPara1')}
            </p>
            <p className="mt-4">
              {t('legalNotice.copyrightPara2')}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('legalNotice.userContentTitle')}</h2>
            <p>
              {t('legalNotice.userContentPara1')}
            </p>
            <p className="mt-4">
              {t('legalNotice.userContentPara2')}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('legalNotice.dataProtectionTitle')}</h2>
            <p>
              {t('legalNotice.dataProtectionPara1')}
            </p>
            <p className="mt-4">
              {t('legalNotice.dataProtectionPara2')}
            </p>
            <p className="mt-4">
              {t('legalNotice.dataProtectionPara3')}{' '}
              <a href="/privacy-policy" className="text-[#2E7C6D] hover:text-[#256B5E]">
                {t('footer.privacyPolicy')}
              </a>.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('legalNotice.disputeTitle')}</h2>
            <p>
              {t('legalNotice.disputePara1')}{' '}
              <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-[#2E7C6D] hover:text-[#256B5E] ml-1">
                https://ec.europa.eu/consumers/odr
              </a>
            </p>
            <p className="mt-4">
              {t('legalNotice.disputePara2')}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('legalNotice.applicableLawTitle')}</h2>
            <p>
              {t('legalNotice.applicableLawPara1')}
            </p>
            <p className="mt-4">
              {t('legalNotice.applicableLawPara2')}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">{t('legalNotice.severabilityTitle')}</h2>
            <p>
              {t('legalNotice.severabilityPara')}
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mt-8">
              <h3 className="font-semibold text-gray-900 mb-2">{t('legalNotice.questionsConcerns')}</h3>
              <p className="text-gray-700">
                {t('legalNotice.questionsIntro')}
              </p>
              <p className="mt-2">
                {t('legalNotice.emailLabel')}: <a href="mailto:legal@carunity.ch" className="text-[#2E7C6D] hover:text-[#256B5E]">legal@carunity.ch</a><br />
                {t('legalNotice.phoneLabel')}: <a href="tel:+41431234567" className="text-[#2E7C6D] hover:text-[#256B5E]">+41 43 123 45 67</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
