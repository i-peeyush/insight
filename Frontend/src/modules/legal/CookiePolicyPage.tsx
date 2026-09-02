import React, { useEffect } from 'react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { updateSeo } from '../../utils/seo';

export const CookiePolicyPage: React.FC = () => {
  useEffect(() => {
    updateSeo({
      title: 'Cookie Policy | Insight Pest Solutions',
      description: 'Insight Pest Solutions cookie usage policy for session state and user analytics.'
    });
  }, []);

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="container-custom max-w-4xl">
        <Breadcrumbs items={[{ label: 'Cookie Policy' }]} />

        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Cookie Policy</h1>
          <p className="text-xs text-slate-500">Last Updated: September 2026</p>

          <h2 className="text-lg font-bold text-slate-900 pt-4">1. What Are Cookies</h2>
          <p>
            Cookies are small data files stored in your web browser that allow our website to remember your session preferences, selected service area, and form completion steps.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4">2. Cookies We Use</h2>
          <p>
            We use strictly necessary cookies to keep the booking and quote wizard operational, as well as performance analytics cookies to understand page load speeds and visitor navigation flows.
          </p>
        </div>
      </div>
    </div>
  );
};

export const AccessibilityPage: React.FC = () => {
  useEffect(() => {
    updateSeo({
      title: 'Accessibility Statement | Insight Pest Solutions',
      description: 'Our commitment to digital accessibility and WCAG 2.1 compliance for all users.'
    });
  }, []);

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="container-custom max-w-4xl">
        <Breadcrumbs items={[{ label: 'Accessibility' }]} />

        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Accessibility Statement</h1>
          <p className="text-xs text-slate-500">Last Updated: September 2026</p>

          <p>
            Insight Pest Solutions is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply the relevant accessibility standards, targeting WCAG 2.1 Level AA conformance.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4">Feedback & Assistance</h2>
          <p>
            If you encounter accessibility barriers on any part of our website or need assistance scheduling an inspection, please contact us at support@insightpestsolutions.demo or call our toll-free phone number.
          </p>
        </div>
      </div>
    </div>
  );
};
