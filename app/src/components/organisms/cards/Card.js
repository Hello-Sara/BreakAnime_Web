import React from 'react';
import './Card.css';

function Card({ icon, title, text }) {   
    return (
        <div className="card">
            <img src={icon} alt="Icon" className="card-icon" />
            <h3 className="card-title">{title}</h3>
            <p className="card-text">{text}</p>
        </div>
    );
}

export default Card;