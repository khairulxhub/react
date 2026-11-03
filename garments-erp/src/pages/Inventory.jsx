import CrudPage from "../components/crud/CrudPage";
import StatusBadge from "../components/ui/StatusBadge";
import { num } from "../utils/format";

export default function Inventory() {
  return (
    <CrudPage
      title="Inventory"
      subtitle="Fabric, thread, trims and packaging stock"
      collection="inventory"
      prefix="INV"
      searchKeys={["id", "item", "category", "supplier"]}
      columns={[
        { key: "id", label: "ID" },
        { key: "item", label: "Item" },
        { key: "category", label: "Category" },
        { key: "stock", label: "Stock", render: (r) => `${num(r.stock)} ${r.unit}` },
        { key: "reorder", label: "Reorder Level", render: (r) => num(r.reorder) },
        { key: "supplier", label: "Supplier" },
        {
          key: "state",
          label: "Status",
          render: (r) => (
            <StatusBadge value={r.stock <= r.reorder ? "Low Stock" : "In Stock"} />
          ),
        },
      ]}
      fields={[
        { name: "item", label: "Item Name", required: true, full: true },
        { name: "category", label: "Category", type: "select", options: ["Fabric", "Thread", "Trim", "Packaging"] },
        { name: "unit", label: "Unit", type: "select", options: ["kg", "m", "pcs", "cone"] },
        { name: "stock", label: "Current Stock", type: "number", required: true },
        { name: "reorder", label: "Reorder Level", type: "number", required: true },
        { name: "supplier", label: "Supplier", full: true },
      ]}
    />
  );
}
