"use client";

import { useState } from "react";

type Props = {
  prompt: string;
  isGenerating: boolean;
  onChangePrompt: (value: string) => void;
  onGenerate: () => void;
  generatedSlug?: string;
  generatedApiKey?: string;
};

const TABS = ["Python", "JavaScript", "cURL"] as const;
type Tab = (typeof TABS)[number];

function buildSnippets(slug: string, apiKey: string, endpoint: string) {
  return {
    Python: `import requests

response = requests.post(
    "${endpoint}",
    headers={
        "Authorization": "Bearer ${apiKey}",
        "Content-Type": "application/json",
    },
    json={
        "action": "run",
        "input": {"item": "red cube", "destination": "target"},
    },
)
print(response.json())`,

    JavaScript: `const response = await fetch("${endpoint}", {
  method: "POST",
  headers: {
    "Authorization": "Bearer ${apiKey}",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    action: "run",
    input: { item: "red cube", destination: "target" },
  }),
});
const data = await response.json();
console.log(data);`,

    cURL: `curl -X POST "${endpoint}" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{"action":"run","input":{"item":"red cube","destination":"target"}}'`,
  };
}

export default function ApiGeneratorPanel({
  prompt,
  isGenerating,
  onChangePrompt,
  onGenerate,
  generatedSlug,
  generatedApiKey,
}: Props) {
  const [tab, setTab] = useState<Tab>("Python");
  const [copied, setCopied] = useState(false);
  const [keyCopied, setKeyCopied] = useState(false);

  const hasSnippet = !!generatedSlug && !!generatedApiKey;
  const endpoint = hasSnippet
    ? `https://api.shynvo.com/run/${generatedSlug}`
    : "";
  const snippets = hasSnippet
    ? buildSnippets(generatedSlug, generatedApiKey, endpoint)
    : { Python: "", JavaScript: "", cURL: "" };

  function copySnippet() {
    if (!hasSnippet) return;
    navigator.clipboard.writeText(snippets[tab]).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function copyKey() {
    if (!generatedApiKey) return;
    navigator.clipboard.writeText(generatedApiKey).then(() => {
      setKeyCopied(true);
      setTimeout(() => setKeyCopied(false), 2000);
    });
  }

  return (
    <div className="space-y-5">

      {/* Prompt */}
      <section className="rounded-[28px] border border-white/10 bg-black/20 p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-white">API Generator</h2>
            <p className="mt-1 text-sm leading-6 text-white/50">
              Describe the API you want. The platform generates a real backend endpoint.
            </p>
          </div>
          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
            Real Backend
          </span>
        </div>

        <textarea
          className="min-h-[160px] w-full rounded-3xl border border-white/10 bg-[#08110d] px-5 py-4 text-sm text-emerald-100 outline-none transition placeholder:text-white/30 focus:border-emerald-400/40"
          value={prompt}
          onChange={(e) => onChangePrompt(e.target.value)}
          placeholder="Generate an API for warehouse pick-and-place automation..."
          spellCheck={false}
        />

        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-xs text-white/35">No browser API key required.</p>
          <button
            type="button"
            onClick={onGenerate}
            disabled={isGenerating}
            className={[
              "rounded-2xl px-6 py-3 text-sm font-medium transition-all",
              isGenerating
                ? "cursor-not-allowed border border-white/10 bg-white/[0.03] text-white/30"
                : "border border-emerald-400/30 bg-emerald-400/15 text-emerald-200 hover:bg-emerald-400/25",
            ].join(" ")}
          >
            {isGenerating ? "Generating…" : "Generate API"}
          </button>
        </div>
      </section>

      {/* Code Snippets */}
      <section className="rounded-[28px] border border-white/10 bg-black/20 p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Code Snippets</h2>
            <p className="mt-1 text-sm text-white/50">
              {hasSnippet
                ? `Live endpoint: ${generatedSlug}`
                : "Click Generate API above — snippets will appear here with your real key."}
            </p>
          </div>
          {hasSnippet && (
            <span className="rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs text-sky-200">
              Live
            </span>
          )}
        </div>

        {/* Tabs */}
        <div className="mb-3 flex gap-1 rounded-2xl border border-white/10 bg-white/[0.03] p-1">
          {(["Python", "JavaScript", "cURL"] as Tab[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={[
                "flex-1 rounded-xl py-2 text-sm font-medium transition",
                tab === t ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70",
              ].join(" ")}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Code block */}
        <div className="relative rounded-2xl border border-white/10 bg-[#060e0a]">
          {hasSnippet && (
            <button
              type="button"
              onClick={copySnippet}
              className="absolute right-3 top-3 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              {copied ? "✓ Copied!" : "Copy"}
            </button>
          )}
          <pre className="overflow-x-auto rounded-2xl px-5 py-5 pr-20 text-sm leading-7 text-emerald-300 min-h-[120px]">
            {hasSnippet
              ? snippets[tab]
              : "// Your real code will appear here after generation"}
          </pre>
        </div>

        {/* API Key row - FULLY VISIBLE and copyable */}
        {hasSnippet && (
          <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-3">
            <div className="mb-1 text-xs text-white/40">Your API Key — copy and save this</div>
            <div className="flex items-center gap-3">
              <code className="flex-1 break-all text-sm text-emerald-200">
                {generatedApiKey}
              </code>
              <button
                type="button"
                onClick={copyKey}
                className="shrink-0 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-200 transition hover:bg-emerald-400/20"
              >
                {keyCopied ? "✓ Copied!" : "Copy Key"}
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
