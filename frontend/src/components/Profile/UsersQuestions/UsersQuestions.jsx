import { useSelector } from "react-redux"
import { useModal } from "../../../context/Modal";
import AnswerQuestionsModal from "../../Modals/QuestionsModals/AnswerQuestionModal";
import AskQuestionModal from "../../Modals/QuestionsModals/AskQuestionModal";
import { useEffect, useState } from "react";

import { compressDate, formatDate } from "../../../utils/DateFormating";
import DeleteQuestion from "../../Modals/QuestionsModals/DeleteQuestion";






const UsersQuestions = () => {
    const allQuestions = useSelector(state => state.questions);
    const [timeSortedQuestions, setTimeSortedQuestions] = useState('');
    const [viewAnswer, setViewAnswer] = useState('');
    const { setModalContent } = useModal();

    const handleAnswerQuestion = (question) => {
        const modalComponent = <AnswerQuestionsModal question={question} />
        setModalContent(modalComponent);
    };

    const askAQuestion = () => {
        const modalComponent = <AskQuestionModal />
        setModalContent(modalComponent)
    };

    const deleteQuestion = (question) => {
        const modalComponent =<DeleteQuestion question={question} />
        setModalContent(modalComponent);
    }

    useEffect(() => {
        let questions = Object.values(allQuestions).reverse();
        setTimeSortedQuestions(questions)
    }, [allQuestions])

    return (
        <div className='profile-selected-section'>
            <div className="reflection-title-and-creation">
                <h1>Questions</h1>
                <div>
                    <button onClick={askAQuestion} className="add-pointer-cursor">Ask a Qusetion</button>
                </div>
            </div>
            <div className="question-display">
                {Object.values(timeSortedQuestions).map((ele, idx) => (
                    <div key={ele.id} className="questions-card">
                        <div className="question-alignment-w-delete">
                            <div className="question-alignment">
                                <h4>{idx + 1} - </h4>
                                <h4>{ele.question}</h4>
                            </div>
                            <div className="delete-question-btn" onClickCapture={() => deleteQuestion(ele)}>Delete question</div>
                        </div>
                            { ele.answer
                            ? <div className='add-pointer-cursor view-question-answer' onClick={() => viewAnswer === ele ? setViewAnswer('') : setViewAnswer(ele)}>{`View Answer Posted: ${formatDate(ele.updatedAt)}`}</div>
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
