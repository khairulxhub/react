import { Link, useNavigate } from "react-router";
import { api } from "./api";


function Nav() {

  const navigate = useNavigate();
  const handleLogout = () => {
    // alert("logout confirmed");
    api.post("logout")
    // .then(function (res) {
    //   console.log(res.data);
    // })
    // .catch(function (err) {
    //   console.log(err);
    // })
    .then(res=>{
      if(res.status === 200){
        localStorage.removeItem('token');
        navigate('/login');
      }
    })
    .catch(err=>{
      console.log(err);
    })
  }
  return (
    <div>
      <div className=" text-center bg-slate-400">

        <Link to="/" className="hover:bg-blue-900 hover:border-5 duration-300 px-2 py-1 inline-block">Home</Link> |{" "}
        <Link to="/about" className="hover:bg-red-900 hover:border-5 duration-300 px-2 py-1 inline-block">About</Link> |{" "}
        <Link to="/services" className="hover:bg-yellow-900 hover:border-5 duration-300 px-2 py-1 inline-block">Services</Link> |{" "}
        <Link to="/contact" className="hover:bg-green-900 hover:border-5 duration-300 px-2 py-1 inline-block">Contact</Link> |
        <Link to="/users" className="hover:bg-green-900 hover:border-5 duration-300 px-2 py-1 inline-block">users</Link>
        <Link to="/login" className="hover:bg-green-900 hover:border-5 duration-300 px-2 py-1 inline-block">Login</Link>
        <button type="button" onClick={handleLogout} className="px-3 py-2 ms-3 rounded text-white bg-red-400 hover:bg-green-900 hover:border-5 duration-300">Logout</button>
      </div>

    </div>
  );
}

export default Nav;
