import { NextRequest, NextResponse } from "next/server";
import { checkAiAccess, recordAiUsage } from "@/api/_utils/aiAccess";
import { requireRobotBackendUrl } from "@/lib/backend-env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
        {
          answer: access.message,
          upgradeUrl: "/pricing",
        },
        { status: 200 }
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
      await recordAiUsage(access);
    }

    if (!res.ok) {
      return NextResponse.json(
        {
          answer:
            data?.answer ||
            data?.error ||
            data?.message ||
            `Backend error (${res.status})`,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        answer:
          data?.answer ||
          data?.reply ||
          data?.message ||
          "Backend responded but no answer field was returned.",
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "University chat proxy failed.";
    return NextResponse.json(
      {
        answer: message,
      },
      { status: 200 }
    );
  }
}
