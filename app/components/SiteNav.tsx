"use client";

import LanguageSelector from "@/_components/LanguageSelector";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { getSupabaseClient } from "@/lib/supabase/client";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type UsageState = {
  label: string;
};

export default function SiteNav() {
  const { t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [displayName, setDisplayName] = useState<string>("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [usage, setUsage] = useState<UsageState | null>(null);

  const accountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        setAccountOpen(false);
      }
    }

    function onClickOutside(e: MouseEvent) {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    }

    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClickOutside);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
    setAccountOpen(false);
  }, [pathname]);

  useEffect(() => {
    let mounted = true;
    const supabase = getSupabaseClient();

    async function loadUser() {
      if (!supabase) return;

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        if (mounted) {
          setIsSignedIn(false);
          setDisplayName("");
          setUsage(null);
        }
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, email, plan, trial_ends_at")
        .eq("id", session.user.id)
        .maybeSingle();

      const name =
        (profile?.full_name || "").trim() ||
        session.user.user_metadata?.full_name ||
        session.user.email ||
        "Account";

      const plan = String(profile?.plan || "trial").toLowerCase();
      const trialEndsAt = profile?.trial_ends_at
        ? new Date(profile.trial_ends_at).getTime()
        : 0;
      const trialActive = plan === "trial" && trialEndsAt > Date.now();
      const paid =
        plan === "plus" ||
        plan === "pro" ||
        plan === "team" ||
        plan === "enterprise";

      let usageLabel = "AI: 0 / 5 today";

      if (trialActive || paid) {
        usageLabel = "AI: Unlimited";
      } else {
        const today = new Date().toISOString().slice(0, 10);
        const { data: usageRow } = await supabase
          .from("daily_ai_usage")
          .select("usage_count")
          .eq("user_id", session.user.id)
          .eq("usage_date", today)
          .maybeSingle();

        const used = Number(usageRow?.usage_count || 0);
        const remaining = Math.max(0, 5 - used);
        usageLabel = `AI: ${remaining} / 5 today`;
      }

      if (mounted) {
        setIsSignedIn(true);
        setDisplayName(name);
        setUsage({ label: usageLabel });
      }
    }

    loadUser();

    if (!supabase) {
      return () => {
        mounted = false;
      };
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadUser();
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
    setAccountOpen(false);
    setOpen(false);
    setIsSignedIn(false);
    setDisplayName("");
    setUsage(null);
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/6 bg-[#070b14]/88 backdrop-blur-md">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Zentro home">
          <ShynvoLogo />
          <span className="text-sm font-semibold tracking-[0.02em] text-white">
            Zentro
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <nav className="flex items-center gap-6">
            <NavLink href="/pricing">{t("nav.pricing")}</NavLink>
            <NavLink href="/docs">{t("nav.docs")}</NavLink>
            <NavLink href="/contact">{t("nav.contact")}</NavLink>
            <NavLink href="/search">Search</NavLink>
          </nav>

          <div className="flex items-center gap-3">
            {isSignedIn ? (
              <>
                <div className="relative" ref={accountRef}>
                  <button
                    type="button"
                    onClick={() => setAccountOpen((prev) => !prev)}
                    className="text-sm font-medium text-white/82 transition hover:text-white"
                  >
                    {displayName}
                  </button>

                  <div
                    className={cx(
                      "absolute right-0 mt-3 w-60 rounded-2xl border border-white/10 bg-[#0b101a] p-2 shadow-[0_18px_40px_rgba(0,0,0,0.42)]",
                      accountOpen ? "block" : "hidden"
                    )}
                  >
                    {usage ? (
                      <div className="mb-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-white/72">
                        {usage.label}
                      </div>
                    ) : null}

                    <Link
                      href="/account"
                      onClick={() => setAccountOpen(false)}
                      className="block rounded-xl px-3 py-2 text-sm text-white/85 transition hover:bg-white/[0.05]"
                    >
                      Account
                    </Link>

                    <Link
                      href="/account"
                      onClick={() => setAccountOpen(false)}
                      className="block rounded-xl px-3 py-2 text-sm text-white/85 transition hover:bg-white/[0.05]"
                    >
                      Profile
                    </Link>

                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="block w-full rounded-xl px-3 py-2 text-left text-sm text-white/85 transition hover:bg-white/[0.05]"
                    >
                      Sign out
                    </button>
                  </div>
                </div>

                <Link
                  href="/docs"
                  className="inline-flex items-center justify-center rounded-lg bg-[linear-gradient(180deg,#5f74ff_0%,#485ce7_100%)] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(72,92,231,0.32)] transition hover:brightness-110"
                >
                  Open App
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="text-sm font-medium text-white/72 transition hover:text-white"
                >
                  Sign in
                </Link>

                <Link
                  href="/docs"
                  className="inline-flex items-center justify-center rounded-lg bg-[linear-gradient(180deg,#5f74ff_0%,#485ce7_100%)] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(72,92,231,0.32)] transition hover:brightness-110"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <IconButton label={t("search.label")} href="/search" icon="search" />
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-xl p-2 ring-1 ring-white/15 transition hover:bg-white/5"
            aria-label={t("nav.menu")}
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      <div className={cx("md:hidden", open ? "block" : "hidden")} aria-hidden={!open}>
        <div
          className="fixed inset-0 z-[80] bg-black/75 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />

        <div className="fixed inset-y-0 right-0 z-[81] h-dvh w-full overflow-y-auto border-l border-white/10 bg-[#0b101a] p-4 sm:w-[86%] sm:max-w-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-white">{t("nav.menu")}</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-xl p-2 ring-1 ring-white/15 transition hover:bg-white/5"
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="mt-4 space-y-2">
            <MobileNavLink href="/pricing" onClick={() => setOpen(false)}>
              {t("nav.pricing")}
            </MobileNavLink>

            <MobileNavLink href="/docs" onClick={() => setOpen(false)}>
              {t("nav.docs")}
            </MobileNavLink>

            <MobileNavLink href="/contact" onClick={() => setOpen(false)}>
              {t("nav.contact")}
            </MobileNavLink>

            <MobileNavLink href="/search" onClick={() => setOpen(false)}>
              Search
            </MobileNavLink>
          </div>

          <div className="my-4 border-t border-white/10" />

          <div className="mb-4">
            <LanguageSelector />
          </div>

          {isSignedIn ? (
            <div className="space-y-2">
              {usage ? (
                <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/80">
                  {usage.label}
                </div>
              ) : null}

              <Link
                href="/account"
                onClick={() => setOpen(false)}
                className="block rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center text-sm font-semibold text-white"
              >
                {displayName}
              </Link>

              <Link
                href="/docs"
                onClick={() => setOpen(false)}
                className="block rounded-lg bg-[linear-gradient(180deg,#5f74ff_0%,#485ce7_100%)] px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Open App
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                className="block w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                href="/sign-in"
                onClick={() => setOpen(false)}
                className="block rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Sign in
              </Link>

              <Link
                href="/docs"
                onClick={() => setOpen(false)}
                className="block rounded-lg bg-[linear-gradient(180deg,#5f74ff_0%,#485ce7_100%)] px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-white/70 transition hover:text-white"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/85 transition hover:bg-white/[0.05]"
    >
      {children}
    </Link>
  );
}

function IconButton({
  label,
  href,
  icon,
}: {
  label: string;
  href: string;
  icon: "search" | "globe";
}) {
  return (
    <Link
      href={href}
      className="rounded-xl p-2 ring-1 ring-white/15 transition hover:bg-white/5"
      aria-label={label}
      title={label}
    >
      {icon === "search" ? <SearchIcon /> : <GlobeIcon />}
    </Link>
  );
}

function ShynvoLogo() {
  return (
    <svg width="30" height="30" viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <circle cx="50" cy="50" r="10" fill="white" />
      <ellipse cx="50" cy="50" rx="34" ry="18" stroke="white" strokeWidth="3" opacity="0.9" />
      <ellipse cx="50" cy="50" rx="18" ry="34" stroke="white" strokeWidth="2" opacity="0.6" />
      <circle cx="84" cy="50" r="3" fill="white" />
      <circle cx="16" cy="50" r="3" fill="white" />
      <circle cx="50" cy="16" r="3" fill="white" />
      <circle cx="50" cy="84" r="3" fill="white" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M16.5 16.5 21 21"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M2 12h20" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 2c3 3 3 17 0 20-3-3-3-17 0-20Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4 12h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 7l10 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M17 7 7 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}