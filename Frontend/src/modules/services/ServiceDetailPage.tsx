import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Phone, 
  Calendar, 
  ArrowRight, 
  Layers, 
  Clock, 
  Award,
  Bug
} from 'lucide-react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { LoadingState, ErrorState } from '../../components/common/LoadingState';
import { QuoteForm } from '../../components/forms/QuoteForm';
import { CTASection } from '../../components/sections/CTASection';
import { useServiceDetail } from '../../hooks/useServices';
import { companyConfig } from '../../config/company';
import { updateSeo } from '../../utils/seo';
import { t } from '../../language';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: service, isLoading, error } = useServiceDetail(slug);

  useEffect(() => {
    if (service) {
      updateSeo({
        title: `${service.title} | Pest Elimination & Prevention`,
        description: service.shortDescription,
        ogType: 'service'
      });
    }
  }, [service]);

  if (isLoading) {
    return (
      <div className="py-20 container-custom">
        <LoadingState message={t.services.detail.loading} />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="py-20 container-custom">
        <ErrorState
          title={t.services.detail.errorTitle}
          message={t.services.detail.errorMessage}
        />
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="container-custom">
        <Breadcrumbs
          items={[
            { label: t.nav.services, path: '/services' },
            { label: service.title }
          ]}
        />

        {/* Hero Header */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm mb-10">
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="accent">{service.category}</Badge>
              <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200">
                {service.pricingEstimate}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {service.title}
            </h1>

            <p className="text-base md:text-lg text-slate-600 leading-relaxed">
              {service.fullDescription}
            </p>

            {/* Guarantee Callout */}
            <div className="flex items-start gap-3 p-4 bg-red-50 rounded-2xl border border-red-200 text-xs md:text-sm text-red-600 font-medium">
              <ShieldCheck className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#DC2626]">{service.warranty}</strong>
                <span>{t.services.detail.guaranteeNote}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          {/* Main Info Columns */}
          <div className="lg:col-span-7 space-y-10">
            {/* Features & Inclusions */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-red-600" />
                <span>{t.services.detail.programInclusions}</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs md:text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4-Step Treatment Process */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Layers className="w-6 h-6 text-red-600" />
                <span>{t.services.detail.howWeTreat}</span>
              </h2>

              <div className="space-y-4">
                {service.process.map((step) => (
                  <div key={step.step} className="flex items-start gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/60">
                    <div className="w-8 h-8 rounded-xl bg-[#DC2626] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{step.title}</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Pests */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs">
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Bug className="w-5 h-5 text-red-600" />
                <span>{t.services.detail.coveredPests}</span>
              </h2>

              <div className="flex flex-wrap gap-2">
                {service.targetPests.map((pest, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-semibold border border-red-200/60"
                  >
                    {pest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sticky Action / Quote Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg sticky top-24">
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                {t.services.detail.requestQuoteTitle}
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                {t.services.detail.requestQuoteSubtitle}
              </p>

              <QuoteForm initialService={service.title} />

              <div className="mt-6 pt-6 border-t border-slate-100 text-center">
                <Link
                  to="/book-inspection"
                  className="text-xs font-bold text-red-600 hover:text-red-600 inline-flex items-center gap-1"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{t.services.detail.bookDirectPrompt}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CTASection />
    </div>
  );
};
