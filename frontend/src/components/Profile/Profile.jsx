import { useSelector } from "react-redux"
import UsersSearch from "./UsersSearch/UsersSearch";
import { useEffect, useState } from "react";
// import { ReactComponent as MyIcon } from './assets/icon.svg';
import UsersTasks from "./UsersTasks/UsersTasks";
import UsersQuestions from "./UsersQuestions/UsersQuestions";
import UsersReflections from "./UsersReflections/UsersReflections";
import UsersCalender from "./UsersCalender/UsersCalender";
import './Profile.css'
import SiteExplination from "./SiteExplination/SiteExplination";


const Profile = () => {
    const user = useSelector(state => state.session.user);
    const [tab, setTab] = useState('search');

    useEffect(() => {
        setTab('search')
    }, [user]);             // changes back to search on user change so that the tab that was open before logout does not stay open after logout


    return (
        <div id="profile-full-card">
            <div id="profile-nav-tabs-container">
                <div onClick={() => setTab('search')} className={tab === 'search' ? "profile-tab-selected" : "profile-tab"}>Search</div>
                { user && <div onClick={() => setTab('calender')} className={tab === 'calender' ? "profile-tab-selected" : "profile-tab"}>Calender</div> }
                { user && <div onClick={() => setTab('tasks')} className={tab === 'tasks' ? "profile-tab-selected" : "profile-tab"}>Unassigned Tasks</div> }
                { user && <div onClick={() => setTab('questions')} className={tab === 'questions' ? "profile-tab-selected" : "profile-tab"}>Questions</div> }
                { user && <div onClick={() => setTab('reflections')} className={tab === 'reflections' ? "profile-tab-selected" : "profile-tab"}>Reflections</div> }
                <div onClick={() => setTab('explination')} className={tab === 'explination' ? "profile-tab-selected" : "profile-tab"}>Information</div>
            </div>

            { tab === 'search' ? <UsersSearch />
            : tab === 'calender' ? <UsersCalender />
            : tab === 'tasks' ? <UsersTasks />
            : tab === 'questions' ? <UsersQuestions />
            : tab === 'reflections' ? <UsersReflections />
            : tab === 'explination' ? <SiteExplination />
            : '' }

        </div>
    )
}


export default Profile;
