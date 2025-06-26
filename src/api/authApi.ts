import { apiClient, ApiResponse } from './apiClient';


export const authApi = {
  async login(formData: FormData): Promise<ApiResponse> {


    return apiClient.post('/auth/login', formData);
  },

  
}; 