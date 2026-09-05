import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Building2, 
  ShieldAlert, 
  Flame, 
  PawPrint, 
  Bug, 
  AlertTriangle, 
  Calendar,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { ServiceItem } from '../../types/service';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Home,
  Building2,
  ShieldAlert,
  Flame,
  PawPrint,
  Bug,
  AlertTriangle,
  Calendar
};

export const ServiceCard: React.FC<{ service: ServiceItem }> = ({ service }) => {
  const IconComponent = iconMap[service.icon] || Home;

  return (
    <Card hoverEffect className="flex flex-col h-full justify-between border-slate-200/90 group">
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#FEF2F2] text-[#DC2626] flex items-center justify-center group-hover:bg-[#DC2626] group-hover:text-white transition-all duration-300">
            <IconComponent className="w-6 h-6" />
          </div>
          <Badge variant={service.category === 'Specialized' ? 'warning' : 'accent'}>
            {service.category}
          </Badge>
        </div>

        <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#DC2626] transition-colors mb-2">
          {service.title}
        </h3>

        <p className="text-sm text-slate-600 mb-4 line-clamp-3 leading-relaxed">
          {service.shortDescription}
        </p>

        {/* Feature bullets */}
        <div className="space-y-1.5 mb-6">
          {service.features.slice(0, 3).map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <span className="line-clamp-1">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
        <span className="text-xs font-semibold text-[#DC2626]">
          {service.pricingEstimate}
        </span>
        <Link
          to={`/services/${service.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-600 transition-colors group-hover:translate-x-1 duration-200"
        >
          <span>Learn More</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </Card>
  );
};
