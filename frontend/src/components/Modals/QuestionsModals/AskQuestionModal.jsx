import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createQuestion } from "../../../store/questions";
import { useModal } from "../../../context/Modal";


const AskQuestionModal = () => {
    const [question, setQuestion] = useState('');
    const [errors, setErrors] = useState({});
    const user = useSelector(state => state.session.user);
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    useEffect(() => {
        if (question) setErrors({});

    }, [question])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!question) {
            setErrors({question: 'Please include a question'})
            return;
        }

        const newQuestion = {
            userId: user.id,
            question,
        };

        await dispatch(createQuestion(newQuestion));

        await closeModal();

    }

    return (
        <div>
            <h1>Ask a question here</h1>
            <div>
                <span>What is your question?</span>
                <input
                    type='text'
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    />
                <span>{errors.question && errors.question}</span>
            </div>
            <button onClick={(e) => handleSubmit(e)}>Submit Question</button>
        </div>
    )
}

export default AskQuestionModal;
