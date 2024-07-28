import { useEffect, useState } from "react";
import { useModal } from "../../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../../../store/tasks";
import { format, addDays, subDays } from 'date-fns';


const CreateTask = () => {
    const user = useSelector(state => state.session.user);
    const [currDate, setDate] = useState(new Date());
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
        let today = new Date();
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
        <div>
            <h1>Create new task here</h1>
            <div>
                <div>
                    <span>When do you want to complete this task by?</span>
                    <input
                        type='date'
                        value={currDate}
                        onChange={(e) => setDate(e.target.value)}
                        >
                    </input>
                </div>
                <button onClick={() => setDate('')}>Do not include date with task</button>
                <div>
                    <span>Task</span>
                    <input
                        type='text'
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                    ></input>
                </div>
                <button type='submit' onClick={(e) => handleSubmit(e)}>submit</button>
            </div>
        </div>
    )
}

export default CreateTask;
