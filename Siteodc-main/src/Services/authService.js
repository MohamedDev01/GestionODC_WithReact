import api from "./api";

const authService = {
  // Connexion
  login: async (credentials) => {
    try {
      // ⚠️ Le backend attend "identifiant" et "motDePasse"
      const payload = {
        identifiant: credentials.identifiant, // email ou contact
        motDePasse: credentials.motDePasse,
      };

      console.log("[DEBUG] Payload envoyé pour login:", payload);

      const response = await api.post("/auth/connexion", payload);
      console.log("[DEBUG] Réponse login API:", response.data);

      return response.data;
    } catch (error) {
      console.error("[DEBUG] Erreur login API:", error.response?.data || error.message);
      throw error; // relance pour gestion dans AuthContext
    }
  },

  // Inscription
  register: async (userData) => {
    try {
      const payload = {
        nom: userData.nom,
        prenoms: userData.prenoms,
        email: userData.email,
        contact: userData.contact,
        motDePasse: userData.motDePasse,
      };

      console.log("[DEBUG] Payload envoyé pour inscription:", payload);

      const response = await api.post("/auth/inscription", payload);
      console.log("[DEBUG] Réponse inscription API:", response.data);

      return response.data;
    } catch (error) {
      console.error("[DEBUG] Erreur inscription API:", error.response?.data || error.message);
      throw error;
    }
  },

  // Déconnexion
  logout: async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await api.post("/auth/deconnexion", { refreshToken });
      }
    } catch (err) {
      console.warn("[DEBUG] Erreur logout (ignorée si non gérée par API):", err.message);
    } finally {
      // Supprime tout localement
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    }
  },

  // Vérifie si un utilisateur est authentifié
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },
};

export default authService;
