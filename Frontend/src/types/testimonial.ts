export interface TestimonialItem {
  id: string;
  customerName: string;
  location: string;
  service: string;
  rating: number;
  review: string;
  date: string;
  verified: boolean;
  highlight?: string;
  avatar?: string;
}

export type Testimonial = TestimonialItem;

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

