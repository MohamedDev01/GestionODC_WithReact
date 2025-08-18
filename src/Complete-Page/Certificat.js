import React from 'react';
import CertificateSearch from '../Components/CertificateSearch';

const Certificat = () => {
  return (
    <main className="certificat-page">
      <div className="container">
        <h1>Recherche de Certificats</h1>
        <p>Recherchez et vérifiez l'authenticité des certificats délivrés par Orange Digital Center.</p>
        <CertificateSearch />
      </div>
    </main>
  );
};

export default Certificat;
