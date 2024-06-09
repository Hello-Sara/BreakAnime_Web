import React,  { useState }  from 'react';
import './SecondaryBouton.css';

const SecondaryBouton = ({ name, Submit, style, onHoverStyle }) => {
  const [currentStyle, setCurrentStyle] = useState(style);

  const handleMouseEnter = () => {
      setCurrentStyle(onHoverStyle);
  };

  const handleMouseLeave = () => {
      setCurrentStyle(style);
  };

    return (
      <button 
        className="secondary-button"
        style={currentStyle} 
        onClick={Submit}
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
      >
        {name}
      </button>
    );
  };

export default SecondaryBouton;