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
import { t } from '../../language';

export const WhyChooseUs: React.FC = () => {
  const PILLARS = [
    {
      icon: ShieldCheck,
      title: t.home.whyChooseUs.feature1Title,
      desc: t.home.whyChooseUs.feature1Desc
    },
    {
      icon: Leaf,
      title: t.home.whyChooseUs.feature2Title,
      desc: t.home.whyChooseUs.feature2Desc
    },
    {
      icon: Clock,
      title: t.home.whyChooseUs.feature3Title,
      desc: t.home.whyChooseUs.feature3Desc
    },
    {
      icon: Award,
      title: t.home.whyChooseUs.feature4Title,
      desc: t.home.whyChooseUs.feature4Desc
    },
    {
      icon: FileCheck2,
      title: t.home.whyChooseUs.feature5Title,
      desc: t.home.whyChooseUs.feature5Desc
    },
    {
      icon: Users,
      title: t.home.whyChooseUs.feature6Title,
      desc: t.home.whyChooseUs.feature6Desc
    }
  ];

  return (
    <section className="py-20 bg-white border-y border-slate-100">
      <div className="container-custom">
        <SectionHeading
          badge={t.home.whyChooseUs.eyebrow}
          title={t.home.whyChooseUs.title}
          subtitle={t.home.whyChooseUs.subtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PILLARS.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <Card key={index} hoverEffect className="border-slate-200/80 p-6 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#FEF2F2] text-[#DC2626] flex items-center justify-center mb-4">
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
