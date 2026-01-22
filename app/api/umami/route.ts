import { NextResponse } from "next/server";

export async function GET() {
  const websiteId = process.env.UMAMI_WEBSITE_ID;
  const token = process.env.UMAMI_API_TOKEN;

  if (!websiteId || !token) {
    return NextResponse.json({ visitors: 0 });
  }

  const now = Date.now();
  const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;

  const res = await fetch(
    `https://cloud.umami.is/api/websites/${websiteId}/stats?startAt=${thirtyDaysAgo}&endAt=${now}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 300 },
    }
  );

  if (!res.ok) {
    return NextResponse.json({ visitors: 0 });
  }

  const data = await res.json();

  return NextResponse.json({
    visitors: data.visitors?.value ?? 0,
  });
}
