// lib/experiments/thoughtForge.ts

export type ThoughtForgeNodeType = "seed" | "concept" | "detail";

export type ThoughtForgeNode = {
  id: string;
  label: string;
  type: ThoughtForgeNodeType;
};

export type ThoughtForgeLink = {
  source: string;
  target: string;
  label?: string;
};

export type TFGraph = {
  nodes: ThoughtForgeNode[];
  links: ThoughtForgeLink[];
};

export const TF_STORAGE_KEY = "shynvo:thought-forge:v1";

export type ThoughtForgeEdge = {
  from: string;
  to: string;
  label?: string;
};

export type ThoughtForgeAIResponse = {
  nodes: ThoughtForgeNode[];
  edges: ThoughtForgeEdge[];
};

/** ----------------------------
 * Phase 1 (local graph helpers)
 * -----------------------------*/

/**
 * Create a fresh graph with a seed node at the center.
 * This matches what your page.tsx expects.
 */
export function createSeedGraph(seedLabel: string): TFGraph {
  const seed: ThoughtForgeNode = {
    id: "seed",
    label: seedLabel,
    type: "seed",
  };

  return {
    nodes: [seed],
    links: [],
  };
}

function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 48);
}

function uniqueId(base: string, existing: Set<string>) {
  let id = base;
  let i = 2;
  while (existing.has(id)) {
    id = `${base}-${i}`;
    i += 1;
  }
  existing.add(id);
  return id;
}

/**
 * Phase 1 behavior: click a node -> add 3 local detail nodes.
 * Safe, deterministic, no backend.
 */
export function expandNode(graph: TFGraph, nodeId: string): TFGraph {
  const node = graph.nodes.find((n) => n.id === nodeId);
  if (!node) return graph;

  const existingIds = new Set(graph.nodes.map((n) => n.id));

  // If it's already expanded, don't spam duplicates.
  const alreadyExpanded = graph.links.some((l) => l.source === nodeId);
  if (alreadyExpanded) return graph;

  const base = slugify(node.label || "node");
  const newNodes: ThoughtForgeNode[] = [
    {
      id: uniqueId(`${base}-detail`, existingIds),
      label: "Example",
      type: "detail",
    },
    {
      id: uniqueId(`${base}-implication`, existingIds),
      label: "Implication",
      type: "detail",
    },
    {
      id: uniqueId(`${base}-next-step`, existingIds),
      label: "Next step",
      type: "detail",
    },
  ];

  const newLinks: ThoughtForgeLink[] = newNodes.map((n) => ({
    source: nodeId,
    target: n.id,
    label: "expands to",
  }));

  return {
    nodes: [...graph.nodes, ...newNodes],
    links: [...graph.links, ...newLinks],
  };
}

/** ----------------------------
 * Phase 2 (AI expansion helpers)
 * -----------------------------*/

function extractJSON(text: string) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) {
    throw new Error("No JSON found in AI response");
  }
  return JSON.parse(text.slice(start, end + 1));
}

function safeString(x: unknown, fallback = ""): string {
  return typeof x === "string" ? x : fallback;
}

function isNodeType(x: unknown): x is ThoughtForgeNodeType {
  return x === "seed" || x === "concept" || x === "detail";
}

