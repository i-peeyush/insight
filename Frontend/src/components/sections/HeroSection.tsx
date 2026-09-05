import React from 'react';
import { 
  ShieldCheck, 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Award,
  Sparkles 
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { companyConfig } from '../../config/company';
import { t } from '../../language';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FEF2F2] via-[#F8FAFC] to-[#FAFCFB] pt-12 pb-20 md:pt-16 md:pb-28">
      {/* Subtle geometric pattern backdrop */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#DC2626_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text & CTA Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-red-200 shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-xs font-bold text-[#DC2626]">
                {t.home.hero.badge}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              {t.home.hero.titlePart1}<span className="text-[#DC2626]">{t.home.hero.titleHighlight}</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              {t.home.hero.subtitle}
            </p>

            {/* Quick check indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {t.home.hero.checkpoints.map((point, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <Button
                to="/request-quote"
                variant="gold"
                size="lg"
                className="font-bold text-base shadow-xl justify-center"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                {t.home.hero.ctaQuote}
              </Button>

              <Button
                to="/book-inspection"
                variant="outline"
                size="lg"
                className="font-bold text-base justify-center"
                leftIcon={<Calendar className="w-5 h-5 text-red-600" />}
              >
                {t.home.hero.ctaBook}
              </Button>
            </div>

            {/* Emergency hotline banner */}
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-600">
              <span className="font-semibold">{t.home.hero.urgentPrompt}</span>
              <a
                href={`tel:${companyConfig.phoneRaw}`}
                className="font-extrabold text-[#DC2626] hover:text-red-600 inline-flex items-center gap-1.5 underline decoration-red-500"
              >
                <Phone className="w-3.5 h-3.5 text-red-600" />
                <span>{companyConfig.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Right Visual Card Showcase */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Decorative Accent Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-teal-500/20 rounded-3xl blur-2xl -z-10" />

              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/80 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#DC2626] text-red-600 flex items-center justify-center">
                      <ShieldCheck className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                        {t.home.hero.shieldTitle}
                      </h3>
                      <p className="text-xs text-slate-500">{t.home.hero.shieldSubtitle}</p>
                    </div>
                  </div>
                  <Badge variant="accent">{t.home.hero.guaranteedBadge}</Badge>
                </div>

                {/* 3 Core Pillars */}
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{t.home.hero.pillar1Title}</h4>
                      <p className="text-[11px] text-slate-600 mt-0.5">{t.home.hero.pillar1Desc}</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{t.home.hero.pillar2Title}</h4>
                      <p className="text-[11px] text-slate-600 mt-0.5">{t.home.hero.pillar2Desc}</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{t.home.hero.pillar3Title}</h4>
                      <p className="text-[11px] text-slate-600 mt-0.5">{t.home.hero.pillar3Desc}</p>
                    </div>
                  </div>
                </div>

                {/* Bottom Trust Stat Bar */}
                <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
                  <div className="p-2">
                    <div className="text-lg font-black text-[#DC2626]">{companyConfig.metrics.homesProtected}</div>
                    <div className="text-[10px] font-semibold text-slate-500">{t.home.hero.stat1Label}</div>
                  </div>
                  <div className="p-2 border-x border-slate-100">
                    <div className="text-lg font-black text-red-600">{companyConfig.metrics.satisfactionRate}</div>
                    <div className="text-[10px] font-semibold text-slate-500">{t.home.hero.stat2Label}</div>
                  </div>
                  <div className="p-2">
                    <div className="text-lg font-black text-slate-900">{companyConfig.metrics.yearsExperience}</div>
                    <div className="text-[10px] font-semibold text-slate-500">{t.home.hero.stat3Label}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
