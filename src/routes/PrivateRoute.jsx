// import { lazy } from 'react';
import Dashboard from '../pages/Dashboard/Dashboard.jsx';
import ManageCustomers from '../pages/ManageCustomers/ManageCustomers.jsx';
import OrderDetail from '../pages/ManageOrders/DetailOrders/DetailOrders.jsx';
import ManageOrders from '../pages/ManageOrders/ManageOrders.jsx';
import CreateProduct from '../pages/ManageProducts/CreateProduct/CreateProduct.jsx';
import DetailProduct from '../pages/ManageProducts/DetailProduct/DetailProduct.jsx';
import EditProduct from '../pages/ManageProducts/EditProduct/EditProduct.jsx';
import ManageProducts from '../pages/ManageProducts/ManageProducts.jsx';
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
      {
        path: 'products',
        // element: <ManageProducts />
        children: [
          {
            path: '',
            element: <ManageProducts />,
          },
          {
            path: 'create',
            element: <CreateProduct />,
          },
          {
            path: ':id',
            element: <DetailProduct />,
          },
          {
            path: 'edit/:id',
            element: <EditProduct />,
          },
        ],
      },
      {
        path: 'orders',
        // element: <ManageOrders />,
        children: [
          {
            path: '',
            element: <ManageOrders />,
          },
          {
            path: ':id',
            element: <OrderDetail />,
          },
        ],
      },
      {
        path: 'customers',
        element: <ManageCustomers />,
      },
    ],
  },
];

export default PrivateRoute;
