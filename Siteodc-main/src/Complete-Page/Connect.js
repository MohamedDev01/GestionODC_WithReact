import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../Contexts/AuthContext';
import '../Styles/Connect.css';
import phoneImage from '../Assets/Apps.png';
import authService from '../Services/authService';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Connect = () => {
  const { login } = useAuth(); // On récupère la fonction login du contexte
  const [formData, setFormData] = useState({
    nom: '',
    prenoms: '',
    email: '',
    contact: '',
    password: '',
    confirmPassword: '',
    terms: false,
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
    
    if (name === 'contact') {
      let digits = val.replace(/[^\d]/g, '');
      digits = digits.slice(0, 10);
      val = '+225' + digits;
    }

    setFormData(prev => ({ ...prev, [name]: val }));

    let fieldError = '';
    if (name === 'nom') fieldError = validateName(val, 'Nom');
    if (name === 'prenoms') fieldError = validateName(val, 'Prénoms');
    if (name === 'email') fieldError = validateEmail(val);
    if (name === 'contact') fieldError = validatePhone(val);
    if (name === 'password' || name === 'confirmPassword') {
      const currentPassword = name === 'password' ? val : formData.password;
      const currentConfirmPassword = name === 'confirmPassword' ? val : formData.confirmPassword;
      const pwdErr = validatePassword(currentPassword, currentConfirmPassword);
      setErrors(prev => ({ 
        ...prev, 
        password: pwdErr.password || '',
        confirmPassword: pwdErr.confirmPassword || ''
      }));
      return;
    }
    setErrors(prev => ({ ...prev, [name]: fieldError }));
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErr = {
      nom: validateName(formData.nom, 'Nom'),
      prenoms: validateName(formData.prenoms, 'Prénoms'),
      email: validateEmail(formData.email),
      contact: validatePhone(formData.contact),
      ...validatePassword(formData.password, formData.confirmPassword),
      terms: formData.terms ? '' : 'Vous devez accepter les conditions',
    };
    setErrors(newErr);

    if (!Object.values(newErr).some(Boolean)) {
      setIsLoading(true);
      try {
        const userData = {
          nom: formData.nom.trim(),
          prenoms: formData.prenoms.trim(),
          email: formData.email.trim().toLowerCase(),
          contact: formData.contact,
          motDePasse: formData.password,
        };

        // Inscription
        await authService.register(userData);
        toast.success('Inscription réussie ! Connexion en cours...');

        // Connexion automatique via le contexte
        const success = await login({ identifiant: userData.email, motDePasse: userData.motDePasse });
        if (success) {
          toast.success('Connexion automatique réussie !');
          navigate('/home');
        } else {
          toast.success('Veuillez vous connecter manuellement.');
          navigate('/login');
        }

      } catch (error) {
        console.error('Erreur inscription:', error);
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

  const isFormValid = () => (
    Object.values(errors).every(err => !err) &&
    Object.values(formData).every(val => val || val === true) &&
    formData.terms &&
    !isLoading
  );

  return (
    <main className="connect-page-container">
      <div className="connect-card">
        <div className="connect-left-panel">
          <img src={phoneImage} alt="Application Orange Digital Center" className="phone-image" />
        </div>

        <div className="connect-right-panel">
          <h1 className="connect-title">Inscrivez-vous dès maintenant !</h1>
          <p className="connect-subtitle">
            Accédez gratuitement à des formations, outils et opportunités pour développer vos compétences numériques.
          </p>

          <form className="connect-form" onSubmit={handleSubmit}>
            {/* Boucle sur les champs */}
{['nom','prenoms','email','contact','password','confirmPassword'].map((field, idx) => (
  <div className="form-group" key={idx}>
    <label htmlFor={field}>
      {field === 'confirmPassword' ? 'Confirmer mot de passe' : field === 'contact' ? 'Numéro' : field === 'password' ? 'Mot de passe' : field.charAt(0).toUpperCase() + field.slice(1)}
    </label>

{field === 'contact' ? (
  <div style={{ display:'flex', alignItems:'center' }}>
    <span className="phone-prefix">+225</span>
    <input
      type="tel"
      id="contact"
      name="contact"
      value={formData.contact.replace('+225','')}
      onChange={handleInputChange}
      maxLength={10}
      pattern="[0-9]{10}"
      placeholder="XXXXXXXXXX"
      className={errors.contact ? 'error' : ''}
      style={{ flex:1 }}
      disabled={isLoading}
    />
  </div>
) : field === 'password' || field === 'confirmPassword' ? (
  <div className="password-field">
    <input
      type={field==='password' ? (showPassword?'text':'password') : (showConfirmPassword?'text':'password')}
      id={field}
      name={field}
      value={formData[field]}
      onChange={handleInputChange}
      className={errors[field] ? 'error':''}
      disabled={isLoading}
    />
    <button type="button" className="eye-toggle"
      onClick={field==='password'?togglePasswordVisibility:toggleConfirmPasswordVisibility}>
      {field==='password'? (showPassword?<FaEyeSlash />:<FaEye />) : (showConfirmPassword?<FaEyeSlash />:<FaEye />)}
    </button>
  </div>
) : (
  <input
    type={field==='email'?'email':'text'}
    id={field}
    name={field}
    value={formData[field]}
    onChange={handleInputChange}
    placeholder={
      field === 'password' ? 'Entrez votre mot de passe' :
      field === 'confirmPassword' ? 'Confirmez votre mot de passe' :
      `Entrez votre ${field}`
    }
    className={errors[field] ? 'error' : ''}
    disabled={isLoading}
  />
)}
                {errors[field] && <span className="error-message">{errors[field]}</span>}
              </div>
            ))}

            <div className="form-terms">
              <input type="checkbox" id="terms" name="terms" checked={formData.terms} onChange={handleInputChange} disabled={isLoading} />
              <label htmlFor="terms">J'accepte les conditions d'utilisation</label>
              {errors.terms && <span className="error-message">{errors.terms}</span>}
            </div>

            <button type="submit" className={`submit-button ${!isFormValid() ? 'disabled':''}`} disabled={!isFormValid()}>
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
