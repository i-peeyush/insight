export interface ServiceProcessStep {
  step: number;
  title: string;
  desc: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: 'Residential' | 'Commercial' | 'Specialized' | 'Outdoor';
  icon: string;
  featured: boolean;
  pricingEstimate: string;
  targetPests: string[];
  features: string[];
  process: ServiceProcessStep[];
  warranty: string;
  treatmentFrequency?: string;
  heroImage?: string;
  faqs?: any[];
}

export type Service = ServiceItem;

