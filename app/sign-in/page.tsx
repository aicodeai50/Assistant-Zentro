"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabase/client";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function SignInPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [nextUrl, setNextUrl] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    setNextUrl(params.get("next") || "");
  }, []);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const supabase = getSupabaseClient();

    if (!supabase) {
      setMessage("Sign in is not configured yet. Add Supabase environment variables first.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      const msg = (error.message || "").toLowerCase();

      if (msg.includes("email not confirmed")) {
        setMessage("Your email is not verified yet. Check your inbox or spam folder, then click the verification link.");
      } else if (msg.includes("invalid login credentials")) {
        setMessage("Invalid email or password. If you just created your account, verify your email first before signing in.");
      } else {
        setMessage(error.message);
      }

      setLoading(false);
      return;
    }

    setMessage("Signed in successfully.");
    setLoading(false);

    if (nextUrl) {
      window.location.href = nextUrl;
      return;
    }

    router.push("/");
  }

  return (
    <section className="relative min-h-screen overflow-hidden px-4 py-10 text-white sm:px-6 sm:py-14">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(217,70,239,0.28),transparent_34%),radial-gradient(circle_at_80%_0%,rgba(34,211,238,0.18),transparent_32%),linear-gradient(135deg,#2e1065_0%,#86198f_45%,#fb7185_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(255,255,255,0.10),transparent_35%,rgba(255,255,255,0.08))]" />

      <div className="mx-auto grid min-h-[calc(100vh-7rem)] w-full max-w-6xl items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="hidden lg:block">
          <div className="max-w-lg rounded-[2rem] border border-white/20 bg-white/10 p-8 shadow-[0_30px_100px_rgba(0,0,0,0.25)] backdrop-blur-2xl">
            <div className="text-5xl">🤖</div>
            <h1 className="mt-5 text-5xl font-bold tracking-tight">Zentro Assistant</h1>
            <p className="mt-4 text-lg leading-8 text-white/78">
              Your personal AI workspace for memory, tasks, briefings, and focused next actions.
            </p>
            <div className="mt-8 grid gap-3">
              {["Persistent assistant memory", "Task tracking and daily briefings", "Optional cloud sync when signed in"].map((item) => (
                <div key={item} className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/85">
                  ✨ {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md">
          <form
            onSubmit={handleSignIn}
            className="overflow-hidden rounded-[2rem] border border-white/45 bg-[#fff7fb] text-slate-900 shadow-[0_24px_90px_rgba(126,34,206,0.35)]"
          >
            <div className="bg-gradient-to-br from-violet-700 via-fuchsia-600 to-rose-400 px-6 py-8 text-center text-white">
              <div className="text-4xl">🤖</div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight">Zentro Assistant</h1>
              <p className="mt-2 text-sm font-medium text-white/85">Welcome back ✨</p>
            </div>

            <div className="space-y-4 p-6">
              <div>
                <label className="text-sm font-bold text-slate-700">{t("auth.email")}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                  className="mt-2 w-full rounded-2xl border border-pink-100 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-fuchsia-300 focus:ring-2 focus:ring-fuchsia-100"
                required
              />
            </div>

            <div>
                <label className="text-sm font-bold text-slate-700">{t("auth.password")}</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                  className="mt-2 w-full rounded-2xl border border-pink-100 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-fuchsia-300 focus:ring-2 focus:ring-fuchsia-100"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                  className="mt-2 text-xs font-semibold text-fuchsia-700 hover:text-fuchsia-900"
              >
                {showPassword ? "Hide password" : "Show password"}
              </button>
            </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-5 py-3 text-sm font-bold text-white shadow-[0_12px_28px_rgba(217,70,239,0.25)] transition hover:brightness-105 disabled:opacity-50"
              >
                {loading ? t("common.loading") : t("auth.signIn.title")}
              </button>

              {message ? (
                <div className="rounded-2xl border border-fuchsia-100 bg-fuchsia-50 px-4 py-3 text-sm text-slate-700">
                  {message}
                </div>
              ) : null}

              <div className="text-center text-sm text-slate-500">
                Don’t have an account?{" "}
                <Link href="/sign-up" className="font-bold text-fuchsia-700 hover:text-fuchsia-900">
                  {t("nav.createAccount")}
                </Link>
              </div>

              <div className="text-center">
                <Link
                  href="/forgot-password"
                  className="text-sm font-semibold text-slate-500 hover:text-slate-800"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
          </form>
          </div>
      </div>
    </section>
  );
}
