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
    meaning: "The live AI engine returned an unexpected format, so Frontier is showing a safe fallback.",
    nextAction: "Try a shorter, clearer request or switch the selected mode and generate again.",
    why: ["Frontier protects the page by falling back instead of breaking the workspace."],
    deliverables: ["A safe response", "A preserved workspace state"],
    risk: "The live AI route may need a payload or endpoint adjustment.",
    encouragement: "The workspace is stable. The live engine only needs alignment with the working Shynvo AI route.",
  };
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
      meaning: parsed.meaning || "The live AI response did not include a full meaning section.",
      nextAction: parsed.nextAction || "Refine the request and generate again.",
      why: Array.isArray(parsed.why) ? parsed.why : ["Frontier returned a partial structured response."],
      deliverables: Array.isArray(parsed.deliverables)
        ? parsed.deliverables
        : ["A live AI-generated result."],
      risk: parsed.risk || "The live route returned partial structured data.",
      encouragement: parsed.encouragement || "Frontier is active and can continue refining the response.",
    };
  } catch {
    return fallbackOutput(raw || "Frontier generated a live response.");
  }
}

async function tryRoute(
  url: string,
  payload: any
): Promise<FrontierStructuredOutput | null> {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  let data: any = {};

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { text };
  }

  if (!res.ok) {
    throw new Error(`${url} -> ${res.status}: ${text || "request failed"}`);
  }

  const raw = extractRawText(data);
  if (!raw || !String(raw).trim()) {
    return fallbackOutput("Frontier AI returned an empty response.");
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
    {
      url: "/api/robot-chat",
      payload: { messages },
    },
    {
      url: "/api/test-ai",
      payload: { messages },
    },
    {
      url: "/api/university-chat",
      payload: { messages },
    },
    {
      url: "/api/public/chat",
      payload: { messages, temperature: 0.8 },
    },
  ];

  const errors: string[] = [];

  for (const attempt of attempts) {
    try {
      const result = await tryRoute(attempt.url, attempt.payload);
      if (result) return result;
    } catch (error) {
      errors.push(error instanceof Error ? error.message : String(error));
    }
  }

  return {
    summary: "Frontier AI could not generate a live response right now.",
    meaning: "The workspace is still connected, but none of the available Shynvo AI routes accepted the Frontier request.",
    nextAction: "Use a simpler prompt now, then align Frontier with the exact working route used by the target environment.",
    why: errors.length ? errors.slice(0, 3) : ["No working AI route returned a valid response."],
    deliverables: ["A safe fallback response instead of a broken page."],
    risk: errors[0] || "Unknown Frontier AI routing issue.",
    encouragement: "The workspace is safe. Only the Frontier routing layer needs final alignment.",
  };
}
