// src/Complete-Page/Learn.jsx (Corrigé)

import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Learn.css';

const Learn = () => {
  return (
   
    <main className="learn-landing-page"> 
      <div className="container-learning">
        <Link to="/learn/courses">
          <button className="btn-moodle">
            ACCEDER AU SITE <br/>
            E-LEARNING
          </button>
        </Link>
      </div>
    </main>
  );
};

export default Learn;