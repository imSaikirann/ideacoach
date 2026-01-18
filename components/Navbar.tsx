"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { signOut, useSession, signIn } from "next-auth/react";
import { UserMenu } from "@/components/UserMenu";
import Container from "@/components/common/Container";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const isAuthed = !!session?.user;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#2A1F1F] bg-[#0F0E0E]/95 backdrop-blur-xl">
      <Container size="xl">
        <div className="flex h-16 items-center justify-between    ">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold tracking-tight text-[#E5E5E5]"
          >
            <span className="text-[#E5E5E5]">Idea</span>Coach
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/how-it-works">How It Works</NavLink>
            <NavLink href="/ideas">Ideas</NavLink>
            <NavLink href="/about">About</NavLink>
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">
            {isAuthed ? (
              <div className="flex items-center gap-4">
                <Button className="rounded-lg bg-[#541212] px-4 py-2 font-semibold text-white hover:bg-[#6B1A1A] transition-colors">
                  Star on GitHub
                </Button>
                <UserMenu user={session.user} />
              </div>
            ) : (
              <Button
                onClick={() => signIn("google")}
                className="rounded-lg bg-[#541212] px-4 py-2 font-semibold text-white hover:bg-[#6B1A1A] transition-colors"
              >
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
            className="inline-flex items-center justify-center rounded-md p-2 text-[#E5E5E5] hover:bg-[#1A1818] md:hidden transition-colors"
            onClick={() => setIsOpen((v) => !v)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-[#2A1F1F] bg-[#0F0E0E]/95 backdrop-blur">
          <Container size="xl">
            <div className="space-y-1 py-4">
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

              {/* Auth Actions */}
              <div className="pt-4 grid gap-2">
                {isAuthed ? (
                  <>
                    <div className="text-sm text-[#E5E5E5] px-1">
                      {session?.user?.name ?? session?.user?.email}
                    </div>

                    <Button
                      variant="outline"
                      className="w-full rounded-lg border-[#2A1F1F] text-[#E5E5E5] hover:bg-[#1A1818]"
                      onClick={() => {
                        setIsOpen(false);
                        signOut();
                      }}
                    >
                      Sign out
                    </Button>
                  </>
                ) : (
                  <Button
                    className="w-full rounded-lg bg-[#541212] py-2 font-semibold text-white hover:bg-[#6B1A1A] transition-colors"
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
          </Container>
        </div>
      )}
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
      className="text-sm font-medium text-[#E5E5E5] transition-colors hover:text-[#A0A0A0]"
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
      className="block rounded-md px-2 py-2 text-sm font-medium text-[#E5E5E5] hover:bg-[#1A1818]"
    >
      {children}
    </Link>
  );
}
