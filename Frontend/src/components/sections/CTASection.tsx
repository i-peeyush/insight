import React from 'react';
import { ShieldCheck, Phone, ArrowRight, Calendar, Calculator } from 'lucide-react';
import { Button } from '../common/Button';
import { companyConfig } from '../../config/company';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  title = "Ready for a 100% Guaranteed Pest-Free Home?",
  subtitle = "Contact Insight Pest Solutions today for a fast, free estimate or schedule your complete on-site property inspection.",
  primaryButtonText = "Get a Free Pest Quote",
  primaryButtonLink = "/request-quote",
  secondaryButtonText = "Book Inspection Slot",
  secondaryButtonLink = "/book-inspection"
}) => {
  return (
    <section className="py-16 bg-[#DC2626] text-white relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-red-50/10 pointer-events-none blur-3xl" />
      <div className="absolute -left-20 -top-20 w-96 h-96 rounded-full bg-red-50/10 pointer-events-none blur-3xl" />

      <div className="container-custom relative z-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/15 px-4 py-1.5 rounded-full border border-white/25 text-xs font-bold text-white mb-6 backdrop-blur-sm">
          <ShieldCheck className="w-4 h-4 text-white" />
          <span>{companyConfig.guarantee.title}</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
          {title}
        </h2>

        <p className="text-sm md:text-base text-red-100 max-w-xl mx-auto mb-8 leading-relaxed">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            to={primaryButtonLink}
            variant="gold"
            size="lg"
            className="w-full sm:w-auto font-bold shadow-xl"
            rightIcon={<ArrowRight className="w-5 h-5" />}
          >
            {primaryButtonText}
          </Button>

          <Button
            to={secondaryButtonLink}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-white text-white hover:bg-white/10 font-bold"
            leftIcon={<Calendar className="w-5 h-5 text-white" />}
          >
            {secondaryButtonText}
          </Button>
        </div>

        <div className="mt-8 pt-8 border-t border-red-200/60 flex flex-wrap items-center justify-center gap-6 text-xs text-red-600">
          <span>Need immediate assistance?</span>
          <a
            href={`tel:${companyConfig.phoneRaw}`}
            className="font-bold text-white hover:text-red-600 inline-flex items-center gap-1.5 underline decoration-red-500"
          >
            <Phone className="w-4 h-4 text-red-600" />
            <span>Call Toll-Free: {companyConfig.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
