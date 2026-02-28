import { create } from "zustand";

export type TerminalLineType = "in" | "out" | "system" | "error";

export type TerminalLine = {
  id: string;
  type: TerminalLineType;
  text: string;
  ts: number;
};

type TerminalState = {
  isOpen: boolean;
  lines: TerminalLine[];
  input: string;

  setOpen: (open: boolean) => void;
  toggle: () => void;

  setInput: (value: string) => void;

  push: (type: TerminalLineType, text: string) => void;
  clear: () => void;

  runCommand: (cmd: string) => void;
};

function uid() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export const useTerminalStore = create<TerminalState>((set, get) => ({
  isOpen: true,
  lines: [
    {
      id: uid(),
      type: "system",
      text: "Terminal online (frontend-only). Type 'help'.",
      ts: Date.now(),
    },
  ],
  input: "",

  setOpen: (open) => set({ isOpen: open }),
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),

  setInput: (value) => set({ input: value }),

  push: (type, text) =>
    set((s) => ({
      lines: [
        ...s.lines,
        { id: uid(), type, text: String(text ?? ""), ts: Date.now() },
      ],
    })),

  clear: () =>
    set({
      lines: [
        {
          id: uid(),
          type: "system",
          text: "Terminal cleared.",
          ts: Date.now(),
        },
      ],
    }),

  runCommand: (cmd) => {
    const clean = (cmd || "").trim();
    if (!clean) return;

    const { push, clear } = get();
    push("in", clean);

    const lower = clean.toLowerCase();

    if (lower === "help") {
      push("out", "Commands: help, status, clear, echo <text>, time");
      return;
    }
    if (lower === "status") {
      push("out", "Status: stable • sync: local • backend: offline");
      return;
    }
    if (lower === "clear") {
      clear();
      return;
    }
    if (lower.startsWith("echo ")) {
      push("out", clean.slice(5));
      return;
    }
    if (lower === "time") {
      push("out", new Date().toString());
      return;
    }

    push("error", `Unknown command: ${clean} (type 'help')`);
  },
}));