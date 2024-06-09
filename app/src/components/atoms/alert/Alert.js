import React, { useState, useEffect, style } from 'react';
import './Alert.css';

const Alert = ({ message, level, autoCloseDuration }) => {
    const [showAlert, setShowAlert] = useState(true);

    useEffect(() => {
        if (autoCloseDuration) {
            const timeout = setTimeout(() => {
                setShowAlert(false);
            }, autoCloseDuration);

            return () => clearTimeout(timeout);
        }
    }, [autoCloseDuration]);

    const handleClose = () => {
        setShowAlert(false);
    };

    const getAlertClassName = () => {
        let className = 'alert';

        switch (level) {
            case 'warning':
                className += ' alert-warning';
                break;
            case 'error':
                className += ' alert-error';
                break;
            case 'info':
                className += ' alert-info';
                break;
            default:
                className += ' alert-info';
                break;
        }

        return className;
    };

    return (
        showAlert && (
            <div className={getAlertClassName()} style={style}>
                <span>{message}</span>
                <button className="close" onClick={handleClose}>
                    &times;
                </button>
            </div>
        )
    );
};

export default Alert;