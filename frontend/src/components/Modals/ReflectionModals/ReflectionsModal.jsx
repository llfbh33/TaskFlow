


const ReflectionModal = ({ title, buttonTitle, reflection, setReflection, handleSubmit }) => {


    // NOTE: id uses length+1 for now — will need unique IDs if delete/reorder is added
    const handleAddField = () => {
        setReflection(prev => ({
            ...prev,
            inputFields: [...prev.inputFields, { id: prev.inputFields.length + 1, value: '' }],
        }))
    };

    const handleInputChange = (id, value) => {
        setReflection(prev => ({
            ...prev,
            inputFields: prev.inputFields.map(field =>
                field.id === id ? { ...field, value } : field
            )
        }));
    };

    const handleValueChange = (value, prop) => {
        setReflection(prev => ({
            ...prev,
            [prop]: value
        }));
    }


    return (
        <form onSubmit={handleSubmit}>
            <h1>{title}</h1>
            <p>Fill out as much information as you can. Reflections are designed to help track progress, remember completed work, and note any challenges or solutions along the way.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label
                        style={{
                            fontSize: "0.95rem",
                            color: "rgba(255,255,255,0.82)",
                        }}
                    >List the projects, tasks, or activities you worked on today.</label>
                    {reflection.inputFields.map((field) => (
                        <div key={field.id}>
                            <input
                                type="text"
                                value={field.value}
                                onChange={(e) => handleInputChange(field.id, e.target.value)}
                                style={{
                                    width: "100%",
                                    boxSizing: "border-box",
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
                    ))}
                    <button type="button" className='modal-submit' onClick={handleAddField}>Add Input Field</button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label
                        style={{
                            fontSize: "0.95rem",
                            color: "rgba(255,255,255,0.82)",
                        }}
                    >What did you work on today?</label>
                    <textarea
                        type='text'
                        value={reflection.today}
                        onChange={(e) => handleValueChange(e.target.value, 'today')}
                        style={{
                            minHeight: "80px",
                            resize: "none",
                            borderRadius: "14px",
                            border: "1px solid rgba(255,255,255,0.12)",
                            background: "rgba(255,255,255,0.04)",
                            fontSize: "0.95rem",
                            color: "white",
                            padding: "16px",
                        }}
                    />
                    {/* <p></p> */}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label
                        style={{
                            fontSize: "0.95rem",
                            color: "rgba(255,255,255,0.82)",
                        }}
                    >What work are you most proud of or satisfied with today?</label>
                    <textarea
                        type='text'
                        value={reflection.accomplish}
                        onChange={(e) => handleValueChange(e.target.value, 'accomplish')}
                        style={{
                            minHeight: "80px",
                            resize: "none",
                            borderRadius: "14px",
                            border: "1px solid rgba(255,255,255,0.12)",
                            background: "rgba(255,255,255,0.04)",
                            fontSize: "0.95rem",
                            color: "white",
                            padding: "16px",
                        }}
                    />
                    {/* <p></p> */}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label
                        style={{
                            fontSize: "0.95rem",
                            color: "rgba(255,255,255,0.82)",
                        }}
                    >Did you face any challenges today and what were they?</label>
                    <textarea
                        type='text'
                        value={reflection.challenges}
                        onChange={(e) => handleValueChange(e.target.value, 'challenges')}
                        style={{
                            minHeight: "80px",
                            resize: "none",
                            borderRadius: "14px",
                            border: "1px solid rgba(255,255,255,0.12)",
                            background: "rgba(255,255,255,0.04)",
                            fontSize: "0.95rem",
                            color: "white",
                            padding: "16px",
                        }}
                    />
                    {/* <p></p> */}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label
                        style={{
                            fontSize: "0.95rem",
                            color: "rgba(255,255,255,0.82)",
                        }}
                    >What steps did or will you take to work through these challenges?</label>
                    <textarea
                        type='text'
                        value={reflection.overcome}
                        onChange={(e) => handleValueChange(e.target.value, 'overcome')}
                        style={{
                            minHeight: "80px",
                            resize: "none",
                            borderRadius: "14px",
                            border: "1px solid rgba(255,255,255,0.12)",
                            background: "rgba(255,255,255,0.04)",
                            fontSize: "0.95rem",
                            color: "white",
                            padding: "16px",
                        }}
                    />
                    {/* <p></p> */}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label
                        style={{
                            fontSize: "0.95rem",
                            color: "rgba(255,255,255,0.82)",
                        }}
                    >What goals or priorities do you have for tomorrow and the days ahead?</label>
                    <textarea
                        type='text'
                        value={reflection.goals}
                        onChange={(e) => handleValueChange(e.target.value, 'goals')}
                        style={{
                            minHeight: "80px",
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
                <div>
                    <button type='submit' className='modal-submit'>{buttonTitle}</button>
                </div>
            </div>
        </form>
    )
};


export default ReflectionModal;