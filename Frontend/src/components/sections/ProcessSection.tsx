import React from 'react';
import { Search, ShieldAlert, Layers, RefreshCw } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';

const STEPS = [
  {
    step: '01',
    icon: Search,
    title: 'Detailed Property Audit',
    desc: 'Our master technician inspects eaves, crawlspaces, weep holes, plumbing voids, and outdoor landscaping to map out pest nesting locations.'
  },
  {
    step: '02',
    icon: ShieldAlert,
    title: 'Targeted Elimination & Sealing',
    desc: 'We apply botanical and micro-encapsulated treatments directly to harborage zones while sealing entry cracks with chew-proof materials.'
  },
  {
    step: '03',
    icon: Layers,
    title: 'Exterior Power Shield',
    desc: 'A 30-foot multi-layered perimeter granular barrier is laid around your foundation to block future pest crawling paths before they reach doors.'
  },
  {
    step: '04',
    icon: RefreshCw,
    title: 'Seasonal Re-Service & Guarantee',
    desc: 'We rotate active formulas each season to counter changing pest cycles. If covered pests return anytime in between, retreatments are free.'
  }
];

export const ProcessSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="container-custom">
        <SectionHeading
          badge="Our Proven 4-Step IPM Process"
          title="How Insight Pest Solutions Works"
          subtitle="A systematic, scientific methodology designed to eliminate active infestations and establish long-term structural barriers."
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
                    <div className="w-12 h-12 rounded-2xl bg-[#E8F5F1] text-[#144A38] flex items-center justify-center">
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
            Schedule Your Step 1 Inspection
          </Button>
        </div>
      </div>
    </section>
  );
};
