export type FrontierEngineRequest = {
  workspace: "coding" | "algorithms" | "ai-bots" | "puzzles";
  title: string;
  mode?: string;
  tone?: string;
  focus?: string[];
  userInput: string;
};

type FrontierStructuredOutput = {
  summary: string;
  meaning: string;
  nextAction: string;
  why: string[];
  deliverables: string[];
  risk: string;
  encouragement: string;
};

function fallbackOutput(message: string): FrontierStructuredOutput {
  return {
    summary: message,
    meaning:
      "Frontier received a non-standard response, so the workspace is showing a safe fallback instead of failing.",
    nextAction:
      "Try again from this workspace, or switch the selected mode and regenerate.",
    why: [
      "The workspace is protected from broken output.",
      "A route may be returning an unexpected response format.",
    ],
    deliverables: ["A safe response", "A preserved workspace state"],
    risk: "The Frontier AI routing layer may still need alignment with the preferred Shynvo route.",
    encouragement:
      "The workspace is stable. Only the route interpretation layer needs refinement.",
  };
}

function looksLikeAccessMessage(text: string) {
  const lower = text.toLowerCase();
  return (
    lower.includes("create an account") ||
    lower.includes("sign in") ||
    lower.includes("signed in") ||
    lower.includes("use ai tools in shynvo") ||
    lower.includes("upgradeurl") ||
    lower.includes('"upgradeurl"') ||
    lower.includes("pricing")
  );
}

function buildSystemPrompt(req: FrontierEngineRequest) {
  if (req.workspace === "coding") {
    return `
You are Shynvo Frontier AI inside the Coding Arena.
You are the engineering intelligence layer of Shynvo.

Return plain JSON only with keys:
summary
meaning
nextAction
why
deliverables
risk
encouragement

Rules:
- be professional
- be specific to the selected build path, mode, and user goal
- do not sound repetitive
- do not say you are ChatGPT
`;
  }

  if (req.workspace === "algorithms") {
    return `
You are Shynvo Frontier AI inside Algorithm Challenges.
You are the reasoning intelligence layer of Shynvo.

Return plain JSON only with keys:
summary
meaning
nextAction
why
deliverables
risk
encouragement

Rules:
- classify the reasoning path
- be analytical
- do not sound repetitive
`;
  }

  if (req.workspace === "ai-bots") {
    return `
You are Shynvo Frontier AI inside AI Bot Lab.
You are the AI behavior simulation layer of Shynvo.

Return plain JSON only with keys:
summary
meaning
nextAction
why
deliverables
risk
encouragement

Rules:
- explain selected mode and tone professionally
- focus on AI behavior design
- do not sound repetitive
`;
  }

  return `
You are Shynvo Frontier AI inside Logic Puzzles.
You are the reasoning training layer of Shynvo.

Return plain JSON only with keys:
summary
meaning
nextAction
why
deliverables
risk
encouragement

Rules:
- focus on logic training
- explain what the puzzle mode means
- do not sound repetitive
`;
}

function buildUserPrompt(req: FrontierEngineRequest) {
  return JSON.stringify(
    {
      workspace: req.workspace,
      selectedTitle: req.title,
      selectedMode: req.mode || "",
      selectedTone: req.tone || "",
      selectedFocus: req.focus || [],
      userInput: req.userInput,
      instruction:
        "Generate a professional Shynvo Frontier response that is specific to this selection and avoids repetitive phrasing.",
    },
    null,
    2
  );
}

function extractRawText(data: any): string {
  if (typeof data === "string") return data;

  return (
    data?.text ||
    data?.message ||
    data?.output ||
    data?.content ||
    data?.reply ||
    data?.response ||
    data?.answer ||
    data?.result ||
    data?.error ||
    data?.choices?.[0]?.message?.content ||
    data?.choices?.[0]?.text ||
    ""
  );
}

function normalizeStructured(raw: string): FrontierStructuredOutput {
  try {
    const parsed = JSON.parse(raw);

    return {
      summary: parsed.summary || "Frontier generated a live response.",
      meaning:
        parsed.meaning ||
        "The live AI response did not include a full meaning section.",
      nextAction: parsed.nextAction || "Refine the request and generate again.",
      why: Array.isArray(parsed.why)
        ? parsed.why
        : ["Frontier returned a partial structured response."],
      deliverables: Array.isArray(parsed.deliverables)
        ? parsed.deliverables
        : ["A live AI-generated result."],
      risk: parsed.risk || "The live route returned partial structured data.",
      encouragement:
        parsed.encouragement ||
        "Frontier is active and can continue refining the response.",
    };
  } catch {
    return fallbackOutput(raw || "Frontier generated a live response.");
  }
}

async function tryRoute(
  url: string,
  payload: any
): Promise<FrontierStructuredOutput> {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
    cache: "no-store",
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  let data: any = {};

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { text };
  }

  const raw = extractRawText(data);

  if (looksLikeAccessMessage(`${raw} ${text}`)) {
    throw new Error(`${url} returned access-gated message`);
  }

  if (!res.ok) {
    throw new Error(`${url} -> ${res.status}: ${text || "request failed"}`);
  }

  if (!raw || !String(raw).trim()) {
    throw new Error(`${url} returned empty content`);
  }

  return normalizeStructured(String(raw));
}

export async function runFrontierLiveEngine(
  req: FrontierEngineRequest
): Promise<FrontierStructuredOutput> {
  const messages = [
    { role: "system", content: buildSystemPrompt(req) },
    { role: "user", content: buildUserPrompt(req) },
  ];

  const attempts: Array<{ url: string; payload: any }> = [
    { url: "/api/test-ai", payload: { messages } },
    { url: "/api/university-chat", payload: { messages } },
    { url: "/api/robot-chat", payload: { messages } },
    { url: "/api/public/chat", payload: { messages, temperature: 0.8 } },
  ];

  const errors: string[] = [];

  for (const attempt of attempts) {
    try {
      return await tryRoute(attempt.url, attempt.payload);
    } catch (error) {
      errors.push(error instanceof Error ? error.message : String(error));
    }
  }

  return {
    summary:
      "Frontier could not obtain a live AI response from the available Shynvo routes.",
    meaning:
      "The workspace itself is stable, but the current request did not complete successfully through any of the available AI endpoints.",
    nextAction:
      "Try the request again after refreshing the page. If the issue persists, align Frontier to the exact route and payload shape used by the environment that is already working for your signed-in session.",
    why: errors.length
      ? errors.slice(0, 3)
      : ["No available route returned a valid Frontier response."],
    deliverables: [
      "A safe fallback instead of a broken workspace",
      "Preserved user selections",
      "Diagnostic signal for route alignment",
    ],
    risk:
      errors[0] ||
      "Unknown Frontier AI routing issue.",
    encouragement:
      "Your Frontier UI is in place. The remaining task is route alignment, not a rebuild of the environment.",
  };
}
