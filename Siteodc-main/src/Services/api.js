import axios from 'axios';

const API_BASE_URL = 'https://foo-lan-stretch-depot.trycloudflare.com/api/v1';

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

export default api;
