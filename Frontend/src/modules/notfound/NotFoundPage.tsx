import React, { useEffect } from 'react';
import { Bug, ArrowLeft, Home, Calculator, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { updateSeo } from '../../utils/seo';

export const NotFoundPage: React.FC = () => {
  useEffect(() => {
    updateSeo({
      title: 'Page Not Found (404) | Insight Pest Solutions',
      description: 'Looks like this page has wandered off.'
    });
  }, []);

  return (
    <div className="py-24 bg-slate-50 min-h-[70vh] flex items-center justify-center">
      <div className="container-custom max-w-lg text-center">
        <div className="w-20 h-20 rounded-3xl bg-[#FEF2F2] text-[#DC2626] flex items-center justify-center mx-auto mb-6 shadow-md">
          <Bug className="w-10 h-10" />
        </div>

        <span className="text-xs font-bold text-red-600 uppercase tracking-widest">
          Error 404
        </span>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-3">
          Looks like this page has wandered off.
        </h1>

        <p className="text-sm text-slate-600 mb-8 leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let us help get you back to safety.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button to="/" variant="primary" size="md" leftIcon={<Home className="w-4 h-4" />}>
            Back to Home
          </Button>
          <Button to="/services" variant="outline" size="md">
            View All Services
          </Button>
          <Button to="/request-quote" variant="gold" size="md" leftIcon={<Calculator className="w-4 h-4" />}>
            Get a Quote
          </Button>
        </div>
      </div>
    </div>
  );
};
