import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const UsersSearch = () => {
    const user = useSelector(state => state.session.user);
    const resources = useSelector(state => state.resources);
    const [myResources, setMyResources] = useState([]);

    useEffect(() => {
        let mine = Object.values(resources).filter(ele => ele.userId === user.id)
        setMyResources(mine);
    }, [resources])

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
}

export default UsersSearch



