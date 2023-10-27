import { NavBar } from '../components/NavBar.jsx'
import { AddQuestionForm } from '../components/AddQuestionForm.jsx'
import { QuestionList } from '../components/QuestionList.jsx'

export function LandingPage (){
    return(
        <>
        <NavBar />
        <AddQuestionForm />
        <QuestionList />
        </>
    )
}