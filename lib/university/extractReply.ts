export function extractReply(payload: any): string {
  if (!payload) return "No response.";
  if (typeof payload === "string") return payload;

  // Most common shape: { reply: "...", build: "..." }
  if (typeof payload.reply === "string") return payload.reply;

  // Some backends return { message: "..."}
  if (typeof payload.message === "string") return payload.message;

  // If it’s nested
  if (payload.data && typeof payload.data.reply === "string") return payload.data.reply;

  return "Unexpected response format.";
}
