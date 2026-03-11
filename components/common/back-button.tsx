"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

type BackButtonProps = {
  label?: string;
};

export default function BackButton({ label = "Back" }: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition"
    >
      <ArrowLeft size={16} />
      {label}
    </button>
  );
}