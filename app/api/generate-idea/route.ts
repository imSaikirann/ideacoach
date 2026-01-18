import { NextRequest, NextResponse } from "next/server";
import { getGeminiModel } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { techStack, difficulty, interest, projectType } = await req.json();

  



    const model = await getGeminiModel();
const prompt = `
Give ONE ${projectType} project idea.

Tech: ${techStack}
Level: ${difficulty}
Field: ${interest}

Return JSON:

{
  "title": "",
  "problemSolved": "",
  "features": []
}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");

    const parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1));

    return NextResponse.json(parsed);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
