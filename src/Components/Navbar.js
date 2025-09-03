

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Styles/Navbar.css';
import LogoNav from '../Assets/LogoNav.png';
import { useAuth } from '../Contexts/AuthContext';

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const menuItems = [
    { label: "Accueil", path: "/home" },
    ...(isAuthenticated ? [] : [{ label: "S’inscrire", path: "/register" }]),
    { label: "Postuler", path: "/hire" },
    { label: "Certificat", path: "/certificat" },
    { label: "Apprendre", path: "/learn" },
  ];

  return (
    <nav className="navbar" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 9999,
      backgroundColor: '#000',
      padding: '10px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '100px'
    }}>
      <div className="logo">
        <Link to="/home">
          {/* J'ai remplacé `require` par la variable importée, c'est plus moderne */}
          <img src={LogoNav} alt="Logo ODC" className="logo-img" />
        </Link>
      </div>

      <div
        className="menu-toggle"
        onClick={toggleMenu}
        aria-label="Toggle menu"
        role="button"
        tabIndex="0"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`menu ${menuActive ? 'active' : ''}`}>
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`menu-item ${location.pathname.toLowerCase() === item.path.toLowerCase() ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
        {isAuthenticated && (
          <>
            <li>
              <Link
                to="/profile"
                className={`menu-item ${location.pathname.toLowerCase() === '/profile' ? 'active' : ''}`}
              >
                Mon profil
              </Link>
            </li>
            <li>
              <button
                onClick={logout}
                className="menu-item logout-btn"
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
              >
                Déconnexion
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;