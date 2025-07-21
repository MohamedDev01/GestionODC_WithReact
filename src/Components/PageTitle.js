import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    // Définir les titres selon les routes
    const pageTitles = {
      '/': 'Accueil',
      '/home': 'Accueil',
      '/login': 'Connexion',
      '/hire': 'Recrutement',
      '/certificat': 'Certificats',
      '/learn': 'Apprentissage',
    };

    // Obtenir le titre pour la route actuelle
    const currentTitle = pageTitles[location.pathname];
    
    // Mettre à jour le titre de la page
    document.title = currentTitle;

    // Optionnel : Mettre à jour aussi le titre de la fenêtre
    if (window.electronAPI) {
      window.electronAPI.setTitle(currentTitle);
    }
  }, [location]);

  return null; // Ce composant ne rend rien visuellement
};

export default PageTitle;
