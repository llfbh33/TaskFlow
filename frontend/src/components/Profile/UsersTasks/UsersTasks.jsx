import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import Loading from "../../Loading/Loading";
import { CompleteTask } from "../../../store/tasks";

const UsersTasks = () => {
    const allTasks = useSelector(state => state.tasks);
    const [unassignedTasks, setUnassignedTasks] = useState('');
    const [completedTasks, setCompletedTasks] = useState('');
    const [incompleteTasks, setIncompleteTasks] = useState('');
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        let complete = Object.values(unassignedTasks).filter(task => task.isComplete);
        let notComplete = Object.values(unassignedTasks).filter(task => !task.isComplete);

        setCompletedTasks(complete);
        setIncompleteTasks(notComplete);
        setLoading(false);
    }, [unassignedTasks]);

    useEffect(() => {
        setLoading(true);
        let unassigned = Object.values(allTasks).filter(task => !task.date)

        setUnassignedTasks(unassigned);
    }, [allTasks])



    const handleCompleteTask = async (task) => {
        // setLoading(true)
        await dispatch(CompleteTask(task.id));
        // await setLoading(false);
    }

    const handleAccidentalComplete = async (task) => {
        // setLoading(true);
        // await dispatch(inCompleteTask(task.id));
        // await setLoading(false)
    }

    return (
        <div className="profile-selected-section">
            <h1>All Unassigned tasks!</h1>
            <div>
                {!loading ? Object.values(incompleteTasks).map(task => (
                    <div key={task.id}>
                        <input onClick={() => handleCompleteTask(task)} type='checkbox'></input>
                        <span>{task.task}</span>
                    </div>
                )) : <Loading />}
            </div>
            {/* submitting completed tasks will remove all checked tasks from the uncompleted list to the completed one */}

            <div>Completed tasks go down here</div>
            {!loading ? Object.values(completedTasks).map(task => (
                    <div key={task.id + 1000}>
                        <input onClick={() => handleAccidentalComplete(task)}type='checkbox' checked></input>
                        <span>{task.task}</span>
                    </div>
                )) : <Loading />}
        </div>
    )
}

export default UsersTasks
