import { useSelector } from "react-redux"
import UsersSearch from "./UsersSearch/UsersSearch";
import { useEffect, useState } from "react";
import UsersTasks from "./UsersTasks/UsersTasks";
import UsersQuestions from "./UsersQuestions/UsersQuestions";
import UsersReflections from "./UsersReflections/UsersReflections";
import UsersCalender from "./UsersCalender/UsersCalender";
import './Profile.css'
import Loading from "../Loading/Loading";

const Profile = () => {
    const user = useSelector(state => state.session.user);
    const [currUser, setCurrUser] = useState('');
    const [tab, setTab] = useState('search');

    useEffect(() => {
        setTab('search')
    }, [])

    useEffect(() => {
        if (user) {
            setCurrUser(user);
        }
    }, [user]);

    if (!currUser) {
        return <Loading />
    } else {
        return (
            <div id="profile-full-card">
                {user ? <h1>{`${user.name}'s Profile`}</h1> : <h1>Search Resources</h1>}
                {user ? <h1>{`${user.name}'s Profile`}</h1> : <h1>Search Resources</h1>}
                <div id="profile-nav-tabs-container">
                    <div onClick={() => setTab('search')} className={tab === 'search' ? "profile-tab-selected" : "profile-tab"}>Search</div>
                    { user && <div onClick={() => setTab('calender')} className={tab === 'calender' ? "profile-tab-selected" : "profile-tab"}>Calender</div> }
                    { user && <div onClick={() => setTab('tasks')} className={tab === 'tasks' ? "profile-tab-selected" : "profile-tab"}>Unassigned Tasks</div> }
                    { user && <div onClick={() => setTab('questions')} className={tab === 'questions' ? "profile-tab-selected" : "profile-tab"}>Questions</div> }
                    { user && <div onClick={() => setTab('reflections')} className={tab === 'reflections' ? "profile-tab-selected" : "profile-tab"}>Reflections</div> }
                </div>

                { tab === 'search' ? <UsersSearch />
                : tab === 'calender' ? <UsersCalender />
                : tab === 'tasks' ? <UsersTasks />
                : tab === 'questions' ? <UsersQuestions />
                : tab === 'reflections' ? <UsersReflections />
                : '' }
            </div>
        )
    }
}

export default Profile;
