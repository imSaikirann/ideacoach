"use client";

import React, { useState, useEffect } from "react";
import { X, Copy, Share2, Check, Code2, Zap, Heart, Globe, Lock } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Idea } from "../services/ideas";

interface IdeaDetailModalProps {
  idea: Idea | null;
  isOpen: boolean;
  onClose: () => void;
}

export function IdeaDetailModal({ idea, isOpen, onClose }: IdeaDetailModalProps) {
  const [copied, setCopied] = useState(false);
  const [visibility, setVisibility] = useState<"PUBLIC" | "PRIVATE">("PUBLIC");
  const queryClient = useQueryClient();

  // Sync visibility when idea changes
  useEffect(() => {
    if (idea?.visibility) {
      setVisibility(idea.visibility as "PUBLIC" | "PRIVATE");
    }
  }, [idea?.id, idea?.visibility]);

  const toggleMutation = useMutation({
    mutationFn: async (newVisibility: "PUBLIC" | "PRIVATE") => {
      const res = await fetch("/api/ideas/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          savedIdeaId: idea?.id,
          visibility: newVisibility,
        }),
      });
      if (!res.ok) throw new Error("Failed to update");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ideas"] });
    },
  });

  if (!idea) return null;

  const stackArray: string[] = Array.isArray(idea.stack)
    ? idea.stack
    : Array.isArray(idea.techStack)
    ? idea.techStack
    : typeof idea.techStack === "string"
    ? idea.techStack.split(", ").filter(Boolean)
    : [];

  const handleCopy = async () => {
    const text = `${idea.title}\n\n${idea.problem || idea.problemStatement || ""}\n\nTech: ${stackArray.join(", ")}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const handleShare = async () => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/dashboard/public-ideas?ideaId=${idea.id}`
        : "";

    try {
      if (navigator.share) {
        await navigator.share({ title: idea.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  const handleToggleVisibility = () => {
    const newVisibility = visibility === "PUBLIC" ? "PRIVATE" : "PUBLIC";
    setVisibility(newVisibility);
    toggleMutation.mutate(newVisibility);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-lg max-h-[85vh] overflow-y-auto p-0">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b px-4 py-3 flex items-center justify-between">
          <h2 className="font-semibold text-lg line-clamp-1 pr-4">{idea.title}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-5">
          {/* Visibility Toggle - only show for own ideas */}
          {idea.isOwn && (
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border">
              <div className="flex items-center gap-2">
                {visibility === "PUBLIC" ? (
                  <Globe className="w-4 h-4 text-primary" />
                ) : (
                  <Lock className="w-4 h-4 text-muted-foreground" />
                )}
                <span className="text-sm font-medium">
                  {visibility === "PUBLIC" ? "Public" : "Private"}
                </span>
              </div>
              <button
                onClick={handleToggleVisibility}
                disabled={toggleMutation.isPending}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  visibility === "PUBLIC" ? "bg-primary" : "bg-muted"
                } ${toggleMutation.isPending ? "opacity-50" : ""}`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    visibility === "PUBLIC" ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>
          )}

          {/* Problem */}
          {(idea.problem || idea.problemStatement) && (
            <div>
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                Problem
              </h3>
              <p className="text-sm leading-relaxed">
                {idea.problem || idea.problemStatement}
              </p>
            </div>
          )}

          {/* Features */}
          {idea.features && idea.features.length > 0 && (
            <div>
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                Features
              </h3>
              <ul className="space-y-1.5">
                {idea.features.map((f, i) => (
                  <li key={i} className="text-sm flex gap-2">
                    <span className="text-primary">•</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          {stackArray.length > 0 && (
            <div>
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {stackArray.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs rounded bg-secondary font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Meta info */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground pt-2 border-t">
            {idea.projectType && (
              <span className="flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5" />
                {idea.projectType}
              </span>
            )}
            {idea.difficulty && (
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                {idea.difficulty}
              </span>
            )}
            {idea.interest && (
              <span className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5" />
                {idea.interest}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="sticky bottom-0 bg-background border-t p-4 flex gap-2">
          <Button variant="outline" size="sm" onClick={handleCopy} className="flex-1">
            {copied ? (
              <Check className="w-4 h-4 mr-1.5" />
            ) : (
              <Copy className="w-4 h-4 mr-1.5" />
            )}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button size="sm" onClick={handleShare} className="flex-1">
            <Share2 className="w-4 h-4 mr-1.5" />
            Share
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
