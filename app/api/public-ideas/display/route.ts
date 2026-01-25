import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const currentUserId = session?.user?.id;

    // 1️⃣ Fetch PUBLIC ideas + user's own PRIVATE ideas
    const ideas = await prisma.idea.findMany({
      where: {
        OR: [
          { visibility: "PUBLIC" as const },
          ...(currentUserId ? [{ visibility: "PRIVATE" as const, userId: currentUserId }] : []),
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 100, // Limit to 100 most recent
    });

    // 2️⃣ Safely resolve author (some older records may reference deleted users)
    const userIds = Array.from(new Set(ideas.map((i) => i.userId)));
    const users = await prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, name: true, email: true },
    });
    const userById = new Map(users.map((u) => [u.id, u]));

    // 3️⃣ Map to frontend format
    const mappedIdeas = ideas.map((idea) => {
      const author = userById.get(idea.userId);
      const stack = idea.techStack
        ? idea.techStack.split(",").map((s) => s.trim()).filter(Boolean)
        : [];

      return {
        id: idea.id,
        title: idea.title,
        problem: idea.problemSolved,
        problemStatement: idea.problemSolved,
        features: idea.features,
        difficulty: idea.difficulty,
        techStack: stack,
        stack,
        projectType: idea.projectType,
        interest: idea.interest,
        time: "1-2 weeks", // Default (can be improved later)
        category: idea.interest || "General",
        createdAt: idea.createdAt.toISOString(),
        author: author?.name || author?.email || "Anonymous",
        visibility: idea.visibility,
        isOwn: currentUserId ? idea.userId === currentUserId : false,
      };
    });

    return NextResponse.json(mappedIdeas);
  } catch (error) {
    console.error("Failed to fetch ideas:", error);

    return NextResponse.json(
      { error: "Failed to fetch ideas" },
      { status: 500 }
    );
  }
}
