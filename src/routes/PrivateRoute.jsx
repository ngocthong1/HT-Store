// import { lazy } from 'react';
import Dashboard from '../pages/Dashboard/Dashboard.jsx';
import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute.jsx';

const PrivateRoute = [
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: 'db',
        element: <Dashboard />,
      },
    ],
  },
];

export default PrivateRoute;
