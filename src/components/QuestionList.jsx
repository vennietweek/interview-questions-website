import React from 'react';
import { Question } from './Question';

export function QuestionList({ questions }) {
    return (
        <div>
            {questions.map(question => (
                <Question question = {question} />
            ))}
        </div>
    );
}