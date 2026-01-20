"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Share2, Lightbulb } from "lucide-react";

interface SaveIdeaAlertProps {
  isOpen: boolean;
  projectTitle: string;
  onSave: () => void;
  onSkip: () => void;
}

export function SaveIdeaAlert({
  isOpen,
  projectTitle,
  onSave,
  onSkip,
}: SaveIdeaAlertProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onSkip()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-accent" />
            <AlertDialogTitle>Share this idea?</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="space-y-2">
            <p>
              Your idea "{projectTitle}" could be useful for others in the community.
            </p>
            <p className="flex items-center gap-2 text-accent font-medium">
              <Share2 className="w-4 h-4" />
              Save it now and help other developers find inspiration!
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onSkip}>
            Skip for now
          </AlertDialogCancel>
          <AlertDialogAction onClick={onSave}>
            Save & Share
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
