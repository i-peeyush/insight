import React from 'react';
import { TrustBadge } from '../common/TrustBadge';

export const TrustIndicators: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-8">
      <TrustBadge type="guarantee" />
      <TrustBadge type="certified" />
      <TrustBadge type="eco" />
      <TrustBadge type="speed" />
    </div>
  );
};
