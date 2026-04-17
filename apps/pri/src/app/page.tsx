"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const coreModules = [
  {
    title: "AI Command Brain",
    desc: "Parse goals, choose actions, and coordinate multi-step workflows with model-driven control.",
    href: "/platform/brain",
  },
  {
    title: "API Factory",
    desc: "Generate backend endpoints fast and turn every endpoint into an actionable tool for agents.",
    href: "/builder",
  },
  {
    title: "Autonomous Agents",
    desc: "Run domain-specific agents that execute tasks continuously with retries and fallback logic.",
    href: "/platform/agents",
  },
  {
    title: "Digital Twin Lab",
    desc: "Simulate and validate workflows before production deployment to reduce operational risk.",
    href: "/platform/twin",
  },
  {
    title: "Robot Fleet Ops",
    desc: "Monitor robot status, synchronize job states, and orchestrate physical + software operations.",
    href: "/platform/robots",
  },
  {
    title: "Runtime Wallet",
    desc: "Track usage, control token spending, and scale throughput without losing cost visibility.",
    href: "/platform/wallet",
  },
];

const buildSteps = [
  {
    title: "Connect",
    desc: "Link your API sources from Robot Backend and register available actions.",
  },
  {
    title: "Teach",
    desc: "Define behavior, memory, and constraints inside your AI control layer.",
  },
  {
    title: "Deploy",
    desc: "Launch workflows, monitor every run, and improve with real usage feedback.",
  },
];

