import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import { Modal, ModalProvider } from './context/Modal';
import UsersCalendar from './components/Profile/UsersCalendar/UsersCalendar';
import UsersSearch from './components/Profile/UsersSearch/UsersSearch';
import UsersReflections from './components/Profile/UsersReflections/UsersReflections';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage/LoginPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import NotFoundPage from './components/Loading/NotFoundPage';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignUpPage /> },

      {
        element: <ProtectedRoute />,
        children: [
          { path: "/calendar", element: <UsersCalendar /> },
          { path: '/search', element: <UsersSearch /> },
          { path: "/reflections", element: <UsersReflections /> },
          // { path: "/tasks", element: <UsersTasks /> },
          // { path: "/questions", element: <UsersQuestions /> },
          // { path: "/information", element: <SiteExplination /> },
        ]
      },

      { path: '*', element: <NotFoundPage /> }
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
