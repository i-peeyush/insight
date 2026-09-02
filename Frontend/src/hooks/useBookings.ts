import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingApi } from '../api/bookingApi';
import { BookingRequestData } from '../types/booking';

export function useBookingAvailability(date?: string) {
  return useQuery({
    queryKey: ['bookingSlots', date],
    queryFn: async () => {
      const res = await bookingApi.getAvailability(date);
      return res.data;
    }
  });
}

export function useAllBookings() {
  return useQuery({
    queryKey: ['allBookings'],
    queryFn: async () => {
      const res = await bookingApi.getAll();
      return res.data;
    }
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BookingRequestData) => bookingApi.createBooking(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allBookings'] });
    }
  });
}
