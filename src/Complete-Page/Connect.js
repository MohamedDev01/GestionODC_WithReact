import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { authService } from '../Services/api';

import '../Styles/Connect.css';
import phoneImage from '../Assets/Apps.png';

const Connect = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenoms: '',
    email: '',
    numero: '',
    password: '',
    confirmPassword: '',
    terms: false
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // --- VALIDATIONS ---
  const validateName = (value, label) => {
    const regex = /^[\p{L}\s\-']+$/u;
    if (!value.trim()) return `${label} est obligatoire`;
    if (!regex.test(value)) return `${label} ne doit contenir que des lettres, espaces, tirets et apostrophes`;
    if (value.length < 2) return `${label} doit contenir au moins 2 caractères`;
    return '';
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) return "L'email est obligatoire";
    if (!regex.test(email)) return "Format d'email invalide";
    return '';
  };

  const validatePhone = (phone) => {
    const regex = /^\+225\d{10}$/;
    if (!phone.trim()) return 'Le numéro est obligatoire';
    if (!regex.test(phone)) return 'Format attendu : +225 suivi de 10 chiffres';
    return '';
  };

  const validatePassword = (password, confirm) => {
    let err = {};
    if (!password) err.password = 'Mot de passe obligatoire';
    else if (password.length < 6) err.password = '6 caractères minimum';
    
    if (!confirm) err.confirmPassword = 'Confirmation obligatoire';
    else if (password && confirm && password !== confirm) {
      err.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    return err;
  };

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let val = type === 'checkbox' ? checked : value;

    if (name === 'nom' || name === 'prenoms') val = val.replace(/[^\p{L}\s\-']/gu, '');
    
    if (name === 'numero') {
      // Supprimer tout sauf les chiffres
      let digits = val.replace(/[^\d]/g, '');
      // Limiter à 10 chiffres maximum
      digits = digits.slice(0, 10);
      // Ajouter +225 automatiquement
      val = '+225' + digits;
    }

    setFormData(prev => ({ ...prev, [name]: val }));

    // Validation en direct
    let fieldError = '';
    if (name === 'nom') fieldError = validateName(val, 'Nom');
    if (name === 'prenoms') fieldError = validateName(val, 'Prénoms');
    if (name === 'email') fieldError = validateEmail(val);
    if (name === 'numero') fieldError = validatePhone(val);
    if (name === 'password' || name === 'confirmPassword') {
      // Get the current values for both password fields
      const currentPassword = name === 'password' ? val : formData.password;
      const currentConfirmPassword = name === 'confirmPassword' ? val : formData.confirmPassword;
      
      const pwdErr = validatePassword(currentPassword, currentConfirmPassword);
      
      // Only update password-related errors, keep other errors intact
      setErrors(prev => ({ 
        ...prev, 
        password: pwdErr.password || '',
        confirmPassword: pwdErr.confirmPassword || ''
      }));
      return;
    }
    setErrors(prev => ({ ...prev, [name]: fieldError }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErr = {
      nom: validateName(formData.nom, 'Nom'),
      prenoms: validateName(formData.prenoms, 'Prénoms'),
      email: validateEmail(formData.email),
      numero: validatePhone(formData.numero),
      ...validatePassword(formData.password, formData.confirmPassword),
      terms: formData.terms ? '' : 'Vous devez accepter les conditions'
    };
    setErrors(newErr);
    
    if (!Object.values(newErr).some(Boolean)) {
      setIsLoading(true);
      try {
        const userData = {
          nom: formData.nom.trim(),
          prenoms: formData.prenoms.trim(),
          email: formData.email.trim().toLowerCase(),
          contact: formData.numero,
          motDePasse: formData.password
        };

        console.log('Données d\'inscription:', userData);

        const response = await authService.register(userData);
        console.log('Réponse API:', response);

        toast.success('Inscription réussie ! Vous pouvez maintenant vous connecter.');
        
        // Rediriger vers la page de connexion après inscription réussie
        setTimeout(() => navigate('/login'), 2000);

      } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        const status = error.response?.status;
        if (status === 409) toast.error('Un compte avec cet email existe déjà');
        else if (status === 400) toast.error('Données invalides. Vérifiez vos informations.');
        else if (status === 500) toast.error('Erreur serveur. Réessayez plus tard.');
        else toast.error('Erreur lors de l\'inscription. Réessayez.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const isFormValid = () => {
    return (
      Object.values(errors).every(err => !err) &&
      Object.values(formData).every(val => val || val === true) &&
      formData.terms &&
      !isLoading
    );
  };

  return (
    <main className="connect-page-container">
      <div className="connect-card">
        <div className="connect-left-panel">
          <img src={phoneImage} alt="Application Orange Digital Center" className="phone-image" />
        </div>

        <div className="connect-right-panel">
          <h1 className="connect-title">Inscrivez-vous dès maintenant !</h1>
          <p className="connect-subtitle">
            Accédez gratuitement à des formations, outils et opportunités pour développer vos compétences numériques et entreprendre.
          </p>

          <form className="connect-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              {['nom', 'prenoms', 'email', 'numero', 'password', 'confirmPassword'].map((field, idx) => (
                <div className="form-group" key={idx}>
                  <label htmlFor={field}>
                    {field === 'confirmPassword'
                      ? 'Confirmer mot de passe'
                      : field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  {field === 'numero' ? (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span className="phone-prefix">+225</span>
                      <input
                        type="tel"
                        id="numero"
                        name="numero"
                        value={formData.numero.replace('+225', '')}
                        onChange={handleInputChange}
                        maxLength={10}
                        pattern="[0-9]{10}"
                        placeholder="XXXXXXXXXX"
                        className={errors.numero ? 'error' : ''}
                        style={{ flex: 1 }}
                        disabled={isLoading}
                      />
                    </div>
                  ) : field === 'password' || field === 'confirmPassword' ? (
                    <div className="password-field">
                      <input
                        type={
                          field === 'password' 
                            ? (showPassword ? 'text' : 'password')
                            : (showConfirmPassword ? 'text' : 'password')
                        }
                        id={field}
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        placeholder=""
                        className={errors[field] ? 'error' : ''}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        className="eye-toggle"
                        onClick={field === 'password' ? togglePasswordVisibility : toggleConfirmPasswordVisibility}
                        aria-label={
                          field === 'password' 
                            ? (showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe')
                            : (showConfirmPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe')
                        }
                        disabled={isLoading}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          {(field === 'password' ? showPassword : showConfirmPassword) ? (
                            // Eye slash - password visible, click to hide
                            <>
                              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                              <line x1="1" y1="1" x2="23" y2="23"/>
                            </>
                          ) : (
                            // Eye - password hidden, click to show
                            <>
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                              <circle cx="12" cy="12" r="3"/>
                            </>
                          )}
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      id={field}
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      placeholder={`Entrez votre ${field}`}
                      className={errors[field] ? 'error' : ''}
                      disabled={isLoading}
                    />
                  )}
                  {errors[field] && <span className="error-message">{errors[field]}</span>}
                </div>
              ))}
            </div>

            <div className="form-terms">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={formData.terms}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <label htmlFor="terms">J'ai lu les conditions d'utilisation</label>
              {errors.terms && <span className="error-message">{errors.terms}</span>}
            </div>

            <button 
              type="submit" 
              className={`submit-button ${!isFormValid() ? 'disabled' : ''}`} 
              disabled={!isFormValid()}
            >
              {isLoading ? 'INSCRIPTION EN COURS...' : 'CONFIRMEZ VOTRE INSCRIPTION'}
            </button>
          </form>

          <p className="login-prompt">
            J'ai déjà un compte, <Link to="/login">je me connecte</Link>.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Connect;
