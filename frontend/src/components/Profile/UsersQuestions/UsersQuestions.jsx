import { useSelector } from "react-redux"
import { useModal } from "../../../context/Modal";
import AnswerQuestionsModal from "../../Modals/QuestionsModals/AnswerQuestionModal";

const UsersQuestions = () => {
    const allQuestions = useSelector(state => state.questions);
    const { setModalContent } = useModal();

    const handleAnswerQuestion = (question) => {
        const modalComponent = <AnswerQuestionsModal question={question} />
        setModalContent(modalComponent);
    }

    return (
        <div className='profile-selected-section'>
            <h1>Questions</h1>
            <div>
                {Object.values(allQuestions).map(ele => (
                    <div key={ele.id} className="questions-card">
                        <span>{ele.createdAt}</span>
                        <span>{ele.question}</span>
                        { ele.answer ? <span>{ele.answer}</span> : <button onClick={() => handleAnswerQuestion(ele)}>Answer this question</button> }
                    </div>
                ))}
            </div>
        </div>
    )
}


export default UsersQuestions
