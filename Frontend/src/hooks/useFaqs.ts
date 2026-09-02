import { useQuery } from '@tanstack/react-query';
import { faqApi } from '../api/faqApi';

export function useFaqs(category: string = 'All') {
  return useQuery({
    queryKey: ['faqs', category],
    queryFn: async () => {
      const res = await faqApi.getByCategory(category);
      return res.data;
    }
  });
}
