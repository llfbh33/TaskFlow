import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useModal } from "../../../context/Modal";
import LandingPage from "../../LandingPage";
import Loading from "../../Loading/Loading";
import AddResource from "../../Modals/ResourceModals/AddResource";
import SearchChart from "../../SearchChart";

const UsersSearch = () => {
    const user = useSelector(state => state.session.user);
    const resources = useSelector(state => state.resources);
    const [myResources, setMyResources] = useState([]);
    const [results, setResults] = useState([]);
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState('initial');
    const { setModalContent } = useModal();

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
           resource.name.toLowerCase().includes(searchTerm.toLowerCase()));
     };

    // action functions
    const handleSearch = async () => {
        setLoading('loading');
        setResults(filterResources(search))
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
                </div>
                <div className="search-bar">
                    <input
                        type='text'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} >
                    </input>
                    <button onClick={handleSearch} disabled={!search} >Submit</button>
                </div>

                <div className="search-submit-clear-btns">
                    <button className="standard-button" onClick={clearSearch}>Clear Search</button>
                    <button className="standard-button" onClick={allResources}>All Resources</button>
                    <button className="standard-button" onClick={handleAddResource}>Add Resource</button>
                </div>
            </div>
            {loading === 'initial' ?
                <div className="sixty-width">
                    <div className="search-chart-container">
                        <SearchChart />
                    </div>
                </div> :
            loading === 'loading' ?
                <div>
                    <Loading />
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
