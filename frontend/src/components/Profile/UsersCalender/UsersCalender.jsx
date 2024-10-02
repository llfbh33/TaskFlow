import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import Loading from "../../Loading/Loading";
import { format, addDays, subDays } from 'date-fns';
import { CompleteTask, deleteTasks } from "../../../store/tasks";
import { useModal } from "../../../context/Modal";
import CreateTask from "../../Modals/TasksModals/CreateTask";
import { FaCircleNotch } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";


const UsersCalender = () => {
    const usersTasks = useSelector(state => state.tasks);
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const [datedTasks, setDatedTasks] = useState('');
    const [currDate, setCurrDate] = useState(new Date());
    const [currTasks, setCurrTasks] = useState('');
    const { setModalContent } = useModal();

    const addATask = () => {
        const modalComponent = <CreateTask date={currDate} />
        setModalContent(modalComponent)
    }

// Format the date as 'YYYY-MM-DD', changes the value of the calender up top and no errors in console
    const formatDateForInput = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

// compresses dates so the date returned does not include the time
    const compressDate = (date) => {
        const receDate = new Date(date);
        return `${receDate.getFullYear()}-${receDate.getMonth() + 1}-${receDate.getDate()}`
    }

    const dateAsTime = (date) => {
        const receDate = new Date(date);
        return parseInt(`${receDate.getFullYear()}${receDate.getMonth() + 1}${receDate.getDate()}`)
    }

// filters through the tasks a user has and only stores the ones which are set to a specific date to be completed
    useEffect(() => {
        let dates = Object.values(usersTasks).filter(task => task.date)
        setDatedTasks(dates);
    }, [usersTasks])

// Takes all tasks with dates and filters those to find all tasks associated with the current date
    useEffect(() => {
        let tasks = Object.values(datedTasks).filter(task => compressDate(task.date) === compressDate(currDate));
        setCurrTasks(tasks);
        setLoaded(true)
    }, [datedTasks, currDate])

// handles date display for the current previous and post dates
    const formatDate = (date, str) => {
        let today = new Date(date);
        if (str && str === 'prev') {
            today = subDays(today, 1);
        }
        if (str && str === 'post') {
            today = addDays(today, 1)
        }
        return format(today, 'EEEE, MMMM d yyyy');
    }

// handles the date display changes when clicked to make a new date the target date to display
    const handleDateChange = (str) => {
        let today = new Date(currDate);
        if (str === 'prev') today = subDays(today, 1);
        if (str === 'post') today = addDays(today, 1)
        setCurrDate(today)
    }

    const handleDeleteTask = async (idx) => {
        await dispatch(deleteTasks(idx));
    }

    const completeTask = async (task, str) => {
        await dispatch(CompleteTask(task, str));
    }

    if (!loaded) {
        return <Loading />
    }

    return (
        <div className="profile-selected-section">
            <div className="calender-title-flex">
                <div>
                    <h1>Calender</h1>
                </div>
                <div className="calender-title-buttons-flex">
                    <button className="standard-button" onClick={addATask} >Add a task</button>
                    <label >Choose A date: <input
                        type='date'
                        value={formatDateForInput(currDate)}
                        onChange={(e) => setCurrDate(new Date(addDays(e.target.value, 1)))}>
                        </input>
                    </label>
                    <button className="standard-button" onClick={() => setCurrDate(new Date())}>Return to Todays date</button>
                </div>

            </div>
            <div className="cal-dates-flex">
                <div
                    onClick={() => handleDateChange('prev')}
                    className="add-pointer-cursor highlight-underline date-transition"
                    >
                        {formatDate(currDate, 'prev')}
                </div>
                <div className="displayed-title">{formatDate(currDate)}</div>
                <div
                    onClick={() => handleDateChange('post')}
                    className="add-pointer-cursor highlight-underline date-transition"
                    >
                        {formatDate(currDate, 'post')}
                </div>
            </div>

            <div className="cal-tasks-flex">
                <h3>Tasks</h3>
                <div>
                    {currTasks && Object.values(currTasks).map(task => (
                        <div key={task.id} className="task-calender-results">
                            <div className="calender-search-results">
                                <div className="calender-check"
                                    onClick={() => task.isComplete ? completeTask(task, 'false') : completeTask(task, 'true')}
                                    >
                                    {task.isComplete ? <FaCheck /> : <FaCircleNotch />}
                                </div>
                                <span className={task.isComplete ? 'completed-task' :
                                                !task.isComplete && dateAsTime(new Date()) < dateAsTime(task.date) ? 'future-uncompleted-task' :
                                                !task.isComplete && dateAsTime(new Date()) === dateAsTime(task.date) ? 'uncompleted-task' :
                                                !task.isComplete && dateAsTime(new Date()) > dateAsTime(task.date) ? 'old-uncompleted-task' : ''} >{task.task}</span>
                            </div>
                            <button className='standard-button' onClick={() => handleDeleteTask(task.id)}>Delete</button>
                        </div>

                    ))}
                </div>
            </div>
        </div>
    )
}

export default UsersCalender
