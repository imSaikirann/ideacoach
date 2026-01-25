"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { ProjectTitleProps } from "../types";



export function ProjectTitle({
  title,
  subtitle,
  revealed,
}: ProjectTitleProps) {
  return (
    <div
      className={`transition-all duration-700 mb-6 sm:mb-8 ${
        revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="flex items-center gap-2 text-accent mb-3 sm:mb-4">
        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-xs sm:text-sm font-medium uppercase tracking-wide">
          Your project idea
        </span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-semibold text-foreground leading-tight mb-3 sm:mb-4">
        {title}
      </h2>

      {subtitle && (
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
