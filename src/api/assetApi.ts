import { apiClient, ApiResponse } from './apiClient';


export const assetApi = {
  async basic(formData: FormData): Promise<ApiResponse> {


    return apiClient.post('/developer-dashboard/add-asset', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async unitPrice(assetId: number, formData: FormData): Promise<ApiResponse> {

    formData.append('asset_id', assetId.toString());
    return apiClient.post('/developer-dashboard/unit-price', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async milestone(assetId: number, formData: FormData): Promise<ApiResponse> {
    formData.append('asset_id', assetId.toString());
    return apiClient.post('/developer-dashboard/add-milestone', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async uploadDocument(assetId: number, formData: FormData): Promise<ApiResponse> {
    formData.append('asset_id', assetId.toString());
    return apiClient.post('/developer-dashboard/upload-document', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async deleteMedia(mediaId: number): Promise<ApiResponse> {

    return apiClient.delete(`/developer-dashboard/delete-media/${mediaId}`);
  },

  async getMilestones(assetId: number): Promise<ApiResponse> {

    return apiClient.get(`/developer-dashboard/get-milestones/${assetId}`);
  },

  async deleteMilestone(milestoneId: string): Promise<ApiResponse> {
    return apiClient.delete(`/developer-dashboard/delete-milestone/${milestoneId}`);
  },

  async editMilestone(milestoneId: string, formData: FormData): Promise<ApiResponse> {
    return apiClient.put(`/developer-dashboard/edit-milestone/${milestoneId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async getAsset(assetId: number): Promise<ApiResponse> {

    return apiClient.get(`/developer-dashboard/get-asset/${assetId}`);
  },


  async updateAssetStatus(assetId: number, status: string): Promise<ApiResponse> {

    return apiClient.get(`/developer-dashboard/update-asset-status/${assetId}/${status}`);
  },

  async editbasic(assetId: number, formData: FormData): Promise<ApiResponse> {


    return apiClient.post(`/developer-dashboard/edit-asset/${assetId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async editUnitPrice(assetId: number, formData: FormData): Promise<ApiResponse> {

    return apiClient.post(`/developer-dashboard/edit-unit-price/${assetId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async getAssetListingHavingMilestone(): Promise<ApiResponse> {
    const userId = localStorage.getItem('userId');
    return apiClient.get(`/developer-dashboard/get-asset-having-milestone/${userId}`);
  },
}; 