import React from 'react';
import { Question } from './Question';
import { GET_ALL_QUESTIONS } from '../graphql/queries';
import { useQuery } from '@apollo/client';

export function QuestionList() {
    const { loading, error, data } = useQuery(GET_ALL_QUESTIONS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const questionsData = data.getAllQuestions;

    return (
        <div>
            {questionsData.map(question => (
                <Question key={question.questionId} question={question} />
            ))}
        </div>
    );
}
