
import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import ManageUser from "./user/ManageUser";
import CreateUser from "./user/CreateUser";
import ShowUser from "./user/ShowUser";
import UpdateUser from "./user/UpdateUser";
// import Login from "../pages/Login";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { needAuth, notAuth } from "../utils/Auth";
import AccessDenied from "./error/access-denied";



export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/services",
        element: <h1>Services</h1>,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/users",
        element: <ManageUser />,
      },
      {
        path: "/users/create",
        element: <CreateUser />,
      },
      {
        path: "/users/:id",
        element: <ShowUser />,
      },
      {
        path: "/users/:id/update",
        element: <UpdateUser />,
      }
    ],
    loader: needAuth,

  },
  {
    path: "/login",
    element: <Login />,
    loader: notAuth
  },
  {
    path: "/register",
    element: <Register />,
    loader: notAuth
  },
  {
    path: "/access-denied",
    element: <AccessDenied />,
  },
  {
    path: "*",
    element: <h1>404 Page Not Found</h1>,
  }
  // {
  //   path: "/logout",
  //   element: <Logout />,
  // },

]);