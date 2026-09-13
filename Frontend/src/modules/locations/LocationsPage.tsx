import React, { useEffect } from 'react';
import { LocationCard } from '../../components/cards/LocationCard';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { SectionHeading } from '../../components/common/SectionHeading';
import { LoadingState } from '../../components/common/LoadingState';
import { CTASection } from '../../components/sections/CTASection';
import { useLocations } from '../../hooks/useLocations';
import { updateSeo } from '../../utils/seo';
import { t } from '../../language';

export const LocationsPage: React.FC = () => {
  const { data: locations, isLoading } = useLocations();

  useEffect(() => {
    updateSeo({
      title: t.locations.seo.title,
      description: t.locations.seo.description,
      ogType: 'website'
    });
  }, []);

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="container-custom">
        <Breadcrumbs items={[{ label: t.nav.serviceAreas }]} />

        <SectionHeading
          badge={t.locations.header.badge}
          title={t.locations.header.title}
          subtitle={t.locations.header.subtitle}
        />

        {isLoading ? (
          <LoadingState message={t.locations.loadingMessage} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {locations?.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
        )}
      </div>

      <CTASection
        title={t.locations.ctaTitle}
        subtitle={t.locations.ctaSubtitle}
      />
    </div>
  );
};
