export type BookingStatus = 'REQUESTED' | 'CONFIRMED' | 'RESCHEDULED' | 'CANCELLED' | 'COMPLETED' | 'NO_SHOW';

export interface BookingSlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
  type: 'Morning' | 'Afternoon' | 'Evening';
}

export interface BookingRequestData {
  serviceSlug: string;
  serviceTitle?: string;
  propertyType: string;
  scheduledDate: string;
  scheduledTime: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city?: string;
  state?: string;
  zipCode?: string;
  notes?: string;
}

export interface BookingItem extends BookingRequestData {
  bookingId: string;
  status: BookingStatus;
  createdAt: string;
}
