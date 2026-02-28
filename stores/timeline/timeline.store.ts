import { create } from "zustand";

export type TimelineBlockType = "focus" | "mission" | "recovery" | "note";

export type TimelineBlock = {
  id: string;
  title: string;
  notes: string;
  date: string; // YYYY-MM-DD (local)
  start: string; // HH:MM
  end: string; // HH:MM
  type: TimelineBlockType;
  createdAt: number;
  updatedAt: number;
};

type TimelineState = {
  blocks: TimelineBlock[];
  selectedId: string | null;
  view: "day" | "week";

  hydrate: () => void;
  setView: (v: "day" | "week") => void;

  createBlock: (b: Pick<TimelineBlock, "title" | "notes" | "date" | "start" | "end" | "type">) => void;
  updateBlock: (id: string, patch: Partial<Omit<TimelineBlock, "id" | "createdAt">>) => void;
  deleteBlock: (id: string) => void;

  select: (id: string | null) => void;
};

const STORAGE_KEY = "shynvo_timeline_v1";

function uid() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function now() {
  return Date.now();
}

function todayKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function safeParse<T>(s: string | null): T | null {
  if (!s) return null;
  try {
    return JSON.parse(s) as T;
  } catch {
    return null;
  }
}

export const useTimelineStore = create<TimelineState>((set, get) => ({
  blocks: [],
  selectedId: null,
  view: "day",

  hydrate: () => {
    const data = safeParse<{ blocks: TimelineBlock[]; view?: "day" | "week" }>(
      localStorage.getItem(STORAGE_KEY)
    );
    if (data?.blocks) set({ blocks: data.blocks });
    if (data?.view) set({ view: data.view });
  },

  setView: (v) => set({ view: v }),

  createBlock: ({ title, notes, date, start, end, type }) => {
    const b: TimelineBlock = {
      id: uid(),
      title: title.trim() || "Untitled block",
      notes: notes.trim(),
      date: date || todayKey(),
      start: start || "09:00",
      end: end || "10:00",
      type,
      createdAt: now(),
      updatedAt: now(),
    };
    set((s) => ({ blocks: [b, ...s.blocks], selectedId: b.id }));
  },

  updateBlock: (id, patch) => {
    set((s) => ({
      blocks: s.blocks.map((b) =>
        b.id === id ? { ...b, ...patch, updatedAt: now() } : b
      ),
    }));
  },

  deleteBlock: (id) => {
    set((s) => ({
      blocks: s.blocks.filter((b) => b.id !== id),
      selectedId: s.selectedId === id ? null : s.selectedId,
    }));
  },

  select: (id) => set({ selectedId: id }),
}));

export function persistTimeline() {
  try {
    const s = useTimelineStore.getState();
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ blocks: s.blocks, view: s.view })
    );
  } catch {}
}