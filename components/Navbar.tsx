"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { UserDropdown } from "@/components/UserDropdown";
import { GithubStarButton } from "./GithubStarButton";

export default function Navbar() {
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isAuthed = !!session?.user;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-background/95 backdrop-blur-md border-border/40 shadow-sm"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 group-hover:bg-accent/15 transition">
              <Sparkles className="h-5 w-5 text-accent" />
            </div>
            <span className="hidden sm:inline text-lg font-bold">
              Idea<span className="text-accent">Coach</span>
            </span>
          </Link>

          {/* Right side (same for mobile + desktop) */}
          <div className="flex items-center gap-2">
            {isAuthed ? (
              <>
                <GithubStarButton />
                <UserDropdown user={session!.user} />
              </>
            ) : (
              <Button
                size="sm"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                onClick={() => signIn("google")}
              >
                Get Started
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
