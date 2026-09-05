import { apiClient, delay } from './apiClient';
import { env } from '../config/env';
import { BlogPostItem } from '../types/blog';
import { ApiResponse } from '../types/api';
import { getStoredBlog } from '../utils/dataStore';

export const blogApi = {
  async getAll(): Promise<ApiResponse<BlogPostItem[]>> {
    if (env.useMockData) {
      await delay(100);
      return {
        success: true,
        data: getStoredBlog(),
        timestamp: new Date().toISOString()
      };
    }
    const response = await apiClient.get<ApiResponse<BlogPostItem[]>>('/blog');
    return response.data;
  },

  async getBySlug(slug: string): Promise<ApiResponse<BlogPostItem | null>> {
    if (env.useMockData) {
      await delay(100);
      const posts = getStoredBlog();
      const item = posts.find((b) => b.slug === slug) || null;
      return {
        success: !!item,
        data: item,
        message: item ? 'Post found' : 'Post not found',
        timestamp: new Date().toISOString()
      };
    }
    const response = await apiClient.get<ApiResponse<BlogPostItem>>(`/blog/${slug}`);
    return response.data;
  }
};
