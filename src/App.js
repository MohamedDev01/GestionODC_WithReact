// App.js (VERSION MISE À JOUR)

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Import de vos composants de structure
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import PageTitle from './Components/PageTitle';

// Import de vos pages
import Home from './Complete-Page/Home';
import Connect from './Complete-Page/Connect';
import LoginPage from './Components/LoginPage';     
import ForgotPasswordPage from './Components/ForgotPasswordPage';
import ResetPasswordPage from './Complete-Page/ResetPasswordPage'; 
import Hire from './Complete-Page/Hire';
import Learn from './Complete-Page/Learn';
import CourseCatalog from './Components/CourseCatalog';
import CertificateSearch from './Components/CertificateSearch'; 
import UserProfilePage from './Complete-Page/UserProfilePage'; // <-- 1. IMPORTEZ VOTRE NOUVELLE PAGE

function App() {
  return (
    <Router>
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            duration: 3000,
            style: {
              background: '#d4edda',
              color: '#155724',
            },
          },
        }}
      />

      <div className="App">
        <PageTitle />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Connect />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* 👇 2. AJOUTEZ LA ROUTE POUR LE PROFIL UTILISATEUR ICI 👇 */}
          <Route path="/profile" element={<UserProfilePage />} />
          
          <Route path="/mot-de-passe-oublie" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
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

export default App;