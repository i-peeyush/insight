import { apiClient, delay } from './apiClient';
import { env } from '../config/env';
import { LocationItem } from '../types/location';
import { ApiResponse } from '../types/api';
import mockLocations from '../../MockDirectory/locations/locations.json';

export const locationApi = {
  async getAll(): Promise<ApiResponse<LocationItem[]>> {
    if (env.useMockData) {
      await delay();
      return {
        success: true,
        data: mockLocations as LocationItem[],
        timestamp: new Date().toISOString()
      };
    }
    const response = await apiClient.get<ApiResponse<LocationItem[]>>('/locations');
    return response.data;
  },

  async getBySlug(slug: string): Promise<ApiResponse<LocationItem | null>> {
    if (env.useMockData) {
      await delay();
      const item = (mockLocations as LocationItem[]).find((l) => l.slug === slug) || null;
      return {
        success: !!item,
        data: item,
        message: item ? 'Location retrieved' : 'Location not found',
        timestamp: new Date().toISOString()
      };
    }
    const response = await apiClient.get<ApiResponse<LocationItem>>(`/locations/${slug}`);
    return response.data;
  }
};
