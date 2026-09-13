import React, { useState, useEffect } from 'react';
import { PestCard } from '../../components/cards/PestCard';
import { SearchBar } from '../../components/common/SearchBar';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SectionHeading } from '../../components/common/SectionHeading';
import { LoadingState, EmptyState } from '../../components/common/LoadingState';
import { CTASection } from '../../components/sections/CTASection';
import { usePests } from '../../hooks/usePests';
import { updateSeo } from '../../utils/seo';
import { t } from '../../language';

export const PestLibraryPage: React.FC = () => {
  const { data: pests, isLoading } = usePests();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { key: 'All', label: t.pests.categories.all },
    { key: 'Crawling Insects', label: t.pests.categories.crawling },
    { key: 'Wood-Destroying Insects', label: t.pests.categories.wood },
    { key: 'Biting Parasites', label: t.pests.categories.biting },
    { key: 'Mammals & Wildlife', label: t.pests.categories.wildlife },
    { key: 'Stinging Insects', label: t.pests.categories.stinging }
  ];

  useEffect(() => {
    updateSeo({
      title: t.pests.seo.title,
      description: t.pests.seo.description,
      ogType: 'website'
    });
  }, []);

  const filteredPests = pests?.filter((pest) => {
    const matchesCategory =
      selectedCategory === 'All' || pest.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      pest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pest.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pest.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pest.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="container-custom">
        <Breadcrumbs items={[{ label: t.nav.pests }]} />

        <SectionHeading
          badge={t.pests.header.badge}
          title={t.pests.header.title}
          subtitle={t.pests.header.subtitle}
        />

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                  selectedCategory === cat.key
                    ? 'bg-[#DC2626] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="w-full md:w-72">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={t.pests.searchPlaceholder}
            />
          </div>
        </div>

        {/* Grid List */}
        {isLoading ? (
          <LoadingState message={t.pests.loadingMessage} />
        ) : filteredPests && filteredPests.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {filteredPests.map((pest) => (
              <PestCard key={pest.id} pest={pest} />
            ))}
          </div>
        ) : (
          <EmptyState
            title={t.pests.emptyTitle}
            message={t.pests.emptyMessage}
            actionText={t.common.resetFilters}
            onAction={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
          />
        )}
      </div>

      <CTASection
        title={t.pests.ctaTitle}
        subtitle={t.pests.ctaSubtitle}
      />
    </div>
  );
};
