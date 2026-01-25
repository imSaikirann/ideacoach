"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Github, Sparkles, LogOut } from "lucide-react";
import { signIn, useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { UserDropdown } from "@/components/UserDropdown";
import { GithubStarButton } from "./GithubStarButton";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();
  const isAuthed = !!session?.user;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
          <Link 
            href="/" 
            className="flex items-center gap-2.5 flex-shrink-0 group"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 group-hover:bg-accent/15 transition-colors">
              <Sparkles className="h-5 w-5 text-accent" />
            </div>
            <span className="text-lg font-bold tracking-tight hidden sm:inline">
              Idea<span className="text-accent">Coach</span>
            </span>
          </Link>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            {isAuthed ? (
              <>
                <GithubStarButton/>

                <div className="w-px h-6 bg-border/50" />

                <UserDropdown user={session!.user} />
              </>
            ) : (
              <Button
                size="sm"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium"
                onClick={() => signIn("google")}
              >
                Get Started
              </Button>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2.5 hover:bg-secondary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      <div
        className={cn(
          "fixed inset-0 top-16 bg-black/50 md:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Panel */}
      <div
        className={cn(
          "fixed top-16 right-0 bottom-0 w-full sm:max-w-sm bg-background border-l border-border md:hidden transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-6 flex flex-col h-full">
          {/* Authenticated Mobile Menu */}
          {isAuthed && (
            <div className="mb-6 pb-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-accent">
                    {session?.user?.name?.[0]?.toUpperCase() || "U"}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">
                    {session?.user?.name || "User"}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {session?.user?.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex-1 space-y-1">
            {isAuthed && (
              <>
                <MobileLink href="/" onClick={() => setIsOpen(false)}>
                  Home
                </MobileLink>
                <MobileLink href="/dashboard" onClick={() => setIsOpen(false)}>
                  Dashboard
                </MobileLink>
                <MobileLink href="/profile" onClick={() => setIsOpen(false)}>
                  Profile
                </MobileLink>
                <div className="my-3 border-t border-border" />
              </>
            )}
          </div>

          <div className="space-y-3 border-t pt-6">
            {isAuthed ? (
              <>
              <GithubStarButton/>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-transparent"
                  onClick={() => {
                    setIsOpen(false);
                    signOut();
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Button
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium"
                onClick={() => {
                  setIsOpen(false);
                  signIn("google");
                }}
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

/* ---------- helpers ---------- */

function MobileLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-secondary/60 transition-colors"
    >
      {children}
    </Link>
  );
}
