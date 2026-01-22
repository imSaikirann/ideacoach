import { NextResponse } from "next/server";
import { ratelimit } from "@/lib/ratelimit";

export async function rateLimitCheck(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ??
    req.headers.get("x-real-ip") ??
    "unknown";

  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Try again later." },
      { status: 429 }
    );
  }

  return null; // means allowed
}
