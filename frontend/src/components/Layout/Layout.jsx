import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Navigation from "../Navigation";
import { Outlet } from "react-router-dom";
import * as sessionActions from '../../store/session';
import "./Layout.css";
// import * as resourceActions from "../../store/resources";
import loadState from "../../utils/loadData";


const Layout = () => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
      dispatch(sessionActions.restoreUser())
      .then(() => loadState(dispatch))
      .then(() => setIsLoaded(true))
      .catch((error) => console.log(error))
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
