import React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverEffect = false,
  padding = 'md',
  border = true,
  className,
  ...props
}) => {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <div
      className={cn(
        "bg-white rounded-2xl shadow-sm transition-all duration-300",
        border ? "border border-slate-200/80" : "",
        hoverEffect ? "hover:shadow-lg hover:-translate-y-1 hover:border-[#10B981]/40" : "",
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
