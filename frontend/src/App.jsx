import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import Profile from './components/Profile';
import { Modal, ModalProvider } from './context/Modal';

const router = createBrowserRouter([
  {
    element: (
        <>
            <Layout />
            {/* <Outlet /> */}
        </>
      ),
    children: [
      {
        path: '/',
        element: <Profile />
      },
      {
        path: '/login',
        element: <LoginFormPage />
      },
      {
        path: "/signup",
        element: <SignupFormPage />
      },
      // {
      //   path: '/home',
      //   element: <LandingPage />
      // }
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
