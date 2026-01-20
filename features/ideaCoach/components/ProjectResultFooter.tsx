"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  RefreshCw,
  Bookmark,
  BookmarkCheck,
  Clock,
} from "lucide-react";

interface ProjectResultFooterProps {
  isSaved: boolean;
  cooldown: number;
  isGenerating: boolean;
  onBack: () => void;
  onGenerateAnother: () => void;
}

export function ProjectResultFooter({
  isSaved,
  cooldown,
  isGenerating,
  onBack,
  onGenerateAnother,
}: ProjectResultFooterProps) {
  const canGenerate = cooldown === 0 && !isGenerating;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <Button
          variant="outline"
          className="h-12 flex-1 bg-transparent"
          onClick={onBack}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Start over
        </Button>

        <Button
          variant="outline"
          className={`h-12 flex-1 bg-transparent ${
            isSaved ? "border-accent text-accent" : ""
          }`}
          disabled
        >
          {isSaved ? (
            <>
              <BookmarkCheck className="w-4 h-4 mr-2" />
              Saved
            </>
          ) : (
            <>
              <Bookmark className="w-4 h-4 mr-2" />
              Save idea
            </>
          )}
        </Button>
      </div>

      <Button
        className="h-12 w-full"
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
            Generate another idea
          </>
        )}
      </Button>
    </div>
  );
}
