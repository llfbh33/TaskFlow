// external imports
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
// internal imports
import Navigation from "../Navigation";
import * as sessionActions from '../../store/session';
import loadState, { loadInitialData } from "../../utils/loadData";
// styling
import "./Layout.css";
import Loading from "../Loading/Loading";
import Profile from "../Profile";


const Layout = () => {
    const dispatch = useDispatch();                   // for activating thunk actions
    const [isLoaded, setIsLoaded] = useState(false);  // slice of state to load page
    const user = useSelector(state => state.session.user);

    useEffect(() => {
      dispatch(sessionActions.restoreUser())  // check for current user
      .then((result) => {
        if (!result) loadInitialData(dispatch)            // load initial resources state
        if (result) loadState(dispatch);                  // load all data for current user
      })
      .then(() => setIsLoaded(true))
      .catch((error) => console.log(error))   // catches any errors
    }, [])

    return (
      <div id='main-layout-container'>
          <Navigation isLoaded={isLoaded} />
          {isLoaded && <Outlet user={user}/>}
      </div>
    );
}


export default Layout
