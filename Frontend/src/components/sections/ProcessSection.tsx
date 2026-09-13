import React from 'react';
import { Search, ShieldAlert, Layers, RefreshCw } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { t } from '../../language';

export const ProcessSection: React.FC = () => {
  const STEPS = [
    {
      step: t.home.process.step1Number,
      icon: Search,
      title: t.home.process.step1Title,
      desc: t.home.process.step1Desc
    },
    {
      step: t.home.process.step2Number,
      icon: ShieldAlert,
      title: t.home.process.step2Title,
      desc: t.home.process.step2Desc
    },
    {
      step: t.home.process.step3Number,
      icon: Layers,
      title: t.home.process.step3Title,
      desc: t.home.process.step3Desc
    },
    {
      step: t.home.process.step4Number,
      icon: RefreshCw,
      title: t.home.process.step4Title,
      desc: t.home.process.step4Desc
    }
  ];

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="container-custom">
        <SectionHeading
          badge={t.home.process.eyebrow}
          title={t.home.process.title}
          subtitle={t.home.process.subtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {STEPS.map((s, idx) => {
            const IconComponent = s.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#FEF2F2] text-[#DC2626] flex items-center justify-center">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-slate-200">
                      {s.step}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button to="/book-inspection" variant="primary" size="lg">
            {t.home.process.ctaButton}
          </Button>
        </div>
      </div>
    </section>
  );
};
