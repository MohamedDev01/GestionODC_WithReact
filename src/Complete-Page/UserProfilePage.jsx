// src/Complete-Page/UserProfilePage.jsx (VERSION MISE À JOUR)

import React, { useState } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom'; // Pour la redirection
import '../Styles/UserProfilePage.css';
import ConfirmationModal from '../Components/ConfirmationModal'; // Assurez-vous que ce chemin est correct

const skillOptions = [
  { value: 'developpement-web', label: 'Développement Web' },
  { value: 'developpement-mobile', label: 'Développement Mobile' },
  { value: 'marketing-digital', label: 'Marketing Digital' },
  { value: 'ui-ux-design', label: 'UX/UI Design' },
  { value: 'data-science', label: 'Data Science' },
  { value: 'gestion-de-projet', label: 'Gestion de Projet' },
];

const UserProfilePage = () => {
  const navigate = useNavigate(); // Hook pour la redirection

  const [profile, setProfile] = useState({
    fullName: '',
    birthDate: '',
    biography: '',
    cv: null,
    skills: [
      { value: 'developpement-web', label: 'développement web' },
      { value: 'developpement-mobile', label: 'développement mobile' },
      { value: 'marketing-digital', label: 'marketing digital' },
      { value: 'ui-ux-design', label: 'UX/UI design' },
    ],
  });

  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProfile(prev => ({ ...prev, cv: e.target.files[0] }));
  };

  const handleSkillsChange = (selectedOptions) => {
    setProfile(prev => ({ ...prev, skills: selectedOptions || [] }));
  };
  
  // Nouvelle fonction pour supprimer une compétence
  const removeSkill = (skillToRemove) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.value !== skillToRemove.value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profil à enregistrer :", profile);
    alert("Profil enregistré !");
  };

  // Logique pour le modal de confirmation
  const performLogout = () => {
    console.log("Déconnexion...");
    closeModal();
    navigate('/login'); // Redirige vers la page de connexion
  };

  const performCloseAccount = () => {
    console.log("Clôture du compte...");
    alert("Votre compte a été clôturé.");
    closeModal();
    navigate('/'); // Redirige vers la page d'accueil
  };
  
  const handleLogoutClick = () => {
    setModalState({ isOpen: true, title: 'Confirmation de Déconnexion', message: 'Êtes-vous sûr de vouloir vous déconnecter ?', onConfirm: performLogout });
  };

  const handleCloseAccountClick = () => {
    setModalState({ isOpen: true, title: 'Clôturer le compte', message: 'Cette action est définitive. Êtes-vous certain de vouloir clôturer votre compte ?', onConfirm: performCloseAccount });
  };

  const closeModal = () => setModalState({ isOpen: false });

  return (
    <>
      <div className="profile-page-wrapper">
        <h1 className="page-main-title">VOTRE PROFIL</h1>
        <div className="profile-content-layout">
          
          <aside className="profile-sidebar">
            <div className="avatar-section">
              <div className="avatar-circle">
                <span className="avatar-text">ODC</span>
              </div>
              <h2>Orange Digital Center</h2>
            </div>
            <nav className="sidebar-nav">
              <ul>
                <li className="active">Profil</li>
                <li>Mes candidatures</li>
                <li onClick={handleLogoutClick}>Déconnexion</li>
                <li onClick={handleCloseAccountClick}>Clôturer le compte</li>
              </ul>
            </nav>
          </aside>

          <main className="profile-form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullName">Nom et Prénoms</label>
                <input type="text" id="fullName" name="fullName" value={profile.fullName} onChange={handleInputChange} />
              </div>

              <div className="form-group">
                <label htmlFor="birthDate">Date de naissance</label>
                <input type="text" id="birthDate" name="birthDate" placeholder="JJ / MM / AAAA" value={profile.birthDate} onChange={handleInputChange} />
              </div>

              <div className="form-group">
                <label htmlFor="biography">Biographie</label>
                <textarea id="biography" name="biography" rows="5" value={profile.biography} onChange={handleInputChange}></textarea>
              </div>
              
              <div className="form-group">
                <label htmlFor="cv">Votre cv</label>
                <input type="text" id="cv-display" placeholder="Sélectionnez ou déposez votre cv ici" onClick={() => document.getElementById('cv-hidden').click()} readOnly value={profile.cv ? profile.cv.name : ''} />
                <input type="file" id="cv-hidden" name="cv" onChange={handleFileChange} style={{ display: 'none' }} />
              </div>

              <div className="form-group">
                <label htmlFor="skills">Vos compétences</label>
                <Select
                  id="skills"
                  isMulti
                  name="skills"
                  options={skillOptions}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  placeholder="Ajoutez vos compétences"
                  value={profile.skills}
                  onChange={handleSkillsChange}
                  noOptionsMessage={() => 'Aucune compétence trouvée'}
                />
                {/* Zone pour afficher les tags des compétences sélectionnées */}
                <div className="skills-tags-area">
                  {profile.skills.map(skill => (
                    <span key={skill.value} className="skill-tag">
                      {skill.label}
                      <button type="button" className="remove-skill-btn" onClick={() => removeSkill(skill)}>×</button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="form-actions">
                  <button type="submit" className="save-button">Enregistrer</button>
              </div>
            </form>
          </main>
        </div>
      </div>

      <ConfirmationModal
        isOpen={modalState.isOpen}
        title={modalState.title}
        message={modalState.message}
        onConfirm={modalState.onConfirm}
        onClose={closeModal}
      />
    </>
  );
};

export default UserProfilePage;