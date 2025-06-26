import { apiClient, ApiResponse } from './apiClient';


export const registrationApi = {
  async submitStep1(email: string): Promise<ApiResponse> {
    return apiClient.post('/developer-registration/step-one', { email });
  },

  async submitStep2(userId: number, formData: FormData): Promise<ApiResponse> {
    console.log("userId>>",userId);
    formData.append('user_id', userId.toString());
    return apiClient.post('/developer-registration/step-two', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async submitStep3(userId: number, formData: FormData): Promise<ApiResponse> {
    formData.append('user_id', userId.toString());
    return apiClient.post('/developer-registration/step-three', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async submitStep4(userId: number, formData: FormData): Promise<ApiResponse> {
    formData.append('user_id', userId.toString());
    return apiClient.post('/developer-registration/step-four', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async submitStep5(userId: number, formData: Record<string, any>): Promise<ApiResponse> {
    return apiClient.post('/developer-registration/step-five', {
      user_id: userId,
      ...formData,
    });
  },
}; 