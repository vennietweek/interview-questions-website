import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export function NavBar (){
    return(
        <>
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Interview Prep</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="myquestions">My Questions</Nav.Link>
            <Nav.Link href="account">Account</Nav.Link>
          </Nav>
        </Container>
        </Navbar>
        </>
    )
}