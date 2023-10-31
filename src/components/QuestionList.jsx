import React, { useState, useEffect } from 'react';
import { Question } from './Question';
import { GET_ALL_QUESTIONS } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import Container from 'react-bootstrap/Container';

export function QuestionList({ questions }) {

    return (
        <div>
            <Container fluid="sm">
            <h4>All Questions</h4><br />
            {questions.map(question => (
                <Question key={question.questionId} question={question} />
            ))}
            </Container>
        </div>
    );
}
