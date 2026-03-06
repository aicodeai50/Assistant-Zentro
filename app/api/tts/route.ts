import OpenAI from "openai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  return new OpenAI({ apiKey });
}

export async function POST(req: Request) {
  try {
    const client = getOpenAI();
    if (!client) {
      return new Response(
        JSON.stringify({
          error:
            "OPENAI_API_KEY is missing. Set it in .env.local (local) and in Vercel Project Settings (production).",
        }),
        { status: 500, headers: { "content-type": "application/json" } }
      );
    }

    const body = await req.json().catch(() => ({}));
    const input = String(body?.input ?? "").trim();

    if (!input) {
      return new Response(JSON.stringify({ error: "Missing input" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    const audio = await client.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice: "alloy",
      input,
      response_format: "mp3",
    });

    const buf = Buffer.from(await audio.arrayBuffer());

    return new Response(buf, {
      status: 200,
      headers: {
        "content-type": "audio/mpeg",
        "cache-control": "no-store",
      },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message ?? "TTS failed" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
