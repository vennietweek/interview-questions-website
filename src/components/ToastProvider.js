import React, { createContext, useContext, useState, useCallback } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = ({message, type = 'success'}) => {
        const id = new Date().getTime();
        setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
        setTimeout(() => removeToast(id), 3000); 
    };

    const removeToast = useCallback(
        (id) => {
            setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
        },
        [setToasts]
    );

    return (
        <ToastContext.Provider value={addToast}>
            {children}
            <ToastContainer position="top-end" className="p-3">
                {toasts.map((toast) => (
                    <Toast key={toast.id} show={true} onClose={() => removeToast(toast.id)}>
                         <Toast.Header style={{ justifyContent: 'space-between'}}>
                            <strong className="mr-auto">{toast.type.charAt(0).toUpperCase() + toast.type.slice(1)}</strong>
                        </Toast.Header>
                        <Toast.Body>{toast.message}</Toast.Body>
                    </Toast>
                ))}
            </ToastContainer>
        </ToastContext.Provider>
    );
};

export function useToast () {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
