"use client";

import React from "react"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X, Github, Sparkles } from "lucide-react";
import { signOut, useSession, signIn } from "next-auth/react";
import { UserMenu } from "@/components/UserMenu";
import Container from "@/components/common/Container";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();
  const isAuthed = !!session?.user;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/50 bg-background/80 backdrop-blur-xl shadow-lg shadow-background/20"
          : "bg-transparent"
      )}
    >
      <Container size="xl">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          {/* Brand */}
          <Link href="/" className="group flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/20 transition-colors group-hover:bg-accent/30">
              <Sparkles className="h-4 w-4 text-accent" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              Idea<span className="text-accent">Coach</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 md:flex">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/how-it-works">How It Works</NavLink>
            <NavLink href="/ideas">Ideas</NavLink>
            <NavLink href="/about">About</NavLink>
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">
            {isAuthed ? (
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 border-border/50 bg-transparent text-foreground hover:bg-secondary hover:text-foreground"
                >
                  <Github className="h-4 w-4" />
                  Star on GitHub
                </Button>
                <UserMenu user={session.user} />
              </div>
            ) : (
              <Button
                onClick={() => signIn("google")}
                size="sm"
                className="bg-accent px-4 font-medium text-accent-foreground hover:bg-accent/90 transition-all hover:shadow-lg hover:shadow-accent/20"
              >
                Get Started
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
            className={cn(
              "inline-flex items-center justify-center rounded-lg p-2 text-foreground transition-all md:hidden",
              isOpen ? "bg-secondary" : "hover:bg-secondary/50"
            )}
            onClick={() => setIsOpen((v) => !v)}
          >
            <div className="relative h-5 w-5">
              <Menu
                className={cn(
                  "absolute inset-0 h-5 w-5 transition-all duration-200",
                  isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                )}
              />
              <X
                className={cn(
                  "absolute inset-0 h-5 w-5 transition-all duration-200",
                  isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                )}
              />
            </div>
          </button>
        </div>
      </Container>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 top-16 z-40 bg-background/80 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={cn(
          "fixed top-16 right-0 bottom-0 z-50 w-full max-w-sm border-l border-border/50 bg-background/95 backdrop-blur-xl transition-transform duration-300 ease-out md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-full flex-col p-6">
          <div className="flex-1 space-y-1">
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

          {/* Auth Actions */}
          <div className="border-t border-border/50 pt-6">
            {isAuthed ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 rounded-lg bg-secondary/50 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-sm font-medium text-accent">
                    {session?.user?.name?.[0] || session?.user?.email?.[0] || "U"}
                  </div>
                  <div className="flex-1 truncate">
                    <p className="text-sm font-medium text-foreground truncate">
                      {session?.user?.name || "User"}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {session?.user?.email}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-border/50 bg-transparent text-foreground hover:bg-secondary"
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
                className="w-full bg-accent font-medium text-accent-foreground hover:bg-accent/90"
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
      className="relative px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground group"
    >
      {children}
      <span className="absolute inset-x-3 -bottom-px h-px bg-accent scale-x-0 transition-transform group-hover:scale-x-100" />
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
      className="flex items-center rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary/50"
    >
      {children}
    </Link>
  );
}
