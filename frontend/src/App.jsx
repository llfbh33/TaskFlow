import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import { Modal, ModalProvider } from './context/Modal';
import Calendar from './components/Calendar/Calendar';
import Search from './components/Search/Search';
import Reflections from './components/Reflections/Reflections';
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
          { path: "/calendar", element: <Calendar /> },
          { path: '/search', element: <Search /> },
          { path: "/reflections", element: <Reflections /> },
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
