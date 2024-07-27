import { useModal } from "../../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteQuestions } from "../../../store/questions";

const DeleteQuestion = ({question}) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleDeleteQuestion = async () => {

        await dispatch(deleteQuestions(question.id));
        await closeModal();

    }

    return (
        <div>
            <h3>Do you want to delete the question:</h3>
            <h3>{`${question.question}`}</h3>
            <div>
                <button className="add-pointer-cursor" onClick={handleDeleteQuestion}>Delete Question</button>
                <button className="add-pointer-cursor" onClick={() => closeModal()}>Return</button>
            </div>
        </div>
    )
}


export default DeleteQuestion;
