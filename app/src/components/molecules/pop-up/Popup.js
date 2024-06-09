import React from 'react';
import ReactDOM from 'react-dom';
import './Popup.css';

const Popup = ({ isOpen, children, top, left, onClose, size = 'small', centered=false}) => {
    if (!isOpen) {
        return null;
    }


    const handleBackgroundClick = (event) => {
        if (event.target === event.currentTarget) {
            console.log('Background clicked');
            onClose();
        }
    };

    return ReactDOM.createPortal(
        <div className={centered ? 'centered-overlay' : 'overlay'} onClick={handleBackgroundClick}>
            <div className={`popup popup-${size}`}  style={{top: top, left: left}}>
                <button className='close-button' onClick={onClose}>X</button>
                {children}
            </div>
        </div>,
        document.body
    );
};

export default Popup;