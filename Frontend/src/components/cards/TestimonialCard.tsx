import React from 'react';
import { Quote, CheckCircle } from 'lucide-react';
import { TestimonialItem } from '../../types/testimonial';
import { Card } from '../common/Card';
import { RatingStars } from '../common/RatingStars';
import { formatDate } from '../../utils/formatters';

export const TestimonialCard: React.FC<{ testimonial: TestimonialItem }> = ({ testimonial }) => {
  return (
    <Card hoverEffect className="flex flex-col h-full justify-between relative bg-white border border-slate-200">
      <div>
        <div className="flex items-center justify-between mb-3">
          <RatingStars rating={testimonial.rating} size={15} />
          <Quote className="w-6 h-6 text-red-600" />
        </div>

        {testimonial.highlight && (
          <p className="text-sm font-bold text-[#DC2626] mb-2">
            "{testimonial.highlight}"
          </p>
        )}

        <p className="text-xs md:text-sm text-slate-600 italic leading-relaxed mb-6">
          "{testimonial.review}"
        </p>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#FEF2F2] text-[#DC2626] font-bold text-xs flex items-center justify-center flex-shrink-0">
            {testimonial.customerName.charAt(0)}
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1">
              {testimonial.customerName}
              {testimonial.verified && (
                <span title="Verified Customer" className="inline-flex items-center">
                  <CheckCircle className="w-3.5 h-3.5 text-red-600" />
                </span>
              )}
            </h4>
            <p className="text-[11px] text-slate-500">
              {testimonial.location} • {testimonial.service}
            </p>
          </div>
        </div>
        <span className="text-[10px] text-slate-400">
          {formatDate(testimonial.date)}
        </span>
      </div>
    </Card>
  );
};
