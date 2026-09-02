import React, { useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, ShieldAlert, MessageSquare } from 'lucide-react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SectionHeading } from '../../components/common/SectionHeading';
import { ContactForm } from '../../components/forms/ContactForm';
import { companyConfig } from '../../config/company';
import { updateSeo } from '../../utils/seo';

export const ContactPage: React.FC = () => {
  useEffect(() => {
    updateSeo({
      title: 'Contact Insight Pest Solutions | Customer Support & Hotline',
      description: 'Get in touch with the Insight Pest Solutions team for general inquiries, emergency pest service dispatch, or account questions.',
      ogType: 'website'
    });
  }, []);

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="container-custom">
        <Breadcrumbs items={[{ label: 'Contact Us' }]} />

        <SectionHeading
          badge="Direct Customer Support"
          title="We're Here to Help Keep Your Space Pest-Free"
          subtitle="Have a question about a treatment plan, need billing assistance, or facing an urgent infestation? Reach out below."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          {/* Contact Details & Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900">
                Contact Information
              </h3>

              <div className="space-y-4 text-sm text-slate-700">
                <a
                  href={`tel:${companyConfig.phoneRaw}`}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-[#E8F5F1] transition-colors group"
                >
                  <Phone className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block">Phone Support</span>
                    <strong className="text-slate-900 group-hover:text-[#144A38]">{companyConfig.phoneDisplay}</strong>
                  </div>
                </a>

                <a
                  href={`mailto:${companyConfig.emailDisplay}`}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-[#E8F5F1] transition-colors group"
                >
                  <Mail className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block">Email Inquiries</span>
                    <strong className="text-slate-900 group-hover:text-[#144A38]">{companyConfig.emailDisplay}</strong>
                  </div>
                </a>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50">
                  <MapPin className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block">Headquarters</span>
                    <span className="text-slate-900 font-medium">{companyConfig.addressDisplay}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50">
                  <Clock className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block">Operating Hours</span>
                    <p className="text-xs text-slate-800">
                      <strong>Mon - Fri:</strong> {companyConfig.businessHours.monday_friday}
                    </p>
                    <p className="text-xs text-slate-800">
                      <strong>Saturday:</strong> {companyConfig.businessHours.saturday}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Dispatch Card */}
            <div className="bg-[#0F172A] text-white rounded-3xl p-6 border border-slate-800 shadow-md space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4" />
                <span>Emergency Response Notice</span>
              </div>
              <h4 className="text-base font-bold text-white">
                Active Wasp, Hornet or Rodent Emergency?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                If you have an aggressive stinging insect swarm or hazardous rodent situation inside living spaces, call our 24/7 hotline directly for immediate dispatch triage.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-xl">
            <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
              Send Us a Message
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Our customer support staff responds to online inquiries within 60 minutes during standard business hours.
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};
