import CrudPage from "../components/crud/CrudPage";

export default function Styles() {
  return (
    <CrudPage
      title="Styles"
      subtitle="Garment styles, fabric and color details"
      collection="styles"
      prefix="STY"
      searchKeys={["id", "code", "name", "category", "fabric"]}
      columns={[
        { key: "code", label: "Style Code" },
        { key: "name", label: "Style Name" },
        { key: "category", label: "Category" },
        { key: "fabric", label: "Fabric" },
        { key: "color", label: "Color" },
      ]}
      fields={[
        { name: "code", label: "Style Code", required: true },
        { name: "name", label: "Style Name", required: true },
        { name: "category", label: "Category", type: "select", options: ["T-Shirt", "Polo", "Shirt", "Pant", "Jacket", "Hoodie"] },
        { name: "color", label: "Color" },
        { name: "fabric", label: "Fabric Details", full: true },
      ]}
    />
  );
}
