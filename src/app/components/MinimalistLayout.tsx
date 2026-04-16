"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Code2, 
  Server, 
  Settings, 
  Layout, 
  Database, 
  GitBranch, 
  Terminal, 
  PenTool, 
  Globe,
  Zap,
  Cpu,
  ShieldCheck,
  Rocket,
  Mail,
  ExternalLink
} from "lucide-react";

import GitHub from "@mui/icons-material/GitHub";
import LinkedIn from "@mui/icons-material/LinkedIn";

// Helper for tech icons
const getTechIcon = (tech: string) => {
  const t = tech.toLowerCase();
  if (t.includes("next")) return <Globe size={12} />;
  if (t.includes("react")) return <Layout size={12} />;
  if (t.includes("node")) return <Terminal size={12} />;
  if (t.includes("tailwind")) return <Settings size={12} />;
  if (t.includes("typescript")) return <Code2 size={12} />;
  if (t.includes("vercel")) return <Rocket size={12} />;
  if (t.includes("sql") || t.includes("db") || t.includes("prisma") || t.includes("mongo")) return <Database size={12} />;
  if (t.includes("figma") || t.includes("design") || t.includes("copywriting")) return <PenTool size={12} />;
  if (t.includes("api")) return <Server size={12} />;
  if (t.includes("github") || t.includes("git")) return <GitBranch size={12} />;
  if (t.includes("automation")) return <Zap size={12} />;
  if (t.includes("panel") || t.includes("admin")) return <ShieldCheck size={12} />;
  return <Code2 size={12} />;
};

const LIGHT_COLORS = {
  bg: "#fafaf9",
  surface: "#f0efed",
  border: "#e0ddd8",
  text: "#1a1a18",
  muted: "#6b6860",
  accent: "#2d5a3d",
};

const DARK_COLORS = {
  bg: "#121212",
  surface: "#1e1e1e",
  border: "#333333",
  text: "#f0f0f0",
  muted: "#a0a0a0",
  accent: "#4ade80",
};

const IMG_WEB   = "/photos/school.png";
const IMG_CLINC = "/photos/clinic.png";
const IMG_MKT   = "/photos/marketing.png";
const IMG_CODE  = "/photos/portfolio.png";

