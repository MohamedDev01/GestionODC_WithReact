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

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s'-]/g, '');
    setName(value);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9@._-]/g, '');
    setEmail(value);
  };

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return '';
    try {
      const dateObj = new Date(dateString);
      return isNaN(dateObj.getTime()) ? 'Date invalide' : dateObj.toLocaleDateString('fr-FR');
    } catch {
      return 'Date invalide';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResults([]);
    setShowResults(false);

    if (!name.trim()) {
      setError('Veuillez entrer votre nom');
      return;
    }
    if (!date) {
      setError('Veuillez sélectionner une date');
      return;
    }
    if (!email.trim()) {
      setError('Veuillez entrer votre adresse email');
      return;
    }
    if (!validateEmail(email)) {
      setError('Veuillez entrer une adresse email valide');
      return;
    }

    setLoading(true);
    try {
      const response = await certificateService.searchCertificates({
        nom: name.trim(),
        date,
        email: email.trim()
      });
      if (response?.data?.length > 0) {
        setResults(response.data);
        setShowResults(true);
      } else {
        setError('Aucun certificat trouvé avec ces critères');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Erreur lors de la recherche');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (id) => {
    try {
      const response = await certificateService.downloadCertificate(id);
      if (response?.downloadUrl) {
        const link = document.createElement('a');
        link.href = response.downloadUrl;
        link.download = `certificat-${id}.pdf`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else setError('Impossible de télécharger le certificat');
    } catch (err) {
      console.error(err);
      setError('Erreur lors du téléchargement');
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

            {/* Nom */}
            <div className="input-group">
              <span className="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ff6600" strokeWidth="2">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM4 20v-2a4 4 0 014-4h8a4 4 0 014 4v2"/>
                </svg>
              </span>
              <input
                type="text"
                placeholder="Entrez votre nom complet"
                value={name}
                onChange={handleNameChange}
                className="form-input"
                disabled={loading}
              />
            </div>

            {/* Date */}
            <div className="input-group">
              <span className="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ff6600" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="form-input"
                disabled={loading}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>

            {/* Email */}
            <div className="input-group">
              <span className="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ff6600" strokeWidth="2">
                  <path d="M4 4h16v16H4z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </span>
              <input
                type="email"
                placeholder="Entrez votre email"
                value={email}
                onChange={handleEmailChange}
                className="form-input"
                disabled={loading}
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading || !name.trim() || !date || !email.trim() || !validateEmail(email)}>
              {loading ? 'Recherche en cours...' : 'Rechercher'}
            </button>
          </form>
        ) : (
          <div className="results-container">
            <h2 className="results-title">Résultats de la recherche</h2>
            {results.length > 0 ? (
              <div className="results-list">
                {results.map((cert) => (
                  <div key={cert.id} className="certificate-item">
                    <div className="certificate-info">
                      <h3>{cert.type}</h3>
                      <p><strong>Nom:</strong> {cert.nom}</p>
                      <p><strong>Email:</strong> {cert.email}</p>
                      <p><strong>Date:</strong> {formatDateForDisplay(cert.date)}</p>
                      <p><strong>Numéro:</strong> {cert.numeroCertificat}</p>
                    </div>
                    <button className="download-btn" onClick={() => handleDownload(cert.id)}>📥 Télécharger</button>
                  </div>
                ))}
              </div>
            ) : <p className="no-results">Aucun certificat trouvé avec ces critères.</p>}
            <button className="new-search-btn" onClick={handleNewSearch}>Nouvelle recherche</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateSearch;
