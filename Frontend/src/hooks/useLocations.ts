import { useQuery } from '@tanstack/react-query';
import { locationApi } from '../api/locationApi';

export function useLocations() {
  return useQuery({
    queryKey: ['locations'],
    queryFn: async () => {
      const res = await locationApi.getAll();
      return res.data;
    }
  });
}

export function useLocationDetail(slug: string | undefined) {
  return useQuery({
    queryKey: ['location', slug],
    queryFn: async () => {
      if (!slug) return null;
      const res = await locationApi.getBySlug(slug);
      return res.data;
    },
    enabled: !!slug
  });
}
