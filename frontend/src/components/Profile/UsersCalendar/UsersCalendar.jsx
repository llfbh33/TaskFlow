import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux"
import Loading from "../../Loading/Loading";
import { format, addDays, subDays, add } from 'date-fns';
import { CompleteTask, deleteTasks } from "../../../store/tasks";
import { useModal } from "../../../context/Modal";
import CreateTask from "../../Modals/TasksModals/CreateTask";
import { FaCircleNotch } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { IoIosReturnLeft } from "react-icons/io";
import { IoPlayForward } from "react-icons/io5";
import { HiBackward } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { LiaEllipsisVSolid } from "react-icons/lia";
import { FaListUl } from "react-icons/fa";



const UsersCalendar = () => {
    const usersTasks = useSelector(state => state.tasks);
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const [datedTasks, setDatedTasks] = useState('');
    const [currDate, setCurrDate] = useState(new Date());
    const [currTasks, setCurrTasks] = useState('');
    const [datelessTasks, setDatelessTasks] = useState('');
    const { setModalContent } = useModal();
    const dateInputRef = useRef(null);
    const [actionItem, setActionItem] = useState(null);
    const [unassigned, setUnassigned] = useState(false);


    // filters through the tasks a user has and only stores the ones which are set to a specific date to be completed
    useEffect(() => {
        let dates = Object.values(usersTasks).filter(task => task.date);
        let unassigned = Object.values(usersTasks).filter(task => !task.date)
        setDatedTasks(dates);
        setDatelessTasks(unassigned);
    }, [usersTasks])

    // Takes all tasks with dates and filters those to find all tasks associated with the current date
    useEffect(() => {
        let tasks = Object.values(datedTasks).filter(task => compressDate(task.date) === compressDate(currDate));
        setCurrTasks(tasks);
        setLoaded(true)
    }, [datedTasks, currDate])



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

    const handleEdit = async (idx) => {
        console.log("coming soon");
    }

    const handleDelete = async (idx) => {
        console.log("There needs to be verification here that the user actualy wants to delete the task")
        await dispatch(deleteTasks(idx));
    }

    const completeTask = async (task, str) => {
        await dispatch(CompleteTask(task, str));
    }

    if (!loaded) {
        return <Loading />
    }

    return (
        <div className="main-container">
            <div className="child-container">
                <div className="padding-container-header">
                    <div className="search-section">
                        <h2 style={{
                            margin: "0px",
                            letterSpacing: "0.1rem",
                        }}>Calendar</h2>

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
                            <div className="cal-dates-flex">
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
                            <section className="results-section">
                                {/* <div className=""> */}
                                <div className="results-header" style={{ marginLeft: "16px" }}>
                                    <h3>Tasks</h3>
                                </div>

                                <div className="results-list">
                                    {currTasks && Object.values(currTasks).map(task => (
                                        <div key={task.id} className="result-item">
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
                                            <div className="action-wrapper">
                                                <button className="icon-button" onClick={() => setActionItem(task.id)}>
                                                    <LiaEllipsisVSolid />
                                                </button>

                                                {actionItem === task.id && (
                                                    <div className="action-menu" onMouseLeave={() => setActionItem(null)}>
                                                        <button className="icon-button" onClick={() => handleEdit(task.id)}><MdEdit /></button>
                                                        <button className="icon-button" onClick={() => handleDelete(task.id)}><MdDelete /></button>
                                                    </div>
                                                )}
                                            </div>
                                            {/* <button className='standard-button' onClick={() => handleDeleteTask(task.id)}>Delete</button> */}
                                        </div>

                                    ))}
                                </div>
                                {/* </div> */}
                            </section>
                        </div>
                    </div>
                    <div className={`unassigned-wrapper ${unassigned ? 'open' : 'closed'}`}>
                        <div className="unassigned-tasks">
                            <section className="results-section">
                                {/* <div className=""> */}
                                <div className="results-header" style={{ marginLeft: "16px" }}>
                                    <h3>Unassigned Tasks</h3>
                                </div>
                                <div className="results-list">
                                    {datelessTasks && Object.values(datelessTasks).map(task => (

                                        <div key={task.id} className="result-item">
                                            {console.log(task)}
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
                                            <div className="action-wrapper">
                                                <button className="icon-button" onClick={() => setActionItem(task.id)}>
                                                    <LiaEllipsisVSolid />
                                                </button>

                                                {actionItem === task.id && (
                                                    <div className="action-menu" onMouseLeave={() => setActionItem(null)}>
                                                        <button className="icon-button" onClick={() => handleEdit(task.id)}><MdEdit /></button>
                                                        <button className="icon-button" onClick={() => handleDelete(task.id)}><MdDelete /></button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UsersCalendar
