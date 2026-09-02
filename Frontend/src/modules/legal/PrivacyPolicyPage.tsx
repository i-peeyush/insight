import React, { useEffect } from 'react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { companyConfig } from '../../config/company';
import { updateSeo } from '../../utils/seo';

export const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => {
    updateSeo({
      title: 'Privacy Policy | Insight Pest Solutions',
      description: 'Insight Pest Solutions privacy policy detailing data protection, customer contact information, and security practices.'
    });
  }, []);

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="container-custom max-w-4xl">
        <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Privacy Policy</h1>
          <p className="text-xs text-slate-500">Last Updated: September 2026</p>

          <h2 className="text-lg font-bold text-slate-900 pt-4">1. Information We Collect</h2>
          <p>
            When you request a quote, book an appointment, or contact {companyConfig.companyName}, we collect basic property and contact details such as your name, phone number, email address, property physical address, and pest activity descriptions.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4">2. How We Use Your Information</h2>
          <p>
            We use this information exclusively to provide requested estimates, schedule technician visits, dispatch emergency crews, send appointment arrival notifications, and deliver customer service.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4">3. Data Security & Non-Disclosure</h2>
          <p>
            We implement industry-standard encryption protocols. We never sell, rent, or trade your personal information or phone numbers to third-party advertisers or telemarketers.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4">4. Contacting Us</h2>
          <p>
            For privacy inquiries or to update your contact preferences, email us at <strong>{companyConfig.emailDisplay}</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};
