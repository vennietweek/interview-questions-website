import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Form } from 'react-bootstrap';
import { SIGN_UP_USER } from '../graphql/mutations';

export function SignUpForm({ toggleMode, setEmail, setName, setUserId, addToast, navigate }) {
    const [signUpUser] = useMutation(SIGN_UP_USER);
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [localEmail, setLocalEmail] = useState('');
    const [localName, setLocalName] = useState('');
    const [signUpValidated, setSignUpValidated] = useState(false);

    const handleSignUp = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setSignUpValidated(true);
            return;
        }

        const { data } = await signUpUser({
            variables: { name: localName, email: localEmail }
        }); 

        if (data && data.signUpUser) {
            setUserId(data.signUpUser.userId);
            setEmail(data.signUpUser.email);
            setName(data.signUpUser.name);
            localStorage.setItem('userId', data.signUpUser.userId);
            localStorage.setItem('email', data.signUpUser.email);
            localStorage.setItem('name', data.signUpUser.name)
            addToast({ message: 'Sign up success!', type: 'success' });
            navigate('/account')
        } else {
            addToast({ message: 'Error signing up. Please try again.', type: 'danger' });
        }
    };

    return (
        <>
        <h2>Sign Up</h2><br />
        <Form noValidate validated={signUpValidated} onSubmit={handleSignUp}>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control required type="text" value={localName} onChange={e => setLocalName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control required type="email" value={localEmail} onChange={e => setLocalEmail(e.target.value)} />
            </Form.Group>
            <Button type="submit">Sign Up</Button>
            <Button variant="link" onClick={toggleMode}>Log In Instead</Button>
        </Form>
        </>
    );
}
