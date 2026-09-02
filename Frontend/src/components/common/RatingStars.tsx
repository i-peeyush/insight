import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating?: number;
  max?: number;
  showScore?: boolean;
  size?: number;
  className?: string;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating = 5,
  max = 5,
  showScore = false,
  size = 16,
  className = ''
}) => {
  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of ${max} stars`}>
        {Array.from({ length: max }).map((_, i) => (
          <Star
            key={i}
            size={size}
            className={`${
              i < Math.floor(rating)
                ? 'text-amber-400 fill-amber-400'
                : i < rating
                ? 'text-amber-400 fill-amber-400/50'
                : 'text-slate-200 fill-slate-100'
            }`}
          />
        ))}
      </div>
      {showScore && (
        <span className="text-xs font-bold text-slate-800 ml-1">
          {rating.toFixed(1)} / {max}
        </span>
      )}
    </div>
  );
};
