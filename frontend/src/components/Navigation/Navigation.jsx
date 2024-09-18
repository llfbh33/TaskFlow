// External Imports
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// internal Imports
import * as sessionActions from '../../store/session';
// Styling
import './Navigation.css';
import { useState } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import SignupForm from '../SignupForm';


function Navigation({ isLoaded }) {
    const user = useSelector(state => state.session.user);
    const [dropDown, setDropDown] = useState(true)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Function to handle logout of user
    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout())
        navigate('/');
    };

    // if there is a user show profile button, else, login and signup
    const sessionLinks = user ? (
        <div className='login-signup-btn-container'>
            <button className='login-signup-btns'>Profile</button>
            <button
                className='login-signup-btns'
                onClick={logout}>
                Log Out
            </button>
        </div>
    ) : (
        <div className='login-signup-btn-container'>
            <button className='login-signup-btns' onClick={() => setDropDown('login') }>Login</button>
            <button className='login-signup-btns' onClick={() => setDropDown('signup') }>signup</button>
        </div>
    );

    // return sessionLinks if the layout has loaded
    return (
        <div id='navigation-bar'>  {/* navigation-bar */}
            <div>
                {isLoaded && sessionLinks}
            </div>
            <div className='login-dropdown' hidden={dropDown !== 'login'}>
                <svg id={'login-dropdown-svg'} height="450" width="500" xmlns="http://www.w3.org/2000/svg">
                    <circle r="440" cx="450" cy="0" fill="rgb(171, 232, 171)" stroke="rgb(11, 77, 11)" strokeWidth="2" />
                    <foreignObject x="160" y="10" width="370" height="400">
                        <LoginForm dropDown={dropDown} setDropDown={setDropDown} />
                    </foreignObject>
                </svg>
            </div>
            <div className='login-dropdown' hidden={dropDown !== 'signup'}>
                <svg id={'signup-dropdown-svg'} height="692" width="600" xmlns="http://www.w3.org/2000/svg">
                    <circle r="560" cx="562" cy="130" fill="rgb(171, 232, 171)" stroke="rgb(11, 77, 11)" strokeWidth="2" />
                    <foreignObject x="255" y="10" width="370" height="620">
                        <SignupForm dropDown={dropDown} setDropDown={setDropDown} />
                    </foreignObject>
                </svg>
            </div>
        </div>
    );
}

export default Navigation;
