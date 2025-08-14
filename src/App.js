// App.js (VERSION MISE À JOUR)

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Import de vos composants de structure
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import PageTitle from './Components/PageTitle';
import ProtectedRoute from './Components/ProtectedRoute';

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
import UserProfilePage from './Complete-Page/UserProfilePage';

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
<<<<<<< HEAD
        <div className="page-content">
          <Routes>
            {/* Routes générales */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />

            {/* Routes d'authentification */}
            <Route path="/register" element={<Connect />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* Route pour le profil utilisateur */}
            <Route path="/profile" element={<UserProfilePage />} />
            
            {/* Routes de récupération de mot de passe */}
            <Route path="/mot-de-passe-oublie" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

            {/* Autres pages */}
            <Route path="/hire" element={<Hire />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/learn/courses" element={<CourseCatalog />} />
            <Route path="/certificat" element={<CertificateSearch />} />

          </Routes>
        </div>
=======
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Connect />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Route protégée pour le profil utilisateur */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <UserProfilePage />
            </ProtectedRoute>
          } />
          
          <Route path="/mot-de-passe-oublie" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="/hire" element={<Hire />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/courses" element={<CourseCatalog />} />
          <Route path="/certificat" element={<CertificateSearch />} />
        </Routes>
>>>>>>> c92a624 (Version Rabi 14/08/25)
        <Footer />
      </div>
    </Router>
  );
}

export default App;
