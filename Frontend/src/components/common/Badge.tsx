import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'warning' | 'danger' | 'success' | 'neutral';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'accent',
  size = 'md',
  className
}) => {
  const variantClasses = {
    primary: 'bg-[#DC2626] text-white',
    secondary: 'bg-slate-100 text-slate-800 border border-slate-200',
    accent: 'bg-red-50 text-red-600 border border-red-200/60 font-medium',
    outline: 'border border-slate-300 text-slate-700 bg-transparent',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200',
    danger: 'bg-red-50 text-red-800 border border-red-200',
    success: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200'
  };

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 rounded-md',
    md: 'text-xs px-3 py-1 rounded-full'
  };

  return (
    <span className={cn("inline-flex items-center gap-1.5 font-semibold tracking-wide select-none", variantClasses[variant], sizeClasses[size], className)}>
      {children}
    </span>
  );
};
