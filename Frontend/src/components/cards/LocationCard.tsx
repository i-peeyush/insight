import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Phone, CheckCircle2 } from 'lucide-react';
import { LocationItem } from '../../types/location';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { companyConfig } from '../../config/company';
import { t } from '../../language';

export const LocationCard: React.FC<{ location: LocationItem }> = ({ location }) => {
  return (
    <Card hoverEffect className="flex flex-col h-full justify-between group">
      <div>
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center group-hover:bg-[#DC2626] group-hover:text-white transition-colors">
            <MapPin className="w-5 h-5" />
          </div>
          <Badge variant="accent">
            {location.state} • {location.region}
          </Badge>
        </div>

        <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#DC2626] transition-colors mb-2">
          {location.cityName}
        </h3>

        <p className="text-xs text-slate-600 mb-4 line-clamp-2 leading-relaxed">
          {location.description}
        </p>

        {/* Highlights */}
        <div className="space-y-1.5 mb-4">
          {location.highlights.slice(0, 2).map((h, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
              <span className="truncate">{h}</span>
            </div>
          ))}
        </div>

        {/* Common pests tag strip */}
        <div className="flex flex-wrap gap-1 mb-4">
          {location.commonPests.slice(0, 3).map((p, i) => (
            <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
              {p}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
        <a 
          href={`tel:${companyConfig.phoneRaw}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-red-600"
        >
          <Phone className="w-3.5 h-3.5 text-red-600" />
          <span>{companyConfig.phoneDisplay}</span>
        </a>
        <Link
          to={`/service-areas/${location.slug}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-600 transition-colors group-hover:translate-x-1 duration-200"
        >
          <span>{t.locations.card.viewArea}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </Card>
  );
};
