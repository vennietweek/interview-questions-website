import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

export function Question({question}) {
    return (
      <>
      <Card>
        <Card.Header>#{question.questionId}</Card.Header>
        <Card.Body>
          <Card.Title>{question.title}</Card.Title>
          <Card.Text>{question.description}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
        {question.complexity === "Easy" && (
          <Badge bg="success">{question.complexity}</Badge>
        )}
        {question.complexity === "Medium" && (
          <Badge bg="warning">{question.complexity}</Badge>
        )}
        {question.complexity === "Hard" && (
          <Badge bg="danger">{question.complexity}</Badge>
        )}
        &nbsp;&nbsp;
        <Badge bg="primary">{question.type}</Badge>
        </Card.Footer>
      </Card>
      <br />
      </>
    );
  }