import { create } from "zustand";
import { persist } from "zustand/middleware";

// ────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────
export type Service = {
  id: string;
  name: string;
  category: string;
  active: boolean;
};

export type GalleryItem = {
  id: string;
  url: string;
  title: string;
  type: "banner" | "portfolio";
};

export type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  project: string;
  status: "new" | "contacted" | "follow-up" | "closed";
  createdAt: string;
};

export type ContactDetails = {
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string;
  address: string;
};

export type SiteContent = {
  heroHeadline: string;
  heroSubtitle: string;
  aboutText: string[];
  tagline: string;
  clients: string[];
};

// ────────────────────────────────────────────────────────────────
// Default Data
// ────────────────────────────────────────────────────────────────
const DEFAULT_SERVICES: Service[] = [
  { id: "1", name: "Stationery Works", category: "Print", active: true },
  { id: "2", name: "Business Card", category: "Print", active: true },
  { id: "3", name: "Rough Pad", category: "Print", active: true },
  { id: "4", name: "Acrylic Board", category: "Signage", active: true },
  { id: "5", name: "Catalogue", category: "Print", active: true },
  { id: "6", name: "Review Card", category: "Print", active: true },
  { id: "7", name: "Doctor File", category: "Print", active: true },
  { id: "8", name: "Hoarding", category: "Signage", active: true },
  { id: "9", name: "Brochure", category: "Print", active: true },
  { id: "10", name: "Label / Sticker", category: "Print", active: true },
  { id: "11", name: "Letter Head", category: "Print", active: true },
  { id: "12", name: "Banner / Eco Vinyl", category: "Signage", active: true },
  { id: "13", name: "Logo Design", category: "Design", active: true },
  { id: "14", name: "Product Packaging Box", category: "Print", active: true },
  { id: "15", name: "Flyer", category: "Print", active: true },
  { id: "16", name: "Social Media Post", category: "Design", active: true },
  { id: "17", name: "Visiting Cards", category: "Print", active: true },
  { id: "18", name: "Flex Banners", category: "Signage", active: true },
  { id: "19", name: "Offset Printing", category: "Print", active: true },
  { id: "20", name: "Digital Printing", category: "Print", active: true },
];

const DEFAULT_CONTACT: ContactDetails = {
  phone: "+91 99248 94072",
  whatsapp: "+919978802372",
  email: "info@gurugraphics.in",
  instagram: "@guru_graphics",
  address:
    "105, 1st Floor, Silverstone Arcade, B/s. Kantheriya Hanuman Temple, Causeway Road, Katargam, Surat-395004.",
};

const DEFAULT_CONTENT: SiteContent = {
  heroHeadline: "YOUR Brand's FIRST IMPRESSION STARTS HERE.",
  heroSubtitle: "All Type of Graphic Designing & Printing — Since 2014",
  aboutText: [
    "Founded in 2014, Guru Graphics has been dedicated to delivering high-quality printing and creative solutions to businesses of all sizes. What started as a small initiative has grown into a trusted name in the printing industry, known for reliability, innovation, and customer satisfaction.",
    "We specialize in digital printing, offset printing, branding materials, and customized promotional products — helping clients create a strong visual identity that stands out in today's competitive market.",
    "We combine modern technology with creative expertise to ensure every project meets the highest standards of quality. Our mission since 2014 has remained the same — to turn ideas into impactful prints that help businesses grow.",
  ],
  tagline: "You Imagine We Create",
  clients: [
    "Aksharam", "Made in Guru", "Infinity Associates", "Monkis", "Virani Textile",
    "Uranus", "VR", "Shagun", "Primora Foil", "Bharat Lubricants", "AT Cables",
    "Penguin", "IFT9", "Ananta", "Shree Enterprise", "Roopa", "Voltaic",
    "Leeva Holidays", "Ujala", "Auto Mech", "Akhand Salon", "Sukhnitam",
  ],
};

// ────────────────────────────────────────────────────────────────
// Store
// ────────────────────────────────────────────────────────────────
type State = {
  services: Service[];
  gallery: GalleryItem[];
  leads: Lead[];
  contact: ContactDetails;
  content: SiteContent;

  // Services
  setServices: (services: Service[]) => void;
  addService: (s: Omit<Service, "id">) => void;
  updateService: (id: string, s: Partial<Service>) => void;
  deleteService: (id: string) => void;

  // Gallery
  setGallery: (gallery: GalleryItem[]) => void;
  addGalleryItem: (item: Omit<GalleryItem, "id">) => void;
  deleteGalleryItem: (id: string) => void;

  // Leads
  addLead: (l: Omit<Lead, "id" | "createdAt" | "status">) => void;
  updateLeadStatus: (id: string, status: Lead["status"]) => void;
  deleteLead: (id: string) => void;

  // Contact
  setContact: (contact: ContactDetails) => void;
  updateContact: (c: Partial<ContactDetails>) => void;

  // Content
  setContent: (content: SiteContent) => void;
  updateContent: (c: Partial<SiteContent>) => void;
};

const uid = () => Math.random().toString(36).slice(2, 9);

export const useStore = create<State>()(
  persist(
    (set) => ({
      services: DEFAULT_SERVICES,
      gallery: [],
      leads: [],
      contact: DEFAULT_CONTACT,
      content: DEFAULT_CONTENT,

      // Services
      setServices: (services) => set(() => ({ services })),
      addService: (s) =>
        set((st) => ({ services: [...st.services, { ...s, id: uid() }] })),
      updateService: (id, s) =>
        set((st) => ({
          services: st.services.map((x) => (x.id === id ? { ...x, ...s } : x)),
        })),
      deleteService: (id) =>
        set((st) => ({ services: st.services.filter((x) => x.id !== id) })),

      // Gallery
      setGallery: (gallery) => set(() => ({ gallery })),
      addGalleryItem: (item) =>
        set((st) => ({ gallery: [...st.gallery, { ...item, id: uid() }] })),
      deleteGalleryItem: (id) =>
        set((st) => ({ gallery: st.gallery.filter((x) => x.id !== id) })),

      // Leads
      addLead: (l) =>
        set((st) => ({
          leads: [
            {
              ...l,
              id: uid(),
              status: "new",
              createdAt: new Date().toISOString(),
            },
            ...st.leads,
          ],
        })),
      updateLeadStatus: (id, status) =>
        set((st) => ({
          leads: st.leads.map((x) => (x.id === id ? { ...x, status } : x)),
        })),
      deleteLead: (id) =>
        set((st) => ({ leads: st.leads.filter((x) => x.id !== id) })),

      // Contact
      setContact: (contact) => set(() => ({ contact })),
      updateContact: (c) =>
        set((st) => ({ contact: { ...st.contact, ...c } })),

      // Content
      setContent: (content) => set(() => ({ content })),
      updateContent: (c) =>
        set((st) => ({ content: { ...st.content, ...c } })),
    }),
    { name: "guru-graphics-store" }
  )
);
