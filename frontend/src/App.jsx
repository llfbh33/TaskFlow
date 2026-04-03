import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import { Modal, ModalProvider } from './context/Modal';
import UsersCalender from './components/Profile/UsersCalender/UsersCalender';
import UsersSearch from './components/Profile/UsersSearch/UsersSearch';
import UsersTasks from './components/Profile/UsersTasks/UsersTasks';
import UsersQuestions from './components/Profile/UsersQuestions/UsersQuestions';
import UsersReflections from './components/Profile/UsersReflections/UsersReflections';
import SiteExplination from './components/Profile/SiteExplination/SiteExplination';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage/LoginPage';

const router = createBrowserRouter([
  {
    element: (
        <>
            <Layout />
        </>
      ),
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/search',
        element: <UsersSearch />
      },
      {
        path: "/calender",
        element: <UsersCalender />
      },
      {
        path: "/tasks",
        element: <UsersTasks />
      },
      {
        path: "/questions",
        element: <UsersQuestions />
      },
      {
        path: "/reflections",
        element: <UsersReflections />
      },
      {
        path: "/information",
        element: <SiteExplination />
      },
      {
        path: "/login",
        element:  <LoginPage />
      }
    ]
  }
]);

// I am making changes to push up



// the App commponent provides the router Provider to the site as well as
  // the modal provider
function App() {
  return (
    <ModalProvider>
        <RouterProvider router={router} />
        <Modal />
    </ModalProvider>
  );
}

export default App;
