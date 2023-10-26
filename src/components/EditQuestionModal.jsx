import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

export function EditQuestionModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <FloatingLabel controlId="floatingInput" label="Question Title" className="mb-3">
            <Form.Control type="email" placeholder="Enter your question title here" />
            </FloatingLabel>
            <br />
            <FloatingLabel controlId="floatingTextarea2" label="Comments">
            <Form.Control as="textarea" placeholder="Enter your question description here" style={{ height: '100px' }}/>
            </FloatingLabel>
            <br />
            <Form>
            <Row>
                <Col>
                    <Form.Select size="lg" placeholder ="Category">
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
                </Col>
                <Col>
                    <Form.Select size="lg" placeholder ="Complexity">
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </Form.Select>          
                </Col>
            </Row>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
