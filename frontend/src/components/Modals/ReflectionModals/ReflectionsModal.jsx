


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
            <p>Fill out as much of the information below as you can.  The more information you provide the easier it will be to remember what you have done and what problems arrose along the way.</p>
            <div >
                <div>
                    <label>List out the projects you contributed to today.</label>
                    {reflection.inputFields.map((field) => (
                        <div key={field.id}>
                            <input
                                type="text"
                                value={field.value}
                                onChange={(e) => handleInputChange(field.id, e.target.value)}
                            />
                        </div>
                    ))}
                    <button type="button" onClick={handleAddField}>Add Input Field</button>
                </div>
                <div>
                    <label>What did you work on today?</label>
                    <textarea
                        type='text'
                        value={reflection.today}
                        onChange={(e) => handleValueChange(e.target.value, 'today')}
                    />
                    <p></p>
                </div>
                <div>
                    <label>Was there any work you are proud of or enjoyed?</label>
                    <textarea
                        type='text'
                        value={reflection.accomplish}
                        onChange={(e) => handleValueChange(e.target.value, 'accomplish')}
                    />
                    <p></p>
                </div>
                <div>
                    <label>Did you face any challenges?</label>
                    <textarea
                        type='text'
                        value={reflection.challenges}
                        onChange={(e) => handleValueChange(e.target.value, 'challenges')}
                    />
                    <p></p>
                </div>
                <div>
                    <label>What did or will you do to work through these challenges?</label>
                    <textarea
                        type='text'
                        value={reflection.overcome}
                        onChange={(e) => handleValueChange(e.target.value, 'overcome')}
                    />
                    <p></p>
                </div>
                <div>
                    <label>What goals do you have for tomorrow and moving forward?</label>
                    <textarea
                        type='text'
                        value={reflection.goals}
                        onChange={(e) => handleValueChange(e.target.value, 'goals')}
                    />
                    <p></p>
                </div>
                <div>
                    <button type='submit'>{buttonTitle}</button>
                </div>
            </div>
        </form>
    )
};


export default ReflectionModal;