import { apiClient, ApiResponse } from './apiClient';


export const dashboardApi = {
  async getDashboardStats(): Promise<ApiResponse> {
    const userId = localStorage.getItem('userId');

    return apiClient.get(`/developer-dashboard/get-dashboard-states/${userId}`);
  },

  async getListingStats(): Promise<ApiResponse> {
    const userId = localStorage.getItem('userId');

    return apiClient.get(`/developer-dashboard/get-listing-states/${userId}`);
  },
  async getAssetByStatus(status: string): Promise<ApiResponse> {
    const userId = localStorage.getItem('userId');

    return apiClient.get(`/developer-dashboard/get-asset-by-status/${userId}/${status}`);
  },


}; 