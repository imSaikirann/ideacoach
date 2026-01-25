"use client";

import React, { useState } from "react";
import { Share2, Copy, Check, Link2, Twitter, Facebook, Linkedin, X } from "lucide-react";
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
  const [shareUrl] = useState(() => {
    if (projectUrl) return projectUrl;
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return "";
  });

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
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-accent" />
            Share this project
          </AlertDialogTitle>
        </AlertDialogHeader>

        <div className="space-y-4 pt-2">
          {/* Copy link */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-lg bg-secondary/50 border border-border">
              <Link2 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 bg-transparent text-sm text-foreground/90 outline-none truncate"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="flex-shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </div>

          {/* Social share buttons */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="flex-1"
            >
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <Twitter className="w-4 h-4" />
                Twitter
              </a>
            </Button>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="flex-1"
            >
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <Facebook className="w-4 h-4" />
                Facebook
              </a>
            </Button>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="flex-1"
            >
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
