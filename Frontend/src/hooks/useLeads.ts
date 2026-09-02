import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { leadApi } from '../api/leadApi';
import { QuoteRequestData } from '../types/lead';

export function useAllLeads() {
  return useQuery({
    queryKey: ['allLeads'],
    queryFn: async () => {
      const res = await leadApi.getAll();
      return res.data;
    }
  });
}

export function useSubmitQuote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: QuoteRequestData) => leadApi.submitQuote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allLeads'] });
    }
  });
}
