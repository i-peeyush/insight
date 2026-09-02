import { apiClient, delay } from './apiClient';
import { env } from '../config/env';
import { BookingSlot, BookingItem, BookingRequestData } from '../types/booking';
import { ApiResponse } from '../types/api';
import mockBookingsData from '../../MockDirectory/bookings/bookings.json';

// In-memory mock storage during session for interactive testing
let localBookings = [...(mockBookingsData.sampleBookings as BookingItem[])];

export const bookingApi = {
  async getAvailability(date?: string): Promise<ApiResponse<BookingSlot[]>> {
    if (env.useMockData) {
      await delay();
      const slots = (mockBookingsData.availableSlots as BookingSlot[]);
      const filtered = date ? slots.filter((s) => s.date === date) : slots;
      return {
        success: true,
        data: filtered.length ? filtered : slots.slice(0, 4),
        timestamp: new Date().toISOString()
      };
    }
    const response = await apiClient.get<ApiResponse<BookingSlot[]>>('/bookings/availability', {
      params: { date }
    });
    return response.data;
  },

  async createBooking(request: BookingRequestData): Promise<ApiResponse<BookingItem>> {
    if (env.useMockData) {
      await delay(600);
      const newBooking: BookingItem = {
        ...request,
        bookingId: `BK-${Math.floor(10000 + Math.random() * 90000)}`,
        status: 'REQUESTED',
        createdAt: new Date().toISOString()
      };
      localBookings.unshift(newBooking);
      return {
        success: true,
        message: 'Appointment successfully requested! Our coordinator will contact you shortly to confirm.',
        data: newBooking,
        timestamp: new Date().toISOString()
      };
    }
    const response = await apiClient.post<ApiResponse<BookingItem>>('/bookings', request);
    return response.data;
  },

  async getAll(): Promise<ApiResponse<BookingItem[]>> {
    if (env.useMockData) {
      await delay();
      return {
        success: true,
        data: localBookings,
        timestamp: new Date().toISOString()
      };
    }
    const response = await apiClient.get<ApiResponse<BookingItem[]>>('/bookings');
    return response.data;
  },

  async getById(id: string): Promise<ApiResponse<BookingItem | null>> {
    if (env.useMockData) {
      await delay();
      const found = localBookings.find((b) => b.bookingId === id) || null;
      return {
        success: !!found,
        data: found,
        timestamp: new Date().toISOString()
      };
    }
    const response = await apiClient.get<ApiResponse<BookingItem>>(`/bookings/${id}`);
    return response.data;
  }
};
