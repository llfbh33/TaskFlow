import { useState } from "react";
import { useDispatch } from 'react-redux';
import { createJournal } from "../../../store/journals";
import { useModal } from "../../../context/Modal";



const EditResourceWrapper = () => {
    const [inputFields, setInputFields] = useState([{id: 1, value: ''}]);
    const [today, setToday] = useState('');
    const [challenges, setChallenges] = useState('');
    const [overcome, setOvercome] = useState('');
    const [accomplish, setAccomplish] = useState('');
    const [goals, setGoals] = useState('');
    // const [hasSubmitted, setHasSubmitted] = useState(false);
    const dispatch = useDispatch();
    const { closeModal } = useModal();


    const handleAddField = () => {
        const newInput = ([...inputFields, { id: inputFields.length + 1, value: ''}]);
        setInputFields(newInput);
    }

    const handleInputChange = (id, value) => {
        const updateInput = inputFields.map(field => field.id === id ? {...field, value } : field);
        setInputFields(updateInput);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const projectsString = inputFields.map(project => project.value)

        const newReflection = {
            projects: projectsString.join(','),
            today,
            accomplish,
            challenges,
            overcome,
            goals
        };

       await dispatch(createJournal(newReflection));

        // if (serverResponse.today) {
        //     console.log(serverResponse)
        //     return
        // }

        setInputFields([{ id: 1, value: '' }]);
        setToday('');
        setChallenges('');
        setOvercome('');
        setAccomplish('');
        setGoals('');

        await closeModal();
    }

    return (
        <div>
            <h1>New Reflection</h1>
            <p>Fill out as much of the information below as you can.  The more information you provide the easier it will be to remember what you have done and what problems arrose along the way.</p>
            <div >
                <div>
                    <label>List out the projects you contributed to today.</label>
                    {inputFields.map((field) => (
                        <div key={field.id}>
                            <input
                                type="text"
                                value={field.value}
                                onChange={(e) => handleInputChange(field.id, e.target.value)}
                            />
                        </div>
                    ))}
                    <button onClick={handleAddField}>Add Input Field</button>
                </div>
                <div>
                    <label>What did you work on today?</label>
                    <textarea
                        type='text'
                        value={today}
                        onChange={(e) => setToday(e.target.value)}
                    />
                    <p></p>
                </div>
                <div>
                    <label>Was there any work you are proud of or enjoyed?</label>
                    <textarea
                        type='text'
                        value={accomplish}
                        onChange={(e) => setAccomplish(e.target.value)}
                    />
                    <p></p>
                </div>
                <div>
                    <label>Did you face any challenges?</label>
                    <textarea
                        type='text'
                        value={challenges}
                        onChange={(e) => setChallenges(e.target.value)}
                    />
                    <p></p>
                </div>
                <div>
                    <label>What did or will you do to work through these challenges?</label>
                    <textarea
                        type='text'
                        value={overcome}
                        onChange={(e) => setOvercome(e.target.value)}
                    />
                    <p></p>
                </div>
                <div>
                    <label>What goals do you have for tomorrow and moving forward?</label>
                    <textarea
                        type='text'
                        value={goals}
                        onChange={(e) => setGoals(e.target.value)}
                    />
                    <p></p>
                </div>
                <div>
                    <button type='submit' onClick={(e) => handleSubmit(e)}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default EditResourceWrapper;
