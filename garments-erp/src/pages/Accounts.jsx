import CrudPage from "../components/crud/CrudPage";
import StatCard from "../components/ui/StatCard";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { money } from "../utils/format";

export default function Accounts() {
  return (
    <CrudPage
      title="Accounts"
      subtitle="Income and expense transactions"
      collection="accounts"
      prefix="ACC"
      searchKeys={["id", "description", "party", "type", "date"]}
      summary={(items) => {
        const income = items.filter((i) => i.type === "Income").reduce((s, i) => s + i.amount, 0);
        const expense = items.filter((i) => i.type === "Expense").reduce((s, i) => s + i.amount, 0);
        return (
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard title="Total Income" value={money(income)} icon={TrendingUp} color="bg-emerald-50 text-emerald-600" />
            <StatCard title="Total Expense" value={money(expense)} icon={TrendingDown} color="bg-red-50 text-red-600" />
            <StatCard title="Balance" value={money(income - expense)} icon={Wallet} color="bg-indigo-50 text-indigo-600" />
          </div>
        );
      }}
      columns={[
        { key: "date", label: "Date" },
        { key: "type", label: "Type", badge: true },
        { key: "description", label: "Description" },
        { key: "party", label: "Party" },
        {
          key: "amount",
          label: "Amount",
          render: (r) => (
            <span className={r.type === "Income" ? "font-medium text-emerald-600" : "font-medium text-red-600"}>
              {r.type === "Income" ? "+" : "-"}
              {money(r.amount)}
            </span>
          ),
        },
      ]}
      fields={[
        { name: "date", label: "Date", type: "date", required: true },
        { name: "type", label: "Type", type: "select", options: ["Income", "Expense"] },
        { name: "description", label: "Description", required: true, full: true },
        { name: "party", label: "Party" },
        { name: "amount", label: "Amount ($)", type: "number", required: true },
      ]}
    />
  );
}
