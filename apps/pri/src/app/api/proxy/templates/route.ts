import { NextResponse } from "next/server";
import { getPriBackendBaseUrl } from "@/lib/backend-env";

export async function GET() {
  try {
    const base = getPriBackendBaseUrl();
    const proxyKey = process.env.BACKEND_PROXY_API_KEY;

    if (!base) {
      return NextResponse.json({ error: "Missing REACT_APP_SH_BACKEND_API or BACKEND_API_BASE_URL" }, { status: 500 });
    }

    if (!proxyKey) {
      return NextResponse.json({ error: "Missing BACKEND_PROXY_API_KEY" }, { status: 500 });
    }

    const res = await fetch(`${base}/generator/templates`, {
      method: "GET",
      headers: {
        "x-api-key": proxyKey,
      },
      cache: "no-store",
    });

    const text = await res.text();

    return new NextResponse(text, {
      status: res.status,
      headers: {
        "Content-Type": res.headers.get("Content-Type") || "application/json",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Proxy templates failed" },
      { status: 500 }
    );
  }
}
