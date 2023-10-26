import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

export function AddQuestionForm() {
  return (
    <>
    <Card>
    <FloatingLabel controlId="floatingInput" label="Title" className="mb-3">
    <Form.Control type="email" placeholder="Question Title" />
    </FloatingLabel>
    <br />
    <FloatingLabel controlId="floatingTextarea2" label="Description">
    <Form.Control as="textarea" placeholder="Question Description" style={{ height: '100px' }}/>
    </FloatingLabel>
    <br />
    <Form>
      <Row>
        <Col>
            <Form.Select placeholder ="Category">
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
            <Form.Select placeholder ="Complexity">
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
            </Form.Select>          
        </Col>
      </Row>
    </Form>
    <br />
    </Card>
    </>
  );
}