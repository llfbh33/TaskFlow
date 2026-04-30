import { MdDelete } from "react-icons/md";


const ResourceModal = ({ title, resource, setResource, errors, setErrors, handleSubmit }) => {

    const handleValueChange = (value, prop) => {
        if (prop === 'keyOptions') {
            if (value === '') return;
            let options = [...resource.keyOptions];
            if (!options.includes(value)) {
                options.push(value);
                value = options;
            }
        }
        setResource(prev => ({
            ...prev,
            [prop]: value
        }));
    };


    const deleteKey = (idx) => {
        let keywords = [...resource.keyOptions];
        keywords.splice(idx, 1)
        setResource(prev => ({
            ...prev,
            keyOptions: keywords,
        }))
    };

    return (
        <>
            <h1 className="modal-title">{title}</h1>
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
            }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label
                        style={{
                            fontSize: "0.95rem",
                            color: "rgba(255,255,255,0.82)",
                        }}
                    >Resource Description</label>
                    <input
                        type='text'
                        value={resource.name}
                        onChange={(e) => handleValueChange(e.target.value, 'name')}
                        style={{
                            flex: 1,
                            padding: "12px 18px",
                            borderRadius: "16px",
                            border: "1px solid rgba(255,255,255,0.1)",
                            background: "rgba(255,255,255,0.04)",
                            color: "white",
                            fontSize: "1rem",
                            outline: "none",
                        }}
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label
                        style={{
                            fontSize: "0.95rem",
                            color: "rgba(255,255,255,0.82)",
                        }}
                    >Resource URL</label>
                    <input
                        type='url'
                        value={resource.url}
                        onChange={(e) => handleValueChange(e.target.value, 'url')}
                        style={{
                            flex: 1,
                            padding: "12px 18px",
                            borderRadius: "16px",
                            border: "1px solid rgba(255,255,255,0.1)",
                            background: "rgba(255,255,255,0.04)",
                            color: "white",
                            fontSize: "1rem",
                            outline: "none",
                        }}
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label
                        style={{
                            fontSize: "0.95rem",
                            color: "rgba(255,255,255,0.82)",
                        }}
                    >Keywords for Resource:</label>
                    <ul style={{
                        marginTop: "14px",
                        marginBottom: "18px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px"
                    }}>
                        {resource.keyOptions.map((option, idx) => (
                            <div style={{ display: "flex", justifyContent: "space-between" }} key={idx}>
                                <li key={idx}>{option}</li> <button onClick={() => deleteKey(idx)} className="icon-button"><MdDelete /></button>
                            </div>
                        ))}
                    </ul>
                    <select
                        id="dropdown"
                        onChange={(e) => handleValueChange(e.target.value, 'keyOptions')}
                        className="custom-select"
                    >
                        <option value="">--Relevant Keywords--</option>
                        <option value="Coding Languages">Coding Languages</option>
                        <option value="System Design">System Design</option>
                        <option value="Frameworks">Frameworks</option>
                        <option value="Algorithms">Algorithms</option>
                        <option value="Version Control">Version Control</option>
                        <option value="Soft Skills">Soft Skills</option>
                        <option value="Debugging">Debugging</option>
                        <option value="Career Strategy">Career Strategy</option>
                    </select>
                </div>
                <button className='modal-submit' type='submit' onClick={(e) => handleSubmit(e)}>Submit Resource</button>
            </div>
        </>
    )
};

export default ResourceModal;