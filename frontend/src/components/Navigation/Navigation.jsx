// External imports
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
// internal imports
import ProfileButton from './ProfileButton';
// Styling
import './Navigation.css';


function Navigation({ isLoaded }) {
    const user = useSelector(state => state.session.user);

    // if there is a user show profile button, else, login and signup
    const sessionLinks = user ? (
        <li>
            <ProfileButton user={user} />
        </li>
    ) : (
        <>
            <li>
                <NavLink to="/login">Log In</NavLink>
            </li>
            <li>
                <NavLink to="/signup">Sign Up</NavLink>
            </li>
        </>
    );

    // return sessionLinks if the layout has loaded
    return (
        <ul>
            {isLoaded && sessionLinks}
        </ul>
    );
}

export default Navigation;
