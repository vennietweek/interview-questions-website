import React from 'react';
import { BiEditAlt, BiSolidTrash } from 'react-icons/bi';
import { Card, Badge, Button } from 'react-bootstrap/';

export function MyQuestion({ question, openModal, onDelete }) {
    return (
        <div>
            <Card>
            <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                    <div>#{question.questionId}</div>
                    <div>
                    <BiEditAlt className="mx-2" style={{ cursor: 'pointer' }} onClick={() => openModal(question)}/>
                    <BiSolidTrash className="mx-2" style={{ cursor: 'pointer' }} onClick={() => onDelete(question.questionId)}/>
                    </div>
                </div>
            </Card.Header>
            <Card.Body>
                <Card.Title>{question.title}</Card.Title>
                <Card.Text>{question.description}</Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                {question.complexity === 'Easy' && (
                    <Badge bg="success">{question.complexity}</Badge>
                )}
                {question.complexity === 'Medium' && (
                    <Badge bg="warning">{question.complexity}</Badge>
                )}
                {question.complexity === 'Hard' && (
                    <Badge bg="danger">{question.complexity}</Badge>
                )}
                &nbsp;&nbsp;
                <Badge bg="primary">{question.type}</Badge>
            </Card.Footer>
            </Card>
            <br />
        </div>
    );
}