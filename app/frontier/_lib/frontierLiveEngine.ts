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

function clean(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

function takeFirstSentence(text: string) {
  const t = clean(text);
  const m = t.match(/.*?[.!?](\s|$)/);
  return m ? m[0].trim() : t;
}

function looksLikeAccessMessage(text: string) {
  const lower = text.toLowerCase();
  return (
    lower.includes("create an account") ||
    lower.includes("sign in") ||
    lower.includes("signed in") ||
    lower.includes("use ai tools in shynvo") ||
    lower.includes("upgrade")
  );
}

function buildSystemPrompt(req: FrontierEngineRequest) {
  if (req.workspace === "coding") {
    return `
You are Shynvo Frontier AI inside the Coding Arena.
Respond professionally and practically.
Help the user move from idea to implementation.
Do not sound repetitive.
Do not mention ChatGPT or OpenAI.
`;
  }

  if (req.workspace === "algorithms") {
    return `
You are Shynvo Frontier AI inside Algorithm Challenges.
Respond like a reasoning coach.
Focus on structure, constraints, and the best next move.
Do not sound repetitive.
`;
  }

  if (req.workspace === "ai-bots") {
    return `
You are Shynvo Frontier AI inside AI Bot Lab.
Respond like an AI behavior designer.
Explain the selected mode and tone in a professional way.
Do not sound repetitive.
`;
  }

  return `
You are Shynvo Frontier AI inside Logic Puzzles.
Respond like a reasoning trainer.
Keep the explanation clear, calm, and practical.
Do not sound repetitive.
`;
}

function buildUserPrompt(req: FrontierEngineRequest) {
  return `
Workspace: ${req.workspace}
Selected title: ${req.title}
Selected mode: ${req.mode || ""}
Selected tone: ${req.tone || ""}
Selected focus: ${(req.focus || []).join(", ")}
User request: ${req.userInput}

Give a strong answer that matches the selected workspace and stays professional.
`;
}

function accessStateOutput(): FrontierStructuredOutput {
  return {
    summary:
      "This Frontier workspace is connected to a protected Shynvo AI route.",
    meaning:
      "The interface is operating normally, but live generation is currently being restricted by the access layer connected to this route.",
    nextAction:
      "Continue after the Frontier route is aligned with the same authenticated AI path already working elsewhere in Shynvo.",
    why: [
      "The workspace is stable and preserving user state correctly.",
      "The issue is route access alignment, not the Frontier interface itself.",
      "Once the correct route is attached, this panel can return live AI output normally.",
    ],
    deliverables: [
      "A stable workspace state",
      "A clear diagnosis",
      "A safe fallback instead of a broken page",
    ],
    risk:
      "Live output will remain blocked until Frontier is connected to the right authenticated route.",
    encouragement:
      "The environment is already built. This is now a routing connection issue, not a design failure.",
  };
}

function codingOutput(req: FrontierEngineRequest, raw: string): FrontierStructuredOutput {
  return {
    summary: takeFirstSentence(raw),
    meaning:
      `${req.title} is acting as a build workspace. ${req.mode || "Current"} mode is shaping how Frontier interprets the idea and turns it into a practical implementation path.`,
    nextAction:
      "Define the smallest working first milestone, then build that before expanding scope.",
    why: [
      `The selected workspace is ${req.title}.`,
      `The current mode is ${req.mode || "standard guidance"}.`,
      `A narrower first milestone reduces risk and creates faster momentum.`,
    ],
    deliverables: [
      "A clearer project direction",
      "A more practical implementation path",
      "A stronger first milestone definition",
    ],
    risk:
      "Trying to solve the whole product at once instead of shipping the first usable version.",
    encouragement:
      "A strong product begins with one clear working version. Finish that first, then expand with confidence.",
  };
}

function algorithmsOutput(req: FrontierEngineRequest, raw: string): FrontierStructuredOutput {
  return {
    summary: takeFirstSentence(raw),
    meaning:
      `${req.title} is being treated as a reasoning exercise rather than a guess-based problem. ${req.mode || "Current"} mode changes how directly Frontier guides the solving process.`,
    nextAction:
      "Translate the problem into constraints, dependencies, and outcomes before choosing a solution path.",
    why: [
      `The challenge focus is ${(req.focus || []).join(", ") || req.title}.`,
      "Good reasoning starts with structure before execution.",
      "The right interpretation usually matters more than the first attempted answer.",
    ],
    deliverables: [
      "Better problem framing",
      "A clearer solving route",
      "Stronger reasoning discipline",
    ],
    risk:
      "Jumping into an answer before the structure of the problem is properly understood.",
    encouragement:
      "You do not need instant perfection. Strong reasoning becomes clear once the structure is visible.",
  };
}

function botsOutput(req: FrontierEngineRequest, raw: string): FrontierStructuredOutput {
  return {
    summary: takeFirstSentence(raw),
    meaning:
      `${req.title} is being interpreted as a selected AI behavior. ${req.tone || "Current"} tone changes how the response is delivered, while the chosen mode changes how the intelligence behaves.`,
    nextAction:
      "Refine the prompt so the goal, audience, and expected style are all explicit before generating again.",
    why: [
      `The current mode is ${req.mode || req.title}.`,
      `The current tone is ${req.tone || "default"}.`,
      "Prompt clarity has a direct impact on output quality and behavior consistency.",
    ],
    deliverables: [
      "A more intentional AI behavior profile",
      "A clearer prompt-to-response match",
      "Better mode testing across the Frontier workspace",
    ],
    risk:
      "Using a broad prompt and expecting precise behavior from the selected AI mode.",
    encouragement:
      "This is where Shynvo becomes powerful: test one prompt across different modes until the right behavior becomes obvious.",
  };
}

function puzzlesOutput(req: FrontierEngineRequest, raw: string): FrontierStructuredOutput {
  return {
    summary: takeFirstSentence(raw),
    meaning:
      `${req.title} is functioning as a reasoning-training space. ${req.mode || "Current"} mode changes how much Frontier supports the solving process.`,
    nextAction:
      "Identify the hard constraints first, then test possible paths against those rules before revealing any answer.",
    why: [
      "Puzzle solving trains structured thought, not just answer finding.",
      "Constraint-first reasoning creates stronger solving habits.",
      "The best progress comes from testing logic before requesting the result.",
    ],
    deliverables: [
      "A stronger reasoning habit",
      "Better use of structured hints",
      "A more disciplined solving pattern",
    ],
    risk:
      "Revealing or assuming the answer too early and losing the value of the exercise.",
    encouragement:
      "Each puzzle is training your thinking process. The answer matters less than the pattern you build while solving it.",
  };
}

function adaptRawOutput(req: FrontierEngineRequest, raw: string): FrontierStructuredOutput {
  const text = clean(raw);

  if (looksLikeAccessMessage(text)) {
    return accessStateOutput();
  }

  if (req.workspace === "coding") return codingOutput(req, text);
  if (req.workspace === "algorithms") return algorithmsOutput(req, text);
  if (req.workspace === "ai-bots") return botsOutput(req, text);
  return puzzlesOutput(req, text);
}

export async function runFrontierLiveEngine(
  req: FrontierEngineRequest
): Promise<FrontierStructuredOutput> {
  try {
    const message = `${buildSystemPrompt(req)}\n\n${buildUserPrompt(req)}`;

    const res = await fetch("/api/test-ai", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      cache: "no-store",
      body: JSON.stringify({
        message,
      }),
    });

    const text = await res.text();

    if (!res.ok) {
      return {
        summary: "Frontier could not complete the live request for this selection.",
        meaning:
          "The workspace is stable, but the connected AI route did not return a usable response for this request.",
        nextAction:
          "Try the request again with a shorter and more specific prompt.",
        why: [
          "The request reached the AI route.",
          "The route did not return a successful live result.",
          "Frontier preserved the workspace instead of failing.",
        ],
        deliverables: [
          "A stable workspace",
          "A safe fallback state",
          "A preserved user selection",
        ],
        risk: `/api/test-ai -> ${res.status}: ${text || "request failed"}`,
        encouragement:
          "The workspace is intact. The remaining issue is response handling, not the Frontier design itself.",
      };
    }

    let data: any = {};
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { reply: text };
    }

    const raw =
      data?.reply ||
      data?.text ||
      data?.message ||
      data?.output ||
      data?.content ||
      text ||
      "";

    if (!String(raw).trim()) {
      return {
        summary: "Frontier did not receive usable live output for this request.",
        meaning:
          "The route responded, but it did not include content that Frontier could present as guidance.",
        nextAction:
          "Try again with a shorter request and a more explicit goal.",
        why: [
          "The route is reachable.",
          "The returned payload did not contain usable output.",
          "Frontier preserved the current workspace state safely.",
        ],
        deliverables: [
          "A stable page",
          "A protected user flow",
          "A recoverable request state",
        ],
        risk: "The connected route returned empty content.",
        encouragement:
          "The environment is still stable. The remaining gap is output quality from the connected route.",
      };
    }

    return adaptRawOutput(req, String(raw));
  } catch (error) {
    return {
      summary: "Frontier could not generate a live response for this request.",
      meaning:
        "The workspace is available, but the live AI request did not complete successfully.",
      nextAction:
        "Try again after refreshing the page, then retry with a shorter prompt.",
      why: [
        "The workspace itself is stable.",
        "The issue occurred during live route execution.",
        "Frontier preserved the current user state instead of breaking the page.",
      ],
      deliverables: [
        "A safe fallback state",
        "A preserved workspace selection",
        "A stable user experience",
      ],
      risk:
        error instanceof Error ? error.message : "Unknown Frontier live AI error.",
      encouragement:
        "The interface is in place. This is now a live response handling issue, not a rebuild problem.",
    };
  }
}
