import React, { useState, useEffect } from 'react';
import { ServiceCard } from '../../components/cards/ServiceCard';
import { SearchBar } from '../../components/common/SearchBar';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SectionHeading } from '../../components/common/SectionHeading';
import { LoadingState, EmptyState } from '../../components/common/LoadingState';
import { CTASection } from '../../components/sections/CTASection';
import { useServices } from '../../hooks/useServices';
import { updateSeo } from '../../utils/seo';
import { t } from '../../language';

export const ServicesPage: React.FC = () => {
  const { data: services, isLoading } = useServices();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { key: 'All', label: t.services.tabs.all },
    { key: 'Residential', label: t.services.tabs.residential },
    { key: 'Commercial', label: t.services.tabs.commercial },
    { key: 'Specialized', label: t.services.tabs.specialized },
    { key: 'Outdoor', label: t.services.tabs.outdoor }
  ];

  useEffect(() => {
    updateSeo({
      title: t.services.seo.title,
      description: t.services.seo.description,
      ogType: 'service'
    });
  }, []);

  const filteredServices = services?.filter((srv) => {
    const matchesCategory =
      selectedCategory === 'All' || srv.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      srv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.targetPests.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="container-custom">
        <Breadcrumbs items={[{ label: t.nav.services }]} />

        <SectionHeading
          badge={t.services.header.badge}
          title={t.services.header.title}
          subtitle={t.services.header.subtitle}
        />

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
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
              placeholder={t.services.searchPlaceholder}
            />
          </div>
        </div>

        {/* Grid List */}
        {isLoading ? (
          <LoadingState message={t.services.loadingMessage} />
        ) : filteredServices && filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <EmptyState
            title={t.services.emptyTitle}
            message={t.services.emptyMessage}
            actionText={t.common.resetFilters}
            onAction={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
          />
        )}
      </div>

      <CTASection
        title={t.services.ctaTitle}
        subtitle={t.services.ctaSubtitle}
      />
    </div>
  );
};

