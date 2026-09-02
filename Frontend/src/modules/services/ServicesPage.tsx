import React, { useState, useEffect } from 'react';
import { ServiceCard } from '../../components/cards/ServiceCard';
import { SearchBar } from '../../components/common/SearchBar';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SectionHeading } from '../../components/common/SectionHeading';
import { LoadingState, EmptyState } from '../../components/common/LoadingState';
import { CTASection } from '../../components/sections/CTASection';
import { useServices } from '../../hooks/useServices';
import { updateSeo } from '../../utils/seo';

const CATEGORIES = ['All', 'Residential', 'Commercial', 'Specialized', 'Outdoor'];

export const ServicesPage: React.FC = () => {
  const { data: services, isLoading } = useServices();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    updateSeo({
      title: 'Pest Control Services & Treatment Plans',
      description: 'Explore full-scope residential pest control, commercial IPM management, termite defense, bed bug heat remediation, and rodent exclusion.',
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
        <Breadcrumbs items={[{ label: 'Services' }]} />

        <SectionHeading
          badge="Complete Service Catalog"
          title="Professional Pest Control Services"
          subtitle="Explore our comprehensive residential and commercial treatment programs, designed for safety and long-term prevention."
        />

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#144A38] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="w-full md:w-72">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search services or pests..."
            />
          </div>
        </div>

        {/* Grid List */}
        {isLoading ? (
          <LoadingState message="Loading service programs..." />
        ) : filteredServices && filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Services Found"
            message="No pest control services matched your query. Try searching for 'Ants', 'Termites', or 'Residential'."
            actionText="Reset Filters"
            onAction={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
          />
        )}
      </div>

      <CTASection
        title="Need a Custom Pest Control Solution?"
        subtitle="Our specialists can inspect your facility or home and build a customized Integrated Pest Management schedule."
      />
    </div>
  );
};
