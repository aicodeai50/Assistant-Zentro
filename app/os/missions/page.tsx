"use client";

import { useMemo, useState } from "react";
import OSShell from "@/components/os/OSShell";
import OSSub from "@/components/os/OSSub";
import { useOSState } from "@/components/os/useOSState";

type MissionType = "Study" | "Work" | "Company";
type MissionStatus = "Queued" | "Active" | "Blocked" | "Done";

type Mission = {
  id: string;
  title: string;
  realTask: string;
  type: MissionType;
  priority: "Low" | "Med" | "High";
  status: MissionStatus;
  progress: number; // 0-100
  due: string; // YYYY-MM-DD
  notes: string;
};

const SEED: Mission[] = [
  {
    id: "m1",
    title: "Secure reactor core",
    realTask: "Finish algorithms assignment (Part 2).",
    type: "Study",
    priority: "High",
    status: "Active",
    progress: 45,
    due: "2026-02-15",
    notes: "Goal: ship a working draft, then refine.",
  },
  {
    id: "m2",
    title: "Stabilize comms array",
    realTask: "Clear inbox and write 3 replies.",
    type: "Work",
    priority: "Med",
    status: "Queued",
    progress: 0,
    due: "2026-02-10",
    notes: "No multitasking. Do in one pass.",
  },
  {
    id: "m3",
    title: "Deploy city sensor patch",
    realTask: "Polish OS UI: subtitles + dock + nav.",
    type: "Company",
    priority: "High",
    status: "Done",
    progress: 100,
    due: "2026-02-01",
    notes: "Ship and verify production routes.",
  },
  {
    id: "m4",
    title: "Repair drone fleet",
    realTask: "Break down the bug into 3 hypotheses.",
    type: "Work",
    priority: "Med",
    status: "Blocked",
    progress: 20,
    due: "2026-02-12",
    notes: "Blocker: missing reproduction steps.",
  },
];

type Filter = "All" | MissionType;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function pctBar(p: number) {
  const safe = clamp(p, 0, 100);
  return (
    <div className="mt-2 h-2 w-full overflow-hidden rounded-full border border-white/10 bg-white/5">
      <div
        className="h-full rounded-full bg-white/70"
        style={{ width: `${safe}%` }}
      />
    </div>
  );
}

function uid() {
  return "m" + Math.random().toString(16).slice(2, 10);
}

