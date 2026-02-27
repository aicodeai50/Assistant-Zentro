"use client";

import OSShell from "@/components/os/OSShell";
import OSSub from "@/components/os/OSSub";
import { useOSState } from "@/components/os/useOSState";
import type { OSTheme } from "@/components/os/OSThemeSync";

export default function SettingsPage() {
  const [handle, setHandle] = useOSState<string>("os.profile.handle", "Cadet");
  const [theme, setTheme] = useOSState<OSTheme>("os.theme", "nebula");

  return (
    <OSShell
      title="Settings"
      subtitle={
        <OSSub
          en="Profile and theme (CSS-only). Saved locally."
          i18n={{
            es: "Perfil y tema (solo CSS). Guardado localmente.",
            fr: "Profil et theme (CSS uniquement). Sauvegarde locale.",
            pt: "Perfil e tema (somente CSS). Salvo localmente.",
            de: "Profil und Theme (nur CSS). Lokal gespeichert.",
            it: "Profilo e tema (solo CSS). Salvato localmente.",
            nl: "Profiel en thema (alleen CSS). Lokaal opgeslagen.",
            tr: "Profil ve tema (yalnizca CSS). Yerelde kayitli.",
            ar: "Malaf shakhsiy wa thema (CSS faqat). mahfuz mahalliyan.",
            hi: "Profile aur theme (CSS-only). Local save.",
            zh: "Ge ren + zhu ti (jin CSS). Ben di bao cun.",
            ja: "Profile + theme (CSS-only). rokaru hozon.",
            ko: "Profile + theme (CSS-only). Local save.",
          }}
        />
      }
      chips={["online", "module: settings", `theme: ${theme}`, "sync: local"]}
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-black/30 p-4">
          <div className="text-xs uppercase tracking-widest text-white/60">Profile</div>
          <div className="mt-3">
            <div className="text-xs text-white/60">Operator handle</div>
            <input
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white/85 outline-none"
            />
            <div className="mt-2 text-xs text-white/55">
              Stored in localStorage. Later: connect to account profile.
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-black/30 p-4">
          <div className="text-xs uppercase tracking-widest text-white/60">Theme</div>
          <div className="mt-3 grid grid-cols-1 gap-2">
            {(["nebula", "tokyo", "onyx"] as OSTheme[]).map((t) => {
              const on = theme === t;
              return (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={[
                    "rounded-xl border p-4 text-left transition",
                    on ? "border-white/25 bg-white/10 os-accent-border" : "border-white/10 bg-white/5 hover:bg-white/10",
                  ].join(" ")}
                >
                  <div className="text-sm text-white/90">{t.toUpperCase()}</div>
                  <div className="mt-1 text-xs text-white/60">
                    {t === "nebula"
                      ? "Deep blue + violet glow."
                      : t === "tokyo"
                      ? "Cyan neon + soft purple."
                      : "Minimal mono control deck."}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-3 rounded-lg border border-white/10 bg-black/40 p-3 text-xs text-white/60">
            Theme is CSS-only and applied globally. Later: user profile settings API.
          </div>
        </div>
      </div>
    </OSShell>
  );
}
