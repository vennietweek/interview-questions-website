import { NavBar } from '../components/NavBar'
import { AddQuestionForm } from '../components/AddQuestionForm'
import { QuestionList } from '../components/QuestionList'
export function LandingPage (){
    return(
        <>
        <NavBar />
        <AddQuestionForm />
        <QuestionList />
        </>
    )
}