import { apiClient, delay } from './apiClient';
import { env } from '../config/env';
import { ContactFormData, ContactMessageItem, NewsletterSubscribeData, NewsletterSubscriberItem } from '../types/contact';
import { ApiResponse } from '../types/api';
import mockLeadsData from '../../MockDirectory/leads/leads.json';

let localMessages = [...(mockLeadsData.contactMessages as ContactMessageItem[])];
let localSubscribers: NewsletterSubscriberItem[] = [];

export const contactApi = {
  async sendMessage(data: ContactFormData): Promise<ApiResponse<ContactMessageItem>> {
    if (env.useMockData) {
      await delay(500);
      const newMsg: ContactMessageItem = {
        ...data,
        id: `msg-${Date.now()}`,
        status: 'PENDING',
        createdAt: new Date().toISOString()
      };
      localMessages.unshift(newMsg);
      return {
        success: true,
        message: 'Message sent successfully. Our support desk will reply promptly.',
        data: newMsg,
        timestamp: new Date().toISOString()
      };
    }
    const response = await apiClient.post<ApiResponse<ContactMessageItem>>('/contact', data);
    return response.data;
  },

  async getAllMessages(): Promise<ApiResponse<ContactMessageItem[]>> {
    if (env.useMockData) {
      await delay();
      return {
        success: true,
        data: localMessages,
        timestamp: new Date().toISOString()
      };
    }
    const response = await apiClient.get<ApiResponse<ContactMessageItem[]>>('/contact');
    return response.data;
  }
};

export const newsletterApi = {
  async subscribe(data: NewsletterSubscribeData): Promise<ApiResponse<NewsletterSubscriberItem>> {
    if (env.useMockData) {
      await delay(400);
      const newSub: NewsletterSubscriberItem = {
        id: `sub-${Date.now()}`,
        email: data.email,
        subscribedAt: new Date().toISOString(),
        status: 'ACTIVE'
      };
      localSubscribers.unshift(newSub);
      return {
        success: true,
        message: 'Thank you for subscribing to seasonal pest defense alerts!',
        data: newSub,
        timestamp: new Date().toISOString()
      };
    }
    const response = await apiClient.post<ApiResponse<NewsletterSubscriberItem>>('/newsletter/subscribe', data);
    return response.data;
  }
};
