import React, { useEffect } from 'react';
import { LocationCard } from '../../components/cards/LocationCard';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SectionHeading } from '../../components/common/SectionHeading';
import { LoadingState } from '../../components/common/LoadingState';
import { CTASection } from '../../components/sections/CTASection';
import { useLocations } from '../../hooks/useLocations';
import { updateSeo } from '../../utils/seo';

export const LocationsPage: React.FC = () => {
  const { data: locations, isLoading } = useLocations();

  useEffect(() => {
    updateSeo({
      title: 'Service Areas & Regional Pest Control Coverage',
      description: 'Explore the local cities and communities served by Insight Pest Solutions. Dedicated certified technicians in your neighborhood.',
      ogType: 'website'
    });
  }, []);

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="container-custom">
        <Breadcrumbs items={[{ label: 'Service Areas' }]} />

        <SectionHeading
          badge="Local Service Network"
          title="Service Areas & Local Coverage"
          subtitle="Insight Pest Solutions dispatches certified technicians across our regional service corridors with same-day and next-day availability."
        />

        {isLoading ? (
          <LoadingState message="Loading service areas..." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {locations?.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
        )}
      </div>

      <CTASection
        title="Don't See Your Specific City Listed?"
        subtitle="We frequently expand our service routes. Call our dispatch center to check service availability for your ZIP code."
      />
    </div>
  );
};
