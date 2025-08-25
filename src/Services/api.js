import axios from 'axios';

const API_BASE_URL = 'http://192.168.252.227:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  withCredentials: true,
});

// Intercepteur requêtes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`, config.data);
    return config;
  },
  (error) => {
    console.error('[API] Erreur requête:', error);
    return Promise.reject(error);
  }
);

// Intercepteur réponses
api.interceptors.response.use(
  (response) => {
    console.log('[API] Réponse reçue:', response.data);
    return response;
  },
  (error) => {
    console.error('[API] Erreur réponse:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const SIMULATION_MODE = false;

export const authService = {
  // Inscription
  register: async (userData) => {
    const payload = {
      nom: userData.nom,
      prenoms: userData.prenoms,
      email: userData.email,
      contact: userData.contact,
      motDePasse: userData.motDePasse,
    };

    if (SIMULATION_MODE) {
      console.log('Mode simulation - Inscription:', payload);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { message: 'Inscription réussie', user: payload };
    }

    try {
      const response = await api.post('/auth/inscription', payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Connexion
  login: async (credentials) => {
    const payload = {
      identifiant: credentials.identifiant,
      motDePasse: credentials.motDePasse,
    };

    if (SIMULATION_MODE) {
      console.log('Mode simulation - Connexion:', payload);
      await new Promise(resolve => setTimeout(resolve, 800));
      const mockToken = 'mock_jwt_token_' + Date.now();
      const mockUser = { id: 1, nom: 'Utilisateur', prenoms: 'Test', email: payload.email };
      localStorage.setItem('authToken', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return { token: mockToken, user: mockUser, message: 'Connexion réussie' };
    }

    try {
      const response = await api.post('/auth/connexion', payload);
      if (response.data.token) localStorage.setItem('authToken', response.data.token);
      if (response.data.user) localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/deconnexion');
    } catch (error) {
      console.error('Erreur déconnexion:', error);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  },

  isAuthenticated: () => !!(localStorage.getItem('authToken') || sessionStorage.getItem('authToken')),

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

// Certificate Service
export const certificateService = {
  // Search certificates
  searchCertificates: async (searchParams) => {
    const params = new URLSearchParams({
      nom: searchParams.nom || '',
      date: searchParams.date || '',
      email: searchParams.email || '',
    });

    if (SIMULATION_MODE) {
      console.log('Mode simulation - Recherche certificats:', searchParams);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        success: true,
        data: [
          {
            id: 1,
            nom: searchParams.nom,
            date: searchParams.date,
            email: searchParams.email,
            numeroCertificat: 'CERT-2024-001',
            type: 'Attestation de participation',
            statut: 'Validé',
            dateEmission: '2024-01-15',
            url: '/certificates/cert-2024-001.pdf'
          }
        ]
      };
    }

    try {
      const response = await api.get(`/certificats/recherche?${params}`);
      return response.data;
    } catch (error) {
      console.error('Search error:', error);
      throw new Error(error.response?.data?.message || 'Erreur lors de la recherche');
    }
  },

  // Download certificate
  downloadCertificate: async (certificateId) => {
    if (SIMULATION_MODE) {
      console.log('Mode simulation - Téléchargement certificat:', certificateId);
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        success: true,
        downloadUrl: `/mock-certificates/${certificateId}.pdf`
      };
    }

    try {
      const response = await api.get(`/certificats/${certificateId}/telecharger`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get certificate details
  getCertificateDetails: async (certificateId) => {
    if (SIMULATION_MODE) {
      console.log('Mode simulation - Détails certificat:', certificateId);
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        success: true,
        data: {
          id: certificateId,
          nom: 'Jean Dupont',
          date: '2024-01-15',
          email: 'jean.dupont@example.com',
          numeroCertificat: certificateId,
          type: 'Attestation de participation',
          statut: 'Validé',
          dateEmission: '2024-01-15',
          url: `/certificates/${certificateId}.pdf`
        }
      };
    }

    try {
      const response = await api.get(`/certificats/${certificateId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default api;
