import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET() {
  return NextResponse.json({ message: "Gemini API route is live 🚀" });
}


const STOPWORDS = new Set([
  "the", "a", "an", "is", "in", "on", "at", "of", "for", "and", "or", "to", "with", "by"
]);

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  // ✅ Remove stopwords from the prompt
  const filteredPrompt = prompt
    .split(/\s+/)
    .filter((word: string) => !STOPWORDS.has(word.toLowerCase()))
    .join(' ');

  // ✅ Clean the prompt
  const cleanedPrompt = filteredPrompt
    .trim()                       // remove leading/trailing whitespace
    .replace(/\s+/g, ' ')         // collapse multiple spaces/newlines into one
    .replace(/\n+/g, '\n')        // keep single line breaks
    .replace(/[^\S\n]+/g, ' ')    // remove weird invisible unicode spaces
    .replace(/\s([.,!?;:])/g, '$1') // remove space before punctuation
    .replace(/\s+$/, '');         // final trim

  console.log("Received prompt:", prompt, "Formatted prompt:", cleanedPrompt);

  // 1️⃣ Create the client — pass your API key string (constructor expects a string)
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

  try {
    // ✅ Choose a valid model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    // ✅ Generate content using the cleaned prompt
    const result = await model.generateContent(cleanedPrompt);

    // ✅ Extract the text safely (handle string or response objects)
    const outputText =
      typeof result === "string" ? result : result.response?.text() || "No output generated.";

    return NextResponse.json({ output: outputText });
  } catch (err: any) {
    console.error("Gemini API error:", err.response?.data || err.message);
    return NextResponse.json(
      { error: err.response?.data || err.message },
      { status: 500 }
    );
  }
}
