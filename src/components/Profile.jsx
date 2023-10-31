import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Modal, Form } from 'react-bootstrap';
import { UserContext } from '../components/UserProvider';
import { UPDATE_USER_PROFILE, DEREGISTER_USER } from '../graphql/mutations';
import { useToast } from '../components/ToastProvider';

export function Profile() {
    
    const navigate = useNavigate();
    const addToast = useToast();
    const { userId, setUserId, email, setEmail, name, setName } = useContext(UserContext);
    const [updateUserProfile] = useMutation(UPDATE_USER_PROFILE);
    const [deregisterUser] = useMutation(DEREGISTER_USER);
    const [showEditModal, setShowEditModal] = useState(false);
    const [updatedName, setUpdatedName] = useState(name);

    const handleOpenEditModal = () => {
        setUpdatedName(name);
        setShowEditModal(true);
    };

    const handleCloseModal = () => {
        setUpdatedName(name);
        setShowEditModal(false);
    };

    const handleEdit = async () => {
        console.log(updatedName)
        const { data } = await updateUserProfile({
            variables: {
                userId: userId,
                name: updatedName,
            }
        });
        if (data) {
            setName(updatedName);
            localStorage.setItem('name', updatedName);
            addToast({ message: 'Profile updated.', type: 'success' });
        }
        else {
            addToast({ message: 'Profile update error.', type: 'danger' });
        }
        handleCloseModal()
    };    

    const handleDelete = async () => {
        const { data } = await deregisterUser({
            variables: { userId: userId },
            });
        if (data) {
            addToast({ message: 'User deletion success.', type: 'success' });
            handleLogout()
        } else {
            addToast({ message: 'User deletion failed.', type: 'danger' });
        }
    };

    const handleLogout = () => {
        setUserId(null);
        setEmail(null);
        setName(null);
        localStorage.removeItem('userId');
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        navigate('/account')
    };

    return (
        <>
        <Container>
            <br /><br />
            <h2>My Profile</h2><br />
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <Button onClick={() => handleOpenEditModal(name)}>Edit Profile</Button> &nbsp;&nbsp;&nbsp;
            <Button onClick={handleDelete}>Delete Profile</Button> &nbsp;&nbsp;&nbsp;
            <Button onClick={handleLogout}>Logout</Button>
        </Container>
        <Modal show={showEditModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={updatedName} onChange={e => setUpdatedName(e.target.value)} /><br />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
                <Button variant="primary" onClick={handleEdit}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
        </>
        );
}
