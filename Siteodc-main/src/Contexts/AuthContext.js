import React, { createContext, useContext, useState, useEffect } from "react";
import authService from "../Services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Vérifie si déjà connecté au refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Connexion
  const login = async (credentials) => {
    try {
      console.log("[AuthContext] Tentative login...");
      const data = await authService.login(credentials);

      console.log("[AuthContext] Réponse API login:", data);

      // Correction : accès à data.data
      const apiData = data?.data;
      if (apiData?.accessToken) {
        localStorage.setItem("token", apiData.accessToken);
        // On peut stocker tout apiData ou seulement les infos utiles
        const user = {
          id: apiData.id,
          nom: apiData.nom,
          prenoms: apiData.prenoms,
          email: apiData.email,
          contact: apiData.contact,
          profil: apiData.profil,
          type: apiData.type,
        };
        localStorage.setItem("user", JSON.stringify(user));

        setUser(user);
        setIsAuthenticated(true);

        return true;
      } else {
        console.error("[AuthContext] Pas de token reçu !");
        return false;
      }
    } catch (error) {
      console.error("[AuthContext] Erreur login:", error.response?.data || error.message);
      return false;
    }
  };

  // Déconnexion
  const logout = async () => {
    await authService.logout();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
