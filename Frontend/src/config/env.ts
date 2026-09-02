export const env = {
  apiBaseUrl: (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
  useMockData: (import.meta as any).env?.VITE_USE_MOCK_DATA !== 'false',
  simulatedDelayMs: 350
};
