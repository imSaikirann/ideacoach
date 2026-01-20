"use client";

import React from "react";
import { Sparkles } from "lucide-react";

interface ProjectTitleProps {
  title: string;
  subtitle: string;
  revealed: boolean;
}

export function ProjectTitle({
  title,
  subtitle,
  revealed,
}: ProjectTitleProps) {
  return (
    <div
      className={`transition-all duration-700 ${
        revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="flex items-center gap-2 text-accent mb-2">
        <Sparkles className="w-4 h-4" />
        <span className="text-sm font-medium uppercase tracking-wide">
          Your project idea
        </span>
      </div>

      <h2 className="text-2xl font-semibold text-foreground">
        {title}
      </h2>

      {subtitle && (
        <p className="text-muted-foreground mt-2">{subtitle}</p>
      )}
    </div>
  );
}
