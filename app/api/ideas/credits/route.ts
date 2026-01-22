import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getNextResetDate, shouldReset } from "@/lib/credits";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  

    let userCredits = await prisma.userCredits.findUnique({
      where: { userId: session.user.id },
    });

    // 🆕 First time user → create credits row
    if (!userCredits) {
      userCredits = await prisma.userCredits.create({
        data: {
          userId: session.user.id,
          plan: "FREE",
          credits: 3,
          monthlyLimit: 3,
          resetsAt: getNextResetDate(),
        },
      });
    }

    // 🔁 Monthly reset
    if (shouldReset(userCredits.resetsAt)) {
      const limit =
        userCredits.plan === "PRO" ? userCredits.monthlyLimit ?? 30 : 3;

      userCredits = await prisma.userCredits.update({
        where: { userId: session.user.id },
        data: {
          credits: limit,
          resetsAt: getNextResetDate(),
        },
      });
    }

    return NextResponse.json({
      plan: userCredits.plan,
      creditsLeft: userCredits.credits,
      creditsPerMonth:
        userCredits.plan === "PRO"
          ? userCredits.monthlyLimit ?? 30
          : 3,
      resetsAt: userCredits.resetsAt,
    });
  } catch (error) {

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
