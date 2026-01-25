export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimitCheck } from "@/lib/rateLimitCheck";

export async function GET(req:Request) {

  const rateLimitResponse = await rateLimitCheck(req);
      if (rateLimitResponse) return rateLimitResponse;
  const start = Date.now();


  try {

    await prisma.$runCommandRaw({
      ping: 1
    });

    return NextResponse.json(
      {
        status: "ok",
        db: "ok",
        uptime: `${process.uptime().toFixed(0)}s`,
        latency: `${Date.now() - start}ms`
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("MongoDB health check failed:", error);

    return NextResponse.json(
      {
        status: "unhealthy",
        uptime: `${process.uptime().toFixed(0)}s`
      },
      { status: 503 }
    );
  }
}
