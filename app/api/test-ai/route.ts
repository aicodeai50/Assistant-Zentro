import { NextRequest, NextResponse } from "next/server";
import { checkAiAccess, recordAiUsage } from "@/api/_utils/aiAccess";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const access = await checkAiAccess(req);
    if (!access.ok) {
      return NextResponse.json(
        { reply: access.message },
        { status: access.status }
      );
    }

    const body = await req.json().catch(() => ({}));
    const message = String(body?.message ?? "").trim();

    if (!message) {
      return NextResponse.json({ reply: "Please enter a message." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { reply: "AI is not configured." },
        { status: 500 }
      );
    }

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          { role: "system", content: "You are Shynvo Search. Be helpful, accurate, and concise." },
          { role: "user", content: message },
        ],
        temperature: 0.7,
      }),
    });

    if (!r.ok) {
      return NextResponse.json(
        { reply: "AI service is temporarily unavailable." },
        { status: 502 }
      );
    }

    const data = await r.json();
    const reply = data?.choices?.[0]?.message?.content ?? "No reply.";

    try {
      await recordAiUsage(access);
    } catch {
      // ignore usage-recording issues
    }

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ reply: "Server error." }, { status: 500 });
  }
}
