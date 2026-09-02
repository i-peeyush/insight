import { apiClient, delay } from './apiClient';
import { env } from '../config/env';
import { FaqItem } from '../types/faq';
import { ApiResponse } from '../types/api';
import mockFaqs from '../../MockDirectory/faq/faqs.json';

export const faqApi = {
  async getAll(): Promise<ApiResponse<FaqItem[]>> {
    if (env.useMockData) {
      await delay();
      return {
        success: true,
        data: mockFaqs as FaqItem[],
        timestamp: new Date().toISOString()
      };
    }
    const response = await apiClient.get<ApiResponse<FaqItem[]>>('/faqs');
    return response.data;
  },

  async getByCategory(category: string): Promise<ApiResponse<FaqItem[]>> {
    if (env.useMockData) {
      await delay();
      const filtered = category === 'All' 
        ? (mockFaqs as FaqItem[])
        : (mockFaqs as FaqItem[]).filter((f) => f.category.toLowerCase() === category.toLowerCase());
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
