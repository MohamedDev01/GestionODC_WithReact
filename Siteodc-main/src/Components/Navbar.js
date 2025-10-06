import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../Styles/Navbar.css';
import LogoNav from '../Assets/LogoNav.png';
import { useAuth } from '../Contexts/AuthContext';

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const toggleMenu = () => setMenuActive(!menuActive);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav
      className="navbar"
      style={{
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
        height: '100px',
      }}
    >
      <div className="logo">
        <Link to="/home">
          <img src={LogoNav} alt="Logo ODC" className="logo-img" />
        </Link>
      </div>

      <div className="menu-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`menu ${menuActive ? 'active' : ''}`}>
        <li>
          <Link to="/home" className={`menu-item ${location.pathname === '/home' ? 'active' : ''}`}>
            Accueil
          </Link>
        </li>
        <li>
          <Link to="/hire" className={`menu-item ${location.pathname === '/hire' ? 'active' : ''}`}>
            Postuler
          </Link>
        </li>
       <li>
          <Link to="/certificat" className={`menu-item ${location.pathname === '/certificat' ? 'active' : ''}`}>
            Certificat
          </Link>
        </li>
        <li>
          <Link to="/learn" className={`menu-item ${location.pathname === '/learn' ? 'active' : ''}`}>
            Apprendre
          </Link>
        </li>

        {!isAuthenticated ? (
          <li>
            <Link to="/register" className={`menu-item ${location.pathname === '/register' ? 'active' : ''}`}>
              S’inscrire
            </Link>
          </li>
        ) : (
          <>
            <li>
              <Link to="/profile" className={`menu-item ${location.pathname === '/profile' ? 'active' : ''}`}>
                Mon profil
              </Link>
            </li>
            <li>
           
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
