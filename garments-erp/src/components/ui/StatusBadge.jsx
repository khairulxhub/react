const colors = {
  Pending: "bg-slate-100 text-slate-600",
  Cutting: "bg-sky-50 text-sky-700",
  "In Production": "bg-amber-50 text-amber-700",
  Shipped: "bg-emerald-50 text-emerald-700",
  Cancelled: "bg-red-50 text-red-600",
  Active: "bg-emerald-50 text-emerald-700",
  Inactive: "bg-slate-100 text-slate-600",
  Income: "bg-emerald-50 text-emerald-700",
  Expense: "bg-red-50 text-red-600",
  "In Stock": "bg-emerald-50 text-emerald-700",
  "Low Stock": "bg-red-50 text-red-600",
  Sewing: "bg-violet-50 text-violet-700",
  Finishing: "bg-indigo-50 text-indigo-700",
  Packing: "bg-teal-50 text-teal-700",
};

export default function StatusBadge({ value }) {
  const cls = colors[value] || "bg-slate-100 text-slate-600";
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${cls}`}>
      {value}
    </span>
  );
}
