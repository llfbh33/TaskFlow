import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import Loading from "../../Loading/Loading";
import { format } from 'date-fns';


const UsersCalender = () => {
    const usersTasks = useSelector(state => state.tasks);
    const [loaded, setLoaded] = useState(false);
    const [datedTasks, setDatedTasks] = useState('');
    const [currDate, setCurrDate] = useState(new Date());
    const [currTasks, setCurrTasks] = useState('')

    useEffect(() => {
        let dates = Object.values(usersTasks).filter(task => task.date)
        setDatedTasks(dates);
    }, [usersTasks])

    useEffect(() => {
        let tasks = Object.values(datedTasks).filter(task => task.date = currDate);
        setCurrTasks(tasks);
        setLoaded(true)
    }, [datedTasks])

    const formatDate = (date) => {
        const today = new Date(date)
        return format(today, 'EEEE, MMMM d yyyy');
    }

    if (!loaded) return <Loading />

    return (
        <div className="profile-selected-section">
            <h1>Place calender days here</h1>
            <div>{formatDate(currDate)}</div>
            <button>Change Date</button>
            <div>
                <div></div>
            </div>
            <div>
                <h3>Tasks</h3>
                <div>
                    {currTasks && Object.values(currTasks).map(task => (
                        <div key={task.id}>
                            <span>{task.task}</span>
                            <span>{formatDate(task.date)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default UsersCalender
