
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

  const idea = await prisma.idea.create({
    data: {
      userId: session.user.id,
      ...body,
      visibility: "PRIVATE",
    },
  });

  return NextResponse.json(idea);
  } catch (error) {
    return NextResponse.json(error)
  }
}
