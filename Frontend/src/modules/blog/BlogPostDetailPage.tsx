import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, Tag, Share2 } from 'lucide-react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { LoadingState, ErrorState } from '../../components/common/LoadingState';
import { CTASection } from '../../components/sections/CTASection';
import { useBlogPost } from '../../hooks/useBlog';
import { formatDate } from '../../utils/formatters';
import { updateSeo } from '../../utils/seo';

export const BlogPostDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, error } = useBlogPost(slug);

  useEffect(() => {
    if (post) {
      updateSeo({
        title: `${post.title} | Insight Pest Knowledge Base`,
        description: post.excerpt,
        ogType: 'article',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'Article',
          'headline': post.title,
          'description': post.excerpt,
          'author': {
            '@type': 'Person',
            'name': post.author
          },
          'datePublished': post.publishedDate
        }
      });
    }
  }, [post]);

  if (isLoading) {
    return (
      <div className="py-20 container-custom">
        <LoadingState message="Loading article..." />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="py-20 container-custom">
        <ErrorState
          title="Article Not Found"
          message="The requested pest guide or article could not be located."
        />
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="container-custom max-w-4xl">
        <Breadcrumbs
          items={[
            { label: 'Blog', path: '/blog' },
            { label: post.title }
          ]}
        />

        <article className="bg-white rounded-3xl p-8 md:p-14 border border-slate-200 shadow-sm mb-16">
          {/* Top metadata */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant="accent">{post.category}</Badge>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readingTime}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatDate(post.publishedDate)}</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 pb-8 mb-8 border-b border-slate-100">
            <div className="w-10 h-10 rounded-full bg-[#E8F5F1] text-[#144A38] font-bold text-sm flex items-center justify-center">
              {post.author.charAt(0)}
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">{post.author}</h4>
              <p className="text-xs text-slate-500">Insight Entomology & Technical Operations</p>
            </div>
          </div>

          {/* Article Body Content */}
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6 text-sm md:text-base whitespace-pre-line">
            {post.content}
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-slate-400 mr-1" />
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold">
                #{tag}
              </span>
            ))}
          </div>
        </article>

        <div className="mb-12 text-center">
          <Button to="/blog" variant="outline" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to All Articles
          </Button>
        </div>
      </div>

      <CTASection />
    </div>
  );
};
