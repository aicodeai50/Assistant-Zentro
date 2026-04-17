"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

type Props = { title: string; subtitle?: string; };

export default function PlatformTopbar({ title, subtitle }: Props) {
  const [time, setTime] = useState("");
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    function tick() {
      const now = new Date();
      setTime(now.toUTCString().slice(0, 25));
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      setEmail(data.session?.user?.email || null);
    });
  }, []);

  return (
    <header style={{
      borderBottom: "1px solid rgba(0,255,231,0.08)",
      background: "rgba(1,5,8,0.9)",
      backdropFilter: "blur(20px)",
      position: "sticky",
      top: 0,
      zIndex: 50,
    }}>
      {/* Top accent line */}
      <div style={{
        height: 1,
        background: "linear-gradient(90deg, transparent, rgba(0,255,231,0.4), rgba(14,165,233,0.4), transparent)",
      }} />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "12px 24px", minHeight: 64 }}>

        {/* Left — breadcrumb + title */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
            <span style={{ fontSize: 9, letterSpacing: "0.3em", color: "rgba(0,255,231,0.4)", textTransform: "uppercase" }}>
              SHYNVO PRI
            </span>
            <span style={{ color: "rgba(0,255,231,0.2)", fontSize: 10 }}>›</span>
            <span style={{ fontSize: 9, letterSpacing: "0.2em", color: "rgba(0,255,231,0.3)", textTransform: "uppercase" }}>
              Command Center
            </span>
          </div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "white", letterSpacing: "-0.01em", lineHeight: 1 }}>
            {title}
          </h1>
          {subtitle && (
            <p style={{ fontSize: 11, color: "rgba(0,255,231,0.3)", marginTop: 2, letterSpacing: "0.02em" }}>{subtitle}</p>
          )}
        </div>

        {/* Right — system indicators */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>

          {/* Clock */}
          <div style={{
            padding: "5px 12px",
            borderRadius: 6,
            border: "1px solid rgba(0,255,231,0.08)",
            background: "rgba(0,20,25,0.6)",
            fontFamily: "var(--font-geist-mono)",
            fontSize: 10,
            color: "rgba(0,255,231,0.5)",
            letterSpacing: "0.05em",
          }}>
            {time}
          </div>

          {/* Status badges */}
          {[
            { label: "Runtime Online", color: "#00ffe7" },
            { label: "Production", color: "#0ea5e9" },
            { label: "Strategic", color: "#a855f7" },
          ].map((b) => (
            <div key={b.label} style={{
              display: "flex", alignItems: "center", gap: 5,
              padding: "5px 10px",
              borderRadius: 6,
              border: `1px solid ${b.color}18`,
              background: `${b.color}08`,
              fontSize: 10,
              color: b.color,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: b.color, boxShadow: `0 0 6px ${b.color}` }} />
              {b.label}
            </div>
          ))}

          {/* User */}
          {email && (
            <div style={{
              padding: "5px 12px",
              borderRadius: 6,
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.03)",
              fontSize: 10,
              color: "rgba(255,255,255,0.4)",
            }}>
              {email.split("@")[0].toUpperCase()}
            </div>
          )}

          <Link href="/builder" style={{
            padding: "6px 14px",
            borderRadius: 6,
            border: "1px solid rgba(0,255,231,0.25)",
            background: "rgba(0,255,231,0.08)",
            fontSize: 11,
            color: "#00ffe7",
            textDecoration: "none",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}>
            + New API
          </Link>
        </div>
      </div>
    </header>
  );
}
