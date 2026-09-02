import { useQuery } from '@tanstack/react-query';
import { testimonialApi } from '../api/testimonialApi';

export function useTestimonials() {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const res = await testimonialApi.getAll();
      return res.data;
    }
  });
}
