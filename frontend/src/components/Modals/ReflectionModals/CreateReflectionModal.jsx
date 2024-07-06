import { useState } from "react";
import { useDispatch } from 'react-redux';
import { createJournal } from "../../../store/journals";
import { useModal } from "../../../context/Modal";



const CreateReflectionModal = () => {
    const [projects, setProjects] = useState([]);
    const [projectInput, setProjectInput] = useState('')
    const [today, setToday] = useState('');
    const [challenges, setChallenges] = useState('');
    const [overcome, setOvercome] = useState('');
    const [accomplish, setAccomplish] = useState('');
    const [goals, setGoals] = useState('');
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newReflection = {
            projects: projects.join(' '),
            today,
            challenges,
            overcome,
            accomplish,
            goals
        };

       const serverResponse = await dispatch(createJournal(newReflection));

        if (serverResponse.today) {
            console.log(serverResponse)
            return
        }

        setProjects([]);
        setToday('');
        setChallenges('');
        setOvercome('');
        setAccomplish('');
        setGoals('');
        closeModal();
    }

    return (
        <div>
            <h1>New Reflection</h1>
            <p>Fill out as much of the information below as you can.  The more information you provide the easier it will be to remember what you have done and what problems arrose along the way.</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>List out the projects you contributed to today.</label>
                    <div>
                        {projects && projects.map((ele, idx)=> (
                            <div key={idx}>{ele}</div>
                        ))}
                        {/* <input
                            >
                        </input> */}
                    </div>
                </div>
                <div>
                    <label>What did you work on today?</label>
                    <textarea
                        type='text'
                        value={today}
                        onChange={(e) => setToday(e.target.value)}
                        />
                </div>
                <div>
                    <label>Was there any work you are proud of or enjoyed?</label>
                    <textarea
                        type='text'
                        value={accomplish}
                        onChange={(e) => setAccomplish(e.target.value)}
                        />
                </div>
                <div>
                    <label>Did you face any challenges?</label>
                    <textarea
                        type='text'
                        value={challenges}
                        onChange={(e) => setChallenges(e.target.value)}
                        />
                </div>
                <div>
                    <label>What did or will you do to work through these challenges?</label>
                    <textarea
                        type='text'
                        value={overcome}
                        onChange={(e) => setOvercome(e.target.value)}
                        />
                </div>
                <div>
                    <label>What goals do you have for tomorrow and moving forward?</label>
                    <textarea
                        type='text'
                        value={goals}
                        onChange={(e) => setGoals(e.target.value)}
                        />
                </div>
                <div>
                    <button type='submit' >Submit</button>
                </div>
            </form>
        </div>
    )
}

export default CreateReflectionModal;
