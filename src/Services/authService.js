// src/services/authService.js
import axios from "axios";

const API_URL = "http://192.168.252.227:8080/api"; 

// Connexion
export const login = async (identifiant, motDePasse) => {
  try {
    const response = await axios.post(`${API_URL}/auth/connexion`, {
     identifiant,
      motDePasse,
    });

    // Sauvegarde du token si besoin
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    return response.data;
  } catch (error) {
    console.error("Erreur API login :", error.response?.data || error.message);
    throw error;
  }
};

// Inscription
export const register = async (identifiant, motDePasse) => {
  try {
    const response = await axios.post(`${API_URL}/auth/inscription`, {
      identifiant,
      motDePasse
    });
    return response.data;
  } catch (error) {
    console.error("Erreur API register :", error.response?.data || error.message);
    throw error;
  }
};
