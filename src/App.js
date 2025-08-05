<<<<<<< HEAD
// src/App.js (VERSION CORRIGÉE)

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import de vos composants de structure
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import PageTitle from './Components/PageTitle';

// Import de vos pages
import Home from './Complete-Page/Home';
import Connect from './Complete-Page/Connect';
import LoginPage from './Components/LoginPage';     
import Hire from './Complete-Page/Hire';
import Learn from './Complete-Page/Learn';
import CourseCatalog from './Components/CourseCatalog';
import CertificateSearch from './Components/CertificateSearch'; 

function App() {
  return (
    <Router>
      <div className="App">
        <PageTitle />
        <Navbar />
        <Routes>
          {/* Routes générales */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          {/* Routes d'authentification */}
          <Route path="/register" element={<Connect />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Autres pages */}
          <Route path="/hire" element={<Hire />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/courses" element={<CourseCatalog />} />
          
     
          <Route path="/certificat" element={<CertificateSearch />} />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

=======
// App.js (VERSION CORRIGÉE ET COMPLÈTE)

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import de vos composants de structure
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import PageTitle from './Components/PageTitle';

// Import de vos pages
import Home from './Complete-Page/Home';
import Connect from './Complete-Page/Connect';         // Page d'INSCRIPTION
import LoginPage from './Components/LoginPage';     // ✅ IMPORTATION MANQUANTE AJOUTÉE
import Hire from './Complete-Page/Hire';
import Certificat from './Complete-Page/Certificat';
import Learn from './Complete-Page/Learn';
import CourseCatalog from './Components/CourseCatalog';

function App() {
  return (
    <Router>
      <div className="App">
        <PageTitle />
        <Navbar />
        <Routes>
          {/* Routes générales */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          
          {/* 
            ✅ CORRECTION : 
            On rajoute les routes pour les pages d'inscription et de connexion.
          */}
          <Route path="/register" element={<Connect />} />   {/* Inscription est sur /register */}
          <Route path="/login" element={<LoginPage />} />      {/* Connexion est sur /login */}
          
          {/* Autres pages */}
          <Route path="/hire" element={<Hire />} />
          <Route path="/certificat" element={<Certificat />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/courses" element={<CourseCatalog />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

>>>>>>> 5dc6d863e76fa1d8c8200f0be1acee759e8bdad0
export default App;