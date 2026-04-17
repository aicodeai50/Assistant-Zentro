"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleRegister() {
    if (!email || !password) { setError("Email and password required"); return; }
    if (password !== confirm) { setError("Passwords do not match"); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
    setLoading(true);
    setError("");
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) { setError(error.message); return; }
      setSuccess("Account created! Redirecting to sign in...");
      setTimeout(() => router.push("/login"), 2000);
    } catch {
      setError("Connection failed");
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    width: "100%",
    background: "#08110d",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 16,
    padding: "14px 50px 14px 18px",
    color: "#6ee7b7",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box" as const,
  };

  const toggleStyle = {
    position: "absolute" as const,
    right: 14,
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "rgba(255,255,255,0.35)",
    fontSize: 13,
    padding: 4,
  };

  return (
    <main style={{ minHeight: "100vh", background: "#060e0a", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "monospace", padding: 24 }}>
      <div style={{ position: "fixed", inset: 0, backgroundImage: "linear-gradient(rgba(52,211,153,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(52,211,153,0.03) 1px,transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
      <div style={{ width: "100%", maxWidth: 420, position: "relative", zIndex: 10 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", marginBottom: 24 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", border: "1px solid rgba(52,211,153,0.4)", background: "rgba(52,211,153,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#34d399" }} />
            </div>
            <span style={{ fontSize: 12, letterSpacing: "0.2em", color: "rgba(52,211,153,0.8)", textTransform: "uppercase" as const }}>Shynvo PRI</span>
          </Link>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: "white", margin: "0 0 8px" }}>Create account</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, margin: 0 }}>Join the robot platform</p>
        </div>

        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 28, padding: 36 }}>
          {error && (
            <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 12, padding: "12px 16px", marginBottom: 20, color: "#fca5a5", fontSize: 13 }}>
              {error}
            </div>
          )}
          {success && (
            <div style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: 12, padding: "12px 16px", marginBottom: 20, color: "#6ee7b7", fontSize: 13 }}>
              {success}
            </div>
          )}

          {/* Email */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 8, textTransform: "uppercase" as const, letterSpacing: "0.1em" }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{ ...inputStyle, padding: "14px 18px" }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 8, textTransform: "uppercase" as const, letterSpacing: "0.1em" }}>Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="min 6 characters"
                style={inputStyle}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={toggleStyle}>
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 8, textTransform: "uppercase" as const, letterSpacing: "0.1em" }}>Confirm Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showConfirm ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleRegister()}
                placeholder="repeat password"
                style={inputStyle}
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={toggleStyle}>
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>
            {/* Live match indicator */}
            {confirm.length > 0 && (
              <div style={{ marginTop: 6, fontSize: 12, color: password === confirm ? "#34d399" : "#f87171" }}>
                {password === confirm ? "✓ Passwords match" : "✗ Passwords do not match"}
              </div>
            )}
          </div>

          <button
            onClick={handleRegister}
            disabled={loading}
            style={{ width: "100%", padding: "14px", borderRadius: 16, border: "1px solid rgba(52,211,153,0.3)", background: loading ? "rgba(255,255,255,0.03)" : "rgba(52,211,153,0.15)", color: loading ? "rgba(255,255,255,0.3)" : "#6ee7b7", fontSize: 15, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer" }}
          >
            {loading ? "Creating account..." : "Create Account →"}
          </button>

          <div style={{ textAlign: "center", marginTop: 24, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "#34d399", textDecoration: "none" }}>Sign in →</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
