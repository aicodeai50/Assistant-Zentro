import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Base Railway backend URL
  const base = process.env.RAILWAY_API_BASE_URL?.replace(/\/$/, "");
  const key = process.env.SH_API_KEY;

  // Hard guards (these prevent silent failure)
  if (!base) {
    return NextResponse.json(
      { error: "Missing RAILWAY_API_BASE_URL on Vercel" },
      { status: 500 }
    );
  }

  if (!key) {
    return NextResponse.json(
      { error: "Missing SH_API_KEY on Vercel" },
      { status: 500 }
    );
  }

  // Read request body from frontend
  const body = await req.json();

  /* ============================================================
     🔍 DEBUG STEP — check what Railway actually receives
     This does NOT expose the key, only booleans
     ============================================================ */
  try {
    const debug = await fetch(`${base}/api/debug/headers`, {
      headers: {
        "x-sh-api-key": key,
        "x-api-key": key,
        Authorization: `Bearer ${key}`,
      },
      cache: "no-store",
    });

    const debugJson = await debug.json();
    console.log("RAILWAY HEADER DEBUG:", debugJson);
  } catch (err) {
    console.error("DEBUG ROUTE FAILED:", err);
  }

  /* ============================================================
     🚀 REAL REQUEST — proxy to Railway AI backend
     ============================================================ */
  const upstream = await fetch(`${base}/api/public/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

      // Send key in all common formats
      "x-sh-api-key": key,
      "x-api-key": key,
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const text = await upstream.text();

  return new NextResponse(text, {
    status: upstream.status,
    headers: {
      "Content-Type":
        upstream.headers.get("Content-Type") ?? "application/json",
    },
  });
}