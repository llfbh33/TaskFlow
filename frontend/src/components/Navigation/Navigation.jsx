// External Imports
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
// internal Imports
import * as sessionActions from '../../store/session';
import ProfileButton from './ProfileButton';
// Styling
import './Navigation.css';
import { useState } from 'react';


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
        <div>
            <button
                className='add-pointer-cursor'
                onClick={logout}>
                Log Out
            </button>
        </div>
    ) : (

        <div className='flexing-flex'>
            <div>
                <NavLink to="/login">Log In</NavLink>
            </div>
            <div>
                <NavLink to="/signup">Sign Up</NavLink>
            </div>
            <div>
                <NavLink to='/'>Search</NavLink>
            </div>
        </div>
    );

    // return sessionLinks if the layout has loaded
    return (
        <div id='navigation-bar'>  {/* navigation-bar */}
            {/* <svg version="1.1"
                width="100%" height="60"
                xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="red" />
                <text x="20%" y="40" fontSize="40" textAnchor="middle" fill="white">SVG On the Nav Bar</text>
                <foreignobject className="node" x="40%" y="20" width="100%" height="100">
                    <div >I'm a div inside a SVG.</div>
                </foreignobject>
            </svg> */}
            <div>
                {isLoaded && sessionLinks}

            {/* <svg viewBox="0 0 500 50">
                <path d="M 0,50 C 100,0 350,0 500,50 L 500,00 L 0,0" fill='rgb(57, 27, 112)'></path>
            </svg> */}
            </div>
            <button onClick={() => dropDown !== 'login' ? setDropDown('login') : setDropDown(true)}>Login</button>
            <div className='login-dropdown' hidden={dropDown !== 'login'}>
                <svg height="700" width="900" xmlns="http://www.w3.org/2000/svg">
                    <circle r="440" cx="850" cy="0" fill="rgb(171, 232, 171)" stroke="rgb(11, 77, 11)" stroke-width="2" />
                    <foreignObject x="590" y="10" width="300" height="400">
                        <div xmlns="http://www.w3.org/1999/xhtml" className="login-form">
                            <h2>Log In</h2>
                            <input type="text" placeholder="Username" />
                            <input type="password" placeholder="Password" />
                            <button type="submit">Login</button>
                            <button type="submit">Demo Login</button>
                        </div>
                    </foreignObject>
                </svg>
            </div>
            <button onClick={() => dropDown !== 'signup' ? setDropDown('signup') : setDropDown(true)}>signup</button>
            <div className='login-dropdown' hidden={dropDown !== 'signup'}>
                <svg height="700" width="900" xmlns="http://www.w3.org/2000/svg">
                    <circle r="540" cx="850" cy="0" fill="rgb(171, 232, 171)" stroke="rgb(11, 77, 11)" stroke-width="2" />
                    <foreignObject x="590" y="10" width="300" height="420">
                        <div xmlns="http://www.w3.org/1999/xhtml" className="login-form">
                            <h2>Sign Up</h2>
                            <input type="text" placeholder="Email" />
                            <input type="text" placeholder="Username" />
                            <input type="text" placeholder="First Name" />
                            <input type="text" placeholder="Last Name" />
                            <input type="password" placeholder="Password" />
                            <button type="submit">Login</button>

                        </div>
                    </foreignObject>
                </svg>
            </div>
        </div>
    );
}

export default Navigation;
