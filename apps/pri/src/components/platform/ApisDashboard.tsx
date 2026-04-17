"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { getStoredApiKey } from "@/lib/auth";

type ApiListItem = {
  id: number;
  name: string;
  purpose: string;
  template: string;
  slug?: string;
  created_at?: string;
};

type ApiListResponse = {
  success: boolean;
  items: ApiListItem[];
};

const SELECTED_API_KEY = "shynvo_selected_api";

function fallbackSlug(value: string) {
  return value.toLowerCase().trim().replace(/\s+/g, "_");
}

export default function ApisDashboard() {
  const router = useRouter();
  const [apiKey, setApiKey] = useState("");
  const [items, setItems] = useState<ApiListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    const key = getStoredApiKey();
    setApiKey(key);
  }, []);

  useEffect(() => {
    if (!apiKey) {
      setLoading(false);
      return;
    }

    let active = true;

    async function load() {
      try {
        setLoading(true);
        setErrorText("");

        const data = await apiFetch<ApiListResponse>("/generator/api-spec/list", apiKey);

        if (!active) return;
        setItems(data.items || []);
      } catch (error) {
        if (!active) return;
        setErrorText(error instanceof Error ? error.message : "Failed to load APIs");
      } finally {
        if (active) setLoading(false);
      }
    }

    void load();

    return () => {
      active = false;
    };
  }, [apiKey]);

  const latestApi = useMemo(() => {
    if (!items.length) return null;
    return items[0];
  }, [items]);

  function openInBuilder(item: ApiListItem) {
    const slug = item.slug || fallbackSlug(item.name);

    try {
      window.localStorage.setItem(
        SELECTED_API_KEY,
        JSON.stringify({
          slug,
          name: item.name,
          purpose: item.purpose,
          template: item.template,
          selectedAt: new Date().toISOString(),
        })
      );
    } catch {
      // ignore local storage errors
    }

    const params = new URLSearchParams({
      slug,
      name: item.name,
      purpose: item.purpose || "",
      template: item.template,
    });

    router.push(`/builder?${params.toString()}`);
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-white/10 bg-black/20 p-8 text-white">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-white/40">
              Registry
            </div>
            <h2 className="mt-2 text-3xl font-semibold">Live API Registry</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55">
              View saved programmable robot endpoints, track what has been created, and use Builder as the creation surface.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/builder"
              className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200"
            >
              Open Builder
            </Link>

            <Link
              href="/platform/runs"
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/80"
            >
              View Runs
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="text-sm text-white/45">Saved APIs</div>
            <div className="mt-3 text-4xl font-semibold">
              {loading ? "--" : items.length}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="text-sm text-white/45">Latest API</div>
            <div className="mt-3 text-lg font-medium">
              {loading ? "--" : latestApi?.name || "No saved APIs yet"}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="text-sm text-white/45">API Key Status</div>
            <div className="mt-3 text-lg font-medium">
              {apiKey ? "Connected" : "No API key loaded"}
            </div>
          </div>
        </div>
      </section>

      {errorText ? (
        <section className="rounded-3xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-100">
          API registry warning: {errorText}
        </section>
      ) : null}

      {!apiKey ? (
        <section className="rounded-3xl border border-sky-400/20 bg-sky-400/10 p-5 text-sm text-sky-100">
          No API key found in local storage. Open Builder, paste your API key, and this page will load your saved APIs.
        </section>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-3xl border border-white/10 bg-black/20 p-8 text-white">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.24em] text-white/40">
                Saved Endpoints
              </div>
              <h3 className="mt-2 text-2xl font-semibold">API Cards</h3>
            </div>

            <Link
              href="/builder"
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/80"
            >
              Create New API
            </Link>
          </div>

          <div className="mt-6 space-y-4">
            {loading ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-white/60">
                Loading saved APIs...
              </div>
            ) : items.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-6">
                <div className="text-lg font-medium">No saved APIs yet</div>
                <p className="mt-2 text-sm text-white/55">
                  Create your first API in Builder, then come back here to view the registry.
                </p>
              </div>
            ) : (
              items.map((item) => {
                const resolvedSlug = item.slug || fallbackSlug(item.name);

                return (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0">
                        <div className="text-lg font-medium text-white">{item.name}</div>
                        <div className="mt-1 text-xs text-white/45">{resolvedSlug}</div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
                            {item.template}
                          </span>

                          {item.created_at ? (
                            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70">
                              {item.created_at}
                            </span>
                          ) : null}
                        </div>

                        <p className="mt-4 max-w-2xl text-sm leading-6 text-white/55">
                          {item.purpose || "No purpose provided."}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => openInBuilder(item)}
                          className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200"
                        >
                          Open in Builder
                        </button>

                        <Link
                          href="/platform/runs"
                          className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/80"
                        >
                          View Runs
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-black/20 p-6 text-white">
            <div className="text-sm font-medium">Latest API Snapshot</div>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-sm text-white/45">Name</div>
                <div className="mt-2 font-medium">
                  {latestApi?.name || "No saved API yet"}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-sm text-white/45">Template</div>
                <div className="mt-2 font-medium">
                  {latestApi?.template || "--"}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-sm text-white/45">Slug</div>
                <div className="mt-2 font-medium">
                  {latestApi ? latestApi.slug || fallbackSlug(latestApi.name) : "--"}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/20 p-6 text-white">
            <div className="text-sm font-medium">Next Step</div>
            <p className="mt-3 text-sm leading-6 text-white/55">
              Clicking Open in Builder now preloads name, purpose, template, and slug. Config restores too when it was cached from a previous save in this browser.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/20 p-6 text-white">
            <div className="text-sm font-medium">Return Path</div>
            <div className="mt-4 space-y-3">
              <Link
                href="/"
                className="block rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm"
              >
                Back to Overview
              </Link>
              <Link
                href="/builder"
                className="block rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm"
              >
                Open Builder
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
