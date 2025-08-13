// App.js (VERSION CORRIGÉE)

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
        <div className="page-content">
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
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
