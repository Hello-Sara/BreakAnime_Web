import React, { createContext, useState } from 'react';
import Alert from '../../components/atoms/alert/Alert';

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState(null);

    const showAlert = (message, level, autoCloseDuration) => {
        setAlert({ message, level, autoCloseDuration, key : new Date().getTime()});
    };

    const closeAlert = () => {
        setAlert(null);
    };

    return (
        <AlertContext.Provider value={{ showAlert, closeAlert }}>
            {children}
            {alert && <Alert key={alert.key} {...alert} onClose={closeAlert} />}
        </AlertContext.Provider>
    );
};