import { createBrowserRouter } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import MyInfo from './pages/MyInfo';
import MyOpinions from './pages/MyOpinions';
import MyPreferences from './pages/MyPreferences';
import Profile from './pages/Profile';
import PublishTrip from './pages/PublishTrip';
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
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/my-informations',
        element: <MyInfo />,
      },
      {
        path: '/my-opinions',
        element: <MyOpinions />,
      },
      {
        path: '/my-preferences',
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
    ],
  },
  {
    path: '/publish-trip',
    element: <PublishTrip />,
  },
]);

export default router;
