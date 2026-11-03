import { Printer } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useData } from "../context/DataContext";
import { money } from "../utils/format";

const COLORS = ["#4f46e5", "#f59e0b", "#10b981", "#0ea5e9", "#ef4444", "#8b5cf6"];

export default function Reports() {
  const { db } = useData();
  const { orders, accounts } = db;

  const statusMap = {};
  orders.forEach((o) => (statusMap[o.status] = (statusMap[o.status] || 0) + 1));
  const statusData = Object.entries(statusMap).map(([name, value]) => ({ name, value }));

  const buyerMap = {};
  orders.forEach((o) => (buyerMap[o.buyer] = (buyerMap[o.buyer] || 0) + o.qty * o.price));
  const buyerData = Object.entries(buyerMap).map(([name, value]) => ({ name, value }));

  const income = accounts.filter((a) => a.type === "Income").reduce((s, a) => s + a.amount, 0);
  const expense = accounts.filter((a) => a.type === "Expense").reduce((s, a) => s + a.amount, 0);
  const financeData = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
  ];

  const orderValue = orders.reduce((s, o) => s + o.qty * o.price, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-sm text-slate-500">Business summary and analytics</p>
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50"
        >
          <Printer size={16} /> Print Report
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ["Total Order Value", money(orderValue)],
          ["Total Income", money(income)],
          ["Net Balance", money(income - expense)],
        ].map(([t, v]) => (
          <div key={t} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{t}</p>
            <p className="mt-2 text-2xl font-bold">{v}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-semibold">Orders by Status</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={95} paddingAngle={3}>
                  {statusData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-semibold">Order Value by Buyer ($)</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={buyerData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip formatter={(v) => money(v)} />
                <Bar dataKey="value" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
          <h2 className="mb-4 font-semibold">Income vs Expense ($)</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financeData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" stroke="#94a3b8" fontSize={12} />
                <YAxis type="category" dataKey="name" stroke="#94a3b8" fontSize={12} />
                <Tooltip formatter={(v) => money(v)} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                  <Cell fill="#10b981" />
                  <Cell fill="#ef4444" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
