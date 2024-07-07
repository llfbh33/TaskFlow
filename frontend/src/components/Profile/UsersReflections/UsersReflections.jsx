import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import OpenModalMenuItem from "../../../context/OpenModalMenuItem/OpenModalMenuItem";
import CreateReflectionModal from "../../Modals/ReflectionModals/CreateReflectionModal";
import { useDispatch } from "react-redux";
import { deleteJournal, getJournals } from "../../../store/journals";
import { format } from 'date-fns';


const SelectedReflection = ({reflection}) => {

    if (!reflection) return

    return (
        <div className="open-reflection-container">
            <div className="reflections-questions-card reflection-projects">
                <span>Projects</span>
                {reflection.projects.split(',').map((project, idx) => (
                    <div key={idx}>
                        <li>{project.trim()}</li>
                    </div>
                ))}
            </div>
            <div className="reflections-questions-card">
                <span>What did you work on today?</span>
                <span>{reflection.today}</span>
            </div>
            <div className="reflections-questions-card">
                <span>Was there any work you are proud of or enjoyed?</span>
                <span>{reflection.accomplish}</span>
            </div>
            <div className="reflections-questions-card">
                <span>Did you face any challenges?</span>
                <span>{reflection.challenges}</span>
            </div>
            <div className="reflections-questions-card">
                <span>What did or will you do to work through these challenges?</span>
                <span>{reflection.overcome}</span>
            </div>
            <div className="reflections-questions-card">
                <span>What goals do you have for tomorrow and moving forward?</span>
                <span>{reflection.goals}</span>
            </div>
        </div>
    )
}

const UsersReflections = () => {
    const reflectList = useSelector(state => state.journals);
    const [loaded, setLoaded] = useState(false);
    const [filteredReflectList, setFilteredReflectList] = useState('');
    const [selectedReflection, setSelectedReflection] = useState('')
    const dispatch = useDispatch();

    useEffect(() => {
        const array = Object.values(reflectList)
        array.sort((a, b) => new Date(b.date) - new Date(a.date));
        setFilteredReflectList(array)
        setLoaded(true)

    }, [reflectList])

    const formatDate = (data) => {
        const newDate = new Date(data);
        return format(newDate, 'EEEE MMMM d yyyy');
    }



    const handleReflectionClick = (reflection) => {
        if (selectedReflection === reflection) {
            setSelectedReflection('');
        } else {
            setSelectedReflection(reflection)
        }
    }

    const handleSetReflectionFilter = (condition) => {
        const now = new Date();
        let filteredList = [];

        if (condition === 'all') {
            filteredList = Object.values(reflectList);
        } else {
            const dateDistance = new Date(now);
            dateDistance.setDate(now.getDate() - condition);
            filteredList = Object.values(reflectList).filter(reflection => new Date(reflection.date) >= dateDistance);
        }

        filteredList.sort((a, b) => new Date(b.date) - new Date(a.date));
        setFilteredReflectList(filteredList);
    }

    const handleDeleteReflection = async (id) => {
        await dispatch(deleteJournal(id));
        return;
    }

    if (!loaded) return;

    return (
        <div className="profile-selected-section">
            <div className="reflection-title-and-creation">
                <h1>Reflections</h1>
                <div className="modal-text-item">
                    <OpenModalMenuItem
                        itemText='Add a reflection for the day?'
                        modalComponent={<CreateReflectionModal setLoaded={setLoaded}/>}
                    />
                </div>
            </div>
            <div className="center-reflection-filter-buttons">Filter Reflections by date:</div>
            <div className="center-reflection-filter-buttons">
                <button onClick={() => handleSetReflectionFilter('all')}>All Reflections</button>
                <button onClick={() => handleSetReflectionFilter(7)}>last 7 days</button>
                <button onClick={() => handleSetReflectionFilter(14)}>last 14 days</button>
                <button onClick={() => handleSetReflectionFilter(30)}>last 30 days</button>
            </div>
            <div >
                {filteredReflectList && filteredReflectList.map((reflection, idx) => (
                    <div key={idx} className={selectedReflection === reflection ? 'open-reflection-card' : "closed-reflection-card"}>
                        <span className="reflections-questions-card" onClick={() => handleReflectionClick(reflection)}>{formatDate(reflection.date)}</span>
                        {selectedReflection === reflection ? <SelectedReflection reflection={reflection} /> : ''}
                        <div>
                            <button onClick={() => handleDeleteReflection(reflection.id)} className="delete-reflection">Delete Reflection</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UsersReflections;
