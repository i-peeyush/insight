import { apiClient, delay } from './apiClient';
import { env } from '../config/env';
import { TestimonialItem } from '../types/testimonial';
import { ApiResponse } from '../types/api';
import mockTestimonials from '../../MockDirectory/testimonials/testimonials.json';

export const testimonialApi = {
  async getAll(): Promise<ApiResponse<TestimonialItem[]>> {
    if (env.useMockData) {
      await delay();
      return {
        success: true,
        data: mockTestimonials as TestimonialItem[],
        timestamp: new Date().toISOString()
      };
    }
    const response = await apiClient.get<ApiResponse<TestimonialItem[]>>('/testimonials');
    return response.data;
  }
};
