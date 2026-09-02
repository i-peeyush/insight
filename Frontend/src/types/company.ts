export interface BusinessHours {
  monday_friday: string;
  saturday: string;
  sunday: string;
}

export interface SocialLinks {
  facebook: string;
  twitter: string;
  linkedin: string;
  instagram: string;
}

export interface CompanyMetrics {
  yearsExperience: string;
  homesProtected: string;
  satisfactionRate: string;
  technicianCount: string;
}

export interface CompanyGuarantee {
  title: string;
  description: string;
}

export interface CompanyConfig {
  companyName: string;
  tagline: string;
  phone: string;
  phoneDisplay: string;
  phoneRaw: string;
  email: string;
  emailDisplay: string;
  address: string;
  addressDisplay: string;
  emergencyContact: string;
  businessHours: BusinessHours;
  socialLinks: SocialLinks;
  metrics: CompanyMetrics;
  guarantee: CompanyGuarantee;
  badges: string[];
}
