import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import '../Styles/Navbar.css';
const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const menuItems = [
    { label: "Accueil", path: "/home" },
    { label: "S'inscrire", path: "/login" },
    { label: "Postuler", path: "/hire" },
    { label: "Certificat", path: "/certificat" },
    { label: "Apprendre", path: "/learn" },
  ];

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/home">
          <img src={require("../Assets/LogoNav.png")} alt="Logo ODC" className="logo-img" />
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
      </ul>
    </nav>
  );
};

export default Navbar;
