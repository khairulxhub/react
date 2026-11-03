import CrudPage from "../components/crud/CrudPage";
import { money, num } from "../utils/format";

export default function Orders() {
  return (
    <CrudPage
      title="Orders"
      subtitle="Track buyer orders from pending to shipment"
      collection="orders"
      prefix="ORD"
      searchKeys={["id", "buyer", "style", "status"]}
      columns={[
        { key: "id", label: "Order No" },
        { key: "buyer", label: "Buyer" },
        { key: "style", label: "Style" },
        { key: "qty", label: "Qty", render: (r) => num(r.qty) },
        { key: "price", label: "Price/pc", render: (r) => money(r.price) },
        { key: "total", label: "Total", render: (r) => money(r.qty * r.price) },
        { key: "deliveryDate", label: "Delivery" },
        { key: "status", label: "Status", badge: true },
      ]}
      fields={[
        { name: "buyer", label: "Buyer", type: "select", options: (db) => db.buyers.map((b) => b.name) },
        { name: "style", label: "Style", type: "select", options: (db) => db.styles.map((s) => s.name) },
        { name: "qty", label: "Quantity (pcs)", type: "number", required: true },
        { name: "price", label: "Price per pc ($)", type: "number", required: true },
        { name: "deliveryDate", label: "Delivery Date", type: "date", required: true },
        { name: "status", label: "Status", type: "select", options: ["Pending", "Cutting", "In Production", "Shipped", "Cancelled"] },
      ]}
    />
  );
}
