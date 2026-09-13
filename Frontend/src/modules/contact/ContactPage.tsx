import React, { useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, ShieldAlert, MessageSquare } from 'lucide-react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SectionHeading } from '../../components/common/SectionHeading';
import { ContactForm } from '../../components/forms/ContactForm';
import { companyConfig } from '../../config/company';
import { updateSeo } from '../../utils/seo';
import { t } from '../../language';

export const ContactPage: React.FC = () => {
  useEffect(() => {
    updateSeo({
      title: t.contact.seo.title,
      description: t.contact.seo.description,
      ogType: 'website'
    });
  }, []);

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="container-custom">
        <Breadcrumbs items={[{ label: t.nav.contact }]} />

        <SectionHeading
          badge={t.contact.header.badge}
          title={t.contact.header.title}
          subtitle={t.contact.header.subtitle}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          {/* Contact Details & Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900">
                {t.contact.cards.contactInfoTitle}
              </h3>

              <div className="space-y-4 text-sm text-slate-700">
                <a
                  href={`tel:${companyConfig.phoneRaw}`}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-[#FEF2F2] transition-colors group"
                >
                  <Phone className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block">{t.contact.cards.phoneLabel}</span>
                    <strong className="text-slate-900 group-hover:text-[#DC2626]">{companyConfig.phoneDisplay}</strong>
                  </div>
                </a>

                <a
                  href={`mailto:${companyConfig.emailDisplay}`}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-[#FEF2F2] transition-colors group"
                >
                  <Mail className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block">{t.contact.cards.emailLabel}</span>
                    <strong className="text-slate-900 group-hover:text-[#DC2626]">{companyConfig.emailDisplay}</strong>
                  </div>
                </a>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50">
                  <MapPin className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block">{t.contact.cards.hqLabel}</span>
                    <span className="text-slate-900 font-medium">{companyConfig.addressDisplay}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50">
                  <Clock className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block">{t.contact.cards.hoursLabel}</span>
                    <p className="text-xs text-slate-800">
                      <strong>{t.contact.cards.monFriLabel}</strong> {companyConfig.businessHours.monday_friday}
                    </p>
                    <p className="text-xs text-slate-800">
                      <strong>{t.contact.cards.satLabel}</strong> {companyConfig.businessHours.saturday}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Dispatch Card */}
            <div className="bg-[#0F172A] text-white rounded-3xl p-6 border border-slate-800 shadow-md space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4" />
                <span>{t.contact.cards.emergencyBadge}</span>
              </div>
              <h4 className="text-base font-bold text-white">
                {t.contact.cards.emergencyTitle}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t.contact.cards.emergencyDesc}
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-xl">
            <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
              {t.contact.form.formTitle}
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              {t.contact.form.formSubtitle}
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};
