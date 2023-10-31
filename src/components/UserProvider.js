import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [email, setEmail] = useState(null);
    const [name, setName] = useState(null)

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        const storedEmail = localStorage.getItem('email');
        const storedName = localStorage.getItem('name');

        if (storedUserId) {
            setUserId(storedUserId);
        }
        
        if (storedEmail) {
            setEmail(storedEmail);
        }

        if (storedName) {
            setName(storedName);
        }

    }, []);

    return (
        <UserContext.Provider value={{ userId, setUserId, email, setEmail, name, setName }}>
            {children}
        </UserContext.Provider>
    );
};
