import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getGeminiModel } from "@/lib/gemini";

const MAX_RETRIES = 1;

export async function POST(req: NextRequest) {
  try {
    // 1️⃣ Auth
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2️⃣ Get credits
    const userCredits = await prisma.userCredits.findUnique({
      where: { userId: session.user.id },
    });

    if (!userCredits || userCredits.credits <= 0) {
      return NextResponse.json(
        { error: "No credits left. Upgrade to Pro to continue." },
        { status: 403 }
      );
    }

    // 3️⃣ Validate input
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

    // 4️⃣ Prompt
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

STRICT OUTPUT RULES:
- Return ONLY valid JSON
- Do NOT use markdown
- Do NOT add extra text
`;

    const model = await getGeminiModel();

    let attempt = 0;
    let result;

    
    while (attempt <= MAX_RETRIES) {
      try {
        result = await model.generateContent(prompt);
        break;
      } catch (error: any) {
        attempt++;

        if (error?.status === 429 || error?.message?.includes("429")) {
          if (attempt > MAX_RETRIES) {
            return NextResponse.json(
              { error: "Rate limit exceeded. Try again later." },
              { status: 429 }
            );
          }

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

    // 6️⃣ Safe JSON extraction
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");

    if (jsonStart === -1 || jsonEnd === -1) {
      console.error("Raw model output:", text);
      return NextResponse.json(
        { error: "Invalid AI response format" },
        { status: 502 }
      );
    }

    let parsed;
    try {
      parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1));
    } catch (e) {
      console.error("JSON parse error:", e);
      return NextResponse.json(
        { error: "Failed to parse AI response" },
        { status: 502 }
      );
    }

    // 7️⃣ 🔥 Deduct credit AFTER success
    await prisma.userCredits.updateMany({
      where: { 
        userId: session.user.id,
        credits: { gt: 0 }
      },
      data: {
        credits: { decrement: 1 },
      },
    });

    return NextResponse.json(parsed);
  } catch (err: any) {
    console.error("Idea generation failed:", err);

    if (err?.status === 429) {
      return NextResponse.json(
        {
          error:
            "Free access is temporarily limited. Need uninterrupted access? Email us for Pro.",
        },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
