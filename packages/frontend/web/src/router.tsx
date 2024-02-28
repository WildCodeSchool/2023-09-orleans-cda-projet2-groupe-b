import { createBrowserRouter } from 'react-router-dom';

import Layout from './components/Layout';
import SearchTripDetails from './components/SearchTripDetails';
import AddACar from './pages/AddACar';
import EditCar from './pages/EditCar';
import Home from './pages/Home';
import Login from './pages/Login';
import MyCar from './pages/MyCar';
import MyInfo from './pages/MyInfo';
import MyOpinions from './pages/MyOpinions';
import MyPreferences from './pages/MyPreferences';
import Profile from './pages/Profile';
import PublishTrip from './pages/PublishTrip';
import Register from './pages/Register';
import SearchTrip from './pages/SearchTrip';

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
  {
    path: '/search-trip',
    element: <SearchTrip />,
  },
  {
    path: 'search-trip/:id',
    element: <SearchTripDetails />,
  },
  {
    path: '/publish-trip',
    element: <PublishTrip />,
  },
]);

export default router;
