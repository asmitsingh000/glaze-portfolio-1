"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const C = {
  bg: "#0a1a0f",
  surface: "#0f2216",
  surfaceAlt: "#132a1a",
  border: "#1a4a2a",
  text: "#F0F4F0",
  muted: "#8aaa8e",
  accent: "#50C878",
  gold: "#D4AF37",
  goldMuted: "#9a7c24",
};

const IMG_WEB   = "/photos/school.png";
const IMG_CLINC = "/photos/clinic.png";
const IMG_MKT   = "/photos/marketing.png";
const IMG_CODE  = "/photos/portfolio.png";

function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function RevealDiv({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// Agency emblem SVG
function GlazeEmblem({ size = 300, opacity = 0.06, animated = false }: { size?: number; opacity?: number; animated?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 300 300"
      fill="none"
      style={{
        animation: animated ? "emblem-rotate 40s linear infinite" : undefined,
        opacity,
      }}
    >
      <circle cx="150" cy="150" r="140" stroke="#50C878" strokeWidth="0.8" />
      <circle cx="150" cy="150" r="110" stroke="#D4AF37" strokeWidth="0.5" />
      <circle cx="150" cy="150" r="75"  stroke="#50C878" strokeWidth="0.8" />
      <circle cx="150" cy="150" r="40"  stroke="#D4AF37" strokeWidth="0.5" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a  = (i * Math.PI * 2) / 8;
        const a2 = ((i + 1) * Math.PI * 2) / 8;
        const r  = 110;
        return <line key={i} x1={150 + Math.cos(a) * r} y1={150 + Math.sin(a) * r} x2={150 + Math.cos(a2) * r} y2={150 + Math.sin(a2) * r} stroke="#50C878" strokeWidth="0.5" />;
      })}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI * 2) / 8;
        return <line key={i} x1={150 + Math.cos(a) * 40} y1={150 + Math.sin(a) * 40} x2={150 + Math.cos(a) * 140} y2={150 + Math.sin(a) * 140} stroke="#D4AF37" strokeWidth="0.4" />;
      })}
      <circle cx="150" cy="150" r="8" fill="#D4AF37" fillOpacity="0.3" />
    </svg>
  );
}

function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width;
    const H = canvas.height;

    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vy: -(Math.random() * 0.4 + 0.15),
      vx: (Math.random() - 0.5) * 0.15,
      size: Math.random() * 1.8 + 0.3,
      life: Math.random() * 100,
      maxLife: 120 + Math.random() * 80,
      color: Math.random() > 0.6 ? "#D4AF37" : "#50C878",
    }));

    function draw() {
      ctx!.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy; p.life += 1;
        if (p.y < -5 || p.life > p.maxLife) { p.x = Math.random() * W; p.y = H + 5; p.life = 0; }
        ctx!.fillStyle = p.color;
        ctx!.globalAlpha = Math.sin((p.life / p.maxLife) * Math.PI) * 0.5;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    }
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}

const projects = [
  { title: "School — Academic Institution Website", desc: "A clean, performant website built for a school. Covers academics, admissions, events, and institutional info with a polished modern design.", stack: ["Next.js", "TypeScript", "Vercel", "Tailwind CSS"], year: "2025", img: IMG_WEB, live: "https://school-omega-one.vercel.app/" },
  { title: "Lumina — Brand Identity & Web",          desc: "End-to-end brand refresh: logo system, color language, typography, and a new marketing website built in Framer for rapid shipping.", stack: ["Figma", "Framer", "Brand Design", "Copywriting"],           year: "2025", img: IMG_CLINC, live: "https://kalyan-v2.vercel.app/" },
  { title: "GrowthPulse — Marketing Dashboard",       desc: "Campaign management and analytics platform. Unified view of social, paid ads, SEO metrics, and automated monthly client reports.", stack: ["React", "Recharts", "Node.js", "Meta API"],                 year: "2024", img: IMG_MKT,   live: "" },
  { title: "DealFlow — Client CRM",                  desc: "Custom CRM for agency deal pipelines. Proposal tracking, client notes, automated follow-ups, contract history, and revenue reporting.", stack: ["Next.js", "Prisma", "TypeScript", "Resend"],              year: "2024", img: IMG_CODE,  live: "" },
];

