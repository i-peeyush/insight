export interface BusinessHours {
  monday_friday: string;
  saturday: string;
  sunday: string;
  holidayNote?: string;
}

export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
  pinterest?: string;
  yelp?: string;
  googleBusiness?: string;
  whatsapp?: string;
  threads?: string;
  reddit?: string;
  discord?: string;
  telegram?: string;
  nextdoor?: string;
  [key: string]: string | undefined;
}

export interface AnnouncementBanner {
  enabled: boolean;
  message: string;
  buttonText: string;
  buttonLink: string;
  badge: string;
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
  announcement?: AnnouncementBanner;
  metrics: CompanyMetrics;
  guarantee: CompanyGuarantee;
  badges: string[];
}

