import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useModal } from "../../../context/Modal";
import LandingPage from "../../LandingPage";
import Loading from "../../Loading/Loading";
import AddResource from "../../Modals/ResourceModals/AddResource";

const UsersSearch = () => {
    const user = useSelector(state => state.session.user);
    const resources = useSelector(state => state.resources);
    const [myResources, setMyResources] = useState([]);
    const [results, setResults] = useState([]);
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState('initial');
    const { setModalContent } = useModal();

    useEffect(() => {
        if (user) {
            let mine = Object.values(resources).filter(ele => ele.userId === user.id)
            setMyResources(mine);
        }
    }, [resources, user]);

    const handleSearch = async () => {
        setLoading('loading');

        let getResults = search ? Object.values(resources).filter(resource => resource.name.toLowerCase().includes(search.toLowerCase())) : []

        setSearch('')
        setResults(getResults);
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

    const handleAddResource = () => {
        const modalComponent = <AddResource />
        setModalContent(modalComponent)
    }


    return (
        <div className="profile-selected-section">
            <div className="search-search-bar">
                <div className="page-title">
                    <h1>Search</h1>
                    <button className='add-pointer-cursor' onClick={handleAddResource}>Add Resource</button>
                </div>
                <input
                    type='text'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} >
                </input>
                <div className="search-submit-clear-btns">
                    <button onClick={handleSearch} >Submit</button>
                    <button onClick={clearSearch}>Clear Search</button>
                    <button onClick={allResources}>All Resources</button>
                </div>
            </div>
            {loading === 'initial' ?
                <div className="sixty-width">
                    <div>
                        {/* {Object.values(resources).map(resource => (
                            <div key={resource.id} className="resource-search-results">
                                <img src={resource.data?.image} className="link-image"/>
                                <a href={`${resource.url}`} target='_blank' rel='noreferrer'>{resource?.data ? resource.data.title : resource.name}</a>
                            </div>
                        ))} */}
                    </div>
                </div> :
            loading === 'loading' ?
                <div>

                </div> :
                <div className="sixty-width">
                    <div className="resource-links">
                        {results.length ? results.map(resource => (
                            <div key={resource.id} className="resource-search-results">
                                <img src={resource.data?.image} className="link-image"/>
                                <a href={`${resource.url}`} target='_blank' rel='noreferrer'>{resource?.data ? resource.data.title : resource.name }</a>
                            </div>
                        ))
                    : <div>No resource found associated with the provided information</div>}
                    </div>
                </div>}
        </div>
    )
}


export default UsersSearch
