import { NextResponse } from "next/server";
import { requireShBackendApiUrl } from "@/lib/backend-env";

export const runtime = "nodejs";

function mustEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing ${name}`);
  return v;
}

export async function POST(req: Request) {
  try {
    const base = requireShBackendApiUrl();
    const key = mustEnv("SH_API_KEY");

    const body = await req.json();

    const res = await fetch(`${base}/api/tts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-sh-key": key,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const contentType = res.headers.get("content-type") || "application/octet-stream";
    const buf = await res.arrayBuffer();

    return new NextResponse(buf, {
      status: res.status,
      headers: { "Content-Type": contentType },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "tts proxy failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
