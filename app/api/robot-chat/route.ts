import { NextRequest, NextResponse } from "next/server";
import { checkAiAccess, recordAiUsage } from "@/api/_utils/aiAccess";
import { requireRobotBackendUrl } from "@/lib/backend-env";

export const runtime = "nodejs";

function mustEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing ${name}`);
  return v;
}

export async function POST(req: NextRequest) {
  try {
    const access = await checkAiAccess(req);

    if (!access.ok) {
      return NextResponse.json(
        { error: access.message },
        { status: access.status }
      );
    }

    const base = requireRobotBackendUrl();
    const key = mustEnv("SH_API_KEY");
    const body = await req.json();

    const res = await fetch(`${base}/api/robot-chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-sh-key": key,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok) {
      try {
        await recordAiUsage(access as Parameters<typeof recordAiUsage>[0]);
      } catch {
        // ignore usage-recording issues
      }
    }

    return NextResponse.json(data, { status: res.status });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "robot-chat proxy failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
