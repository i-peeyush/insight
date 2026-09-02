import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export const Breadcrumbs: React.FC<{ items: BreadcrumbItem[] }> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs font-medium text-slate-500 mb-6 py-2 overflow-x-auto">
      <Link to="/" className="flex items-center gap-1 hover:text-emerald-700 transition-colors">
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3 h-3 text-slate-400 flex-shrink-0" />
            {isLast || !item.path ? (
              <span className="text-slate-800 font-semibold truncate" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link to={item.path} className="hover:text-emerald-700 transition-colors truncate">
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
