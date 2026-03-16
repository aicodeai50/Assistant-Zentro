export function buildCodingOutput(args: {
  buildTitle: string;
  guideMode: string;
  idea: string;
  stack: string[];
  firstStep: string;
}) {
  const { buildTitle, guideMode, idea, stack, firstStep } = args;

  return {
    title: "Build guidance",
    summary: `${buildTitle} is active. Frontier is interpreting the goal "${idea}" through ${guideMode.toLowerCase()} mode.`,
    nextAction: `Start with ${firstStep.toLowerCase()} and keep the first delivery scope narrow and testable.`,
    why: [
      `This route matches the selected build type: ${buildTitle}.`,
      `The current guide mode is ${guideMode}, which changes how the system frames help.`,
      `The strongest stack fit for this path is ${stack.join(", ")}.`,
    ],
    deliverables: [
      "Working first milestone",
      "Clear implementation path",
      `Stack alignment: ${stack.join(", ")}`,
    ],
    risk: "Do not try to build the whole project at once. Keep the first milestone small and finishable.",
  };
}

export function buildBotOutput(args: {
  modeTitle: string;
  prompt: string;
  tone: string;
  tags: string[];
}) {
  const { modeTitle, prompt, tone, tags } = args;

  return {
    title: "AI mode guidance",
    summary: `${modeTitle} is active. Frontier is interpreting the prompt "${prompt}" with a ${tone.toLowerCase()} response style.`,
    nextAction:
      "Refine the prompt into one clear decision, task, or teaching objective so the response becomes sharper and more useful.",
    why: [
      `This mode is optimized for ${modeTitle.toLowerCase()} behaviour.`,
      `The active tone is ${tone.toLowerCase()}, which affects how the response is framed.`,
      `A smaller and clearer prompt usually produces a stronger result than a broad one.`,
    ],
    deliverables: [
      `Mode profile: ${modeTitle}`,
      `Tone profile: ${tone}`,
      `Focus tags: ${tags.join(", ")}`,
    ],
    risk:
      "Do not mix planning, teaching, analysis, and execution in the same prompt unless you want a blended answer.",
  };
}

export function buildAlgorithmOutput(args: {
  challengeTitle: string;
  modeTitle: string;
  problem: string;
  hint: string;
  route: string;
  mistake: string;
  focus: string[];
}) {
  const { challengeTitle, modeTitle, problem, hint, route, mistake, focus } = args;

  return {
    title: "Reasoning guidance",
    summary: `${challengeTitle} is active in ${modeTitle.toLowerCase()} mode. Frontier will interpret the problem "${problem}" as a structured reasoning task.`,
    nextAction:
      "Break the problem into inputs, constraints, decision rule, and desired outcome before writing any solution.",
    why: [
      `This challenge focuses on ${focus.join(", ").toLowerCase()}.`,
      `The current route is: ${route}`,
      `A common failure point is: ${mistake.toLowerCase()}`,
    ],
    deliverables: [
      `Core hint: ${hint}`,
      "Problem framing",
      "A cleaner reasoning path",
    ],
    risk:
      "Do not jump to implementation before the structure of the problem is clear.",
  };
}

export function buildPuzzleOutput(args: {
  modeTitle: string;
  question: string;
  hint1Visible: boolean;
  hint2Visible: boolean;
  answerVisible: boolean;
}) {
  const { modeTitle, question, hint1Visible, hint2Visible, answerVisible } = args;

  return {
    title: "Puzzle guidance",
    summary: `Frontier is running this puzzle in ${modeTitle.toLowerCase()} mode. The active puzzle is "${question}"`,
    nextAction: answerVisible
      ? "Review why the revealed answer works, then move to the next puzzle and solve faster with less help."
      : hint2Visible
      ? "Use the second hint to eliminate weak options and test the remaining valid path."
      : hint1Visible
      ? "Use the first hint to narrow the search space before guessing."
      : "Try one clean reasoning pass before revealing any hints.",
    why: [
      "Puzzle solving is strongest when it trains elimination, ordering, and constraints.",
      "Hints should reduce confusion without replacing reasoning.",
      "The best habit is to test one valid path at a time.",
    ],
    deliverables: [
      hint1Visible ? "Hint-assisted reasoning" : "Independent first-pass reasoning",
      answerVisible ? "Solved outcome" : "Candidate solution path",
      `Solve mode: ${modeTitle}`,
    ],
    risk:
      "Revealing the final answer too early removes most of the learning value.",
  };
}
