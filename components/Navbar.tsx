// components/Navbar.tsx
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-gray-900">
          <span className="text-green-600">Idea</span>Coach
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/how-it-works">How It Works</NavLink>
          <NavLink href="/ideas">Ideas</NavLink>
          <NavLink href="/about">About</NavLink>
        </div>

        {/* Call to action */}
        <div className="hidden md:block">
          <Button className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-500">
            Find My Idea
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          aria-label="Toggle Menu"
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          onClick={() => setIsOpen((v) => !v)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-1 border-t border-gray-200 bg-white/90 px-4 py-3 backdrop-blur">
            <MobileLink href="/" onClick={() => setIsOpen(false)}>Home</MobileLink>
            <MobileLink href="/how-it-works" onClick={() => setIsOpen(false)}>How It Works</MobileLink>
            <MobileLink href="/ideas" onClick={() => setIsOpen(false)}>Ideas</MobileLink>
            <MobileLink href="/about" onClick={() => setIsOpen(false)}>About</MobileLink>
            <div className="pt-2">
              <Button className="w-full rounded-lg bg-green-600 py-2 font-semibold text-white hover:bg-green-500">
                Find My Idea
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
    >
      {children}
    </Link>
  );
}

function MobileLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block rounded-md px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
    >
      {children}
    </Link>
  );
}