function normalizeAIResponse(raw: unknown): ThoughtForgeAIResponse {
  const obj = raw as any;

  const nodesIn = Array.isArray(obj?.nodes) ? obj.nodes : [];
  const edgesIn = Array.isArray(obj?.edges) ? obj.edges : [];

  // Normalize nodes
  const nodes: ThoughtForgeNode[] = nodesIn
    .map((n: any) => ({
      id: safeString(n?.id).trim(),
      label: safeString(n?.label).trim(),
      type: isNodeType(n?.type) ? (n.type as ThoughtForgeNodeType) : ("detail" as const),
    }))
    .filter((n) => n.id && n.label && isNodeType(n.type));

  // Ensure unique node ids
  const used = new Set<string>();
  const dedupedNodes: ThoughtForgeNode[] = [];
  for (const n of nodes) {
    if (!used.has(n.id)) {
      used.add(n.id);
      dedupedNodes.push(n);
    }
  }

  // Normalize edges and keep only edges that reference real nodes
  const edges: ThoughtForgeEdge[] = edgesIn
    .map((e: any) => ({
      from: safeString(e?.from).trim(),
      to: safeString(e?.to).trim(),
      label: typeof e?.label === "string" ? e.label : undefined,
    }))
    .filter((e) => e.from && e.to && used.has(e.from) && used.has(e.to));

  // Ensure there is at least one seed node (create one if missing)
  const hasSeed = dedupedNodes.some((n) => n.type === "seed");
  if (!hasSeed) {
    dedupedNodes.unshift({
      id: "seed",
      label: "Seed",
      type: "seed",
    });
    used.add("seed");
  }

  return { nodes: dedupedNodes, edges };
}

/**
 * Calls /api/public/chat (your Next proxy) and expects strict JSON.
 *
 * IMPORTANT: This uses your frontend route `/api/public/chat`
 * so it works both locally and on Vercel, while the route itself
 * can proxy to Railway (recommended).
 */
export async function generateThoughtForgeExpansion(params: {
  seed: string;
  mode: "seedToConcepts" | "conceptToDetails";
  focusNodeLabel?: string;
}): Promise<ThoughtForgeAIResponse> {
  const system = `
Return ONLY valid JSON:
{
  "nodes": [{ "id": "string", "label": "string", "type": "seed|concept|detail" }],
  "edges": [{ "from": "string", "to": "string", "label": "string" }]
}
Rules:
- JSON only (no markdown)
- Include one seed node
- Use unique ids
- Concept count: 8–12 (seedToConcepts)
- Detail count: 6–10 (conceptToDetails)
`.trim();

  const user =
    params.mode === "seedToConcepts"
      ? `Seed: "${params.seed}". Generate 8–12 distinct concept nodes connected from the seed.`
      : `Seed: "${params.seed}". Expand "${params.focusNodeLabel ?? "this concept"}" into 6–10 detail nodes connected from that concept.`;

  const res = await fetch("/api/public/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });

  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(`AI request failed (${res.status}): ${t.slice(0, 200)}`);
  }

  const text = await res.text();
  const parsed = extractJSON(text);
  return normalizeAIResponse(parsed);
}

/**
 * Optional helper: convert AI response to TFGraph.
 * Ready for Phase 2 wiring.
 */
export function aiResponseToGraph(ai: ThoughtForgeAIResponse): TFGraph {
  return {
    nodes: ai.nodes,
    links: ai.edges.map((e) => ({
      source: e.from,
      target: e.to,
      label: e.label,
    })),
  };
}

/**
 * Merge an AI response into an existing graph safely.
 * This prevents duplicate nodes/links and lets you expand progressively.
 */
export function mergeGraphWithAI(graph: TFGraph, ai: ThoughtForgeAIResponse): TFGraph {
  const nodeMap = new Map<string, ThoughtForgeNode>();
  for (const n of graph.nodes) nodeMap.set(n.id, n);
  for (const n of ai.nodes) {
    if (!nodeMap.has(n.id)) nodeMap.set(n.id, n);
  }

  const linkKey = (l: ThoughtForgeLink) => `${l.source}::${l.target}::${l.label ?? ""}`;
  const linkSet = new Set<string>(graph.links.map(linkKey));

  const mergedLinks: ThoughtForgeLink[] = [...graph.links];
  for (const e of ai.edges) {
    const l: ThoughtForgeLink = { source: e.from, target: e.to, label: e.label };
    const k = linkKey(l);
    if (!linkSet.has(k)) {
      linkSet.add(k);
      mergedLinks.push(l);
    }
  }

  return {
    nodes: Array.from(nodeMap.values()),
    links: mergedLinks,
  };
}