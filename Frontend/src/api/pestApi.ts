import { apiClient, delay } from './apiClient';
import { env } from '../config/env';
import { PestItem } from '../types/pest';
import { ApiResponse } from '../types/api';
import mockPests from '../../MockDirectory/pests/pests.json';

export const pestApi = {
  async getAll(): Promise<ApiResponse<PestItem[]>> {
    if (env.useMockData) {
      await delay();
      return {
        success: true,
        data: mockPests as PestItem[],
        timestamp: new Date().toISOString()
      };
    }
    const response = await apiClient.get<ApiResponse<PestItem[]>>('/pests');
    return response.data;
  },

  async getBySlug(slug: string): Promise<ApiResponse<PestItem | null>> {
    if (env.useMockData) {
      await delay();
      const item = (mockPests as PestItem[]).find((p) => p.slug === slug) || null;
      return {
        success: !!item,
        data: item,
        message: item ? 'Pest retrieved' : 'Pest not found',
        timestamp: new Date().toISOString()
      };
    }
    const response = await apiClient.get<ApiResponse<PestItem>>(`/pests/${slug}`);
    return response.data;
  }
};
