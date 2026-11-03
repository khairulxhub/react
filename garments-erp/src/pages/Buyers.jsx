import CrudPage from "../components/crud/CrudPage";

export default function Buyers() {
  return (
    <CrudPage
      title="Buyers"
      subtitle="Manage your buyers and contact persons"
      collection="buyers"
      prefix="BYR"
      searchKeys={["id", "name", "country", "contact"]}
      columns={[
        { key: "id", label: "ID" },
        { key: "name", label: "Buyer" },
        { key: "country", label: "Country" },
        { key: "contact", label: "Contact Person" },
        { key: "phone", label: "Phone" },
        { key: "status", label: "Status", badge: true },
      ]}
      fields={[
        { name: "name", label: "Buyer Name", required: true },
        { name: "country", label: "Country", required: true },
        { name: "contact", label: "Contact Person" },
        { name: "email", label: "Email", type: "email" },
        { name: "phone", label: "Phone" },
        { name: "status", label: "Status", type: "select", options: ["Active", "Inactive"] },
      ]}
    />
  );
}
