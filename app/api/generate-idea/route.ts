import { NextRequest, NextResponse } from "next/server";
import { getGeminiModel } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const {
      projectType,
      techStack,
      difficulty,
      interest,
      customProblem,
    } = await req.json();

    const model = await getGeminiModel();

    const prompt = `
You are an experienced developer mentor.

Generate ONE clear, practical ${projectType} project idea for a developer.

Context:
- Project type: ${projectType}
- Tech stack: ${techStack}
- Difficulty: ${difficulty}
- Focus area: ${interest}
${
  customProblem?.trim()
    ? `- Specific problem to consider: ${customProblem}`
    : ""
}

Rules:
- Output MUST be easy to understand by a beginner
- Use simple words, no jargon
- Be realistic and buildable
- Total output must be UNDER 500 characters
- Do NOT include explanations outside JSON
- Do NOT include markdown
- Do NOT include extra text

Return ONLY valid JSON in this exact shape:

{
  "title": "Short, clear project title",
  "problemSolved": "1–2 sentences explaining what problem this project solves",
  "features": [
    "3–5 simple, concrete features"
  ]
}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Extract JSON safely
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("Invalid JSON from model");
    }

    const parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1));

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("Idea generation failed:", err);
    return NextResponse.json(
      { error: "Idea generation failed" },
      { status: 500 }
    );
  }
}
