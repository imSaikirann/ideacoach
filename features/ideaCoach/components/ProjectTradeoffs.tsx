"use client";

import React from "react";
import { AlertCircle } from "lucide-react";
import { ProjectTradeoffsProps } from "../types";



export function ProjectTradeoffs({ tradeoffs, revealed }: ProjectTradeoffsProps) {
  if (!tradeoffs || tradeoffs.length === 0) return null;

  return (
    <div
      className={`space-y-3 transition-all duration-700 ${
        revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: "1100ms" }}
    >
      <div className="flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-accent" />
        <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
          Design tradeoffs
        </h3>
      </div>

      <div className="grid gap-3">
        {tradeoffs.map((tradeoff, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-accent/5 border border-accent/20 hover:border-accent/40 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
              <p className="text-sm text-foreground/85 leading-relaxed">
                {tradeoff}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
