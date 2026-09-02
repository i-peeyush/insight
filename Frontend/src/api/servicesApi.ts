import { apiClient, delay } from './apiClient';
import { env } from '../config/env';
import { ServiceItem } from '../types/service';
import { ApiResponse } from '../types/api';
import mockServices from '../../MockDirectory/services/services.json';

export const servicesApi = {
  async getAll(): Promise<ApiResponse<ServiceItem[]>> {
    if (env.useMockData) {
      await delay();
      return {
        success: true,
        data: mockServices as ServiceItem[],
        timestamp: new Date().toISOString()
      };
    }
    const response = await apiClient.get<ApiResponse<ServiceItem[]>>('/services');
    return response.data;
  },

  async getBySlug(slug: string): Promise<ApiResponse<ServiceItem | null>> {
    if (env.useMockData) {
      await delay();
      const item = (mockServices as ServiceItem[]).find((s) => s.slug === slug) || null;
      return {
        success: !!item,
        data: item,
        message: item ? 'Service retrieved' : 'Service not found',
        timestamp: new Date().toISOString()
      };
    }
    const response = await apiClient.get<ApiResponse<ServiceItem>>(`/services/${slug}`);
    return response.data;
  }
};
