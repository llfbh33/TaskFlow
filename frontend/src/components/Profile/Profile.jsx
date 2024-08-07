import { useSelector } from "react-redux"
import UsersSearch from "./UsersSearch/UsersSearch";
import { useEffect, useState, React } from "react";
// import { ReactComponent as MyIcon } from './assets/icon.svg';
import UsersTasks from "./UsersTasks/UsersTasks";
import UsersQuestions from "./UsersQuestions/UsersQuestions";
import UsersReflections from "./UsersReflections/UsersReflections";
import UsersCalender from "./UsersCalender/UsersCalender";
import './Profile.css'
import Loading from "../Loading/Loading";

const Profile = () => {
    const user = useSelector(state => state.session.user);
    const [tab, setTab] = useState('search');

    useEffect(() => {
        setTab('search')
    }, [user]);             // changes back to search on user change so that the tab that was open before logout does not stay open after logout


    return (
        <div id="profile-full-card">
            {user ? <h1>{`${user.name}'s Profile`}</h1> : <h1>Search Resources</h1>}
            {user ? <h1>{`${user.name}'s Profile`}</h1> : <h1>Search Resources</h1>}

            <div>
                <svg height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                    <circle r="5" cx="10" cy="10" fill="pink" />
                </svg>
                <svg height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                    <circle r="6" cx="10" cy="10" fill="black" />
                </svg>
                <svg height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                    <circle r="7" cx="10" cy="10" fill="brown" />
                </svg>
                <svg height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                    <circle r="8" cx="10" cy="10" fill="purple" />
                </svg>
                <svg height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                    <circle r="9" cx="10" cy="10" fill="grey" />
                </svg>
                <svg height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                    <circle r="8" cx="10" cy="10" fill="green" />
                </svg>
                <svg height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                    <circle r="7" cx="10" cy="10" fill="yellow" />
                </svg>
                <svg height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                    <circle r="6" cx="10" cy="10" fill="red" />
                </svg>
                <svg height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                    <circle r="5" cx="10" cy="10" fill="blue" />
                </svg>
            </div>

            {/* <div> Simple SVG circle, also will work with CSS
                <svg height="100" width="100" xmlns="http://www.w3.org/2000/svg">
                    <circle r="45" cx="50" cy="50" fill="red" className="add-pointer-cursor"/>
                </svg>
            </div> */}
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


export default Profile;
