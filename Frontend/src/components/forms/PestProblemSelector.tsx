import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bug, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '../common/Button';

interface PestOption {
  id: string;
  name: string;
  iconLabel: string;
  threatLevel: string;
  recommendedService: string;
  serviceSlug: string;
  pestSlug: string;
  summary: string;
}

const PEST_OPTIONS: PestOption[] = [
  {
    id: 'ants',
    name: 'Ants & Sugar Ants',
    iconLabel: '🐜',
    threatLevel: 'Food Contamination & Wood Damage',
    recommendedService: 'Residential Perimeter Defense',
    serviceSlug: 'residential-pest-control',
    pestSlug: 'ants',
    summary: 'Colony-transfer baiting that eliminates the queen and stops indoor scout trails.'
  },
  {
    id: 'termites',
    name: 'Termites',
    iconLabel: '🪵',
    threatLevel: 'Severe Structural Wood Destruction',
    recommendedService: 'Sentricon® Colony Elimination',
    serviceSlug: 'termite-control',
    pestSlug: 'termites',
    summary: 'Acoustic thermal scans and continuous perimeter bait stations to eradicate colonies.'
  },
  {
    id: 'bed-bugs',
    name: 'Bed Bugs',
    iconLabel: '🛏️',
    threatLevel: 'Allergic Biting & Insomnia',
    recommendedService: 'Eco-Thermal Heat Treatment',
    serviceSlug: 'bed-bug-control',
    pestSlug: 'bed-bugs',
    summary: 'Single-day 130°F thermal remediation penetrating deep into mattresses and walls.'
  },
  {
    id: 'rodents',
    name: 'Mice & Rats',
    iconLabel: '🐀',
    threatLevel: 'Gnawed Electrical Wiring & Pathogens',
    recommendedService: 'Rodent Exclusion & Sealing',
    serviceSlug: 'rodent-control',
    pestSlug: 'rodents',
    summary: 'Full exterior chew-proof mesh sealing, trapping, and attic bio-sanitization.'
  },
  {
    id: 'cockroaches',
    name: 'Cockroaches',
    iconLabel: '🪳',
    threatLevel: 'Asthma Triggers & Bacteria',
    recommendedService: 'Targeted Gel & Growth Regulators',
    serviceSlug: 'residential-pest-control',
    pestSlug: 'cockroaches',
    summary: 'Multi-layer micro-encapsulated treatments that halt reproduction cycles.'
  },
  {
    id: 'mosquitoes',
    name: 'Mosquitoes & Ticks',
    iconLabel: '🦟',
    threatLevel: 'Disease Vectors & Painful Bites',
    recommendedService: 'Yard Foliage Mist & Larvicide',
    serviceSlug: 'mosquito-control',
    pestSlug: 'mosquitoes',
    summary: 'Seasonal foliage canopy sprays and natural Bti water larvicide briquettes.'
  }
];

export const PestProblemSelector: React.FC = () => {
  const [selectedPest, setSelectedPest] = useState<PestOption>(PEST_OPTIONS[0]);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 md:p-10">
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
          Instant Diagnostic Selector
        </span>
        <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1">
          What pest are you dealing with?
        </h3>
        <p className="text-xs md:text-sm text-slate-600 mt-2">
          Click your pest problem below to view our proven IPM protocol and guaranteed treatment solution.
        </p>
      </div>

      {/* Pill Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-8">
        {PEST_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => setSelectedPest(opt)}
            className={`p-3 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-200 border ${
              selectedPest.id === opt.id
                ? 'bg-[#144A38] text-white border-[#144A38] shadow-md scale-105'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span className="text-2xl mb-1">{opt.iconLabel}</span>
            <span className="text-xs font-bold leading-tight">{opt.name}</span>
          </button>
        ))}
      </div>

      {/* Detail Showcase Panel */}
      <div className="bg-gradient-to-r from-emerald-50 to-[#E8F5F1] rounded-2xl p-6 md:p-8 border border-emerald-200/80 flex flex-col md:flex-row items-center justify-between gap-6 animate-fade-in">
        <div className="space-y-2 max-w-lg">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              Recommended Solution:
            </span>
            <span className="text-xs bg-emerald-200/60 text-emerald-900 font-bold px-2.5 py-0.5 rounded-full">
              {selectedPest.recommendedService}
            </span>
          </div>
          <h4 className="text-xl md:text-2xl font-black text-slate-900">
            Targeted {selectedPest.name} Elimination
          </h4>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
            {selectedPest.summary}
          </p>
          <div className="flex items-center gap-2 text-xs text-amber-900 bg-amber-100/70 p-2 rounded-lg border border-amber-200">
            <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
            <span>Risk Level: <strong>{selectedPest.threatLevel}</strong></span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto">
          <Button
            to={`/request-quote?pest=${encodeURIComponent(selectedPest.name)}`}
            variant="gold"
            size="md"
            className="w-full justify-center shadow-md font-bold"
          >
            Get Quote for {selectedPest.name}
          </Button>

          <Link
            to={`/pests/${selectedPest.pestSlug}`}
            className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#144A38] hover:text-emerald-800 transition-colors py-2"
          >
            <span>View Complete {selectedPest.name} Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
