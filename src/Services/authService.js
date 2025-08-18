import api from './api';

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
      const mockUser = { id: 1, nom: 'Utilisateur', prenoms: 'Test', email: payload.identifiant };
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

  isAuthenticated: () => !!localStorage.getItem('authToken'),

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

export default authService;
