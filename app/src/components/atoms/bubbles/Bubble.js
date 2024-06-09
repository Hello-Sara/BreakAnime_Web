import React from 'react';
import './Bubble.css';

const Bubble = ({ src, size }) => {
    return (
      <div className={'bubble '+ size}>
        <img src={src} alt='bubble' />
      </div>
    );
  };

export default Bubble;