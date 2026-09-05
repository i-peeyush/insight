import { apiClient, delay } from './apiClient';
import { env } from '../config/env';
import { TestimonialItem } from '../types/testimonial';
import { ApiResponse } from '../types/api';
import { getStoredTestimonials } from '../utils/dataStore';

export const testimonialApi = {
  async getAll(): Promise<ApiResponse<TestimonialItem[]>> {
    if (env.useMockData) {
      await delay(100);
      return {
        success: true,
        data: getStoredTestimonials(),
        timestamp: new Date().toISOString()
      };
    }
    const response = await apiClient.get<ApiResponse<TestimonialItem[]>>('/testimonials');
    return response.data;
  }
};
