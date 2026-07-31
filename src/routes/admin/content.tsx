import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Save } from "lucide-react";
import { useStore } from "../../store/useStore";

export const Route = createFileRoute("/admin/content")({
  component: ContentPage,
});

function ContentPage() {
  const content = useStore((s) => s.content);
  const updateContent = useStore((s) => s.updateContent);

  const [heroSubtitle, setHeroSubtitle] = useState(content.heroSubtitle);
  const [tagline, setTagline] = useState(content.tagline);
  const [about0, setAbout0] = useState(content.aboutText[0]);
  const [about1, setAbout1] = useState(content.aboutText[1]);
  const [about2, setAbout2] = useState(content.aboutText[2]);
  const [clientsText, setClientsText] = useState(content.clients.join(", "));
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateContent({
      heroSubtitle,
      tagline,
      aboutText: [about0, about1, about2],
      clients: clientsText.split(",").map((c) => c.trim()).filter(Boolean),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Website Content</h2>
        <p className="text-sm text-gray-500">Edit the text content shown across the website.</p>
      </div>

      {/* Hero Section */}
      <div className="rounded-2xl bg-white p-6 shadow-sm space-y-4">
        <h3 className="text-base font-semibold text-gray-800 border-b border-gray-100 pb-3">Hero Section</h3>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
            Subtitle / Tagline under hero heading
          </label>
          <input
            value={heroSubtitle}
            onChange={(e) => setHeroSubtitle(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
            Brand Tagline ("You Imagine We Create")
          </label>
          <input
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10"
          />
        </div>
      </div>

      {/* About Section */}
      <div className="rounded-2xl bg-white p-6 shadow-sm space-y-4">
        <h3 className="text-base font-semibold text-gray-800 border-b border-gray-100 pb-3">About Us Section</h3>
        {[
          { label: "Paragraph 1", val: about0, set: setAbout0 },
          { label: "Paragraph 2", val: about1, set: setAbout1 },
          { label: "Paragraph 3", val: about2, set: setAbout2 },
        ].map(({ label, val, set }) => (
          <div key={label}>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">{label}</label>
            <textarea
              value={val}
              onChange={(e) => set(e.target.value)}
              rows={3}
              className="w-full resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10"
            />
          </div>
        ))}
      </div>

      {/* Clients */}
      <div className="rounded-2xl bg-white p-6 shadow-sm space-y-4">
        <h3 className="text-base font-semibold text-gray-800 border-b border-gray-100 pb-3">Client Names</h3>
        <p className="text-xs text-gray-400">Enter client names separated by commas. These scroll in the Clients section.</p>
        <textarea
          value={clientsText}
          onChange={(e) => setClientsText(e.target.value)}
          rows={4}
          className="w-full resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10"
        />
        <p className="text-xs text-gray-400">
          {clientsText.split(",").filter((c) => c.trim()).length} clients listed
        </p>
      </div>

      <button
        onClick={handleSave}
        className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all ${
          saved ? "bg-brand-green" : "bg-brand-blue hover:bg-brand-blue/90"
        }`}
      >
        <Save className="h-4 w-4" />
        {saved ? "Saved to Website!" : "Save All Changes"}
      </button>
    </div>
  );
}
