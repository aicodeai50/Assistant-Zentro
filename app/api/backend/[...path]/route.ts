import { NextRequest, NextResponse } from "next/server";
import { getShBackendApiUrl } from "@/lib/backend-env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getBackendBase() {
  return getShBackendApiUrl();
}

async function proxy(req: NextRequest, pathParts: string[]) {
  const base = getBackendBase();
  const key = process.env.SH_API_KEY || "";

  if (!base) {
    return NextResponse.json({ error: "Missing backend URL" }, { status: 500 });
  }
  if (!key) {
    return NextResponse.json({ error: "Missing SH_API_KEY" }, { status: 500 });
  }

  const path = `/${pathParts.join("/")}`;
  const url = `${base}${path}${req.nextUrl.search}`;

  const headers: Record<string, string> = {
    "x-sh-api-key": key,
  };

  const auth = req.headers.get("authorization");
  if (auth) headers.Authorization = auth;

  const contentType = req.headers.get("content-type");
  if (contentType) headers["Content-Type"] = contentType;

  const init: RequestInit = {
    method: req.method,
    headers,
    cache: "no-store",
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = await req.text();
  }

  const res = await fetch(url, init);
  const text = await res.text();

  return new NextResponse(text, {
    status: res.status,
    headers: {
      "content-type": res.headers.get("content-type") || "application/json",
    },
  });
}

type RouteContext = { params: Promise<{ path: string[] }> };

export async function GET(req: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  return proxy(req, path);
}

export async function POST(req: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  return proxy(req, path);
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  return proxy(req, path);
}

export async function PUT(req: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  return proxy(req, path);
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  return proxy(req, path);
}
