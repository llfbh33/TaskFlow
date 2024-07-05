import { useSelector } from "react-redux"
import UsersSearch from "./UsersSearch/UsersSearch";
import { useState } from "react";
import UsersTasks from "./UsersTasks/UsersTasks";


const Profile = () => {
    const user = useSelector(state => state.session.user);
    const [tab, setTab] = useState('search');

    return (
        <div>
            <h1>{`${user.name}'s Profile`}</h1>
            <div>
                <div onClick={() => setTab('search')}>Search</div>
                <div onClick={() => setTab('tasks')}>Tasks</div>
            </div>

            { tab === 'search' ? <UsersSearch />
            : tab === 'tasks' ? <UsersTasks />
            : ''}
        </div>
    )
}

export default Profile;
