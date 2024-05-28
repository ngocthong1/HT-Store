// Define public routes accessible to all users
import { Homepage } from '../pages/Homepage/Homepage';
import Login from '../pages/Login/Login';

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
    element: <div>register page</div>,
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
