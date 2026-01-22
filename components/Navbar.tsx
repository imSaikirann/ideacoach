"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Github, Sparkles } from "lucide-react";
import { signIn, useSession, signOut } from "next-auth/react";
import Container from "@/components/common/Container";
import { cn } from "@/lib/utils";
import { UserDropdown } from "@/components/UserDropdown";

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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? " bg-background/80 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <Container size="xl">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/20">
              <Sparkles className="h-4 w-4 text-accent" />
            </div>
            <span className="text-xl font-bold">
              Idea<span className="text-accent">Coach</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/how-it-works">How It Works</NavLink>
            <NavLink href="/ideas">Ideas</NavLink>
            <NavLink href="/about">About</NavLink>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthed ? (
              <>
                {/* GitHub Star Icon */}
                <Button
                  asChild
                  variant="outline"
                  size="icon"
                  className="border-border/50"
                >
                  <a
                    href="https://github.com/imSaikirann/ideacoach"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Star on GitHub"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                </Button>

                <UserDropdown user={session!.user} />
              </>
            ) : (
              <Button
                size="sm"
                className="bg-accent text-accent-foreground"
                onClick={() => signIn("google")}
              >
                Get Started
              </Button>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden rounded-lg p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </Container>

      {/* Mobile Overlay */}
      <div
        className={cn(
          "fixed inset-0 top-16 bg-background/80 backdrop-blur-sm md:hidden transition-opacity",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Panel */}
      <div
        className={cn(
          "fixed top-16 right-0 bottom-0 w-full max-w-sm bg-background border-l border-border md:hidden transition-transform",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex-1 space-y-2">
            <MobileLink href="/" onClick={() => setIsOpen(false)}>
              Home
            </MobileLink>
            <MobileLink href="/how-it-works" onClick={() => setIsOpen(false)}>
              How It Works
            </MobileLink>
            <MobileLink href="/ideas" onClick={() => setIsOpen(false)}>
              Ideas
            </MobileLink>
            <MobileLink href="/about" onClick={() => setIsOpen(false)}>
              About
            </MobileLink>
          </div>

          <div className="border-t pt-4">
            {isAuthed ? (
              <div className="space-y-3">
                <MobileLink href="/dashboard" onClick={() => setIsOpen(false)}>
                  Dashboard
                </MobileLink>
                <MobileLink href="/profile" onClick={() => setIsOpen(false)}>
                  Profile
                </MobileLink>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setIsOpen(false);
                    signOut();
                  }}
                >
                  Sign out
                </Button>
              </div>
            ) : (
              <Button
                className="w-full bg-accent"
                onClick={() => {
                  setIsOpen(false);
                  signIn("google");
                }}
              >
                Continue with Google
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ---------- helpers ---------- */

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
    >
      {children}
    </Link>
  );
}

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
      className="block rounded-lg px-3 py-3 text-base hover:bg-secondary/50"
    >
      {children}
    </Link>
  );
}
