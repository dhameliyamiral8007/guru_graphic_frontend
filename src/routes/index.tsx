import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowUp,
  ArrowDown,
  Phone,
  Mail,
  Camera,
  MapPin,
  MessageCircle,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shivansh Advertising — Graphic Design & Printing in Surat" },
      {
        name: "description",
        content:
          "Shivansh Advertising — a decade of premium graphic design and printing in Surat, India. Business cards, brochures, hoardings, offset & digital printing. Quality you see, trust you feel.",
      },
      { property: "og:title", content: "Shivansh Advertising — Graphic & Printing Studio" },
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

const SERVICES = [
  "Stationery Works", "Business Card", "Rough Pad", "Acrylic Board",
  "Catalogue", "Review Card", "Doctor File", "Hoarding",
  "Brochure", "Label / Sticker", "Letter Head", "Banner / Eco Vinyl",
  "Logo Design", "Product Packaging Box", "Flyer", "Social Media Post",
  "Visiting Cards", "Flex Banners", "Offset Printing", "Digital Printing",
];

const CLIENTS = [
  "Aksharam", "Made in Shivansh", "Infinity Associates", "Monkis", "Virani Textile",
  "Uranus", "VR", "Shagun", "Primora Foil", "Bharat Lubricants", "AT Cables",
  "Penguin", "IFT9", "Ananta", "Shree Enterprise", "Roopa", "Voltaic",
  "Leeva Holidays", "Ujala", "Auto Mech", "Akhand Salon", "Sukhnitam",
];

const WA_LINK =
  "https://wa.me/919978802372?text=Hi%20Shivansh%20Advertising!%20I%27d%20like%20to%20get%20a%20quote.";