const team = [
  { name: "Asmit Singh",  role: "Web Development",  desc: "Architects and builds every digital product. From landing pages to full-stack platforms — if it runs in a browser, this is his domain.", initials: "AS", color: "#50C878" },
  { name: "Aanand Mehta",    role: "Design & Creative", desc: "The visual mind of Glaze. Brand identity, UI systems, motion, and the visual language that makes clients' work impossible to ignore.", initials: "AM", color: "#D4AF37" },
  { name: "Santanu Deo",   role: "Marketing & Growth", desc: "Puts the right work in front of the right people. SEO, content strategy, paid campaigns — growth is the north star.", initials: "SD", color: "#6ba8d4" },
  { name: "Kishan Sha",   role: "Business & Deals",  desc: "The closer. Client relationships, proposals, partnerships — turning conversations into contracts and contracts into long-term trust.", initials: "KS", color: "#d4a050" },
];

const services = [
  { label: "Web Development",   tags: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "REST APIs", "Tailwind CSS"] },
  { label: "Design & Creative", tags: ["Figma", "UI/UX", "Brand Identity", "Motion Design", "Visual Systems", "Prototyping"] },
  { label: "Marketing & Growth", tags: ["SEO", "Social Media", "Content Strategy", "Paid Ads", "Email Marketing", "Analytics"] },
  { label: "Business & Deals",  tags: ["Client Relations", "Proposals", "Partnerships", "Strategy", "Negotiation", "Growth Planning"] },
];

