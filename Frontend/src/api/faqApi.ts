import { apiClient, delay } from './apiClient';
import { env } from '../config/env';
import { FaqItem } from '../types/faq';
import { ApiResponse } from '../types/api';
import { getStoredFaqs } from '../utils/dataStore';

export const faqApi = {
  async getAll(): Promise<ApiResponse<FaqItem[]>> {
    if (env.useMockData) {
      await delay(100);
      return {
        success: true,
        data: getStoredFaqs(),
        timestamp: new Date().toISOString()
      };
    }
    const response = await apiClient.get<ApiResponse<FaqItem[]>>('/faqs');
    return response.data;
  },

  async getByCategory(category: string): Promise<ApiResponse<FaqItem[]>> {
    if (env.useMockData) {
      await delay(100);
      const allFaqs = getStoredFaqs();
      const filtered = category === 'All' 
        ? allFaqs
        : allFaqs.filter((f) => f.category.toLowerCase() === category.toLowerCase());
      return {
        success: true,
        data: filtered,
        timestamp: new Date().toISOString()
      };
    }
    const response = await apiClient.get<ApiResponse<FaqItem[]>>(`/faqs?category=${category}`);
    return response.data;
  }
};
