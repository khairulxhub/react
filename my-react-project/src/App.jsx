import { Outlet } from "react-router-dom";
import Footer from "./views/layout/Footer";
import Navbar from "./views/layout/Navbar";
import Sidebar from "./views/layout/Sidebar";
import { useEffect } from "react";
import { useNavigate } from "react-router";
// import Dashboard from "./views/pages/Dashboard";
//import UserManage from "./views/pages/user/UserManage";


function App() {

 


 

  return (
    <>
      <div className="admin-shell">
    <Sidebar />

    <div className="admin-main">
     <Navbar />
     {/* <input type="checkbox" id="myInput"/>
<label >Click me</label> */}
     {/* <Dashboard/> */}
     <Outlet />

     <Footer />
    </div>
  </div>
    </>
  );
}


export default App
