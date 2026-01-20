import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  const { pathname } = req.nextUrl;

  // Routes
  const DASHBOARD = "/dashboard";
  const GET_STARTED = "/signin";

  // Logged-in users should not see getstarted
  if (pathname === GET_STARTED && session) {
    return NextResponse.redirect(new URL(DASHBOARD, req.url));
  }

  // Logged-out users should not see dashboard
  if (pathname.startsWith(DASHBOARD) && !session) {
    return NextResponse.redirect(new URL(GET_STARTED, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/getstarted"],
};
