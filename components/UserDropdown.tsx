"use client";

import React, { useState } from "react";
import { Session } from "next-auth";
import { Button } from "@/components/ui/button";
import { LogOut, Settings } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface UserDropdownProps {
  user: Session["user"];
}

export function UserDropdown({ user }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-secondary transition-colors"
      >
        <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-semibold text-accent">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </span>
        </div>
        <span className="text-sm font-medium hidden sm:inline max-w-[120px] truncate">
          {user?.name || "User"}
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-border bg-background shadow-lg z-50">
            <div className="p-3 border-b border-border/50">
              <p className="text-sm font-semibold truncate">{user?.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email}
              </p>
            </div>

            <div className="p-2 space-y-1">
              <button
                onClick={() => {
                  setIsOpen(false);
                  window.location.href = "/profile";
                }}
                className="w-full flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-secondary transition-colors text-foreground"
              >
                <Settings className="h-4 w-4" />
                Profile
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  signOut();
                }}
                className="w-full flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-secondary transition-colors text-foreground"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
