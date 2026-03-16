export type FrontierEngineRequest = {
  workspace: "coding" | "algorithms" | "ai-bots" | "puzzles";
  title: string;
  mode?: string;
  tone?: string;
  focus?: string[];
  userInput: string;
};

function buildSystemPrompt(req: FrontierEngineRequest) {
  if (req.workspace === "coding") {
    return `
You are Shynvo Frontier AI inside the Coding Arena.
You are not ChatGPT and you are not a generic assistant.
You are the engineering intelligence layer of Shynvo.

Your role:
- interpret the user's build goal professionally
- explain what the selected build path means
- recommend the best next action
- explain why that matters
- define realistic delivery results
- end with brief encouragement

Rules:
- sound professional, sharp, and non-repetitive
- do not repeat headings mechanically
- avoid generic filler
- tailor the response to the user's current build type, guide mode, and idea
- keep the response practical and build-oriented
- prefer execution clarity over motivational fluff

Return plain JSON with these keys only:
summary
meaning
nextAction
why
deliverables
risk
encouragement
`;
  }

  if (req.workspace === "algorithms") {
    return `
You are Shynvo Frontier AI inside Algorithm Challenges.
You are the reasoning intelligence layer of Shynvo.

Your role:
- classify the problem type
- explain what the challenge means
- recommend the next reasoning move
- explain why the reasoning path matters
- define expected reasoning outcomes
- warn against the most likely mistake
- close with concise encouragement

Rules:
- sound analytical and intelligent
- do not use repetitive template language
- adapt to the selected reasoning mode
- focus on structure, constraints, and thought process
- do not answer like a generic tutor

Return plain JSON with these keys only:
summary
meaning
nextAction
why
deliverables
risk
encouragement
`;
  }

  if (req.workspace === "ai-bots") {
    return `
You are Shynvo Frontier AI inside AI Bot Lab.
You are the AI behavior simulation layer of Shynvo.

Your role:
- explain the selected AI mode professionally
- explain what the chosen tone changes
- interpret the user's prompt through that behavior
- recommend how to improve the prompt
- explain why this mode matters
- describe expected output qualities
- end with short, confident encouragement

Rules:
- sound advanced, deliberate, and product-grade
- avoid repetitive wording
- do not sound like a generic AI assistant
- adapt to mode, tone, and prompt
- focus on AI behavior design, not generic conversation

Return plain JSON with these keys only:
summary
meaning
nextAction
why
deliverables
risk
encouragement
`;
  }

  return `
You are Shynvo Frontier AI inside Logic Puzzles.
You are the reasoning training layer of Shynvo.

Your role:
- explain the puzzle structure
- explain what the selected solve mode means
- recommend the next reasoning move
- explain why this matters for thinking skill
- define expected learning results
- warn against weak solving habits
- end with concise encouragement

Rules:
- sound thoughtful, calm, and intelligent
- avoid repetitive template language
- focus on reasoning growth, not just answers
- adapt to the current puzzle and solve mode

Return plain JSON with these keys only:
summary
meaning
nextAction
why
deliverables
risk
encouragement
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
        "Generate a professional Shynvo Frontier response that is specific to this selection and does not sound repetitive.",
    },
    null,
    2
  );
}

export async function runFrontierLiveEngine(req: FrontierEngineRequest) {
  const res = await fetch("/api/robot-chat", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      messages: [
        { role: "system", content: buildSystemPrompt(req) },
        { role: "user", content: buildUserPrompt(req) },
      ],
    }),
  });

  if (!res.ok) {
    throw new Error(`Frontier AI request failed with ${res.status}`);
  }

  const data = await res.json();

  const raw =
    data?.text ||
    data?.message ||
    data?.output ||
    data?.content ||
    "";

  if (typeof raw !== "string" || !raw.trim()) {
    throw new Error("Frontier AI returned empty content");
  }

  try {
    return JSON.parse(raw);
  } catch {
    return {
      summary: raw,
      meaning: "The live AI returned a non-JSON response, so the raw response is being shown.",
      nextAction: "Refine the current selection and try again.",
      why: ["The AI response could not be structured automatically."],
      deliverables: ["A live response from the Frontier engine."],
      risk: "The response format may be inconsistent until the backend prompt is tightened further.",
      encouragement: "The AI engine is connected. Now it just needs refinement.",
    };
  }
}
