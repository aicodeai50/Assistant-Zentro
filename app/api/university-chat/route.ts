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

    const url = `${base.replace(/\/$/, "")}/api/university-chat`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-sh-key": key,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const contentType = res.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        return NextResponse.json(
          {
            answer:
              data?.error ||
              data?.message ||
              `University backend error (${res.status}).`,
          },
          { status: 200 }
        );
      }

      if (typeof data?.answer === "string" && data.answer.trim()) {
        return NextResponse.json({ answer: data.answer }, { status: 200 });
      }

      return NextResponse.json(
        {
          answer:
            "University backend responded, but no valid answer field was returned.",
        },
        { status: 200 }
      );
    }

    const text = await res.text().catch(() => "");

    if (!res.ok) {
      return NextResponse.json(
        {
          answer:
            text?.trim() ||
            `University backend error (${res.status}) with non-JSON response.`,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        answer:
          text?.trim() ||
          "University backend returned a non-JSON response with no text.",
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        answer:
          err?.message || "University chat proxy failed before reaching backend.",
      },
      { status: 200 }
    );
  }
}
