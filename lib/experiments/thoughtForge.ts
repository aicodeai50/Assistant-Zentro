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
  // We treat "expanded" as having at least one outgoing link.
  const alreadyExpanded = graph.links.some((l) => l.source === nodeId);
  if (alreadyExpanded) return graph;

  const base = slugify(node.label || "node");
  const newNodes: ThoughtForgeNode[] = [
    { id: uniqueId(`${base}-detail`, existingIds), label: "Example", type: "detail" },
    { id: uniqueId(`${base}-implication`, existingIds), label: "Implication", type: "detail" },
    { id: uniqueId(`${base}-next-step`, existingIds), label: "Next step", type: "detail" },
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

/**
 * Calls /api/public/chat and expects strict JSON.
 * Keep this here so later we can swap expandNode() -> AI-driven expansion.
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
      : `Seed: "${params.seed}". Expand "${params.focusNodeLabel}" into 6–10 detail nodes connected from that concept.`;

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

  if (!res.ok) throw new Error("AI request failed");

  return extractJSON(await res.text()) as ThoughtForgeAIResponse;
}

/**
 * Optional helper: convert AI response to TFGraph.
 * Not used yet by your page, but ready for Phase 2 wiring.
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