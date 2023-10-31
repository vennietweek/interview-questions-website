import React, { useState, useContext } from 'react';
import { useMutation, useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Form, Alert } from 'react-bootstrap';
import { UserContext } from '../components/UserProvider';
import { NavBar } from '../components/NavBar';
import { SIGN_UP_USER } from '../graphql/mutations';
import { GET_USER_PROFILE } from '../graphql/queries';

export function SignUpLogin() {
    const navigate = useNavigate();
    const client = useApolloClient();
    const { email, setEmail, name, setName, userId, setUserId } = useContext(UserContext);
    const [isSignUpMode, setIsSignUpMode] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [signUpUser] = useMutation(SIGN_UP_USER);

    const handleLogin = async () => {
        try {
            const { data } = await client.query({
                query: GET_USER_PROFILE,
                variables: { email: email }
            });

            if (!data || !data.getUserProfile) {
                setErrorMessage('No user found with this email.');
                return;
            }
            if (data && data.getUserProfile) {
                setUserId(data.getUserProfile.userId);
                setEmail(data.getUserProfile.email);
                setName(data.getUserProfile.name);
                localStorage.setItem('userId', data.getUserProfile.userId);
                localStorage.setItem('email', data.getUserProfile.email);
                localStorage.setItem('name', data.getUserProfile.name)
                navigate('/account');
            }
        } catch (error) {
            console.error("Error fetching user:", error.message);
        }
    };
    
    const handleSignUp = async () => {
        try {    
            const { data } = await signUpUser({
                variables: { name, email }
            }); 
    
            if (data && data.signUpUser) {
                setUserId(data.signUpUser.userId);
                setEmail(data.signUpUser.email);
                setName(data.signUpUser.name);
                localStorage.setItem('userId', data.signUpUser.userId);
                localStorage.setItem('email', data.signUpUser.email);
                localStorage.setItem('name', data.signUpUser.name)
                navigate('/account')
            }
        } catch (err) {
            console.error(err);
        }
    }; 

    return (
        <>
        <br />
        <Container>
        <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '10px' }}>
            {isSignUpMode ? (
                <>
                <h2>Sign Up</h2>
                <br />
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </Form.Group>
                    <Button onClick={handleSignUp}>Sign Up</Button>
                    <Button variant="link" onClick={() => setIsSignUpMode(false)}>Log In Instead</Button>
                </Form>
                </>
            ) : (
                <>
                <h2>Log In</h2>
                <br />
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </Form.Group>
                    {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                    <Button onClick={handleLogin}>Log In</Button>
                    <Button variant="link" onClick={() => setIsSignUpMode(true)}>Sign Up Instead</Button>
                </Form>
                </>
            )}
        </div>
        </Container>
        </>
    );
}
