import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Users, Layers, MessageSquare, TrendingUp, Clock, CheckCircle, PhoneCall, AlertCircle } from "lucide-react";
import { useStore } from "../../store/useStore";

export const Route = createFileRoute("/admin/dashboard")({
  component: Dashboard,
});

function StatCard({
  label,
  value,
  icon: Icon,
  color,
  sub,
}: {
  label: string;
  value: number | string;
  icon: React.ElementType;
  color: string;
  sub?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-white p-6 shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="mt-1 text-3xl font-bold text-gray-900">{value}</p>
          {sub && <p className="mt-1 text-xs text-gray-400">{sub}</p>}
        </div>
        <div className={`rounded-xl p-3 ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
}

const STATUS_CONFIG = {
  new: { label: "New", icon: AlertCircle, color: "text-blue-500", bg: "bg-blue-50" },
  contacted: { label: "Contacted", icon: PhoneCall, color: "text-yellow-600", bg: "bg-yellow-50" },
  "follow-up": { label: "Follow-up", icon: Clock, color: "text-orange-500", bg: "bg-orange-50" },
  closed: { label: "Closed", icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
};

function Dashboard() {
  const leads = useStore((s) => s.leads);
  const services = useStore((s) => s.services);

  const newLeads = leads.filter((l) => l.status === "new").length;
  const activeServices = services.filter((s) => s.active).length;

  const recentLeads = leads.slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-sm text-gray-500">Overview of your Guru Graphics website.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Leads"
          value={leads.length}
          icon={Users}
          color="bg-brand-blue"
          sub="All inquiries received"
        />
        <StatCard
          label="New Leads"
          value={newLeads}
          icon={MessageSquare}
          color="bg-brand-magenta"
          sub="Awaiting response"
        />
        <StatCard
          label="Active Services"
          value={activeServices}
          icon={Layers}
          color="bg-brand-green"
          sub="Visible on website"
        />
        <StatCard
          label="Conversion Rate"
          value={leads.length > 0 ? `${Math.round((leads.filter(l => l.status === "closed").length / leads.length) * 100)}%` : "0%"}
          icon={TrendingUp}
          color="bg-purple-500"
          sub="Closed / Total"
        />
      </div>

      {/* Lead Breakdown */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Status Breakdown */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-base font-semibold text-gray-800">Lead Status Breakdown</h3>
          <div className="space-y-3">
            {(Object.keys(STATUS_CONFIG) as Array<keyof typeof STATUS_CONFIG>).map((status) => {
              const count = leads.filter((l) => l.status === status).length;
              const pct = leads.length > 0 ? (count / leads.length) * 100 : 0;
              const cfg = STATUS_CONFIG[status];
              const Icon = cfg.icon;
              return (
                <div key={status} className="flex items-center gap-3">
                  <div className={`rounded-lg p-2 ${cfg.bg}`}>
                    <Icon className={`h-4 w-4 ${cfg.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-700">{cfg.label}</span>
                      <span className="text-gray-400">{count}</span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-gray-100">
                      <div
                        className="h-1.5 rounded-full bg-brand-blue transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Leads */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-base font-semibold text-gray-800">Recent Inquiries</h3>
          {recentLeads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center text-gray-400">
              <MessageSquare className="mb-2 h-8 w-8 opacity-40" />
              <p className="text-sm">No inquiries yet.</p>
              <p className="text-xs">Submit the contact form on the website to see leads here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentLeads.map((lead) => {
                const cfg = STATUS_CONFIG[lead.status];
                return (
                  <div key={lead.id} className="flex items-center justify-between rounded-lg border border-gray-100 p-3">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{lead.name}</p>
                      <p className="text-xs text-gray-400">{lead.service} · {lead.phone}</p>
                    </div>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${cfg.bg} ${cfg.color}`}>
                      {cfg.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
