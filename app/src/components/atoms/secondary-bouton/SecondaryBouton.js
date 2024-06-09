import React from 'react';
import './SecondaryBouton.css';

const SecondaryBouton = ({ name, Submit, style }) => {
    return (
      <button className="secondary-button" onClick={Submit} style={style} >
        {name}
      </button>
    );
  };

export default SecondaryBouton;