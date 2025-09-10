import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import '../Styles/UserProfilePage.css';
import ConfirmationModal from '../Components/ConfirmationModal';

const skillOptions = [
  { value: 'developpement-web', label: 'Développement Web' },
  { value: 'developpement-mobile', label: 'Développement Mobile' },
  { value: 'marketing-digital', label: 'Marketing Digital' },
  { value: 'ui-ux-design', label: 'UX/UI Design' },
  { value: 'data-science', label: 'Data Science' },
  { value: 'gestion-de-projet', label: 'Gestion de Projet' },
];

const UserProfilePage = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const [activeTab, setActiveTab] = useState('profil');
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({
    fullName: '',
    birthDate: '',
    biography: '',
    cv: null,
    skills: [],
  });

  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  const [candidatures, setCandidatures] = useState([]);
  const [isLoadingCandidatures, setIsLoadingCandidatures] = useState(false);

  useEffect(() => {
    if (user) {
      setProfile(prev => ({
        ...prev,
        fullName: `${user.nom} ${user.prenoms}`,
      }));
      loadUserProfile();
    }
  }, [user]);

  // Charger le profil utilisateur
  const loadUserProfile = async () => {
    if (!user?.id) return;
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`http://oda.bot.nu:8080/api/v1/utilisateurs/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
        if (response.ok) {
        const profileData = await response.json();
        console.log("Réponse profil:",profileData);
        setProfile(prev => ({
          ...prev,
          birthDate: profileData.birthDate || '',
          biography: profileData.biography || '',
          skills: profileData.skills || [],
        }));
      } else if (response.status !== 404) {
        console.error('Erreur lors du chargement du profil');
      }
    } catch (error) {
      console.error('Erreur lors du chargement du profil:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Charger les candidatures
  const loadCandidatures = async () => {
    if (!user?.id) return;
    try {
      setIsLoadingCandidatures(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`http://oda.bot.nu:8080/api/v1/candidatures/utilisateur/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Candidatures reçues:", data);
        setCandidatures(data);
      } else {
        console.error('Erreur lors du chargement des candidatures');
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setIsLoadingCandidatures(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'fullName') return;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProfile(prev => ({ ...prev, cv: e.target.files[0] }));
  };

  const handleSkillsChange = (selectedOptions) => {
    setProfile(prev => ({ ...prev, skills: selectedOptions || [] }));
  };

  const removeSkill = (skillToRemove) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.value !== skillToRemove.value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.id) return alert('Utilisateur non connecté');
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const profileToSave = {
        userId: user.id,
        birthDate: profile.birthDate,
        biography: profile.biography,
        skills: profile.skills,
      };
      const formData = new FormData();
      formData.append('profileData', JSON.stringify(profileToSave));
      if (profile.cv) formData.append('cv', profile.cv);

      const response = await fetch(`http://oda.bot.nu:8080/api/v1/profils/${user.profil}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) alert("Profil enregistré avec succès !");
      else throw new Error('Erreur lors de la sauvegarde');
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
      alert("Erreur lors de l'enregistrement du profil");
    } finally {
      setIsLoading(false);
    }
  };

  const performLogout = async () => {
    try {
      await logout();
      closeModal();
      navigate('/login');
    } catch {
      closeModal();
    }
  };

  const performCloseAccount = () => {
    alert("Votre compte a été clôturé.");
    closeModal();
    navigate('/');
  };

  const handleLogoutClick = () => {
    setModalState({
      isOpen: true,
      title: 'Confirmation de Déconnexion',
      message: 'Êtes-vous sûr de vouloir vous déconnecter ?',
      onConfirm: performLogout
    });
  };

  const handleCloseAccountClick = () => {
    setModalState({
      isOpen: true,
      title: 'Clôturer le compte',
      message: 'Cette action est définitive. Êtes-vous certain ?',
      onConfirm: performCloseAccount
    });
  };

  const closeModal = () => setModalState({ isOpen: false });

  const handleTabClick = (tabName) => {
    if (tabName === 'profil' || tabName === 'evaluation' || tabName === 'candidatures') {
      setActiveTab(tabName);
      if (tabName === 'candidatures') loadCandidatures();
    }
  };

  if (!user) return <div>Chargement...</div>;

  return (
    <>
      <div className="profile-page-wrapper">
        <h1 className="page-main-title">VOTRE PROFIL</h1>
        <div className="profile-content-layout">

          {/* Sidebar */}
          <aside className="profile-sidebar">
            <div className="avatar-section">
              <div className="avatar-circle">
                <span className="avatar-text">
                  {user.nom.charAt(0)}{user.prenoms.charAt(0)}
                </span>
              </div>
              <h2>{user.nom} {user.prenoms}</h2>
            </div>
            <nav className="sidebar-nav">
              <ul>
                <li 
                  className={activeTab === 'profil' ? 'active' : ''} 
                  onClick={() => handleTabClick('profil')}
                >
                  Profil
                </li>
                <li 
                  className={activeTab === 'evaluation' ? 'active' : ''} 
                  onClick={() => handleTabClick('evaluation')}
                >
                  Évaluation
                </li>
                <li 
                  className={activeTab === 'candidatures' ? 'active' : ''} 
                  onClick={() => handleTabClick('candidatures')}
                >
                  Mes candidatures
                </li>
                <li onClick={handleLogoutClick}>
                  Déconnexion
                </li>
                <li onClick={handleCloseAccountClick}>
                  Clôturer le compte
                </li>
              </ul>
            </nav>
          </aside>

          {/* Contenu principal */}
          <main className="profile-form-container">
            
            {/* Onglet Profil */}
            <div className={`tab-content ${activeTab === 'profil' ? 'active' : ''}`}>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="fullName">Nom et Prénoms</label>
                  <input 
                    type="text" 
                    id="fullName" 
                    name="fullName" 
                    value={profile.fullName} 
                    onChange={handleInputChange}
                    disabled
                    style={{ backgroundColor: '#f5f5f5', color: '#666' }}
                  />
                  <small style={{ color: '#666', fontSize: '0.8em' }}>
                    Ce champ est automatiquement rempli
                  </small>
                </div>

                <div className="form-group">
                  <label htmlFor="birthDate">Date de naissance</label>
                  <input type="date" id="birthDate" name="birthDate" value={profile.birthDate} onChange={handleInputChange} disabled={isLoading}/>
                </div>

                <div className="form-group">
                  <label htmlFor="biography">Biographie</label>
                  <textarea id="biography" name="biography" rows="5" value={profile.biography} onChange={handleInputChange} disabled={isLoading} placeholder="Parlez-nous de vous..."/>
                </div>

                <div className="form-group">
                  <label htmlFor="cv">Votre CV</label>
                  <input type="text" id="cv-display" placeholder="Sélectionnez ou déposez votre CV ici" onClick={() => document.getElementById('cv-hidden').click()} readOnly value={profile.cv ? profile.cv.name : ''} disabled={isLoading}/>
                  <input type="file" id="cv-hidden" name="cv" onChange={handleFileChange} style={{ display: 'none' }} accept=".pdf,.doc,.docx" disabled={isLoading}/>
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
                    isDisabled={isLoading}
                  />
                  <div className="skills-tags-area">
                    {profile.skills.map(skill => (
                      <span key={skill.value} className="skill-tag">
                        {skill.label}
                        <button type="button" className="remove-skill-btn" onClick={() => removeSkill(skill)} disabled={isLoading}>×</button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="save-button" disabled={isLoading}>
                    {isLoading ? 'Enregistrement...' : 'Enregistrer'}
                  </button>
                </div>
              </form>
            </div>

            {/* Onglet Évaluation */}
            <div className={`tab-content ${activeTab === 'evaluation' ? 'active' : ''}`}>
              <div className="evaluation-section">
                <h2>Évaluation de vos compétences</h2>
                <p>Vous serez redirigé vers un formulaire externe pour réaliser votre évaluation.</p>
                <button
                  className="evaluation-link-btn"
                  onClick={() => window.open(
                    'http://oda.bot.nu:4010/#/formulaires/public/6b834e2a-ce91-458d-92d9-190a1960ae1d',
                    '_blank'
                  )}
                >
                  Aller à l'évaluation →
                </button>
              </div>
            </div>

            {/* Onglet Mes candidatures */}
            <div className={`tab-content ${activeTab === 'candidatures' ? 'active' : ''}`}>
              <h2>Mes candidatures</h2>
              {isLoadingCandidatures ? (
                <p>Chargement...</p>
              ) : candidatures.length === 0 ? (
                <p>Aucune candidature pour le moment.</p>
              ) : (
                <table className="candidatures-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Programme</th>
                      <th>Date</th>
                      <th>Statut</th>
                      <th>Note</th>
                      <th>Décision</th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidatures.map(c => (
                      <tr key={c.idCandidature}>
                        <td>{c.idCandidature}</td>
                        <td>{c.idProgramme}</td>
                        <td>{new Date(c.dateCandidature).toLocaleDateString()}</td>
                        <td>{c.statut}</td>
                        <td>{c.noteEvaluation ?? '-'}</td>
                        <td>{c.decisionFinale ?? '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

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
