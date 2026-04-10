


const TasksModal = ({ title, task, setTask, date, setDate, handleSubmit }) => {

    return (
        <>
            <h1 className="modal-title">{title}</h1>
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                paddingTop: "16px",
            }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label
                        style={{
                            fontSize: "0.95rem",
                            color: "rgba(255,255,255,0.82)",
                        }}
                    >Set a date</label>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        flex: 1,
                        justifyContent: "space-between"
                    }}>
                        <input type="date" value={date} style={{ cursor: "pointer", width: "50%" }} onChange={(e) => setDate(e.target.value)} />
                        <button 
                            className={date === "" ? "task-unassigned-btn" : "task-unassigned-button"}
                            onClick={() => setDate("")}>{date === "" ? "No date assigned" : "Leave unassigned"}</button>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label
                        style={{
                            fontSize: "0.95rem",
                            color: "rgba(255,255,255,0.82)",
                        }}
                    >Task description</label>
                    <textarea
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        style={{
                            minHeight: "100px",
                            resize: "none",
                            borderRadius: "14px",
                            border: "1px solid rgba(255,255,255,0.12)",
                            background: "rgba(255,255,255,0.04)",
                            fontSize: "0.95rem",
                            color: "white",
                            padding: "16px",
                        }}
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className='modal-submit'
                    >
                        Create Task
                    </button>
                </div>
            </div>
        </>
    )
}

export default TasksModal;