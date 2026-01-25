import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { rateLimitCheck } from "@/lib/rateLimitCheck";
import { generateProject } from "@/lib/ai/generateProject";

export async function POST(req: NextRequest) {
  try {
    const rateLimitResponse = await rateLimitCheck(req);
    if (rateLimitResponse) return rateLimitResponse;

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const credits = await prisma.userCredits.findUnique({
      where: { userId: session.user.id },
    });

    if (!credits || credits.credits <= 0) {
      return NextResponse.json(
        { error: "No credits left" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { projectType, techStack, difficulty, interest, customProblem } = body;

    if (!projectType || !techStack || !difficulty || !interest) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const project = await generateProject({
      projectType,
      techStack,
      difficulty,
      interest,
      customProblem,
    });

    // Deduct credit after successful generation
    await prisma.userCredits.updateMany({
      where: { userId: session.user.id, credits: { gt: 0 } },
      data: { credits: { decrement: 1 } },
    });

    // Auto-save as PRIVATE
    const savedIdea = await prisma.idea.create({
      data: {
        userId: session.user.id,
        title: project.title,
        problemSolved: project.problemSolved || project.oneLiner || "",
        features: project.mustHaveFeatures,
        projectType,
        techStack: typeof techStack === "string" ? techStack : techStack.join(", "),
        difficulty,
        interest,
        visibility: "PRIVATE",
      },
    });

    return NextResponse.json({ ...project, savedIdeaId: savedIdea.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
