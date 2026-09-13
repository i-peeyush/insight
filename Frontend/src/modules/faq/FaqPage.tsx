import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SectionHeading } from '../../components/common/SectionHeading';
import { SearchBar } from '../../components/common/SearchBar';
import { FaqAccordion } from '../../components/sections/FaqAccordion';
import { LoadingState, EmptyState } from '../../components/common/LoadingState';
import { CTASection } from '../../components/sections/CTASection';
import { useFaqs } from '../../hooks/useFaqs';
import { updateSeo } from '../../utils/seo';
import { t } from '../../language';

export const FaqPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { data: faqs, isLoading } = useFaqs(selectedCategory);

  const categories = [
    { key: 'All', label: t.common.all },
    { key: 'General', label: 'General' },
    { key: 'Safety', label: 'Safety' },
    { key: 'Residential', label: 'Residential' },
    { key: 'Commercial', label: 'Commercial' },
    { key: 'Pricing', label: 'Pricing' },
    { key: 'Scheduling', label: 'Scheduling' },
    { key: 'Prevention', label: 'Prevention' }
  ];

  useEffect(() => {
    updateSeo({
      title: t.faq.seo.title,
      description: t.faq.seo.description,
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
        <Breadcrumbs items={[{ label: t.nav.faq }]} />

        <SectionHeading
          badge={t.faq.header.badge}
          title={t.faq.header.title}
          subtitle={t.faq.header.subtitle}
        />

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={t.faq.searchPlaceholder}
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                selectedCategory === cat.key
                  ? 'bg-[#DC2626] text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion */}
        {isLoading ? (
          <LoadingState message={t.faq.loadingMessage} />
        ) : filteredFaqs && filteredFaqs.length > 0 ? (
          <div className="mb-16">
            <FaqAccordion faqs={filteredFaqs} />
          </div>
        ) : (
          <EmptyState
            title={t.faq.emptyTitle}
            message={t.faq.emptyMessage}
            actionText={t.common.clearSearch}
            onAction={() => setSearchQuery('')}
          />
        )}
      </div>

      <CTASection
        title={t.faq.ctaTitle}
        subtitle={t.faq.ctaSubtitle}
        primaryButtonText={t.faq.ctaButton}
        primaryButtonLink="/contact"
      />
    </div>
  );
};
