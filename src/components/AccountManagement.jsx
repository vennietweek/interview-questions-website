import React, { useState, useContext } from 'react';
import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { UserContext } from './UserProvider';
import { useToast } from './ToastProvider';
import { SignUpForm } from './SignUpForm';  
import { LoginForm } from './LoginForm';

export function AccountManagement() {
    const navigate = useNavigate();
    const client = useApolloClient();
    const addToast = useToast();
    const { setEmail, setName, setUserId } = useContext(UserContext);
    const [isSignUpMode, setIsSignUpMode] = useState(false);
    const toggleMode = () => {
        setIsSignUpMode(prevMode => !prevMode);
    };

    return (
        <>
            <br />
            <Container>
                <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '10px' }}>
                    {isSignUpMode ? 
                        <SignUpForm toggleMode={toggleMode} setEmail={setEmail} setName={setName} setUserId={setUserId} addToast={addToast} navigate={navigate} /> : 
                        <LoginForm toggleMode={toggleMode} client={client} setEmail={setEmail} setName={setName} setUserId={setUserId} addToast={addToast} navigate={navigate} />
                    }
                </div>
            </Container>
        </>
    );
}
