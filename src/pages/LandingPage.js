import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_QUESTION } from '../graphql/mutations';
import { GET_ALL_QUESTIONS } from '../graphql/queries';
import { UserContext } from '../components/UserProvider';
import { NavBar } from '../components/NavBar.jsx';
import { AddQuestionForm } from '../components/AddQuestionForm.jsx';
import { QuestionList } from '../components/QuestionList.jsx';
import { Modal, Button } from 'react-bootstrap';
import { useToast } from '../components/ToastProvider';

export function LandingPage() {
    const navigate = useNavigate();
    const addToast = useToast();
    const [questions, setQuestions] = useState([]);
    const { userId } = useContext(UserContext);  
    const [addQuestion] = useMutation(ADD_QUESTION);
    const [showModal, setShowModal] = useState(false);

    const { loading: questionsLoading, error: questionsError, data: questionsData } = useQuery(GET_ALL_QUESTIONS);

    useEffect(() => {
        if (questionsData && questionsData.getAllQuestions) {
            setQuestions(questionsData.getAllQuestions);
        }
    }, [questionsData]);

    const handleAddQuestion = async (newQuestionData) => {
        console.log("UserID:", userId);
        console.log(newQuestionData)
        if (!userId) {
            setShowModal(true);
            return;
        }
        try {
            const { data } = await addQuestion({
                variables: {
                    userId: userId.toString(),
                    ...newQuestionData
                },
            });

            if (data && data.addQuestion) {
                setQuestions(prevQuestions => [data.addQuestion, ...prevQuestions]);
                addToast({ message: 'Question successfully added.', type: 'success' });
            }

        } catch (error) {
            addToast({ message: 'Failed to add question.', type: 'danger' });
        }
    };

    return (
        <>
            <NavBar />
            <AddQuestionForm onAddQuestion={handleAddQuestion} />
            <QuestionList questions={questions} />
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You need to be logged in to add a question. Please login or sign up first.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {navigate('/account')}}>
                        Login
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}