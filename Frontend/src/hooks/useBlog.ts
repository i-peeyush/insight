import { useQuery } from '@tanstack/react-query';
import { blogApi } from '../api/blogApi';

export function useBlog() {
  return useQuery({
    queryKey: ['blog'],
    queryFn: async () => {
      const res = await blogApi.getAll();
      return res.data;
    }
  });
}

export function useBlogPost(slug: string | undefined) {
  return useQuery({
    queryKey: ['blogPost', slug],
    queryFn: async () => {
      if (!slug) return null;
      const res = await blogApi.getBySlug(slug);
      return res.data;
    },
    enabled: !!slug
  });
}
