import { createBrowserRouter } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import MyInfo from './pages/MyInfo';
import MyOpinions from './pages/MyOpinions';
import MyPreferences from './pages/MyPreferences';
import Profil from './pages/Profil';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/profil',
        element: <Profil />,
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
    ],
  },
]);

export default router;
