
import React from 'react';

import { FaExclamationTriangle } from 'react-icons/fa';
import '../Styles/ConfirmationModal.css';

const ConfirmationModal = ({ isOpen, title, message, onConfirm, onClose }) => {
  if (!isOpen) {
    return null;
  }

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={handleModalContentClick}>
     
        <h2 className="modal-title">
          <FaExclamationTriangle className="modal-icon" /> 
          {title}
        </h2>
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <button className="modal-button cancel" onClick={onClose}>
            Annuler
          </button>
          <button className="modal-button confirm" onClick={onConfirm}>
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;