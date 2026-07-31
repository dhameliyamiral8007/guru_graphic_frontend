import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Trash2, Image as ImageIcon, LayoutTemplate } from "lucide-react";
import { useStore, type GalleryItem } from "../../store/useStore";

export const Route = createFileRoute("/admin/gallery")({
  component: GalleryPage,
});

function GalleryPage() {
  const gallery = useStore((s) => s.gallery);
  const addGalleryItem = useStore((s) => s.addGalleryItem);
  const deleteGalleryItem = useStore((s) => s.deleteGalleryItem);

  const [tab, setTab] = useState<"banner" | "portfolio">("banner");
  const [title, setTitle] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const filtered = gallery.filter((g) => g.type === tab);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setPreviewUrl(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleSave = () => {
    if (!previewUrl || !title.trim()) return;
    addGalleryItem({ url: previewUrl, title: title.trim(), type: tab });
    setPreviewUrl(null);
    setTitle("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Gallery & Banners</h2>
        <p className="text-sm text-gray-500">Upload images for the website banners and portfolio gallery.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 rounded-xl bg-gray-100 p-1 w-fit">
        {(["banner", "portfolio"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              tab === t ? "bg-white shadow-sm text-brand-blue" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t === "banner" ? <LayoutTemplate className="h-4 w-4" /> : <ImageIcon className="h-4 w-4" />}
            {t === "banner" ? "Banners" : "Portfolio"}
          </button>
        ))}
      </div>

      {/* Upload Zone */}
      <div className="rounded-2xl bg-white p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-semibold text-gray-800">Upload New {tab === "banner" ? "Banner" : "Portfolio Item"}</h3>
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 text-center transition-colors ${
            dragging ? "border-brand-blue bg-brand-blue/5" : "border-gray-200 hover:border-brand-blue/50"
          }`}
        >
          {previewUrl ? (
            <img src={previewUrl} alt="preview" className="max-h-48 rounded-lg object-contain" />
          ) : (
            <>
              <Upload className="mb-3 h-10 w-10 text-gray-300" />
              <p className="text-sm text-gray-500">Drag & drop or click to upload</p>
              <p className="text-xs text-gray-400">PNG, JPG, WEBP supported</p>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 cursor-pointer opacity-0"
            onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }}
          />
        </div>

        {previewUrl && (
          <div className="flex flex-wrap gap-3">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Image title..."
              className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-blue"
            />
            <button
              onClick={handleSave}
              className="rounded-lg bg-brand-blue px-5 py-2 text-sm font-semibold text-white"
            >
              Save
            </button>
            <button
              onClick={() => setPreviewUrl(null)}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Gallery Grid */}
      <div>
        <p className="mb-3 text-sm text-gray-500">{filtered.length} item(s) uploaded</p>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 py-14 text-gray-400">
            <ImageIcon className="mb-2 h-8 w-8 opacity-40" />
            <p className="text-sm">No {tab === "banner" ? "banners" : "portfolio items"} uploaded yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            <AnimatePresence>
              {filtered.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group relative overflow-hidden rounded-xl bg-white shadow-sm"
                >
                  <img src={item.url} alt={item.title} className="aspect-video w-full object-cover" />
                  <div className="p-2">
                    <p className="truncate text-xs font-medium text-gray-700">{item.title}</p>
                  </div>
                  <button
                    onClick={() => deleteGalleryItem(item.id)}
                    className="absolute right-2 top-2 hidden rounded-lg bg-red-500 p-1 text-white group-hover:block"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
