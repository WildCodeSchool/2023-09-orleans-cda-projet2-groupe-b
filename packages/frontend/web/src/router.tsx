import { createBrowserRouter } from 'react-router-dom';

import Layout from './components/Layout';
import AddACar from './pages/AddACar';
import Home from './pages/Home';
import Login from './pages/Login';
import MyCar from './pages/MyCar';
import Register from './pages/Register';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/my-car',
        element: <MyCar />,
      },
      {
        path: '/add-car',
        element: <AddACar />,
      },
    ],
  },
]);

export default router;
