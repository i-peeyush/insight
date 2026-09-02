import React, { useState, useEffect } from 'react';
import { PestCard } from '../../components/cards/PestCard';
import { SearchBar } from '../../components/common/SearchBar';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SectionHeading } from '../../components/common/SectionHeading';
import { LoadingState, EmptyState } from '../../components/common/LoadingState';
import { CTASection } from '../../components/sections/CTASection';
import { usePests } from '../../hooks/usePests';
import { updateSeo } from '../../utils/seo';

const CATEGORIES = ['All', 'Crawling Insects', 'Wood-Destroying Insects', 'Biting Parasites', 'Mammals & Wildlife', 'Stinging Insects'];

export const PestLibraryPage: React.FC = () => {
  const { data: pests, isLoading } = usePests();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    updateSeo({
      title: 'Pest Library & Insect Identification Guide',
      description: 'Identify common household pests, signs of infestation, health risks, and effective professional elimination techniques.',
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
        <Breadcrumbs items={[{ label: 'Pest Library' }]} />

        <SectionHeading
          badge="Identification & Biology Guide"
          title="Household Pest Identification Library"
          subtitle="Explore detailed profiles on common insects, rodents, and wildlife to understand infestation signs, health risks, and proven prevention techniques."
        />

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
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
              placeholder="Search pests or signs..."
            />
          </div>
        </div>

        {/* Grid List */}
        {isLoading ? (
          <LoadingState message="Loading pest library profiles..." />
        ) : filteredPests && filteredPests.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {filteredPests.map((pest) => (
              <PestCard key={pest.id} pest={pest} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Pests Found"
            message="No pest profiles matched your search term. Try searching for 'Ants', 'Termites', or 'Mice'."
            actionText="Reset Search"
            onAction={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
          />
        )}
      </div>

      <CTASection
        title="Unsure What Pest You Are Dealing With?"
        subtitle="Our licensed pest inspectors can perform a complete on-site diagnosis and identify the exact species."
      />
    </div>
  );
};
