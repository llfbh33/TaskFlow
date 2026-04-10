import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../../context/Modal";
import Loading from "../../Loading/Loading";
import { MdOutlineRefresh } from "react-icons/md";
import { BsReverseListColumnsReverse } from "react-icons/bs";
import { PiUserList } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { LiaEllipsisVSolid } from "react-icons/lia";
import EditResourceWrapper from "../../Modals/ResourceModals/EditResourceWrapper";
import AddResourceWrapper from "../../Modals/ResourceModals/AddResourceWrapper";
import DeleteModal from "../../Modals/DeleteModal";


const UsersSearch = () => {
    const user = useSelector(state => state.session.user);
    const resources = useSelector(state => state.resources);
    const [myResources, setMyResources] = useState([]);
    const [results, setResults] = useState([]);
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState('initial');
    const { setModalContent, closeModal } = useModal();
    const dispatch = useDispatch();
    const resourceList = Object.values(resources);
    const recent = resourceList.slice(-10).reverse();
    const [resultType, setResultType] = useState('Most Recently Added');
    const [actionItem, setActionItem] = useState(null);

    // useEffects
    useEffect(() => {
        if (user) {
            let mine = Object.values(resources).filter(ele => ele.userId === user.id)
            setMyResources(mine);
        }
    }, [resources, user]);


    // helper functions
    const filterResources = (searchTerm) => {
        return Object.values(resources).filter(resource =>
            resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            resource.keyWords.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    // Action Functions
    const handleSearch = async (label) => {
        // console.log(label)
        setLoading('loading');
        // this is for the chart, not needed atm, does not work properly
        // setResults(filterResources(label ? label : search))
        setResults(filterResources(search))
        setLoading(false);
        setResultType('Search Results')
    };

    const clearSearch = () => {
        setLoading('initial');
        setResultType('Most Recently Added')
        setSearch('');
        setResults([]);
    }

    const allResources = async () => {
        setLoading('loading');
        let getResults = Object.values(resources)
        setSearch('')
        setResults(getResults);
        setLoading(false);
        setResultType('All Resources');
    };

    const userResources = () => {
        setResults(myResources)
        setResultType('My Resources');
    }

    const handleAddResource = () => {
        const modalComponent = <AddResourceWrapper />
        setModalContent(modalComponent);
    }

    const handleEdit = (idx) => {
        const modalComponent = <EditResourceWrapper resource={resources[idx]}  />
        setModalContent(modalComponent);
    }

    const handleDelete = (idx, name) => {
        const modalComponent = <DeleteModal subject={'resource'} name={name} action={deleteResource} id={idx} />
        setModalContent(modalComponent);
    }

    const deleteResource = async (e, id) => {
        e.preventDefault();

        alert(`resource #${id} will delete after thunk and route are made`)
        closeModal();
        return;
    }


    return (
        <div className="main-container">
            <div className="child-container">
                <div className="padding-container-header">
                    <h2 className="search-title">Search Resources</h2>
                    <div className="search-section" >
                        <div className="search-input">
                            <input
                                type='text'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)} >
                            </input>

                        </div>
                        <button className="search-submit" onClick={handleSearch} disabled={!search} >Submit</button>
                        <div className="search-actions">
                            <div className="actions-alignment">
                                <button className="icon-button" onClick={handleAddResource}><IoMdAdd /></button>
                                <button className="icon-button" onClick={allResources}><BsReverseListColumnsReverse /></button>
                                <button className="icon-button" onClick={userResources}><PiUserList /></button>
                                <button className="icon-button" onClick={clearSearch}><MdOutlineRefresh /></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{
                    borderBottom: '1px solid rgba(210, 209, 209, 0.187)',
                }}></div>


                {/* <div className="child-container flex-stretch"> */}
                <div className="padding-container flex-stretch">
                    <section className="results-section">
                        {loading === "loading" ? (
                            <div className="results-loading">
                                <Loading resources={resources} />
                            </div>
                        ) : (
                            <>
                                <div className="results-header">
                                    {loading !== "loading" &&
                                        <h3>{resultType}</h3>
                                    }
                                </div>

                                <div className="results-list">
                                    {(loading === "initial" ? recent : results).length ? (
                                        (loading === "initial" ? recent : results).map((resource) => (
                                            <div key={resource.id} className="result-item">
                                                {/* <img
                                                    src={resource.data?.image}
                                                    className="link-image"
                                                    alt=""
                                                /> */}

                                                <a
                                                    href={resource.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="result-link"
                                                >
                                                    {resource?.data ? resource.data.title : resource.name}
                                                </a>

                                                {resource?.userId === user?.id && (
                                                    <div className="action-wrapper">
                                                        <button className="icon-button" onClick={() => setActionItem(resource.id)}>
                                                            <LiaEllipsisVSolid />
                                                        </button>

                                                        {actionItem === resource.id && (
                                                            <div className="action-container" onMouseLeave={() => setActionItem(null)}>
                                                                <div className="action-menu">
                                                                    <button className="icon-button" onClick={() => handleEdit(resource.id)}><MdEdit /></button>
                                                                    <button className="icon-button" onClick={() => handleDelete(resource.id, resource.name)}><MdDelete /></button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="results-empty">
                                            No resource found associated with the provided information
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </section>
                </div>
            </div>
        </div>
    )
}


export default UsersSearch
