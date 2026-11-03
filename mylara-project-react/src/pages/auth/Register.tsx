import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { defaultUser, errorUser } from "../../interfaces/user";
import { api } from "../../api";

export default function Register() {
  const [user, setUsers] = useState(defaultUser);
  const[err,setErr] = useState(errorUser)
  const navigate =useNavigate();

  const handleSubmit = () => {
    console.log(user);
    api.post("register", user)
    .then (function(res){
        console.log(res.data);
      if (res.data.success) {
                    alert(res.data.success);
                    setUsers(defaultUser);
                    setErr(err);
                    navigate('/login')
                }
    })
    .catch(function(err){
        console.log(err.response.data);
        if(err.response.status === 200){
            setErr(err.response.data.errors);
        }
    }) 
  };
  return (
    <div className="w-1/3 mx-auto my-6">
      <h1 className="text-center font-bold text-2xl text-green-800 mb-4">
        Create New Account
      </h1>
      <form>
        <label>Name</label>
        <input
          type="text"
          className="w-full p-2 border border-1 focus:border-2 rounded-md border-gray-200 focus:border-green-400 focus:outline-none"
          placeholder="Name"
          value={user.name}
          onChange={(e) => setUsers({ ...user, name: e.target.value })}
        />
        <small className="text-red-500">{err.name}</small>
        <br />
        <br />
        <label>Email</label>
        <input
          type="text"
          className="w-full p-2 border border-1 focus:border-2 rounded-md border-gray-200 focus:border-green-400 focus:outline-none"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUsers({ ...user, email: e.target.value })}
        />
         <small className="text-red-500">{err.email}</small>
        <br />
        <br />
        <label>Password</label>
        <input
          type="password"
          className="w-full p-2 border border-1 focus:border-2 rounded-md border-gray-200 focus:border-green-400 focus:outline-none"
          placeholder="*********"  
          value={user.password}
          onChange={(e) => setUsers({ ...user, password: e.target.value })}        
        />
         <small className="text-red-500">{err.password}</small>
        <br />
        <br />
        <label>Confirm Password</label>
        <input
          type="password"
          className="w-full p-2 border border-1 focus:border-2 rounded-md border-gray-200 focus:border-green-400 focus:outline-none"
          placeholder="*********"          
          value={user.password_confirmation}
          onChange={(e) => setUsers({ ...user, password_confirmation: e.target.value })}
        />
         <small className="text-red-500">{err.password_confirmation}</small>
        <br />
        <br />
        {/* <button className="bg-[#790D16] border-3 rounded-md border-emerald-700 text-gray-50 py-2 px-4 hover:bg-emerald-900 hover:border-5 duration-300" onClick={handleSubmit} type="button">Submit</button> */}
        <div className="text-center">
          <button
            className="bg-emerald-600 rounded-lg text-gray-50 py-2 px-4 hover:bg-emerald-800 focus:bg-emerald-600 duration-300"
            onClick={handleSubmit}
            type="button"
          >
            Register
          </button>
        </div>
      </form>
      <div className="my-4 text-center">
        Aready have an account? &nbsp;
        <Link to="/login" className="text-green-600">Login</Link>
      </div>
    </div>
  );
}