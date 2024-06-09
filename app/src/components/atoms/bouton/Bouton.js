import React from 'react';
import './Bouton.css';

const Bouton = ({ name }) => {
    return (
      <button className="call-to-action-button">
        {name}
      </button>
    );
  };

export default Bouton;