"use client";

import { useState } from "react";

export type ResultPayload = {
  spec?: {
    name?: string;
    purpose?: string;
    template?: string;
    slug?: string;
  };
  code?: {
    route_code?: string;
    schema_code?: string;
    curl_example?: string;
  };
  endpoint?: string;
  name?: string;
  purpose?: string;
  template?: string;
  slug?: string;
  files?: {
    route_file?: string;
    schema_file?: string;
  };
  [key: string]: unknown;
};

type Props = {
  result: ResultPayload | null;
  mode?: "code" | "text";
};

export default function ResultPanel({ result, mode = "code" }: Props) {
  const [copied, setCopied] = useState<string | null>(null);
  const spec = result?.spec;
  const code = result?.code;
  const endpoint = result?.endpoint;

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    });
  }

  function buildTextSummary() {
    if (!result) return "";
    const name = spec?.name || result?.name || "Your API";
    const purpose = spec?.purpose || result?.purpose || "";
    const template = spec?.template || result?.template || "";
    const slug = spec?.slug || result?.slug || "";
    const ep = endpoint || `https://api.shynvo.com/run/${slug}`;
    return `✅ Your API has been generated!

Name: ${name}
Purpose: ${purpose}
Template: ${template}
Endpoint: ${ep}

How to use it:
Send a POST request to ${ep} with your action and input parameters. The platform will execute the workflow and return the result.

Your endpoint is ready to save and run from the Builder below.`;
  }

  return (
    <section className="rounded-[28px] border border-white/10 bg-black/20 p-6 xl:col-span-3">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold text-white">Runtime Output</h2>
        <p className="mt-1 text-sm leading-6 text-white/50">
          {mode === "text"
            ? "Plain-language summary of your generated API."
            : "Payloads, execution state, and generated endpoint context."}
        </p>
      </div>

      {!result ? (
        <pre className="min-h-[160px] overflow-auto rounded-3xl border border-white/10 bg-[#08110d] p-5 text-sm text-white/30">
          {mode === "text"
            ? "Your plain-text API summary will appear here after generation."
            : "No execution result yet."}
        </pre>
      ) : mode === "text" ? (

        /* ── TEXT MODE ── */
        <div className="space-y-5">
          <div className="relative rounded-3xl border border-emerald-400/20 bg-emerald-400/[0.05] p-6">
            <button
              type="button"
              onClick={() => copy(buildTextSummary(), "summary")}
              className="absolute right-4 top-4 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs text-white/60 hover:text-white transition"
            >
              {copied === "summary" ? "✓ Copied" : "Copy"}
            </button>
            <pre className="whitespace-pre-wrap text-sm leading-7 text-emerald-100">
              {buildTextSummary()}
            </pre>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm">
              <div className="text-white/40 mb-1">API Name</div>
              <div className="text-white font-medium">{spec?.name || result?.name || "—"}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm">
              <div className="text-white/40 mb-1">Template</div>
              <div className="text-white font-medium">{spec?.template || result?.template || "—"}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm sm:col-span-2">
              <div className="text-white/40 mb-1">Endpoint</div>
              <div className="text-emerald-200 font-mono text-xs break-all">
                {endpoint || `https://api.shynvo.com/run/${spec?.slug || result?.slug || "—"}`}
              </div>
            </div>
          </div>
        </div>

      ) : (

        /* ── CODE MODE ── */
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="mb-3 text-lg font-semibold text-white">Execution Console</h3>
              <pre className="min-h-[200px] overflow-auto rounded-2xl border border-white/10 bg-[#08110d] p-4 text-sm text-emerald-100">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>

            {code?.route_code && (
              <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                <button
                  type="button"
                onClick={() => copy(code.route_code ?? "", "route")}
                  className="absolute right-5 top-5 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs text-white/60 hover:text-white transition"
                >
                  {copied === "route" ? "✓ Copied" : "Copy"}
                </button>
                <h3 className="mb-3 text-lg font-semibold text-white">Route Code</h3>
                <pre className="overflow-auto rounded-2xl border border-white/10 bg-[#08110d] p-4 pr-16 text-sm text-emerald-100">
                  {code.route_code}
                </pre>
              </div>
            )}

            {code?.schema_code && (
              <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                <button
                  type="button"
                onClick={() => copy(code.schema_code ?? "", "schema")}
                  className="absolute right-5 top-5 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs text-white/60 hover:text-white transition"
                >
                  {copied === "schema" ? "✓ Copied" : "Copy"}
                </button>
                <h3 className="mb-3 text-lg font-semibold text-white">Schema Code</h3>
                <pre className="overflow-auto rounded-2xl border border-white/10 bg-[#08110d] p-4 pr-16 text-sm text-emerald-100">
                  {code.schema_code}
                </pre>
              </div>
            )}

            {code?.curl_example && (
              <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                <button
                  type="button"
                onClick={() => copy(code.curl_example ?? "", "curl")}
                  className="absolute right-5 top-5 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs text-white/60 hover:text-white transition"
                >
                  {copied === "curl" ? "✓ Copied" : "Copy"}
                </button>
                <h3 className="mb-3 text-lg font-semibold text-white">cURL Example</h3>
                <pre className="overflow-auto rounded-2xl border border-white/10 bg-[#08110d] p-4 pr-16 text-sm text-emerald-100">
                  {code.curl_example}
                </pre>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="mb-4 text-lg font-semibold text-white">Runtime Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-white/50">Workflow</span>
                  <span className="text-right text-white">{spec?.slug || result?.slug || "—"}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-white/50">Template</span>
                  <span className="text-right text-white">{spec?.template || result?.template || "—"}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-white/50">Endpoint</span>
                  <span className="text-right font-mono text-xs text-emerald-200">{endpoint || "—"}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-white/50">API Name</span>
                  <span className="text-right text-white">{spec?.name || result?.name || "—"}</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="mb-4 text-lg font-semibold text-white">Generated Spec</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-white/50">Purpose</div>
                  <div className="mt-1 text-white">{spec?.purpose || result?.purpose || "—"}</div>
                </div>
                <div>
                  <div className="text-white/50">Files</div>
                  <div className="mt-1 text-white">
                    {result?.files?.route_file || "—"} / {result?.files?.schema_file || "—"}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="mb-4 text-lg font-semibold text-white">Flow</h3>
              <div className="space-y-3 text-sm text-white">
                <div className="rounded-2xl border border-white/10 px-4 py-3">Describe API</div>
                <div className="rounded-2xl border border-white/10 px-4 py-3">Generate backend draft</div>
                <div className="rounded-2xl border border-white/10 px-4 py-3">Save endpoint</div>
                <div className="rounded-2xl border border-white/10 px-4 py-3">Run endpoint</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
