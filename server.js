
// ===============================
// PUBLIC CHAT (FRONTEND)
// ===============================
app.post("/api/public/chat", requireShApiKey, rateLimit, async (req, res) => {
  try {
    const openai = req.app.get("openai");
    const model = req.app.get("openai_model");

    if (!openai) {
      return res.status(500).json({ error: "OpenAI not configured" });
    }

    const { message } = req.body;

    const completion = await openai.chat.completions.create({
      model,
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message || "" }
      ]
    });

    res.json({
      reply: completion.choices[0].message.content
    });

  } catch (err) {
    console.error("Public chat error:", err);
    res.status(500).json({ error: "AI error" });
  }
});
