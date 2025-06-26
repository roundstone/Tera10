import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;
// Add auth token to requests



interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message: string;
  errors?: Record<string, string[]>; // Optional for Laravel validation
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiClient = {
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await api.get<T>(url, config);
      return {
        success: true,
        data: response.data,
        message: 'Success',
      };
    } catch (error) {
      return handleError<T>(error);
    }
  },

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await api.post<T>(url, data, config);
      return {
        success: true,
        data: response.data,
        message: 'Success',
      };
    } catch (error) {
      return handleError<T>(error);
    }
  },

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await api.put<T>(url, data, config);
      return {
        success: true,
        data: response.data,
        message: 'Success',
      };
    } catch (error) {
      return handleError<T>(error);
    }
  },

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await api.delete<T>(url, config);
      return {
        success: true,
        data: response.data,
        message: 'Success',
      };
    } catch (error) {
      return handleError<T>(error);
    }
  },
};



function handleError<T>(error: unknown): ApiResponse<T> {
  if (axios.isAxiosError<ErrorResponse>(error)) {
    if (error.response?.data) {
      if (error.response.status === 422) {
        return {
          success: false,
          message: error.response.data.message,
          errors: error.response.data.errors,
        };
      }
      return {
        success: false,
        message: error.response.data.message || 'An error occurred',
        errors: error.response.data.errors,
      };
    }

    return {
      success: false,
      message: error.message || 'An error occurred',
    };
  }

  // Fallback for unknown errors
  return {
    success: false,
    message: 'An unexpected error occurred',
  };
}


