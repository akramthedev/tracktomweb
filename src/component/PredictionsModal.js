import React, { useState } from 'react';
import Modal from 'react-modal';

const PredictionsModal = ({ predictions, isModalOpen, setModalOpen }) => {
  const [selectedPrediction, setSelectedPrediction] = useState(null);

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => setModalOpen(false)}
      contentLabel="Liste des prédictions"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '40%',
          padding: '20px'
        }
      }}
    >
      <h2>Liste des prédictions</h2>
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {predictions.map((prediction, index) => (
          <div
            key={index}
            style={{
              padding: '10px',
              marginBottom: '10px',
              borderBottom: '1px solid #ddd',
              cursor: 'pointer'
            }}
            onClick={() => {
              setSelectedPrediction(prediction); // Enregistre la prédiction sélectionnée
              setModalOpen(false); // Ferme la modal après sélection
            }}
          >
            <p>{new Date(prediction.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Bouton pour fermer la modal */}
      <button onClick={() => setModalOpen(false)}>Fermer</button>
    </Modal>
  );
};

export default PredictionsModal;
