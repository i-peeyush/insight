import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '../common/Card';

interface AdminStatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  trend?: {
    value: string;
    isPositive?: boolean;
    text: string;
  };
  onClick?: () => void;
}

export const AdminStatCard: React.FC<AdminStatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBgColor = 'bg-red-50',
  iconColor = 'text-red-600',
  trend,
  onClick
}) => {
  return (
    <Card 
      onClick={onClick}
      hoverEffect={!!onClick}
      className={`p-6 bg-white border-slate-200 ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{title}</span>
        <div className={`w-10 h-10 rounded-2xl ${iconBgColor} ${iconColor} flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      
      <div className="text-3xl font-black text-slate-900 tracking-tight">{value}</div>
      
      {trend && (
        <div className="flex items-center gap-1.5 text-xs font-semibold mt-2.5">
          {trend.isPositive ? (
            <span className="inline-flex items-center text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md font-bold">
              <TrendingUp className="w-3 h-3 mr-0.5" />
              {trend.value}
            </span>
          ) : (
            <span className="inline-flex items-center text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-md font-bold">
              <TrendingDown className="w-3 h-3 mr-0.5" />
              {trend.value}
            </span>
          )}
          <span className="text-slate-500 text-[11px]">{trend.text}</span>
        </div>
      )}

      {subtitle && !trend && (
        <div className="text-xs text-slate-500 font-medium mt-2">
          {subtitle}
        </div>
      )}
    </Card>
  );
};
