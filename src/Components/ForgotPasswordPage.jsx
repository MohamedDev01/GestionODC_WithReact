

import React, { useState } from 'react';
import { FaEnvelope } from 'react-icons/fa'; 
import toast from 'react-hot-toast'; 
import '../Styles/LoginPage.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  
 

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Demande de réinitialisation pour : ${email}`);

    // 3. Déclenchez le popup de succès ici !
    toast.success("Email envoyé !");
  };

  return (
    <main className="login-page-container">
      <div className="login-card">
        <h1 className="login-title">ENTRER VOTRE E-MAIL</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="input-with-icon">
            <FaEnvelope className="input-icon" />
            <input 
              type="email"  
              name="email" 
              placeholder="Entrez votre email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

        

          <button type="submit" className="login-button">
            Envoyer le lien
          </button>
          
          
        </form>
      </div>
    </main>
  );
};

export default ForgotPasswordPage;