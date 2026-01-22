"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useProInterest } from "../hooks/useProInterest";

export default function ProInterestForm() {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  const { mutate, isPending, isSuccess, isError } = useProInterest();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutate({ email, feedback });
  }

  if (isSuccess) {
    return (
      <div className="rounded-xl border bg-green-50 p-6 text-center">
        <h3 className="text-lg font-semibold text-green-700">
          You’re on the waitlist 🎉
        </h3>
        <p className="mt-2 text-sm text-green-600">
          We’ll email you when Pro launches.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md rounded-xl border bg-background p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Join Pro Waitlist</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Get early access and help shape the Pro experience.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <Input
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Textarea
          placeholder="What features do you want in Pro? (optional)"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        {isError && (
          <p className="text-sm text-red-500">
            Something went wrong. Try again.
          </p>
        )}

        <Button
          type="submit"
          disabled={isPending}
          className="w-full"
        >
          {isPending ? "Joining..." : "Join waitlist"}
        </Button>
      </form>
    </div>
  );
}
