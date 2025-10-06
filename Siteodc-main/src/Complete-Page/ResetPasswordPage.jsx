

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';
import '../Styles/LoginPage.css'; 

const ResetPasswordPage = () => {
  
  const { token } = useParams(); 
  const navigate = useNavigate();

  const [passwords, setPasswords] = useState({ password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // On efface les erreurs précédentes

    // Validation 1 : Les mots de passe correspondent-ils ?
    if (passwords.password !== passwords.confirmPassword) {
      setError('Les deux mots de passe ne correspondent pas.');
      return;
    }

    // Validation 2 : Le mot de passe est-il assez long ? (recommandé)
    if (passwords.password.length < 8) {
        setError('Le mot de passe doit contenir au moins 8 caractères.');
        return;
    }
    
    // Si tout est bon, on envoie les données au backend
    console.log('Envoi au backend pour réinitialisation...');
    console.log('Token:', token);
    console.log('Nouveau mot de passe:', passwords.password);

    // Simulation d'une réponse positive de votre API
    setMessage('Votre mot de passe a été réinitialisé avec succès ! Redirection en cours...');

    // On redirige l'utilisateur vers la page de connexion après 3 secondes
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };

  return (
    <main className="login-page-container">
      <div className="login-card">
        <h1 className="login-title">RÉINITIALISEZ VOTRE MOT DE PASSE !</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="input-with-icon">
            <FaLock className="input-icon" />
            <input 
              type="password"
              name="password"
              placeholder="Entrez votre nouveau mot de passe"
              value={passwords.password}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="input-with-icon">
            <FaLock className="input-icon" />
            <input 
              type="password"
              name="confirmPassword"
              placeholder="Entrez à nouveau votre mot de passe"
              value={passwords.confirmPassword}
              onChange={handleChange}
              required 
            />
          </div>
          
          {/* Affiche les messages d'erreur ou de succès */}
          {error && <p className="error-message">{error}</p>}
          {message && <p className="confirmation-message">{message}</p>}

          <button type="submit" className="login-button" disabled={!!message}>
            Réinitialiser le mot de passe
          </button>
        </form>
      </div>
    </main>
  );
};

export default ResetPasswordPage;