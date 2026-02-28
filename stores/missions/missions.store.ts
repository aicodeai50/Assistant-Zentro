import { create } from "zustand";

export type MissionStatus = "queued" | "active" | "completed";

export type Mission = {
  id: string;
  title: string;
  description: string;
  status: MissionStatus;
  priority: "low" | "medium" | "high";
  createdAt: number;
  updatedAt: number;
};

type MissionsState = {
  missions: Mission[];
  selectedId: string | null;

  createMission: (m: Pick<Mission, "title" | "description" | "priority">) => void;
  updateMission: (id: string, patch: Partial<Omit<Mission, "id" | "createdAt">>) => void;
  moveMission: (id: string, status: MissionStatus) => void;
  deleteMission: (id: string) => void;

  select: (id: string | null) => void;

  hydrate: () => void;
};

const STORAGE_KEY = "shynvo_missions_v1";

function uid() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function now() {
  return Date.now();
}

function safeParse<T>(s: string | null): T | null {
  if (!s) return null;
  try {
    return JSON.parse(s) as T;
  } catch {
    return null;
  }
}

export const useMissionsStore = create<MissionsState>((set, get) => ({
  missions: [],
  selectedId: null,

  hydrate: () => {
    const data = safeParse<{ missions: Mission[] }>(localStorage.getItem(STORAGE_KEY));
    if (data?.missions?.length) set({ missions: data.missions });
  },

  createMission: ({ title, description, priority }) => {
    const m: Mission = {
      id: uid(),
      title: title.trim() || "Untitled mission",
      description: description.trim(),
      status: "queued",
      priority,
      createdAt: now(),
      updatedAt: now(),
    };
    set((s) => ({ missions: [m, ...s.missions], selectedId: m.id }));
  },

  updateMission: (id, patch) => {
    set((s) => ({
      missions: s.missions.map((m) =>
        m.id === id ? { ...m, ...patch, updatedAt: now() } : m
      ),
    }));
  },

  moveMission: (id, status) => {
    get().updateMission(id, { status });
  },

  deleteMission: (id) => {
    set((s) => ({
      missions: s.missions.filter((m) => m.id !== id),
      selectedId: s.selectedId === id ? null : s.selectedId,
    }));
  },

  select: (id) => set({ selectedId: id }),
}));

// Persist automatically (simple, reliable)
export function persistMissions(missions: Mission[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ missions }));
  } catch {}
}