import React, { useState } from 'react';
import '../Styles/CertificateSearch.css'; 

const CertificateSearch = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log({
      name,
      date,
      email,
    });
    alert('Recherche lancée ! (Vérifiez la console)');
  };

  return (
    <div className="search-page-container">
       
      <div className="certificate-card">
        <form onSubmit={handleSubmit} className="certificate-form">
          <h1 className="login-title">RECHERCHER MAINTENANT !</h1>
          {/* Champ Nom */}
          <div className="input-group">
            <input
              type="text"
              placeholder="Entrez votre nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              required
            />
          </div>

          {/* Champ Date */}
          <div className="input-group">
            <input
              type="text"
              placeholder="jj/mm/aaaa"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              onFocus={(e) => (e.target.type = 'date')} 
              onBlur={(e) => (e.target.type = 'text')}  
              className="form-input"
              required
            />
          </div>

          {/* Champ Email */}
          <div className="input-group">
            <input
              type="email"
              placeholder="Entrez votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
            />
          </div>

          {/* Bouton de soumission */}
          <button type="submit" className="submit-btn">
            Rechercher
          </button>
        </form>
      </div>
    </div>
  );
};

export default CertificateSearch;