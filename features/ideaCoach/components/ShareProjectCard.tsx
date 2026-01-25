"use client";

import React, { useState } from "react";
import { Share2, Copy, Check, Link2, Twitter, Facebook, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectSection } from "./ProjectSection";

interface ShareProjectCardProps {
  projectTitle: string;
  projectUrl?: string;
  revealed: boolean;
}

export function ShareProjectCard({
  projectTitle,
  projectUrl,
  revealed,
}: ShareProjectCardProps) {
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
    <ProjectSection
      icon={<Share2 className="w-4 h-4" />}
      title="Share this project"
      delay={1000}
      revealed={revealed}
    >
      <div className="space-y-4">
        {/* Copy link */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <div className="flex-1 flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-lg bg-secondary/50 border border-border">
            <Link2 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 bg-transparent text-sm sm:text-base text-foreground/90 outline-none truncate"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="h-10 sm:h-auto flex-shrink-0"
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
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex-1 sm:flex-initial"
          >
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <Twitter className="w-4 h-4" />
              <span className="hidden sm:inline">Twitter</span>
            </a>
          </Button>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex-1 sm:flex-initial"
          >
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <Facebook className="w-4 h-4" />
              <span className="hidden sm:inline">Facebook</span>
            </a>
          </Button>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex-1 sm:flex-initial"
          >
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <Linkedin className="w-4 h-4" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
          </Button>
        </div>
      </div>
    </ProjectSection>
  );
}
