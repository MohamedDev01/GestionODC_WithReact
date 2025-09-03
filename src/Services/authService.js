import api from './api';
import { tokenService } from './tokenService';

// Simulation mode removed - using backend for authentication

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

    try {
      const response = await api.post('/auth/inscription', payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Connexion
  login: async (credentials, rememberMe = false) => {
    const payload = {
      identifiant: credentials.identifiant,
      motDePasse: credentials.motDePasse,
    };

    try {
      const response = await api.post('/auth/connexion', payload);
      
      if (response.data.token) {
        tokenService.setToken(response.data.token, rememberMe);
      }
      
      if (response.data.user) {
        tokenService.setUser(response.data.user, rememberMe);
      }
      
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
      tokenService.clearToken();
      tokenService.clearUser();
    }
  },

  isAuthenticated: () => {
    return tokenService.hasToken() && tokenService.isValidToken(tokenService.getToken());
  },

  getCurrentUser: () => {
    return tokenService.getUser();
  },

  // Check if user is authenticated on app load
  checkAuthStatus: async () => {
    return await tokenService.checkAutoLogin();
  },

  // Get auth token for API calls
  getAuthToken: () => {
    return tokenService.getToken();
  }
};

export default authService;
