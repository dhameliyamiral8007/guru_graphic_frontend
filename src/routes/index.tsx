import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";
import {
  ArrowUpRight,
  ArrowDown,
  ArrowUp,
  Phone,
  Mail,
  Camera,
  MapPin,
  MessageCircle,
  ChevronDown,
  Printer,
  PenTool,
  Palette,
  FileText,
  Image,
  Box,
  Tag,
  LayoutGrid,
  Megaphone,
  Layers,
  StickyNote,
  BookOpen,
  CreditCard,
  PanelTop,
  Share2,
  Stamp,
  Sparkles,
  MousePointer,
} from "lucide-react";
import guruLogo from "../assets/gurulogo.png";
import { useStore } from "../store/useStore";

export const Route = createFileRoute("/")(  {
  head: () => ({
    meta: [
      { title: "Guru Graphics — Graphic Design & Printing in Surat" },
      {
        name: "description",
        content:
          "Guru Graphics — a decade of premium graphic design and printing in Surat, India. Business cards, brochures, hoardings, offset & digital printing. Quality you see, trust you feel.",
      },
      { property: "og:title", content: "Guru Graphics — Graphic & Printing Studio" },
      {
        property: "og:description",
        content:
          "Premium printing & graphic design from Surat since 2014. 500+ brands trust us.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const NAV = [
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Clients", id: "clients" },
  { label: "Contact", id: "contact" },
];

/* ═══════════════════ SERVICE ICON MAP ═══════════════════ */
const SERVICE_ICONS: Record<string, React.ElementType> = {
  "Stationery Works": FileText,
  "Business Card": CreditCard,
  "Rough Pad": StickyNote,
  "Acrylic Board": PanelTop,
  "Catalogue": BookOpen,
  "Review Card": MessageCircle,
  "Doctor File": FileText,
  "Hoarding": Megaphone,
  "Brochure": BookOpen,
  "Label / Sticker": Tag,
  "Letter Head": FileText,
  "Banner / Eco Vinyl": Image,
  "Logo Design": PenTool,
  "Product Packaging Box": Box,
  "Flyer": Layers,
  "Social Media Post": Share2,
  "Visiting Cards": CreditCard,
  "Flex Banners": Image,
  "Offset Printing": Printer,
  "Digital Printing": Printer,
};

function Home() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    // Fetch data from backend
    const fetchData = async () => {
      try {
        const [contentRes, servicesRes, contactRes] = await Promise.all([
          fetch("http://localhost:4000/api/content").then((r) => r.json()),
          fetch("http://localhost:4000/api/services").then((r) => r.json()),
          fetch("http://localhost:4000/api/contact").then((r) => r.json()),
        ]);

        if (contentRes) useStore.getState().setContent(contentRes);
        if (servicesRes && Array.isArray(servicesRes)) useStore.getState().setServices(servicesRes);
        if (contactRes) useStore.getState().setContact(contactRes);
      } catch (err) {
        console.error("Failed to fetch dynamic content:", err);
      }
    };
    fetchData();

    const sections = ["home", "about", "services", "clients", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative min-h-screen">
      <ScrollProgress />
      <Header active={active} onNav={scrollTo} />
      <Hero onNav={scrollTo} />
      <About />
      <Services onNav={scrollTo} />
      <Clients />
      <Contact />
      <Footer onNav={scrollTo} />
      <BackToTop />
      <CustomCursor />
      
      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${useStore.getState().contact?.whatsapp?.replace(/\D/g, "")}?text=Hi%20Guru%20Graphics!`}
        target="_blank"
        rel="noreferrer"
        className="whatsapp-float fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 md:bottom-10 md:right-10"
        aria-label="WhatsApp Us"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}

/* ═══════════════════ SCROLL PROGRESS ═══════════════════ */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

/* ═══════════════════ HEADER ═══════════════════ */
function Header({ active, onNav }: { active: string; onNav: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-brand-paper/95 shadow-[0_1px_20px_rgba(21,19,18,0.06)] backdrop-blur-md"
          : "border-b border-transparent bg-brand-paper"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-14">
        <button
          onClick={() => onNav("home")}
          className="flex shrink-0 items-center gap-3 transition-transform hover:scale-105"
          aria-label="Home"
        >
          <Logo />
        </button>

        <div className="flex items-center gap-2 md:gap-8">
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => onNav(n.id)}
                className="group relative text-[14.5px] font-medium text-brand-ink transition-colors hover:text-brand-magenta"
              >
                <span className={active === n.id ? "text-brand-magenta" : ""}>
                  {n.label}
                </span>
                <span
                  className={`absolute inset-x-0 -bottom-1 h-[2px] origin-left bg-brand-magenta transition-transform duration-300 ${
                    active === n.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </button>
            ))}
          </nav>

          <button
            onClick={() => onNav("contact")}
            className="btn-primary hidden lg:block"
          >
            Get a quote
          </button>

          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-md border border-border lg:hidden"
            aria-label="Menu"
          >
            <div className="flex flex-col gap-1.5">
              <span className={`h-0.5 w-5 bg-brand-ink transition-all duration-300 ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`h-0.5 w-5 bg-brand-ink transition-all duration-300 ${open ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-5 bg-brand-ink transition-all duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border bg-brand-paper lg:hidden"
          >
            <div className="flex flex-col p-4">
              {NAV.map((n) => (
                <button
                  key={n.id}
                  onClick={() => {
                    onNav(n.id);
                    setOpen(false);
                  }}
                  className="border-b border-border/60 py-4 text-left text-lg font-medium text-brand-ink transition-colors hover:text-brand-magenta"
                >
                  {n.label}
                </button>
              ))}
              <button
                onClick={() => {
                  onNav("contact");
                  setOpen(false);
                }}
                className="btn-primary mt-4 py-3 text-center"
              >
                Get a quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function Logo() {
  return (
    <div className="flex items-center">
      <img src={guruLogo} alt="Guru Graphics" className="h-[48px] w-auto" />
    </div>
  );
}

/* ═══════════════════ HERO ═══════════════════ */
function Hero({ onNav }: { onNav: (id: string) => void }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative mx-auto max-w-7xl overflow-hidden px-6 pb-[90px] pt-[150px] md:px-14 bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] bg-[size:24px_24px]"
    >
      {/* Parallax floating shapes */}
      <FloatingShapes />

      {/* Registration marks */}
      <div className="regmark rm-tl absolute left-6 top-8 hidden md:block">
        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="var(--color-brand-ink)" strokeWidth="1"/><line x1="12" y1="1" x2="12" y2="23" stroke="var(--color-brand-ink)" strokeWidth="1"/><line x1="1" y1="12" x2="23" y2="12" stroke="var(--color-brand-ink)" strokeWidth="1"/></svg>
      </div>
      <div className="regmark rm-tr absolute right-6 top-8 hidden md:block">
        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="var(--color-brand-ink)" strokeWidth="1"/><line x1="12" y1="1" x2="12" y2="23" stroke="var(--color-brand-ink)" strokeWidth="1"/><line x1="1" y1="12" x2="23" y2="12" stroke="var(--color-brand-ink)" strokeWidth="1"/></svg>
      </div>
      <div className="regmark rm-bl absolute bottom-8 left-6 hidden md:block">
        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="var(--color-brand-ink)" strokeWidth="1"/><line x1="12" y1="1" x2="12" y2="23" stroke="var(--color-brand-ink)" strokeWidth="1"/><line x1="1" y1="12" x2="23" y2="12" stroke="var(--color-brand-ink)" strokeWidth="1"/></svg>
      </div>
      <div className="regmark rm-br absolute bottom-8 right-6 hidden md:block">
        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="var(--color-brand-ink)" strokeWidth="1"/><line x1="12" y1="1" x2="12" y2="23" stroke="var(--color-brand-ink)" strokeWidth="1"/><line x1="1" y1="12" x2="23" y2="12" stroke="var(--color-brand-ink)" strokeWidth="1"/></svg>
      </div>

      {/* CMYK Swatches */}
      <div className="absolute right-14 top-[150px] hidden flex-col gap-2.5 lg:flex">
        <motion.div animate={{ rotate: 4, x: 30 }} transition={{ duration: 1 }} className="swatch sw1 bg-brand-yellow text-[#5a4000]">C 0 M 20<br/>Y 100 K 0</motion.div>
        <motion.div animate={{ rotate: -3, x: 70 }} transition={{ duration: 1.2 }} className="swatch sw2 bg-brand-magenta text-[#ffd9ec]">C 5 M 100<br/>Y 30 K 0</motion.div>
        <motion.div animate={{ rotate: 6, x: 20 }} transition={{ duration: 1.4 }} className="swatch sw3 bg-brand-cyan text-[#d7f2ff]">C 100 M 5<br/>Y 0 K 5</motion.div>
        <motion.div animate={{ rotate: -5, x: 60 }} transition={{ duration: 1.6 }} className="swatch sw4 bg-brand-teal text-[#d9f0e7]">C 85 M 20<br/>Y 60 K 15</motion.div>
      </div>

      <motion.div style={{ y, opacity }}>
        <FadeUp>
          <div className="mb-[26px] flex items-center gap-2.5">
            <span className="rounded-[20px] border border-border bg-[#0078D40f] px-3 py-1.5 text-[11.5px] font-semibold tracking-[1.5px] text-brand-teal">
              SURAT, INDIA
            </span>
            <span className="text-[12.5px] tracking-[0.5px] text-[#8C94A3]">
              Studio est. 2014 — 10+ years in print
            </span>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h1 className="font-hero text-[14vw] font-bold leading-[0.95] tracking-tight md:max-w-[840px] md:text-[110px] uppercase flex flex-col items-start text-brand-ink">
            <span>YOUR</span>
            <span className="text-brand-yellow italic -mt-2">BRAND'S</span>
            <span className="-mt-2">FIRST IMPRESSION</span>
            <span className="-mt-2">STARTS HERE.</span>
          </h1>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="mt-8 mb-4 h-[1px] w-[200px] bg-brand-yellow" />
          <p className="max-w-[480px] text-[17px] leading-[1.6] text-[#5A6478]">
            All Type of Graphic Designing & Printing — Since 2014
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="mt-[38px] flex flex-wrap items-center gap-[22px]">
            <button onClick={() => onNav("contact")} className="btn-primary">
              <span>Start a project</span>
            </button>
            <button onClick={() => onNav("services")} className="btn-secondary">
              <span>See our work</span>
            </button>
          </div>
        </FadeUp>

        <FadeUp delay={0.4}>
          <div className="mt-12 h-[3px] w-12 bg-brand-cyan" />
          <div className="mt-4 text-[14px] text-[#8C94A3]">
            Trusted by <b className="font-semibold text-brand-ink">120+ local businesses</b> across Surat since 2014.
          </div>
        </FadeUp>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <div className="scroll-indicator flex flex-col items-center gap-2">
          <span className="text-[11px] font-semibold tracking-[2px] text-[#8C94A3]">SCROLL</span>
          <ArrowDown className="h-4 w-4 text-[#8C94A3]" />
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════ FLOATING SHAPES ═══════════════════ */
function FloatingShapes() {
  const shapes = useMemo(() => [
    { size: 120, x: "10%", y: "20%", color: "var(--magenta)", delay: 0 },
    { size: 80, x: "75%", y: "60%", color: "var(--cyan)", delay: 0.5 },
    { size: 60, x: "85%", y: "15%", color: "var(--yellow)", delay: 1 },
    { size: 100, x: "20%", y: "75%", color: "var(--teal)", delay: 1.5 },
    { size: 40, x: "55%", y: "40%", color: "var(--magenta)", delay: 0.8 },
  ], []);

  return (
    <>
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          className="hero-shape"
          style={{
            width: s.size,
            height: s.size,
            left: s.x,
            top: s.y,
            background: s.color,
          }}
          animate={{
            y: [0, -20, 0, 15, 0],
            x: [0, 10, 0, -8, 0],
            scale: [1, 1.1, 1, 0.95, 1],
          }}
          transition={{
            duration: 8,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

/* ═══════════════════ ABOUT ═══════════════════ */
function About() {
  const content = useStore((s) => s.content);
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-20 md:px-14">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 1 }}
        className="pointer-events-none absolute right-6 top-10 z-0 select-none font-display text-[150px] leading-none text-brand-paper2 md:text-[200px]"
      >
        2014
      </motion.div>

      <div className="relative z-10">
        <FadeUp>
          <div className="mb-4 flex items-center gap-2">
            <span className="h-[2px] w-[26px] bg-brand-cyan" />
            <span className="text-[12px] font-semibold tracking-[2px] text-brand-teal">
              OUR STORY
            </span>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h2 className="mb-10 font-display text-[48px] leading-[1.02] tracking-[-0.5px] text-brand-ink md:text-[54px]">
            Decade of<br />
            <span className="misreg">
              <span className="layer c">impact.</span>
              <span className="layer m">impact.</span>
              <span className="layer y">impact.</span>
              <span className="base">impact.</span>
            </span>
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-8 space-y-5 text-[16px] leading-[1.75] text-[#5A6478]">
              {content.aboutText.map((t, i) => (
                <FadeUp key={i} delay={0.2 + i * 0.1}>
                  <p>{t}</p>
                </FadeUp>
              ))}
            </div>

            {/* Animated Stats */}
            <div className="mt-10 flex flex-wrap gap-[14px]">
              <FadeUp delay={0.4}>
                <div className="stat-pill flex items-baseline gap-2 rounded-[40px] bg-brand-ink px-[22px] py-[14px] text-brand-paper">
                  <AnimatedCounter to={10} className="font-display text-[19px] text-brand-magenta" />
                  <span className="text-[11px] font-semibold tracking-[1.5px] text-[#B8C1D0]">YEARS</span>
                </div>
              </FadeUp>
              <FadeUp delay={0.5}>
                <div className="stat-pill flex items-baseline gap-2 rounded-[40px] bg-brand-ink px-[22px] py-[14px] text-brand-paper">
                  <AnimatedCounter to={500} className="font-display text-[19px] text-brand-cyan" />
                  <span className="text-[11px] font-semibold tracking-[1.5px] text-[#B8C1D0]">CLIENTS</span>
                </div>
              </FadeUp>
              <FadeUp delay={0.6}>
                <div className="stat-pill flex items-baseline gap-2 rounded-[40px] bg-brand-ink px-[22px] py-[14px] text-brand-paper">
                  <AnimatedCounter to={1000} className="font-display text-[19px] text-brand-yellow" />
                  <span className="text-[11px] font-semibold tracking-[1.5px] text-[#B8C1D0]">PROJECTS</span>
                </div>
              </FadeUp>
            </div>
          </div>

          {/* Quote card */}
          <FadeUp delay={0.3}>
            <div className="relative overflow-hidden rounded-[10px] bg-brand-ink px-10 py-11">
              <div
                className="absolute inset-x-0 top-0 h-[5px]"
                style={{
                  background: "linear-gradient(90deg, var(--color-brand-cyan), var(--color-brand-magenta) 50%, var(--color-brand-yellow))",
                }}
              />
              <div className="absolute bottom-5 right-5 h-5 w-5 opacity-55">
                <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="#9CA3B0" strokeWidth="1"/><line x1="12" y1="1" x2="12" y2="23" stroke="#9CA3B0" strokeWidth="1"/><line x1="1" y1="12" x2="23" y2="12" stroke="#9CA3B0" strokeWidth="1"/></svg>
              </div>
              
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: false }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="mb-2 font-italic-display text-[52px] leading-[0.6] text-brand-yellow"
              >
                &ldquo;
              </motion.div>
              <div className="mb-7 font-italic-display text-[30px] leading-[1.28] text-brand-paper">
                You imagine,<br />we create.
              </div>
              <div className="flex items-center gap-2.5">
                <div className="h-[2px] w-[22px] bg-brand-cyan" />
                <span className="text-[11.5px] font-semibold tracking-[2px] text-[#9CA3B0]">
                  GURU GRAPHICS, SURAT
                </span>
              </div>
              
              <div className="mt-5 flex gap-2">
                {["bg-brand-magenta", "bg-brand-cyan", "bg-brand-yellow", "bg-brand-teal"].map((c, i) => (
                  <motion.div
                    key={c}
                    className={`h-[26px] w-[26px] rounded-full border-2 border-brand-ink ${c}`}
                    whileHover={{ scale: 1.3, rotate: 180 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ ANIMATED COUNTER ═══════════════════ */
function AnimatedCounter({ to, className }: { to: number; className?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let rafId: number;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const start = performance.now();
          const dur = 1800;
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.floor(to * eased));
            if (p < 1) {
              rafId = requestAnimationFrame(tick);
            }
          };
          rafId = requestAnimationFrame(tick);
        } else {
          cancelAnimationFrame(rafId);
          setVal(0);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      cancelAnimationFrame(rafId);
      io.disconnect();
    };
  }, [to]);
  
  return <span ref={ref} className={className}>{val}+</span>;
}

/* ═══════════════════ SERVICES ═══════════════════ */
function Services({ onNav }: { onNav: (id: string) => void }) {
  const allServices = useStore((s) => s.services);
  const services = allServices.filter((x) => x.active);
  const [filter, setFilter] = useState("All");

  const categories = useMemo(() => {
    const cats = new Set(services.map(s => s.category));
    return ["All", ...Array.from(cats)];
  }, [services]);

  const filteredServices = useMemo(() => {
    if (filter === "All") return services;
    return services.filter(s => s.category === filter);
  }, [services, filter]);

  return (
    <section id="services" className="py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-16">
        <FadeUp>
          <div className="mb-4 flex items-center gap-2 text-[12px] font-semibold tracking-[2px] text-brand-teal">
            <span className="h-[2px] w-[26px] bg-brand-cyan" /> DO YOU NEED A PROFESSIONAL
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="font-display text-[48px] leading-[1.02] tracking-[-0.5px] text-brand-ink md:text-[54px]">
            Graphic &amp; Printing Works
          </h2>
        </FadeUp>

        {/* Category Filter Tabs */}
        <FadeUp delay={0.15}>
          <div className="mt-10 flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`category-tab ${filter === cat ? "active" : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeUp>

        {/* Service Cards Grid */}
        <motion.div
          layout
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((s, i) => {
              const IconComp = SERVICE_ICONS[s.name] || Sparkles;
              const catClass = s.category === "Print" ? "cat-print" : s.category === "Signage" ? "cat-signage" : "cat-design";
              return (
                <motion.button
                  key={s.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: (i % 8) * 0.04, duration: 0.35 }}
                  onClick={() => onNav("contact")}
                  className={`service-card ${catClass} text-left`}
                >
                  <div className="icon-wrap">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <div className="text-[16px] font-semibold text-brand-ink">
                    {s.name}
                  </div>
                  <div className="mt-1.5 text-[12px] font-medium tracking-[1px] text-[#8C94A3]">
                    {s.category.toUpperCase()}
                  </div>
                  <ArrowUpRight className="absolute right-4 top-4 h-4 w-4 text-[#B8C1D0] transition-all group-hover:text-brand-magenta" />
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <FadeUp>
          <p className="mt-14 text-center font-italic-display text-[28px] text-[#8C94A3]">
            One studio. Every print. Endless possibilities.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

/* ═══════════════════ CLIENTS ═══════════════════ */
function Clients() {
  const clients = useStore((s) => s.content.clients);
  const row1 = clients.slice(0, Math.ceil(clients.length / 2));
  const row2 = clients.slice(Math.ceil(clients.length / 2));
  return (
    <section id="clients" className="overflow-hidden py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-16">
        <FadeUp>
          <div className="mb-4 flex items-center gap-2 text-[12px] font-semibold tracking-[2px] text-brand-teal">
            <span className="h-[2px] w-[26px] bg-brand-cyan" /> TRUSTED BY
          </div>
        </FadeUp>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <FadeUp delay={0.1}>
            <h2 className="font-display text-[48px] leading-[1.02] tracking-[-0.5px] text-brand-ink md:text-[54px]">
              Brands that<br/>believe in us.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="max-w-[400px] text-[16px] leading-[1.75] text-[#5A6478]">
              {clients.length}+ brands have trusted us since 2014 — from neighbourhood shops
              to national labels.
            </p>
          </FadeUp>
        </div>
      </div>

      <div className="mt-16 space-y-6">
        <Marquee items={row1} />
        <Marquee items={row2} reverse />
      </div>
    </section>
  );
}

function Marquee({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-wrapper">
      <motion.div
        className="marquee-track flex w-max gap-6"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((name, i) => (
          <div
            key={i}
            className="client-card grid h-[80px] w-[220px] shrink-0 place-items-center rounded-[8px] border border-[#E2E8F0] bg-white px-6 shadow-[0_2px_8px_rgba(27,42,74,0.06)]"
          >
            <span className="text-center font-display text-[15px] tracking-[1px] text-brand-ink">
              {name.toUpperCase()}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ═══════════════════ CONTACT ═══════════════════ */
function Contact() {
  const contact = useStore((s) => s.contact);
  const allServices = useStore((s) => s.services);
  const services = allServices.filter((x) => x.active);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const waLink = `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}?text=Hi%20Guru%20Graphics!%20I%27d%20like%20to%20get%20a%20quote.`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    try {
      await fetch("http://localhost:4000/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name") as string,
          phone: fd.get("phone") as string,
          email: (fd.get("email") as string) || "",
          service: fd.get("service") as string,
          project: fd.get("project") as string,
        }),
      });
      setSubmitted(true);
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      setError("Could not send enquiry. Please try WhatsApp or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-16">
        <FadeUp>
          <div className="mb-4 flex items-center gap-2 text-[12px] font-semibold tracking-[2px] text-brand-teal">
            <span className="h-[2px] w-[26px] bg-brand-cyan" /> GET IN TOUCH
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="font-display text-[48px] leading-[1.02] tracking-[-0.5px] text-brand-ink md:text-[54px]">
            Let's create<br/>
            <span className="font-italic-display text-brand-magenta">Something</span><br/>
            great.
          </h2>
        </FadeUp>

        <div className="mt-16 grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left cards */}
          <div className="space-y-6">
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between rounded-[8px] bg-[#E8F4FD] p-6 shadow-[0_4px_16px_rgba(0,120,212,0.12)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,120,212,0.18)]"
            >
              <div className="flex items-center gap-5">
                <motion.span
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="grid h-[52px] w-[52px] place-items-center rounded-full bg-brand-paper"
                >
                  <MessageCircle className="h-6 w-6 text-brand-ink" />
                </motion.span>
                <div>
                  <div className="text-[12px] font-bold tracking-[2px] text-brand-ink">
                    WHATSAPP US
                  </div>
                  <div className="font-display text-[20px] text-brand-ink">{contact.phone}</div>
                </div>
              </div>
              <ArrowUpRight className="h-6 w-6 text-brand-ink transition-transform duration-300 group-hover:rotate-45" />
            </a>

            <div className="grid gap-6 sm:grid-cols-2">
              <InfoCard icon={<Phone className="h-[18px] w-[18px]" />} label="OFFICE" value={contact.phone} />
              <InfoCard icon={<Mail className="h-[18px] w-[18px]" />} label="EMAIL" value={contact.email} />
              <InfoCard icon={<Camera className="h-[18px] w-[18px]" />} label="INSTAGRAM" value={contact.instagram} />
              <InfoCard icon={<MapPin className="h-[18px] w-[18px]" />} label="STUDIO" value={contact.address} />
            </div>
          </div>

          {/* Form */}
          <motion.form
            ref={formRef}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7 }}
            onSubmit={handleSubmit}
            className="relative overflow-hidden rounded-[8px] border border-border bg-white p-8 shadow-[0_10px_40px_rgba(27,42,74,0.06)] md:p-10"
          >
            <h3 className="font-display text-[32px] text-brand-ink">SEND US A MESSAGE</h3>
            <p className="mt-2 text-[15px] text-[#8C94A3]">
              We typically respond within 24 hours.
            </p>

            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 rounded border border-[#0B6E4F] bg-[#0078D40f] px-5 py-4 text-[14.5px] font-medium text-brand-teal"
                >
                  ✓ Thank you! Your enquiry has been received. We'll be in touch shortly.
                  <ConfettiBurst />
                </motion.div>
              )}
            </AnimatePresence>

            {error && (
              <div className="mt-6 rounded border border-brand-magenta bg-[#D6006F0f] px-5 py-4 text-[14.5px] font-medium text-brand-magenta">
                ⚠ {error}
              </div>
            )}

            <div className="mt-8 grid gap-7 sm:grid-cols-2">
              <FloatingField label="Full Name *" name="name" required />
              <FloatingField label="Phone Number *" name="phone" required />
              <FloatingField label="Email Address" name="email" type="email" />
              <SelectField
                label="Service Needed *"
                name="service"
                options={services.map((s) => s.name)}
              />
              <div className="sm:col-span-2">
                <FloatingField label="Tell us about your project *" name="project" as="textarea" required />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={submitting}
              className="btn-primary mt-10 w-full disabled:opacity-60"
              whileTap={{ scale: 0.98 }}
            >
              <span>{submitting ? "Sending..." : "Send Enquiry"}</span>
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ CONFETTI ═══════════════════ */
function ConfettiBurst() {
  const colors = ["var(--magenta)", "var(--cyan)", "var(--yellow)", "var(--teal)"];
  const pieces = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: colors[i % colors.length],
    delay: Math.random() * 0.4,
    size: 6 + Math.random() * 6,
  })), []);
  
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.x}%`,
            top: "-10px",
            width: p.size,
            height: p.size,
            background: p.color,
          }}
          initial={{ y: -10, opacity: 1, rotate: 0 }}
          animate={{ y: 200, opacity: 0, rotate: 360 + Math.random() * 360 }}
          transition={{ duration: 1 + Math.random() * 0.5, delay: p.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="info-card rounded-[4px] border border-border bg-brand-paper2 p-6 shadow-sm">
      <motion.div
        whileHover={{ scale: 1.15 }}
        className="info-icon mb-4 grid h-[42px] w-[42px] place-items-center rounded-full bg-brand-ink text-brand-paper transition-colors"
      >
        {icon}
      </motion.div>
      <div className="mb-1.5 text-[11px] font-semibold tracking-[2px] text-[#8C94A3]">
        {label}
      </div>
      <div className="text-[14.5px] font-semibold text-brand-ink">{value}</div>
    </div>
  );
}

/* ═══════════════════ FLOATING FIELD ═══════════════════ */
function FloatingField({
  label,
  name,
  type = "text",
  required,
  as = "input",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  as?: "input" | "textarea";
}) {
  const Component = as;
  return (
    <div className="float-field">
      <Component
        type={as === "input" ? type : undefined}
        name={name}
        required={required}
        placeholder=" "
        rows={as === "textarea" ? 4 : undefined}
      />
      <label>{label}</label>
    </div>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative block" ref={ref}>
      <span className="text-[12px] font-semibold tracking-[0.5px] text-[#8C94A3]">{label}</span>
      <input type="hidden" name={name} value={selected} />

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="mt-2 flex w-full items-center justify-between rounded-[3px] border-[1.5px] border-border bg-brand-paper2 px-4 py-3 text-left text-[14.5px] font-medium text-brand-ink outline-none transition-all focus:border-brand-magenta focus:shadow-[0_0_0_3px_rgba(214,0,111,0.08)]"
      >
        <span className={selected ? "text-brand-ink" : "text-[#8C94A3]"}>
          {selected || "Select a service..."}
        </span>
        <ChevronDown className={`h-4 w-4 text-[#8C94A3] transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-auto rounded-[6px] border border-border bg-brand-paper py-1 shadow-lg"
          >
            {options.map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => {
                  setSelected(o);
                  setOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-left text-[14px] transition-colors hover:bg-brand-paper2 hover:text-brand-magenta ${
                  selected === o ? "bg-brand-paper2 font-semibold text-brand-magenta" : "font-medium text-brand-ink"
                }`}
              >
                {o}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════ FOOTER ═══════════════════ */
function Footer({ onNav }: { onNav: (id: string) => void }) {
  const contact = useStore((s) => s.contact);
  const content = useStore((s) => s.content);
  const waLink = `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}?text=Hi%20Guru%20Graphics!%20I%27d%20like%20to%20get%20a%20quote.`;
  return (
    <footer className="relative overflow-hidden bg-brand-paper2 pt-0 pb-8">
      {/* Gradient Divider */}
      <div className="footer-divider" />
      
      <div className="mx-auto grid max-w-7xl gap-10 px-6 pt-16 md:grid-cols-3 md:px-16">
        <div>
          <Logo />
          <p className="font-italic-display mt-6 text-[22px] leading-snug text-brand-ink">
            "{content.tagline}"
          </p>
          <p className="mt-4 max-w-xs text-[14.5px] text-[#8C94A3]">
            Premium printing &amp; graphic design from Surat, India — since 2014.
          </p>
        </div>

        <div>
          <div className="text-[11.5px] font-semibold tracking-[2px] text-brand-teal">EXPLORE</div>
          <ul className="mt-5 space-y-3">
            {NAV.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => onNav(n.id)}
                  className="footer-link text-[14.5px] font-semibold text-brand-ink hover:text-brand-magenta"
                >
                  {n.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-[11.5px] font-semibold tracking-[2px] text-brand-teal">REACH US</div>
          <ul className="mt-5 space-y-3 text-[14.5px] font-medium text-brand-ink">
            <li>{contact.phone}</li>
            <li>{contact.email}</li>
            <li className="text-[#8C94A3]">{contact.address}</li>
          </ul>
          <div className="mt-6 flex gap-3">
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="social-icon grid h-10 w-10 place-items-center rounded-[3px] border border-brand-ink text-brand-ink hover:bg-[#25D366] hover:text-white hover:border-[#25D366]"
            >
              <MessageCircle className="h-[18px] w-[18px]" />
            </a>
            <a
              href={`https://instagram.com/${contact.instagram.replace("@", "")}`}
              target="_blank"
              rel="noreferrer"
              className="social-icon grid h-10 w-10 place-items-center rounded-[3px] border border-brand-ink text-brand-ink hover:bg-brand-magenta hover:text-white hover:border-brand-magenta"
            >
              <Camera className="h-[18px] w-[18px]" />
            </a>
          </div>
        </div>
      </div>

      <div className="pointer-events-none mt-16 select-none overflow-hidden border-t border-brand-ink/10 pt-4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.05 }}
          viewport={{ once: false }}
          transition={{ duration: 1 }}
          className="whitespace-nowrap font-display text-[14vw] leading-none text-brand-ink"
        >
          GURU GRAPHICS
        </motion.div>
      </div>

      <div className="mx-auto max-w-7xl px-6 text-center text-[12px] font-medium text-[#8C94A3] md:px-16 mt-4">
        &copy; {new Date().getFullYear()} Guru Graphics &middot; Designed with care.
      </div>
    </footer>
  );
}

/* ═══════════════════ UTILITIES ═══════════════════ */
function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <motion.button
      initial={false}
      animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0.5 }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-24 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-brand-cyan text-brand-ink shadow-lg transition-transform hover:scale-110 md:bottom-28 md:right-10"
      aria-label="Back to top"
    >
      <ArrowUp className="h-5 w-5" />
    </motion.button>
  );
}

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };
    
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, select, [role="button"], label')) {
        setIsInteractive(true);
      } else {
        setIsInteractive(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`pointer-events-none fixed left-0 top-0 z-[100000] hidden rounded-full bg-brand-cyan transition-[width,height,opacity,background-color] duration-300 ease-out md:block mix-blend-multiply ${
        isInteractive ? "h-12 w-12 bg-opacity-20 backdrop-blur-[2px]" : "h-5 w-5 bg-opacity-100 shadow-[0_0_15px_rgba(0,120,212,0.6)]"
      }`}
      style={{ transform: "translate(-50%, -50%)", willChange: "transform" }}
    />
  );
}
