// import { useEffect, useState, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux"
// import Loading from "../../Loading/Loading";
// import { completeTask, deleteTasks } from "../../../store/tasks";
// import { useModal } from "../../../context/Modal";
// import CreateTask from "../../Modals/TasksModals/CreateTask";
// import DOMPurify from 'dompurify';
// import { compressDate, formatDate } from "../../../utils/DateFormating";
// import { format, addDays, subDays } from 'date-fns';
// import { GoTrash } from "react-icons/go";
// import DeleteTask from "../../Modals/TasksModals/DeleteTask";

const UsersTasks = () => {
    const allTasks = useSelector(state => state.tasks);
    // const [unassignedTasks, setUnassignedTasks] = useState('');
    // const [completedTasks, setCompletedTasks] = useState('');
    // const [incompleteTasks, setIncompleteTasks] = useState('');
    // const [loading, setLoading] = useState(true);
    // const { setModalContent } = useModal();
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     let complete = Object.values(unassignedTasks).filter(task => task.isComplete);
    //     let notComplete = Object.values(unassignedTasks).filter(task => !task.isComplete);

    //     setCompletedTasks(complete);
    //     setIncompleteTasks(notComplete);
    //     setLoading(false);
    // }, [unassignedTasks]);

    // useEffect(() => {
    //     setLoading(true);
    //     let unassigned = Object.values(allTasks).filter(task => !task.date)

    //     setUnassignedTasks(unassigned);
    // }, [allTasks])



    // const handleCompleteTask = async (task, str) => {
    //     // setLoading(true)
    //     await dispatch(CompleteTask(task, str));
    //     // await setLoading(false);
    // }

    // // const handleAccidentalComplete = async (task) => {
    //     // setLoading(true);
    //     // await dispatch(inCompleteTask(task.id));
    //     // await setLoading(false)
    // // }

    // const deleteATask = (task) => {
    //     const modalComponent = <DeleteTask />
    //     setModalContent=(modalComponent);
    // }
    // // const handleDeleteTask = async (idx) => {
    // //     await dispatch(deleteTasks(idx));
    // // }

    // const addATask = () => {
    //     const modalComponent = <CreateTask />
    //     setModalContent(modalComponent);
    // }



    // const checkYellowTime = (date) => {
    //     let taskDate = new Date(date);
    //     let today = new Date();
    //     today = subDays(today, 25);
    //     if (today >= taskDate) return true;
    //     return false;
    // }

    // return (
    //     <div className="profile-selected-section">
    //         <div className="reflection-title-and-creation">
    //             <h1>All Unassigned tasks!</h1>
    //             <button className="add-pointer-cursor" onClick={addATask}>Add a task</button>
    //         </div>

    //         <h4>Unassigned tasks are anything that has to be completed but there is not yet or will never be a set date the task needs to be completed by.</h4>
    //         <h5>Any tasks added to this list will glow yellow three days before they have been listed here a month and red if they have been here for over a month and not completed.</h5>
    //         <h5>You can always add them to a specific date later if you figure out a proper deadline for them, in that case they will be removed from this list and added to the proper date on the calender.</h5>
    //         <div>
    //             {!loading ? Object.values(incompleteTasks).map(task => (
    //                 <div key={task.id} className="task-spacing">
    //                     <div>
    //                         <input onClick={() => task.isComplete ? handleCompleteTask(task, 'false') : handleCompleteTask(task, 'true')} type='checkbox'></input>
    //                         <span className={checkYellowTime(task.createdAt) ? 'uncompleted-task' : '' }>{task.task}{task.createdAt}</span>
    //                     </div>
    //                     <button className='delete-button-calender' onClick={() => deleteATask(task)}><div><GoTrash /></div></button>
    //                 </div>
    //             )) : <Loading />}
    //         </div>
    //         {/* submitting completed tasks will remove all checked tasks from the uncompleted list to the completed one */}

    //         <div>Completed tasks go down here</div>
    //         {!loading ? Object.values(completedTasks).map(task => (
    //                 <div key={task.id + 1000} className="task-spacing">
    //                     <div>
    //                         <input onClick={() => task.isComplete ? handleCompleteTask(task, 'false') : handleCompleteTask(task, 'true')}type='checkbox' checked></input>
    //                         <span><strike>{task.task}</strike></span>
    //                     </div>
    //                     <div>{formatDate(task.updatedAt)}</div>
    //                 </div>
    //             )) : <Loading />}

    //     </div>
    // )

    return (
        <></>
    )
}






const TestTextEditor = () => {

    const [content, setContent] = useState('');
    const [isLargeText, setIsLargeText] = useState(false);
    const editorRef = useRef(null);

    const handleChange = () => {
        if (editorRef.current) {
            const htmlContent = editorRef.current.innerHTML;
            const sanitizedContent = DOMPurify.sanitize(htmlContent);
            setContent(sanitizedContent);
          }
    };

    const handleLargeTextToggle = () => {
        setIsLargeText(prev => !prev);
    };

    const applyLargeText = () => {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        const span = document.createElement('span');
        span.style.fontSize = '24px'; // Apply large font size
        range.surroundContents(span);

        // Move the caret to the end of the selection
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
    };

    const handleKeyDown = (e) => {
        if (isLargeText) {
            // Allow backspace, delete, arrow keys to function normally
            const allowedKeys = [
                'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
                'Control', 'Meta', 'Alt', 'Shift'
            ];
            if (!allowedKeys.includes(e.key)) {
                e.preventDefault();
                applyLargeText();
                document.execCommand('insertText', false, e.key);
            }
        }
    };

    return (
        <div style={{margin: "20px"}}>
            <button onClick={handleLargeTextToggle}>
                {isLargeText ? 'Disable Large Text' : 'Enable Large Text'}
            </button>
            <div
                contentEditable
                ref={editorRef}
                style={{
                    border: '1px solid black',
                    padding: '10px',
                    minWidth: '400px',
                    minHeight: '200px',
                }}
                onInput={handleChange}
                onKeyDown={handleKeyDown}
            ></div>
            <div
                dangerouslySetInnerHTML={{ __html: content }}
                style={{
                    border: '1px solid black',
                    padding: '10px',
                    minHeight: '200px',
                    marginTop: '20px'
                }}
            ></div>
        </div>
    )
}




export default UsersTasks
