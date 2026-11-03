import { Menu, Search, Bell, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Header({ onMenuClick }) {
  const { user, logout } = useAuth();
  const initials = (user?.name || "AD").slice(0, 2).toUpperCase();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-slate-200 bg-white px-4 sm:px-6">
      <button
        onClick={onMenuClick}
        className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
      >
        <Menu size={20} />
      </button>

      <div className="relative hidden w-full max-w-md sm:block">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          placeholder="Search orders, buyers, styles..."
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-indigo-500 focus:bg-white"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <button className="relative rounded-lg p-2 hover:bg-slate-100">
          <Bell size={20} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
            {initials}
          </div>
          <div className="hidden leading-tight sm:block">
            <p className="text-sm font-semibold">{user?.name}</p>
            <p className="text-xs text-slate-500">{user?.role}</p>
          </div>
          <button
            onClick={logout}
            title="Logout"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-red-600"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
