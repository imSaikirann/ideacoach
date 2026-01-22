'use client';

import React from "react"

import { cn } from "@/lib/utils";
import { ChipProps } from "../types";



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
        "px-3 sm:px-4 py-2 sm:py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "min-h-[44px] touch-manipulation", // Better touch target
        active
          ? "bg-accent text-accent-foreground shadow-sm"
          : "bg-secondary text-foreground border border-border hover:border-accent/50 hover:bg-secondary/80",
        className
      )}
    >
      {children}
    </button>
  );
}
