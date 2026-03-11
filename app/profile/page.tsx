"use client";

import Image from "next/image";
import { useProfile } from "@/features/ideaCoach/hooks/useProfile";
import BackButton from "@/components/common/back-button";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Loading from "@/components/common/Loading";

export default function Page() {
  const { data: profile, isLoading, error } = useProfile();

  if (isLoading) {
     return <Loading text="Loading profile..." />;
  }

  if (error || !profile) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Failed to load dashboard</p>
      </div>
    );
  }

  const creditsLeft = profile.credits.credits;
  const monthlyLimit = profile.credits.monthlyLimit;
  const creditsUsed = monthlyLimit - creditsLeft;

  const usagePercent =
    monthlyLimit > 0 ? (creditsUsed / monthlyLimit) * 100 : 0;

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-10 md:px-8 md:py-12 mt-10">

        {/* HEADER */}
        <section className="flex flex-col gap-4 border-b border-border pb-8">
            <BackButton/>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Account Overview
          </p>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>
              <h1 className="text-3xl font-semibold text-foreground">
                Dashboard
              </h1>

              <p className="text-sm text-muted-foreground mt-2">
                Manage your profile and monitor your monthly credit usage.
              </p>
            </div>

            <div className="flex items-center gap-3">

              <div className="border border-border px-4 py-2 rounded-full text-sm text-muted-foreground">
                Plan
                <span className="ml-2 text-foreground font-medium">
                  {profile.credits.plan}
                </span>
              </div>

              {/* UPGRADE BUTTON */}
              <Link href="/dashboard/upgrade-page">
              <Button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition">
                Upgrade
              </Button>
              </Link>

            </div>
          </div>

        </section>


        {/* GRID */}
        <section className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">

          {/* LEFT SIDE */}
          <div className="space-y-6">

            {/* PROFILE CARD */}
            <div className="rounded-3xl border border-border bg-card p-6 md:p-8">

              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

                <div className="relative h-20 w-20 overflow-hidden rounded-xl border border-border">
                  <Image
                    src={profile.image || "/avatar.png"}
                    alt={profile.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">

                  <h2 className="text-2xl font-semibold text-foreground">
                    {profile.name}
                  </h2>

                  <p className="text-sm text-muted-foreground break-all">
                    {profile.email}
                  </p>

                </div>
              </div>

            </div>


            {/* CREDIT USAGE */}
            <div className="rounded-3xl border border-border bg-card p-6 md:p-8">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-xs uppercase text-muted-foreground">
                    Credit Usage
                  </p>

                  <h3 className="text-xl font-semibold text-foreground mt-2">
                    Monthly consumption
                  </h3>
                </div>

                <div className="text-xs border border-border px-3 py-1 rounded-full text-muted-foreground">
                  {creditsUsed} / {monthlyLimit}
                </div>

              </div>


              {/* PROGRESS */}
              <div className="mt-8">

                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Usage</span>
                  <span className="text-foreground font-medium">
                    {Math.round(usagePercent)}%
                  </span>
                </div>

                <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${usagePercent}%` }}
                  />
                </div>

              </div>


              {/* STATS */}
              <div className="grid sm:grid-cols-3 gap-4 mt-8">

                <Stat label="Credits Left" value={creditsLeft} />
                <Stat label="Monthly Limit" value={monthlyLimit} />
                <Stat label="Used This Month" value={creditsUsed} />

              </div>


              {/* UPGRADE CTA */}
              <div className="mt-8 flex justify-end">
      <Link href="/dashboard/upgrade-page"> <Button className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition">
                  Upgrade Plan
                </Button></Link>
               

              </div>

            </div>

          </div>


          {/* RIGHT SIDE */}
          <div className="rounded-3xl border border-border bg-card p-6 md:p-8 h-fit">

            <p className="text-xs uppercase text-muted-foreground">
              Summary
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-2">
              Account Snapshot
            </h3>

            <div className="mt-8 space-y-5">

              <Row label="Name" value={profile.name} />
              <Row label="Email" value={profile.email} />
              <Row label="Plan" value={profile.credits.plan} />
              <Row label="Credits Left" value={creditsLeft} />
              <Row label="Monthly Limit" value={monthlyLimit} />
              <Row
                label="Resets On"
                value={new Date(profile.credits.resetsAt).toLocaleDateString()}
              />

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}


function Row({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between border-b border-border pb-4 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground font-medium">{value}</span>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-border rounded-xl p-5">
      <p className="text-xs uppercase text-muted-foreground">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-foreground">{value}</p>
    </div>
  );
}