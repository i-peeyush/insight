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

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#E8F5F1] via-[#F8FAFC] to-[#FAFCFB] pt-12 pb-20 md:pt-16 md:pb-28">
      {/* Subtle geometric pattern backdrop */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#144A38_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text & CTA Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-emerald-200 shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-bold text-[#144A38]">
                #1 Rated Local Integrated Pest Management
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Protect Your Home From <span className="text-[#144A38] underline decoration-[#10B981]/60 decoration-wavy decoration-2">Unwanted Pests</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              Fast, reliable pest protection with family-safe, eco-conscious Integrated Pest Management. Certified technicians delivering permanent pest-free peace of mind for residential homes and commercial businesses.
            </p>

            {/* Quick check indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>100% Insight Protection Guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Safe for Children & Household Pets</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Same-Day Rapid Emergency Dispatch</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Licensed & Master Certified Specialists</span>
              </div>
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
                Get a Free Pest Quote
              </Button>

              <Button
                to="/book-inspection"
                variant="outline"
                size="lg"
                className="font-bold text-base justify-center"
                leftIcon={<Calendar className="w-5 h-5 text-emerald-700" />}
              >
                Book Inspection Slot
              </Button>
            </div>

            {/* Emergency hotline banner */}
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-600">
              <span className="font-semibold">Have an urgent infestation?</span>
              <a
                href={`tel:${companyConfig.phoneRaw}`}
                className="font-extrabold text-[#144A38] hover:text-emerald-700 inline-flex items-center gap-1.5 underline decoration-emerald-500"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>{companyConfig.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Right Visual Card Showcase */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Decorative Accent Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl blur-2xl -z-10" />

              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/80 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#144A38] text-emerald-400 flex items-center justify-center">
                      <ShieldCheck className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                        Insight Smart Shield
                      </h3>
                      <p className="text-xs text-slate-500">4-Season Active Defense</p>
                    </div>
                  </div>
                  <Badge variant="accent">Guaranteed</Badge>
                </div>

                {/* 3 Core Pillars */}
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Perimeter Sealing & Exclusion</h4>
                      <p className="text-[11px] text-slate-600 mt-0.5">Chew-proof metal flashing, weep hole mesh & weatherstripping.</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Targeted Botanical & Micro-Dust</h4>
                      <p className="text-[11px] text-slate-600 mt-0.5">Low-toxicity EPA registered micro-treatments in hidden wall voids.</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Colony Elimination at Root</h4>
                      <p className="text-[11px] text-slate-600 mt-0.5">Non-repellent transfer formulas eliminate queens & satellite nests.</p>
                    </div>
                  </div>
                </div>

                {/* Bottom Trust Stat Bar */}
                <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
                  <div className="p-2">
                    <div className="text-lg font-black text-[#144A38]">{companyConfig.metrics.homesProtected}</div>
                    <div className="text-[10px] font-semibold text-slate-500">Homes Protected</div>
                  </div>
                  <div className="p-2 border-x border-slate-100">
                    <div className="text-lg font-black text-emerald-600">{companyConfig.metrics.satisfactionRate}</div>
                    <div className="text-[10px] font-semibold text-slate-500">Satisfaction</div>
                  </div>
                  <div className="p-2">
                    <div className="text-lg font-black text-slate-900">{companyConfig.metrics.yearsExperience}</div>
                    <div className="text-[10px] font-semibold text-slate-500">Years Active</div>
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
