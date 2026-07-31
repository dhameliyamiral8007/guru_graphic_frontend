import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Save, RefreshCw } from "lucide-react";
import { useStore } from "../../store/useStore";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const contact = useStore((s) => s.contact);
  const updateContact = useStore((s) => s.updateContact);

  const [form, setForm] = useState({ ...contact });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateContact(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    setForm({ ...contact });
  };

  const field = (label: string, key: keyof typeof form, placeholder?: string) => (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
        {label}
      </label>
      <input
        value={form[key]}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10"
      />
    </div>
  );

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Contact & Settings</h2>
        <p className="text-sm text-gray-500">Update contact details shown on the website.</p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm space-y-5">
        <h3 className="text-base font-semibold text-gray-800 border-b border-gray-100 pb-3">Contact Information</h3>
        
        {field("Office Phone", "phone", "+91 99248 94072")}
        {field("WhatsApp Number", "whatsapp", "919978802372 (no + or spaces)")}
        {field("Email Address", "email", "info@gurugraphics.in")}
        {field("Instagram Handle", "instagram", "@guru_graphics")}

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
            Studio Address
          </label>
          <textarea
            value={form.address}
            onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
            rows={3}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 resize-none"
          />
        </div>

        {/* WhatsApp message preview */}
        <div className="rounded-xl bg-gray-50 border border-gray-100 p-4">
          <p className="text-xs font-semibold text-gray-500 mb-1">WhatsApp Link Preview</p>
          <p className="text-xs text-gray-600 break-all">
            https://wa.me/{form.whatsapp.replace(/\D/g, "")}?text=Hi%20Guru%20Graphics!%20I%27d%20like%20to%20get%20a%20quote.
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all ${
              saved ? "bg-brand-green" : "bg-brand-blue hover:bg-brand-blue/90"
            }`}
          >
            <Save className="h-4 w-4" />
            {saved ? "Saved!" : "Save Changes"}
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            <RefreshCw className="h-4 w-4" /> Reset
          </button>
        </div>
      </div>
    </div>
  );
}
