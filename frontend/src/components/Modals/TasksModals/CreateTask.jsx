import { useState } from "react";
import { useModal } from "../../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../../../store/tasks";
import { format, addDays, subDays } from 'date-fns';


const CreateTask = () => {
    const user = useSelector(state => state.session.user);
    const [date, setDate] = useState('');
    const [task, setTask] = useState('');
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Having difficulty with the dates being added a day behind, adding a day to the given date fixes that issue
        let newDate = new Date(date);
        newDate = addDays(newDate, 1)

        const newTask = {
            userId: user.id,
            task: task,
            date: newDate
        }

        dispatch(createTask(newTask))

        closeModal();
    }

    return (
        <div>
            <h1>Create new task here</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <span>When do you want to complete this task by?</span>
                    <input
                        type='date'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        >
                    </input>
                </div>
                <div>
                    <span>Task</span>
                    <input
                        type='text'
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                    ></input>
                </div>
                <button type='submit'>submit</button>
            </form>
        </div>
    )
}

export default CreateTask;
