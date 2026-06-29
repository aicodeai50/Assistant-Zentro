"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useZentroRobot } from "@/lib/robot/context";
import { getSupabaseClient } from "@/lib/supabase/client";
import { SITE_SHORT_NAME } from "@/lib/site";
import ZentroMark from "./ZentroMark";

const links = [
  { href: "/#platform", label: "Platform" },
  { href: "/#modules", label: "Modules" },
  { href: "/assistant", label: "Assistant" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/contact", label: "Contact" },
] as const;

export default function ZentroSiteNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { openChat } = useZentroRobot();
  const [open, setOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [displayName, setDisplayName] = useState("Account");

  useEffect(() => {
    let mounted = true;
    const supabase = getSupabaseClient();

    async function loadSession() {
      if (!supabase) return;

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!mounted) return;

      if (!session?.user) {
        setIsSignedIn(false);
        setDisplayName("Account");
        return;
      }

      setIsSignedIn(true);
      setDisplayName(
        session.user.user_metadata?.full_name ||
          session.user.email ||
          "Account"
      );
    }

    void loadSession();

    if (!supabase) {
      return () => {
        mounted = false;
      };
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void loadSession();
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function handleSignOut() {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    await supabase.auth.signOut();
    setIsSignedIn(false);
    setDisplayName("Account");
    setOpen(false);
    router.push("/");
    router.refresh();
  }

  return (
    <header className="zentro-nav sticky top-0 z-50 border-b border-white/[0.06] bg-[#050810]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <ZentroMark size={30} />
          <span className="text-[15px] font-semibold tracking-tight text-white">
            {SITE_SHORT_NAME}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-[13px] font-medium text-white/60 transition hover:bg-white/[0.04] hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {isSignedIn ? (
            <>
              <Link
                href="/account"
                className="hidden max-w-36 truncate rounded-lg border border-white/10 px-3 py-2 text-[13px] font-medium text-white/75 transition hover:border-white/20 hover:text-white sm:inline-flex"
                title={displayName}
              >
                {displayName}
              </Link>
              <Link
                href="/settings"
                className="hidden rounded-lg border border-white/10 px-3 py-2 text-[13px] font-medium text-white/75 transition hover:border-white/20 hover:text-white sm:inline-flex"
              >
                Settings
              </Link>
              <Link
                href="/dashboard"
                className="hidden rounded-lg bg-gradient-to-r from-fuchsia-400 via-pink-300 to-cyan-300 px-4 py-2 text-[13px] font-semibold text-slate-950 shadow-[0_0_24px_rgba(236,72,153,0.22)] transition hover:brightness-105 sm:inline-flex"
              >
                Dashboard
              </Link>
              <button
                type="button"
                onClick={() => void handleSignOut()}
                className="hidden rounded-lg border border-white/10 px-3 py-2 text-[13px] font-medium text-white/65 transition hover:border-white/20 hover:text-white lg:inline-flex"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="hidden rounded-lg border border-white/10 px-3 py-2 text-[13px] font-medium text-white/75 transition hover:border-white/20 hover:text-white sm:inline-flex"
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="hidden rounded-lg bg-gradient-to-r from-fuchsia-400 via-pink-300 to-cyan-300 px-4 py-2 text-[13px] font-semibold text-slate-950 shadow-[0_0_24px_rgba(236,72,153,0.22)] transition hover:brightness-105 sm:inline-flex"
              >
                Sign up
              </Link>
            </>
          )}
          <button
            type="button"
            onClick={() => openChat()}
            className="hidden rounded-lg border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-[13px] font-semibold text-cyan-100 transition hover:bg-cyan-300/15 lg:inline-flex"
          >
            Open Assistant
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex rounded-lg border border-white/10 p-2 text-white/80 md:hidden"
            aria-label="Menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <>
                  <path d="M6 6l12 12M18 6 6 18" />
                </>
              ) : (
                <>
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-white/[0.06] bg-[#050810]/95 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                  pathname === item.href ? "bg-white/[0.06] text-white" : "text-white/70"
                }`}
              >
                {item.label}
              </Link>
            ))}
            {isSignedIn ? (
              <>
                <Link
                  href="/account"
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-lg border border-white/10 px-3 py-2.5 text-sm font-medium text-white/75"
                >
                  {displayName}
                </Link>
                <Link
                  href="/settings"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-white/10 px-3 py-2.5 text-sm font-medium text-white/75"
                >
                  Settings
                </Link>
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="rounded-lg bg-gradient-to-r from-fuchsia-400 via-pink-300 to-cyan-300 px-3 py-2.5 text-sm font-semibold text-slate-950"
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => void handleSignOut()}
                  className="rounded-lg border border-white/10 px-3 py-2.5 text-left text-sm font-medium text-white/75"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-lg border border-white/10 px-3 py-2.5 text-sm font-medium text-white/75"
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setOpen(false)}
                  className="rounded-lg bg-gradient-to-r from-fuchsia-400 via-pink-300 to-cyan-300 px-3 py-2.5 text-sm font-semibold text-slate-950"
                >
                  Sign up
                </Link>
              </>
            )}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openChat();
              }}
              className="mt-2 rounded-lg bg-cyan-300 px-3 py-2.5 text-sm font-semibold text-slate-950"
            >
              Open Assistant
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
