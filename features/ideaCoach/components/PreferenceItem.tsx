"use client";

import React from "react";
import { PreferenceItemProps } from "../types";



export function PreferenceItem({
  icon,
  label,
  value,
}: PreferenceItemProps) {
  return (
    <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-lg bg-card/50 border border-border/50">
      <div className="w-8 h-8 rounded-md bg-card flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
        <p className="text-sm sm:text-base text-foreground font-medium truncate" title={value}>
          {value}
        </p>
      </div>
    </div>
  );
}
