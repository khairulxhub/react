import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { api } from "../../api";
import {  errorUser } from "../../interfaces/user";

export default function Logout() {
  const [user, setUser] = useState({email: 'b@mail.com', password: '1234'});
  const [err, setErr] = useState(errorUser);
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  const handleSubmit = () => {
    console.log(user);
    api.post("login", user)
    .then(function (res) {
      // console.log(res.data);
      if(res.data.success){
        setUser({email: 'b@mail.com', password: '1234'});
        setErr(errorUser);
        localStorage.setItem('token', res.data.token);
        navigate('/users');
      }
    })
    .catch(function (err) {
      // console.log(err.response.data);
      if(err.response.status === 422){
        setErr(err.response.data.errors);
      }else if(err.response.status === 401){
        setErr(errorUser);
        // localStorage.setItem('token', '');
        // console.log(err.response.data);
        setMsg(err.response.data.message);
      }
    })
  };

  return (
    <div className="w-1/3 mx-auto my-6">
      <h1 className="text-center font-bold text-2xl text-green-800 mb-4">
        LOGIN NOW
      </h1>
      <form>
        <label>Email</label>
        <input
          type="text"
          className="w-full p-2 border border-1 focus:border-2 rounded-md border-gray-200 focus:border-green-400 focus:outline-none"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
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
          onChange={(e) => setUser({ ...user, password: e.target.value })}       
        />
        <small className="text-red-500">{err.password}</small>
        <br />
        <br />
        {/* <button className="bg-[#790D16] border-3 rounded-md border-emerald-700 text-gray-50 py-2 px-4 hover:bg-emerald-900 hover:border-5 duration-300" onClick={handleSubmit} type="button">Submit</button> */}
        <div className="text-red-500 text-center mb-3">{msg}</div>
        <div className="text-center">
          <button
            className="bg-emerald-600 rounded-lg text-gray-50 py-2 px-4 hover:bg-emerald-800 focus:bg-emerald-600 duration-300"
            onClick={handleSubmit}
            type="button"
          >
            Login
          </button>
        </div>
      </form>
      <div className="my-4 text-center">
        Don't have an account? &nbsp;
        <Link to="/register" className="text-green-600">Create new account</Link>
      </div>
    </div>
  );
}
