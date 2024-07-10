import { useState } from "react"
import { useSelector } from "react-redux";
import './LandingPage.css';
// import { FaBimobject } from "react-icons/fa";
import fetchOpenGraphData from "../../utils/OpenGraphData";
import Loading from "../Loading/Loading";


const SearchResults = ({results}) => {
    if (!results.length) return <h1>No Results</h1>
    return (
        <div className='resource-search-list-container'>
            <ul>
                {results.map(resource => (
                    <div key={resource.id} className="resource-search-results">
                        <img src={resource.data?.image} className="link-image"/>
                        <a href={`${resource.url}`} target='_blank'>{resource?.data ? resource.data.title : resource.name}</a>
                    </div>
                ))}
            </ul>
        </div>
    )
}

const LandingPage = () => {
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const allResources = useSelector(state => state.resources);
    const list = Object.values(allResources)

    const handleSearch = async () => {
        setLoading(true);
        let getResults = list.filter(resource => resource.name.toLowerCase().includes(search.toLowerCase()))
        for (let ele of getResults) {
            let data = await fetchOpenGraphData(ele.url);
            ele['data'] = data;
        }
        setSearch('')
        setResults(getResults);
        await setLoading(false)
    };

    const clearSearch = () => {
        setLoading(false);
        setSearch('');
        setResults([]);
    }

    return (
        <div>
            <h1>Landing Page</h1>
            <h2>Search for Resources:</h2>
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
            {!loading && <SearchResults results={results} /> }
        </div>
    )
}

export default LandingPage
