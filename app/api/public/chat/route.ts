import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const base = process.env.RAILWAY_API_BASE_URL;
  const key = process.env.SH_API_KEY;

  if (!base) {
    return NextResponse.json(
      { error: "Missing RAILWAY_API_BASE_URL" },
      { status: 500 }
    );
  }

  if (!key) {
    return NextResponse.json(
      { error: "Missing SH_API_KEY" },
      { status: 500 }
    );
  }

  const body = await req.json();

  // 🔍 DEBUG — will show in Vercel logs
  console.log("Proxying to:", `${base}/api/public/chat`);

  const upstream = await fetch(`${base}/api/public/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

      // 🔑 SEND KEY IN ALL COMMON FORMS
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