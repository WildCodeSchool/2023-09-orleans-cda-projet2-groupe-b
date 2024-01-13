import { createBrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import PublishTrip from './pages/PublishTrip';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/publish-trip',
    element: <PublishTrip />,
  },
]);

export default router;
