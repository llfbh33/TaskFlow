

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import '../Navigation/Navigation.css';

function SignupFormPage({dropDown, setDropDown, setHiddenMenu}) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

    // closes dropdown on click outside svg and clears data
    useEffect(() => {
      if (dropDown === 'signup') {
          const handleClickOutside = (event) => {
              if (!event.target.closest('#signup-dropdown-svg')) {
                  setDropDown(true);
                  setEmail('');
                  setUsername('');
                  setName('');
                  setPassword('');
                  setConfirmPassword('');
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

    // sign up user
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            return dispatch(
                sessionActions.signup({
                    email,
                    username,
                    name,
                    password
                })
            ).then(() => {
                setDropDown(true);
                setHiddenMenu(true);
                setEmail('');
                setUsername('');
                setName('');
                setPassword('');
                setConfirmPassword('');
                setErrors({});
            }).catch(async (res) => {
                  const data = await res.json();
                  if (data?.errors) {
                      setErrors(data.errors);
                }
            });
        }
        return setErrors({
            confirmPassword: "Confirm Password field must be the same as the Password field"
        });
    };

  return (
      <div xmlns="http://www.w3.org/1999/xhtml" className="login-form">
          <h2>Sign Up</h2>
          <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email ? <p className='errors'>{errors.email}</p> : <p className='no-errors'>No Errors</p>}
          <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username ? <p className='errors'>{errors.username}</p> : <p className='no-errors'>No Errors</p>}
          <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              />
          {errors.name ? <p className='errors'>{errors.name}</p> : <p className='no-errors'>No Errors</p>}
          <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password ? <p className='errors'>{errors.password}</p> : <p className='no-errors'>No Errors</p>}
          <input
              type="password"
              placeholder='ConfirmPassword'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword ? <p className='errors signup-btn'>{errors.confirmPassword}</p> : <p className='no-errors signup-btn'>No Errors</p>}
          <button type="submit" onClick={handleSubmit}>Sign Up</button>
      </div>
  );
}

export default SignupFormPage
