"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import ThoughtForgeCanvas from "@/components/experiments/thought-forge/ThoughtForgeCanvas";
import {
  TF_STORAGE_KEY,
  createSeedGraph,
  expandNode,
  type TFGraph,
} from "@/lib/experiments/thoughtForge";

const ACCENT = "#A3E635"; // lime

export default function ThoughtForgePage() {
  const [seed, setSeed] = useState("");
  const [graph, setGraph] = useState<TFGraph>(() => createSeedGraph("Map your mind"));
  const [selected, setSelected] = useState<string | null>(null);

  // load saved graph
  useEffect(() => {
    try {
      const raw = localStorage.getItem(TF_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as TFGraph;
      if (parsed?.nodes?.length) setGraph(parsed);
    } catch {
      // ignore
    }
  }, []);

  // persist
  useEffect(() => {
    try {
      localStorage.setItem(TF_STORAGE_KEY, JSON.stringify(graph));
    } catch {
      // ignore
    }
  }, [graph]);

  const stats = useMemo(() => {
    return { nodes: graph.nodes.length, links: graph.links.length };
  }, [graph.nodes.length, graph.links.length]);

  function forge() {
    const clean = seed.trim();
    if (!clean) return;
    setSelected(null);
    setGraph(createSeedGraph(clean));
  }

  function onNodeClick(id: string) {
    setSelected(id);
    setGraph((g) => expandNode(g, id));
  }

  const selectedNode = selected ? graph.nodes.find((n) => n.id === selected) : null;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Thought Forge Universe background */}
      <div className="pointer-events-none fixed inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(1100px circle at 18% 18%, rgba(163,230,53,0.28), transparent 52%),
              radial-gradient(1000px circle at 82% 22%, rgba(34,211,238,0.12), transparent 55%),
              radial-gradient(1000px circle at 40% 90%, rgba(16,185,129,0.10), transparent 60%),
              linear-gradient(180deg, rgba(2,6,23,0.72), rgba(0,0,0,0.93))
            `,
            filter: "saturate(1.25) contrast(1.1)",
          }}
        />
        <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:46px_46px]" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent_30%,rgba(255,255,255,0.04))]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 py-10">
        {/* top bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-white/15 bg-white/10 px-3 py-2 text-xs tracking-widest text-white/80">
              SHYNVO
            </div>
            <div className="text-xs" style={{ color: `${ACCENT}CC` }}>
              Thought Forge
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/experiments"
              className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs text-white/80 hover:bg-white/15"
            >
              Back to Experiments
            </Link>
            <Link
              href="/os"
              className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs text-white/80 hover:bg-white/15"
            >
              Enter OS (2050)
            </Link>
          </div>
        </div>

        {/* hero */}
        <div className="mt-8 rounded-3xl border border-white/15 bg-black/35 p-6 backdrop-blur-xl">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="text-3xl font-semibold text-white/95">Thought Forge</div>
              <div className="mt-2 text-sm text-white/70">
                Type a memory, problem, or idea. The graph forms. Click nodes to expand.
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs text-white/80">
                nodes: {stats.nodes} • links: {stats.links}
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelected(null);
                  setSeed("");
                  setGraph(createSeedGraph("Map your mind"));
                }}
                className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-xs text-white/80 hover:bg-white/15"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="mt-4 h-[1px] w-full bg-[linear-gradient(90deg,transparent,rgba(163,230,53,0.45),rgba(34,211,238,0.25),transparent)]" />
        </div>

        {/* controls + canvas */}
        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="lg:col-span-4 rounded-3xl border border-white/15 bg-black/35 p-5 backdrop-blur-xl">
            <div className="text-xs uppercase tracking-widest text-white/60">Seed</div>
            <div className="mt-2 text-sm text-white/70">
              Start with one phrase. Example:{" "}
              <span style={{ color: `${ACCENT}CC` }}>career change</span>,{" "}
              <span style={{ color: `${ACCENT}CC` }}>startup idea</span>.
            </div>

            <input
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
              placeholder="Type a thought…"
              className="mt-4 w-full rounded-2xl border border-white/15 bg-black/50 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
              onKeyDown={(e) => {
                if (e.key === "Enter") forge();
              }}
            />

            <button
              type="button"
              onClick={forge}
              disabled={!seed.trim()}
              className="mt-3 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/85 hover:bg-white/15 disabled:opacity-50"
            >
              Forge →
            </button>

            <div className="mt-4 rounded-2xl border border-white/15 bg-black/40 p-4">
              <div className="text-xs uppercase tracking-widest text-white/60">Selected node</div>
              <div className="mt-2 text-sm text-white/90">
                {selectedNode ? selectedNode.label : "None"}
              </div>
              <div className="mt-2 text-xs text-white/60">
                Click any node to expand into 3 detail nodes.
              </div>
            </div>

            <div className="mt-4 text-xs text-white/55">
              Phase 2: connect to <code>/api/public/chat</code> to generate real concepts.
            </div>
          </div>

          <div className="lg:col-span-8">
            <ThoughtForgeCanvas graph={graph} onNodeClick={onNodeClick} accent={ACCENT} />
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-white/45">
          Thought Forge • Visual hook first • 3D later
        </div>
      </div>
    </div>
  );
}
