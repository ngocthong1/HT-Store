// import { lazy } from 'react';
import Dashboard from '../pages/Dashboard/Dashboard.jsx';
import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute.jsx';

const PrivateRoute = [
  {
    path: '/admin',
    element: <ProtectedRoute />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
    ],
  },
];

export default PrivateRoute;
