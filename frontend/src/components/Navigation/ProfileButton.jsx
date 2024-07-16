// External Imports
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
// Internal Imports
import * as sessionActions from '../../store/session';
// Styling
import './Navigation.css'



function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef(); // creates a reference to the elements in the dropdown profile button
    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");  // used to close profile menu after use

// handles click on profile button
    const toggleMenu = (e) => {
        // Keep click from bubbling up to document and triggering closeMenu
        e.stopPropagation();
        // sets value to the oposite of its current value
        setShowMenu(!showMenu);
    };


// closes profile menu if user clicks outside of menu
    useEffect(() => {
        // if the menu is already closed, return
        if (!showMenu) return;

        // if the user clicks outside of the ref elements then close profile menu
        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        // listen for a click then run the closeMenu function
        document.addEventListener('click', closeMenu);

        // include a return function to remove the listener
        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);  // only run this useEffect if there is a change in the showMenu state


// Function to handle logout of user
    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout())
        navigate('/');
    };

// Handles navigation with the profile links
    const HandlePageChange = (loc) => {
        setShowMenu(false);
        console.log(loc)
        navigate(`${loc}`);
    }

    return (
        <div>
            <button onClick={toggleMenu} className='add-pointer-cursor'><FaUserCircle /></button>
            <ul className={ulClassName} hidden={!showMenu} ref={ulRef}>
                <li className='profileButton-nav-name'>{`Hello ${user.username}`}</li>
                <li>
                    <div
                        onClick={() => HandlePageChange('/')}
                        className='profileButton-nav-link add-pointer-cursor'
                        >Search</div>
                </li>
                <li>
                    <div
                        onClick={() => HandlePageChange('/home')}
                        className='profileButton-nav-link add-pointer-cursor'
                        >{`My Information`}</div>
                </li>
                <li>
                    <div
                        onClick={() => alert('Feature coming soon - profile page to update user info')}
                        className='profileButton-nav-link add-pointer-cursor'>{`My Profile`}</div>
                </li>
                <li>
                    <button onClick={logout}>Log Out</button>
                </li>
            </ul>
        </div>
    );
}

export default ProfileButton;
