import { ShoppingBag, Factory, Boxes, Wallet } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import StatCard from "../components/ui/StatCard";
import StatusBadge from "../components/ui/StatusBadge";
import { useData } from "../context/DataContext";
import { money, num } from "../utils/format";

export default function Dashboard() {
  const { db } = useData();
  const { orders, inventory, accounts, production } = db;

  const revenue = accounts
    .filter((a) => a.type === "Income")
    .reduce((s, a) => s + a.amount, 0);
  const inProd = orders.filter((o) => o.status === "In Production").length;
  const lowStock = inventory.filter((i) => i.stock <= i.reorder).length;

  const stats = [
    { title: "Total Orders", value: orders.length, note: "All orders", icon: ShoppingBag, color: "bg-indigo-50 text-indigo-600" },
    { title: "In Production", value: inProd, note: "Running orders", icon: Factory, color: "bg-amber-50 text-amber-600" },
    { title: "Low Stock Items", value: lowStock, note: `of ${inventory.length} items`, icon: Boxes, color: "bg-emerald-50 text-emerald-600" },
    { title: "Revenue", value: money(revenue), note: "Total income", icon: Wallet, color: "bg-rose-50 text-rose-600" },
  ];

  const byDate = {};
  production.forEach((p) => {
    if (!byDate[p.date]) byDate[p.date] = { date: p.date.slice(5), output: 0, target: 0 };
    byDate[p.date].output += p.output;
    byDate[p.date].target += p.target;
  });
  const chartData = Object.keys(byDate)
    .sort()
    .map((k) => byDate[k]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-slate-500">
          Welcome back, here is your factory overview.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.title} {...s} />
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 font-semibold">Daily Production vs Target (pcs)</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="out" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip />
              <Area type="monotone" dataKey="target" stroke="#cbd5e1" fill="none" strokeDasharray="5 5" />
              <Area type="monotone" dataKey="output" stroke="#4f46e5" strokeWidth={2} fill="url(#out)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-5">
          <h2 className="font-semibold">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-3">Order</th>
                <th className="px-5 py-3">Buyer</th>
                <th className="px-5 py-3">Style</th>
                <th className="px-5 py-3">Qty</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.slice(0, 5).map((o) => (
                <tr key={o.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3 font-medium">{o.id}</td>
                  <td className="px-5 py-3">{o.buyer}</td>
                  <td className="px-5 py-3">{o.style}</td>
                  <td className="px-5 py-3">{num(o.qty)}</td>
                  <td className="px-5 py-3">
                    <StatusBadge value={o.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
