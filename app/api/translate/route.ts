export async function POST(req: Request) {
  try {
    const body = await req.json();
    const text = String(body?.text ?? "").trim();
    const targetLang = String(body?.targetLang ?? "en").trim();

    if (!text) {
      return Response.json({ translated: "" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return Response.json(
        { translated: text, note: "Missing OPENAI_API_KEY" },
        { status: 200 }
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
          {
            role: "system",
            content:
              "You are a translation engine. Translate the user's text to the requested target language. Output ONLY the translated text.",
          },
          {
            role: "user",
            content: `Target language: ${targetLang}\n\nText:\n${text}`,
          },
        ],
        temperature: 0.2,
      }),
    });

    if (!r.ok) {
      const err = await r.text();
      return Response.json({ translated: text, error: err }, { status: 200 });
    }

    const data = await r.json();
    const translated = data?.choices?.[0]?.message?.content ?? text;

    return Response.json({ translated });
  } catch (e: any) {
    return Response.json(
      { translated: "", error: e?.message ?? "unknown" },
      { status: 200 }
    );
  }
}