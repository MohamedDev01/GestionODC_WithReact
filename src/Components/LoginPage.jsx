// src/Components/LoginPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useAuth } from "../Contexts/AuthContext";
import "../Styles/LoginPage.css";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ identifiant: "", motDePasse: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [identifiantError, setIdentifiantError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  // Liste blanche des domaines autorisés
  const allowedDomains = [
    "@gmail.com",
    "@yahoo.com",
    "@hotmail.com",
    "@outlook.com",
    "@live.com",
    "@icloud.com",
    "@aol.com",
    "@mail.com",
    "@protonmail.com",
    "@zoho.com"
  ];

  const phoneRegex = /^\d{10}$/; // exactement 10 chiffres

  // Vérifie si l'email se termine par un domaine autorisé
  const isAllowedEmail = (email) => {
    return allowedDomains.some((domain) => email.endsWith(domain));
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "identifiant") {
      // Si c'est uniquement des chiffres → limiter à 10
      if (/^\d*$/.test(value)) {
        value = value.slice(0, 10);
      } else {
        // Filtrer les caractères interdits pour email
        value = value.replace(/[^a-zA-Z0-9@._%+-]/g, "");
      }

      // Validation temps réel
      const trimmedValue = value.trim().toLowerCase();
      if (!trimmedValue) setIdentifiantError("");
      else if (!phoneRegex.test(trimmedValue) && !isAllowedEmail(trimmedValue)) {
        setIdentifiantError("Email non autorisé ou numéro incorrect. Utilisez un numéro à 10 chiffres ou un email autorisé.");
      } else {
        setIdentifiantError("");
      }
    }

    setCredentials({ ...credentials, [name]: value });
  };

  const validateForm = () => {
    const identifiant = credentials.identifiant.trim().toLowerCase();

    if (!identifiant) {
      toast.error("L'identifiant est requis");
      return false;
    }
    if (!credentials.motDePasse) {
      toast.error("Le mot de passe est requis");
      return false;
    }

    if (!phoneRegex.test(identifiant) && !isAllowedEmail(identifiant)) {
      toast.error("Identifiant invalide : utilisez un email autorisé ou un numéro à 10 chiffres");
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

      await login(loginData, rememberMe);
      toast.success("Connexion réussie ! Bienvenue !");
      navigate("/home");
    } catch (error) {
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
          {/* Champ Identifiant */}
          <div className="input-with-icon">
            <FaEnvelope className="input-icon" />
            <input
              type="text"
              name="identifiant"
              placeholder="Email ou numéro de téléphone"
              value={credentials.identifiant}
              onChange={handleChange}
              required
              disabled={isLoading}
              aria-label="Email ou numéro de téléphone"
              inputMode="email"
            />
          </div>
          {identifiantError && <p className="error-message">{identifiantError}</p>}

          {/* Champ Mot de passe */}
          <div className="input-with-icon">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="motDePasse"
              placeholder="Entrez votre mot de passe"
              value={credentials.motDePasse}
              onChange={(e) => setCredentials({ ...credentials, motDePasse: e.target.value })}
              required
              disabled={isLoading}
              aria-label="Mot de passe"/>
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