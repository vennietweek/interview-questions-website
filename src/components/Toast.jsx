import React from 'react';
import { Toast } from 'react-bootstrap';

export function Toast({ show, message, type, onClose }) {
    const bgColor = type === 'success' ? 'bg-success' : 'bg-danger';

    return (
        <Toast
            style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999 }}
            show={show}
            onClose={onClose}
            delay={3000}
            autohide
        >
            <Toast.Header className={bgColor}>
                <strong className="mr-auto">{type.charAt(0).toUpperCase() + type.slice(1)}</strong>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
        </Toast>
    );
}