import { Outlet, Link, createFileRoute, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard,
  Layers,
  Image,
  Users,
  Settings,
  FileText,
  Menu,
  X,
  ChevronRight,
  LogOut,
} from "lucide-react";
import guruLogo from "../../assets/gurulogo.png";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

const NAV_ITEMS = [
  { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Services", to: "/admin/services", icon: Layers },
  { label: "Gallery & Banners", to: "/admin/gallery", icon: Image },
  { label: "Leads & CRM", to: "/admin/leads", icon: Users },
  { label: "Content", to: "/admin/content", icon: FileText },
  { label: "Settings", to: "/admin/settings", icon: Settings },
];

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-[#f0f2f5] font-sans">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col bg-[#111827] text-white transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-16"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
          {sidebarOpen && (
            <img src={guruLogo} alt="Guru Graphics" className="h-8 w-auto brightness-0 invert" />
          )}
          <button
            onClick={() => setSidebarOpen((o) => !o)}
            className="ml-auto grid h-8 w-8 place-items-center rounded-md text-white/60 hover:bg-white/10 hover:text-white"
          >
            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 px-2 py-4 overflow-hidden">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? "bg-brand-blue text-white shadow-md shadow-brand-blue/30"
                    : "text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {sidebarOpen && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {active && <ChevronRight className="h-4 w-4" />}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/10 p-4">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/50 hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {sidebarOpen && <span>View Website</span>}
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-16"}`}>
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3 shadow-sm">
          <div>
            <h1 className="text-base font-semibold text-gray-800">Admin Panel</h1>
            <p className="text-xs text-gray-400">Guru Graphics — Content Management System</p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-brand-blue/10 px-4 py-1.5 text-sm font-medium text-brand-blue">
            <div className="h-2 w-2 rounded-full bg-brand-green animate-pulse" />
            Live
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
