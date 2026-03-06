import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function mustEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing ${name}`);
  return v;
}

export async function POST(req: Request) {
  try {
    const base = mustEnv("SH_BACKEND_URL");
    const key = mustEnv("SH_API_KEY");
    const body = await req.json();

    const res = await fetch(`${base.replace(/\/$/, "")}/api/robot-chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-sh-key": key,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await res.json().catch(() => ({}));

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
  } catch (err: any) {
    return NextResponse.json(
      {
        answer: err?.message || "University chat proxy failed.",
      },
      { status: 200 }
    );
  }
}
