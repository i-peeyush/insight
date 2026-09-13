import React, { useEffect } from 'react';
import { ShieldCheck, HeartHandshake, Award, Users, Target, Leaf } from 'lucide-react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Card } from '../../components/common/Card';
import { WhyChooseUs } from '../../components/sections/WhyChooseUs';
import { CTASection } from '../../components/sections/CTASection';
import { companyConfig } from '../../config/company';
import { updateSeo } from '../../utils/seo';
import { t } from '../../language';

export const AboutPage: React.FC = () => {
  useEffect(() => {
    updateSeo({
      title: t.about.seo.title,
      description: t.about.seo.description,
      ogType: 'website'
    });
  }, []);

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="container-custom">
        <Breadcrumbs items={[{ label: t.nav.about }]} />

        {/* Hero Section */}
        <div className="bg-white rounded-3xl p-8 md:p-14 border border-slate-200 shadow-sm mb-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest">
              {t.about.header.badge}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {t.about.header.title}
            </h1>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed">
              {t.about.header.subtitle}
            </p>
          </div>
        </div>

        {/* 3 Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="p-8 border-slate-200/90">
            <div className="w-12 h-12 rounded-2xl bg-[#FEF2F2] text-[#DC2626] flex items-center justify-center mb-4">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{t.about.coreValues.ipmTitle}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.about.coreValues.ipmDesc}
            </p>
          </Card>

          <Card className="p-8 border-slate-200/90">
            <div className="w-12 h-12 rounded-2xl bg-[#FEF2F2] text-[#DC2626] flex items-center justify-center mb-4">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{t.about.coreValues.guaranteeTitle}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {companyConfig.guarantee.description}
            </p>
          </Card>

          <Card className="p-8 border-slate-200/90">
            <div className="w-12 h-12 rounded-2xl bg-[#FEF2F2] text-[#DC2626] flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{t.about.coreValues.certifiedTitle}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.about.coreValues.certifiedDesc}
            </p>
          </Card>
        </div>

        {/* Methodology Anchor */}
        <div id="methodology" className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm mb-16">
          <SectionHeading
            badge={t.about.methodology.badge}
            title={t.about.methodology.title}
            subtitle={t.about.methodology.subtitle}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 p-5 bg-slate-50 rounded-2xl border border-slate-100">
              <h4 className="text-base font-bold text-slate-900">{t.about.methodology.pillar1Title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.about.methodology.pillar1Desc}
              </p>
            </div>

            <div className="space-y-2 p-5 bg-slate-50 rounded-2xl border border-slate-100">
              <h4 className="text-base font-bold text-slate-900">{t.about.methodology.pillar2Title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.about.methodology.pillar2Desc}
              </p>
            </div>

            <div className="space-y-2 p-5 bg-slate-50 rounded-2xl border border-slate-100">
              <h4 className="text-base font-bold text-slate-900">{t.about.methodology.pillar3Title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.about.methodology.pillar3Desc}
              </p>
            </div>

            <div className="space-y-2 p-5 bg-slate-50 rounded-2xl border border-slate-100">
              <h4 className="text-base font-bold text-slate-900">{t.about.methodology.pillar4Title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.about.methodology.pillar4Desc}
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
