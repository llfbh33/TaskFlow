import { useSelector } from "react-redux"

const UsersTasks = () => {
    const allTasks = useSelector(state => state.tasks)

    return (
        <div>
            <h1>All Unassigned tasks!</h1>
            <div>
                {console.log(allTasks)}
                {Object.values(allTasks).map(task => (
                    <div key={task.id}>
                        <input type='checkbox'></input>
                        <span>{task.task}</span>
                    </div>
                ))}
            </div>
            {/* submitting completed tasks will remove all checked tasks from the uncompleted list to the completed one */}
            <button>Submit Completed Tasks</button>
            <div>Completed tasks go down here</div>
        </div>
    )
}

export default UsersTasks
