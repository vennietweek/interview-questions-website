import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

export function Question({question}) {
    return (
      <Card>
        <Card.Header>{question.id}</Card.Header>
        <Card.Body>
          <Card.Title>{question.title}</Card.Title>
          <Card.Text>{question.description}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
            <Badge bg="secondary">{question.complexity}</Badge>
            <Badge bg="secondary">{question.type}</Badge>
        </Card.Footer>
      </Card>
    );
  }