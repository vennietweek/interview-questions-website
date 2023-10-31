import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { GET_USER_PROFILE } from '../graphql/queries';

export function LoginForm({ toggleMode, client, setEmail, setName, setUserId, addToast, navigate }) {
    const [emailError, setEmailError] = useState('');
    const [localEmail, setLocalEmail] = useState('');
    const [loginValidated, setLoginValidated] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setLoginValidated(true);
            return;
        }

        const { data } = await client.query({
            query: GET_USER_PROFILE,
            variables: { email: localEmail }
        });

        if (!data || !data.getUserProfile) {
            addToast({ message: 'Error logging in. Please try again.', type: 'danger' });
            return;
        }
        if (data && data.getUserProfile) {
            setUserId(data.getUserProfile.userId);
            setEmail(data.getUserProfile.email);
            setName(data.getUserProfile.name);
            localStorage.setItem('userId', data.getUserProfile.userId);
            localStorage.setItem('email', data.getUserProfile.email);
            localStorage.setItem('name', data.getUserProfile.name)
            addToast({ message: 'Logged in successfully!', type: 'success' });
            navigate('/account');
        }
    };

    return (
        <>
        <h2>Login</h2><br />
        <Form noValidate validated={loginValidated} onSubmit={handleLogin}>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control required type="email" value={localEmail} onChange={e => setLocalEmail(e.target.value)} />
            </Form.Group>
            <Button type="submit">Log In</Button>
            <Button variant="link" onClick={toggleMode}>Sign Up Instead</Button>
        </Form>
        </>
    );
}
