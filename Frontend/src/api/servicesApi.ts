import { apiClient, delay } from './apiClient';
import { env } from '../config/env';
import { ServiceItem } from '../types/service';
import { ApiResponse } from '../types/api';
import { getStoredServices, saveStoredServices } from '../utils/dataStore';

export const servicesApi = {
  async getAll(): Promise<ApiResponse<ServiceItem[]>> {
    if (env.useMockData) {
      await delay(100);
      return {
        success: true,
        data: getStoredServices(),
        timestamp: new Date().toISOString()
      };
    }
    const response = await apiClient.get<ApiResponse<ServiceItem[]>>('/services');
    return response.data;
  },

  async getBySlug(slug: string): Promise<ApiResponse<ServiceItem | null>> {
    if (env.useMockData) {
      await delay(100);
      const services = getStoredServices();
      const item = services.find((s) => s.slug === slug) || null;
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
