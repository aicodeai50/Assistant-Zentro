"use client";

import { useMemo } from "react";
import OSShell from "@/components/os/OSShell";
import OSSub from "@/components/os/OSSub";
import { useOSState } from "@/components/os/useOSState";

type Milestone = {
  id: string;
  year: number;
  label: string;
  detail: string;
};

const MILES: Milestone[] = [
  { id: "t1", year: 2026, label: "Launch SH Colony OS", detail: "Public demo flow: OS home, planet, cognitive, missions." },
  { id: "t2", year: 2027, label: "Deploy AI Machines", detail: "Backend routes stabilize. Core actions call real endpoints." },
  { id: "t3", year: 2028, label: "Open Company Hub", detail: "Missions and council become team features." },
  { id: "t4", year: 2029, label: "Scale Subsystems", detail: "Multiple agents, analytics, role-based access." },
  { id: "t5", year: 2030, label: "Orbital Nexus v1", detail: "Full control deck: planet + missions + timeline + council." },
];

function pos(year: number) {
  // 2026 -> 0%, 2030 -> 100%
  const min = 2026;
  const max = 2030;
  return ((year - min) / (max - min)) * 100;
}

export default function TimelinePage() {
  const [selectedId, setSelectedId] = useOSState<string>("os.timeline.selectedId", "t1");
  const selected = useMemo(() => MILES.find((m) => m.id === selectedId) || MILES[0], [selectedId]);

  return (
    <OSShell
      title="Timeline"
      subtitle={
        <OSSub
          en="Chronochart: milestones as glowing nodes. Saved locally."
          i18n={{
            es: "Cronograma: hitos como nodos brillantes. Guardado localmente.",
            fr: "Chronochart: jalons en noeuds lumineux. Sauvegarde locale.",
            pt: "Cronograma: marcos como nos brilhantes. Salvo localmente.",
            de: "Zeitleiste: Meilensteine als leuchtende Knoten. Lokal gespeichert.",
            it: "Timeline: traguardi come nodi luminosi. Salvato localmente.",
            nl: "Tijdlijn: mijlpalen als gloeiende nodes. Lokaal opgeslagen.",
            tr: "Zaman cizelgesi: parlayan dugumler. Yerelde kayitli.",
            ar: "Khat al-zaman: ma alim kanuqat mudia. mahfuz mahalliyan.",
            hi: "Timeline: glowing nodes. Local save.",
            zh: "Shi jian zhou: fa guang jie dian. Ben di bao cun.",
            ja: "Timeline: glowing nodes. rokaru hozon.",
            ko: "Timeline: glowing nodes. Local save.",
          }}
        />
      }
      chips={["online", "module: timeline", "range: 2026-2030", "sync: local"]}
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-8 rounded-xl border border-white/10 bg-black/30 p-4">
          <div className="text-xs uppercase tracking-widest text-white/60">Chronochart</div>

          <div className="relative mt-6 h-24 rounded-xl border border-white/10 bg-black/40">
            <div className="absolute left-4 right-4 top-1/2 h-[2px] -translate-y-1/2 bg-white/10" />

            {MILES.map((m) => {
              const active = m.id === selectedId;
              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedId(m.id)}
                  className="absolute top-1/2 -translate-y-1/2"
                  style={{ left: `calc(${pos(m.year)}% - 10px)` }}
                  title={m.label}
                >
                  <span
                    className={[
                      "inline-flex h-5 w-5 items-center justify-center rounded-full border transition",
                      active ? "border-white/35 bg-white/25" : "border-white/15 bg-white/10",
                    ].join(" ")}
                    style={{
                      boxShadow: active ? "0 0 18px rgba(255,255,255,0.18)" : "none",
                    }}
                  />
                  <div className="mt-2 w-28 -translate-x-1/3 text-left text-xs text-white/70">
                    <div className="text-white/85">{m.year}</div>
                    <div className="text-white/55">{m.label}</div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-4 rounded-lg border border-white/10 bg-black/40 p-3 text-xs text-white/60">
            Click a node to open details on the right. Later: replace with /timeline data.
          </div>
        </div>

        <div className="lg:col-span-4 rounded-xl border border-white/10 bg-black/30 p-4">
          <div className="text-xs uppercase tracking-widest text-white/60">Details</div>
          <div className="mt-3 rounded-lg border border-white/10 bg-black/40 p-3">
            <div className="text-sm text-white/90">{selected.label}</div>
            <div className="mt-2 text-xs text-white/60">year: {selected.year}</div>
            <div className="mt-3 text-sm text-white/75">{selected.detail}</div>
          </div>

          <div className="mt-3 rounded-lg border border-white/10 bg-white/5 p-3">
            <div className="text-xs text-white/60">Next action</div>
            <div className="mt-2 text-sm text-white/80">
              Convert this milestone into a mission on the Missions board.
            </div>
          </div>
        </div>
      </div>
    </OSShell>
  );
}
