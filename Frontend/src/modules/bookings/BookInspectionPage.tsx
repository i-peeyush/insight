import React, { useEffect } from 'react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SectionHeading } from '../../components/common/SectionHeading';
import { BookingWizard } from '../../components/forms/BookingWizard';
import { TrustIndicators } from '../../components/sections/TrustIndicators';
import { updateSeo } from '../../utils/seo';

export const BookInspectionPage: React.FC = () => {
  useEffect(() => {
    updateSeo({
      title: 'Book an On-Site Pest Inspection | Insight Pest Solutions',
      description: 'Schedule a certified pest technician to perform a full interior and exterior inspection of your home or commercial facility.',
      ogType: 'website'
    });
  }, []);

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="container-custom">
        <Breadcrumbs items={[{ label: 'Book Inspection' }]} />

        <SectionHeading
          badge="Live Dispatch Scheduling"
          title="Schedule Your On-Site Pest Inspection"
          subtitle="Choose your service, enter your address, and reserve your guaranteed arrival window with our certified master technician."
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