export default function MissionsPage() {
  const [missions, setMissions] = useOSState<Mission[]>("os.missions.list", SEED);
  const [filter, setFilter] = useOSState<Filter>("os.missions.filter", "All");
  const [selectedId, setSelectedId] = useOSState<string>("os.missions.selectedId", "m1");
  const [showCreate, setShowCreate] = useState(false);

  const selected = useMemo(() => missions.find((m) => m.id === selectedId) || missions[0], [missions, selectedId]);

  const filtered = useMemo(() => {
    if (filter === "All") return missions;
    return missions.filter((m) => m.type === filter);
  }, [missions, filter]);

  const counts = useMemo(() => {
    const c = { All: missions.length, Study: 0, Work: 0, Company: 0 };
    for (const m of missions) c[m.type] += 1;
    return c;
  }, [missions]);

  function updateMission(id: string, patch: Partial<Mission>) {
    setMissions(missions.map((m) => (m.id === id ? { ...m, ...patch } : m)));
  }

  function createMission(newM: Mission) {
    setMissions([newM, ...missions]);
    setSelectedId(newM.id);
  }

  return (
    <OSShell
      title="Missions"
      subtitle={
        <OSSub
          en="Mission Board: tasks as quests. Mock data now, backend later. Saved locally."
          i18n={{
            es: "Tablero de misiones: tareas como quests. Datos falsos ahora. Guardado localmente.",
            fr: "Tableau de missions: taches comme quetes. Donnees mock. Sauvegarde locale.",
            pt: "Quadro de missoes: tarefas como quests. Mock agora. Salvo localmente.",
            de: "Missionsboard: Aufgaben als Quests. Mock jetzt. Lokal gespeichert.",
            it: "Bacheca missioni: compiti come quest. Mock ora. Salvato localmente.",
            nl: "Missiebord: taken als quests. Mock nu. Lokaal opgeslagen.",
            tr: "Gorev panosu: gorevler quest gibi. Mock simdi. Yerelde kayitli.",
            ar: "Lawhat mahammat: al-a mal ka quest. mock alan. mahfuz mahalliyan.",
            hi: "Mission board: tasks as quests. Mock now. Local save.",
            zh: "Ren wu ban: ren wu zuo quest. Mock xian zai. Ben di bao cun.",
            ja: "Mission board: task as quest. mock. rokaru hozon.",
            ko: "Mission board: task as quest. mock. Local save.",
          }}
        />
      }
      chips={["online", "module: missions", `filter: ${filter.toLowerCase()}`, "sync: local"]}
      rightSlot={
        <button
          onClick={() => setShowCreate(true)}
          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 hover:bg-white/10"
        >
          Create Mission
        </button>
      }
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Left: filters */}
        <div className="lg:col-span-3 rounded-xl border border-white/10 bg-black/30 p-4">
          <div className="text-xs uppercase tracking-widest text-white/60">Filters</div>
          <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-1">
            {(["All", "Study", "Work", "Company"] as Filter[]).map((f) => {
              const on = filter === f;
              const n = f === "All" ? counts.All : counts[f];
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={[
                    "rounded-lg border px-3 py-3 text-left transition",
                    on ? "border-white/25 bg-white/10" : "border-white/10 bg-white/5 hover:bg-white/10",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-white/90">{f}</div>
                    <div className="text-xs text-white/60">{n}</div>
                  </div>
                  <div className="mt-1 text-xs text-white/55">status badges inside</div>
                </button>
              );
            })}
          </div>

          <div className="mt-4 rounded-lg border border-white/10 bg-black/40 p-3 text-xs text-white/60">
            Tip: click a mission card to open details on the right.
          </div>
        </div>

        {/* Middle: mission cards */}
        <div className="lg:col-span-5 rounded-xl border border-white/10 bg-black/30 p-4">
          <div className="flex items-center justify-between">
            <div className="text-xs uppercase tracking-widest text-white/60">Mission list</div>
            <div className="text-xs text-white/50">{filtered.length} shown</div>
          </div>

          <div className="mt-3 space-y-3">
            {filtered.map((m) => {
              const on = m.id === selected?.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedId(m.id)}
                  className={[
                    "w-full rounded-xl border p-4 text-left transition",
                    on ? "border-white/25 bg-white/10" : "border-white/10 bg-white/5 hover:bg-white/10",
                  ].join(" ")}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-base text-white/90">{m.title}</div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full border border-white/10 bg-black/40 px-2 py-1 text-xs text-white/70">
                        {m.type}
                      </span>
                      <span className="rounded-full border border-white/10 bg-black/40 px-2 py-1 text-xs text-white/70">
                        {m.priority}
                      </span>
                      <span className="rounded-full border border-white/10 bg-black/40 px-2 py-1 text-xs text-white/70">
                        {m.status}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 text-sm text-white/70">{m.realTask}</div>
                  {pctBar(m.progress)}
                  <div className="mt-2 text-xs text-white/55">due: {m.due}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: details */}
        <div className="lg:col-span-4 rounded-xl border border-white/10 bg-black/30 p-4">
          <div className="text-xs uppercase tracking-widest text-white/60">Mission details</div>

          {selected ? (
            <div className="mt-3 space-y-3">
              <div className="rounded-lg border border-white/10 bg-black/40 p-3">
                <div className="text-sm text-white/90">{selected.title}</div>
                <div className="mt-1 text-xs text-white/60">{selected.realTask}</div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="text-xs text-white/60">status</div>
                  <select
                    value={selected.status}
                    onChange={(e) => updateMission(selected.id, { status: e.target.value as MissionStatus })}
                    className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-2 py-2 text-sm text-white/85 outline-none"
                  >
                    {(["Queued", "Active", "Blocked", "Done"] as MissionStatus[]).map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="text-xs text-white/60">priority</div>
                  <select
                    value={selected.priority}
                    onChange={(e) => updateMission(selected.id, { priority: e.target.value as any })}
                    className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-2 py-2 text-sm text-white/85 outline-none"
                  >
                    {(["Low", "Med", "High"] as const).map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-white/60">progress</div>
                  <div className="text-xs text-white/60">{selected.progress}%</div>
                </div>
                <input
                  className="mt-2 w-full accent-white"
                  type="range"
                  min={0}
                  max={100}
                  value={selected.progress}
                  onChange={(e) => updateMission(selected.id, { progress: clamp(parseInt(e.target.value, 10), 0, 100) })}
                />
              </div>

              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                <div className="text-xs text-white/60">notes</div>
                <textarea
                  value={selected.notes}
                  onChange={(e) => updateMission(selected.id, { notes: e.target.value })}
                  className="mt-2 h-24 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white/85 outline-none"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => updateMission(selected.id, { status: "Active" })}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
                >
                  Start
                </button>
                <button
                  onClick={() => updateMission(selected.id, { status: "Done", progress: 100 })}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
                >
                  Mark done
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-3 text-sm text-white/60">Select a mission.</div>
          )}
        </div>
      </div>

      {/* Create modal */}
      {showCreate ? (
        <CreateMissionModal
          onClose={() => setShowCreate(false)}
          onCreate={(m) => {
            createMission(m);
            setShowCreate(false);
          }}
        />
      ) : null}
    </OSShell>
  );
}

function CreateMissionModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (m: Mission) => void;
}) {
  const [title, setTitle] = useState("New mission");
  const [realTask, setRealTask] = useState("Describe the real task...");
  const [type, setType] = useState<MissionType>("Company");
  const [priority, setPriority] = useState<"Low" | "Med" | "High">("Med");
  const [due, setDue] = useState("2026-02-20");

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-black/70 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-black/70 p-4 backdrop-blur">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-white/90">Create Mission</div>
          <button
            onClick={onClose}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 hover:bg-white/10"
          >
            Close
          </button>
        </div>

        <div className="mt-4 space-y-3">
          <div>
            <div className="text-xs text-white/60">Title (quest)</div>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white/85 outline-none"
            />
          </div>

          <div>
            <div className="text-xs text-white/60">Real task</div>
            <input
              value={realTask}
              onChange={(e) => setRealTask(e.target.value)}
              className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white/85 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-xs text-white/60">Type</div>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as MissionType)}
                className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-2 py-2 text-sm text-white/85 outline-none"
              >
                {(["Study", "Work", "Company"] as MissionType[]).map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <div className="text-xs text-white/60">Priority</div>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-2 py-2 text-sm text-white/85 outline-none"
              >
                {(["Low", "Med", "High"] as const).map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <div className="text-xs text-white/60">Due date</div>
            <input
              value={due}
              onChange={(e) => setDue(e.target.value)}
              className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white/85 outline-none"
              placeholder="YYYY-MM-DD"
            />
          </div>

          <button
            onClick={() =>
              onCreate({
                id: uid(),
                title,
                realTask,
                type,
                priority,
                status: "Queued",
                progress: 0,
                due,
                notes: "Created locally. Wire backend later.",
              })
            }
            className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/90 hover:bg-white/15"
          >
            Create
          </button>

          <div className="text-xs text-white/50">
            Saved locally. Later replace with GET/POST /missions.
          </div>
        </div>
      </div>
    </div>
  );
}
