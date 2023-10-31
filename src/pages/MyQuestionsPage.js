import { useContext } from 'react';
import { NavBar } from '../components/NavBar';
import { MyQuestionsList } from '../components/MyQuestionsList.jsx';
import { UserContext } from '../components/UserProvider';
import { Container } from 'react-bootstrap/';

export function MyQuestionsPage() {
    const { userId } = useContext(UserContext);

    return (
        <>
            <NavBar />
            <Container fluid="sm">
                <br /><br />
                <h4>My Questions</h4><br />
                {userId ? (
                    <MyQuestionsList userId={userId} />
                ) : (
                    <p>You need to log in to view your questions.</p>
                )}
            </Container>
        </>
    );
}
