import { useQuery } from '@tanstack/react-query';
import { pestApi } from '../api/pestApi';

export function usePests() {
  return useQuery({
    queryKey: ['pests'],
    queryFn: async () => {
      const res = await pestApi.getAll();
      return res.data;
    }
  });
}

export function usePestDetail(slug: string | undefined) {
  return useQuery({
    queryKey: ['pest', slug],
    queryFn: async () => {
      if (!slug) return null;
      const res = await pestApi.getBySlug(slug);
      return res.data;
    },
    enabled: !!slug
  });
}
