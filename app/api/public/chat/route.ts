import { NextRequest, NextResponse } from "next/server";
import { checkAiAccess, recordAiUsage } from "@/api/_utils/aiAccess";
import { zentroLocalReplyRich } from "@/lib/robot/fallback";
import { ZENTRO_ROBOT_SYSTEM_PROMPT } from "@/lib/robot/prompt";

const DEFAULT_PATHS = [
  "/api/public/chat",
  "/public/chat",
  "/api/chat",
  "/chat",
];

function localPayload(message: string) {
  const rich = zentroLocalReplyRich(message);
  return {
    answer: rich.text,
    href: rich.href,
    label: rich.label,
    source: "local" as const,
  };
}

export async function POST(req: NextRequest) {
  let userMessage = "";

  try {
    const body = await req.json().catch(() => ({}));
    userMessage = String(body?.message || "").trim();

    const access = await checkAiAccess(req);

    if (!access.ok) {
      return NextResponse.json({ ...localPayload(userMessage), error: access.message }, { status: 200 });
    }

    const baseUrl =
      process.env.SH_BACKEND_URL ||
      process.env.BACKEND_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      process.env.RAILWAY_API_BASE_URL ||
      "";

    if (!baseUrl) {
      return NextResponse.json(localPayload(userMessage), { status: 200 });
    }

    const payload = {
      ...body,
      systemPrompt: body?.systemPrompt || ZENTRO_ROBOT_SYSTEM_PROMPT,
    };

    const cleanBase = baseUrl.replace(/\/+$/, "");
    const apiKey =
      process.env.SH_API_KEY ||
      process.env.NEXT_PUBLIC_SH_API_KEY ||
      "";

    const customPath = process.env.BACKEND_CHAT_PATH || "";
    const candidatePaths = customPath
      ? [customPath.startsWith("/") ? customPath : `/${customPath}`, ...DEFAULT_PATHS]
      : DEFAULT_PATHS;

    let lastStatus = 500;
    let lastText = "Endpoint not found";

    for (const path of candidatePaths) {
      try {
        const res = await fetch(`${cleanBase}${path}`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            ...(apiKey
              ? {
                  "x-sh-api-key": apiKey,
                  "x-api-key": apiKey,
                  "x-sh-key": apiKey,
                }
              : {}),
          },
          body: JSON.stringify(payload),
          cache: "no-store",
        });

        const text = await res.text();
        lastStatus = res.status;
        lastText = text;

        if (res.ok) {
          try {
            await recordAiUsage(access as any);
          } catch {
            // ignore usage recording issues
          }

          return new NextResponse(text, {
            status: res.status,
            headers: {
              "content-type": res.headers.get("content-type") || "application/json",
            },
          });
        }
      } catch (err) {
        lastStatus = 500;
        lastText = err instanceof Error ? err.message : "Backend request failed";
      }
    }

    return NextResponse.json(
      { ...localPayload(userMessage), details: lastText },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        ...localPayload(userMessage),
        error: "Failed to reach backend chat service.",
      },
      { status: 200 }
    );
  }
}