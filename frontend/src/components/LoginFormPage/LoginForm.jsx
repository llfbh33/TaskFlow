import { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import './LoginForm.css'
import loadState from '../../utils/loadData';

function LoginForm({dropDown, setDropDown}) {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    // closes dropdown on click outside svg and clears data
    useEffect(() => {
      if (dropDown !== true) {
          const handleClickOutside = (event) => {
              if (!event.target.closest('#login-dropdown-svg') && !event.target.closest('#signup-dropdown-svg')) {
                  setDropDown(true);
                  setCredential('');
                  setPassword('');
                  setErrors({});
              }
          };

          // Add event listener to detect outside clicks
          document.addEventListener('mousedown', handleClickOutside);

          // Clean up the event listener on component unmount or state change
          return () => {
              document.removeEventListener('mousedown', handleClickOutside);
          };
       }
    }, [dropDown, setDropDown]);

    // Login for demo user, provides credentials / password then loads state
    const demoLogin = () => {
        dispatch(sessionActions.login({ credential: 'starter-aubrie', password: "password" }))
        .then(() => {
            loadState(dispatch);
            setDropDown(true);
        })
    }

    // signin loads state for the verified user or activates errors
    const handleSubmit = (e) => {
          e.preventDefault();
          setErrors({});
          return dispatch(sessionActions.login({ credential, password }))
          .then(() => {
              loadState(dispatch);
              setDropDown(true);
              setCredential('');
              setPassword('');
          }).catch(
              async (res) => {
                  const data = await res.json();
                  if (data?.errors) setErrors(data.errors);
              }
        );
    };

    // return login form
    return (
        <div xmlns="http://www.w3.org/1999/xhtml" className="login-form">
            <h2>Log In</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)} />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                {errors.credential ? <p className='errors'>{errors.credential}</p> : <p className='no-errors'>No Errors</p>}
                <button type="submit"onClick={handleSubmit}>Login</button>
                <button type="button" onClick={demoLogin}>Demo Login</button>
        </div>
    );
}

export default LoginForm;
