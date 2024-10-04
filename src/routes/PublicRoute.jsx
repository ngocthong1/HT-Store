// Define public routes accessible to all users
import { Homepage } from '../pages/Homepage/Homepage';
import Landingpage from '../pages/Landingpage/Landingpage';
import Login from '../pages/Login/Login';
import Products from '../pages/Products/Products';
import Register from '../pages/Register/Register';

const PublicRoute = [
  {
    path: '',
    element: <Homepage />,
    children: [
      {
        path: '',
        element: <Landingpage />,
      },
      {
        path: 'products',
        element: <Products />,
      },
    ],
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
