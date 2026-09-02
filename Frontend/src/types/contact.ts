export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  preferredContactMethod: 'Phone' | 'Email';
}

export interface ContactMessageItem extends ContactFormData {
  id: string;
  status: 'PENDING' | 'RESOLVED' | 'ARCHIVED';
  createdAt: string;
}

export interface NewsletterSubscribeData {
  email: string;
}

export interface NewsletterSubscriberItem {
  id: string;
  email: string;
  subscribedAt: string;
  status: 'ACTIVE' | 'UNSUBSCRIBED';
}
