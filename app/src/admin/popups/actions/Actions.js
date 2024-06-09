import React from 'react';
import SecondaryBouton from '../../../components/atoms/secondary-bouton/SecondaryBouton';
import './Actions.css';

const Actions = ({ item, itemSpecificButtons }) => {
    return (
        <div className='action-container'>
            {itemSpecificButtons.map((button, index) => (
                <SecondaryBouton 
                    key={index}
                    Submit={() => item && button.action(item)}                                                 
                    name={button.name} 
                    style={button.style}
                    onHoverStyle={button.onHoverStyle}
                />
            ))}        
        </div>
    );
};

export default Actions;