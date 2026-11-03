import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useData } from "../context/DataContext";

const defaults = {
  company: "My Garments Ltd.",
  email: "info@mygarments.com",
  phone: "+880 1700-000000",
  address: "Gazipur, Dhaka, Bangladesh",
  currency: "USD",
};

const inputCls =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500";

export default function Settings() {
  const [saved, setSaved] = useLocalStorage("gerp-settings", defaults);
  const [form, setForm] = useState(saved);
  const [msg, setMsg] = useState("");
  const { resetData } = useData();

  const submit = (e) => {
    e.preventDefault();
    setSaved(form);
    setMsg("Settings সেভ হয়েছে");
    setTimeout(() => setMsg(""), 2500);
  };

  const reset = () => {
    if (window.confirm("সব ডাটা মুছে ডেমো ডাটা আবার লোড হবে। নিশ্চিত?")) {
      resetData();
      setMsg("ডেমো ডাটা রিসেট হয়েছে");
      setTimeout(() => setMsg(""), 2500);
    }
  };

  const field = (name, label, full) => (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="mb-1 block text-xs font-medium text-slate-600">{label}</label>
      <input
        value={form[name]}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        className={inputCls}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-slate-500">Company profile and system options</p>
      </div>

      <form
        onSubmit={submit}
        className="max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h2 className="mb-4 font-semibold">Company Profile</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {field("company", "Company Name", true)}
          {field("email", "Email")}
          {field("phone", "Phone")}
          {field("address", "Address", true)}
          {field("currency", "Currency")}
        </div>
        <div className="mt-5 flex items-center gap-4">
          <button className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            Save Changes
          </button>
          {msg && <span className="text-sm text-emerald-600">{msg}</span>}
        </div>
      </form>

      <div className="max-w-2xl rounded-xl border border-red-200 bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-red-600">Danger Zone</h2>
        <p className="mt-1 text-sm text-slate-500">
          সব মডিউলের ডাটা মুছে প্রথমের ডেমো ডাটা ফেরত আনবে।
        </p>
        <button
          onClick={reset}
          className="mt-4 rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          Reset Demo Data
        </button>
      </div>
    </div>
  );
}
