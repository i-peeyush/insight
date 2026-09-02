import React from 'react';
import { 
  ShieldCheck, 
  Leaf, 
  Clock, 
  Award, 
  FileCheck2, 
  Users 
} from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { Card } from '../common/Card';

const PILLARS = [
  {
    icon: ShieldCheck,
    title: '100% Insight Protection Guarantee',
    desc: 'If pests return between scheduled quarterly visits, your certified technician returns and retreats your property at zero additional cost.'
  },
  {
    icon: Leaf,
    title: 'Family & Pet-Conscious IPM',
    desc: 'We prioritize mechanical exclusion and low-toxicity botanical micro-treatments, eliminating pests without harming curious pets or children.'
  },
  {
    icon: Clock,
    title: 'Same-Day Rapid Dispatch',
    desc: 'Active infestations do not wait. We offer prompt, scheduled arrival windows with live SMS technician tracking.'
  },
  {
    icon: Award,
    title: 'Board-Certified Entomologist Protocols',
    desc: 'Our service procedures are formulated and reviewed by certified entomologists to address specific regional insect genetics and behavior.'
  },
  {
    icon: FileCheck2,
    title: 'Digital Reports & Inspection Photos',
    desc: 'Receive comprehensive digital documentation after every visit, showing treated areas, trap scan data, and prevention recommendations.'
  },
  {
    icon: Users,
    title: 'Dedicated Local Route Technicians',
    desc: 'You get an experienced local specialist who knows your neighborhood, soil conditions, and recurring seasonal pest patterns.'
  }
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-20 bg-white border-y border-slate-100">
      <div className="container-custom">
        <SectionHeading
          badge="The Insight Difference"
          title="Why Homeowners & Businesses Choose Insight Pest"
          subtitle="We combine scientific Integrated Pest Management (IPM), modern customer communication, and an unconditional satisfaction guarantee."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PILLARS.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <Card key={index} hoverEffect className="border-slate-200/80 p-6 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#E8F5F1] text-[#144A38] flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
