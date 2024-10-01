// Define public routes accessible to all users
import { Homepage } from '../pages/Homepage/Homepage';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';

const PublicRoute = [
  {
    path: '',
    element: <Homepage />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'register',
    element: <Register />,
  },
  {
    path: 'service',
    children: [
      {
        path: 'log',
        element: <div>Blog</div>,
      },
    ],
  },
  {
    path: 'about-us',
    element: <div>About Us</div>,
  },
];

export default PublicRoute;
