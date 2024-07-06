import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import OpenModalMenuItem from "../../../context/OpenModalMenuItem/OpenModalMenuItem";
import CreateReflectionModal from "../../Modals/ReflectionModals/CreateReflectionModal";

const SelectedReflection = ({reflection}) => {

    if (!reflection) return

    return (
        <div >
            <div className="reflections-questions-card">
                <span>Projects</span>
                {reflection.projects.split(',').map((project, idx) => (
                    <div key={idx}>
                        <li>{project.trim()}</li>
                    </div>
                ))}
            </div>
            <div className="reflections-questions-card">
                <span>What did you do on today?</span>
                <span>{reflection.today}</span>
            </div>
            <div className="reflections-questions-card">
                <span>Was there any work you are proud of?</span>
                <span>{reflection.acomplish}</span>
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
    const [filteredReflectList, setFilteredReflectList] = useState(Object.values(reflectList));
    const [selectedReflection, setSelectedReflection] = useState('')

    const handleReflectionClick = (reflection) => {
        if (selectedReflection === reflection) {
            setSelectedReflection('');
        } else {
            setSelectedReflection(reflection)
        }
    }

    const handleSetReflectionFilter = (condition) => {
        if (condition === 'all') setFilteredReflectList(Object.values(reflectList));
        if (condition === 'seven') setFilteredReflectList('')
    }

    return (
        <div className="profile-selected-section">
            <h1>Reflections</h1>
            <div className="modal-text-item">
                <OpenModalMenuItem
                itemText='Add a reflection for the day?'
                modalComponent={<CreateReflectionModal />}
                />
            </div>
            <div>
                <button onClick={() => handleSetReflectionFilter('all')}>All Reflections</button>
                <button onClick={() => handleSetReflectionFilter('seven')}>last 7 days</button>
                <button onClick={() => handleSetReflectionFilter('month')}>last Month</button>
                <button onClick={() => handleSetReflectionFilter('two-months')}>last 2 months</button>
            </div>
            <div >
                {filteredReflectList && filteredReflectList.map((reflection, idx) => (
                    <div key={idx} onClick={() => handleReflectionClick(reflection)}>
                        <span className="reflections-questions-card">{reflection.date}</span>
                        {selectedReflection === reflection ? <SelectedReflection reflection={reflection} /> : ''}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UsersReflections;
