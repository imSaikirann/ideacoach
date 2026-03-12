"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Copy,
  Share2,
  Check,
  Code2,
  Zap,
  Heart,
  Globe,
  Lock,
} from "lucide-react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Idea } from "../services/ideas";

interface IdeaDetailModalProps {
  idea: Idea | null;
  isOpen: boolean;
  onClose: () => void;
}

export function IdeaDetailModal({
  idea,
  isOpen,
  onClose,
}: IdeaDetailModalProps) {

  const [copied, setCopied] = useState(false);
  const [visibility, setVisibility] =
    useState<"PUBLIC" | "PRIVATE">("PUBLIC");

  const queryClient = useQueryClient();

  useEffect(() => {
    if (idea?.visibility) {
      setVisibility(idea.visibility);
    }
  }, [idea?.visibility]);

  const toggleMutation = useMutation({
    mutationFn: async (newVisibility: "PUBLIC" | "PRIVATE") => {

      const res = await fetch("/api/ideas/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          savedIdeaId: idea?.id,
          visibility: newVisibility,
        }),
      });

      if (!res.ok) throw new Error("Update failed");

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

    const text = `${idea.title}

${idea.problem}

Tech Stack: ${stackArray.join(", ")}`;

    try {
      await navigator.clipboard.writeText(text);

      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleShare = async () => {

    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/dashboard/public-ideas?ideaId=${idea.id}`
        : "";

    try {
      if (navigator.share) {

        await navigator.share({
          title: idea.title,
          url,
        });

      } else {

        await navigator.clipboard.writeText(url);

        setCopied(true);

        setTimeout(() => setCopied(false), 2000);
      }
    } catch {}
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>

      <AlertDialogContent className="max-w-xl p-0 overflow-hidden">

        {/* Hidden title for accessibility */}

        <VisuallyHidden>
          <AlertDialogTitle>{idea.title}</AlertDialogTitle>
        </VisuallyHidden>

        {/* Header */}

        <div className="flex items-center justify-between border-b px-5 py-4">

          <h2 className="font-semibold text-lg">
            {idea.title}
          </h2>

          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-secondary"
          >
            <X className="w-5 h-5" />
          </button>

        </div>

        {/* Content */}

        <div className="p-5 space-y-5">

          {/* Visibility toggle */}

          {idea.isOwn && (

            <div className="flex items-center justify-between bg-secondary/40 border rounded-lg px-4 py-3">

              <div className="flex items-center gap-2 text-sm font-medium">

                {visibility === "PUBLIC"
                  ? <Globe className="w-4 h-4 text-primary" />
                  : <Lock className="w-4 h-4 text-muted-foreground" />}

                <span>
                  {visibility === "PUBLIC"
                    ? "Public Idea"
                    : "Private Idea"}
                </span>

              </div>

              <Switch
                checked={visibility === "PUBLIC"}
                disabled={toggleMutation.isPending}
                onCheckedChange={(checked) => {

                  const newVisibility =
                    checked ? "PUBLIC" : "PRIVATE";

                  setVisibility(newVisibility);

                  toggleMutation.mutate(newVisibility);
                }}
              />

            </div>
          )}

          {/* Problem */}

          {(idea.problem || idea.problemStatement) && (

            <div>

              <h3 className="text-xs uppercase text-muted-foreground mb-2">
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

              <h3 className="text-xs uppercase text-muted-foreground mb-2">
                Features
              </h3>

              <ul className="space-y-2">

                {idea.features.map((feature, i) => (

                  <li
                    key={i}
                    className="flex gap-2 text-sm"
                  >

                    <span className="text-primary">•</span>

                    {feature}

                  </li>

                ))}

              </ul>

            </div>
          )}

          {/* Tech Stack */}

          {stackArray.length > 0 && (

            <div>

              <h3 className="text-xs uppercase text-muted-foreground mb-2">
                Tech Stack
              </h3>

              <div className="flex flex-wrap gap-2">

                {stackArray.map((tech, i) => (

                  <span
                    key={i}
                    className="text-xs px-2 py-1 rounded bg-secondary font-medium"
                  >

                    {tech}

                  </span>

                ))}

              </div>

            </div>
          )}

          {/* Meta */}

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground border-t pt-3">

            {idea.projectType && (

              <span className="flex items-center gap-1">

                <Code2 className="w-3.5 h-3.5" />

                {idea.projectType}

              </span>
            )}

            {idea.difficulty && (

              <span className="flex items-center gap-1">

                <Zap className="w-3.5 h-3.5" />

                {idea.difficulty}

              </span>
            )}

            {idea.interest && (

              <span className="flex items-center gap-1">

                <Heart className="w-3.5 h-3.5" />

                {idea.interest}

              </span>
            )}

          </div>

        </div>

        {/* Actions */}

        <div className="flex gap-3 border-t p-4">

          <Button
            variant="outline"
            onClick={handleCopy}
            className="flex-1"
          >

            {copied
              ? <Check className="w-4 h-4 mr-2" />
              : <Copy className="w-4 h-4 mr-2" />}

            {copied ? "Copied" : "Copy"}

          </Button>

          <Button
            onClick={handleShare}
            className="flex-1"
          >

            <Share2 className="w-4 h-4 mr-2" />

            Share

          </Button>

        </div>

      </AlertDialogContent>

    </AlertDialog>
  );
}