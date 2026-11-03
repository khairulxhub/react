import { lazy } from 'react';

import AdminLayout from 'layouts/AdminLayout';
import GuestLayout from 'layouts/GuestLayout';

const DashboardSales = lazy(() => import('../views/dashboard/DashSales/index'));
const BuyersManage = lazy(() => import('../views/pages/buyers/BuyersManage'));
const BuyersCreate = lazy(() => import('../views/pages/buyers/BuyersCreate'));
const BuyersEdit = lazy(() => import('../views/pages/buyers/BuyersEdit'));
const BuyersDetails = lazy(() => import('../views/pages/buyers/BuyersDetails'));

const OrdersCreate = lazy(() => import('../views/pages/orders/OrdersCreate'));
const OrdersEdit = lazy(() => import('../views/pages/orders/OrdersEdit'));
const OrdersDetails = lazy(() => import('../views/pages/orders/OrdersDetails'));
const OrdersManage = lazy(() => import('../views/pages/orders/OrdersManage'));

const StyleManage = lazy(() => import('../views/pages/styles/StyleManage'));
const StyleCreate = lazy(() => import('../views/pages/styles/StyleCreate'));
const StyleEdit  = lazy(() => import('../views/pages/styles/StyleEdit'));
const StyleDetails = lazy(() => import('../views/pages/styles/StyleDetails'));

const Typography = lazy(() => import('../views/ui-elements/basic/BasicTypography'));
const Color = lazy(() => import('../views/ui-elements/basic/BasicColor'));

const FeatherIcon = lazy(() => import('../views/ui-elements/icons/Feather'));
const FontAwesome = lazy(() => import('../views/ui-elements/icons/FontAwesome'));
const MaterialIcon = lazy(() => import('../views/ui-elements/icons/Material'));

const Login = lazy(() => import('../views/auth/login'));
const Register = lazy(() => import('../views/auth/register'));

const Sample = lazy(() => import('../views/sample'));

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <AdminLayout />,
      children: [
        {
          path: '/dashboard/sales',
          element: <DashboardSales />
        },
        {
          path: '/buyers/manage',
          element: <BuyersManage />
        },
        {
          path: '/buyers/create',
          element: <BuyersCreate />
        },
        {
          path: '/buyers/edit/:id',
          element: <BuyersEdit />
        },
        {
          path: '/orders/create',
          element: <OrdersCreate />
        },
        {
          path: '/orders/edit/:id',
          element: <OrdersEdit />
        },
        {
          path: '/orders/details/:id',
          element: <OrdersDetails />
        },
        {
          path: '/orders/manage',
          element: <OrdersManage />
        },
        {
          path: '/style/manage',
          element: <StyleManage />
        },
        {
          path: '/style/create',
          element: <StyleCreate />
        },
        {
          path: '/style/edit/:id',
          element: <StyleEdit />
        },
        {
          path: '/style/details/:id',
          element: <StyleDetails />
        },
        {
          path: '/typography',
          element: <Typography />
        },
        {
          path: '/color',
          element: <Color />
        },
        {
          path: '/icons/Feather',
          element: <FeatherIcon />
        },
        {
          path: '/icons/font-awesome-5',
          element: <FontAwesome />
        },
        {
          path: '/icons/material',
          element: <MaterialIcon />
        },

        {
          path: '/sample-page',
          element: <Sample />
        },
        {
          path: '*',
          element: <h1>Not Found</h1>
        }
      ]
    },
    {
      path: '/',
      element: <GuestLayout />,
      children: [
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/register',
          element: <Register />
        }
      ]
    }
  ]
};

export default MainRoutes;
