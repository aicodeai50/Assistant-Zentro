import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const base = process.env.BACKEND_API_BASE_URL;
    const proxyKey = process.env.BACKEND_PROXY_API_KEY;
    const body = await req.text();

    const res = await fetch(`${base}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": proxyKey || "",
      },
      body,
      cache: "no-store",
    });

    const text = await res.text();
    return new NextResponse(text, {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
