"use client";

import { useMemo, useState } from "react";
import ExperimentsNav from "@/components/experiments/ExperimentsNav";
import { getSupabaseClient } from "@/lib/supabase/client";

type PracticeType =
  | "Interview"
  | "Oral Exam"
  | "Presentation"
  | "Difficult Conversation";

type PracticeResult = {
  sessionBrief: string;
  firstChallenge: string;
  evaluatorFocus: string;
  strongPattern: string;
  mistakes: string;
  nextDrill: string;
  expandedNotes: string;
};

const STARTERS: Record<PracticeType, string[]> = {
  Interview: [
    "Prepare me for a junior IT support interview.",
    "Help me practice for a frontend developer interview.",
  ],
  "Oral Exam": [
    "Test me orally on biology revision for high school.",
    "Help me rehearse oral answers for a machine learning exam.",
  ],
  Presentation: [
    "Help me prepare for a 5-minute startup pitch presentation.",
    "Let me rehearse a class presentation on climate change.",
  ],
  "Difficult Conversation": [
    "Help me prepare for a hard conversation with my teammate.",
    "Help me rehearse a calm conversation about disappointment and boundaries.",
  ],
};

function normalizePracticeResult(input: Partial<PracticeResult>, prompt: string): PracticeResult {
  return {
    sessionBrief:
      input.sessionBrief?.trim() ||
      `This practice session is focused on: ${prompt}`,
    firstChallenge:
      input.firstChallenge?.trim() ||
      `Start by responding directly to this scenario: ${prompt}`,
    evaluatorFocus:
      input.evaluatorFocus?.trim() ||
      "The evaluator is likely judging clarity, relevance, calm delivery, and whether your answer fits the situation.",
    strongPattern:
      input.strongPattern?.trim() ||
      "Answer directly, support it with one strong example, and close with a clear conclusion.",
    mistakes:
      input.mistakes?.trim() ||
      "Avoid vague wording, rambling, weak structure, and failing to answer the real question.",
    nextDrill:
      input.nextDrill?.trim() ||
      "Repeat the scenario once more and improve clarity, sharpness, and confidence.",
    expandedNotes:
      input.expandedNotes?.trim() ||
      "Use this session to rehearse carefully. Focus on answering directly, staying relevant, and speaking with calm structure. After your first response, review where you became vague, too broad, or less confident, then improve the second version."
  };
}

function extractJsonObject(raw: string): string | null {
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  return raw.slice(start, end + 1);
}

async function fetchPracticeReply(input: string, selected: PracticeType): Promise<PracticeResult> {
  const systemPrompt = `
You are Shynvo Practice Arena inside the Experiments environment.

Your role:
- You help users rehearse real situations professionally.
- You prepare them for performance, pressure, clarity, and confident delivery.
- You are a structured practice trainer, not a generic chatbot.

Current practice mode:
- ${selected}

Behavior:
- Be practical, direct, realistic, and structured.
- Tailor every field to the user's exact prompt.
- Keep the short sections concise and specific.
- Also provide one richer long-form coaching section.
- Do not mention backend systems, models, APIs, or infrastructure.
- Stay fully in the role of Practice Arena.

You MUST return ONLY valid JSON.
Do not include markdown.
Do not include code fences.
Do not include explanation outside JSON.

Return this exact JSON shape:
{
  "sessionBrief": "string",
  "firstChallenge": "string",
  "evaluatorFocus": "string",
  "strongPattern": "string",
  "mistakes": "string",
  "nextDrill": "string",
  "expandedNotes": "string"
}

Field rules:
- "sessionBrief": explain what this exact practice session is preparing the user for
- "firstChallenge": give the first realistic question, challenge, or opening task
- "evaluatorFocus": explain what the other side is likely judging in this exact situation
- "strongPattern": show the best answer structure for this exact prompt
- "mistakes": list the most likely mistakes for this exact prompt
- "nextDrill": give the next useful drill after the first response
- "expandedNotes": provide a richer, longer coaching explanation tailored to this exact prompt, around 120 to 220 words, practical and specific, not generic
`.trim();

  const payload = {
    message: input,
    systemPrompt,
    messages: [{ role: "user", content: input }],
  };

  const supabase = getSupabaseClient();

  let token = "";
  if (supabase) {
    const sessionResult = await supabase.auth.getSession();
    token = sessionResult.data.session?.access_token || "";

    if (!token) {
      const refreshed = await supabase.auth.refreshSession();
      token = refreshed.data.session?.access_token || "";
    }
  }

  let res = await fetch("/api/public/chat", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  if (res.status === 401 && supabase) {
    const refreshed = await supabase.auth.refreshSession();
    const retryToken = refreshed.data.session?.access_token || "";

    res = await fetch("/api/public/chat", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(retryToken ? { authorization: `Bearer ${retryToken}` } : {}),
      },
      body: JSON.stringify(payload),
    });
  }

  const raw = await res.text();

  if (!res.ok) {
    throw new Error(raw || "Practice Arena could not respond right now.");
  }

  let text = raw;

  try {
    const data = JSON.parse(raw) as Partial<PracticeResult> & {
      answer?: string;
      reply?: string;
      message?: string;
      error?: string;
    };

    if (data.error) throw new Error(data.error);

    if (
      data.sessionBrief ||
      data.firstChallenge ||
      data.evaluatorFocus ||
      data.strongPattern ||
      data.mistakes ||
      data.nextDrill ||
      data.expandedNotes
    ) {
      return normalizePracticeResult(data, input);
    }

    text = data.answer || data.reply || data.message || raw;
  } catch {
    text = raw;
  }

  const jsonBlock = extractJsonObject(text);
  if (jsonBlock) {
    try {
      const parsed = JSON.parse(jsonBlock) as Partial<PracticeResult>;
      return normalizePracticeResult(parsed, input);
    } catch {
      return normalizePracticeResult({}, input);
    }
  }

  return normalizePracticeResult({}, input);
}

function OutputCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="text-sm font-semibold text-white">{title}</div>
      <div className="mt-2 text-sm leading-6 text-white/75">{body}</div>
    </div>
  );
}

export default function PracticePage() {
  const [selected, setSelected] = useState<PracticeType>("Interview");
  const [prompt, setPrompt] = useState("");
  const [sessionBrief, setSessionBrief] = useState("");
  const [firstChallenge, setFirstChallenge] = useState("");
  const [evaluatorFocus, setEvaluatorFocus] = useState("");
  const [strongPattern, setStrongPattern] = useState("");
  const [mistakes, setMistakes] = useState("");
  const [nextDrill, setNextDrill] = useState("");
  const [expandedNotes, setExpandedNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const starterItems = useMemo(() => STARTERS[selected], [selected]);

  async function startPractice(customText?: string) {
    const text = (customText ?? prompt).trim();
    if (!text || loading) return;

    if (customText) setPrompt(customText);

    setHasRun(true);
    setLoading(true);

    setSessionBrief("Preparing your practice session...");
    setFirstChallenge("Generating the first challenge...");
    setEvaluatorFocus("Analyzing the evaluator focus...");
    setStrongPattern("Building the best response pattern...");
    setMistakes("Listing the likely mistakes...");
    setNextDrill("Preparing the next drill...");
    setExpandedNotes("Preparing deeper coaching notes...");

    try {
      const result = await fetchPracticeReply(text, selected);
      setSessionBrief(result.sessionBrief);
      setFirstChallenge(result.firstChallenge);
      setEvaluatorFocus(result.evaluatorFocus);
      setStrongPattern(result.strongPattern);
      setMistakes(result.mistakes);
      setNextDrill(result.nextDrill);
      setExpandedNotes(result.expandedNotes);
    } catch {
      const fallback = normalizePracticeResult({}, text);
      setSessionBrief(fallback.sessionBrief);
      setFirstChallenge(fallback.firstChallenge);
      setEvaluatorFocus(fallback.evaluatorFocus);
      setStrongPattern(fallback.strongPattern);
      setMistakes(fallback.mistakes);
      setNextDrill(fallback.nextDrill);
      setExpandedNotes(fallback.expandedNotes);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-10 sm:py-14">
      <ExperimentsNav />

      <div className="text-xs font-semibold uppercase tracking-wider text-cyan-100/70">
        Experiments
      </div>

      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
        Practice Arena
      </h1>

      <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
        Practice Arena helps users rehearse real situations with structured AI guidance. It is built
        for interviews, oral exams, presentations, pitches, and difficult conversations.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        {(["Interview", "Oral Exam", "Presentation", "Difficult Conversation"] as PracticeType[]).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setSelected(item)}
            className={`rounded-3xl border px-5 py-5 text-left transition ${
              selected === item
                ? "border-white bg-white text-[#0B0F14]"
                : "border-white/10 bg-white/5 text-white/85 hover:bg-white/10"
            }`}
          >
            <div className="text-lg font-semibold">{item}</div>
            <div className="mt-1 text-sm opacity-80">
              {item === "Interview" && "Practice job and internship interviews"}
              {item === "Oral Exam" && "Rehearse academic response under pressure"}
              {item === "Presentation" && "Practice clear speaking and delivery"}
              {item === "Difficult Conversation" && "Rehearse important personal or team discussions"}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {starterItems.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => startPractice(item)}
            className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10"
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
        <div className="text-sm font-semibold text-white">Practice Prompt</div>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the exact practice situation you want to rehearse..."
          className="mt-4 min-h-[180px] w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-white/35"
        />

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={() => startPractice()}
            disabled={loading || !prompt.trim()}
            className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90 disabled:opacity-50"
          >
            {loading ? "Preparing..." : "Start Practice"}
          </button>
        </div>
      </div>

      {!hasRun ? (
        <div className="mt-6 rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
          <div className="text-sm font-semibold text-white">Training Structure</div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <OutputCard
              title="What happens here"
              body="Once you start, Practice Arena prepares a structured rehearsal session based on your exact scenario."
            />
            <OutputCard
              title="What you will receive"
              body="You will get both short guidance sectors and a richer long-form coaching section."
            />
          </div>
        </div>
      ) : (
        <div className="mt-6 space-y-5">
          <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
              <div className="text-sm font-semibold text-white">Session Flow</div>
              <div className="mt-4 space-y-4">
                <OutputCard title="Session Brief" body={sessionBrief} />
                <OutputCard title="First Challenge" body={firstChallenge} />
                <OutputCard title="Evaluator Focus" body={evaluatorFocus} />
              </div>
            </div>

            <div className="rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
              <div className="text-sm font-semibold text-white">Performance Guidance</div>
              <div className="mt-4 space-y-4">
                <OutputCard title="Strong Response Pattern" body={strongPattern} />
                <OutputCard title="Common Mistakes" body={mistakes} />
                <OutputCard title="Next Drill" body={nextDrill} />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
            <div className="text-sm font-semibold text-white">Expanded Coaching Notes</div>
            <div className="mt-4 whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/75">
              {expandedNotes}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
