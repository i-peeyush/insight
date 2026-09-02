import React from 'react';
import { ShieldCheck, Award, HeartHandshake, Zap, Clock } from 'lucide-react';

interface TrustBadgeProps {
  type: 'guarantee' | 'certified' | 'eco' | 'speed' | 'experience';
  title?: string;
  subtitle?: string;
}

export const TrustBadge: React.FC<TrustBadgeProps> = ({ type, title, subtitle }) => {
  const configs = {
    guarantee: {
      icon: ShieldCheck,
      defaultTitle: '100% Protection Guarantee',
      defaultSub: 'Free re-service if pests return',
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200'
    },
    certified: {
      icon: Award,
      defaultTitle: 'Master Certified Technicians',
      defaultSub: 'Licensed, background-checked & insured',
      color: 'text-[#144A38] bg-[#E8F5F1] border-[#10B981]/30'
    },
    eco: {
      icon: HeartHandshake,
      defaultTitle: 'Family & Pet Conscious',
      defaultSub: 'EPA-approved targeted IPM methods',
      color: 'text-teal-700 bg-teal-50 border-teal-200'
    },
    speed: {
      icon: Zap,
      defaultTitle: 'Rapid Same-Day Response',
      defaultSub: 'Emergency inspection dispatch available',
      color: 'text-amber-700 bg-amber-50 border-amber-200'
    },
    experience: {
      icon: Clock,
      defaultTitle: '15+ Years Regional Excellence',
      defaultSub: 'Over 50,000 homes protected',
      color: 'text-blue-700 bg-blue-50 border-blue-200'
    }
  };

  const config = configs[type];
  const IconComponent = config.icon;

  return (
    <div className={`flex items-center gap-3 p-4 rounded-xl border ${config.color} transition-all duration-200 hover:shadow-sm`}>
      <div className="p-2.5 rounded-lg bg-white shadow-xs">
        <IconComponent className="w-6 h-6" />
      </div>
      <div>
        <h4 className="text-sm font-bold text-slate-900 leading-tight">
          {title || config.defaultTitle}
        </h4>
        <p className="text-xs text-slate-600 mt-0.5">
          {subtitle || config.defaultSub}
        </p>
      </div>
    </div>
  );
};
