import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SectionHeading } from '../../components/common/SectionHeading';
import { SearchBar } from '../../components/common/SearchBar';
import { FaqAccordion } from '../../components/sections/FaqAccordion';
import { LoadingState, EmptyState } from '../../components/common/LoadingState';
import { CTASection } from '../../components/sections/CTASection';
import { useFaqs } from '../../hooks/useFaqs';
import { updateSeo } from '../../utils/seo';

const CATEGORIES = ['All', 'General', 'Safety', 'Residential', 'Commercial', 'Pricing', 'Scheduling', 'Prevention'];

export const FaqPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { data: faqs, isLoading } = useFaqs(selectedCategory);

  useEffect(() => {
    updateSeo({
      title: 'Pest Control Frequently Asked Questions | Safety, Pricing & IPM',
      description: 'Frequently asked questions regarding Insight Pest Solutions services, child & pet safety, treatment frequency, and pricing.',
      ogType: 'website'
    });
  }, []);

  const filteredFaqs = faqs?.filter((faq) => {
    return (
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="container-custom max-w-4xl">
        <Breadcrumbs items={[{ label: 'FAQ' }]} />

        <SectionHeading
          badge="Knowledge & Help Center"
          title="Frequently Asked Questions"
          subtitle="Find clear answers regarding our Integrated Pest Management procedures, product safety for pets and kids, scheduling, and warranty policies."
        />

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search questions (e.g., safety, pets, cost, warranty)..."
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#DC2626] text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion */}
        {isLoading ? (
          <LoadingState message="Loading FAQ answers..." />
        ) : filteredFaqs && filteredFaqs.length > 0 ? (
          <div className="mb-16">
            <FaqAccordion faqs={filteredFaqs} />
          </div>
        ) : (
          <EmptyState
            title="No Matching Questions Found"
            message="We couldn't find an FAQ entry matching your query. Contact our customer care team directly for assistance."
            actionText="Clear Search"
            onAction={() => setSearchQuery('')}
          />
        )}
      </div>

      <CTASection
        title="Still Have Questions?"
        subtitle="Our friendly pest management support team is ready to answer all your specific property questions."
        primaryButtonText="Contact Support"
        primaryButtonLink="/contact"
      />
    </div>
  );
};
