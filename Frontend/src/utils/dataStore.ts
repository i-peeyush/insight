import { ServiceItem } from '../types/service';
import { TestimonialItem, FaqItem } from '../types/testimonial';
import { BlogPostItem } from '../types/blog';
import { QuoteLeadItem } from '../types/lead';
import { BookingItem } from '../types/booking';
import { CompanyConfig } from '../types/company';

import mockServices from '../../MockDirectory/services/services.json';
import mockTestimonials from '../../MockDirectory/testimonials/testimonials.json';
import mockFaqs from '../../MockDirectory/faq/faqs.json';
import mockBlogPosts from '../../MockDirectory/blog/blogPosts.json';
import mockLeadsData from '../../MockDirectory/leads/leads.json';
import mockBookingsData from '../../MockDirectory/bookings/bookings.json';
import initialCompanyData from '../../MockDirectory/company/company.json';

const STORAGE_KEYS = {
  SERVICES: 'insight_services_data',
  TESTIMONIALS: 'insight_testimonials_data',
  FAQS: 'insight_faqs_data',
  BLOG: 'insight_blog_data',
  LEADS: 'insight_leads_data',
  BOOKINGS: 'insight_bookings_data',
  COMPANY: 'insight_company_config'
};

function safeGet<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item);
  } catch (e) {
    return fallback;
  }
}

function safeSet<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('insight_data_change', { detail: { key, data } }));
  } catch (e) {
    console.error(`Failed to save ${key} to storage`, e);
  }
}

// Services Store
export function getStoredServices(): ServiceItem[] {
  return safeGet<ServiceItem[]>(STORAGE_KEYS.SERVICES, mockServices as ServiceItem[]);
}

export function saveStoredServices(services: ServiceItem[]): void {
  safeSet(STORAGE_KEYS.SERVICES, services);
}

// Testimonials Store
export function getStoredTestimonials(): TestimonialItem[] {
  return safeGet<TestimonialItem[]>(STORAGE_KEYS.TESTIMONIALS, mockTestimonials as TestimonialItem[]);
}

export function saveStoredTestimonials(testimonials: TestimonialItem[]): void {
  safeSet(STORAGE_KEYS.TESTIMONIALS, testimonials);
}

// FAQs Store
export function getStoredFaqs(): FaqItem[] {
  return safeGet<FaqItem[]>(STORAGE_KEYS.FAQS, mockFaqs as FaqItem[]);
}

export function saveStoredFaqs(faqs: FaqItem[]): void {
  safeSet(STORAGE_KEYS.FAQS, faqs);
}

// Blog Posts Store
export function getStoredBlog(): BlogPostItem[] {
  return safeGet<BlogPostItem[]>(STORAGE_KEYS.BLOG, mockBlogPosts as BlogPostItem[]);
}

export function saveStoredBlog(posts: BlogPostItem[]): void {
  safeSet(STORAGE_KEYS.BLOG, posts);
}

// Leads Store
export function getStoredLeads(): QuoteLeadItem[] {
  return safeGet<QuoteLeadItem[]>(STORAGE_KEYS.LEADS, mockLeadsData.quoteRequests as QuoteLeadItem[]);
}

export function saveStoredLeads(leads: QuoteLeadItem[]): void {
  safeSet(STORAGE_KEYS.LEADS, leads);
}

// Bookings Store
export function getStoredBookings(): BookingItem[] {
  return safeGet<BookingItem[]>(STORAGE_KEYS.BOOKINGS, mockBookingsData.sampleBookings as BookingItem[]);
}

export function saveStoredBookings(bookings: BookingItem[]): void {
  safeSet(STORAGE_KEYS.BOOKINGS, bookings);
}

// Company Config Store
export function getStoredCompanyConfig(): CompanyConfig {
  return safeGet<CompanyConfig>(STORAGE_KEYS.COMPANY, initialCompanyData as CompanyConfig);
}

export function saveStoredCompanyConfig(config: CompanyConfig): void {
  safeSet(STORAGE_KEYS.COMPANY, config);
}
