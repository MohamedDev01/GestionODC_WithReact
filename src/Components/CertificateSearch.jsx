import React, { useState } from 'react';
import { certificateService } from '../Services/api';
import '../Styles/CertificateSearch.css';

const CertificateSearch = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // Validation functions
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };


  const formatDateForDisplay = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? 'Date invalide' : date.toLocaleDateString('fr-FR');
    } catch {
      return 'Date invalide';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResults([]);
    setShowResults(false);

    // Validation
    if (!name.trim()) {
      setError('Veuillez entrer votre nom');
      return;
    }

    if (!email.trim()) {
      setError('Veuillez entrer votre email');
      return;
    }

    if (!validateEmail(email)) {
      setError('Veuillez entrer une adresse email valide');
      return;
    }

    if (!date) {
      setError('Veuillez sélectionner une date');
      return;
    }

    setLoading(true);

    try {
      const searchParams = {
        nom: name.trim(),
        date: date,
        email: email.trim()
      };

      const response = await certificateService.searchCertificates(searchParams);
      
      if (response && response.data && Array.isArray(response.data) && response.data.length > 0) {
        setResults(response.data);
        setShowResults(true);
      } else {
        setResults([]);
        setError('Aucun certificat trouvé avec ces critères');
      }
    } catch (err) {
      console.error('Erreur lors de la recherche:', err);
      setError(err.response?.data?.message || 'Erreur lors de la recherche. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (certificateId) => {
    try {
      const response = await certificateService.downloadCertificate(certificateId);
      if (response && response.downloadUrl) {
        // Create download link
        const link = document.createElement('a');
        link.href = response.downloadUrl;
        link.download = `certificat-${certificateId}.pdf`;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        setError('Impossible de télécharger le certificat');
      }
    } catch (err) {
      console.error('Erreur lors du téléchargement:', err);
      setError(err.response?.data?.message || 'Erreur lors du téléchargement du certificat');
    }
  };

  const handleNewSearch = () => {
    setShowResults(false);
    setResults([]);
    setError(null);
    setName('');
    setDate('');
    setEmail('');
  };

  return (
    <div className="search-page-container">
      <div className="certificate-card">
        {!showResults ? (
          <form onSubmit={handleSubmit} className="certificate-form">
            <h1 className="login-title">RECHERCHER MAINTENANT !</h1>
            
            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            {/* Champ Nom */}
            <div className="input-group">
              <label htmlFor="name" className="input-label">Nom complet</label>
              <input
                id="name"
                type="text"
                placeholder="Entrez votre nom complet"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
                required
                disabled={loading}
                maxLength="100"
              />
            </div>

            {/* Champ Date */}
            <div className="input-group">
              <label htmlFor="date" className="input-label">Date de naissance</label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="form-input"
                required
                disabled={loading}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>

            {/* Champ Email */}
            <div className="input-group">
              <label htmlFor="email" className="input-label">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Entrez votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                required
                disabled={loading}
                maxLength="255"
              />
            </div>

            {/* Bouton de soumission */}
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Recherche en cours...
                </>
              ) : (
                'Rechercher'
              )}
            </button>
          </form>
        ) : (
          <div className="results-container">
            <h2 className="results-title">Résultats de la recherche</h2>
            
            {results.length > 0 ? (
              <div className="results-list">
                {results.map((certificate) => (
                  <div key={certificate.id} className="certificate-item">
                    <div className="certificate-info">
                      <h3>{certificate.type}</h3>
                      <p><strong>Nom:</strong> {certificate.nom}</p>
                      <p><strong>Email:</strong> {certificate.email}</p>
                      <p><strong>Date:</strong> {formatDateForDisplay(certificate.date)}</p>
                      <p><strong>Numéro:</strong> {certificate.numeroCertificat}</p>
                      <p><strong>Statut:</strong> 
                        <span className={`status ${certificate.statut?.toLowerCase() || 'unknown'}`}>
                          {certificate.statut || 'Inconnu'}
                        </span>
                      </p>
                    </div>
                    <button 
                      className="download-btn"
                      onClick={() => handleDownload(certificate.id)}
                    >
                      📥 Télécharger
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <p>Aucun certificat trouvé avec ces critères.</p>
              </div>
            )}
            
            <button className="new-search-btn" onClick={handleNewSearch}>
              Nouvelle recherche
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateSearch;
