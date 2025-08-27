import React, { useState } from 'react';
import '../Styles/Hire.css';
import securityImg from '../Assets/security.jpg';
import internetImg from '../Assets/internet.jpg';

const Hire = () => {
  const [search, setSearch] = useState("");

  const courses = [
    {
      title: "Initiation à la Cybersécurité",
      description:
        "Cette formation vous initie aux fondamentaux de la cybersécurité : protection des systèmes informatiques, détection des menaces, bonnes pratiques numériques et prévention des cyberattaques. Idéale pour débutants ou professionnels souhaitant renforcer leurs compétences en sécurité informatique.",
      img: securityImg,
      date: "08/08/2025",
      duration: "3 semaines",
    },
    {
      title: "Comprendre internet",
      description:
        "Cette formation accessible à tous vous permet de découvrir le fonctionnement d'Internet, du web et des outils numériques. Vous apprendrez comment sont échangées les données, comment naviguer en toute sécurité, et comment utiliser efficacement les ressources en ligne.",
      img: internetImg,
      date: "08/08/2025",
      duration: "3 semaines",
    },
  ];

  // Filtrage dynamique en fonction de la recherche
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main>
      {/* Bandeau image */}
      <div className="top-img">
        <h2>
          Des compétences d'aujourd'hui <br /> qui ont de l'avenir.
        </h2>
        <p>
          Faites un grand pas vers votre nouvelle carrière en suivant l'une de
          nos formations.
        </p>
      </div>

      {/* Barre de recherche avec icône SVG */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher une formation..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Liste des cours filtrés */}
      <div className="Courses">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course, index) => (
            <div className="Security" key={index}>
              <img src={course.img} alt={course.title} />
              <div className="CourseText">
                <h2>{course.title}</h2>
                <p>{course.description}</p>
                <div className="DateDuration">
                  <span className="Date">
                    <strong>Date limite d'inscription :</strong> {course.date}
                  </span>
                  <span className="Duration">
                    <strong>Durée :</strong> {course.duration}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Aucun cours trouvé.</p>
        )}
      </div>
    </main>
  );
};

export default Hire;
