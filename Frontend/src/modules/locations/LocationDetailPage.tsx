import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, CheckCircle2, ShieldCheck, Bug, Clock, Calendar } from 'lucide-react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { LoadingState, ErrorState } from '../../components/common/LoadingState';
import { QuoteForm } from '../../components/forms/QuoteForm';
import { CTASection } from '../../components/sections/CTASection';
import { useLocationDetail } from '../../hooks/useLocations';
import { companyConfig } from '../../config/company';
import { updateSeo } from '../../utils/seo';

export const LocationDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: location, isLoading, error } = useLocationDetail(slug);

  useEffect(() => {
    if (location) {
      updateSeo({
        title: `Pest Control Services in ${location.cityName}`,
        description: `Professional residential & commercial pest control in ${location.cityName}. ${location.responseRate}.`,
        ogType: 'website',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'PestControlService',
          'name': `Insight Pest Solutions - ${location.cityName}`,
          'areaServed': location.cityName,
          'telephone': companyConfig.phoneDisplay
        }
      });
    }
  }, [location]);

  if (isLoading) {
    return (
      <div className="py-20 container-custom">
        <LoadingState message="Loading local service area..." />
      </div>
    );
  }

  if (error || !location) {
    return (
      <div className="py-20 container-custom">
        <ErrorState
          title="Location Not Found"
          message="We could not find information for this specific service area."
        />
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="container-custom">
        <Breadcrumbs
          items={[
            { label: 'Service Areas', path: '/service-areas' },
            { label: location.cityName }
          ]}
        />

        {/* Hero Header */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm mb-10">
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="accent">
                <MapPin className="w-3.5 h-3.5" />
                <span>{location.region}</span>
              </Badge>
              <Badge variant="warning">
                <Clock className="w-3.5 h-3.5" />
                <span>{location.responseRate}</span>
              </Badge>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Pest Control in {location.cityName}
            </h1>

            <p className="text-base md:text-lg text-slate-600 leading-relaxed">
              {location.description}
            </p>

            <div className="flex items-center gap-4 pt-2">
              <a
                href={`tel:${companyConfig.phoneRaw}`}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#144A38] bg-[#E8F5F1] px-4 py-2.5 rounded-xl border border-[#10B981]/30 hover:bg-[#144A38] hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Local Dispatch: {companyConfig.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-7 space-y-8">
            {/* Common Regional Pests */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs">
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Bug className="w-5 h-5 text-emerald-600" />
                <span>Common Pest Threats in {location.cityName}</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {location.commonPests.map((pest, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-bold text-slate-800 text-center">
                    {pest}
                  </div>
                ))}
              </div>
            </div>

            {/* Services Available */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs">
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Available Services in this Area</span>
              </h2>
              <div className="space-y-2.5">
                {location.servicesAvailable.map((srv, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs md:text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{srv}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Why Neighbors in {location.cityName} Choose Insight
              </h2>
              <div className="space-y-3">
                {location.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs md:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ZIP Codes Covered */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 mb-3">
                Serviced Postal Codes in {location.cityName}:
              </h3>
              <div className="flex flex-wrap gap-2">
                {location.zipCodes.map((zip) => (
                  <span key={zip} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-mono font-semibold">
                    {zip}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Local Quote Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg sticky top-24">
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                Get a Quote for {location.cityName}
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Fast estimates for homes and businesses in this region.
              </p>

              <QuoteForm />
            </div>
          </div>
        </div>
      </div>

      <CTASection />
    </div>
  );
};
