export type LeadStatus = 'NEW' | 'CONTACTED' | 'SCHEDULED' | 'CLOSED_WON' | 'CLOSED_LOST';

export interface QuoteRequestData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  propertyType: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  pestProblem: string;
  serviceRequired: string;
  description: string;
  preferredContactMethod: 'Phone' | 'Email' | 'SMS';
  preferredContactTime: 'Morning' | 'Afternoon' | 'Evening' | 'Anytime';
  additionalNotes?: string;
  consent: boolean;
}

export interface QuoteLeadItem extends QuoteRequestData {
  id: string;
  status: LeadStatus;
  createdAt: string;
}
