import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import Loading from "../../Loading/Loading";
import { format, addDays, subDays } from 'date-fns';
import { inCompleteTask } from "../../../store/tasks";


const UsersCalender = () => {
    const usersTasks = useSelector(state => state.tasks);
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const [datedTasks, setDatedTasks] = useState('');
    const [currDate, setCurrDate] = useState(new Date());
    const [currTasks, setCurrTasks] = useState('');

// compresses dates so the date returned does not include the time
    const compressDate = (date) => {
        const receDate = new Date(date);
        return `${receDate.getFullYear()}-${receDate.getMonth()}-${receDate.getDate()}`
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

    const completeTask = async (task, str) => {
        await dispatch(inCompleteTask(task.id, str));
    }

    if (!loaded) return <Loading />

    return (
        <div className="profile-selected-section">
            <h1>Place calender days here</h1>
            <div className="cal-dates-flex">
                <div
                    onClick={() => handleDateChange('prev')}
                    className="add-pointer-cursor highlight-underline"
                    >
                        {formatDate(currDate, 'prev')}
                </div>
                <div className="displayed-title">{formatDate(currDate)}</div>
                <div
                    onClick={() => handleDateChange('post')}
                    className="add-pointer-cursor highlight-underline"
                    >
                        {formatDate(currDate, 'post')}
                </div>
            </div>

            <div>
                <h3>Tasks</h3>
                <div>
                    {currTasks && Object.values(currTasks).map(task => (
                        <div key={task.id} className="resource-search-results">
                            <button
                                onClick={() => task.isComplete ? completeTask(task, 'false') : completeTask(task, 'true')}
                                >
                                {task.isComplete ? 'X' : '-'}
                            </button>
                            <span className={task.isComplete ? 'completed-task' : 'uncompleted task'} >{task.task}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default UsersCalender
