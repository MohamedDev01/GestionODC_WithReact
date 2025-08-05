import React, { useState } from 'react';
import '../Styles/CertificateSearch.css'; // Le fichier CSS a aussi été modifié

const CertificateSearch = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique de recherche à implémenter ici
    // Par exemple, appeler une API avec les données
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
              onFocus={(e) => (e.target.type = 'date')} // Change le type au focus pour le date picker
              onBlur={(e) => (e.target.type = 'text')}  // Revient au texte si rien n'est sélectionné
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