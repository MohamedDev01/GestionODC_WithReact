// LoginPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa'; // On utilise des icônes pour un rendu propre
import '../Styles/LoginPage.css'; // Un nouveau fichier CSS pour cette page

const LoginPage = () => {
  // On garde l'état pour que les champs de texte soient contrôlés
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // La fonction handleSubmit est simplifiée pour le moment
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    
    // Pour l'instant, on affiche juste les données dans la console
    console.log("Tentative de connexion avec :", credentials);
    alert("Simulation de connexion réussie !");
    navigate('/home'); // Redirige vers la page d'accueil
  };

  return (
    <main className="login-page-container">
      <div className="login-card">
        <h1 className="login-title">SE CONNECTER MAINTENANT !</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="input-with-icon">
            <FaUser className="input-icon" />
            <input 
              type="text" 
              name="email" 
              placeholder="Email/Numéro de téléphone" 
              value={credentials.email}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="input-with-icon">
            <FaLock className="input-icon" />
            <input 
              type="password" 
              name="password" 
              placeholder="Entrée votre mot de passe" 
              value={credentials.password}
              onChange={handleChange}
              required 
            />
          </div>

          <button type="submit" className="login-button">
            Se connecter
          </button>

          <div className="login-options">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">restez connecté(e)</label>
            </div>
            <Link to="/mot-de-passe-oublie" className="forgot-password-link">
              Mot de passe oublié ?
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;