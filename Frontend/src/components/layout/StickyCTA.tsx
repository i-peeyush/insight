import React from 'react';
import { Phone, Calculator } from 'lucide-react';
import { companyConfig } from '../../config/company';
import { Button } from '../common/Button';
import { analytics } from '../../utils/analytics';
import { t } from '../../language';

export const StickyCTA: React.FC = () => {
  const handleCallClick = () => {
    analytics.track('phone_clicked', { source: 'mobile_sticky_cta' });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-2xl p-2.5 flex items-center gap-2 sm:hidden">
      <a
        href={`tel:${companyConfig.phoneRaw}`}
        onClick={handleCallClick}
        className="flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-slate-900 text-white font-bold text-xs"
      >
        <Phone className="w-4 h-4 text-red-600" />
        <span>{t.common.callNow}</span>
      </a>
      <Button
        to="/request-quote"
        variant="gold"
        size="md"
        className="flex-1 text-xs py-3"
        leftIcon={<Calculator className="w-4 h-4" />}
      >
        {t.nav.requestQuote}
      </Button>
    </div>
  );
};
