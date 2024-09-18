// External Imports
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// internal Imports
import * as sessionActions from '../../store/session';
// Styling
import './Navigation.css';
import { useState } from 'react';
import LoginFormPage from '../LoginFormPage/LoginForm';


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
                    <foreignObject x="190" y="10" width="300" height="400">
                        <LoginFormPage dropDown={dropDown} setDropDown={setDropDown}/>
                    </foreignObject>
                </svg>
            </div>
            <div className='login-dropdown' hidden={dropDown !== 'signup'}>
                <svg id={'signup-dropdown-svg'} height="540" width="550" xmlns="http://www.w3.org/2000/svg">
                    <circle r="540" cx="550" cy="0" fill="rgb(171, 232, 171)" stroke="rgb(11, 77, 11)" strokeWidth="2" />
                    <foreignObject x="240" y="10" width="300" height="420">
                        <div xmlns="http://www.w3.org/1999/xhtml" className="login-form">
                            <h2>Sign Up</h2>
                            <input type="text" placeholder="Email" />
                            <input type="text" placeholder="Username" />
                            <input type="text" placeholder="First Name" />
                            <input type="text" placeholder="Last Name" />
                            <input type="password" placeholder="Password" />
                            <button type="submit">Sign Up</button>
                        </div>
                    </foreignObject>
                </svg>
            </div>
        </div>
    );
}

export default Navigation;
