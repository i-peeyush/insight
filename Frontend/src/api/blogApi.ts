import { apiClient, delay } from './apiClient';
import { env } from '../config/env';
import { BlogPostItem } from '../types/blog';
import { ApiResponse } from '../types/api';
import mockBlogPosts from '../../MockDirectory/blog/blogPosts.json';

export const blogApi = {
  async getAll(): Promise<ApiResponse<BlogPostItem[]>> {
    if (env.useMockData) {
      await delay();
      return {
        success: true,
        data: mockBlogPosts as BlogPostItem[],
        timestamp: new Date().toISOString()
      };
    }
    const response = await apiClient.get<ApiResponse<BlogPostItem[]>>('/blog');
    return response.data;
  },

  async getBySlug(slug: string): Promise<ApiResponse<BlogPostItem | null>> {
    if (env.useMockData) {
      await delay();
      const item = (mockBlogPosts as BlogPostItem[]).find((b) => b.slug === slug) || null;
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
