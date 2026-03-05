export async function POST(req: Request) {
  const { query } = await req.json();

  // Temporary simple response (we’ll upgrade to OpenAI after deployment is stable)
  const answer =
    typeof query === "string" && query.trim()
      ? `Search received: "${query}". (Next: connect AI search.)`
      : "Please enter a query.";

  return Response.json({ answer });
}