export default function LandingPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const planets = [
      { label: "Builder", angle: 0,   radius: 190, speed: 0.0004, color: "#34d399", currentAngle: 0 },
      { label: "Agents",  angle: 72,  radius: 190, speed: 0.0004, color: "#60a5fa", currentAngle: 72 * Math.PI / 180 },
      { label: "Brain",   angle: 144, radius: 190, speed: 0.0004, color: "#a78bfa", currentAngle: 144 * Math.PI / 180 },
      { label: "Twin",    angle: 216, radius: 190, speed: 0.0004, color: "#f472b6", currentAngle: 216 * Math.PI / 180 },
      { label: "Studio",  angle: 288, radius: 190, speed: 0.0004, color: "#fb923c", currentAngle: 288 * Math.PI / 180 },
    ];
    const outer = [
      { label: "Wallet", angle: 30,  radius: 300, speed: 0.00022, color: "#34d399", currentAngle: 30 * Math.PI / 180 },
      { label: "Robots", angle: 120, radius: 300, speed: 0.00022, color: "#60a5fa", currentAngle: 120 * Math.PI / 180 },
      { label: "APIs",   angle: 210, radius: 300, speed: 0.00022, color: "#a78bfa", currentAngle: 210 * Math.PI / 180 },
      { label: "Runs",   angle: 300, radius: 300, speed: 0.00022, color: "#fb923c", currentAngle: 300 * Math.PI / 180 },
    ];

    let animId: number;
    let last = performance.now();

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    resize();
    window.addEventListener("resize", resize);

    function draw(now: number) {
      if (!canvas || !ctx) return;
      const dt = now - last;
      last = now;
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      const cx = W / 2;
      const cy = H / 2;
      ctx.clearRect(0, 0, W, H);

      [190, 300].forEach((r, i) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = i === 0 ? "rgba(52,211,153,0.1)" : "rgba(52,211,153,0.06)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 8]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 55);
      g.addColorStop(0, "rgba(52,211,153,0.3)");
      g.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(cx, cy, 55, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, 26, 0, Math.PI * 2);
      ctx.fillStyle = "#060e0a";
      ctx.fill();
      ctx.strokeStyle = "rgba(52,211,153,0.5)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = "#34d399";
      ctx.font = "bold 8px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("SHYNVO", cx, cy - 4);
      ctx.fillStyle = "rgba(52,211,153,0.5)";
      ctx.font = "6px monospace";
      ctx.fillText("PRI", cx, cy + 5);

      planets.forEach((p) => {
        p.currentAngle += p.speed * dt;
        const x = cx + Math.cos(p.currentAngle) * p.radius;
        const y = cy + Math.sin(p.currentAngle) * p.radius;
        const pg = ctx.createRadialGradient(x, y, 0, x, y, 20);
        pg.addColorStop(0, p.color + "25");
        pg.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fillStyle = pg;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y, 16, 0, Math.PI * 2);
        ctx.fillStyle = "#060e0a";
        ctx.fill();
        ctx.strokeStyle = p.color + "50";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = p.color;
        ctx.font = "10px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("●", x, y - 3);
        ctx.fillStyle = "rgba(255,255,255,0.55)";
        ctx.font = "6px monospace";
        ctx.fillText(p.label, x, y + 6);
      });

      outer.forEach((p) => {
        p.currentAngle += p.speed * dt;
        const x = cx + Math.cos(p.currentAngle) * p.radius;
        const y = cy + Math.sin(p.currentAngle) * p.radius;
        ctx.beginPath();
        ctx.arc(x, y, 13, 0, Math.PI * 2);
        ctx.fillStyle = "#060e0a";
        ctx.fill();
        ctx.strokeStyle = p.color + "35";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = p.color + "cc";
        ctx.font = "8px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("◦", x, y - 2);
        ctx.fillStyle = "rgba(255,255,255,0.35)";
        ctx.font = "6px monospace";
        ctx.fillText(p.label, x, y + 6);
      });

      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#060e0a",
        color: "white",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(52,211,153,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(52,211,153,0.03) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: -140,
          right: -120,
          width: 460,
          height: 460,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(52,211,153,0.22) 0%, rgba(52,211,153,0.05) 45%, transparent 70%)",
          filter: "blur(12px)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "24px clamp(18px, 6vw, 56px)",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              border: "1px solid rgba(52,211,153,0.45)",
              background: "rgba(52,211,153,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 22px rgba(52,211,153,0.22)",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#34d399",
              }}
            />
          </div>
          <span
            style={{
              fontSize: 12,
              letterSpacing: "0.2em",
              color: "rgba(52,211,153,0.85)",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Shynvo PRI
          </span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Link
            href="/login"
            style={{
              padding: "9px 18px",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.04)",
              color: "rgba(255,255,255,0.78)",
              textDecoration: "none",
              fontSize: 13,
            }}
          >
            Sign In
          </Link>
          <Link
            href="/register"
            style={{
              padding: "9px 18px",
              borderRadius: 14,
              border: "1px solid rgba(52,211,153,0.35)",
              background:
                "linear-gradient(135deg, rgba(52,211,153,0.2), rgba(52,211,153,0.1))",
              color: "#6ee7b7",
              textDecoration: "none",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            Get Started
          </Link>
        </div>
      </nav>

      <section
        style={{
          maxWidth: 1220,
          margin: "0 auto",
          padding: "10px clamp(18px, 6vw, 56px) 50px",
          position: "relative",
          zIndex: 10,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
          gap: 26,
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px",
              borderRadius: 999,
              border: "1px solid rgba(52,211,153,0.2)",
              background: "rgba(52,211,153,0.08)",
              fontSize: 11,
              color: "#6ee7b7",
              marginBottom: 20,
              fontWeight: 600,
              letterSpacing: "0.05em",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#34d399",
                boxShadow: "0 0 12px rgba(52,211,153,0.7)",
              }}
            />
            AI Runtime + Robot APIs Connected
          </div>

          <h1
            style={{
              fontSize: "clamp(34px, 6vw, 68px)",
              fontWeight: 800,
              lineHeight: 1.04,
              marginBottom: 16,
              letterSpacing: "-0.03em",
            }}
          >
            Build your
            <br />
            <span
              style={{
                color: "#34d399",
                textShadow: "0 0 24px rgba(52,211,153,0.28)",
              }}
            >
              AI Machine
            </span>
            <br />
            in one platform
          </h1>

          <p
            style={{
              fontSize: 17,
              lineHeight: 1.65,
              color: "rgba(255,255,255,0.58)",
              maxWidth: 580,
              marginBottom: 30,
            }}
          >
            Shynvo combines your AI control backend and your generated Robot
            APIs into one orchestration layer where agents can reason, execute,
            and scale real workflows.
          </p>

          <div
            style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}
          >
            <Link
              href="/register"
              style={{
                padding: "14px 28px",
                borderRadius: 14,
                border: "1px solid rgba(52,211,153,0.38)",
                background:
                  "linear-gradient(135deg, rgba(52,211,153,0.2), rgba(52,211,153,0.1))",
                color: "#6ee7b7",
                textDecoration: "none",
                fontSize: 15,
                fontWeight: 700,
              }}
            >
              Launch Free
            </Link>
            <Link
              href="/builder"
              style={{
                padding: "14px 28px",
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.04)",
                color: "rgba(255,255,255,0.84)",
                textDecoration: "none",
                fontSize: 15,
                fontWeight: 500,
              }}
            >
              Open Builder
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))",
              gap: 12,
              maxWidth: 620,
            }}
          >
            {[
              ["2", "Backends Unified"],
              ["AI", "Decision Layer"],
              ["Live", "Execution APIs"],
              ["24/7", "Autonomous Runs"],
            ].map(([value, label]) => (
              <div
                key={label}
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.02)",
                  borderRadius: 14,
                  padding: "14px 12px",
                }}
              >
                <div style={{ color: "#6ee7b7", fontWeight: 700, fontSize: 20 }}>
                  {value}
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 26,
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))",
            boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
            padding: "18px 8px 22px",
          }}
        >
          <canvas
            ref={canvasRef}
            style={{
              width: "100%",
              maxWidth: 520,
              height: "auto",
              aspectRatio: "1 / 1",
              display: "block",
              margin: "0 auto",
            }}
          />
        </div>
      </section>

      <section
        style={{
          maxWidth: 1220,
          margin: "0 auto",
          padding: "18px clamp(18px, 6vw, 56px) 36px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          style={{
            border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: 22,
            background:
              "linear-gradient(160deg, rgba(52,211,153,0.08), rgba(255,255,255,0.02))",
            padding: "20px clamp(16px,4vw,30px)",
            display: "grid",
            gap: 14,
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          }}
        >
          {buildSteps.map((step, idx) => (
            <div key={step.title}>
              <div
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.38)",
                  marginBottom: 6,
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                }}
              >
                Step 0{idx + 1}
              </div>
              <h3 style={{ fontSize: 18, marginBottom: 6 }}>{step.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.56)", fontSize: 14, lineHeight: 1.6 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          maxWidth: 1220,
          margin: "0 auto",
          padding: "30px clamp(18px, 6vw, 56px) 84px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "clamp(26px,3vw,38px)",
            fontWeight: 750,
            marginBottom: 10,
          }}
        >
          Everything you need to scale an AI machine
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "rgba(255,255,255,0.44)",
            fontSize: 14,
            marginBottom: 34,
            maxWidth: 620,
            marginInline: "auto",
          }}
        >
          Attractive UI outside, powerful orchestration inside. Start with one
          workflow and expand into a complete autonomous operations platform.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: 16,
          }}
        >
          {coreModules.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              style={{
                display: "block",
                padding: 22,
                borderRadius: 20,
                border: "1px solid rgba(255,255,255,0.08)",
                background:
                  "linear-gradient(170deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
                textDecoration: "none",
                transition: "transform 0.18s ease",
              }}
            >
              <h3
                style={{
                  color: "white",
                  fontWeight: 650,
                  fontSize: 16,
                  margin: "0 0 8px",
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontSize: 13,
                  lineHeight: 1.72,
                  color: "rgba(255,255,255,0.46)",
                  margin: 0,
                }}
              >
                {feature.desc}
              </p>
              <div
                style={{
                  marginTop: 13,
                  fontSize: 11,
                  color: "rgba(52,211,153,0.68)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Explore Module
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "24px clamp(18px, 6vw, 56px)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 14,
          position: "relative",
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.3)",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
          }}
        >
          Shynvo PRI
        </span>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {[["Builder", "/builder"], ["Agents", "/platform/agents"], ["Runs", "/platform/runs"], ["Wallet", "/platform/wallet"]].map(
            ([label, href]) => (
              <Link
                key={label}
                href={href}
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.36)",
                  textDecoration: "none",
                }}
              >
                {label}
              </Link>
            )
          )}
        </div>
      </footer>
    </main>
  );
}
