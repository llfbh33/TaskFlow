import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteJournal } from "../../store/journals";
import { format } from 'date-fns';
import { IoMdAdd } from "react-icons/io";
import SelectedReflection from "./SelectedReflection";
import { useModal } from "../../context/Modal";
import LoadingPage from "../Loading/LoadingPage";
import DeleteModal from "../Modals/DeleteModal";
import ListActions from "../ReusableComponents/ListActions";
import EditReflectionWrapper from "../Modals/ReflectionModals/EditReflectionWrapper"
import CreateReflectionWrapper from "../Modals/ReflectionModals/CreateReflectionWrapper";




const UsersReflections = () => {
    const reflectList = useSelector(state => state.journals);
    const [loaded, setLoaded] = useState(false);
    const [filteredReflectList, setFilteredReflectList] = useState('');
    const [selectedReflection, setSelectedReflection] = useState('')
    const dispatch = useDispatch();
    const { setModalContent, closeModal } = useModal();
    const [actionItem, setActionItem] = useState(null);

    useEffect(() => {
        const array = Object.values(reflectList)
        array.sort((a, b) => new Date(b.date) - new Date(a.date));
        setFilteredReflectList(array)
        setLoaded(true)

    }, [reflectList])

    const formatDate = (data) => {
        const newDate = new Date(data);
        return format(newDate, 'EEEE MMMM d yyyy');
    };

    const openReflectionModal = async () => {
        const modalComponent = <CreateReflectionWrapper />
        setModalContent(modalComponent)
    };



    const handleReflectionClick = (reflectionId) => {
        if (selectedReflection === Number(reflectionId)) {
            setSelectedReflection('');
        } else {
            setSelectedReflection(Number(reflectionId))
        }
    };

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
    };

    const handleEdit = (id) => {
        const reflection = Object.values(reflectList).find(one => one.id === id);
        const modalComponent = <EditReflectionWrapper reflectionId={id} editReflection={reflection} />
        setModalContent(modalComponent);
    }

    const handleDelete = (id, date) => {
        const modalComponent = <DeleteModal subject={'reflection'} name={formatDate(date)} action={deleteReflection} id={id} />
        setModalContent(modalComponent)
    };

    const deleteReflection = async (e, id) => {
        e.preventDefault()

        await dispatch(deleteJournal(id));
        closeModal();
        return;
    }



    if (!loaded) return <LoadingPage />;

    return (
        <div className="main-container">
            <div className="child-container">
                <div className="child-container-two">
                    <div className="">
                        <div className="padding-container-header" style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <h1>Reflections</h1>
                            <button className="icon-button" onClick={openReflectionModal}><IoMdAdd /></button>
                        </div>
                        <div className="padding-container" style={{
                            boxShadow:
                                "0 8px 12px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.08)"
                        }}>
                            <div style={{ display: "flex", flexDirection: "row", gap: "40px"}}>
                                <h3 >Filter Reflections by range:</h3>
                                <select
                                    id="dropdown"
                                    onChange={(e) => handleSetReflectionFilter(e.target.value)}
                                    className="custom-select"
                                >
                                    <option value="all">All Reflections</option>
                                    <option value={7}>Last 7 Days</option>
                                    <option value={14}>Last 14 Days</option>
                                    <option value={30}>Last 30 Days</option>
                                </select>
                            </div>
                        </div>

                        <div className="padding-container">
                            <div className="results-list">
                                {filteredReflectList && filteredReflectList.map((reflection) => (
                                    <div key={reflection.id} style={{ display: "flex", flexDirection: "column" }}>
                                        <div className="result-item">
                                            <p className="result-link" style={{ width: "100%" }} onClick={() => handleReflectionClick(reflection.id)}>{formatDate(reflection.date)}</p>
                                            <ListActions id={reflection.id} name={reflection.date} actionItem={actionItem} setActionItem={setActionItem} handleEdit={handleEdit} handleDelete={handleDelete} />
                                        </div>
                                        <div
                                            className={`selected-reflection-wrapper ${selectedReflection === reflection.id ? "open" : ""
                                                }`}
                                        >
                                            <SelectedReflection reflection={reflection} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default UsersReflections;
