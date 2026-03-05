import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { text, language } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "Translate the text into the requested language.",
      },
      {
        role: "user",
        content: `Translate into ${language}: ${text}`,
      },
    ],
  });

  return Response.json({
    translated: response.choices[0].message.content,
  });
}