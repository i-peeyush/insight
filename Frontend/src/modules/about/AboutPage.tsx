import React, { useEffect } from 'react';
import { ShieldCheck, HeartHandshake, Award, Users, Target, Leaf } from 'lucide-react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Card } from '../../components/common/Card';
import { WhyChooseUs } from '../../components/sections/WhyChooseUs';
import { CTASection } from '../../components/sections/CTASection';
import { companyConfig } from '../../config/company';
import { updateSeo } from '../../utils/seo';

export const AboutPage: React.FC = () => {
  useEffect(() => {
    updateSeo({
      title: 'About Insight Pest Solutions | Our Mission & IPM Methodology',
      description: 'Learn about Insight Pest Solutions, our science-based Integrated Pest Management (IPM) protocols, and our commitment to safe, reliable pest control.',
      ogType: 'website'
    });
  }, []);

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="container-custom">
        <Breadcrumbs items={[{ label: 'About Us' }]} />

        {/* Hero Section */}
        <div className="bg-white rounded-3xl p-8 md:p-14 border border-slate-200 shadow-sm mb-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest">
              Our Story & Commitment
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Smarter, Safer Pest Protection You Can Trust
            </h1>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed">
              Insight Pest Solutions was founded on a simple principle: Pest management should be scientific, environmentally responsible, and family-friendly. We reject indiscriminate chemical blanket spraying in favor of rigorous structural exclusion and root-cause biological elimination.
            </p>
          </div>
        </div>

        {/* 3 Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="p-8 border-slate-200/90">
            <div className="w-12 h-12 rounded-2xl bg-[#FEF2F2] text-[#DC2626] flex items-center justify-center mb-4">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Integrated Pest Management</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We focus on habitat modification, physical sealing, and low-toxicity botanical active ingredients to eliminate colonies without impacting home air quality.
            </p>
          </Card>

          <Card className="p-8 border-slate-200/90">
            <div className="w-12 h-12 rounded-2xl bg-[#FEF2F2] text-[#DC2626] flex items-center justify-center mb-4">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Unconditional Guarantee</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {companyConfig.guarantee.description}
            </p>
          </Card>

          <Card className="p-8 border-slate-200/90">
            <div className="w-12 h-12 rounded-2xl bg-[#FEF2F2] text-[#DC2626] flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Certified Master Specialists</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every field technician undergoes rigorous entomological training, background screening, and continuous state licensing education.
            </p>
          </Card>
        </div>

        {/* Methodology Anchor */}
        <div id="methodology" className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm mb-16">
          <SectionHeading
            badge="Scientific Approach"
            title="The 5 Pillars of Our IPM Methodology"
            subtitle="How we create long-term structural barriers that keep unwanted pests from entering your property."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 p-5 bg-slate-50 rounded-2xl border border-slate-100">
              <h4 className="text-base font-bold text-slate-900">1. Precision Inspection & Species ID</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Different pests require radically different treatments. Misidentifying an ant or cockroach species leads to ineffective treatments. We identify the exact species first.
              </p>
            </div>

            <div className="space-y-2 p-5 bg-slate-50 rounded-2xl border border-slate-100">
              <h4 className="text-base font-bold text-slate-900">2. Moisture & Harborage Elimination</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                We locate high-humidity micro-climates, plumbing leaks, and mulch contacts that serve as primary pest attractants.
              </p>
            </div>

            <div className="space-y-2 p-5 bg-slate-50 rounded-2xl border border-slate-100">
              <h4 className="text-base font-bold text-slate-900">3. Mechanical Exclusion & Sealing</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                We install chew-proof copper mesh in weep holes, exterior polyurethane sealants, and door weatherstripping to block physical entryways.
              </p>
            </div>

            <div className="space-y-2 p-5 bg-slate-50 rounded-2xl border border-slate-100">
              <h4 className="text-base font-bold text-slate-900">4. Targeted Micro-Encapsulated Active Barriers</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                We apply non-repellent transfer formulas in exterior perimeter zones, allowing foraging insects to unwittingly carry active ingredients back to the queen.
              </p>
            </div>
          </div>
        </div>

        <WhyChooseUs />
      </div>

      <CTASection />
    </div>
  );
};
