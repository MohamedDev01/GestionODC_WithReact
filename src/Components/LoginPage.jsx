// src/Components/LoginPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { authService } from "../Services/api";
import "../Styles/LoginPage.css";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ identifiant: "", motDePasse: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!credentials.identifiant.trim()) {
      toast.error("L'identifiant est requis");
      return false;
    }
    if (!credentials.motDePasse) {
      toast.error("Le mot de passe est requis");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.identifiant)) {
      toast.error("Format d'email invalide");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const loginData = {
        identifiant: credentials.identifiant.trim().toLowerCase(),
        motDePasse: credentials.motDePasse,
      };

      console.log("Données envoyées:", loginData);

      const response = await authService.login(loginData, rememberMe);
      console.log("Réponse API:", response);

      toast.success("Connexion réussie ! Bienvenue !");
      setTimeout(() => navigate("/home"), 1000);
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      const status = error.response?.status;
      if (status === 401) toast.error("Email ou mot de passe incorrect");
      else if (status === 404) toast.error("Compte non trouvé");
      else if (status === 403) toast.error("Compte désactivé");
      else if (status === 500) toast.error("Erreur serveur");
      else toast.error("Erreur lors de la connexion");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="login-page-container">
      <div className="login-card">
        <h1 className="login-title">SE CONNECTER MAINTENANT !</h1>

        <form onSubmit={handleSubmit}>
          {/* Champ Email */}
          <div className="input-with-icon email-input">
            <input
              type="email"
              name="identifiant"
              placeholder="Email"
              value={credentials.identifiant}
              onChange={handleChange}
              required
              disabled={isLoading}
              aria-label="Adresse email"
            />
          </div>

          {/* Champ Mot de passe */}
          <div className="input-with-icon password-input">
            <input
              type="password"
              name="motDePasse"
              placeholder="Entrez votre mot de passe"
              value={credentials.motDePasse}
              onChange={handleChange}
              required
              disabled={isLoading}
              aria-label="Mot de passe"
            />
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Connexion..." : "Se connecter"}
          </button>

          <div className="login-options">
            <div className="remember-me">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLoading}
              />
              <label htmlFor="remember">Restez connecté(e)</label>
            </div>
            <Link to="/mot-de-passe-oublie" className="forgot-password-link">
              Mot de passe oublié ?
            </Link>
          </div>
        </form>

        <p className="register-prompt">
          Vous n'avez pas de compte ? <Link to="/register">Inscrivez-vous</Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
