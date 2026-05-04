import { useEffect, useState } from "react";
import { useModal } from "../../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../../../store/tasks";
import { addDays } from 'date-fns';
import '../Modals.css';
import TasksModal from "./TasksModal";


const EditTaskWrapper = ({ editTask }) => {
    const user = useSelector(state => state.session.user);
    const [currDate, setDate] = useState(null);
    const [task, setTask] = useState(editTask.task);
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
        if (editTask.date !== null) {
            let today = editTask.date ? new Date(editTask.date) : new Date();
            today = formatDateForInput(today)
            setDate(today)
        } else {
            setDate("")
        }
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const newTask = {
                id: editTask.id,
                userId: user.id,
                task: task,
                date: null,
            };

            // Having difficulty with the dates being added a day behind, adding a day to the given date fixes that issue
            if (currDate) {
                let newDate = new Date(currDate);
                newDate = addDays(newDate, 1);

                newTask.date = newDate;
            }

            await dispatch(updateTask(newTask));
            closeModal();
        } catch (error) {
            console.error("Faild to edit task", error);
        }
    };


    return (
        <TasksModal title={'Edit Task'} buttonTitle={'Submit'} task={task} setTask={setTask} date={currDate} setDate={setDate} handleSubmit={handleSubmit} />
    )
}

export default EditTaskWrapper;
