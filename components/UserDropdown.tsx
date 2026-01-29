"use client";

import React, { useEffect, useRef, useState } from "react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { LogOut, User } from "lucide-react";
import Link from "next/link";

interface UserDropdownProps {
  user: Session["user"];
}

export function UserDropdown({ user }: UserDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Avatar Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-secondary transition"
      >
        <div className="relative h-8 w-8 rounded-full overflow-hidden bg-accent/10">
          {user?.image ? (
            <Image
              src={user.image}
              alt={user.name ?? "User"}
              fill
              sizes="32px"
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-sm font-semibold text-accent">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
          )}
        </div>

        <span className="hidden sm:inline text-sm font-medium max-w-[120px] truncate">
          {user?.name}
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-background shadow-lg z-50">
          {/* User info */}
          <div className="px-4 py-3 border-b">
            <p className="text-sm font-semibold truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.email}
            </p>
          </div>

          {/* Actions */}
          <div className="p-2 space-y-1">
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-secondary transition"
            >
              <User className="h-4 w-4" />
              Profile
            </Link>

            <button
              onClick={() => {
                setOpen(false);
                signOut();
              }}
              className="w-full flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-secondary transition"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
