import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, Clock, Phone, Award } from 'lucide-react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SectionHeading } from '../../components/common/SectionHeading';
import { QuoteForm } from '../../components/forms/QuoteForm';
import { TrustIndicators } from '../../components/sections/TrustIndicators';
import { companyConfig } from '../../config/company';
import { updateSeo } from '../../utils/seo';

export const QuoteRequestPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialPest = searchParams.get('pest') || '';

  useEffect(() => {
    updateSeo({
      title: 'Request a Free Pest Control Quote | Fast Estimates',
      description: 'Get a fast, transparent quote for residential or commercial pest management with Insight Pest Solutions.',
      ogType: 'website'
    });
  }, []);

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="container-custom">
        <Breadcrumbs items={[{ label: 'Request a Quote' }]} />

        <div className="max-w-4xl mx-auto">
          <SectionHeading
            badge="Instant Online Estimate"
            title="Request Your Free Pest Control Quote"
            subtitle="Complete the form below to receive a transparent estimate tailored to your home layout, property size, and specific pest concerns."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            {/* Left Main Form Container */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
              <QuoteForm initialPest={initialPest} />
            </div>

            {/* Right Side Trust Bar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#DC2626] text-white rounded-3xl p-6 shadow-md space-y-4">
                <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-5 h-5" />
                  <span>The Insight Guarantee</span>
                </div>
                <h3 className="text-xl font-extrabold text-white">
                  100% Satisfaction & Protection
                </h3>
                <p className="text-xs text-red-600 leading-relaxed">
                  If pests return between scheduled visits, your technician returns to re-treat your home free of charge.
                </p>
                <div className="pt-2 border-t border-red-200/80 space-y-2 text-xs text-red-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-red-600 flex-shrink-0" />
                    <span>No surprise upcharges</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-red-600 flex-shrink-0" />
                    <span>EPA safer-choice approved</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-red-600 flex-shrink-0" />
                    <span>Licensed master technicians</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-center">
                <p className="text-xs font-semibold text-slate-500 mb-1">Prefer to talk with an expert right now?</p>
                <a
                  href={`tel:${companyConfig.phoneRaw}`}
                  className="text-lg font-black text-[#DC2626] hover:text-red-600 flex items-center justify-center gap-2 mt-2"
                >
                  <Phone className="w-5 h-5 text-red-600" />
                  <span>{companyConfig.phoneDisplay}</span>
                </a>
                <p className="text-[11px] text-slate-400 mt-2">
                  Mon-Fri {companyConfig.businessHours.monday_friday}
                </p>
              </div>
            </div>
          </div>

          <TrustIndicators />
        </div>
      </div>
    </div>
  );
};
