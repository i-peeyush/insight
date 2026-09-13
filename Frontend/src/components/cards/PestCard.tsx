import React from 'react';
import { Link } from 'react-router-dom';
import { Bug, ArrowRight, AlertCircle } from 'lucide-react';
import { PestItem } from '../../types/pest';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { t } from '../../language';

export const PestCard: React.FC<{ pest: PestItem }> = ({ pest }) => {
  const getRiskVariant = (risk: string) => {
    if (risk.includes('Severe') || risk.includes('High')) return 'danger';
    if (risk.includes('Medium')) return 'warning';
    return 'accent';
  };

  return (
    <Card hoverEffect className="flex flex-col h-full justify-between group">
      <div>
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-[#FEF2F2] group-hover:text-[#DC2626] transition-colors">
            <Bug className="w-5 h-5" />
          </div>
          <Badge variant={getRiskVariant(pest.riskLevel)}>
            {pest.riskLevel} {t.pests.card.riskSuffix}
          </Badge>
        </div>

        <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#DC2626] transition-colors">
          {pest.name}
        </h3>
        <p className="text-xs italic text-slate-500 mb-3">
          {pest.scientificName}
        </p>

        <p className="text-xs text-slate-600 mb-4 line-clamp-3 leading-relaxed">
          {pest.description}
        </p>

        {/* Quick signs badge */}
        <div className="bg-slate-50 rounded-lg p-2.5 mb-4 border border-slate-100">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700 mb-1">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>{t.pests.card.keySignPrefix}</span>
          </div>
          <p className="text-[11px] text-slate-600 line-clamp-1">
            {pest.signsOfInfestation[0]}
          </p>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
        <span className="text-[11px] font-semibold text-slate-500">
          {pest.category}
        </span>
        <Link
          to={`/pests/${pest.slug}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-600 transition-colors group-hover:translate-x-1 duration-200"
        >
          <span>{t.pests.card.guideButton}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </Card>
  );
};
