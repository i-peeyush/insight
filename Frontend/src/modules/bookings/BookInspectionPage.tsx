import React, { useEffect } from 'react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SectionHeading } from '../../components/common/SectionHeading';
import { BookingWizard } from '../../components/forms/BookingWizard';
import { TrustIndicators } from '../../components/sections/TrustIndicators';
import { updateSeo } from '../../utils/seo';
import { t } from '../../language';

export const BookInspectionPage: React.FC = () => {
  useEffect(() => {
    updateSeo({
      title: t.bookings.seo.title,
      description: t.bookings.seo.description,
      ogType: 'website'
    });
  }, []);

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="container-custom">
        <Breadcrumbs items={[{ label: t.nav.bookInspection }]} />

        <SectionHeading
          badge={t.bookings.header.badge}
          title={t.bookings.header.title}
          subtitle={t.bookings.header.subtitle}
        />

        <div className="mb-16">
          <BookingWizard />
        </div>

        <div className="max-w-4xl mx-auto">
          <TrustIndicators />
        </div>
      </div>
    </div>
  );
};
