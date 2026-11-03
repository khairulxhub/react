import { useState } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import Modal from "../ui/Modal";
import StatusBadge from "../ui/StatusBadge";
import { useData } from "../../context/DataContext";

const inputCls =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500";

export default function CrudPage({
  title,
  subtitle,
  collection,
  prefix,
  columns,
  fields,
  searchKeys,
  summary,
}) {
  const { db, setCollection } = useData();
  const items = db[collection] || [];

  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState(null); // null = closed, "new" = add
  const [form, setForm] = useState({});
  const [deleteItem, setDeleteItem] = useState(null);

  const optionsOf = (f) =>
    (typeof f.options === "function" ? f.options(db) : f.options) || [];

  const filtered = items.filter((it) =>
    searchKeys.some((k) =>
      String(it[k] ?? "").toLowerCase().includes(query.toLowerCase())
    )
  );

  const nextId = () => {
    const nums = items.map((i) => parseInt(String(i.id).split("-")[1]) || 0);
    return `${prefix}-${Math.max(1000, ...nums) + 1}`;
  };

  const openNew = () => {
    const init = {};
    fields.forEach((f) => {
      init[f.name] = f.type === "select" ? optionsOf(f)[0] ?? "" : "";
    });
    setForm(init);
    setEditingId("new");
  };

  const openEdit = (item) => {
    setForm(item);
    setEditingId(item.id);
  };

  const submit = (e) => {
    e.preventDefault();
    const clean = { ...form };
    fields.forEach((f) => {
      if (f.type === "number") clean[f.name] = Number(clean[f.name]);
    });

    if (editingId === "new") {
      setCollection(collection, [{ ...clean, id: nextId() }, ...items]);
    } else {
      setCollection(
        collection,
        items.map((i) => (i.id === editingId ? clean : i))
      );
    }
    setEditingId(null);
  };

  const confirmDelete = () => {
    setCollection(
      collection,
      items.filter((i) => i.id !== deleteItem.id)
    );
    setDeleteItem(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm text-slate-500">{subtitle}</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          <Plus size={16} /> Add New
        </button>
      </div>

      {summary && summary(items)}

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-4">
          <div className="relative max-w-xs">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${title.toLowerCase()}...`}
              className={inputCls + " pl-9"}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                {columns.map((c) => (
                  <th key={c.key} className="whitespace-nowrap px-5 py-3">
                    {c.label}
                  </th>
                ))}
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50">
                  {columns.map((c) => (
                    <td key={c.key} className="whitespace-nowrap px-5 py-3">
                      {c.render ? (
                        c.render(row)
                      ) : c.badge ? (
                        <StatusBadge value={row[c.key]} />
                      ) : (
                        row[c.key]
                      )}
                    </td>
                  ))}
                  <td className="whitespace-nowrap px-5 py-3 text-right">
                    <button
                      onClick={() => openEdit(row)}
                      className="mr-1 rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-indigo-600"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => setDeleteItem(row)}
                      className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="px-5 py-10 text-center text-slate-400"
                  >
                    কোনো ডাটা পাওয়া যায়নি
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="border-t border-slate-200 px-5 py-3 text-xs text-slate-500">
          Total {filtered.length} records
        </div>
      </div>

      {editingId && (
        <Modal
          title={editingId === "new" ? `Add ${title}` : `Edit ${title}`}
          onClose={() => setEditingId(null)}
        >
          <form onSubmit={submit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map((f) => (
                <div key={f.name} className={f.full ? "sm:col-span-2" : ""}>
                  <label className="mb-1 block text-xs font-medium text-slate-600">
                    {f.label}
                  </label>
                  {f.type === "select" ? (
                    <select
                      value={form[f.name] ?? ""}
                      onChange={(e) =>
                        setForm({ ...form, [f.name]: e.target.value })
                      }
                      className={inputCls}
                    >
                      {optionsOf(f).map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={f.type || "text"}
                      required={f.required}
                      step={f.type === "number" ? "any" : undefined}
                      value={form[f.name] ?? ""}
                      onChange={(e) =>
                        setForm({ ...form, [f.name]: e.target.value })
                      }
                      className={inputCls}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setEditingId(null)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </form>
        </Modal>
      )}

      {deleteItem && (
        <Modal title="Confirm Delete" onClose={() => setDeleteItem(null)}>
          <p className="text-sm text-slate-600">
            আপনি কি <span className="font-semibold">{deleteItem.id}</span>{" "}
            ডিলিট করতে চান? এটা আর ফেরত আনা যাবে না।
          </p>
          <div className="mt-5 flex justify-end gap-3">
            <button
              onClick={() => setDeleteItem(null)}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
