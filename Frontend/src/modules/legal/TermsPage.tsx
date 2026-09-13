import React, { useEffect } from 'react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { companyConfig } from '../../config/company';
import { updateSeo } from '../../utils/seo';
import { t } from '../../language';

export const TermsPage: React.FC = () => {
  useEffect(() => {
    updateSeo({
      title: t.legal.terms.seoTitle,
      description: t.legal.terms.seoDescription
    });
  }, []);

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="container-custom max-w-4xl">
        <Breadcrumbs items={[{ label: t.legal.terms.title }]} />

        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{t.legal.terms.title}</h1>
          <p className="text-xs text-slate-500">{t.legal.terms.lastUpdated}</p>

          <h2 className="text-lg font-bold text-slate-900 pt-4">{t.legal.terms.sec1Title}</h2>
          <p>
            {t.legal.terms.sec1Body}
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4">{t.legal.terms.sec2Title}</h2>
          <p>
            {t.legal.terms.sec2Body}
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4">{t.legal.terms.sec3Title}</h2>
          <p>
            {t.legal.terms.sec3Body}
          </p>
        </div>
      </div>
    </div>
  );
};
