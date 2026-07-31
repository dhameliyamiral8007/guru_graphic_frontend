import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Trash2, PhoneCall, Clock, CheckCircle, AlertCircle, ChevronDown } from "lucide-react";
import { useStore, type Lead } from "../../store/useStore";

export const Route = createFileRoute("/admin/leads")({
  component: LeadsPage,
});

const STATUS_OPTIONS: Lead["status"][] = ["new", "contacted", "follow-up", "closed"];

const STATUS_CONFIG = {
  new: { label: "New", icon: AlertCircle, color: "text-blue-600", bg: "bg-blue-50 text-blue-600" },
  contacted: { label: "Contacted", icon: PhoneCall, color: "text-yellow-600", bg: "bg-yellow-50 text-yellow-700" },
  "follow-up": { label: "Follow-up", icon: Clock, color: "text-orange-500", bg: "bg-orange-50 text-orange-600" },
  closed: { label: "Closed", icon: CheckCircle, color: "text-green-600", bg: "bg-green-50 text-green-600" },
};

function LeadsPage() {
  const leads = useStore((s) => s.leads);
  const updateLeadStatus = useStore((s) => s.updateLeadStatus);
  const deleteLead = useStore((s) => s.deleteLead);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<Lead["status"] | "all">("all");

  const filtered = leads.filter((l) => {
    const matchSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search) ||
      l.service.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || l.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Leads & CRM</h2>
        <p className="text-sm text-gray-500">
          {leads.length} total inquiries — manage follow-ups and track status.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, phone, service..."
            className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm outline-none focus:border-brand-blue"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(["all", ...STATUS_OPTIONS] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition-all ${
                filterStatus === s
                  ? "bg-brand-blue text-white shadow-sm"
                  : "bg-white text-gray-500 border border-gray-200 hover:border-brand-blue/50"
              }`}
            >
              {s === "all" ? "All" : STATUS_CONFIG[s].label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 py-14 text-gray-400">
          <AlertCircle className="mb-2 h-8 w-8 opacity-40" />
          <p className="text-sm">No leads found.</p>
          <p className="text-xs">Fill the contact form on the website to generate leads here.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  <th className="px-5 py-3">Customer</th>
                  <th className="px-5 py-3">Service</th>
                  <th className="px-5 py-3">Project</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((lead) => {
                  const cfg = STATUS_CONFIG[lead.status];
                  return (
                    <tr key={lead.id} className="hover:bg-gray-50/60">
                      <td className="px-5 py-3">
                        <p className="font-medium text-gray-800">{lead.name}</p>
                        <p className="text-xs text-gray-400">{lead.phone}</p>
                        {lead.email && <p className="text-xs text-gray-400">{lead.email}</p>}
                      </td>
                      <td className="px-5 py-3">
                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                          {lead.service}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <p className="max-w-xs truncate text-xs text-gray-600">{lead.project}</p>
                      </td>
                      <td className="px-5 py-3">
                        <div className="relative inline-block">
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value as Lead["status"])}
                            className={`cursor-pointer appearance-none rounded-full px-3 py-1 pr-6 text-xs font-semibold outline-none ${cfg.bg}`}
                          >
                            {STATUS_OPTIONS.map((s) => (
                              <option key={s} value={s}>
                                {STATUS_CONFIG[s].label}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 opacity-60" />
                        </div>
                      </td>
                      <td className="px-5 py-3 text-xs text-gray-400">
                        {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <a
                          href={`tel:${lead.phone.replace(/\s/g, "")}`}
                          className="mr-2 inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50"
                        >
                          <PhoneCall className="h-3 w-3" /> Call
                        </a>
                        <button
                          onClick={() => deleteLead(lead.id)}
                          className="rounded-lg p-1.5 text-gray-300 hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
