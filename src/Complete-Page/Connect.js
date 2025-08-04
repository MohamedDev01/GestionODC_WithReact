// src/Complete-Page/Connect.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Connect.css'; // On va utiliser ce fichier CSS

// Assurez-vous que le nom du fichier image est correct
import phoneImage from '../Assets/Apps.png'; 

const Connect = () => {
  return (
    <main className="connect-page-container">
      <div className="connect-card">
        {/* Colonne de gauche avec le téléphone */}
        <div className="connect-left-panel">
          <img src={phoneImage} alt="Application Orange Digital Center" className="phone-image" />
        </div>

        {/* Colonne de droite avec le formulaire */}
        <div className="connect-right-panel">
          <h1 className="connect-title">Inscrivez-vous dès maintenant !</h1>
          <p className="connect-subtitle">
            Accédez gratuitement à des formations, outils et opportunités pour développer ses compétences numériques et entreprendre.
          </p>
          
          <form className="connect-form">
            <div className="form-grid">
              
              <div className="form-group">
                <label htmlFor="nom">Nom</label>
                <input type="text" id="nom" name="nom" />
              </div>
              <div className="form-group">
                <label htmlFor="prenoms">Prénoms</label>
                <input type="text" id="prenoms" name="prenoms" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" />
              </div>
              <div className="form-group">
                <label htmlFor="numero">Numéro</label>
                <input type="tel" id="numero" name="numero" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <input type="password" id="password" name="password" />
              </div>
              <div className="form-group">
                <label htmlFor="confirm-password">Confirmer mot de passe</label>
                <input type="password" id="confirm-password" name="confirm-password" />
              </div>

            </div>

            <div className="form-terms">
              <input type="checkbox" id="terms" name="terms" />
              <label htmlFor="terms">J'ai lu les conditions d'utilisations</label>
            </div>

            <button type="submit" className="submit-button">
              CONFIRMEZ VOTRE INSCRIPTION
            </button>
          </form>

          <p className="login-prompt">
            J'ai déjà un compte, <Link to="/login">je me connecte</Link>.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Connect;