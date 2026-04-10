"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// Supreme card chibi canvas animation
function SupremeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;

    type Particle = {
      x: number; y: number; vx: number; vy: number;
      life: number; maxLife: number; type: "spark" | "ambient";
      size: number;
    };

    let particles: Particle[] = [];

    for (let i = 0; i < 22; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(Math.random() * 0.5 + 0.2),
        life: Math.random() * 100,
        maxLife: 100 + Math.random() * 60,
        type: "ambient",
        size: Math.random() * 2 + 0.5,
      });
    }

    let hammerAngle = 0;
    let hammerProgress = 0;
    let bobY = 0;
    let lastImpact = false;

    function spawnSparks(cx: number, cy: number) {
      const count = 8 + Math.floor(Math.random() * 5);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2.5 + 0.8;
        particles.push({
          x: cx, y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1,
          life: 0,
          maxLife: 20 + Math.random() * 20,
          type: "spark",
          size: Math.random() * 2 + 1,
        });
      }
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      const grad = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.8);
      grad.addColorStop(0, "#0a1a0f");
      grad.addColorStop(1, "#050e08");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      frameRef.current++;
      const f = frameRef.current;

      hammerProgress = (f % 120) / 120;
      if (hammerProgress < 0.4) {
        hammerAngle = -0.9 + hammerProgress / 0.4 * 1.5;
        lastImpact = false;
      } else if (hammerProgress < 0.55) {
        hammerAngle = 0.6 - (hammerProgress - 0.4) / 0.15 * 1.3;
        if (!lastImpact && hammerProgress > 0.5) {
          spawnSparks(W / 2 + 14, H / 2 + 28);
          lastImpact = true;
        }
      } else {
        hammerAngle = -0.7;
      }

      bobY = Math.sin(f * 0.08) * 2;
      const cx = W / 2;
      const cy = H / 2 + bobY;

      const groundGrad = ctx.createRadialGradient(cx, cy + 36, 0, cx, cy + 36, 38);
      groundGrad.addColorStop(0, "rgba(80,200,120,0.28)");
      groundGrad.addColorStop(1, "rgba(80,200,120,0)");
      ctx.beginPath();
      ctx.ellipse(cx, cy + 36, 38, 10, 0, 0, Math.PI * 2);
      ctx.fillStyle = groundGrad;
      ctx.fill();

      ctx.fillStyle = "#1a2e1e";
      ctx.strokeStyle = "#50C878";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(cx - 10, cy - 8, 20, 22, 3);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#e8c9a0";
      ctx.strokeStyle = "#D4AF37";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(cx, cy - 18, 11, 13, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#1a1a1a";
      ctx.beginPath();
      ctx.ellipse(cx, cy - 24, 10, 7, 0, 0, Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(cx + 3, cy - 30);
      ctx.quadraticCurveTo(cx + 8, cy - 36, cx + 5, cy - 31);
      ctx.fillStyle = "#1a1a1a";
      ctx.fill();

      ctx.fillStyle = "#2a4a30";
      ctx.beginPath();
      ctx.ellipse(cx - 4, cy - 18, 2.5, 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(cx + 4, cy - 18, 2.5, 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.ellipse(cx - 3, cy - 19, 0.8, 0.8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(cx + 5, cy - 19, 0.8, 0.8, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#1a2e1e";
      ctx.strokeStyle = "#50C878";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.roundRect(cx - 9, cy + 14, 7, 12, 2);
      ctx.fill(); ctx.stroke();
      ctx.beginPath();
      ctx.roundRect(cx + 2, cy + 14, 7, 12, 2);
      ctx.fill(); ctx.stroke();

      ctx.fillStyle = "#1a2e1e";
      ctx.strokeStyle = "#50C878";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.roundRect(cx - 18, cy - 5, 8, 16, 3);
      ctx.fill(); ctx.stroke();

      ctx.save();
      ctx.translate(cx + 10, cy - 5);
      ctx.rotate(hammerAngle);
      ctx.fillStyle = "#1a2e1e";
      ctx.strokeStyle = "#50C878";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.roundRect(-3, 0, 7, 14, 3);
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = "#e8c9a0";
      ctx.beginPath();
      ctx.ellipse(0, 14, 4, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#8B6914";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(0, 14);
      ctx.lineTo(8, 26);
      ctx.stroke();
      ctx.fillStyle = "#D4AF37";
      ctx.strokeStyle = "#a07010";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(4, 24, 12, 7, 2);
      ctx.fill(); ctx.stroke();
      ctx.restore();

      particles = particles.filter(p => {
        if (p.type === "ambient") {
          p.x += p.vx;
          p.y += p.vy;
          p.life += 1;
          if (p.y < 0 || p.life > p.maxLife) {
            p.x = Math.random() * W;
            p.y = H + 2;
            p.life = 0;
          }
          const alpha = 0.15 + Math.sin(p.life / p.maxLife * Math.PI) * 0.4;
          ctx.fillStyle = `rgba(80,200,120,${alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          return true;
        } else {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.12;
          p.life += 1;
          if (p.life > p.maxLife) return false;
          const alpha = 1 - p.life / p.maxLife;
          ctx.fillStyle = `rgba(212,175,55,${alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (1 - p.life / p.maxLife * 0.5), 0, Math.PI * 2);
          ctx.fill();
          return true;
        }
      });

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={260}
      height={180}
      style={{ display: "block", borderRadius: "6px" }}
    />
  );
}

export function StylePicker() {
  const router = useRouter();
  const [hoveredSupreme, setHoveredSupreme] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("asmit-style-mode");
    if (saved === "minimalist") router.push("/minimalist");
    else if (saved === "classic") router.push("/classic");
  }, [router]);

  const selectMode = (mode: "minimalist" | "classic") => {
    localStorage.setItem("asmit-style-mode", mode);
    router.push(`/${mode}`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050e08",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        fontFamily: "'Cinzel', serif",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "64px" }}>
        <p style={{ color: "#50C878", letterSpacing: "0.3em", fontSize: "11px", marginBottom: "16px", fontFamily: "'DM Mono', monospace" }}>
          CHOOSE YOUR EXPERIENCE
        </p>
        <h1
          style={{
            fontFamily: "'Cinzel', serif",
            color: "#F0F4F0",
            fontSize: "clamp(36px, 7vw, 64px)",
            fontWeight: 400,
            letterSpacing: "0.18em",
            margin: 0,
          }}
        >
          Glaze
        </h1>
        <p style={{ color: "#6b8870", fontFamily: "'Crimson Pro', serif", fontSize: "18px", marginTop: "10px" }}>
          Digital Agency · Web · Design · Marketing · Growth
        </p>
      </div>

      {/* Cards */}
      <div
        style={{
          display: "flex",
          gap: "28px",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: "1100px",
          width: "100%",
        }}
      >
        {/* MINIMALIST CARD */}
        <button
          onClick={() => selectMode("minimalist")}
          style={{
            background: "#fafaf9",
            border: "1px solid #e0ddd8",
            borderRadius: "12px",
            width: "300px",
            padding: "0",
            cursor: "pointer",
            textAlign: "left",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            overflow: "hidden",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-6px)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 20px 40px rgba(0,0,0,0.3)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
          }}
        >
          <div
            style={{
              background: "#fafaf9",
              height: "180px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderBottom: "1px solid #e0ddd8",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "38px",
                color: "#1a1a18",
                fontWeight: 400,
                letterSpacing: "0.06em",
              }}
            >
              Glaze
            </span>
            <div style={{ width: "60px", height: "1px", background: "#2d5a3d" }} />
          </div>
          <div style={{ padding: "24px 28px 28px" }}>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#6b6860", letterSpacing: "0.2em", margin: "0 0 6px" }}>
              MINIMALIST
            </p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "15px", color: "#1a1a18", margin: "0 0 10px" }}>
              Signal over noise.
            </p>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: "#6b6860", margin: 0, lineHeight: 1.6 }}>
              Clean layout. Fast. Content first.
            </p>
            <div
              style={{
                marginTop: "18px",
                display: "inline-block",
                padding: "7px 16px",
                border: "1px solid #2d5a3d",
                color: "#2d5a3d",
                fontFamily: "'DM Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.12em",
                borderRadius: "4px",
              }}
            >
              ENTER →
            </div>
          </div>
        </button>

        {/* CLASSIC CARD */}
        <button
          onClick={() => selectMode("classic")}
          style={{
            background: "#0a1a0f",
            border: "1px solid #1a4a2a",
            borderRadius: "12px",
            width: "300px",
            padding: "0",
            cursor: "pointer",
            textAlign: "left",
            transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
            overflow: "hidden",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-6px)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 20px 40px rgba(80,200,120,0.12)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#50C878";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#1a4a2a";
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #0a1a0f 0%, #0d2216 50%, #0a1a0f 100%)",
              height: "180px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderBottom: "1px solid #1a4a2a",
              gap: "8px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "120px",
                height: "120px",
                border: "1px solid rgba(80,200,120,0.08)",
                borderRadius: "50%",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            />
            <span
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "28px",
                color: "#D4AF37",
                fontWeight: 400,
                letterSpacing: "0.2em",
                position: "relative",
              }}
            >
              Glaze
            </span>
            <div style={{ width: "60px", height: "1px", background: "#50C878", position: "relative" }} />
          </div>
          <div style={{ padding: "24px 28px 28px" }}>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#50C878", letterSpacing: "0.2em", margin: "0 0 6px" }}>
              CLASSIC
            </p>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: "15px", color: "#F0F4F0", margin: "0 0 10px", fontWeight: 400 }}>
              Dark. Refined. Intentional.
            </p>
            <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "13px", color: "#6b8870", margin: 0, lineHeight: 1.6 }}>
              Rich visuals. Full story. Premium feel.
            </p>
            <div
              style={{
                marginTop: "18px",
                display: "inline-block",
                padding: "7px 16px",
                border: "1px solid #D4AF37",
                color: "#D4AF37",
                fontFamily: "'Cinzel', serif",
                fontSize: "11px",
                letterSpacing: "0.12em",
                borderRadius: "4px",
              }}
            >
              ENTER →
            </div>
          </div>
        </button>

        {/* SUPREME CARD (LOCKED) */}
        <div
          style={{
            background: "#050e08",
            border: "1px solid #0e2016",
            borderRadius: "12px",
            width: "300px",
            cursor: "default",
            textAlign: "left",
            overflow: "hidden",
            position: "relative",
          }}
          onMouseEnter={() => setHoveredSupreme(true)}
          onMouseLeave={() => setHoveredSupreme(false)}
        >
          <div
            style={{
              height: "180px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderBottom: "1px solid #0e2016",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <SupremeCanvas />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(5,14,8,0.35)",
                pointerEvents: "none",
              }}
            />
          </div>
          <div style={{ padding: "24px 28px 28px" }}>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#2a4a30", letterSpacing: "0.2em", margin: "0 0 6px" }}>
              SUPREME
            </p>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: "14px", color: "#3a5a40", margin: "0 0 10px", fontWeight: 400, fontStyle: "italic" }}>
              "Forged in silence. Revealed in time."
            </p>
            <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "13px", color: "#2a4a30", margin: 0, lineHeight: 1.6 }}>
              Something greater is being built.
            </p>
          </div>

          {hoveredSupreme && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "rgba(5,14,8,0.92)",
                border: "1px solid #2a4a30",
                padding: "10px 18px",
                borderRadius: "6px",
                fontFamily: "'Cinzel', serif",
                fontSize: "11px",
                color: "#50C878",
                letterSpacing: "0.1em",
                whiteSpace: "nowrap",
                pointerEvents: "none",
                zIndex: 10,
              }}
            >
              The peak is being forged.
            </div>
          )}
        </div>
      </div>

      <p
        style={{
          marginTop: "56px",
          fontFamily: "'DM Mono', monospace",
          fontSize: "11px",
          color: "#2a4a30",
          letterSpacing: "0.15em",
          textAlign: "center",
        }}
      >
        YOUR CHOICE IS REMEMBERED — SWITCH ANYTIME
      </p>
    </div>
  );
}
