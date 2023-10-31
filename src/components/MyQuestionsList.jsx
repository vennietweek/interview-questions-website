import React, { useEffect, useState, useContext } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_QUESTIONS } from '../graphql/queries';
import { UPDATE_QUESTION, DELETE_QUESTION } from '../graphql/mutations';
import { MyQuestion } from './MyQuestion';
import { Modal, Button, Container, Form, Row, Col } from 'react-bootstrap/';
import { useToast } from '../components/ToastProvider';

export function MyQuestionsList({ userId }) {

    const addToast = useToast();
    const { loading, error, data, refetch } = useQuery(GET_USER_QUESTIONS, { variables: { userId } });
    const [updateQuestion] = useMutation(UPDATE_QUESTION);
    const [deleteQuestion] = useMutation(DELETE_QUESTION);
    const [questions, setQuestions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [editedType, setEditedType] = useState('');
    const [editedComplexity, setEditedComplexity] = useState('');

    useEffect(() => {
        if (data && data.getUserQuestions) {
            setQuestions(data.getUserQuestions);
        }
    }, [data]);

    const openModal = (question) => {
        setSelectedQuestion(question);
        setEditedTitle(question.title);
        setEditedDescription(question.description);
        setEditedType(question.type);
        setEditedComplexity(question.complexity);
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        refetch();
    }

    const handleSaveChanges = () => {
        const editedQuestionData = {
            title: editedTitle,
            description: editedDescription,
            type: editedType,
            complexity: editedComplexity
        };
        updateQuestion({ variables: { questionId: selectedQuestion.questionId, ...editedQuestionData } });
        addToast({ message: 'Question successfully updated.', type: 'success' });
        closeModal();
    }

    const handleDeleteQuestion = async (questionId) => {
        if (!window.confirm("Are you sure you want to delete this question?")) return;
        const { data } = await deleteQuestion({ variables: { questionId } });
        if (data.deleteQuestion) {
            addToast({ message: 'Question successfully deleted.', type: 'success' });
            refetch();
        } else {
            addToast({ message: 'Failed to delete question', type: 'danger' });
        }
    };
    
    if (loading) return <div>Loading...</div>;
    if (error) {
        console.error(error);
        return <div>Error loading questions.</div>;
    }

    return (
        <div>
            { questions.length === 0 ? (
                <p>You currently have no questions.</p>
            ) : (
                questions.map(question => (
                    <MyQuestion key={question.questionId} question={question} openModal={openModal} onDelete={handleDeleteQuestion} />
                ))
            )}

            {selectedQuestion && (
                <Modal show={isModalOpen} onHide={closeModal} dialogClassName="w-75">
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Question</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="questionTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)}/>
                        </Form.Group>
                        <br />
                        <Form.Group controlId="questionDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" style={{ height: '100px' }} value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} />
                        </Form.Group>
                        <br />
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group controlId="questionType">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Select value={editedType} onChange={(e) => setEditedType(e.target.value)}>
                                            <option value="" disabled>Select category</option>
                                            <option value="General">General</option>
                                            <option value="Motivation and Career Goals">Motivation and Career Goals</option>
                                            <option value="Technical Competency">Technical Competency</option>
                                            <option value="Behavioural or Situational">Behavioural or Situational</option>
                                            <option value="Industry Knowledge">Industry Knowledge</option>
                                            <option value="Culture Fit">Culture Fit</option>
                                            <option value="Leadership">Leadership</option>
                                            <option value="Salary and Compensation">Salary and Compensation</option>
                                            <option value="Others">Others</option>
                                            </Form.Select>
                                    </Form.Group>
                                    <br />
                                </Col>
                                <Col>
                                    <Form.Group controlId="questionComplexity">
                                        <Form.Label>Complexity</Form.Label>
                                        <Form.Select value={editedComplexity} onChange={(e) => setEditedComplexity(e.target.value)}>
                                            <option value="" disabled>Select complexity</option>
                                            <option value="Easy">Easy</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Hard">Hard</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <br />
                                </Col>
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>Close</Button>
                        <Button variant="primary" onClick={handleSaveChanges}>Save</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    )
}
