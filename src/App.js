import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import PageTitle from './Components/PageTitle';
import Home from './Complete-Page/Home';
import Connect from './Complete-Page/Connect';
import Hire from './Complete-Page/Hire';
import Certificat from './Complete-Page/Certificat';
import Learn from './Complete-Page/Learn';

function App() {
  return (
    <Router>
      <div className="App">
        <PageTitle />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Connect />} />
          <Route path="/hire" element={<Hire />} />
          <Route path="/certificat" element={<Certificat />} />
          <Route path="/learn" element={<Learn />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
