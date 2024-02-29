import { Outlet } from 'react-router-dom';

import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className='bg-custom-background  h-full w-full overflow-scroll bg-cover'>
      <Navbar />
      <Outlet />
    </div>
  );
}
