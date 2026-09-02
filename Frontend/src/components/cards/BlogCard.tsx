import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { BlogPostItem } from '../../types/blog';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { formatDate } from '../../utils/formatters';

export const BlogCard: React.FC<{ post: BlogPostItem }> = ({ post }) => {
  return (
    <Card hoverEffect className="flex flex-col h-full justify-between group overflow-hidden">
      <div>
        <div className="flex items-center justify-between mb-3">
          <Badge variant="accent">{post.category}</Badge>
          <div className="flex items-center gap-1 text-[11px] text-slate-500">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readingTime}</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#144A38] transition-colors mb-2 leading-snug">
          {post.title}
        </h3>

        <p className="text-xs text-slate-600 mb-4 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-3 text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-400" />
            {formatDate(post.publishedDate)}
          </span>
        </div>
        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900 transition-colors group-hover:translate-x-1 duration-200"
        >
          <span>Read Article</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </Card>
  );
};