function Home() {
  const [active, setActive] = useState("home");

  useEffect(() => {
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
    <div className="relative min-h-screen text-foreground">
      <Header active={active} onNav={scrollTo} />
      <Hero onNav={scrollTo} />
      <About />
      <Stats />
      <Services onNav={scrollTo} />
      <Clients />
      <Contact />
      <Footer onNav={scrollTo} />
      <BackToTop />
    </div>
  );
}

/* ---------------- Header ---------------- */
function Header({ active, onNav }: { active: string; onNav: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 md:px-8 md:py-4">
        <button
          onClick={() => onNav("home")}
          className="flex shrink-0 items-center gap-3"
          aria-label="Home"
        >
          <Logo />
        </button>

        <nav className="hidden items-center gap-2 lg:flex">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => onNav(n.id)}
              className="group relative px-4 py-2 text-[15px] font-medium text-navy transition-colors"
            >
              <span
                className={
                  active === n.id ? "text-orange" : "group-hover:text-orange"
                }
              >
                {n.label}
              </span>
              <span
                className={`absolute inset-x-4 -bottom-0.5 h-0.5 origin-left bg-orange transition-transform duration-300 ${
                  active === n.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-transform hover:scale-105 md:inline-flex"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={2.5} />
            WhatsApp Us
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-md border border-border lg:hidden"
            aria-label="Menu"
          >
            <div className="flex flex-col gap-1.5">
              <span className={`h-0.5 w-5 bg-navy transition ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`h-0.5 w-5 bg-navy transition ${open ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-5 bg-navy transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="overflow-hidden border-t border-border bg-background lg:hidden"
        >
          <div className="flex flex-col p-4">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => {
                  onNav(n.id);
                  setOpen(false);
                }}
                className="border-b border-border/60 py-3 text-left text-lg font-medium text-navy"
              >
                {n.label}
              </button>
            ))}
            <a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp Us
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-0.5">
        <span className="block h-8 w-1.5 rounded-sm bg-orange" />
        <span className="block h-8 w-1.5 rounded-sm bg-red-500" />
        <span className="block h-8 w-1.5 rounded-sm bg-navy" />
      </div>
      <div className="border-l border-border pl-3 leading-tight">
        <div className="text-italic-display text-2xl font-bold text-navy">
          Shivansh
        </div>
        <div className="text-[9px] font-semibold tracking-[0.25em] text-navy">
          ADVERTISING
        </div>
        <div className="text-[8px] font-medium tracking-wider">
          <span className="text-orange">QUALITY YOU SEE</span>
          <span className="text-navy">...</span>
          <span className="text-orange">TRUST YOU FEEL</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Hero ---------------- */
function Hero({ onNav }: { onNav: (id: string) => void }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      {/* decorative sweeping arc */}
      <motion.svg
        className="absolute right-0 top-1/4 h-[700px] w-[700px] opacity-40"
        viewBox="0 0 700 700"
        initial={{ rotate: -10, opacity: 0 }}
        animate={{ rotate: 0, opacity: 0.4 }}
        transition={{ duration: 1.5 }}
      >
        <path
          d="M50,500 Q350,100 650,400"
          stroke="var(--orange)"
          strokeWidth="80"
          fill="none"
          strokeLinecap="round"
          opacity="0.25"
        />
      </motion.svg>

      <span className="absolute left-4 top-1/2 hidden -translate-y-1/2 -rotate-90 text-xs font-semibold tracking-[0.4em] text-muted-foreground md:block">
        SURAT, INDIA — EST. 2014
      </span>
      <span className="absolute right-4 bottom-8 hidden -rotate-90 text-xs font-semibold tracking-[0.4em] text-muted-foreground md:block">
        SCROLL ↓
      </span>

      <motion.div style={{ y, opacity }} className="mx-auto w-full max-w-7xl px-6 md:px-16">
        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-display text-[15vw] text-navy md:text-[9vw]"
          >
            <div>YOUR</div>
            <motion.div
              initial={{ opacity: 0, x: -60, skewX: -10 }}
              animate={{ opacity: 1, x: 0, skewX: -8 }}
              transition={{ duration: 0.9, delay: 0.35 }}
              className="text-italic-display font-bold text-orange"
              style={{ transform: "skewX(-8deg)" }}
            >
              Brand's
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
            >
              FIRST IMPRESSION
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              STARTS HERE.
            </motion.div>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-10"
          >
            <div className="h-0.5 w-24 bg-orange" />
            <p className="mt-4 text-base text-muted-foreground md:text-lg">
              All Type of Graphic Designing & Printing — Since 2014
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <button
                onClick={() => onNav("services")}
                className="group inline-flex items-center gap-3 rounded-full border border-navy px-6 py-3 text-sm font-semibold text-navy transition-all hover:bg-navy hover:text-white"
              >
                See Our Work
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
              </button>
              <button
                onClick={() => onNav("contact")}
                className="group inline-flex items-center gap-3 rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange/30 transition-transform hover:scale-105"
              >
                Contact Us
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------------- About ---------------- */
function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 0.15, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-display absolute right-0 top-10 text-[18vw] text-orange/30 md:text-[12vw]"
      >
        2014
      </motion.div>

      <div className="mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-2 md:px-16">
        <div>
          <FadeUp>
            <div className="mb-4 flex items-center gap-3 text-sm font-semibold tracking-[0.3em] text-orange">
              <span className="h-px w-8 bg-orange" /> WHO WE ARE
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="text-display text-5xl text-navy md:text-7xl">
              DECADE OF <span className="text-orange">IMPACT.</span>
            </h2>
          </FadeUp>
          <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-muted-foreground md:text-base">
            {[
              "Founded in 2014, Shivansh Advertising has been dedicated to delivering high-quality printing and creative solutions to businesses of all sizes. What started as a small initiative has grown into a trusted name in the printing industry, known for reliability, innovation, and customer satisfaction.",
              "We specialize in digital printing, offset printing, branding materials, and customized promotional products — helping clients create a strong visual identity that stands out in today's competitive market.",
              "We combine modern technology with creative expertise to ensure every project meets the highest standards of quality. Our mission since 2014 has remained the same — to turn ideas into impactful prints that help businesses grow.",
            ].map((t, i) => (
              <FadeUp key={i} delay={0.2 + i * 0.1}>
                <p>{t}</p>
              </FadeUp>
            ))}
          </div>
        </div>

        <div className="flex items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full rounded-2xl bg-navy p-10 text-white shadow-2xl shadow-navy/30 md:p-14"
          >
            <div className="text-italic-display text-3xl leading-snug md:text-5xl">
              "Quality You See...
              <br />
              Trust You Feel."
            </div>
            <div className="mt-8 flex items-center gap-4">
              <span className="h-px w-12 bg-orange" />
              <span className="text-xs font-semibold tracking-[0.25em] text-white/70">
                SHIVANSH ADVERTISING, SURAT
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Stats ---------------- */
function Stats() {
  const stats = [
    { n: 10, label: "YEARS" },
    { n: 500, label: "CLIENTS" },
    { n: 1000, label: "PROJECTS" },
  ];
  return (
    <section className="py-10">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-5 px-6 md:justify-start md:px-16">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.6 }}
            className="flex items-center gap-4 rounded-full bg-navy px-7 py-4 shadow-lg shadow-navy/20"
          >
            <Counter to={s.n} />
            <span className="text-xs font-semibold tracking-[0.3em] text-white/70">
              {s.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Counter({ to }: { to: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const start = performance.now();
          const dur = 1400;
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / dur);
            setVal(Math.floor(to * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return (
    <span ref={ref} className="text-display text-2xl text-orange">
      {val}+
    </span>
  );
}

/* ---------------- Services ---------------- */
function Services({ onNav }: { onNav: (id: string) => void }) {
  return (
    <section id="services" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-16">
        <FadeUp>
          <div className="mb-4 flex items-center gap-3 text-sm font-semibold tracking-[0.3em] text-orange">
            <span className="h-px w-8 bg-orange" /> DO YOU NEED A PROFESSIONAL
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="text-display text-5xl text-navy md:text-8xl">
            GRAPHIC & PRINTING WORKS
          </h2>
        </FadeUp>

        <div className="mt-16 grid grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <motion.button
              key={s}
              onClick={() => onNav("contact")}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 8) * 0.05, duration: 0.5 }}
              className="group relative flex items-center gap-4 border-b border-border py-6 text-left transition-colors hover:bg-navy/[0.03] sm:px-6"
            >
              <ArrowUpRight className="h-5 w-5 shrink-0 text-orange transition-transform group-hover:rotate-45" />
              <span className="text-lg font-semibold text-navy transition-colors group-hover:text-orange">
                {s}
              </span>
            </motion.button>
          ))}
        </div>

        <FadeUp>
          <p className="mt-12 text-center text-lg italic text-muted-foreground">
            One studio. Every print. Endless possibilities.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

/* ---------------- Clients ---------------- */
function Clients() {
  const row1 = CLIENTS.slice(0, 11);
  const row2 = CLIENTS.slice(11);
  return (
    <section id="clients" className="overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-16">
        <FadeUp>
          <div className="mb-4 flex items-center gap-3 text-sm font-semibold tracking-[0.3em] text-orange">
            <span className="h-px w-8 bg-orange" /> TRUSTED BY
          </div>
        </FadeUp>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <FadeUp delay={0.1}>
            <h2 className="text-display text-5xl text-navy md:text-7xl">
              BRANDS THAT BELIEVE IN US.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="max-w-sm text-sm text-muted-foreground">
              500+ brands have trusted us since 2014 — from neighbourhood shops
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
    <div className="relative overflow-hidden">
      <div
        className="marquee-track flex w-max gap-6"
        style={{ animationDirection: reverse ? "reverse" : "normal" }}
      >
        {doubled.map((name, i) => (
          <div
            key={i}
            className="grid h-24 w-52 shrink-0 place-items-center rounded-xl border border-border bg-card px-6 shadow-sm"
          >
            <span className="text-center text-sm font-bold tracking-wider text-navy/70">
              {name.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Contact ---------------- */
function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.08 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-display pointer-events-none absolute inset-x-0 top-10 text-center text-[22vw] text-navy"
      >
        SAY HELLO
      </motion.div>

      <div className="mx-auto max-w-7xl px-6 md:px-16">
        <FadeUp>
          <div className="mb-4 flex items-center gap-3 text-sm font-semibold tracking-[0.3em] text-orange">
            <span className="h-px w-8 bg-orange" /> GET IN TOUCH
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="text-display text-5xl text-navy md:text-8xl">
            LET'S CREATE{" "}
            <span className="text-italic-display font-bold text-orange">
              Something
            </span>{" "}
            GREAT.
          </h2>
        </FadeUp>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* Left cards */}
          <div className="space-y-5">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-orange text-white">
                  <MessageCircle className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-[11px] font-semibold tracking-[0.25em] text-muted-foreground">
                    WHATSAPP US
                  </div>
                  <div className="text-lg font-bold text-navy">+91 99788-02372</div>
                </div>
              </div>
              <ArrowUpRight className="h-5 w-5 text-navy transition-transform group-hover:rotate-45" />
            </a>

            <div className="grid gap-5 sm:grid-cols-2">
              <InfoCard icon={<Phone className="h-4 w-4" />} label="OFFICE" value="+91 99248 94072" />
              <InfoCard icon={<Mail className="h-4 w-4" />} label="EMAIL" value="info@shivanshadvertising.in" />
              <InfoCard icon={<Camera className="h-4 w-4" />} label="INSTAGRAM" value="@shivansh_advertising72" />
              <InfoCard
                icon={<MapPin className="h-4 w-4" />}
                label="STUDIO"
                value="105, 1st Floor, Silverstone Arcade, B/s. Kantheriya Hanuman Temple, Causeway Road, Katargam, Surat-395004."
              />
            </div>
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks — we'll be in touch within 24 hours.");
            }}
            className="rounded-3xl border border-border bg-card p-8 shadow-xl shadow-navy/5 md:p-10"
          >
            <h3 className="text-display text-3xl text-navy">SEND US A MESSAGE.</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              We typically respond within 24 hours.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <Field label="Full Name *" name="name" required />
              <Field label="Phone Number *" name="phone" required />
              <Field label="Email Address" name="email" type="email" />
              <SelectField
                label="Service Needed *"
                name="service"
                options={["Logo Design", "Banner Printing", "Visiting Cards", "Hoarding", "Offset Printing", "Other"]}
              />
              <div className="sm:col-span-2">
                <Field label="Tell us about your project *" name="project" required />
              </div>
            </div>

            <button
              type="submit"
              className="group mt-10 inline-flex items-center gap-3 rounded-full bg-orange px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-orange/30 transition-transform hover:scale-105"
            >
              Send Enquiry
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-3 grid h-8 w-8 place-items-center rounded-full bg-orange/10 text-orange">
        {icon}
      </div>
      <div className="text-[10px] font-semibold tracking-[0.25em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-navy">{value}</div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        className="mt-1 w-full border-0 border-b border-border bg-transparent py-2 text-navy outline-none transition-colors focus:border-orange"
      />
    </label>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <select
        name={name}
        className="mt-1 w-full border-0 border-b border-border bg-transparent py-2 text-navy outline-none transition-colors focus:border-orange"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

/* ---------------- Footer ---------------- */
function Footer({ onNav }: { onNav: (id: string) => void }) {
  return (
    <footer className="relative overflow-hidden border-t-4 border-orange pt-16 pb-8">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-3 md:px-16">
        <div>
          <Logo />
          <p className="text-italic-display mt-6 text-xl text-navy">
            "Quality You See...{" "}
            <span className="text-orange">Trust You Feel.</span>"
          </p>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Premium printing & graphic design from Surat, India — since 2014.
          </p>
        </div>

        <div>
          <div className="text-[11px] font-semibold tracking-[0.3em] text-orange">EXPLORE</div>
          <ul className="mt-4 space-y-3">
            {NAV.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => onNav(n.id)}
                  className="text-navy hover:text-orange"
                >
                  {n.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-[11px] font-semibold tracking-[0.3em] text-orange">REACH US</div>
          <ul className="mt-4 space-y-3 text-sm text-navy">
            <li>+91 99788-02372</li>
            <li>info@shivanshadvertising.in</li>
            <li className="text-muted-foreground">
              105, 1st Floor, Silverstone Arcade, B/s. Kantheriya Hanuman Temple,
              Causeway Road, Katargam, Surat-395004.
            </li>
          </ul>
          <div className="mt-5 flex gap-3">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="grid h-10 w-10 place-items-center rounded-full border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white"
            >
              <Camera className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="text-display pointer-events-none mt-12 select-none overflow-hidden text-center text-[18vw] leading-none text-navy/[0.06]">
        SHIVANSH ADVERTISING
      </div>

      <div className="mx-auto max-w-7xl px-6 text-center text-xs text-muted-foreground md:px-16">
        © {new Date().getFullYear()} Shivansh Advertising · Designed with care.
      </div>
    </footer>
  );
}

/* ---------------- Utilities ---------------- */
function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
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
      className="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-orange text-white shadow-lg shadow-orange/40"
      aria-label="Back to top"
    >
      <ArrowUp className="h-5 w-5" />
    </motion.button>
  );
}
