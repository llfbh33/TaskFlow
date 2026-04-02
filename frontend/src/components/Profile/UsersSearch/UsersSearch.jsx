import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../../context/Modal";
import LandingPage from "../../LandingPage";
import Loading from "../../Loading/Loading";
import AddResource from "../../Modals/ResourceModals/AddResource";
import EditResource from "../../Modals/ResourceModals/EditResource";
import BarChart from "../../SearchChart/BarChart";
import PanelContainer from "../ReusableComponents/PanelConteiner";
import { MdOutlineRefresh } from "react-icons/md";
import { BsReverseListColumnsReverse } from "react-icons/bs";
import { PiUserList } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";


const UsersSearch = () => {
    const user = useSelector(state => state.session.user);
    const resources = useSelector(state => state.resources);
    const [myResources, setMyResources] = useState([]);
    const [results, setResults] = useState([]);
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState('initial');
    const { setModalContent } = useModal();
    const dispatch = useDispatch();
    const resourceList = Object.values(resources);
    const recent = resourceList.slice(-10).reverse();
    console.log(recent)

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
        console.log(label)
        setLoading('loading');
        setResults(filterResources(label ? label : search))
        setLoading(false);
    };

    const clearSearch = () => {
        setLoading('initial');
        setSearch('');
        setResults([]);
    }

    const allResources = async () => {
        setLoading('loading');
        let getResults = Object.values(resources)
        setSearch('')
        setResults(getResults);
        setLoading(false);
    };

    const userResources = () => {
        setResults(myResources)
    }

    const handleAddResource = () => {
        const modalComponent = <AddResource />
        setModalContent(modalComponent)
    }

    const handleEdit = (idx) => {
        const modalComponent = <EditResource resource={resources[idx]} />
        setModalContent(modalComponent)
    }


    return (
        <div className="main-container">
            <div className="child-container">
                <div className="padding-container">
        <h2 style={{
            margin: "0px",
            marginTop: "20px",
        }}>Search Resources</h2>
                <div className="search-container-one" >
                    <div className="search-bar-one">
                        <input
                            type='text'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)} >
                        </input>
                        
                    </div>
                    <button className="search-bar-one-button" onClick={handleSearch} disabled={!search} >Submit</button>
                    <div className="search-btn-container">
                        <div className="btn-alignment">
                            <button className="icon-button" onClick={handleAddResource}><IoMdAdd /></button>
                            <button className="icon-button" onClick={allResources}><BsReverseListColumnsReverse /></button>
                            <button className="icon-button" onClick={userResources}><PiUserList /></button>
                            <button className="icon-button" onClick={clearSearch}><MdOutlineRefresh /></button>
                        </div>
                    </div>
                </div>
                </div>


                {/* <div className="child-container flex-stretch"> */}
                <div className="padding-container flex-stretch">
                    {loading === 'loading' &&
                        <div>
                            <Loading resources={resources} />
                        </div>
                    }

                    {!loading &&

                        <div className="sixty-width">
                            <div className="resource-links">
                                {results.length ? results.map(resource => (
                                    <div key={resource.id} className="resource-search-results">
                                        <img src={resource.data?.image} className="link-image" />
                                        <a href={`${resource.url}`} target='_blank' rel='noreferrer'>{resource?.data ? resource.data.title : resource.name}</a>
                                        {resource?.userId === user?.id &&
                                            <button onClick={() => handleEdit(resource.id)}>Edit</button>
                                        }
                                    </div>
                                ))
                                    : <div>No resource found associated with the provided information</div>}
                            </div>
                        </div>

                    }

                    {loading === 'initial' && (
                        <div>
                            <h3>Most Recently Added</h3>

                            {recent.map((item, i) => (
                                <div key={i}>
                                    <div key={item.id} className="item-search-results">
                                        <img src={item.data?.image} className="link-image" />
                                        <a href={`${item.url}`} target='_blank' rel='noreferrer'>{item?.data ? item.data.title : item.name}</a>
                                        {item?.userId === user?.id &&
                                            <button onClick={() => handleEdit(item.id)}>Edit</button>
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}


export default UsersSearch
