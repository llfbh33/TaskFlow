import { useState } from "react"
import { useSelector } from "react-redux";
import './LandingPage.css';
import { FaBimobject } from "react-icons/fa";


const SearchResults = (results) => {
    if (!Object.values(results).length) return <h1>No Results</h1>
    return (
        <div className='resource-search-list-container'>
            <ul>
                {Object.values(results).map(resource => (
                    // {console.log(resource, 'here')}
                    <div key={resource.id}>
                        <div  >hello</div>
                    </div>

                ))}
            </ul>
        </div>
    )
}

const LandingPage = () => {
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const allResources = useSelector(state => state.resources);
    const list = Object.values(allResources)

    const handleSearch = () => {
        setLoading(true);
        let getResults = list.filter(resource => resource.name.includes(search))
        setSearch('')
        setResults(getResults);

        console.log(results)
    };

    return (
        <div>
            <h1>Landing Page</h1>
            <h2>Search for Resources:</h2>
            <input
                type='text'
                value={search}
                onChange={(e) => setSearch(e.target.value)} >
            </input>
            <button onClick={handleSearch} >Submit</button>

            {loading && <SearchResults results={results} /> }
            <div>{Object.values(allResources)[0].name}</div>
        </div>
    )
}

export default LandingPage
