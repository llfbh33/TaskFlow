import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import Profile from './components/Profile';
import { Modal, ModalProvider } from './context/Modal';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/login',
        element: <LoginFormPage />
      },
      {
        path: "/signup",
        element: <SignupFormPage />
      },
      {
        path: '/home',
        element: <Profile />
      }
    ]
  }
]);



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
