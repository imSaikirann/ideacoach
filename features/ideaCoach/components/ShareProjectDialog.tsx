"use client";

import React, { useState } from "react";
import { Share2, Copy, Check, Link2, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ShareProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
  projectUrl?: string;
}

export function ShareProjectDialog({
  isOpen,
  onClose,
  projectTitle,
  projectUrl,
}: ShareProjectDialogProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = projectUrl || (typeof window !== "undefined" ? window.location.href : "");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const shareText = `Check out this project idea: ${projectTitle}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-primary" />
            Share your idea
          </AlertDialogTitle>
        </AlertDialogHeader>

        <div className="space-y-4 pt-2">
          <p className="text-sm text-muted-foreground">
            Your idea is now public and anyone with the link can view it.
          </p>

          {/* Copy link */}
          <div className="flex gap-2">
            <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 border">
              <Link2 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 bg-transparent text-sm outline-none truncate"
              />
            </div>
            <Button variant="outline" size="sm" onClick={handleCopy}>
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>

          {/* Social buttons */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild className="flex-1">
              <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
                <Twitter className="w-4 h-4 mr-2" />
                Twitter
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild className="flex-1">
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </a>
            </Button>
          </div>

          <Button onClick={onClose} className="w-full">
            Done
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
