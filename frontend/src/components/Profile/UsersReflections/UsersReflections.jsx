import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import OpenModalMenuItem from "../../../context/OpenModalMenuItem/OpenModalMenuItem";
import CreateReflectionModal from "../../Modals/ReflectionModals/CreateReflectionModal";
import { useDispatch } from "react-redux";
import { deleteJournal, getJournals } from "../../../store/journals";
import { format } from 'date-fns';
import SelectedReflection from "./SelectedReflection";
import { useModal } from "../../../context/Modal";




const UsersReflections = () => {
    const reflectList = useSelector(state => state.journals);
    const [loaded, setLoaded] = useState(false);
    const [filteredReflectList, setFilteredReflectList] = useState('');
    const [selectedReflection, setSelectedReflection] = useState('')
    const dispatch = useDispatch();
    const { setModalContent } = useModal();

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

    const openReflectionModal = async () => {
        const modalComponent = <CreateReflectionModal />
        setModalContent(modalComponent)
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
        <div className="main-container">
            <div className="child-container">
                <div className="">
                    <div className="padding-container-header" style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <h1>Reflections</h1>
                        <button
                            type="submit"
                            onClick={openReflectionModal}
                            style={{
                                padding: "10px 10px",
                                width: "160px",
                                borderRadius: "999px",
                                border: "1px solid rgba(255,255,255,0.14)",
                                background: "rgba(255,255,255,0.06)",
                                color: "white",
                                fontSize: "1rem",
                                fontWeight: 600,
                                cursor: "pointer",
                            }}
                        >
                            Add a Reflection
                        </button>
                    </div>
                    <div className="padding-container">
                        <h4 className="center-reflection-filter-buttons">Filter Reflections by date:</h4>
                        <div className="center-reflection-filter-buttons">
                            <button
                                type="submit"
                                onClick={() => handleSetReflectionFilter('all')}
                                style={{
                                    padding: "10px 10px",
                                    width: "160px",
                                    borderRadius: "999px",
                                    border: "1px solid rgba(255,255,255,0.14)",
                                    background: "rgba(255,255,255,0.06)",
                                    color: "white",
                                    fontSize: "1rem",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                }}
                            >
                                All Reflections
                            </button>
                            <button
                                type="submit"
                                onClick={() => handleSetReflectionFilter(7)}
                                style={{
                                    padding: "10px 10px",
                                    width: "160px",
                                    borderRadius: "999px",
                                    border: "1px solid rgba(255,255,255,0.14)",
                                    background: "rgba(255,255,255,0.06)",
                                    color: "white",
                                    fontSize: "1rem",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                }}
                            >
                                last 7 days
                            </button>
                            <button
                                type="submit"
                                onClick={() => handleSetReflectionFilter(14)}
                                style={{
                                    padding: "10px 10px",
                                    width: "160px",
                                    borderRadius: "999px",
                                    border: "1px solid rgba(255,255,255,0.14)",
                                    background: "rgba(255,255,255,0.06)",
                                    color: "white",
                                    fontSize: "1rem",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                }}
                            >
                                last 14 days
                            </button>
                            <button
                                type="submit"
                                onClick={() => handleSetReflectionFilter(30)}
                                style={{
                                    padding: "10px 10px",
                                    width: "160px",
                                    borderRadius: "999px",
                                    border: "1px solid rgba(255,255,255,0.14)",
                                    background: "rgba(255,255,255,0.06)",
                                    color: "white",
                                    fontSize: "1rem",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                }}
                            >
                                last 30 days
                            </button>
                            {/* <button onClick={() => handleSetReflectionFilter('all')}>All Reflections</button> */}
                            {/* <button onClick={() => handleSetReflectionFilter(7)}>last 7 days</button> */}
                            {/* <button onClick={() => handleSetReflectionFilter(14)}>last 14 days</button> */}
                            {/* <button onClick={() => handleSetReflectionFilter(30)}>last 30 days</button> */}
                        </div>
                        <div className="container-reflection-cards">
                            {filteredReflectList && filteredReflectList.map((reflection, idx) => (
                                <div key={idx} className={selectedReflection === reflection ? 'open-reflection-card' : "closed-reflection-card"}>
                                    <h3 className="reflections-date-title" onClick={() => handleReflectionClick(reflection)}>{formatDate(reflection.date)}</h3>
                                    {selectedReflection === reflection ? <SelectedReflection reflection={reflection} /> : ''}
                                    <div>
                                        <button onClick={() => handleDeleteReflection(reflection.id)} className="delete-reflection">Delete Reflection</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UsersReflections;
