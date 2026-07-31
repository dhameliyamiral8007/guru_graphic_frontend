import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Check, X, ToggleLeft, ToggleRight } from "lucide-react";
import { useStore, type Service } from "../../store/useStore";

export const Route = createFileRoute("/admin/services")({
  component: ServicesPage,
});

const CATEGORIES = ["Print", "Design", "Signage", "Other"];

function ServicesPage() {
  const services = useStore((s) => s.services);
  const addService = useStore((s) => s.addService);
  const updateService = useStore((s) => s.updateService);
  const deleteService = useStore((s) => s.deleteService);

  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editCat, setEditCat] = useState("");

  const [newName, setNewName] = useState("");
  const [newCat, setNewCat] = useState("Print");
  const [showAdd, setShowAdd] = useState(false);

  const startEdit = (s: Service) => {
    setEditId(s.id);
    setEditName(s.name);
    setEditCat(s.category);
  };

  const saveEdit = () => {
    if (!editId || !editName.trim()) return;
    updateService(editId, { name: editName.trim(), category: editCat });
    setEditId(null);
  };

  const handleAdd = () => {
    if (!newName.trim()) return;
    addService({ name: newName.trim(), category: newCat, active: true });
    setNewName("");
    setNewCat("Print");
    setShowAdd(false);
  };

  const activeCount = services.filter((s) => s.active).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manage Services</h2>
          <p className="text-sm text-gray-500">
            {activeCount} of {services.length} services active on website.
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 rounded-xl bg-brand-blue px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-blue/90"
        >
          <Plus className="h-4 w-4" /> Add Service
        </button>
      </div>

      {/* Add Form */}
      <AnimatePresence>
        {showAdd && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-2xl border border-brand-blue/20 bg-white p-5 shadow-sm"
          >
            <h3 className="mb-4 text-sm font-semibold text-gray-800">New Service</h3>
            <div className="flex flex-wrap gap-3">
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Service name..."
                className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-blue"
              />
              <select
                value={newCat}
                onChange={(e) => setNewCat(e.target.value)}
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-blue"
              >
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
              <button
                onClick={handleAdd}
                className="flex items-center gap-1 rounded-lg bg-brand-green px-4 py-2 text-sm font-medium text-white"
              >
                <Check className="h-4 w-4" /> Save
              </button>
              <button
                onClick={() => setShowAdd(false)}
                className="flex items-center gap-1 rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                <X className="h-4 w-4" /> Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              <th className="px-5 py-3">Service Name</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {services.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50/60">
                <td className="px-5 py-3">
                  {editId === s.id ? (
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full rounded-lg border border-brand-blue px-2 py-1 text-sm outline-none"
                      autoFocus
                    />
                  ) : (
                    <span className="font-medium text-gray-800">{s.name}</span>
                  )}
                </td>
                <td className="px-5 py-3">
                  {editId === s.id ? (
                    <select
                      value={editCat}
                      onChange={(e) => setEditCat(e.target.value)}
                      className="rounded-lg border border-brand-blue px-2 py-1 text-sm outline-none"
                    >
                      {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  ) : (
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                      {s.category}
                    </span>
                  )}
                </td>
                <td className="px-5 py-3">
                  <button
                    onClick={() => updateService(s.id, { active: !s.active })}
                    className={`flex items-center gap-1.5 text-sm font-medium ${s.active ? "text-brand-green" : "text-gray-400"}`}
                  >
                    {s.active ? <ToggleRight className="h-5 w-5" /> : <ToggleLeft className="h-5 w-5" />}
                    {s.active ? "Active" : "Hidden"}
                  </button>
                </td>
                <td className="px-5 py-3 text-right">
                  {editId === s.id ? (
                    <div className="flex justify-end gap-2">
                      <button onClick={saveEdit} className="rounded-lg bg-brand-green px-3 py-1 text-xs font-medium text-white">
                        Save
                      </button>
                      <button onClick={() => setEditId(null)} className="rounded-lg border px-3 py-1 text-xs text-gray-600">
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => startEdit(s)}
                        className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-brand-blue"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteService(s.id)}
                        className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
