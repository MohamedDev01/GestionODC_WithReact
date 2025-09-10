import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/Hire.css";

const Hire = () => {
  const [search, setSearch] = useState("");
  const [programmes, setProgrammes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgrammes = async () => {
      try {
        console.log("🔄 Début de la requête API...");
        const response = await axios.get("http://oda.bot.nu:8080/api/v1/programmes");
        
        // Debug complet de la réponse
        console.log("📊 Réponse complète :", response);
        console.log("📋 Status :", response.status);
        console.log("📦 Headers :", response.headers);
        console.log("🎯 Data brute :", response.data);
        console.log("🔢 Type de data :", typeof response.data);
        console.log("📏 Est-ce un tableau ?", Array.isArray(response.data));

        // Vérification des différentes structures possibles
        let data = [];
        
        if (Array.isArray(response.data)) {
          console.log("✅ Structure : Tableau direct");
          data = response.data;
        } else if (response.data && Array.isArray(response.data.content)) {
          console.log("✅ Structure : Objet paginé avec content");
          data = response.data.content;
        } else if (response.data && Array.isArray(response.data.data)) {
          console.log("✅ Structure : Objet avec propriété data");
          data = response.data.data;
        } else if (response.data && Array.isArray(response.data.programmes)) {
          console.log("✅ Structure : Objet avec propriété programmes");
          data = response.data.programmes;
        } else {
          console.log("❌ Structure inconnue, data complète :", response.data);
          // Afficher toutes les propriétés de l'objet
          if (typeof response.data === 'object' && response.data !== null) {
            console.log("🔍 Propriétés disponibles :", Object.keys(response.data));
          }
        }

        console.log("📊 Programmes extraits :", data);
        console.log("🔢 Nombre de programmes :", data?.length || 0);

        // Si on a des programmes, afficher le premier pour debug
        if (data && data.length > 0) {
          console.log("👀 Premier programme :", data[0]);
          console.log("🏷️ Propriétés du premier programme :", Object.keys(data[0]));
        }

        setProgrammes(data || []);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error("❌ Erreur complète :", error);
        console.error("📡 Erreur response :", error.response);
        console.error("🔌 Erreur request :", error.request);
        console.error("💬 Message d'erreur :", error.message);
        
        setError(error.message);
        setLoading(false);
        setProgrammes([]);
      }
    };

    fetchProgrammes();
  }, []);

  const filteredProgrammes = (programmes || []).filter((programme) => {
    if (!programme) return false;
    
    const nom = programme.nom_programme || "";
    const desc = programme.description  || "";
    
    return nom.toLowerCase().includes(search.toLowerCase()) ||
           desc.toLowerCase().includes(search.toLowerCase());
  });

  // Debug du filtrage
  console.log("🔍 Recherche actuelle :", search);
  console.log("📋 Programmes avant filtrage :", programmes?.length || 0);
  console.log("🎯 Programmes après filtrage :", filteredProgrammes?.length || 0);

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
          <p>⏳ Chargement des programmes...</p>
        ) : error ? (
          <div>
            <p>❌ Erreur lors du chargement : {error}</p>
            <p>Vérifiez :</p>
            <ul>
              <li>🌐 La connexion réseau</li>
              <li>🔗 L'URL de l'API : http://192.168.252.2:8080/api/v1/programmes</li>
              <li>🖥️ Que le serveur backend est démarré</li>
              <li>🔍 Les logs de la console pour plus de détails</li>
            </ul>
          </div>
        ) : filteredProgrammes && filteredProgrammes.length > 0 ? (
          filteredProgrammes.map((programme, index) => (
            <div className="Security" key={programme.id_programme || programme.id || index}>
              <img
                src={
                  programme.affiche || 
                  "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffr.wikipedia.org%2Fwiki%2FFichier%3AImage_created_with_a_mobile_phone.png&psig=AOvVaw19-5BDFOcc5PMLu-Se9BXv&ust=1757512953270000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCOi_rozsy48DFQAAAAAdAAAAABAE"
                }
                alt={programme.nom_programme || programme.name || "Programme"}
                onError={(e) => {
                  e.target.src = "https://etudestech.com/wp-content/uploads/2021/11/langage-de-programmation-etudes-tech.jpg";
                }}
              />
              <div className="CourseText">
                <h2>
                  {programme.nom_programme || 
                   programme.name || 
                   programme.titre || 
                   "Programme sans nom"}
                </h2>
                <p>
                  {programme.description || 
                   programme.desc || 
                   "Aucune description disponible"}
                </p>
                <div className="DateDuration">
                  {(programme.date_debut || programme.dateDebut || programme.start_date) && (
                    <span className="Date">
                      <strong>Date début :</strong>{" "}
                      {new Date(
                        programme.date_debut || 
                        programme.dateDebut || 
                        programme.start_date
                      ).toLocaleDateString()}
                    </span>
                  )}
                  {(programme.date_fin || programme.dateFin || programme.end_date) && (
                    <span className="Duration">
                      <strong>Date fin :</strong>{" "}
                      {new Date(
                        programme.date_fin || 
                        programme.dateFin || 
                        programme.end_date
                      ).toLocaleDateString()}
                    </span>
                  )}
                </div>
                {(programme.url_formulaire || programme.urlFormulaire || programme.apply_url) && (
                  <a
                    href={
                      programme.url_formulaire || 
                      programme.urlFormulaire || 
                      programme.apply_url
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="apply-btn"
                  >
                    Postuler
                  </a>
                )}
              </div>
            </div>
          ))
        ) : (
          <div>
            <p>❌ Aucun programme trouvé.</p>
            {programmes && programmes.length > 0 && (
              <p>
                💡 Il y a {programmes.length} programmes dans la base, 
                mais aucun ne correspond à votre recherche "{search}".
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Hire;