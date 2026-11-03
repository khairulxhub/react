import { createBrowserRouter } from "react-router";
import App from "./App";
import UserManage from "./views/pages/user/UserManage";
import Dashboard from "./views/pages/Dashboard";
import UserCreate from "./views/pages/user/UserCreate";
import NotFound from "./views/pages/NotFound";
// import Login from "./views/pages/Auth/Login";
import UserEdit from "./views/pages/user/UserEdit";
import PostManage from "./views/pages/post/PostManage";
import PostCreate from "./views/pages/post/PostCreate";
import PostEdit from "./views/pages/post/PostEdit";
import PostDetails from "./views/pages/post/PostDetails";
import UserDetails from "./views/pages/user/UserDetails";
import ProductCreate from "./views/pages/product/productCreate";
import ProductManage from "./views/pages/product/ProductManage";
// import { loggedIn, needToLogin } from "./utils/auth";



const routes = createBrowserRouter([
    {
        path: "*",
        element: <NotFound />,
      },
      
     
  {
    
    path: "/",
    element: <App/>,
    // loader: needToLogin,
    

    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/users",
        element: <UserManage />,
      },
      
      {
        path: "/user-create",
        element: <UserCreate />,
      },
      {
        path: "/user-edit/:id",
        element: <UserEdit />,
      },
      {
        path: "/product-create",
        element: <ProductCreate />,
      },
      {
        path: "/products",
        element: <ProductManage />,
      },
      {
        path: "/user-details/:id",
        element: <UserDetails />,
      },
      
      {
        path: "/Post",
        element: <PostManage />,
      },
      {
        path: "/Post-create",
        element: <PostCreate />,
      },
      {
        path: "/Post-edit/:id",
        element: <PostEdit />,
      },
      {
        path: "/Post-details/:id",
        element: <PostDetails />,
      },
    ],
    
  },
  //  {
  //       path: "/login",
  //       element: <Login/>,
  //       loader: loggedIn,
          
        
  //     },
      {
        path : "*",
        element: <NotFound/>
      }
  
]);

export default routes