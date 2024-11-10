import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import Contact from './pages/Contact.tsx';
import AdminRoot from './root/AdminRoot.tsx';
import Login from './pages/Login.tsx';
import { Toaster } from './components/ui/toaster.tsx';
import Reservations from './pages/admin/Reservations.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'contact',
        element: <Contact />,
      },
    ],
  },

  {
    path: '/admin',
    element: <AdminRoot />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },

      {
        path: 'reservations',
        element: <Reservations />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>,
);
