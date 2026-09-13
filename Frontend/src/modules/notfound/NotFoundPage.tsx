import React, { useEffect } from 'react';
import { Bug, ArrowLeft, Home, Calculator, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { updateSeo } from '../../utils/seo';
import { t } from '../../language';

export const NotFoundPage: React.FC = () => {
  useEffect(() => {
    updateSeo({
      title: t.notFound.seoTitle,
      description: t.notFound.seoDescription
    });
  }, []);

  return (
    <div className="py-24 bg-slate-50 min-h-[70vh] flex items-center justify-center">
      <div className="container-custom max-w-lg text-center">
        <div className="w-20 h-20 rounded-3xl bg-[#FEF2F2] text-[#DC2626] flex items-center justify-center mx-auto mb-6 shadow-md">
          <Bug className="w-10 h-10" />
        </div>

        <span className="text-xs font-bold text-red-600 uppercase tracking-widest">
          {t.notFound.badge}
        </span>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-3">
          {t.notFound.title}
        </h1>

        <p className="text-sm text-slate-600 mb-8 leading-relaxed">
          {t.notFound.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button to="/" variant="primary" size="md" leftIcon={<Home className="w-4 h-4" />}>
            {t.notFound.homeBtn}
          </Button>
          <Button to="/services" variant="outline" size="md">
            {t.notFound.servicesBtn}
          </Button>
          <Button to="/request-quote" variant="gold" size="md" leftIcon={<Calculator className="w-4 h-4" />}>
            {t.notFound.quoteBtn}
          </Button>
        </div>
      </div>
    </div>
  );
};
