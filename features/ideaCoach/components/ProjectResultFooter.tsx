"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  RefreshCw,
  Bookmark,
  BookmarkCheck,
  Clock,
  Coins,
  Crown,
} from "lucide-react";
import Link from "next/link";
import { ProjectResultFooterProps } from "../types";

export function ProjectResultFooter({
  isSaved,
  cooldown,
  isGenerating,
  onBack,
  onGenerateAnother,
  onSave,
  isSaving = false,
  creditsLeft,
  creditsPerMonth,
}: ProjectResultFooterProps) {
  const canGenerate =
    cooldown === 0 && !isGenerating && creditsLeft > 0;
    
  return (
    <div className="flex flex-col gap-4 sm:gap-5 mt-10">
      {/* Credits info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 rounded-lg border bg-muted/40 px-4 sm:px-5 py-3 sm:py-3.5 text-sm sm:text-base">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Coins className="h-4 w-4 flex-shrink-0" />
          <span>
            Credits:{" "}
            <span className="font-medium text-foreground">
              {creditsLeft}
            </span>{" "}
            / {creditsPerMonth}
          </span>
        </div>

        {creditsLeft === 0 && (
          <span className="text-xs font-medium text-destructive">
            No credits left
          </span>
        )}
      </div>

      {/* Top actions */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Button
          variant="outline"
          className="h-12 flex-1 bg-transparent"
          onClick={onBack}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Start over</span>
          <span className="sm:hidden">Back</span>
        </Button>

        <Button
          variant="outline"
          className={`h-12 flex-1 bg-transparent ${
            isSaved ? "border-accent text-accent" : ""
          }`}
          onClick={() => onSave?.()}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Bookmark className="w-4 h-4 mr-2 animate-pulse" />
              Saving...
            </>
          ) : isSaved ? (
            <>
              <BookmarkCheck className="w-4 h-4 mr-2" />
              Make public
            </>
          ) : (
            <>
              <Bookmark className="w-4 h-4 mr-2" />
              Save idea
            </>
          )}
        </Button>
      </div>

      {/* Generate CTA or Upgrade */}
      {creditsLeft === 0 ? (
        <Link href="/dashboard/upgrade-page" className="block">
          <Button className="h-12 w-full text-base sm:text-sm bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-medium">
            <Crown className="w-4 h-4 mr-2" />
            Upgrade to Pro - Generate More Ideas
          </Button>
        </Link>
      ) : (
        <Button
          className="h-12 w-full text-base sm:text-sm"
          onClick={onGenerateAnother}
          disabled={!canGenerate}
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : cooldown > 0 ? (
            <>
              <Clock className="w-4 h-4 mr-2" />
              Wait {cooldown}s
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4 mr-2" />
              Generate another idea (1 credit)
            </>
          )}
        </Button>
      )}
    </div>
  );
}
