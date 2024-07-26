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
            <div className="reflection-title-and-creation">
                <h1>Questions</h1>
                <div>
                    <button onClick={askAQuestion} className="add-pointer-cursor">Ask a Qusetion</button>
                </div>
            </div>
            <div className="question-display">
                {Object.values(allQuestions).map((ele, idx) => (
                    <div key={ele.id} className="questions-card">
                        <div className="question-alignment">
                            <h4>{ele.id} - </h4>
                            <h4>{ele.question}</h4>
                        </div>
                        { ele.answer
                        ? <div className='add-pointer-cursor view-question-answer' onClick={() => viewAnswer === ele ? setViewAnswer('') : setViewAnswer(ele)}>{`View Answer From`}</div>
                        : <div className='add-pointer-cursor view-question-answer' onClick={() => handleAnswerQuestion(ele)}>Answer this question</div> }
                        {viewAnswer === ele
                        ? <div className="answer-display">
                            <span>{ele.answer}</span>
                            {/* <span>{ele.createdAt}</span> */}
                        </div>
                        : ''}
                    </div>
                ))}
            </div>
        </div>
    )
}


export default UsersQuestions
