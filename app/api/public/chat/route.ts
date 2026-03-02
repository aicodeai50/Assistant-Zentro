import { NextResponse } from "next/server";

export const runtime = "nodejs";

type AnyObj = Record<string, any>;

function extractReply(data: any): string {
  if (typeof data === "string") return data;

  // Common formats
  if (data && typeof data.reply === "string") return data.reply;
  if (data && typeof data.message === "string") return data.message;

  // OpenAI-ish formats
  const content =
    data?.choices?.[0]?.message?.content ??
    data?.choices?.[0]?.text ??
    data?.output_text ??
    null;

  if (typeof content === "string") return content;

  // Fallback: stringify safely
  try {
    return JSON.stringify(data);
  } catch {
    return String(data ?? "");
  }
}

async function postToBackend(backend: string, path: string, body: AnyObj) {
  const url = `${backend.replace(/\/$/, "")}${path}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": process.env.BACKEND_API_KEY || "",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  return res;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as AnyObj;

    // If you have a backend, proxy to it; otherwise return a helpful message.
    const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

    if (!backend) {
      return NextResponse.json(
        { reply: "Backend is not configured (NEXT_PUBLIC_BACKEND_URL is missing)." },
        { status: 200 }
      );
    }

    // Try common backend endpoints (adjust if your backend uses a specific one)
    const candidates = ["/public/chat", "/api/public/chat", "/chat"];

    let lastErrText = "";
    for (const path of candidates) {
      const res = await postToBackend(backend, path, body);

      if (res.ok) {
        // Try JSON first
        const ct = res.headers.get("content-type") || "";
        if (ct.includes("application/json")) {
          const data = await res.json();
          const reply = extractReply(data);
          // IMPORTANT: return ONLY reply (no build / metadata)
          return NextResponse.json({ reply }, { status: 200 });
        }

        // Otherwise text
        const text = await res.text();
        const reply = extractReply(text);
        return NextResponse.json({ reply }, { status: 200 });
      } else {
        lastErrText = await res.text().catch(() => "");
      }
    }

    return NextResponse.json(
      { reply: `Backend chat endpoint failed. ${lastErrText?.slice(0, 200)}` },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { reply: `Server error: ${e?.message ?? "unknown"}` },
      { status: 200 }
    );
  }
}
