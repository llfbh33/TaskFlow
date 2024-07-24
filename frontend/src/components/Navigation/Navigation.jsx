// External Imports
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
// internal Imports
import * as sessionActions from '../../store/session';
import ProfileButton from './ProfileButton';
// Styling
import './Navigation.css';


function Navigation({ isLoaded }) {
    const user = useSelector(state => state.session.user);
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
        <div id='navigation-bar'>
            <div>
                {isLoaded && sessionLinks}
            </div>
        </div>
    );
}

export default Navigation;
