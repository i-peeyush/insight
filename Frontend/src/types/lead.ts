export type LeadStatus = 'NEW' | 'CONTACTED' | 'QUOTED' | 'WON' | 'LOST' | 'SCHEDULED' | 'CLOSED_WON' | 'CLOSED_LOST';

export interface QuoteRequestData {
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  propertyType?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  pestProblem: string;
  serviceRequired?: string;
  description?: string;
  preferredContactMethod?: string;
  preferredContactTime?: string;
  urgencyLevel?: string;
  notes?: string;
  additionalNotes?: string;
  consent?: boolean;
}

export interface QuoteLeadItem extends QuoteRequestData {
  id: string;
  status: LeadStatus;
  createdAt: string;
}

export type Lead = QuoteLeadItem;

