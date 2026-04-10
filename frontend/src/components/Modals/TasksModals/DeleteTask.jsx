import { useModal } from "../../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteTasks } from "../../../store/tasks";
import '../Modals.css';
import { IoMdClose } from "react-icons/io";


const DeleteTask = ({ id, description }) => {
    // const user = useSelector(state => state.session.user);
    // const [currDate, setDate] = useState();
    // const [task, setTask] = useState('');
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    // const dispatch = useDispatch();


    const handleDelete = async () => {
        await dispatch(deleteTasks(id));
        closeModal();
    };

    // // Format the date as 'YYYY-MM-DD', changes the value of the calender up top and no errors in console
    // const formatDateForInput = (date) => {
    //     const year = date.getFullYear();
    //     const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    //     const day = String(date.getDate()).padStart(2, '0');
    //     return `${year}-${month}-${day}`;
    // };

    // useEffect(() => {
    //     let today = date ? new Date(date) : new Date();
    //     today = formatDateForInput(today)
    //     setDate(today)
    // }, [])

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     if (currDate) {
    //         // Having difficulty with the dates being added a day behind, adding a day to the given date fixes that issue
    //         let newDate = new Date(currDate);
    //         newDate = addDays(newDate, 1)

    //         const newTask = {
    //             userId: user.id,
    //             task: task,
    //             date: newDate
    //         }

    //         await dispatch(createTask(newTask));

    //     } else {

    //         const newTask = {
    //             userId: user.id,
    //             task: task,
    //         }

    //         await dispatch(createTask(newTask));
    //     };

    //     closeModal();
    // }

    return (
        <div
            style={{
                minHeight: "300px",
                width: "100%",
                borderRadius: "12px",
                background:
                    "radial-gradient(circle at top left, rgba(124,140,255,0.16), transparent 30%), radial-gradient(circle at bottom right, rgba(94,234,212,0.10), transparent 28%), linear-gradient(180deg, #0d1017 0%, #151925 100%)",
                color: "white",

            }}
        >
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    // minHeight: "720px",
                    borderRadius: "12px",
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.04)",
                    boxShadow:
                        "0 25px 80px rgba(0,0,0,0.35), inset 0 0 40px rgba(255,255,255,0.03)",
                    backdropFilter: "blur(14px)",
                }}
            >
                <div
                    style={{
                        padding: "44px 56px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        background:
                            "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.015) 100%)",
                    }}
                >
                    <button
                        type="buton"
                        className="icon-button"
                        style={{ justifyContent: "flex-start", marginBottom: "20px" }}
                        onClick={() => closeModal()}>
                        <IoMdClose />
                    </button>
                    <div style={{ maxWidth: "420px", width: "100%", margin: "0 auto" }}>
                        <h1>Are you sure you want to remove this task?</h1>
                        <p style={{ opacity: 0.8, marginTop: "8px" }}>
                            {description}
                        </p>

                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "18px" }}>
                            <button
                                type="button"
                                onClick={() => closeModal()}
                                style={{
                                    padding: "15px 20px",
                                    borderRadius: "999px",
                                    border: "1px solid rgba(255,255,255,0.14)",
                                    background: "rgba(129, 229, 129, 0.1)",
                                    color: "white",
                                    fontSize: "1rem",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                }}
                            >
                                Keep
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                style={{
                                    padding: "15px 20px",
                                    borderRadius: "999px",
                                    border: "1px solid rgba(255,255,255,0.14)",
                                    background: "rgba(229, 129, 129, 0.1)",
                                    color: "white",
                                    fontSize: "1rem",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                }}
                            >
                                Delete
                            </button>
                        </div>

                        {/* <div style={{ marginTop: "28px", display: "flex", flexDirection: "column", gap: "14px" }}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    gap: "16px",
                                }}
                            >
                                <span>Complete by</span>
                                <input type="date" value={currDate} style={{ cursor: "pointer" }} onChange={(e) => setDate(e.target.value)} />
                            </div>

                            <button
                                type="button"
                                style={{
                                    alignSelf: "flex-end",
                                    background: "transparent",
                                    border: "1px solid rgba(255,255,255,0.14)",
                                    color: "rgba(255,255,255,0.82)",
                                    borderRadius: "999px",
                                    padding: "10px 16px",
                                    cursor: "pointer",
                                }}
                                onClick={() => setDate("")}
                            >
                                Leave unassigned
                            </button>

                            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>
                                <span>Task</span>
                                <textarea
                                    value={task}
                                    onChange={(e) => setTask(e.target.value)}
                                    style={{
                                        minHeight: "120px",
                                        resize: "none",
                                        borderRadius: "14px",
                                        border: "1px solid rgba(255,255,255,0.12)",
                                        background: "rgba(255,255,255,0.04)",
                                        color: "white",
                                        padding: "16px",
                                    }}
                                />
                            </div>

                            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "18px" }}>
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    style={{
                                        padding: "15px 20px",
                                        borderRadius: "999px",
                                        border: "1px solid rgba(255,255,255,0.14)",
                                        background: "rgba(255,255,255,0.06)",
                                        color: "white",
                                        fontSize: "1rem",
                                        fontWeight: 600,
                                        cursor: "pointer",
                                    }}
                                >
                                    Create Task
                                </button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteTask;
