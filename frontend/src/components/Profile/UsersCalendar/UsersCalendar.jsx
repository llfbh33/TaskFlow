import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux"
import LoadingPage from "../../Loading/LoadingPage"
import { format, addDays, subDays, add } from 'date-fns';
import { completeTask, deleteTasks } from "../../../store/tasks";
import { useModal } from "../../../context/Modal";
import CreateTaskWrapper from "../../Modals/TasksModals/CreateTaskWrapper";
import { FaCircleNotch } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { IoIosReturnLeft } from "react-icons/io";
import { IoPlayForward } from "react-icons/io5";
import { HiBackward } from "react-icons/hi2";
import { FaListUl } from "react-icons/fa";
import DeleteModal from "../../Modals/DeleteModal";
import ListActions from "../ReusableComponents/ListActions";
import EditTaskWrapper from "../../Modals/TasksModals/EditTaskWrapper";



const UsersCalendar = () => {
    const usersTasks = useSelector(state => state.tasks);
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const [datedTasks, setDatedTasks] = useState('');
    const [currDate, setCurrDate] = useState(new Date());
    const [currTasks, setCurrTasks] = useState('');
    const [unassignedTasks, setUnassignedTasks] = useState('');
    const [completedTasks, setCompletedTasks] = useState('');
    const [incompleteTasks, setIncompleteTasks] = useState('');
    const { setModalContent, closeModal } = useModal();
    const dateInputRef = useRef(null);
    const [actionItem, setActionItem] = useState(null);
    const [unassigned, setUnassigned] = useState(false);

    // console.log('%c Unassigned Tasks', 'font-size: 20px;')

    // filters through the tasks a user has and only stores the ones which are set to a specific date to be completed
    useEffect(() => {
        let dates = Object.values(usersTasks).filter(task => task.date);
        let unassigned = Object.values(usersTasks).filter(task => !task.date)
        setDatedTasks(dates);
        setUnassignedTasks(unassigned);
    }, [usersTasks])

    // Takes all tasks with dates and filters those to find all tasks associated with the current date
    useEffect(() => {
        let tasks = Object.values(datedTasks).filter(task => compressDate(task.date) === compressDate(currDate));
        setCurrTasks(tasks);
        setLoaded(true)
    }, [datedTasks, currDate])

    useEffect(() => {
        let complete = Object.values(unassignedTasks).filter(task => task.isComplete);
        let notComplete = Object.values(unassignedTasks).filter(task => !task.isComplete);

        setCompletedTasks(complete);
        setIncompleteTasks(notComplete);
    }, [unassignedTasks])



    const addATask = () => {
        const modalComponent = <CreateTaskWrapper date={currDate} />
        setModalContent(modalComponent)
    }

    const handleEdit = async (id) => {
        const task = Object.values(usersTasks).find(one => one.id === id);
        const modalComponent = <EditTaskWrapper editTask={task} />
        setModalContent(modalComponent)
    }

    // Delete Tasks Functions
    const handleDelete = (id, description) => {
        const modalComponent = <DeleteModal subject={'task'} name={description} action={deleteTask} id={id} />
        setModalContent(modalComponent)
    };

    const deleteTask = async (e, id) => {
        e.preventDefault();
        await dispatch(deleteTasks(id));
        closeModal();
    };


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




    // const handleDelete = async (idx) => {
    //     console.log("There needs to be verification here that the user actualy wants to delete the task")
    //     await dispatch(deleteTasks(idx));
    // }

    const finishTask = async (task, str, ua) => {
        let updateTask = { ...task };
        if (ua) {
            let newDate = new Date();
            updateTask.date = newDate;
        };

        await dispatch(completeTask(updateTask, str));
    }

    if (!loaded) {
        return <LoadingPage />
    }

    return (
        <div className="main-container" >
            <div className="child-container">
                <div className="child-container-two">
                    <div className="padding-container-header" >
                        <div className="search-section" >
                            <h2 className="search-title" style={{ margin: "0px" }}>Calendar</h2>
                            <div className="search-actions">
                                <div className="actions-alignment">
                                    <input
                                        ref={dateInputRef}
                                        type="date"
                                        value={formatDateForInput(currDate)}
                                        onChange={(e) => setCurrDate(new Date(addDays(e.target.value, 1)))}
                                        style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}
                                    />
                                    <button
                                        className="icon-button"
                                        onClick={() => dateInputRef.current?.showPicker()}
                                    >
                                        <FaCalendarAlt />
                                    </button>
                                    <button className="icon-button" onClick={() => setCurrDate(new Date())}><IoIosReturnLeft /></button>
                                    <button className="icon-button" onClick={addATask}><IoMdAdd /></button>
                                    <button className="icon-button" onClick={() => setUnassigned(!unassigned)}><FaListUl /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{
                        borderBottom: '1px solid rgba(210, 209, 209, 0.187)',
                    }}></div>
                    <div className="unassigned-task-opening">
                        <div className="assigned-tasks">
                            <div className="padding-container">
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}>
                                    <button
                                        className="icon-button"
                                        onClick={() => handleDateChange('prev')}
                                    >
                                        <HiBackward style={{ fontSize: '2rem' }} />
                                    </button>
                                    <div className="displayed-title">{formatDate(currDate)}</div>
                                    <button
                                        className="icon-button"
                                        onClick={() => handleDateChange('post')}
                                    >
                                        <IoPlayForward style={{ fontSize: '2rem' }} />
                                    </button>
                                </div>
                            </div>
                            <div style={{
                                borderBottom: '1px solid rgba(210, 209, 209, 0.187)',
                            }}></div>

                            <div className="padding-container">
                                <section>
                                    {/* <div className=""> */}
                                    <div className="results-header" style={{ marginLeft: "16px" }}>
                                        <h3>Tasks</h3>
                                    </div>

                                    <div className="results-list">
                                        {currTasks && Object.values(currTasks).map(task => (
                                            <div key={task.id} className="result-item">
                                                <div className="result-link">
                                                    <div className="calender-check"
                                                        onClick={() => task.isComplete ? finishTask(task, 'false') : finishTask(task, 'true')}
                                                    >
                                                        {task.isComplete ? <FaCheck /> : <FaCircleNotch />}
                                                    </div>
                                                    <span className={task.isComplete ? 'completed-task' :
                                                        !task.isComplete && dateAsTime(new Date()) < dateAsTime(task.date) ? 'future-uncompleted-task' :
                                                            !task.isComplete && dateAsTime(new Date()) === dateAsTime(task.date) ? 'uncompleted-task' :
                                                                !task.isComplete && dateAsTime(new Date()) > dateAsTime(task.date) ? 'old-uncompleted-task' : ''} >{task.task}</span>
                                                </div>
                                                <ListActions id={task.id} name={task.task} actionItem={actionItem} setActionItem={setActionItem} handleEdit={handleEdit} handleDelete={handleDelete} />
                                                {/* <button className='standard-button' onClick={() => handleDeleteTask(task.id)}>Delete</button> */}
                                            </div>

                                        ))}
                                    </div>
                                    {/* </div> */}
                                </section>
                            </div>
                        </div>
                        {/* Listed output of unassigned tasks */}
                        <div className={`unassigned-wrapper ${unassigned ? 'open' : 'closed'}`}>
                            <div className="unassigned-tasks">
                                <section className="results-section" style={{ color: "rgb(214, 214, 214)", letterSpacing: "0.05rem" }}>
                                    {/* <div className=""> */}
                                    <div className="results-header" style={{ marginLeft: "16px" }}>
                                        <h3>Unassigned Tasks</h3>
                                    </div>
                                    <div className="results-list">
                                        {incompleteTasks && Object.values(incompleteTasks).map(task => (

                                            <div key={task.id} className="result-item">
                                                <div className="result-link">
                                                    <div className="calender-check"
                                                        onClick={() => task.isComplete ? finishTask(task, 'false', 'true') : finishTask(task, 'true', 'true')}
                                                    >
                                                        {task.isComplete ? <FaCheck /> : <FaCircleNotch />}
                                                    </div>
                                                    <span className={task.isComplete ? 'completed-task' :
                                                        !task.isComplete && dateAsTime(new Date()) < dateAsTime(task.date) ? 'future-uncompleted-task' :
                                                            !task.isComplete && dateAsTime(new Date()) === dateAsTime(task.date) ? 'uncompleted-task' :
                                                                !task.isComplete && dateAsTime(new Date()) > dateAsTime(task.date) ? 'old-uncompleted-task' : ''} >{task.task}</span>
                                                </div>
                                                <ListActions id={task.id} name={task.task} actionItem={actionItem} setActionItem={setActionItem} handleEdit={handleEdit} handleDelete={handleDelete} />
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UsersCalendar
