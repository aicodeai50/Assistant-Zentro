"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSupabaseClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
        setReady(true);
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password.length < 8) {
      setOk(false);
      setMessage("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirm) {
      setOk(false);
      setMessage("Passwords do not match.");
      return;
    }

    const supabase = getSupabaseClient();
    if (!supabase) {
      setOk(false);
      setMessage("Authentication is not available right now.");
      return;
    }

    setLoading(true);
    setMessage("");
    setOk(false);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setOk(false);
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setOk(true);
    setMessage("Password updated successfully. You can now sign in.");
    setPassword("");
    setConfirm("");
    setLoading(false);
  }

  return (
    <section className="relative min-h-screen overflow-hidden px-4 py-10 text-white sm:px-6 sm:py-14">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(217,70,239,0.28),transparent_34%),radial-gradient(circle_at_80%_0%,rgba(34,211,238,0.18),transparent_32%),linear-gradient(135deg,#2e1065_0%,#86198f_45%,#fb7185_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(255,255,255,0.10),transparent_35%,rgba(255,255,255,0.08))]" />

      <div className="mx-auto grid min-h-[calc(100vh-7rem)] w-full max-w-6xl items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="hidden lg:block">
          <div className="max-w-lg rounded-[2rem] border border-white/20 bg-white/10 p-8 shadow-[0_30px_100px_rgba(0,0,0,0.25)] backdrop-blur-2xl">
            <div className="text-5xl">🛡️</div>
            <h1 className="mt-5 text-5xl font-bold tracking-tight">Set a new password</h1>
            <p className="mt-4 text-lg leading-8 text-white/78">
              Choose a secure password and return to your Zentro Assistant workspace.
            </p>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md">
          <div className="overflow-hidden rounded-[2rem] border border-white/45 bg-[#fff7fb] text-slate-900 shadow-[0_24px_90px_rgba(126,34,206,0.35)]">
            <div className="bg-gradient-to-br from-violet-700 via-fuchsia-600 to-rose-400 px-6 py-8 text-center text-white">
              <div className="text-4xl">🤖</div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight">Zentro Assistant</h1>
              <p className="mt-2 text-sm font-medium text-white/85">Create new password ✨</p>
            </div>

            <div className="p-6">
              <p className="text-sm leading-6 text-slate-500">
                Open this page from your email reset link and choose a new password.
              </p>

              {!ready ? (
                <div className="mt-5 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                  Open this page from the password reset link sent to your email.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                  <div>
                    <label className="text-sm font-bold text-slate-700">New password</label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-pink-100 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-fuchsia-300 focus:ring-2 focus:ring-fuchsia-100"
                      placeholder="At least 8 characters"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-slate-700">Confirm password</label>
                    <input
                      type="password"
                      required
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-pink-100 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-fuchsia-300 focus:ring-2 focus:ring-fuchsia-100"
                      placeholder="Repeat password"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-5 py-3 text-sm font-bold text-white shadow-[0_12px_28px_rgba(217,70,239,0.25)] transition hover:brightness-105 disabled:opacity-50"
                  >
                    {loading ? "Updating..." : "Update password"}
                  </button>
                </form>
              )}

              {message ? (
                <div
                  className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${
                    ok
                      ? "border-emerald-100 bg-emerald-50 text-emerald-800"
                      : "border-red-100 bg-red-50 text-red-700"
                  }`}
                >
                  {message}
                </div>
              ) : null}

              <div className="mt-5 text-center text-sm text-slate-500">
                <Link href="/sign-in" className="font-bold text-fuchsia-700 hover:text-fuchsia-900">
                  Back to sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
