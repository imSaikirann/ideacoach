"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { UserDropdown } from "@/components/UserDropdown";
import { GithubStarButton } from "./GithubStarButton";

export default function Navbar() {
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isAuthed = !!session?.user;

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-background/90 backdrop-blur-md border-border/50 shadow-sm"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center  text-lg font-semibold tracking-tight"
          >
            Idea<span className="text-primary">Coach</span>
          </Link>

          {/* Right section */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isAuthed ? (
              <>
                <GithubStarButton />
                <UserDropdown user={session!.user} />
              </>
            ) : (
              <Button
                size="sm"
                className="px-4"
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