import { Outlet } from 'react-router-dom';

import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className='bg-custom-background fixed min-h-screen w-full overflow-hidden bg-cover bg-no-repeat'>
      <Navbar />
      <Outlet />
    </div>
  );
}
