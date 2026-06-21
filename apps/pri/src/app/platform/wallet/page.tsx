"use client";
import PlatformLayout from "@/components/platform/PlatformLayout";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { getStoredApiKey } from "@/lib/auth";

type Wallet = {
  balance?: number;
  plan_name?: string;
  total_purchased?: number;
  total_spent?: number;
};

const PLANS = [
  { name: "Free", tokens: "10,000", price: "$0", color: "#ffffff", features: ["10K tokens/mo", "Basic API access", "Community support"] },
  { name: "Builder", tokens: "100,000", price: "$9", color: "#00ffe7", features: ["100K tokens/mo", "Full API access", "Priority support", "Advanced analytics"] },
  { name: "Pro", tokens: "500,000", price: "$29", color: "#a855f7", features: ["500K tokens/mo", "Unlimited APIs", "Agent access", "Custom integrations"] },
  { name: "Enterprise", tokens: "∞", price: "Custom", color: "#f59e0b", features: ["Unlimited tokens", "Dedicated support", "SLA guarantee", "White-label options"] },
];

export default function WalletPage() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const key = getStoredApiKey();
    if (!key) return;
    apiFetch<Wallet>("/account/wallet", key)
      .then(data => setWallet(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const balance = wallet?.balance ?? "--";
  const plan = wallet?.plan_name ?? "Free";
  const purchased = wallet?.total_purchased ?? "--";
  const spent = wallet?.total_spent ?? "--";
  const pct = wallet?.balance && wallet?.total_purchased ? Math.round((wallet.balance / wallet.total_purchased) * 100) : 0;

  return (
    <PlatformLayout title="Wallet" subtitle="Token economy, credits, and platform billing.">
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

        {/* Hero */}
        <div style={{ borderRadius: 20, border: "1px solid rgba(0,255,231,0.12)", background: "linear-gradient(135deg, rgba(0,255,231,0.03), rgba(14,165,233,0.03))", padding: "40px 48px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 12, left: 12, width: 20, height: 20, borderTop: "1px solid rgba(0,255,231,0.3)", borderLeft: "1px solid rgba(0,255,231,0.3)" }} />
          <div style={{ position: "absolute", bottom: 12, right: 12, width: 20, height: 20, borderBottom: "1px solid rgba(0,255,231,0.3)", borderRight: "1px solid rgba(0,255,231,0.3)" }} />
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: "0.3em", color: "rgba(0,255,231,0.4)", textTransform: "uppercase", marginBottom: 12 }}>Billing</div>
              <h1 style={{ fontSize: 40, fontWeight: 800, color: "white", marginBottom: 16, letterSpacing: "-0.02em" }}>
                Token <span style={{ color: "#00ffe7", textShadow: "0 0 30px rgba(0,255,231,0.4)" }}>Wallet</span>
              </h1>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", lineHeight: 1.8, maxWidth: 500 }}>
                Every API call, agent run, and Brain query costs tokens. Buy credits, track consumption, and upgrade your plan as you scale.
              </p>
            </div>
            <a href="https://shynvo.lemonsqueezy.com/checkout" target="_blank" rel="noreferrer" style={{
              padding: "14px 32px", borderRadius: 10,
              border: "1px solid rgba(0,255,231,0.3)",
              background: "rgba(0,255,231,0.1)",
              color: "#00ffe7", textDecoration: "none",
              fontSize: 14, fontWeight: 700, letterSpacing: "0.05em",
            }}>
              + Buy Tokens
            </a>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {[
            { label: "Balance", value: balance, sub: "tokens remaining", color: "#00ffe7" },
            { label: "Plan", value: plan, sub: "current tier", color: "#a855f7" },
            { label: "Purchased", value: purchased, sub: "total bought", color: "#0ea5e9" },
            { label: "Spent", value: spent, sub: "total consumed", color: "#f59e0b" },
          ].map(s => (
            <div key={s.label} style={{ borderRadius: 16, border: `1px solid ${s.color}15`, background: "rgba(0,8,14,0.8)", padding: "24px 28px" }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>{s.label}</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: s.color, marginBottom: 6 }}>
                {loading ? "—" : s.value}
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Usage bar */}
        {wallet && (
          <div style={{ borderRadius: 20, border: "1px solid rgba(0,255,231,0.08)", background: "rgba(0,8,14,0.8)", padding: "32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: "white" }}>Token Usage</div>
              <span style={{ fontSize: 12, color: "rgba(0,255,231,0.6)" }}>{pct}% remaining</span>
            </div>
            <div style={{ height: 8, borderRadius: 999, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 999, width: `${pct}%`, background: "linear-gradient(90deg, #00ffe7, #0ea5e9)", transition: "width 1s ease", boxShadow: "0 0 12px rgba(0,255,231,0.4)" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
              <span>0 tokens</span>
              <span>{purchased} purchased</span>
            </div>
          </div>
        )}

        {/* Plans */}
        <div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.25em", color: "rgba(0,255,231,0.3)", textTransform: "uppercase", marginBottom: 6 }}>Pricing</div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: "white" }}>Choose Your Plan</h3>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
            {PLANS.map(p => (
              <div key={p.name} style={{ borderRadius: 18, border: `1px solid ${p.color}18`, background: "rgba(0,8,14,0.8)", padding: "28px" }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: p.color, marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontSize: 32, fontWeight: 800, color: "white", marginBottom: 4 }}>{p.price}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 20 }}>{p.tokens} tokens/mo</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                  {p.features.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
                      <span style={{ color: p.color, fontSize: 10 }}>✓</span> {f}
                    </div>
                  ))}
                </div>
                <a href="https://shynvo.lemonsqueezy.com/checkout" target="_blank" rel="noreferrer" style={{
                  display: "block", textAlign: "center",
                  padding: "10px", borderRadius: 8,
                  border: `1px solid ${p.color}25`,
                  background: `${p.color}08`,
                  color: p.color, textDecoration: "none",
                  fontSize: 12, fontWeight: 600,
                }}>
                  {p.name === "Free" ? "Current" : "Upgrade →"}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PlatformLayout>
  );
}
