import { APIProvider } from '@vis.gl/react-google-maps';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext.tsx';
import './globals.css';
import router from './router.tsx';

const KEY = import.meta.env.VITE_REACT_GOOGLE_MAPS_API_KEY;

if (KEY === undefined) {
  throw new Error('Key google maps is undefined');
}

const rootElement = document.querySelector('#root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AuthProvider>
        <APIProvider apiKey={KEY} libraries={['places']}>
          <RouterProvider router={router} />
        </APIProvider>
      </AuthProvider>
    </React.StrictMode>,
  );
}
