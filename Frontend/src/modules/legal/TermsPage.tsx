import React, { useEffect } from 'react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { companyConfig } from '../../config/company';
import { updateSeo } from '../../utils/seo';

export const TermsPage: React.FC = () => {
  useEffect(() => {
    updateSeo({
      title: 'Terms of Service | Insight Pest Solutions',
      description: 'Terms and conditions governing the use of the Insight Pest Solutions website and pest management services.'
    });
  }, []);

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="container-custom max-w-4xl">
        <Breadcrumbs items={[{ label: 'Terms of Service' }]} />

        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Terms of Service</h1>
          <p className="text-xs text-slate-500">Last Updated: September 2026</p>

          <h2 className="text-lg font-bold text-slate-900 pt-4">1. Acceptance of Terms</h2>
          <p>
            By accessing this website, requesting quotes, or scheduling service appointments with {companyConfig.companyName}, you agree to abide by these Terms of Service.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4">2. Service Estimates & Inspections</h2>
          <p>
            Online quotes are estimates based on standard residential or commercial parameters. Exact final pricing may adjust upon detailed physical on-site inspection by a certified technician if severe structural harborage or excessive square footage is discovered.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4">3. The 100% Insight Protection Guarantee</h2>
          <p>
            {companyConfig.guarantee.description} Covered pest re-services are scheduled promptly within standard operating hours.
          </p>
        </div>
      </div>
    </div>
  );
};
