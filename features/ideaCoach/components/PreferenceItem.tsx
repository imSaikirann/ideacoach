"use client";

import React from "react";

interface PreferenceItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export function PreferenceItem({
  icon,
  label,
  value,
}: PreferenceItemProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-md bg-card flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm text-foreground capitalize">{value}</p>
      </div>
    </div>
  );
}
