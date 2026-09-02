import React, { useEffect } from 'react';
import { Briefcase, Award, Heart, Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { CTASection } from '../../components/sections/CTASection';
import { updateSeo } from '../../utils/seo';

const OPEN_POSITIONS = [
  {
    title: 'Certified Pest Control Field Technician',
    type: 'Full-Time',
    location: 'Metro Area Routes',
    department: 'Service Operations',
    description: 'Provide exceptional pest management services to residential and commercial clients. Company vehicle, gas card, and industry-leading performance bonuses provided.'
  },
  {
    title: 'Commercial IPM Account Specialist',
    type: 'Full-Time',
    location: 'Regional Office',
    department: 'Commercial Sales & Audit Management',
    description: 'Manage audit-ready pest prevention programs for hospitality, food service, and healthcare clients.'
  },
  {
    title: 'Customer Experience & Dispatch Coordinator',
    type: 'Full-Time',
    location: 'Headquarters / Hybrid',
    department: 'Customer Care',
    description: 'Assist homeowners with appointment scheduling, route dispatching, and service inquiries.'
  }
];

export const CareersPage: React.FC = () => {
  useEffect(() => {
    updateSeo({
      title: 'Careers & Technician Opportunities | Insight Pest Solutions',
      description: 'Join the Insight Pest Solutions team. Competitive pay, full benefits, paid certification training, and positive work culture.',
      ogType: 'website'
    });
  }, []);

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="container-custom">
        <Breadcrumbs items={[{ label: 'Careers' }]} />

        <SectionHeading
          badge="Join Our Team"
          title="Build a Rewarding Career with Insight Pest"
          subtitle="We invest in our technicians with comprehensive paid training, state licensing sponsorship, modern equipment, and a supportive team environment."
        />

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="p-6">
            <Award className="w-8 h-8 text-emerald-600 mb-3" />
            <h3 className="text-base font-bold text-slate-900 mb-1">Paid Licensing & Certifications</h3>
            <p className="text-xs text-slate-600">We sponsor full state applicator licenses and ongoing entomology education.</p>
          </Card>
          <Card className="p-6">
            <Heart className="w-8 h-8 text-emerald-600 mb-3" />
            <h3 className="text-base font-bold text-slate-900 mb-1">Top-Tier Benefits Package</h3>
            <p className="text-xs text-slate-600">Comprehensive health, dental, 401(k) matching, and generous paid time off.</p>
          </Card>
          <Card className="p-6">
            <Shield className="w-8 h-8 text-emerald-600 mb-3" />
            <h3 className="text-base font-bold text-slate-900 mb-1">Modern Equipment & Fleet</h3>
            <p className="text-xs text-slate-600">Late-model company service trucks, digital mobile routing apps, and ergonomic gear.</p>
          </Card>
        </div>

        {/* Positions List */}
        <div className="space-y-4 max-w-4xl mx-auto mb-16">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Current Opportunities</h3>
          {OPEN_POSITIONS.map((pos, idx) => (
            <Card key={idx} hoverEffect className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {pos.type}
                  </span>
                  <span className="text-xs text-slate-500">• {pos.department}</span>
                </div>
                <h4 className="text-lg font-bold text-slate-900">{pos.title}</h4>
                <p className="text-xs text-slate-600 mt-1 max-w-xl">{pos.description}</p>
                <span className="text-xs font-semibold text-slate-500 mt-2 block">📍 {pos.location}</span>
              </div>
              <Button to="/contact" variant="primary" size="sm">
                Apply Today
              </Button>
            </Card>
          ))}
        </div>
      </div>

      <CTASection
        title="Ready to Grow Your Professional Career?"
        subtitle="Submit your resume to join our dedicated team of pest management professionals."
        primaryButtonText="Contact Hiring Team"
        primaryButtonLink="/contact"
      />
    </div>
  );
};
