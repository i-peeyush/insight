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

export const TestimonialsPage: React.FC = () => {
  const { data: testimonials, isLoading } = useTestimonials();
  const [filterService, setFilterService] = useState('All');

  useEffect(() => {
    updateSeo({
      title: 'Customer Reviews & Verified Testimonials | Insight Pest',
      description: 'Read verified homeowner and commercial client reviews for Insight Pest Solutions. 5-star customer ratings across all services.',
      ogType: 'website'
    });
  }, []);

  const servicesList = ['All', 'Residential Pest Control', 'Termite Protection', 'Rodent Exclusion', 'Commercial Pest Management', 'Mosquito & Tick Defense'];

  const filteredTestimonials = testimonials?.filter((t) => {
    if (filterService === 'All') return true;
    return t.service.toLowerCase().includes(filterService.toLowerCase());
  });

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="container-custom">
        <Breadcrumbs items={[{ label: 'Customer Reviews' }]} />

        <SectionHeading
          badge="Verified Customer Feedback"
          title="What Our Customers Say"
          subtitle="Real reviews from homeowners and business clients who trust Insight Pest Solutions for comprehensive, eco-conscious pest control."
        />

        {/* Aggregate Ratings Banner */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mb-12 flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="text-5xl font-black text-[#144A38]">4.9</div>
            <div>
              <RatingStars rating={4.9} size={22} />
              <p className="text-xs text-slate-500 mt-1">
                Based on thousands of verified customer service interactions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-8 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-8">
            <div>
              <div className="text-xl font-bold text-slate-900">{companyConfig.metrics.homesProtected}</div>
              <div className="text-[11px] text-slate-500">Properties Protected</div>
            </div>
            <div>
              <div className="text-xl font-bold text-emerald-600">{companyConfig.metrics.satisfactionRate}</div>
              <div className="text-[11px] text-slate-500">Satisfaction Score</div>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {servicesList.map((srv) => (
            <button
              key={srv}
              onClick={() => setFilterService(srv)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                filterService === srv
                  ? 'bg-[#144A38] text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {srv}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        {isLoading ? (
          <LoadingState message="Loading client reviews..." />
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
