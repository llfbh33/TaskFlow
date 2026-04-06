// External Imports
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
// internal Imports
import * as sessionActions from '../../store/session';
// Styling
import './Navigation.css';
import { useState, useEffect } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import SignupForm from '../SignupForm';


function Navigation({ isLoaded }) {
    const user = useSelector(state => state.session.user);
    const [dropDown, setDropDown] = useState(true);
    const [hiddenMenu, setHiddenMenu] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // currently can not close the hamburger by clicking on it

    // closes dropdown on click outside svg and clears data
    useEffect(() => {
        if (!hiddenMenu) {
            const handleClickOutside = (event) => {
                if (!event.target.closest('#menu-dropdown-svg')) {
                    setHiddenMenu(true);
                }
            };

            // Add event listener to detect outside clicks
            document.addEventListener('mousedown', handleClickOutside);

            // Clean up the event listener on component unmount or state change
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [hiddenMenu, setHiddenMenu]);

    // Function to handle logout of user
    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout())
        navigate('/');
    };

    // if there is a user show profile button, else, login and signup
    const sessionLinks = user ? (
        <div className='login-signup-btn-container'>
            {/* <button className='login-signup-btns' onClick={() => alert('Feature Coming Soon')}>Profile</button> */}
            <button
                className='login-signup-btns'
                onClick={logout}>
                Log Out
            </button>
        </div>
    ) : (
        <div className='login-signup-btn-container'>
            <button className='landing-btn-three' onClick={() => setDropDown('signup')}>Sign Up</button>
            <button className='landing-btn-two' onClick={() => setDropDown('login')}>Log In</button>
        </div>
    );

    const handleNavigate = (where) => {
        navigate(`/${where}`)
        setHiddenMenu(true);
    }

    // return sessionLinks if the layout has loaded
    return (
        <div id='navigation-bar'>  {/* navigation-bar */}

            <div className='hamburger-menu'>
                <div hidden={!user}>
                    <GiHamburgerMenu onClick={() => !hiddenMenu ? setHiddenMenu(true) : setHiddenMenu(false)} />
                </div>
                <h1 className='nav-header'>{user ? `Hello ${user.name}` : 'Tracking App'}</h1>
            </div>
            <div style={{
                zIndex: '100',
            }}>
                {isLoaded && sessionLinks}
            </div>
            <div>
                <div className={`svg-container-nav1 ${dropDown !== 'login' ? 'hide' : 'show'}`}>
                    <svg id={'login-dropdown-svg'} height="450" width="500" xmlns="http://www.w3.org/2000/svg">
                        <circle r="440" cx="450" cy="0" fill="rgb(171, 232, 171)" stroke="rgb(11, 77, 11)" strokeWidth="2" />
                        <foreignObject x="160" y="10" width="370" height="400">
                            <LoginForm dropDown={dropDown} setDropDown={setDropDown} setHiddenMenu={setHiddenMenu} />
                        </foreignObject>
                    </svg>
                </div>
                <div className={`svg-container-nav2 ${dropDown !== 'signup' ? 'hide' : 'show'}`}>
                    <svg id={'signup-dropdown-svg'} height="632" width="600" xmlns="http://www.w3.org/2000/svg">
                        <circle r="560" cx="562" cy="70" fill="rgb(171, 232, 171)" stroke="rgb(11, 77, 11)" strokeWidth="2" />
                        <foreignObject x="255" y="10" width="370" height="620">
                            <SignupForm dropDown={dropDown} setDropDown={setDropDown} setHiddenMenu={setHiddenMenu} />
                        </foreignObject>
                    </svg>
                </div>
                <div className={`svg-container-nav3 ${hiddenMenu ? 'hide' : 'show'}`} style={{ position: 'absolute', left: 0 }}>
                    <svg id={'menu-dropdown-svg'} height="452" width="352" xmlns="http://www.w3.org/2000/svg">
                        <circle r="450" cx="-100" cy="0" fill="rgb(171, 232, 171)" stroke="rgb(11, 77, 11)" strokeWidth="2" />
                        <foreignObject x="40" y="30" width="170" height="620">
                            <div className='hamburger-dropdown'>
                                <button onClick={() => handleNavigate('search')} className='hamburger-btns'>Search</button>
                                <button onClick={() => handleNavigate('calender')} className='hamburger-btns'>Calender</button>
                                <button onClick={() => handleNavigate('tasks')} className='hamburger-btns'>Unassigned Tasks</button>
                                <button onClick={() => handleNavigate('questions')} className='hamburger-btns'>Questions</button>
                                <button onClick={() => handleNavigate('reflections')} className='hamburger-btns'>Reflections</button>
                                <button onClick={() => handleNavigate('information')} className='hamburger-btns'>Information</button>
                            </div>
                        </foreignObject>
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default Navigation;
