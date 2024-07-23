import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import LandingPage from "../../LandingPage";
import Loading from "../../Loading/Loading";

const UsersSearch = () => {
    const user = useSelector(state => state.session.user);
    const resources = useSelector(state => state.resources);
    const [myResources, setMyResources] = useState([]);
    const [results, setResults] = useState([]);
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            let mine = Object.values(resources).filter(ele => ele.userId === user.id)
            setMyResources(mine);
        }
    }, [resources, user]);

    const handleSearch = async () => {
        setLoading(true);
        let getResults = Object.values(resources).filter(resource => resource.name.toLowerCase().includes(search.toLowerCase()))

        setSearch('')
        setResults(getResults);
        setLoading(false);
    };

    const clearSearch = () => {
        setLoading(false);
        setSearch('');
        setResults([]);
    }

    if (user) {
        return (
            <div className="profile-selected-section">
                <h1>My Resources</h1>
                <div>
                    {myResources.map(ele => (
                        <div key={ele.id}>
                            <a href={`${ele.url}`} target='_blank'>{ele.name}</a>
                        </div>
                    ))}
                </div>
            </div>
        )
    } else {
        return (
            <div className="profile-selected-section">
                <input
                    type='text'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} >
                </input>
                <div>
                    <button onClick={handleSearch} >Submit</button>
                    <button onClick={clearSearch}>Clear Search</button>
                </div>
                {loading && <Loading />}
                {!loading &&
                    <div>
                        <ul>
                            {results.map(resource => (
                                <div key={resource.id} className="resource-search-results">
                                    <img src={resource.data?.image} className="link-image"/>
                                    <a href={`${resource.url}`} target='_blank'>{resource?.data ? resource.data.title : resource.name}</a>
                                </div>
                            ))}
                        </ul>
                    </div>}
            </div>
        )
    }
}

export default UsersSearch
