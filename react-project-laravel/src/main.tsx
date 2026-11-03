import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import './assets/css/Custom.css'
// import App from './App.tsx'
import routes from './routes.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
)
