import CrudPage from "../components/crud/CrudPage";
import { num } from "../utils/format";

export default function Production() {
  return (
    <CrudPage
      title="Production"
      subtitle="Daily line-wise production entry"
      collection="production"
      prefix="PRD"
      searchKeys={["id", "orderNo", "line", "stage", "date"]}
      columns={[
        { key: "date", label: "Date" },
        { key: "orderNo", label: "Order No" },
        { key: "line", label: "Line" },
        { key: "stage", label: "Stage", badge: true },
        { key: "target", label: "Target", render: (r) => num(r.target) },
        { key: "output", label: "Output", render: (r) => num(r.output) },
        {
          key: "eff",
          label: "Efficiency",
          render: (r) => {
            const e = r.target ? Math.round((r.output / r.target) * 100) : 0;
            return (
              <span className={e >= 100 ? "font-medium text-emerald-600" : "font-medium text-amber-600"}>
                {e}%
              </span>
            );
          },
        },
      ]}
      fields={[
        { name: "date", label: "Date", type: "date", required: true },
        { name: "orderNo", label: "Order No", type: "select", options: (db) => db.orders.map((o) => o.id) },
        { name: "line", label: "Line", type: "select", options: ["Line 1", "Line 2", "Line 3", "Line 4", "Line 5"] },
        { name: "stage", label: "Stage", type: "select", options: ["Cutting", "Sewing", "Finishing", "Packing"] },
        { name: "target", label: "Target (pcs)", type: "number", required: true },
        { name: "output", label: "Output (pcs)", type: "number", required: true },
      ]}
    />
  );
}
