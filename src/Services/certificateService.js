import api from './api';

export const certificateService = {
  // Search certificates
  searchCertificates: async (searchData) => {
    try {
      const response = await api.post('/certificats/recherche', searchData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Download certificate
  downloadCertificate: async (certificateId) => {
    try {
      const response = await api.get(`/certificats/telecharger/${certificateId}`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default certificateService;
