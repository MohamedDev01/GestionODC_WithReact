// src/Components/CourseCatalog.jsx (Version Corrigée)

import React from 'react';
import '../Styles/CourseCatalog.css';
import { FaDesktop, FaPenNib, FaLightbulb, FaRobot, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const categories = [
    { name: 'Developpement', icon: <FaDesktop /> },
    { name: 'Design', icon: <FaPenNib /> },
    { name: 'Marketing', icon: <FaLightbulb /> },
    { name: 'Robotique', icon: <FaRobot /> },
];

const courses = [
    { title: 'Apprendre JavaScript' },
    { title: 'Les fondamentaux du Design Graphic' },
    { title: 'Apprendre la Robotique' },
    { title: 'Apprendre React' },
    { title: 'Devenir Référent Digital' },
    { title: 'La Robotique pour l\'Agriculture' },
];

const CourseCatalog = () => {
  return (
    <main className="course-catalog-page">
      <div className="container">
        <section className="category-section">
          <h1 className="page-main-title">Que veux-tu apprendre aujourd'hui ?</h1>
          <div className="category-slider">
            <button className="slider-arrow" aria-label="Précédent"><FaChevronLeft /></button>
            <div className="category-list">
              {categories.map((cat, index) => (
                <div key={index} className="category-item">
                  <div className="category-icon-wrapper">{cat.icon}</div>
                  <p>{cat.name}</p>
                </div>
              ))}
            </div>
            <button className="slider-arrow" aria-label="Suivant"><FaChevronRight /></button>
          </div>
          <button className="voir-plus-btn">Voir plus</button>
        </section>

        <section className="popular-courses-section">
          <h2 className="section-title-left">Cours les plus populaires</h2>
          <div className="courses-grid">
            {/* MODIFICATION ICI : On remplace l'image par un placeholder */}
            {courses.map((course, index) => (
              <div key={index} className="course-card">
                <div className="course-placeholder">
                  <h3>{course.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* CORRECTION DES FLÈCHES DE PAGINATION */}
        <nav className="pagination">
          <a href="#prev" className="pagination-arrow">{'<'}</a>
          <a href="#1" className="pagination-link active">1</a>
          <a href="#2" className="pagination-link">2</a>
          <a href="#3" className="pagination-link">3</a>
          <a href="#4" className="pagination-link">4</a>
          <a href="#5" className="pagination-link">5</a>
          <a href="#6" className="pagination-link">6</a>
          <a href="#next" className="pagination-arrow">{'>'}</a>
        </nav>
      </div>
    </main>
  );
};

export default CourseCatalog;
