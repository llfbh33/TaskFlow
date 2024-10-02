import { useEffect, useState } from "react";
import { useModal } from "../../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../../../store/tasks";
import { format, addDays, subDays } from 'date-fns';
import '../Modals.css';


const CreateTask = ({date}) => {
    const user = useSelector(state => state.session.user);
    const [currDate, setDate] = useState();
    const [task, setTask] = useState('');
    const { closeModal } = useModal();
    const dispatch = useDispatch();


// Format the date as 'YYYY-MM-DD', changes the value of the calender up top and no errors in console
    const formatDateForInput = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        let today = date ? new Date(date) : new Date();
        today = formatDateForInput(today)
        setDate(today)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currDate) {
            // Having difficulty with the dates being added a day behind, adding a day to the given date fixes that issue
            let newDate = new Date(currDate);
            newDate = addDays(newDate, 1)

            const newTask = {
                userId: user.id,
                task: task,
                date: newDate
            }

           await dispatch(createTask(newTask));

        } else {

            const newTask = {
                userId: user.id,
                task: task,
            }

            await dispatch(createTask(newTask));
        };

        closeModal();
    }

    return (
        <div className="new-task-container">
            <h1>Create new task here</h1>
            <div className="task-details-container">
                <div className="task-label-input">
                    <span>Complete task by?</span>
                    <input
                        type='date'
                        value={currDate}
                        onChange={(e) => setDate(e.target.value)}
                        >
                    </input>
                </div>
                <button className='standard-button' onClick={() => setDate('')}>Do not include date with task</button>
                <div className="task-label-input2">
                    <span>Task:</span>
                    <textarea
                        type='text'
                        value={task}
                        style={{ resize: 'none' }}
                        onChange={(e) => setTask(e.target.value)}
                    ></textarea>
                </div>
                <button className='standard-button' type='submit' onClick={(e) => handleSubmit(e)}>Submit</button>
            </div>
        </div>
    )
}

export default CreateTask;