export function ClassicLayout() {
  const router = useRouter();
  const [submitted, setSubmitted]   = useState(false);
  const [formState, setFormState]   = useState({ name: "", email: "", message: "" });
  const [scrollY, setScrollY]       = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const switchMode = () => { localStorage.removeItem("asmit-style-mode"); router.push("/"); };
  const scrollTo   = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMobileOpen(false); };

  const navLinks = [
    { label: "About",    id: "about" },
    { label: "Services", id: "services" },
    { label: "Work",     id: "showcase" },
    { label: "Team",     id: "team" },
    { label: "Contact",  id: "contact" },
  ];

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: "'Crimson Pro', serif", minHeight: "100vh" }}>
      <style>{`
        @keyframes emblem-rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse-gold { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
        @media (max-width: 640px) {
          .cl-hide-mobile { display: none !important; }
          .cl-show-mobile { display: flex !important; }
        }
        @media (min-width: 641px) {
          .cl-show-mobile { display: none !important; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav
        style={{
          position: "sticky", top: 0, zIndex: 100,
          background: "rgba(10,26,15,0.88)",
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${C.border}`,
          padding: "0 48px",
          height: "60px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}
      >
        <span style={{ fontFamily: "'Cinzel', serif", fontSize: "18px", color: C.gold, fontWeight: 400, letterSpacing: "0.2em" }}>
          GLAZE
        </span>

        {/* Desktop */}
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }} className="cl-hide-mobile">
          {navLinks.map(l => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'Cinzel', serif", fontSize: "11px",
                color: C.muted, letterSpacing: "0.12em",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = C.gold)}
              onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
            >
              {l.label.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", display: "none", color: C.text }}
          className="cl-show-mobile"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            {mobileOpen
              ? <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" />
              : <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" />
            }
          </svg>
        </button>
      </nav>

      {mobileOpen && (
        <div style={{ position: "fixed", top: "60px", left: 0, right: 0, background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "20px 40px", zIndex: 99, display: "flex", flexDirection: "column", gap: "12px" }}>
          {navLinks.map(l => (
            <button key={l.id} onClick={() => scrollTo(l.id)}
              style={{ background: "none", border: "none", borderBottom: `1px solid ${C.border}`, cursor: "pointer", fontFamily: "'Cinzel', serif", fontSize: "13px", color: C.muted, letterSpacing: "0.1em", textAlign: "left", padding: "10px 0" }}>
              {l.label.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: "80px 40px" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, #081510 0%, #0a1a0f 40%, #0d2216 70%, #070f09 100%)", transform: `translateY(${scrollY * 0.25}px)` }} />
        <HeroParticles />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
          <GlazeEmblem size={480} opacity={0.05} animated />
        </div>

        <div style={{ position: "relative", textAlign: "center", zIndex: 2 }}>
          <RevealDiv delay={0}>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: "11px", color: C.accent, letterSpacing: "0.4em", marginBottom: "32px" }}>
              DIGITAL AGENCY
            </p>
          </RevealDiv>
          <RevealDiv delay={100}>
            <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(52px, 10vw, 96px)", fontWeight: 400, color: C.gold, margin: "0 0 16px", letterSpacing: "0.2em", lineHeight: 1.1, textShadow: "0 0 40px rgba(212,175,55,0.2)" }}>
              GLAZE
            </h1>
          </RevealDiv>
          <RevealDiv delay={200}>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(13px, 2vw, 16px)", color: C.accent, letterSpacing: "0.3em", margin: "0 0 20px" }}>
              WEB · DESIGN · MARKETING · GROWTH
            </p>
          </RevealDiv>
          <RevealDiv delay={300}>
            <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "20px", color: "#8aaa8e", fontStyle: "italic", margin: "0 0 48px" }}>
              "We build what moves people."
            </p>
          </RevealDiv>
          <RevealDiv delay={400}>
            <button
              onClick={() => scrollTo("about")}
              style={{ padding: "14px 36px", border: `1px solid ${C.gold}`, background: "transparent", color: C.gold, fontFamily: "'Cinzel', serif", fontSize: "12px", letterSpacing: "0.2em", cursor: "pointer", borderRadius: "2px", transition: "background 0.3s, color 0.3s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = C.gold; (e.currentTarget as HTMLButtonElement).style.color = C.bg; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = C.gold; }}
            >
              EXPLORE GLAZE ↓
            </button>
          </RevealDiv>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "120px", background: `linear-gradient(to bottom, transparent, ${C.bg})` }} />
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "120px 48px", maxWidth: "1100px", margin: "0 auto" }}>
        <RevealDiv>
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: "10px", color: C.accent, letterSpacing: "0.35em", marginBottom: "56px" }}>
            I — WHO WE ARE
          </p>
        </RevealDiv>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "80px" }}>
          <RevealDiv delay={80}>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "28px", fontWeight: 400, color: C.text, marginBottom: "32px", letterSpacing: "0.05em", lineHeight: 1.4 }}>
              A Small Agency.<br />A Sharp Team.
            </h2>
            <p style={{ fontSize: "18px", lineHeight: 1.8, color: C.muted, marginBottom: "20px" }}>
              Glaze is a four-person digital agency covering web development, design, marketing, and business. We keep the team small so every project gets full attention.
            </p>
            <p style={{ fontSize: "18px", lineHeight: 1.8, color: C.muted, marginBottom: "32px" }}>
              No bloated processes. No endless handoffs. Just four people who are very good at what they do — working together to build something worth showing.
            </p>
            <blockquote style={{ borderLeft: `2px solid ${C.gold}`, paddingLeft: "24px", margin: "0", fontStyle: "italic", color: C.gold, fontSize: "22px", lineHeight: 1.5 }}>
              "Built to build the right things."
            </blockquote>
          </RevealDiv>
          <RevealDiv delay={180}>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: "10px", color: C.accent, letterSpacing: "0.3em", marginBottom: "24px" }}>
              WHAT DRIVES US
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "40px" }}>
              {[
                { label: "Approach",   value: "Clarity over complexity, always." },
                { label: "Speed",      value: "Fast without being sloppy." },
                { label: "Honesty",    value: "Straight talk. No agency theatre." },
                { label: "Status",     value: "Open for new projects" },
              ].map(row => (
                <div key={row.label} style={{ borderBottom: `1px solid ${C.border}`, paddingBottom: "16px" }}>
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: "10px", color: C.gold, letterSpacing: "0.2em", display: "block", marginBottom: "4px" }}>
                    {row.label.toUpperCase()}
                  </span>
                  <span style={{ color: C.muted, fontSize: "17px" }}>{row.value}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: "16px 20px", border: `1px solid ${C.accent}`, borderRadius: "2px", display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: C.accent, display: "inline-block", animation: "pulse-gold 2s infinite" }} />
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: "11px", color: C.accent, letterSpacing: "0.15em" }}>
                OPEN FOR NEW PROJECTS
              </span>
            </div>
          </RevealDiv>
        </div>
      </section>

      <div style={{ width: "100%", height: "1px", background: C.border }} />

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding: "120px 48px", maxWidth: "1100px", margin: "0 auto" }}>
        <RevealDiv>
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: "10px", color: C.accent, letterSpacing: "0.35em", marginBottom: "56px" }}>
            II — WHAT WE DO
          </p>
        </RevealDiv>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "28px" }}>
          {services.map((s, i) => (
            <RevealDiv key={s.label} delay={i * 80}>
              <div
                style={{ padding: "32px 28px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: "3px", transition: "border-color 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = C.gold}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = C.border}
              >
                <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "15px", fontWeight: 400, color: C.gold, marginBottom: "24px", letterSpacing: "0.08em", paddingBottom: "16px", borderBottom: `1px solid ${C.border}` }}>
                  {s.label.toUpperCase()}
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {s.tags.map(tag => (
                    <span key={tag} style={{ padding: "4px 10px", border: `1px solid ${C.border}`, borderRadius: "2px", fontFamily: "'Crimson Pro', serif", fontSize: "14px", color: C.muted }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </RevealDiv>
          ))}
        </div>
      </section>

      <div style={{ width: "100%", height: "1px", background: C.border }} />

      {/* ── SHOWCASE ── */}
      <section id="showcase" style={{ padding: "120px 48px", maxWidth: "1200px", margin: "0 auto" }}>
        <RevealDiv>
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: "10px", color: C.accent, letterSpacing: "0.35em", marginBottom: "56px" }}>
            III — SELECTED WORK
          </p>
        </RevealDiv>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "28px" }}>
          {projects.map((p, i) => (
            <RevealDiv key={p.title} delay={i * 90}>
              <a
                href={p.live || undefined}
                target={p.live ? "_blank" : undefined}
                rel="noopener noreferrer"
                style={{ textDecoration: "none", display: "block" }}
              >
                <div
                  style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "4px", overflow: "hidden", transition: "transform 0.3s, box-shadow 0.3s, border-color 0.3s", cursor: p.live ? "pointer" : "default" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = "translateY(-6px)"; el.style.boxShadow = `0 20px 40px rgba(80,200,120,0.08)`; el.style.borderColor = p.live ? C.gold : C.accent; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; el.style.borderColor = C.border; }}
                >
                  <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
                    <img src={p.img} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "brightness(0.75) saturate(0.9)" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,26,15,0.85) 0%, transparent 60%)" }} />
                    <span style={{ position: "absolute", bottom: "14px", right: "16px", fontFamily: "'Cinzel', serif", fontSize: "13px", color: C.gold }}>
                      {p.year}
                    </span>
                    {p.live && (
                      <span style={{ position: "absolute", top: "14px", right: "14px", fontFamily: "'Cinzel', serif", fontSize: "10px", color: C.gold, letterSpacing: "0.15em", background: "rgba(10,26,15,0.8)", padding: "4px 10px", borderRadius: "2px", border: `1px solid ${C.gold}40` }}>
                        LIVE ↗
                      </span>
                    )}
                  </div>
                  <div style={{ padding: "24px 28px" }}>
                    <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "15px", fontWeight: 400, color: C.text, marginBottom: "12px", letterSpacing: "0.04em", lineHeight: 1.4 }}>
                      {p.title}
                    </h3>
                    <p style={{ fontSize: "16px", color: C.muted, lineHeight: 1.7, marginBottom: "20px" }}>{p.desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {p.stack.map(s => (
                        <span key={s} style={{ padding: "3px 10px", border: `1px solid ${C.accent}`, borderRadius: "2px", fontFamily: "'Crimson Pro', serif", fontSize: "13px", color: C.accent }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            </RevealDiv>
          ))}
        </div>
      </section>

      <div style={{ width: "100%", height: "1px", background: C.border }} />

      {/* ── TEAM ── */}
      <section id="team" style={{ padding: "120px 48px", maxWidth: "1100px", margin: "0 auto" }}>
        <RevealDiv>
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: "10px", color: C.accent, letterSpacing: "0.35em", marginBottom: "20px" }}>
            IV — THE TEAM
          </p>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 400, color: C.text, margin: "0 0 56px", letterSpacing: "0.08em" }}>
            FOUR PEOPLE. EVERY ANGLE COVERED.
          </h2>
        </RevealDiv>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
          {team.map((member, i) => (
            <RevealDiv key={member.name} delay={i * 100}>
              <div
                style={{ padding: "32px 28px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: "3px", transition: "border-color 0.3s, box-shadow 0.3s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = member.color; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 24px ${member.color}14`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = C.border; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: "56px", height: "56px", borderRadius: "50%",
                    background: `${member.color}18`,
                    border: `1px solid ${member.color}50`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: "24px",
                  }}
                >
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: "16px", color: member.color, fontWeight: 400 }}>
                    {member.initials}
                  </span>
                </div>

                <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "16px", fontWeight: 400, color: C.text, margin: "0 0 6px", letterSpacing: "0.05em" }}>
                  {member.name}
                </h3>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: "9px", color: member.color, letterSpacing: "0.22em", margin: "0 0 16px" }}>
                  {member.role.toUpperCase()}
                </p>
                <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "16px", color: C.muted, lineHeight: 1.7, margin: 0 }}>
                  {member.desc}
                </p>
              </div>
            </RevealDiv>
          ))}
        </div>
      </section>

      <div style={{ width: "100%", height: "1px", background: C.border }} />

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "120px 48px", maxWidth: "1100px", margin: "0 auto" }}>
        <RevealDiv>
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: "10px", color: C.accent, letterSpacing: "0.35em", marginBottom: "20px" }}>
            V — WORK WITH US
          </p>
          <p style={{ fontFamily: "'Crimson Pro', serif", fontStyle: "italic", fontSize: "22px", color: C.muted, margin: "0 0 56px" }}>
            "Tell us what you're building. We'll take it from there."
          </p>
        </RevealDiv>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "64px" }}>
          <RevealDiv delay={80}>
            {submitted ? (
              <div style={{ padding: "40px", background: C.surface, border: `1px solid ${C.gold}`, borderRadius: "4px", textAlign: "center" }}>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: "18px", color: C.gold, margin: "0 0 8px", letterSpacing: "0.1em" }}>
                  MESSAGE RECEIVED
                </p>
                <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "16px", color: C.muted }}>
                  We'll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {[
                  { label: "Name",  name: "name",  type: "text",  placeholder: "Your name" },
                  { label: "Email", name: "email", type: "email", placeholder: "your@email.com" },
                ].map(f => (
                  <div key={f.name}>
                    <label style={{ fontFamily: "'Cinzel', serif", fontSize: "10px", color: C.gold, letterSpacing: "0.2em", display: "block", marginBottom: "8px" }}>
                      {f.label.toUpperCase()}
                    </label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      value={(formState as any)[f.name]}
                      onChange={e => setFormState(p => ({ ...p, [f.name]: e.target.value }))}
                      required
                      style={{ width: "100%", padding: "12px 16px", border: `1px solid ${C.border}`, borderRadius: "2px", background: C.surface, color: C.text, fontFamily: "'Crimson Pro', serif", fontSize: "16px", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }}
                      onFocus={e => (e.target as HTMLInputElement).style.borderColor = C.accent}
                      onBlur={e  => (e.target as HTMLInputElement).style.borderColor = C.border}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ fontFamily: "'Cinzel', serif", fontSize: "10px", color: C.gold, letterSpacing: "0.2em", display: "block", marginBottom: "8px" }}>
                    WHAT ARE YOU BUILDING?
                  </label>
                  <textarea
                    placeholder="Tell us about your project..."
                    value={formState.message}
                    onChange={e => setFormState(p => ({ ...p, message: e.target.value }))}
                    required
                    rows={5}
                    style={{ width: "100%", padding: "12px 16px", border: `1px solid ${C.border}`, borderRadius: "2px", background: C.surface, color: C.text, fontFamily: "'Crimson Pro', serif", fontSize: "16px", outline: "none", resize: "vertical", boxSizing: "border-box", transition: "border-color 0.2s" }}
                    onFocus={e => (e.target as HTMLTextAreaElement).style.borderColor = C.accent}
                    onBlur={e  => (e.target as HTMLTextAreaElement).style.borderColor = C.border}
                  />
                </div>
                <button
                  type="submit"
                  style={{ padding: "14px 28px", background: "transparent", border: `1px solid ${C.gold}`, color: C.gold, fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "0.2em", cursor: "pointer", borderRadius: "2px", alignSelf: "flex-start", transition: "background 0.2s, color 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = C.gold; (e.currentTarget as HTMLButtonElement).style.color = C.bg; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = C.gold; }}
                >
                  SEND MESSAGE
                </button>
              </form>
            )}
          </RevealDiv>

          <RevealDiv delay={160}>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: "11px", color: C.gold, letterSpacing: "0.25em", marginBottom: "28px" }}>CHANNELS</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0", marginBottom: "48px" }}>
              {[
                { label: "GitHub",  url: "https://github.com" },
                { label: "LinkedIn", url: "https://linkedin.com" },
                { label: "hello@glaze.agency", url: "mailto:hello@glaze.agency" },
              ].map(link => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: "'Cinzel', serif", fontSize: "12px", color: C.muted, textDecoration: "none", letterSpacing: "0.1em", display: "flex", alignItems: "center", gap: "12px", padding: "14px 0", borderBottom: `1px solid ${C.border}`, transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = C.accent}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = C.muted}
                >
                  <span style={{ width: "24px", height: "1px", background: "currentColor", display: "inline-block", flexShrink: 0 }} />
                  {link.label.toUpperCase()} ↗
                </a>
              ))}
            </div>
            <div style={{ padding: "24px", border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.accent}`, borderRadius: "2px" }}>
              <p style={{ fontFamily: "'Crimson Pro', serif", fontStyle: "italic", fontSize: "18px", color: C.muted, margin: 0, lineHeight: 1.7 }}>
                "Small team. Full commitment. Every project gets our best."
              </p>
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: `1px solid ${C.border}`, padding: "40px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <GlazeEmblem size={40} opacity={0.4} />
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: "11px", color: C.muted, letterSpacing: "0.1em" }}>
            © 2025 GLAZE — ALL RIGHTS RESERVED
          </span>
        </div>
        <button
          onClick={switchMode}
          style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: "2px", padding: "8px 16px", cursor: "pointer", fontFamily: "'Cinzel', serif", fontSize: "10px", color: C.muted, letterSpacing: "0.12em", transition: "color 0.2s, border-color 0.2s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = C.gold; (e.currentTarget as HTMLButtonElement).style.borderColor = C.gold; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = C.muted; (e.currentTarget as HTMLButtonElement).style.borderColor = C.border; }}
        >
          ⇄ SWITCH STYLE
        </button>
      </footer>

      {/* Floating style switcher */}
      <button
        onClick={switchMode}
        style={{ position: "fixed", bottom: "28px", right: "28px", background: C.gold, color: C.bg, border: "none", borderRadius: "2px", padding: "10px 16px", fontFamily: "'Cinzel', serif", fontSize: "10px", letterSpacing: "0.15em", cursor: "pointer", boxShadow: "0 4px 20px rgba(212,175,55,0.2)", zIndex: 200 }}
      >
        ⇄ STYLE
      </button>
    </div>
  );
}
