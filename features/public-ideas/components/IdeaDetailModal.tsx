"use client";

import React, { useState } from "react";
import { X, Lock, Globe, User, Clock, Code2, Gauge, Heart, Copy, Share2, Check, Sparkles } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import type { Idea } from "../services/ideas";

interface IdeaDetailModalProps {
  idea: Idea | null;
  isOpen: boolean;
  onClose: () => void;
}

export function IdeaDetailModal({ idea, isOpen, onClose }: IdeaDetailModalProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  if (!idea) return null;

  const stackArray: string[] = Array.isArray(idea.stack)
    ? idea.stack
    : Array.isArray(idea.techStack)
      ? idea.techStack
      : typeof idea.techStack === "string"
        ? idea.techStack.split(", ").filter(Boolean)
        : [];

  const handleCopy = async () => {
    const ideaText = `
${idea.title}

Problem: ${idea.problem || idea.problemStatement || "N/A"}

Features:
${idea.features?.map((f: string) => `• ${f}`).join("\n") || "N/A"}

Tech Stack: ${stackArray.join(", ") || "N/A"}
Difficulty: ${idea.difficulty || "N/A"}
Type: ${idea.projectType || "N/A"}
Interest: ${idea.interest || "N/A"}
    `.trim();

    try {
      await navigator.clipboard.writeText(ideaText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: idea.title,
      text: idea.problem || idea.problemStatement || "",
      url: typeof window !== "undefined" ? window.location.href : "",
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(
          `${idea.title}\n${idea.problem || idea.problemStatement || ""}\n${window.location.href}`
        );
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Failed to share:", err);
    }
  };

  const handleUseIdea = () => {
    // Navigate to idea form with pre-filled data
    const params = new URLSearchParams();
    if (idea.projectType) params.set("type", idea.projectType);
    if (stackArray.length > 0) params.set("stack", stackArray.join(","));
    if (idea.difficulty) params.set("difficulty", idea.difficulty);
    if (idea.interest) params.set("interest", idea.interest);
    if (idea.problem || idea.problemStatement) {
      params.set("problem", idea.problem || idea.problemStatement || "");
    }
    
    router.push(`/dashboard/idea-form?${params.toString()}`);
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <AlertDialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {idea.visibility === "PRIVATE" ? (
                  <Lock className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <Globe className="w-4 h-4 text-primary" />
                )}
                <AlertDialogTitle className="text-xl sm:text-2xl font-semibold">
                  {idea.title}
                </AlertDialogTitle>
              </div>
              {idea.visibility === "PRIVATE" && idea.isOwn && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-secondary text-muted-foreground">
                  <Lock className="w-3 h-3" />
                  Your private idea
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </AlertDialogHeader>

        <div className="space-y-6 pt-4">
          {/* Problem/Description */}
          {(idea.problem || idea.problemStatement) && (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                Problem Solved
              </h3>
              <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
                {idea.problem || idea.problemStatement}
              </p>
            </div>
          )}

          {/* Features */}
          {idea.features && idea.features.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                Key Features
              </h3>
              <ul className="space-y-2">
                {idea.features.map((feature, index) => (
                  <li key={index} className="flex gap-2 text-sm sm:text-base text-foreground/90">
                    <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          {stackArray.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {stackArray.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-lg bg-secondary border border-border text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t">
            {idea.projectType && (
              <div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                  <Code2 className="w-3 h-3" />
                  <span>Type</span>
                </div>
                <p className="text-sm font-medium">{idea.projectType}</p>
              </div>
            )}
            {idea.difficulty && (
              <div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                  <Gauge className="w-3 h-3" />
                  <span>Difficulty</span>
                </div>
                <p className="text-sm font-medium">{idea.difficulty}</p>
              </div>
            )}
            {idea.interest && (
              <div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                  <Heart className="w-3 h-3" />
                  <span>Interest</span>
                </div>
                <p className="text-sm font-medium">{idea.interest}</p>
              </div>
            )}
            {idea.author && (
              <div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                  <User className="w-3 h-3" />
                  <span>Author</span>
                </div>
                <p className="text-sm font-medium">{idea.author}</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={handleCopy}
              className="flex-1"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Details
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={handleShare}
              className="flex-1"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button
              onClick={handleUseIdea}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Use This Idea
            </Button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
