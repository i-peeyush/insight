import { apiClient, delay } from './apiClient';
import { env } from '../config/env';
import { QuoteRequestData, QuoteLeadItem } from '../types/lead';
import { ApiResponse } from '../types/api';
import mockLeadsData from '../../MockDirectory/leads/leads.json';

let localLeads = [...(mockLeadsData.quoteRequests as QuoteLeadItem[])];

export const leadApi = {
  async submitQuote(request: QuoteRequestData): Promise<ApiResponse<QuoteLeadItem>> {
    if (env.useMockData) {
      await delay(600);
      const newLead: QuoteLeadItem = {
        ...request,
        id: `lead-${Date.now()}`,
        status: 'NEW',
        createdAt: new Date().toISOString()
      };
      localLeads.unshift(newLead);
      return {
        success: true,
        message: 'Your quote request has been received! An Insight specialist will contact you within 15 minutes.',
        data: newLead,
        timestamp: new Date().toISOString()
      };
    }
    const response = await apiClient.post<ApiResponse<QuoteLeadItem>>('/leads', request);
    return response.data;
  },

  async getAll(): Promise<ApiResponse<QuoteLeadItem[]>> {
    if (env.useMockData) {
      await delay();
      return {
        success: true,
        data: localLeads,
        timestamp: new Date().toISOString()
      };
    }
    const response = await apiClient.get<ApiResponse<QuoteLeadItem[]>>('/leads');
    return response.data;
  }
};
