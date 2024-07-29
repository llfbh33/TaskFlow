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
        <div id='wave'>
            <div>
                {isLoaded && sessionLinks}
            </div>
            <svg viewBox="0 0 400 150">
                <path d="M 0,40 C 100,100 200,0 400,50 L 400,00 L 0,0" fill='rgb(57, 27, 112)'></path>
            </svg>
        </div>
    );
}

export default Navigation;
