"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

const NAV = [
  { label: "Overview", href: "/", icon: "◈", group: "core" },
  { label: "Builder", href: "/builder", icon: "⟨/⟩", group: "core" },
  { label: "APIs", href: "/platform/apis", icon: "∞", group: "core" },
  { label: "Runs", href: "/platform/runs", icon: "▷", group: "core" },
  { label: "Wallet", href: "/platform/wallet", icon: "◐", group: "core" },
  { label: "Robots", href: "/platform/robots", icon: "⬢", group: "fleet" },
  { label: "Brain", href: "/platform/brain", icon: "◎", group: "fleet" },
  { label: "Twin", href: "/platform/twin", icon: "⬡", group: "fleet" },
  { label: "Avatars", href: "/platform/avatars", icon: "◉", group: "create" },
  { label: "Studio", href: "/platform/studio", icon: "▣", group: "create" },
  { label: "Agents", href: "/platform/agents", icon: "◆", group: "create" },
  { label: "Roadmap", href: "/platform/roadmap", icon: "→", group: "system" },
  { label: "Settings", href: "/platform/settings", icon: "⚙", group: "system" },
];

const GROUPS: Record<string, string> = {
  core: "Core Platform",
  fleet: "Robot Fleet",
  create: "Creator Tools",
  system: "System",
};

export default function PlatformSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [initials, setInitials] = useState("??");
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      const e = data.session?.user?.email;
      if (e) { setEmail(e); setInitials(e.slice(0, 2).toUpperCase()); }
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      const e = session?.user?.email;
      if (e) { setEmail(e); setInitials(e.slice(0, 2).toUpperCase()); }
      else { setEmail(null); setInitials("??"); }
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  }

  const grouped = Object.entries(GROUPS).map(([key, label]) => ({
    key, label, items: NAV.filter(n => n.group === key),
  }));

  return (
    <aside style={{
      width: collapsed ? 64 : 240,
      flexShrink: 0,
      borderRight: "1px solid rgba(0,255,231,0.06)",
      background: "rgba(1,5,8,0.95)",
      backdropFilter: "blur(20px)",
      display: "flex",
      flexDirection: "column",
      transition: "width 0.3s ease",
      position: "sticky",
      top: 0,
      height: "100vh",
      overflow: "hidden",
    }}>

      {/* Top accent */}
      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(0,255,231,0.3), transparent)", flexShrink: 0 }} />

      {/* Logo */}
      <div style={{ padding: collapsed ? "20px 12px" : "20px 20px", borderBottom: "1px solid rgba(0,255,231,0.06)", flexShrink: 0 }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            border: "1px solid rgba(0,255,231,0.3)",
            background: "rgba(0,255,231,0.06)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, color: "#00ffe7",
            boxShadow: "0 0 12px rgba(0,255,231,0.1)",
            flexShrink: 0,
          }}>
            ◈
          </div>
          {!collapsed && (
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#00ffe7", letterSpacing: "0.12em", textTransform: "uppercase" as const }}>
                Shynvo
              </div>
              <div style={{ fontSize: 8, color: "rgba(0,255,231,0.35)", letterSpacing: "0.2em", textTransform: "uppercase" as const }}>
                Planetary Robot Interface
              </div>
            </div>
          )}
        </Link>
      </div>

      {/* Nav */}
      <div style={{ flex: 1, overflowY: "auto", padding: collapsed ? "12px 8px" : "12px 12px" }}>
        {grouped.map(({ key, label, items }) => (
          <div key={key} style={{ marginBottom: 16 }}>
            {!collapsed && (
              <div style={{ fontSize: 8, letterSpacing: "0.2em", color: "rgba(0,255,231,0.2)", textTransform: "uppercase" as const, padding: "0 8px 6px", fontWeight: 600 }}>
                {label}
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 2 }}>
              {items.map((item) => {
                const active = item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={collapsed ? item.label : undefined}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: collapsed ? "9px 10px" : "9px 12px",
                      borderRadius: 8,
                      border: active ? "1px solid rgba(0,255,231,0.2)" : "1px solid transparent",
                      background: active ? "rgba(0,255,231,0.06)" : "transparent",
                      color: active ? "#00ffe7" : "rgba(255,255,255,0.45)",
                      textDecoration: "none",
                      fontSize: 12,
                      fontWeight: active ? 600 : 400,
                      transition: "all 0.15s",
                      letterSpacing: "0.02em",
                      boxShadow: active ? "0 0 12px rgba(0,255,231,0.06)" : "none",
                      justifyContent: collapsed ? "center" : "flex-start",
                    }}
                  >
                    <span style={{ fontSize: 13, flexShrink: 0, color: active ? "#00ffe7" : "rgba(0,255,231,0.3)" }}>{item.icon}</span>
                    {!collapsed && <span>{item.label}</span>}
                    {!collapsed && active && <span style={{ marginLeft: "auto", width: 5, height: 5, borderRadius: "50%", background: "#00ffe7", boxShadow: "0 0 8px #00ffe7" }} />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User + collapse */}
      <div style={{ borderTop: "1px solid rgba(0,255,231,0.06)", padding: collapsed ? "12px 8px" : "12px", flexShrink: 0 }}>
        {/* Runtime status */}
        {!collapsed && (
          <div style={{
            marginBottom: 10,
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid rgba(0,255,231,0.08)",
            background: "rgba(0,255,231,0.03)",
          }}>
            <div style={{ fontSize: 8, letterSpacing: "0.2em", color: "rgba(0,255,231,0.3)", textTransform: "uppercase" as const, marginBottom: 4 }}>Runtime</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ position: "relative", display: "inline-flex" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00ffe7", display: "block" }} />
              </span>
              <span style={{ fontSize: 10, color: "#00ffe7", fontWeight: 500 }}>Platform Online</span>
            </div>
          </div>
        )}

        {/* User */}
        {email && (
          <div style={{ marginBottom: 8 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "8px 10px", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.05)",
              background: "rgba(255,255,255,0.02)",
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 6,
                border: "1px solid rgba(0,255,231,0.25)",
                background: "rgba(0,255,231,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, fontWeight: 700, color: "#00ffe7",
                flexShrink: 0,
              }}>
                {initials}
              </div>
              {!collapsed && (
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 11, color: "white", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>
                    {email}
                  </div>
                  <div style={{ fontSize: 9, color: "rgba(0,255,231,0.4)", letterSpacing: "0.08em" }}>AUTHENTICATED</div>
                </div>
              )}
            </div>
            {!collapsed && (
              <button
                onClick={signOut}
                style={{
                  width: "100%", marginTop: 4,
                  padding: "6px", borderRadius: 6,
                  border: "1px solid rgba(239,68,68,0.15)",
                  background: "rgba(239,68,68,0.04)",
                  color: "rgba(239,68,68,0.6)",
                  fontSize: 10, cursor: "pointer",
                  letterSpacing: "0.08em", textTransform: "uppercase" as const,
                  transition: "all 0.15s",
                }}
              >
                Sign Out
              </button>
            )}
          </div>
        )}

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            width: "100%", padding: "7px",
            borderRadius: 6,
            border: "1px solid rgba(0,255,231,0.08)",
            background: "rgba(0,255,231,0.03)",
            color: "rgba(0,255,231,0.4)",
            fontSize: 12, cursor: "pointer",
            transition: "all 0.15s",
          }}
        >
          {collapsed ? "›" : "‹ Collapse"}
        </button>
      </div>
    </aside>
  );
}
