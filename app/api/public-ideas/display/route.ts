import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const currentUserId = session?.user?.id;

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);

    const skip = (page - 1) * limit;

    const whereCondition = {
      OR: [
        { visibility: "PUBLIC" as const },
        ...(currentUserId
          ? [{ visibility: "PRIVATE" as const, userId: currentUserId }]
          : []),
      ],
    };

    const [ideas, total] = await Promise.all([
      prisma.idea.findMany({
        where: whereCondition,
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),

      prisma.idea.count({
        where: whereCondition,
      }),
    ]);

    const userIds = Array.from(new Set(ideas.map((i) => i.userId)));

    const users = await prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, name: true, email: true },
    });

    const userById = new Map(users.map((u) => [u.id, u]));

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
        time: "1-2 weeks",
        category: idea.interest || "General",
        createdAt: idea.createdAt.toISOString(),
        author: author?.name || author?.email || "Anonymous",
        visibility: idea.visibility,
        isOwn: currentUserId ? idea.userId === currentUserId : false,
      };
    });

    return NextResponse.json({
      data: mappedIdeas,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: page * limit < total,
      },
    });
  } catch (error) {
    console.error("Failed to fetch ideas:", error);

    return NextResponse.json(
      { error: "Failed to fetch ideas" },
      { status: 500 }
    );
  }
}