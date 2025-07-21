import React from 'react';
import '../Styles/Footer.css';
import LogoNav from '../Assets/LogoNav.png';

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="footer-top">
        <div className="footer-logo">
          <img src={LogoNav} alt="Logo ODC" />
        </div>
        <div className="footer-contact">
          <p>+225 27 34 56 78 34</p>
          <p>Orangedigital@Centers.com</p>
        </div>
      </div>
      <div className="footer-line"></div>
      <div className="footer-bottom">
        <span>© Copyright By Cohorte 7 ODA</span>
      </div>
    </footer>
  );
};

export default Footer;
