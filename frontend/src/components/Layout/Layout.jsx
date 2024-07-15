// external imports
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
// internal imports
import Navigation from "../Navigation";
import * as sessionActions from '../../store/session';
import loadState from "../../utils/loadData";
// styling
import "./Layout.css";
import Loading from "../Loading/Loading";


const Layout = () => {
    const dispatch = useDispatch();                   // for activating thunk actions
    const [isLoaded, setIsLoaded] = useState(false);  // slice of state to load page

    useEffect(() => {
      dispatch(sessionActions.restoreUser())  // check for current user
      .then(() => loadState(dispatch))        // loads data
      .then(() => setIsLoaded(true))          // sets loaded to true
      .catch((error) => console.log(error))   // catches any errors
    }, [dispatch]);                           // runs on dispatch


    return (
      <div id='main-layout-container'>
          <Navigation isLoaded={isLoaded} />    {/* Nav bar takes loading value j */}
          {isLoaded ? <Outlet /> : <Loading />}
      </div>
    );
}


export default Layout
