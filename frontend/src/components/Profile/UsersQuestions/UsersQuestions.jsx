import { useSelector } from "react-redux"
import { useModal } from "../../../context/Modal";
import AnswerQuestionsModal from "../../Modals/QuestionsModals/AnswerQuestionModal";
import AskQuestionModal from "../../Modals/QuestionsModals/AskQuestionModal";
import { useState } from "react";






const UsersQuestions = () => {
    const allQuestions = useSelector(state => state.questions);
    const [viewAnswer, setViewAnswer] = useState('')
    const { setModalContent } = useModal();

    const handleAnswerQuestion = (question) => {
        const modalComponent = <AnswerQuestionsModal question={question} />
        setModalContent(modalComponent);
    };

    const askAQuestion = () => {
        const modalComponent = <AskQuestionModal />
        setModalContent(modalComponent)
    }

    return (
        <div className='profile-selected-section'>
            <h1>Questions</h1>
            <div>
                <button onClick={askAQuestion}>Ask a Qusetion</button>
            </div>
            <div>
                {Object.values(allQuestions).map(ele => (
                    <div key={ele.id} className="questions-card">
                        <span>{ele.question}</span>
                        { ele.answer
                        ? <button onClick={() => viewAnswer === ele ? setViewAnswer('') : setViewAnswer(ele)}>View Answer</button>
                        : <button onClick={() => handleAnswerQuestion(ele)}>Answer this question</button> }
                        {viewAnswer === ele
                        ? <div>
                            <span>{ele.answer}</span>
                            <span>{ele.createdAt}</span>
                        </div>
                        : ''}
                    </div>
                ))}
            </div>
        </div>
    )
}


export default UsersQuestions
