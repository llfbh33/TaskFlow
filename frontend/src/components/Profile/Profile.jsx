import { useSelector } from "react-redux"
import UsersSearch from "./UsersSearch/UsersSearch";
import { useState } from "react";
import UsersTasks from "./UsersTasks/UsersTasks";
import UsersQuestions from "./UsersQuestions/UsersQuestions";
import './Profile.css'

const Profile = () => {
    const user = useSelector(state => state.session.user);
    const [tab, setTab] = useState('search');

    return (
        <div>
            <h1>{`${user.name}'s Profile`}</h1>
            <div id="profile-nav-tabs-container">
                <div onClick={() => setTab('search')} className={tab === 'search' ? "profile-tab-selected" : "profile-tab"}>Search</div>
                <div onClick={() => setTab('tasks')} className={tab === 'tasks' ? "profile-tab-selected" : "profile-tab"}>Tasks</div>
                <div onClick={() => setTab('questions')} className={tab === 'questions' ? "profile-tab-selected" : "profile-tab"}>Questions</div>
            </div>

            { tab === 'search' ? <UsersSearch />
            : tab === 'tasks' ? <UsersTasks />
            : tab === 'questions' ? <UsersQuestions />
            : '' }
        </div>
    )
}

export default Profile;
