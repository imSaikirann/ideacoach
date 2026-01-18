'use client';

import React from "react"

import { cn } from "@/lib/utils";

interface ChipProps {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function Chip({
  active = false,
  children,
  onClick,
  className = "",
}: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        active
          ? "bg-accent text-accent-foreground"
          : "bg-secondary text-foreground border border-border hover:border-accent/50 hover:bg-secondary/80",
        className
      )}
    >
      {children}
    </button>
  );
}
