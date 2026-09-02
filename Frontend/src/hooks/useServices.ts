import { useQuery } from '@tanstack/react-query';
import { servicesApi } from '../api/servicesApi';

export function useServices() {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const res = await servicesApi.getAll();
      return res.data;
    }
  });
}

export function useServiceDetail(slug: string | undefined) {
  return useQuery({
    queryKey: ['service', slug],
    queryFn: async () => {
      if (!slug) return null;
      const res = await servicesApi.getBySlug(slug);
      return res.data;
    },
    enabled: !!slug
  });
}
