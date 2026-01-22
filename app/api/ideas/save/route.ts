import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { visibility = "PUBLIC", projectData, ...ideaData } = body;

    // Ensure features is an array
    const features = Array.isArray(ideaData.features) 
      ? ideaData.features 
      : ideaData.features 
        ? [ideaData.features] 
        : [];

    const idea = await prisma.idea.create({
      data: {
        userId: session.user.id,
        title: ideaData.title || "Untitled Project",
        problemSolved: ideaData.problemSolved || "",
        features: features,
        projectType: ideaData.projectType || "",
        techStack: ideaData.techStack || "",
        difficulty: ideaData.difficulty || "",
        interest: ideaData.interest || "",
        visibility: visibility,
      },
    });

    return NextResponse.json(idea);
  } catch (error: any) {
    console.error("Failed to save idea:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to save idea" },
      { status: 500 }
    );
  }
}