function RevealDiv({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: delay / 1000 }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

const projects = [
   {
    title: "School — Academic Institution Website",
    desc: "A clean, performant website built for a school. Covers academics, admissions, events, and institutional info with a polished modern design.",
    stack: ["Next.js", "TypeScript", "Vercel", "Tailwind CSS", "PostgreSQL", "Prisma", "Admin Panel", "Automation", "Email Automation"],
    year: "2025",
    img: IMG_WEB,
    live: "https://xyz-school.vercel.app",
    github: "https://xyz-school.vercel.app/",
  },
  {
    title: "Clinic's — Brand Identity & Web",
    desc: "End-to-end brand refresh: logo system, color language, typography, and a new marketing website for a dental clinic.",
    stack: ["Figma", "Framer", "Brand Design", "Copywriting", "MongoDB", "Automation", "Admin Panel" ],
    year: "2025",
    img: IMG_CLINC,
    live: "https://clinic-three-pi.vercel.app/",
    github: "https://clinic-three-pi.vercel.app/",
  },
  {
    title: "Suppermart — E-Commerce Website",
    desc: "A clean, performant website built for a suppermart. Covers products, cart, checkout, and customer information with a polished modern design.",
    stack: ["React", "Recharts", "Node.js", "Meta API", "My SQL"],
    year: "2025",
    img: IMG_MKT,
    live: "https://suppermart.vercel.app/",
    github: "https://suppermart.vercel.app/",
  },
  {
    title: "My Portfolio",
    desc: "A clean, performant website built for a portfolio. Covers projects, services, and contact information with a polished modern design.",
    stack: ["Next.js", "Prisma", "TypeScript", "Resend"],
    year: "2026",
    img: IMG_CODE,
    live: "https://my-portfolio-ten-jet-51.vercel.app/",
    github: "https://my-portfolio-ten-jet-51.vercel.app/",
  },
];

const skills = [
  { 
    category: "Frontend", 
    icon: <Layout className="w-5 h-5" />, 
    items: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"] 
  },
  { 
    category: "Backend", 
    icon: <Server className="w-5 h-5" />, 
    items: ["Node.js", "APIs"] 
  },
  { 
    category: "Tools", 
    icon: <Settings className="w-5 h-5" />, 
    items: ["Git & GitHub", "Vercel", "Figma (basic)"] 
  },
];

export function MinimalistLayout() {
  const router = useRouter();
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load persistence
  useEffect(() => {
    const saved = localStorage.getItem("asmit-minimalist-dark");
    if (saved === "true") setIsDarkMode(true);
  }, []);

  // Save persistence
  useEffect(() => {
    localStorage.setItem("asmit-minimalist-dark", isDarkMode.toString());
  }, [isDarkMode]);

  const COLORS = isDarkMode ? DARK_COLORS : LIGHT_COLORS;

  const switchMode = () => {
    localStorage.removeItem("asmit-style-mode");
    router.push("/");
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const navLinks = [
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Work", id: "showcase" },
    { label: "Glaze", id: "glaze" },
    { label: "Why", id: "why" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <div style={{ background: COLORS.bg, color: COLORS.text, fontFamily: "'DM Mono', monospace", minHeight: "100vh" }}>

      {/* ── NAV ── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: isDarkMode ? "rgba(18,18,18,0.92)" : "rgba(250,250,249,0.92)",
          backdropFilter: "blur(10px)",
          borderBottom: `1px solid ${COLORS.border}`,
          padding: "0 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "56px",
        }}
      >
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "20px",
            color: COLORS.text,
            fontWeight: 400,
            letterSpacing: "0.04em",
            cursor: "default",
          }}
        >
          ASMIT'S PORTFOLIO
        </span>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }} className="hide-mobile">
          {navLinks.map(l => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'DM Mono', monospace",
                fontSize: "11px",
                color: COLORS.muted,
                letterSpacing: "0.1em",
                padding: "4px 0",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = COLORS.accent)}
              onMouseLeave={e => (e.currentTarget.style.color = COLORS.muted)}
            >
              {l.label.toUpperCase()}
            </button>
          ))}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "'DM Mono', monospace",
              fontSize: "11px",
              color: COLORS.text,
              letterSpacing: "0.1em",
              padding: "4px 0",
              transition: "color 0.2s",
            }}
          >
            {isDarkMode ? "LIGHT MODE" : "DARK MODE"}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", display: "none", color: COLORS.text }}
          className="show-mobile"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            {mobileOpen
              ? <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" />
              : <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" />
            }
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            top: "56px", left: 0, right: 0,
            background: COLORS.bg,
            borderBottom: `1px solid ${COLORS.border}`,
            padding: "20px 40px",
            zIndex: 99,
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {navLinks.map(l => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'DM Mono', monospace",
                fontSize: "13px",
                color: COLORS.muted,
                letterSpacing: "0.1em",
                textAlign: "left",
                padding: "8px 0",
                borderBottom: `1px solid ${COLORS.border}`,
              }}
            >
              {l.label.toUpperCase()}
            </button>
          ))}
          <button
            onClick={() => { setIsDarkMode(!isDarkMode); setMobileOpen(false); }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "'DM Mono', monospace",
              fontSize: "13px",
              color: COLORS.text,
              letterSpacing: "0.1em",
              textAlign: "left",
              padding: "8px 0",
              borderBottom: `1px solid ${COLORS.border}`,
            }}
          >
            {isDarkMode ? "LIGHT MODE" : "DARK MODE"}
          </button>
        </div>
      )}

      {/* ── HERO ── */}
      <section
        style={{
          minHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 40px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <RevealDiv delay={0}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: COLORS.accent, letterSpacing: "0.25em", marginBottom: "24px" }}>
            ASMIT SINGH · FOUNDER OF GLAZE
          </p>
        </RevealDiv>
        <RevealDiv delay={80}>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(48px, 8vw, 84px)",
              fontWeight: 400,
              color: COLORS.text,
              margin: "0 0 24px",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
            }}
          >
            I Help Businesses Build Fast, Modern & High-Converting Websites
          </h1>
        </RevealDiv>
        <RevealDiv delay={160}>
          <p style={{ fontSize: "16px", color: COLORS.muted, marginBottom: "12px", maxWidth: "600px", textalign:"center",lineHeight: 1.7 }}>
            I'm Asmit Singh — a web & software developer from Nepal.
          </p>
          <p style={{ fontSize: "14px", color: COLORS.accent, marginBottom: "48px", maxWidth: "480px", lineHeight: 1.7, fontFamily: "'DM Mono', monospace" }}>
            Founder of Glaze. Available for freelance projects.
          </p>
        </RevealDiv>
        <RevealDiv delay={240}>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <button
              onClick={() => scrollTo("showcase")}
              style={{
                padding: "12px 28px",
                border: `1px solid ${COLORS.text}`,
                background: "transparent",
                color: COLORS.text,
                fontFamily: "'DM Mono', monospace",
                fontSize: "12px",
                letterSpacing: "0.1em",
                cursor: "pointer",
                borderRadius: "3px",
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = COLORS.text; (e.currentTarget as HTMLButtonElement).style.color = COLORS.bg; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = COLORS.text; }}
            >
              VIEW WORK ↓
            </button>
            <button
              onClick={() => scrollTo("contact")}
              style={{
                padding: "12px 28px",
                border: `1px solid ${COLORS.border}`,
                background: "transparent",
                color: COLORS.muted,
                fontFamily: "'DM Mono', monospace",
                fontSize: "12px",
                letterSpacing: "0.1em",
                cursor: "pointer",
                borderRadius: "3px",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = COLORS.accent; (e.currentTarget as HTMLButtonElement).style.color = COLORS.accent; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = COLORS.border; (e.currentTarget as HTMLButtonElement).style.color = COLORS.muted; }}
            >
              CONTACT ME
            </button>
          </div>
        </RevealDiv>
      </section>

      <div style={{ width: "100%", height: "1px", background: COLORS.border }} />

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "100px 40px", maxWidth: "900px", margin: "0 auto" }}>
        <RevealDiv>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: COLORS.accent, letterSpacing: "0.25em", marginBottom: "48px" }}>
            01 — ABOUT
          </p>
        </RevealDiv>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "64px" }}>
          <RevealDiv delay={80}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", fontWeight: 400, color: COLORS.text, margin: "0 0 24px", lineHeight: 1.3 }}>
              Asmit Singh <br />
              <span style={{ fontSize: "20px", color: COLORS.accent }}>Developer & Founder</span>
            </h2>
            <p style={{ color: COLORS.muted, lineHeight: 1.8, fontSize: "13px", marginBottom: "16px" }}>
              I specialization in building modern, responsive, and performance-focused websites that help businesses grow online.
            </p>
            <p style={{ color: COLORS.muted, lineHeight: 1.8, fontSize: "13px", marginBottom: "16px" }}>
              I focus on clean design, smooth user experience, and real-world results — not just visuals.
            </p>
            <p style={{ color: COLORS.muted, lineHeight: 1.8, fontSize: "13px" }}>
              I'm also building Glaze, a growing digital agency.
            </p>
          </RevealDiv>
          <RevealDiv delay={160}>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: COLORS.accent, letterSpacing: "0.2em", marginBottom: "20px" }}>
              WHAT WE STAND FOR
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                "Clarity over complexity",
                "Speed without sloppiness",
                "Honest communication",
                "Work that lasts",
              ].map(item => (
                <li key={item} style={{ fontSize: "13px", color: COLORS.muted, display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ width: "16px", height: "1px", background: COLORS.accent, display: "inline-block", flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={() => scrollTo("contact")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                background: isDarkMode ? `${COLORS.accent}20` : "#edf3ef",
                border: `1px solid ${isDarkMode ? COLORS.accent : "#c5d9ca"}`,
                borderRadius: "3px",
                cursor: "pointer",
                transition: "background 0.2s, color 0.2s",
              }}
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: COLORS.accent, display: "inline-block" }} />
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: COLORS.accent, letterSpacing: "0.1em" }}>
                OPEN FOR NEW PROJECTS
              </span>
            </button>
          </RevealDiv>
        </div>
      </section>

      <div style={{ width: "100%", height: "1px", background: COLORS.border }} />

      {/* ── WHY CHOOSE ME ── */}
      <section id="why" style={{ padding: "100px 40px", maxWidth: "900px", margin: "0 auto" }}>
        <RevealDiv>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: COLORS.accent, letterSpacing: "0.25em", marginBottom: "48px" }}>
            02 — WHY CHOOSE ME
          </p>
        </RevealDiv>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "32px" }}>
          {[
            { title: "Fast delivery", desc: "Swift execution from idea to launch.", icon: <Zap size={16} /> },
            { title: "Clean modern design", desc: "Premium aesthetics that stand out.", icon: <PenTool size={16} /> },
            { title: "Clear communication", desc: "Active updates and full transparency.", icon: <Globe size={16} /> },
            { title: "Focus on results", desc: "Built for growth and conversions.", icon: <Rocket size={16} /> },
          ].map((item, i) => (
            <RevealDiv key={item.title} delay={i * 80}>
              <div style={{ borderLeft: `1px solid ${COLORS.accent}`, paddingLeft: "16px" }}>
                <div style={{ color: COLORS.accent, marginBottom: "12px" }}>{item.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", color: COLORS.text, margin: "0 0 8px", fontWeight: 500 }}>{item.title}</h3>
                <p style={{ fontSize: "12px", color: COLORS.muted, lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </RevealDiv>
          ))}
        </div>
      </section>

      <div style={{ width: "100%", height: "1px", background: COLORS.border }} />

      {/* ── SKILLS ── */}
      <section id="skills" style={{ padding: "100px 40px", maxWidth: "1100px", margin: "0 auto" }}>
        <RevealDiv>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: COLORS.accent, letterSpacing: "0.25em", marginBottom: "20px" }}>
            03 — SKILLS
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "36px", fontWeight: 400, color: COLORS.text, margin: "0 0 56px", lineHeight: 1.3 }}>
            Technical Expertise.
          </h2>
        </RevealDiv>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px" }}>
          {skills.map((s, i) => (
            <RevealDiv key={s.category} delay={i * 80}>
              <div style={{ padding: "28px", background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: "4px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                  <div style={{ color: COLORS.accent }}>{s.icon}</div>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", color: COLORS.text, margin: 0, fontWeight: 500 }}>
                    {s.category}
                  </p>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {s.items.map(item => (
                    <span
                      key={item}
                      style={{
                        padding: "4px 10px",
                        border: `1px solid ${COLORS.border}`,
                        borderRadius: "2px",
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "10px",
                        color: COLORS.muted,
                        background: COLORS.bg,
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </RevealDiv>
          ))}
        </div>
      </section>

      <div style={{ width: "100%", height: "1px", background: COLORS.border }} />

      {/* ── SHOWCASE ── */}
      <section id="showcase" style={{ padding: "100px 40px", maxWidth: "1100px", margin: "0 auto" }}>
        <RevealDiv>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: COLORS.accent, letterSpacing: "0.25em", marginBottom: "20px" }}>
            04 — SELECTED WORK
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "36px", fontWeight: 400, color: COLORS.text, margin: "0 0 56px", lineHeight: 1.3 }}>
            Things we've built.
          </h2>
        </RevealDiv>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "28px" }}>
          {projects.map((p, i) => (
            <RevealDiv key={p.title} delay={i * 80}>
              <a
                href={p.live !== "#" ? p.live : undefined}
                target={p.live !== "#" ? "_blank" : undefined}
                rel="noopener noreferrer"
                style={{ textDecoration: "none", display: "block" }}
              >
                <div
                  style={{
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: "6px",
                    overflow: "hidden",
                    background: COLORS.bg,
                    transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
                    cursor: p.live !== "#" ? "pointer" : "default",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = COLORS.accent;
                    if (p.live !== "#") {
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.08)";
                    }
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = COLORS.border;
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  }}
                >
                  <img
                    src={p.img}
                    alt={p.title}
                    style={{ width: "100%", height: "200px", objectFit: "cover", display: "block" }}
                  />
                  <div style={{ padding: "24px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "17px", fontWeight: 500, color: COLORS.text, margin: 0, lineHeight: 1.3, flex: 1 }}>
                        {p.title}
                      </h3>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: COLORS.muted, marginLeft: "12px", flexShrink: 0 }}>{p.year}</span>
                    </div>
                    <p style={{ fontSize: "12px", color: COLORS.muted, lineHeight: 1.7, margin: "0 0 16px" }}>{p.desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
                      {p.stack.map(s => (
                        <span 
                          key={s} 
                          style={{ 
                            padding: "3px 8px", 
                            background: COLORS.surface, 
                            border: `1px solid ${COLORS.border}`, 
                            borderRadius: "2px", 
                            fontSize: "10px", 
                            color: COLORS.accent, 
                            fontFamily: "'DM Mono', monospace",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px"
                          }}
                        >
                          <span style={{ 
                            display: "flex", 
                            color: COLORS.accent,
                            filter: `drop-shadow(0 0 4px ${COLORS.accent}40)` 
                          }}>
                            {getTechIcon(s)}
                          </span>
                          {s}
                        </span>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: "16px" }}>
                      {p.live !== "#" && (
                        <span style={{ fontSize: "11px", color: COLORS.accent, fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em" }}>
                          LIVE ↗
                        </span>
                      )}
                      {p.github !== "#" && (
                        <span style={{ fontSize: "11px", color: COLORS.muted, fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em" }}>
                          VIEW PROJECT ↗
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </a>
            </RevealDiv>
          ))}
        </div>
      </section>

      <div style={{ width: "100%", height: "1px", background: COLORS.border }} />

      {/* ── REALM OF GLAZE ── */}
      <section id="glaze" style={{ padding: "100px 40px", maxWidth: "900px", margin: "0 auto" }}>
        <RevealDiv>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: COLORS.accent, letterSpacing: "0.25em", marginBottom: "20px" }}>
            05 — PROJECT HIGHLIGHT
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "36px", fontWeight: 400, color: COLORS.text, margin: "0 0 32px", lineHeight: 1.3 }}>
            Realm of Glaze (Ongoing Project)
          </h2>
        </RevealDiv>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "48px" }}>
          <RevealDiv delay={80}>
            <p style={{ color: COLORS.muted, lineHeight: 1.8, fontSize: "13px", marginBottom: "16px" }}>
              Realm of Glaze is an ongoing 3D open-world project I'm currently building using Three.js, React Three Fiber, and Next.js.
            </p>
            <p style={{ color: COLORS.muted, lineHeight: 1.8, fontSize: "13px", marginBottom: "16px" }}>
              It focuses on interactive environments, smooth player movement, and real-time rendering on the web.
            </p>
            <p style={{ color: COLORS.muted, lineHeight: 1.8, fontSize: "13px", marginBottom: "24px" }}>
              This project reflects my interest in pushing web development beyond traditional websites.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {["Three.js", "R3F", "GLSL", "React", "Next.js"].map(tag => (
                <span key={tag} style={{ padding: "3px 8px", background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: "2px", fontSize: "9px", color: COLORS.accent, fontFamily: "'DM Mono', monospace" }}>
                  {tag}
                </span>
              ))}
            </div>
          </RevealDiv>
          <RevealDiv delay={160}>
            {/* Visual Placeholder */}
            <div style={{ position: "relative", width: "100%", height: "220px", background: COLORS.surface, borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${COLORS.border}`, overflow: "hidden" }}>
              <div style={{ textAlign: "center", color: COLORS.muted }}>
                <Cpu size={32} style={{ marginBottom: "12px", opacity: 0.5 }} />
                <p style={{ fontSize: "11px", fontFamily: "'DM Mono', monospace" }}>[ 3D WORLD PREVIEW ]</p>
              </div>
              
              {/* 3D VERSION - COMMENTED OUT FOR LATER
              <div style={{ position: 'absolute', inset: 0 }}>
                <Canvas>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <Box position={[-1.2, 0, 0]} />
                  <Box position={[1.2, 0, 0]} />
                </Canvas>
              </div>
              */}
            </div>
          </RevealDiv>
        </div>
      </section>

      <div style={{ width: "100%", height: "1px", background: COLORS.border }} />

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "100px 40px", maxWidth: "900px", margin: "0 auto" }}>
        <RevealDiv>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: COLORS.accent, letterSpacing: "0.25em", marginBottom: "20px" }}>
            06 — CONTACT
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "36px", fontWeight: 400, color: COLORS.text, margin: "0 0 12px", lineHeight: 1.3 }}>
            Let's work together.
          </h2>
          <p style={{ fontSize: "13px", color: COLORS.muted, marginBottom: "48px" }}>
            I focus on results, not just pixels.
          </p>
        </RevealDiv>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "64px" }}>
          <RevealDiv delay={80}>
            {submitted ? (
              <div style={{ padding: "32px", background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: "4px", textAlign: "center" }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", color: COLORS.text, marginBottom: "8px" }}>Message received.</p>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: COLORS.muted }}>We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  { label: "Name", name: "name", type: "text", placeholder: "Your name" },
                  { label: "Email", name: "email", type: "email", placeholder: "your@email.com" },
                ].map(field => (
                  <div key={field.name}>
                    <label style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: COLORS.muted, letterSpacing: "0.15em", display: "block", marginBottom: "6px" }}>
                      {field.label.toUpperCase()}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={(formState as any)[field.name]}
                      onChange={e => setFormState(prev => ({ ...prev, [field.name]: e.target.value }))}
                      required
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        border: `1px solid ${COLORS.border}`,
                        borderRadius: "3px",
                        background: COLORS.surface,
                        color: COLORS.text,
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "12px",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: COLORS.muted, letterSpacing: "0.15em", display: "block", marginBottom: "6px" }}>
                    WHAT ARE YOU BUILDING?
                  </label>
                  <textarea
                    placeholder="Tell us about your project..."
                    value={formState.message}
                    onChange={e => setFormState(prev => ({ ...prev, message: e.target.value }))}
                    required
                    rows={5}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: "3px",
                      background: COLORS.surface,
                      color: COLORS.text,
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "12px",
                      outline: "none",
                      resize: "vertical",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    padding: "12px 24px",
                    background: COLORS.text,
                    border: "none",
                    borderRadius: "3px",
                    color: COLORS.bg,
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "12px",
                    letterSpacing: "0.1em",
                    cursor: "pointer",
                    alignSelf: "flex-start",
                  }}
                >
                  SEND MESSAGE
                </button>
              </form>
            )}
          </RevealDiv>

          <RevealDiv delay={160}>
            <div>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: COLORS.muted, letterSpacing: "0.2em", marginBottom: "20px" }}>
                FIND US
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "40px" }}>
                {[
                  { label: "GitHub", url: "https://github.com/asmitsingh000", icon: <GitHub sx={{ fontSize: 16 }} /> },
                  { label: "LinkedIn", url: "https://www.linkedin.com/in/asmit-singh-1a76133b0/", icon: <LinkedIn sx={{ fontSize: 16 }} /> },
                  { label: "Email — glaze0999@gmail.com", url: "mailto:glaze0999@gmail.com", icon: <Mail size={16} /> },
                ].map(link => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "12px",
                      color: COLORS.muted,
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = COLORS.accent}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = COLORS.muted}
                  >
                    <div style={{ 
                      color: "currentColor", 
                      transition: "color 0.2s",
                      display: "flex",
                      alignItems: "center",
                      filter: `drop-shadow(0 0 5px ${COLORS.accent}60)`
                    }}>
                      {link.icon}
                    </div>
                    {link.label} <ExternalLink size={10} style={{ marginLeft: "4px", opacity: 0.5 }} />
                  </a>
                ))}
              </div>
              <div style={{ padding: "20px", background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: "4px" }}>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: COLORS.accent, letterSpacing: "0.15em", margin: "0 0 6px" }}>
                  AVAILABILITY
                </p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", color: COLORS.text, margin: 0 }}>
                  Open for new projects.
                </p>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: COLORS.muted, margin: "6px 0 0" }}>
                  Web builds · Brand design · Full campaigns
                </p>
              </div>
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: `1px solid ${COLORS.border}`, padding: "32px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: COLORS.muted, letterSpacing: "0.08em" }}>
          © 2026 Glaze Digital Agency — All rights reserved
        </span>
        <button
          onClick={switchMode}
          style={{
            background: "none",
            border: `1px solid ${COLORS.border}`,
            borderRadius: "3px",
            padding: "6px 14px",
            cursor: "pointer",
            fontFamily: "'DM Mono', monospace",
            fontSize: "10px",
            color: COLORS.muted,
            letterSpacing: "0.12em",
            transition: "color 0.2s, border-color 0.2s",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = COLORS.accent; (e.currentTarget as HTMLButtonElement).style.borderColor = COLORS.accent; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = COLORS.muted; (e.currentTarget as HTMLButtonElement).style.borderColor = COLORS.border; }}
        >
          ⇄ SWITCH STYLE
        </button>
      </footer>

      {/* Floating style switcher */}
      <button
        onClick={switchMode}
        style={{
          position: "fixed",
          bottom: "28px",
          right: "28px",
          background: COLORS.text,
          color: COLORS.bg,
          border: "none",
          borderRadius: "3px",
          padding: "10px 16px",
          fontFamily: "'DM Mono', monospace",
          fontSize: "10px",
          letterSpacing: "0.12em",
          cursor: "pointer",
          boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
          zIndex: 200,
        }}
      >
        ⇄ STYLE
      </button>

      <style>{`
        @media (max-width: 640px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 641px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </div>
  );
}
