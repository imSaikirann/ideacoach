"use client";

import React, { useState } from "react";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Share2, Lightbulb, Lock, Globe } from "lucide-react";
import { SaveIdeaAlertProps } from "../types";

type Step = "confirm" | "visibility";

export function SaveIdeaAlert({
  isOpen,
  projectTitle,
  onSave,
  onSkip,
}: SaveIdeaAlertProps) {
  const [step, setStep] = useState<Step>("confirm");
  const [visibility, setVisibility] = useState<"PUBLIC" | "PRIVATE">("PRIVATE");

  function handleClose(open: boolean) {
    if (!open) {
      setStep("confirm");
      setVisibility("PRIVATE");
      onSkip();
    }
  }

  function handleSave() {
    onSave(visibility);
    setStep("confirm");
    setVisibility("PRIVATE");
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={handleClose}>
      <AlertDialogContent>
        {step === "confirm" && (
          <>
            <AlertDialogHeader>
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-accent" />
                <AlertDialogTitle>Share this idea?</AlertDialogTitle>
              </div>
              <AlertDialogDescription className="space-y-2">
                <p>
                  Your idea <strong>"{projectTitle}"</strong> could help other
                  developers.
                </p>
                <p className="flex items-center gap-2 text-accent font-medium">
                  <Share2 className="w-4 h-4" />
                  You can choose who can see it next.
                </p>
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel onClick={onSkip}>
                Skip for now
              </AlertDialogCancel>
              <AlertDialogAction onClick={() => setStep("visibility")}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </>
        )}

        {step === "visibility" && (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>Choose visibility</AlertDialogTitle>
              <AlertDialogDescription>
                Decide who can see this idea.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="space-y-4">
              <Select
                value={visibility}
                onValueChange={(v) =>
                  setVisibility(v as "PUBLIC" | "PRIVATE")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PUBLIC">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Public (Community)
                    </div>
                  </SelectItem>
                  <SelectItem value="PRIVATE">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Private (Only you)
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setStep("confirm")}>
                Back
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleSave}>
                Save Idea
              </AlertDialogAction>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
