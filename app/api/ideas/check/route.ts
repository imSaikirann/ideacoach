
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { rateLimitCheck } from "@/lib/rateLimitCheck";

export async function GET(req: Request) {
  try {

      const rateLimitResponse = await rateLimitCheck(req);
      if (rateLimitResponse) return rateLimitResponse;
    const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const idea = await prisma.idea.findMany({
    where:{
        userId:session?.user?.id
    }
  });

  return NextResponse.json(idea);
  } catch (error) {
    return NextResponse.json(error)
  }
}
