import { Outlet, createBrowserRouter } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    element: (
      <>
        <Navbar />
        <Outlet />
      </>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
]);

export default router;
