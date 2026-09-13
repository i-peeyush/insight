import React from 'react';
import { ShieldCheck, Award, HeartHandshake, Zap, Clock } from 'lucide-react';
import { t } from '../../language';

interface TrustBadgeProps {
  type: 'guarantee' | 'certified' | 'eco' | 'speed' | 'experience';
  title?: string;
  subtitle?: string;
}

export const TrustBadge: React.FC<TrustBadgeProps> = ({ type, title, subtitle }) => {
  const configs = {
    guarantee: {
      icon: ShieldCheck,
      defaultTitle: t.common.trustBadges.guaranteeTitle,
      defaultSub: t.common.trustBadges.guaranteeSub,
      color: 'text-red-600 bg-red-50 border-red-200'
    },
    certified: {
      icon: Award,
      defaultTitle: t.common.trustBadges.certifiedTitle,
      defaultSub: t.common.trustBadges.certifiedSub,
      color: 'text-[#DC2626] bg-[#FEF2F2] border-[#EF4444]/30'
    },
    eco: {
      icon: HeartHandshake,
      defaultTitle: t.common.trustBadges.ecoTitle,
      defaultSub: t.common.trustBadges.ecoSub,
      color: 'text-teal-700 bg-teal-50 border-teal-200'
    },
    speed: {
      icon: Zap,
      defaultTitle: t.common.trustBadges.speedTitle,
      defaultSub: t.common.trustBadges.speedSub,
      color: 'text-amber-700 bg-amber-50 border-amber-200'
    },
    experience: {
      icon: Clock,
      defaultTitle: t.common.trustBadges.experienceTitle,
      defaultSub: t.common.trustBadges.experienceSub,
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
