import { NextResponse } from "next/server";
import { getShBackendApiUrl } from "@/lib/backend-env";

export const runtime = "nodejs";

export async function GET() {
  try {
    const base = getShBackendApiUrl();

    if (!base) {
      return NextResponse.json(
        { ok: false, error: "Missing REACT_APP_SH_BACKEND_API or SH_BACKEND_URL" },
        { status: 500 }
      );
    }

    const res = await fetch(`${base}/health`, {
      cache: "no-store",
    });

    const text = await res.text();
    return new NextResponse(text, {
      status: res.status,
      headers: {
        "content-type": res.headers.get("content-type") || "application/json",
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Ping failed";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
