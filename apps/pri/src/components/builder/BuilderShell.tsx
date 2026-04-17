"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  apiFetch,
  generateApiFromPrompt,
  GenerateApiResponse,
} from "@/lib/api";
import { ExecutionResponse, SaveApiResponse, TemplateOption } from "@/lib/types";
import ApiGeneratorPanel from "./ApiGeneratorPanel";
import ApiDefinitionPanel from "./ApiDefinitionPanel";
import TemplateConfigPanel from "./TemplateConfigPanel";
import ExecutionPanel from "./ExecutionPanel";
import ResultPanel from "./ResultPanel";
import WalletPanel from "./WalletPanel";
import SavedApisPanel from "./SavedApisPanel";

const ACTIVITY_KEY = "shynvo_overview_activity";
const SELECTED_API_KEY = "shynvo_selected_api";
const SAVED_API_CACHE_KEY = "shynvo_saved_api_cache";

type WalletResponse = {
  success: boolean;
  username: string;
  balance: number;
  total_purchased: number;
  total_spent: number;
  plan_name?: string;
};

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

type CachedSavedApi = {
  slug: string;
  name: string;
  purpose: string;
  template: string;
  config: unknown;
  updatedAt: string;
};

type GeneratedSource = {
  name?: string;
  purpose?: string;
  template?: string;
  config?: Record<string, unknown>;
  input?: Record<string, unknown>;
  slug?: string;
};

function writeOverviewActivity(nextData: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(ACTIVITY_KEY);
    const current = raw ? JSON.parse(raw) : {};
    const merged = {
      ...current,
      ...nextData,
      updatedAt: new Date().toLocaleString(),
    };
    window.localStorage.setItem(ACTIVITY_KEY, JSON.stringify(merged));
  } catch {}
}

function writeSavedApiCache(entry: CachedSavedApi) {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(SAVED_API_CACHE_KEY);
    const current = raw ? JSON.parse(raw) : {};
    current[entry.slug] = entry;
    window.localStorage.setItem(SAVED_API_CACHE_KEY, JSON.stringify(current));
  } catch {}
}

function readSavedApiCache(slug: string) {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SAVED_API_CACHE_KEY);
    const current = raw ? JSON.parse(raw) : {};
    return current[slug] || null;
  } catch {
    return null;
  }
}

function readSelectedApi() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SELECTED_API_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function safeParseJson(text: string) {
  try {
    return {
      ok: true as const,
      value: JSON.parse(text || "{}"),
      error: "",
    };
  } catch (error) {
    return {
      ok: false as const,
      value: null,
      error: error instanceof Error ? error.message : "Invalid JSON",
    };
  }
}

function normalizeGeneratedPayload(data: GenerateApiResponse) {
  const source: GeneratedSource =
    (data as GeneratedSource);

  return {
    name: source.name ?? "Generated Robot Workflow",
    purpose: source.purpose ?? "Generated programmable robot workflow",
    template: source.template ?? "pick_and_place",
    config: source.config ?? {
      default_item: "red cube",
      default_destination: "target",
    },
    input: source.input ?? {
      action: "run",
      input: {
        item: "red cube",
        destination: "target",
      },
    },
    slug: source.slug ?? "",
  };
}

