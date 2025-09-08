import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/Hire.css";

const Hire = () => {
  const [search, setSearch] = useState("");
  const [programmes, setProgrammes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgrammes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/programmes");
        setProgrammes(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des programmes :", error);
        setLoading(false);
      }
    };

    fetchProgrammes();
  }, []);

  const filteredProgrammes = programmes.filter(
    (programme) =>
      programme.nom_programme?.toLowerCase().includes(search.toLowerCase()) ||
      programme.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main>
      <div className="top-img">
        <h2>
          Des compétences d'aujourd'hui <br /> qui ont de l'avenir.
        </h2>
        <p>
          Faites un grand pas vers votre nouvelle carrière en suivant l'un de nos programmes.
        </p>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher un programme..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="Courses">
        {loading ? (
          <p>Chargement des programmes...</p>
        ) : filteredProgrammes.length > 0 ? (
          filteredProgrammes.map((programme) => (
            <div className="Security" key={programme.id_programme}>
              <img
                src={programme.affiche || "https://via.placeholder.com/300x200"}
                alt={programme.nom_programme}
              />
              <div className="CourseText">
                <h2>{programme.nom_programme}</h2>
                <p>{programme.description}</p>
                <div className="DateDuration">
                  <span className="Date">
                    <strong>Date début :</strong>{" "}
                    {new Date(programme.date_debut).toLocaleDateString()}
                  </span>
                  <span className="Duration">
                    <strong>Date fin :</strong>{" "}
                    {new Date(programme.date_fin).toLocaleDateString()}
                  </span>
                </div>
                <a
                  href={programme.url_formulaire}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apply-btn"
                >
                  Postuler
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>Aucun programme trouvé.</p>
        )}
      </div>
    </main>
  );
};

export default Hire;
