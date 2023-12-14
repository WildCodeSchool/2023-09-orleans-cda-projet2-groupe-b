import { Navigate } from 'react-router-dom';

import { useAuth } from '@/contexts/AuthContex';

export default function Home() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to='/login' />;
  }
  return <></>;
}
