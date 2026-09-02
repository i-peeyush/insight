export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  timestamp?: string;
  errors?: Record<string, string>;
  pagination?: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}

export interface PaginationParams {
  page?: number;
  size?: number;
  search?: string;
  category?: string;
}
