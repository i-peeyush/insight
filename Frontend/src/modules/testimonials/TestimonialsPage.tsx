import React, { useState, useEffect } from 'react';
import { TestimonialCard } from '../../components/cards/TestimonialCard';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SectionHeading } from '../../components/common/SectionHeading';
import { RatingStars } from '../../components/common/RatingStars';
import { LoadingState } from '../../components/common/LoadingState';
import { CTASection } from '../../components/sections/CTASection';
import { useTestimonials } from '../../hooks/useTestimonials';
import { companyConfig } from '../../config/company';
import { updateSeo } from '../../utils/seo';
import { t } from '../../language';

export const TestimonialsPage: React.FC = () => {
  const { data: testimonials, isLoading } = useTestimonials();
  const [filterService, setFilterService] = useState('All');

  useEffect(() => {
    updateSeo({
      title: t.testimonials.seo.title,
      description: t.testimonials.seo.description,
      ogType: 'website'
    });
  }, []);

  const servicesList = [
    { key: 'All', label: t.common.all },
    { key: 'Residential Pest Control', label: 'Residential Pest Control' },
    { key: 'Termite Protection', label: 'Termite Protection' },
    { key: 'Rodent Exclusion', label: 'Rodent Exclusion' },
    { key: 'Commercial Pest Management', label: 'Commercial Pest Management' },
    { key: 'Mosquito & Tick Defense', label: 'Mosquito & Tick Defense' }
  ];

  const filteredTestimonials = testimonials?.filter((item) => {
    if (filterService === 'All') return true;
    return item.service.toLowerCase().includes(filterService.toLowerCase());
  });

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="container-custom">
        <Breadcrumbs items={[{ label: t.nav.testimonials }]} />

        <SectionHeading
          badge={t.testimonials.header.badge}
          title={t.testimonials.header.title}
          subtitle={t.testimonials.header.subtitle}
        />

        {/* Aggregate Ratings Banner */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mb-12 flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="text-5xl font-black text-[#DC2626]">{t.testimonials.aggregate.score}</div>
            <div>
              <RatingStars rating={4.9} size={22} />
              <p className="text-xs text-slate-500 mt-1">
                {t.testimonials.aggregate.sub}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-8 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-8">
            <div>
              <div className="text-xl font-bold text-slate-900">{companyConfig.metrics.homesProtected}</div>
              <div className="text-[11px] text-slate-500">{t.testimonials.aggregate.propertiesLabel}</div>
            </div>
            <div>
              <div className="text-xl font-bold text-red-600">{companyConfig.metrics.satisfactionRate}</div>
              <div className="text-[11px] text-slate-500">{t.testimonials.aggregate.satisfactionLabel}</div>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {servicesList.map((srv) => (
            <button
              key={srv.key}
              onClick={() => setFilterService(srv.key)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                filterService === srv.key
                  ? 'bg-[#DC2626] text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {srv.label}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        {isLoading ? (
          <LoadingState message={t.testimonials.loadingMessage} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredTestimonials?.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        )}
      </div>

      <CTASection />
    </div>
  );
};
