import React from 'react';
import '../Styles/Home.css';
import Carousel1 from '../Assets/Caroussel/caroussel1.jpg';
import Carousel2 from '../Assets/Caroussel/caroussel2.jpg';
import Carousel3 from '../Assets/Caroussel/caroussel3.jpg';
import Labo from '../Assets/Icons/Labo.png';
import Campus from '../Assets/Icons/Campus.png';
import Expert from '../Assets/Icons/Expert.png';
import RA from '../Assets/RA.png';
import IA from '../Assets/IA.png';
import IO from '../Assets/IO.png'; 
import IoT from '../Assets/IoT-devices.png';
import Equipement from '../Assets/Icons/Equipement.png';
import Environnement from '../Assets/Icons/Environnement.png';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <main>
        <div className="carousel-container">
          {/* Carousel Présentation */}
          <div
            id="carouselExample"
            className="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="5000"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src={Carousel1}
                  className="d-block w-100"
                  alt="Carrousel 1"
                />
              </div>
              <div className="carousel-item">
                <img
                  src={Carousel2}
                  className="d-block w-100"
                  alt="Carrousel 2"
                />
              </div>
              <div className="carousel-item">
                <img
                  src={Carousel3}
                  className="d-block w-100"
                  alt="Carrousel 3"
                />
              </div>
            </div>
            
            {/* Barre d'état d'avancement */}
            <div className="carousel-progress">
              <div className="progress-bar" data-slide="0"></div>
              <div className="progress-bar" data-slide="1"></div>
              <div className="progress-bar" data-slide="2"></div>
            </div>
            
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>

          {/* Carousel description */}
          <div className="carousel-description">
            <h2>
              <strong>Présentation de l'Orange Digital Center</strong>
            </h2>
            <p>
              Les Orange Digital Centers sont des centres d'accompagnement et de
              développement des compétences numériques. De la formation au codage à
              la création d'entreprise, ils couvrent un large champ d'activités.
              Gratuits et ouverts à tous, ces centres fondent l'apprentissage sur
              des projets concrets. Ainsi des programmes de formation dédiés aux
              métiers du digital sont proposés aux étudiants, aux personnes sans
              emploi ou déscolarisées, aux jeunes entrepreneurs...
            </p>
          </div>

          {/* Objective section */}
          <section className="our-objective">
            <h3>NOTRE OBJECTIF</h3>
            <div className="objective-columns">
              <div className="objective-column">
                <h4>Former sur le digital</h4>
                <p>
                  Permettre à tous d'avoir une chance d'accéder à des formations de
                  qualités gratuitement.
                </p>
              </div>
              <div className="objective-column">
                <h4>Incuber les startups</h4>
                <p>
                  Permettre à tous d'avoir une chance d'accéder à des formations de
                  qualités gratuitement.
                </p>
              </div>
              <div className="objective-column">
                <h4>Encourager l'entrepreneuriat</h4>
                <p>
                  À travers nos différents programmes de formation, nous nous
                  efforçons de former le plus grand nombre possible de personnes à
                  devenir des créateurs de valeur.
                </p>
              </div>
            </div>
          </section>

          {/* Arguments */}
          <div className="Argument">
            <div className="Arg-1">
              <div className="icon-circle">
                <img src={Labo} alt="Labo" />
              </div>
              <h4>Labo</h4>
              <p>
                Emergence et réalisation d'idées innovantes dans un dispositif
                pédagogique.
              </p>
            </div>

            <div className="Arg-2">
              <div className="icon-circle">
                <img src={Campus} alt="Campus" />
              </div>
              <h4>Space</h4>
              <p>
                Un endroit fun cosy, un espace de coworking un lieu de
                brainstorming.
              </p>
            </div>

            <div className="Arg-3">
              <div className="icon-circle">
                <img src={Expert} alt="Expert" />
              </div>
              <h4>Expert</h4>
              <p>
                Des professionnels chevronnés du monde entier disponibles 24h/24 et
                7j/7.
              </p>
            </div>
          </div>

          {/* Formations */}
          <div className="Formation">
            <div className="TitreFormation">
              <h2>Formations</h2>
              <p>
                Les bons codeurs font des applications, les grands créent des
                innovations et les meilleurs changent le monde.
              </p>
            </div>

            <div className="ListFormation">
              <div className="RA">
                <h3>Réalités augmentées</h3>
                <img src={RA} alt="Réalité augmentée" />
              </div>

              <div className="IA">
                <h3>Intelligence artificielle</h3>
                <img src={IA} alt="Intelligence artificielle" />
              </div>

              <div className="IO">
                <h3>Machine learning</h3>
                <img src={IO} alt="Machine learning" />
              </div>

              <div className="IO-T">
                <h3>Internet des objets (IOT)</h3>
                <img src={IoT} alt="Internet des objets" />
              </div>
            </div>
          </div>

          {/* Atouts */}
          <div className="Atout">
            <div className="Atout-1">
              <div className="icon-circles">
                <img src={Equipement} alt="Salles suréquipées" />
              </div>
              <h4>Salles suréquipées</h4>
              <p>
                iMac de dernières générations. Environnement cloud complet dédié.
                Equipements réels de test.
              </p>
            </div>

            <div className="Atout-2">
              <div className="icon-circles">
                <img src={Environnement} alt="Environnement convivial" />
              </div>
              <h4>Environnement convivial</h4>
              <p>
                Espace écologique, professionnel, idéal pour l'épanouissement
                intellectuel et la jouissance cognitive.
              </p>
            </div>

            <div className="Atout-3">
              <div className="icon-circles">
                <img src={Expert} alt="Expert" />
              </div>
              <h4>Expert</h4>
              <p>
                Des professionnels chevronnés du monde entier disponibles 24h/24 et
                7j/7.
              </p>
            </div>
          </div>
        </div>
      </main>

      <section className="inscription-footer">
        <div className="content">
          <h2>Inscrivez-vous gratuitement</h2>
          <p>
            Passez le challenge, réussissez les tests
            <br />
            et si vous êtes parmi les meilleurs, vous serez retenus.
          </p>
          
          <Link to="/register" className="cta-button">Inscrivez-vous</Link>
        </div>
      </section>
    </>
  );
};

export default Home;
