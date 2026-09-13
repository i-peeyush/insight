import React from 'react';
import { Phone, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { companyConfig } from '../../config/company';
import { t } from '../../language';

export const TopBar: React.FC = () => {
  return (
    <div className="bg-[#0F172A] text-slate-300 text-xs py-2 border-b border-slate-800">
      <div className="container-custom flex flex-wrap items-center justify-between gap-3">
        {/* Left indicators */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5 text-red-600 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{companyConfig.guarantee.title}</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{t.nav.topBar.hoursPrefix} {companyConfig.businessHours.monday_friday}</span>
          </div>
        </div>

        {/* Right action & phone */}
        <div className="flex items-center gap-5 ml-auto">
          <div className="hidden sm:flex items-center gap-1 text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-red-600" />
            <span>{t.nav.topBar.servingLocation}</span>
          </div>
          <a
            href={`tel:${companyConfig.phoneRaw}`}
            className="flex items-center gap-1.5 text-white font-bold hover:text-red-600 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-red-600" />
            <span>{t.nav.topBar.callNowPrefix} {companyConfig.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
