import { createBrowserRouter } from 'react-router-dom';

import Layout from './components/Layout';
import AddACar from './pages/AddACar';
import EditCar from './pages/EditCar';
import Home from './pages/Home';
import Login from './pages/Login';
import MyCar from './pages/MyCar';
import MyInfo from './pages/MyInfo';
import MyOpinions from './pages/MyOpinions';
import MyPreferences from './pages/MyPreferences';
import Profile from './pages/Profile';
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
        path: '/profile/:userId',
        element: <Profile />,
      },
      {
        path: '/my-informations/:userId',
        element: <MyInfo />,
      },
      {
        path: '/my-opinions/:userId',
        element: <MyOpinions />,
      },
      {
        path: '/my-preferences/:userId',
        element: <MyPreferences />,
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
        path: '/cars',
        element: <MyCar />,
      },
      {
        path: '/cars/add',
        element: <AddACar />,
      },
      { path: '/car/edit/:id', element: <EditCar /> },
    ],
  },
]);

export default router;
