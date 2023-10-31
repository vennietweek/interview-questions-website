import React, { useState } from 'react';
import { Form, Col, Row, Button, Container, FloatingLabel, Alert } from 'react-bootstrap';

export function AddQuestionForm({ onAddQuestion }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [complexity, setComplexity] = useState('');

  // Error states
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [typeError, setTypeError] = useState('');
  const [complexityError, setComplexityError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    setTitleError('');
    setDescriptionError('');
    setTypeError('');
    setComplexityError('');

    // Validations
    if (!title) setTitleError('Title is required.');
    if (!description) setDescriptionError('Description is required.');
    if (!type) setTypeError('Category is required.');
    if (!complexity) setComplexityError('Complexity is required.');

    if (title && description && type && complexity) {
      const newQuestionData = { title, description, type, complexity };
      onAddQuestion(newQuestionData);

      // Reset fields after submitting
      setTitle('');
      setDescription('');
      setType('');
      setComplexity('');
    }
  };
  return (
    <>
      <br />
      <Container fluid="sm" className="addQuestionContainer">
        <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '10px' }}>
          <h4>Add a Question</h4><br />
          <Form onSubmit={handleSubmit}>
            <FloatingLabel controlId="floatingInput" label="Question Title" className="mb-3">
              <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} />
              {titleError && <small style={{ color: 'red' }}>{titleError}</small>}
            </FloatingLabel>
            <FloatingLabel controlId="floatingTextarea2" label="Question Description">
              <Form.Control as="textarea" value={description} onChange={e => setDescription(e.target.value)} style={{ height: '100px' }} />
              {descriptionError && <small style={{ color: 'red' }}>{descriptionError}</small>}
            </FloatingLabel>
            <br />
            <Row>
              <Col>
                <Form.Select value={type} onChange={e => setType(e.target.value)}>
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
                {typeError && <small style={{ color: 'red' }}>{typeError}</small>}
              </Col>
              <Col>
                <Form.Select value={complexity} onChange={e => setComplexity(e.target.value)}>
                <option value="" disabled>Select complexity</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
                </Form.Select>
                {complexityError && <small style={{ color: 'red' }}>{complexityError}</small>}
              </Col>
            </Row>
            <br />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </Container>
      <br />
    </>
  );
}