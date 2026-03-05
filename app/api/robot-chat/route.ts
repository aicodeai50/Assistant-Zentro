import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Incoming = {
  message: string;
  history?: Array<{ role: "user" | "robot"; text: string }>;
};

function isLowQuality(text: string) {
  const t = text.trim();
  if (t.length < 2) return true;

  if (/^(.)\1{7,}$/.test(t)) return true;

  return false;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Incoming;
    const message = body.message;

    if (!message) {
      return NextResponse.json({ error: "Empty message" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY not configured" },
        { status: 500 }
      );
    }

    if (isLowQuality(message)) {
      return NextResponse.json({
        reply:
          "Please ask a clear and meaningful question. I respond to relevant prompts.",
      });
    }

    const systemPrompt = `
You are the Shynvo Cinematic Robot.

You are professional, intelligent, and futuristic.

You can answer:
- general knowledge
- technology
- science
- learning
- productivity
- questions about the Shynvo platform

Rules:
- Answer in the same language as the user.
- Be concise and clear.
- Refuse illegal or harmful instructions.
- If the user asks nonsense repeatedly, ask them to provide a better question.
`;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        max_output_tokens: 500,
      }),
    });

    const data = await response.json();

    const reply =
      data?.output?.[0]?.content?.[0]?.text ||
      "I could not generate a response.";

    return NextResponse.json({ reply });
  } catch (err) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}