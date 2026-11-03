import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Scissors } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@garments.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  if (user) return <Navigate to="/" replace />;

  const submit = (e) => {
    e.preventDefault();
    if (login(email, password)) navigate("/");
    else setError("Email অথবা Password ভুল হয়েছে");
  };

  const inputCls =
    "w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500";

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-6 flex flex-col items-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <Scissors size={22} />
          </div>
          <h1 className="text-xl font-bold">Garments ERP</h1>
          <p className="text-sm text-slate-500">Sign in to your account</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputCls}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputCls}
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white hover:bg-indigo-700">
            Sign In
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-slate-400">
          Demo: admin@garments.com / admin123
        </p>
      </div>
    </div>
  );
}
