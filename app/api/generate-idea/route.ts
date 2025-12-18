import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ratelimit } from "@/lib/ratelimit";
import { error } from "console";

export async function GET() {
  return NextResponse.json({ message: "Gemini API route is live 🚀" });
}

const STOPWORDS = new Set([
  "the",
  "a",
  "an",
  "is",
  "in",
  "on",
  "at",
  "of",
  "for",
  "and",
  "or",
  "to",
  "with",
  "by",
]);

export async function POST(req: NextRequest) {
//   const forwardedFor = req.headers.get("x-forwarded-for");
//   const realIp = req.headers.get("x-real-ip");

//   const ip = forwardedFor?.split(",")[0]?.trim() ?? realIp ?? "anonymous";

//   const { success, limit, remaining, reset } = await ratelimit.limit(ip);

//   if (!success) {
//     return NextResponse.json(
//       {
//         error: "Too many requests, please try again in a few seconds.",
//         limit,
//         remaining,
//         reset,
//       },
//       {
//         status: 429,
//         headers: {
//           "X-RateLimit-Limit": String(limit),
//           "X-RateLimit-Remaining": String(remaining),
//           "X-RateLimit-Reset": String(reset),
//         },
//       }
//     );
//   }

  const { techStack, difficulty, interest } = await req.json();

  const selection = `${techStack} | ${difficulty} | ${interest}`;

  const baseInstruction = `
You are an expert software mentor.

Based on the user's selection, suggest exactly ONE realistic software project idea.

Rules:
- Use the chosen tech stack.
- Match the difficulty level.
- Align with the interest/field.
- Respond in this exact format:

Project Title: <short title>
Description: <2–3 short sentences explaining what the project does and why it's good for this stack and level>

Do NOT list multiple ideas. Only one project.
`.trim();

  // 🧵 Full prompt including user choices
  const prompt = `
${baseInstruction}

User selection:
Tech Stack: ${techStack}
Difficulty: ${difficulty}
Field: ${interest}
(${selection})
`.trim();

  // ✅ Remove stopwords from the prompt
  const filteredPrompt = prompt
    .split(/\s+/)
    .filter((word: string) => !STOPWORDS.has(word.toLowerCase()))
    .join(" ");

  // ✅ Clean the prompt
  const cleanedPrompt = filteredPrompt
    .trim() // remove leading/trailing whitespace
    .replace(/\s+/g, " ") // collapse multiple spaces/newlines into one
    .replace(/\n+/g, "\n") // keep single line breaks
    .replace(/[^\S\n]+/g, " ") // remove weird invisible unicode spaces
    .replace(/\s([.,!?;:])/g, "$1") // remove space before punctuation
    .replace(/\s+$/, ""); // final trim

  console.log("Received prompt:", prompt, "Formatted prompt:", cleanedPrompt);

  // 1️⃣ Create the client — pass your API key string (constructor expects a string)
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

  try {
    // ✅ Choose a valid model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    // ✅ Generate content using the cleaned prompt
    const result = await model.generateContent(cleanedPrompt);

    // ✅ Extract the text safely (handle string or response objects)
    const outputText =
      typeof result === "string"
        ? result
        : result.response?.text() || "No output generated.";

    return NextResponse.json({ output: outputText });
  } catch (err) {
    console.error("Gemini API error:", err.response?.data || err.message);
    return NextResponse.json(
      { error: err.response?.data || err.message },
      { status: 500 }
    );
  }
}
