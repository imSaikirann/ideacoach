import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { rateLimitCheck } from "@/lib/rateLimitCheck";

export async function POST(req: Request) {
  try {

      const rateLimitResponse = await rateLimitCheck(req);
  if (rateLimitResponse) return rateLimitResponse;
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { email, feedback } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const alreadyExisted = await prisma.proInterest.findUnique({
      where: { email },
    });

    if (alreadyExisted) {
      return NextResponse.json(
        { message: "You’re already on the waitlist" },
        { status: 200 }
      );
    }

    await prisma.proInterest.create({
      data: {
        email,
        feedback,
        userId: session.user.id, 
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
