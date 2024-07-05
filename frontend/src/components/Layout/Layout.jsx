import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Navigation from "../Navigation";
import { Outlet } from "react-router-dom";
import * as sessionActions from '../../store/session';
import "./Layout.css";
import * as resourceActions from "../../store/resources";


const Layout = () => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);


    // checks to see if a user is currently signed in and sets them to the state
    useEffect(() => {
      dispatch(sessionActions.restoreUser()).then(() => {
        dispatch(resourceActions.getResources()).then(() => {
            setIsLoaded(true)
          })
      })
    }, [dispatch]);

    return (
      <div id='main-layout-container'>
        <div>
            <Navigation isLoaded={isLoaded} />
            {isLoaded && <Outlet />}
        </div>
      </div>
    );
}


export default Layout