export default function BuilderShell() {
  const searchParams = useSearchParams();

  const [generatorPrompt, setGeneratorPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const [name, setName] = useState("Robot Starter Workflow");
  const [purpose, setPurpose] = useState("Create a programmable robot workflow endpoint");
  const [selectedTemplate, setSelectedTemplate] = useState("pick_and_place");
  const [configText, setConfigText] = useState(
    JSON.stringify({ default_item: "red cube", default_destination: "target" }, null, 2)
  );
  const [inputText, setInputText] = useState(
    JSON.stringify({ action: "run", input: { item: "red cube", destination: "target" } }, null, 2)
  );
  const [slug, setSlug] = useState("");
  const [templates, setTemplates] = useState<TemplateOption[]>([]);
  const [result, setResult] = useState<unknown>(null);
  const [statusText, setStatusText] = useState("Idle");
  const [isSaving, setIsSaving] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [apiMode, setApiMode] = useState<"code" | "text">("code");
  const [generatedApiKey, setGeneratedApiKey] = useState("");

  const [balance, setBalance] = useState<number | null>(null);
  const [totalPurchased, setTotalPurchased] = useState<number | null>(null);
  const [totalSpent, setTotalSpent] = useState<number | null>(null);
  const [planName, setPlanName] = useState("");
  const [savedApis, setSavedApis] = useState<ApiListItem[]>([]);

  useEffect(() => {
    void loadTemplates();
    void loadWallet();
    void loadSavedApis();
  }, []);

  useEffect(() => {
    const slugParam = searchParams.get("slug");
    const nameParam = searchParams.get("name");
    const purposeParam = searchParams.get("purpose");
    const templateParam = searchParams.get("template");

    const selectedFromStorage = readSelectedApi();
    const resolvedSlug = slugParam || selectedFromStorage?.slug;

    if (nameParam || selectedFromStorage?.name) {
      setName(nameParam || selectedFromStorage?.name || "");
    }
    if (purposeParam || selectedFromStorage?.purpose) {
      setPurpose(purposeParam || selectedFromStorage?.purpose || "");
    }
    if (templateParam || selectedFromStorage?.template) {
      setSelectedTemplate(templateParam || selectedFromStorage?.template || "pick_and_place");
    }

    if (resolvedSlug) {
      setSlug(resolvedSlug);
      const cached = readSavedApiCache(resolvedSlug);
      if (cached?.config) {
        setConfigText(JSON.stringify(cached.config, null, 2));
      }
      setStatusText(`Loaded ${resolvedSlug} into Builder`);
    }
  }, [searchParams]);

  async function loadTemplates() {
    try {
      const data = await apiFetch<{ success: boolean; templates: TemplateOption[] }>(
        "/api/proxy/templates",
        ""
      );
      setTemplates(data.templates || []);
    } catch {
      setTemplates([
        { name: "pick_and_place", description: "Pick an item and place it at a target" },
        { name: "inspection", description: "Inspect robot and world state" },
        { name: "move_to_target", description: "Move robot arm to a target point" },
        { name: "alert_on_failure", description: "Run a workflow and report failure conditions" },
      ]);
    }
  }

  async function loadWallet() {
    try {
      const data = await apiFetch<WalletResponse>("/api/proxy/wallet", "");
      setBalance(data.balance);
      setTotalPurchased(data.total_purchased);
      setTotalSpent(data.total_spent);
      setPlanName(data.plan_name || "");
    } catch {}
  }

  async function loadSavedApis() {
    try {
      const data = await apiFetch<ApiListResponse>("/api/proxy/apis", "");
      setSavedApis(data.items || []);
    } catch {
      setSavedApis([]);
    }
  }

  const parsedConfig = useMemo(() => safeParseJson(configText), [configText]);
  const parsedInput = useMemo(() => safeParseJson(inputText), [inputText]);

  async function handleGenerateDraft() {
    try {
      if (!generatorPrompt.trim()) {
        setStatusText("Describe the API you want first.");
        setResult({ error: "Missing generator prompt" });
        return;
      }

      setIsGenerating(true);
      setStatusText("Generating real API from backend...");

      const data = await generateApiFromPrompt("", generatorPrompt);
      const normalized = normalizeGeneratedPayload(data);

      setName(normalized.name);
      setPurpose(normalized.purpose);
      setSelectedTemplate(normalized.template);
      setConfigText(JSON.stringify(normalized.config, null, 2));
      setInputText(JSON.stringify(normalized.input, null, 2));
      setSlug(normalized.slug || "");
      const rawKey = (data as any).api_key || (data as any).spec?.api_key || "";
      if (rawKey) setGeneratedApiKey(rawKey);

      if (normalized.slug) {
        writeOverviewActivity({
          lastSavedSlug: normalized.slug,
          lastSavedName: normalized.name,
        });

        writeSavedApiCache({
          slug: normalized.slug,
          name: normalized.name,
          purpose: normalized.purpose,
          template: normalized.template,
          config: normalized.config,
          updatedAt: new Date().toISOString(),
        });

        setStatusText(`Real API generated: ${normalized.slug}`);
      } else {
        setStatusText(`Real backend draft generated for ${normalized.name}`);
      }

      setResult(data);
      await loadSavedApis();
    } catch (error) {
      const message = error instanceof Error ? error.message : "API generation failed";
      setStatusText(message);
      setResult({
        error: message,
        stage: "generate_api",
      });
    } finally {
      setIsGenerating(false);
    }
  }

  async function handleSaveApi() {
    try {
      if (!name.trim()) {
        setStatusText("API name is required.");
        setResult({ error: "Missing API name" });
        return;
      }

      if (!purpose.trim()) {
        setStatusText("Purpose is required.");
        setResult({ error: "Missing purpose" });
        return;
      }

      if (!selectedTemplate.trim()) {
        setStatusText("Select a template first.");
        setResult({ error: "Missing template" });
        return;
      }

      if (!parsedConfig.ok) {
        setStatusText(`Config JSON error: ${parsedConfig.error}`);
        setResult({ error: `Config JSON error: ${parsedConfig.error}` });
        return;
      }

      setIsSaving(true);
      setStatusText("Saving API endpoint...");

      const data = await apiFetch<SaveApiResponse>("/api/proxy/save-api", "", {
        method: "POST",
        body: JSON.stringify({
          name,
          purpose,
          template: selectedTemplate,
          config: parsedConfig.value,
        }),
      });

      const safeName = data.name ?? name;
      const safePurpose = data.purpose ?? purpose;
      const safeTemplate = data.template ?? selectedTemplate;
      const safeConfig = data.config ?? parsedConfig.value;

      setSlug(data.slug);
      setResult(data);
      setStatusText(`Saved as ${data.slug}`);

      writeOverviewActivity({
        lastSavedSlug: data.slug,
        lastSavedName: safeName,
      });

      writeSavedApiCache({
        slug: data.slug,
        name: safeName,
        purpose: safePurpose,
        template: safeTemplate,
        config: safeConfig,
        updatedAt: new Date().toISOString(),
      });

      await loadWallet();
      await loadSavedApis();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Save failed";
      setStatusText(message);
      setResult({
        error: message,
        stage: "save_api",
      });
    } finally {
      setIsSaving(false);
    }
  }

  async function handleRunApi() {
    try {
      if (!slug) {
        setStatusText("No real API slug exists yet.");
        setResult({ error: "No slug available yet." });
        return;
      }

      if (!parsedInput.ok) {
        setStatusText(`Input JSON error: ${parsedInput.error}`);
        setResult({ error: `Input JSON error: ${parsedInput.error}` });
        return;
      }

      setIsRunning(true);
      setStatusText(`Running ${slug}...`);

      const data = await apiFetch<ExecutionResponse>(`/api/proxy/run-api/${slug}`, "", {
        method: "POST",
        body: JSON.stringify(parsedInput.value),
      });

      setResult(data);
      setStatusText(data.execution?.status || "Completed");

      writeOverviewActivity({
        lastRunSlug: data.slug || slug,
        lastRunStatus: data.execution?.status || "Completed",
        lastRunSummary: data.execution?.summary || "Run completed",
      });

      await loadWallet();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Run failed";
      setStatusText(message);
      setResult({
        error: message,
        stage: "run_api",
      });
    } finally {
      setIsRunning(false);
    }
  }

  return (
    <div className="space-y-10">
      <section className="rounded-[32px] border border-white/10 bg-black/20 p-8 lg:p-10">
        <div className="grid gap-8 2xl:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <div>
              <div className="text-xs uppercase tracking-[0.24em] text-emerald-300/70">
                Step 1
              </div>
              <h2 className="mt-2 text-3xl font-semibold text-white lg:text-4xl">
                Describe what you want to build
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-white/55">
                Start with a plain-language request. The backend generator shapes it into an API spec and developer code bundle.
              </p>
            </div>

            <ApiGeneratorPanel
              prompt={generatorPrompt}
              isGenerating={isGenerating}
              onChangePrompt={setGeneratorPrompt}
              onGenerate={handleGenerateDraft}
              generatedSlug={slug || undefined}
              generatedApiKey={generatedApiKey || undefined}
            />
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6 lg:p-7">
            <div className="text-xs uppercase tracking-[0.24em] text-white/40">
              Live draft snapshot
            </div>
            <h3 className="mt-2 text-2xl font-semibold text-white">Generated structure</h3>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                <div className="text-sm text-white/45">API Name</div>
                <div className="mt-2 text-lg font-medium text-white">{name || "--"}</div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                <div className="text-sm text-white/45">Template</div>
                <div className="mt-2 text-lg font-medium text-white">{selectedTemplate || "--"}</div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/20 p-5 md:col-span-2">
                <div className="text-sm text-white/45">Purpose</div>
                <div className="mt-2 text-sm leading-7 text-white/70">{purpose || "--"}</div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/20 p-5 md:col-span-2">
                <div className="text-sm text-white/45">Current status</div>
                <div className="mt-2 text-sm leading-7 text-emerald-200">{statusText}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-10 2xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-8">
          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-emerald-300/70">
              Step 2
            </div>
            <h2 className="mt-2 text-3xl font-semibold text-white lg:text-4xl">
              Refine the endpoint
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/55">
              Review the generated identity, edit the purpose, select the template, and adjust config before publishing.
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <ApiDefinitionPanel
              name={name}
              purpose={purpose}
              onChangeName={setName}
              onChangePurpose={setPurpose}
            />

            <TemplateConfigPanel
              templates={templates}
              selectedTemplate={selectedTemplate}
              configText={configText}
              onChangeTemplate={setSelectedTemplate}
              onChangeConfigText={setConfigText}
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <WalletPanel
              balance={balance}
              totalPurchased={totalPurchased}
              totalSpent={totalSpent}
              planName={planName}
              onRefresh={loadWallet}
            />

            <SavedApisPanel
              items={savedApis}
              activeSlug={slug}
              onSelect={setSlug}
              onRefresh={loadSavedApis}
            />
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-emerald-300/70">
              Step 3
            </div>
            <h2 className="mt-2 text-3xl font-semibold text-white lg:text-4xl">
              Publish and execute
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/55">
              Save the generated draft as a real endpoint, then run it from the platform.
            </p>
          </div>

          <div className="sticky top-6 space-y-8">
            <ExecutionPanel
              inputText={inputText}
              apiKey=""
              slug={slug}
              isSaving={isSaving}
              isRunning={isRunning}
              statusText={statusText}
              onChangeApiKey={() => {}}
              onChangeInputText={setInputText}
              onSaveApi={handleSaveApi}
              onRunApi={handleRunApi}
            />

            <ResultPanel result={result} mode={apiMode} />
          </div>
        </div>
      </section>
    </div>
  );
}
