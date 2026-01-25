"use client";

import React from "react";
import { ProjectSectionProps } from "../types";



export function ProjectSection({
  title,
  icon,
  children,
  delay = 0,
  revealed,
}: ProjectSectionProps) {
  return (
    <div
      className={`p-5 sm:p-6 lg:p-8 rounded-xl bg-card border border-border space-y-4 sm:space-y-5 transition-all duration-700 ${
        revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-2.5 sm:gap-3 text-muted-foreground mb-1">
        <div className="flex-shrink-0">{icon}</div>
        <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider">
          {title}
        </h3>
      </div>
      <div className="pt-1">
        {children}
      </div>
    </div>
  );
}
