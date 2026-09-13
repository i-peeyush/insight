import React, { useState, useEffect } from 'react';
import { BlogCard } from '../../components/cards/BlogCard';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SectionHeading } from '../../components/common/SectionHeading';
import { SearchBar } from '../../components/common/SearchBar';
import { LoadingState, EmptyState } from '../../components/common/LoadingState';
import { CTASection } from '../../components/sections/CTASection';
import { useBlog } from '../../hooks/useBlog';
import { updateSeo } from '../../utils/seo';
import { t } from '../../language';

export const BlogListPage: React.FC = () => {
  const { data: posts, isLoading } = useBlog();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  useEffect(() => {
    updateSeo({
      title: t.blog.seo.title,
      description: t.blog.seo.description,
      ogType: 'website'
    });
  }, []);

  const tags = [
    { key: 'All', label: t.common.all },
    { key: 'Ant Control', label: 'Ant Control' },
    { key: 'Termites', label: 'Termites' },
    { key: 'Bed Bugs', label: 'Bed Bugs' },
    { key: 'Rodent Exclusion', label: 'Rodent Exclusion' },
    { key: 'Home Tips', label: 'Home Tips' }
  ];

  const filteredPosts = posts?.filter((post) => {
    const matchesTag = selectedTag === 'All' || post.tags.includes(selectedTag);
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTag && matchesSearch;
  });

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="container-custom">
        <Breadcrumbs items={[{ label: t.nav.blog }]} />

        <SectionHeading
          badge={t.blog.header.badge}
          title={t.blog.header.title}
          subtitle={t.blog.header.subtitle}
        />

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {tags.map((tag) => (
              <button
                key={tag.key}
                onClick={() => setSelectedTag(tag.key)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  selectedTag === tag.key
                    ? 'bg-[#DC2626] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>

          <div className="w-full md:w-72">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={t.blog.searchPlaceholder}
            />
          </div>
        </div>

        {/* Blog Post Grid */}
        {isLoading ? (
          <LoadingState message={t.blog.loadingMessage} />
        ) : filteredPosts && filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <EmptyState
            title={t.blog.emptyTitle}
            message={t.blog.emptyMessage}
            actionText={t.common.resetFilters}
            onAction={() => {
              setSelectedTag('All');
              setSearchQuery('');
            }}
          />
        )}
      </div>

      <CTASection />
    </div>
  );
};
