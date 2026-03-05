export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = String(body?.message ?? "").trim();

    if (!message) {
      return Response.json({ reply: "Please type a message." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { reply: "OPENAI_API_KEY is missing on Vercel. Add it in Project Settings → Environment Variables." },
        { status: 200 }
      );
    }

    // Minimal OpenAI request (Chat Completions)
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          { role: "system", content: "You are Shynvo Search. Be helpful, concise, and accurate." },
          { role: "user", content: message },
        ],
        temperature: 0.6,
      }),
    });

    if (!r.ok) {
      const errText = await r.text();
      return Response.json({ reply: `OpenAI error: ${r.status}\n${errText}` }, { status: 200 });
    }

    const data = await r.json();
    const reply = data?.choices?.[0]?.message?.content ?? "No reply.";

    return Response.json({ reply });
  } catch (e: any) {
    return Response.json({ reply: `Server error: ${e?.message ?? "unknown"}` }, { status: 200 });
  }
}