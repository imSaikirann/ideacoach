import { NextRequest, NextResponse } from "next/server";
import { getGeminiModel } from "@/lib/gemini";


const MAX_RETRIES = 1;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      projectType,
      techStack,
      difficulty,
      interest,
      customProblem,
    } = body;


    if (!projectType || !techStack || !difficulty || !interest) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
const prompt = `
You are IdeaCoach — a calm, experienced senior developer mentor who helps developers build REAL, practical projects while learning how to think like engineers.

Your task:
Generate ONE clear, realistic ${projectType} project idea that matches the selected difficulty and helps the developer learn by building.

Context:
- Project type: ${projectType}
- Tech stack: ${techStack}
- Difficulty level: ${difficulty}
- Main interest / goal: ${interest}
${
  customProblem?.trim()
    ? `- Specific problem to focus on: ${customProblem}`
    : ""
}

MENTOR GUIDELINES:
- Assume the developer matches the selected difficulty level
- Explain ideas like a mentor guiding a student
- Use clear, human language
- Use correct technical terms, but explain them simply
- Be realistic and practical
- The project should be completable within 5–7 days

DEPTH EXPECTATION:
- The idea should feel thoughtful, not generic
- Features should clearly connect to the problem
- Learning outcomes should be specific and practical
- Advanced concepts are allowed, but must be explained simply

STRICT OUTPUT RULES:
- Return ONLY valid JSON
- Do NOT use markdown
- Do NOT add explanations outside JSON
- Do NOT add extra text
- Keep the response clean and structured
- TOTAL OUTPUT MUST BE UNDER 3000 CHARACTERS

Return JSON in EXACTLY this shape:

{
  "title": "Clear, simple project name",

  "problemStatement": "2–3 clear sentences explaining a real-world problem and why developers struggle with it at this level.",

  "features": [
    "4–5 concrete, buildable features"
  ],

  "whatYouWillLearn": [
    "3–5 specific, hands-on skills the developer will practice"
  ],

  "buildRoadmap": [
    "Step 1: What to build first and why",
    "Step 2: What to add next",
    "Step 3: How to extend or polish"
  ],

  "designTradeoffs": [
    "Why certain simple choices are made instead of complex ones",
    "What is intentionally kept out of scope"
  ],

  "estimatedTime": {
    "days": "X–Y days",
    "dailyEffort": "Approx N hours per day"
  }
}

FINAL REMINDER:
This response will be shown directly inside a polished product UI.
It must feel clean, practical, mentor-driven, and confidence-building.
`;


    const model = await getGeminiModel();

    let attempt = 0;
    let result;

    // 2️⃣ Retry once if 429 happens
    while (attempt <= MAX_RETRIES) {
      try {
        result = await model.generateContent(prompt);
        break;
      } catch (error: any) {
        attempt++;

        // Handle Gemini rate limit
        if (error?.status === 429 || error?.message?.includes("429")) {
          if (attempt > MAX_RETRIES) {
            return NextResponse.json(
              { error: "Rate limit exceeded. Please try again shortly." },
              { status: 429 }
            );
          }

          // small backoff (500ms)
          await new Promise((res) => setTimeout(res, 500));
          continue;
        }

        throw error;
      }
    }

    if (!result) {
      throw new Error("Model returned no result");
    }

    const text = result.response.text();

    // 3️⃣ Safe JSON extraction
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");

    if (jsonStart === -1 || jsonEnd === -1) {
      console.error("Raw model output:", text);
      return NextResponse.json(
        { error: "Invalid response format from AI" },
        { status: 502 }
      );
    }

    let parsed;
    try {
      parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1));
    } catch (e) {
      console.error("JSON parse error:", e, text);
      return NextResponse.json(
        { error: "Failed to parse AI response" },
        { status: 502 }
      );
    }

    return NextResponse.json(parsed);
  } catch (err: any) {
    console.error("Idea generation failed:", err);

    // 4️⃣ Known error mapping
    if (err?.status === 429) {
      return NextResponse.json(
        { error: "Free access is temporarily limited.Need uninterrupted access? Email us for Pro "},
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
