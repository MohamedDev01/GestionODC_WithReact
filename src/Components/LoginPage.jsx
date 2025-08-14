<<<<<<< HEAD
=======
// src/Components/LoginPage.jsx

>>>>>>> c92a624 (Version Rabi 14/08/25)
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaUser, FaLock } from 'react-icons/fa'; 
import { authService } from '../Services/api';
import '../Styles/LoginPage.css'; 

const LoginPage = () => {
  const [credentials, setCredentials] = useState({identifiant: '', motDePasse: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!credentials.identifiant.trim()) {
      toast.error("L'identifiantest requis");
      return false;
    }
    if (!credentials.motDePasse) {
      toast.error('Le mot de passe est requis');
      return false;
    }
    const identifiantRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!identifiantRegex.test(credentials.identifiant)) {
      toast.error("Format d'identifiantinvalide");
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
        motDePasse: credentials.motDePasse
      };

      console.log('Données envoyées:', loginData);

      const response = await authService.login(loginData);
      console.log('Réponse API:', response);

      const { token, user } = response.data;

      toast.success('Connexion réussie ! Bienvenue !');

      // Stockage du token et info utilisateur
      if (rememberMe) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }
      localStorage.setItem('user', JSON.stringify(user));

      setTimeout(() => navigate('/profile'), 1000);

    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      const status = error.response?.status;
      if (status === 401) toast.error('identifiant ou mot de passe incorrect');
      else if (status === 404) toast.error('Compte non trouvé');
      else if (status === 403) toast.error('Compte désactivé');
      else if (status === 500) toast.error('Erreur serveur');
      else toast.error('Erreur lors de la connexion');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="login-page-container">
      <div className="login-card">
        <h1 className="login-title">SE CONNECTER MAINTENANT !</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-with-icon">
            <FaUser className="input-icon" />
            <input 
              type="identifiant"
              name="identifiant"
              placeholder="identifiant"
              value={credentials.identifiant}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="input-with-icon">
            <FaLock className="input-icon" />
            <input 
              type="password"
              name="motDePasse"
              placeholder="Entrez votre mot de passe"
              value={credentials.motDePasse}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Connexion...' : 'Se connecter'}
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
