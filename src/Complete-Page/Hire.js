import React from 'react';
import '../Styles/Hire.css';
import securityImg from '../Assets/security.jpg';
import internetImg from '../Assets/internet.jpg';

const Hire = () => {
  return (
    <main>
      <div className="top-img">
        <h2>Des compétences d'aujourd'hui <br/>qui ont de l'avenir.</h2>
        <p>Faites un grand pas vers votre nouvelle carrière en suivant l'une de nos formations.</p>
      </div>

      <div className="">
        <select name="categorie-formaton" id="CatForm" className="custom-select" required>
          <option value="" disabled selected hidden>THÈME</option>
          <option value="Cybers">Cybersécurité</option>
          <option value="Design">UI/UX Design</option>
          <option value="MarkDigital">Marketing Digital</option>
          <option value="RefWeb">Informatique Général</option>
        </select>
      </div>

      <div className="Courses">
        <div className="Security">
          <img src={securityImg} alt="Image-Security" />
          <div className="CourseText">
            <h2>Initiation à la Cybersécurité</h2>
            <p>Cette formation vous initie aux fondamentaux de la cybersécurité : protection des systèmes informatiques, détection des menaces, bonnes pratiques numériques et prévention des cyberattaques. Idéale pour débutants ou professionnels souhaitant renforcer leurs compétences en sécurité informatique.</p>
            <div className="DateDuration">
              <span className="Date"><strong>Date limite d'inscription :</strong> 08/08/2025</span>
              <span className="Duration"><strong>Durée :</strong> 3 semaines</span>
            </div>
          </div>
        </div>

        <div className="Security">
          <img src={internetImg} alt="Image-Security" />
          <div className="CourseText">
            <h2>Comprendre internet</h2>
            <p>Cette formation accessible à tous vous permet de découvrir le fonctionnement d'Internet, du web et des outils numériques. Vous apprendrez comment sont échangées les données, comment naviguer en toute sécurité, et comment utiliser efficacement les ressources en ligne.</p>
            <div className="DateDuration">
              <span className="Date"><strong>Date limite d'inscription :</strong> 08/08/2025</span>
              <span className="Duration"><strong>Durée :</strong> 3 semaines</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hire;
