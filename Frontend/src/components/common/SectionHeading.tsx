import React from 'react';
import { Badge } from './Badge';
import { cn } from '../../utils/cn';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  align = 'center',
  className
}) => {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto'
  };

  return (
    <div className={cn("flex flex-col max-w-3xl mb-12", alignmentClasses[align], className)}>
      {badge && (
        <div className="mb-3">
          <Badge variant="accent">{badge}</Badge>
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg text-slate-600 mt-3 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
