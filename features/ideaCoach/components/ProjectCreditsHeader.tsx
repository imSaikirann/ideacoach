"use client";

import React from "react";
import { Zap, TrendingUp } from "lucide-react";

interface ProjectCreditsHeaderProps {
  creditsLeft: number;
  creditsPerMonth: number;
}

export function ProjectCreditsHeader({
  creditsLeft,
  creditsPerMonth,
}: ProjectCreditsHeaderProps) {
  const percentageUsed = Math.round(
    ((creditsPerMonth - creditsLeft) / creditsPerMonth) * 100
  );
  const percentageLeft = 100 - percentageUsed;

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
          <Zap className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">Monthly Credits</h3>
          <p className="text-xs text-muted-foreground">Usage this month</p>
        </div>
      </div>

      {/* Credit Stats */}
      <div className="grid grid-cols-3 gap-3">
        {/* Credits Left */}
        <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
          <p className="text-xs text-muted-foreground mb-1">Credits Left</p>
          <p className="text-2xl font-bold text-primary">{creditsLeft}</p>
        </div>

        {/* Used */}
        <div className="p-3 rounded-lg bg-accent/5 border border-accent/20">
          <p className="text-xs text-muted-foreground mb-1">Used</p>
          <p className="text-2xl font-bold text-accent">
            {creditsPerMonth - creditsLeft}
          </p>
        </div>

        {/* Total */}
        <div className="p-3 rounded-lg bg-muted/30 border border-border">
          <p className="text-xs text-muted-foreground mb-1">Total</p>
          <p className="text-2xl font-bold text-foreground">{creditsPerMonth}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium text-foreground">Progress</span>
          <span className="text-xs text-muted-foreground">{percentageLeft}% remaining</span>
        </div>
        <div className="w-full h-3 bg-secondary rounded-full overflow-hidden border border-border">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 rounded-full"
            style={{ width: `${Math.min(percentageUsed, 100)}%` }}
          />
        </div>
      </div>

      {/* Info Message */}
      <div className="p-3 rounded-lg bg-muted/50 border border-border/50 flex items-start gap-2">
        <TrendingUp className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          You can generate <span className="font-semibold text-foreground">{creditsLeft} more ideas</span> this month. Credits reset on the 1st of next month.
        </p>
      </div>
    </div>
  );
}
