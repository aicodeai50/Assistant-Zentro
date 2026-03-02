export async function askTutor(prompt: string): Promise<string> {
  const clean = (prompt || "").trim();
  if (!clean) return "";

  const res = await fetch("/api/public/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [
        {
          role: "system",
          content:
            "You are Shynvo University Tutor. Be clear, structured, and practical. Use examples. No fluff.",
        },
        { role: "user", content: clean },
      ],
    }),
  });

  const text = await res.text();

  // Try to parse JSON response like: {"reply":"...","build":"..."}
  try {
    const obj = JSON.parse(text) as any;
    if (typeof obj?.reply === "string") return obj.reply;
  } catch {
    // ignore
  }

  // fallback: return raw text
  return text;
}
