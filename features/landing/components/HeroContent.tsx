import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Sparkles,
  Zap,
  GraduationCap,
  Rocket,
} from "lucide-react";

export default function HeroContent() {
  return (
    <div className="mx-auto max-w-xl lg:max-w-2xl text-center lg:text-left space-y-10">
      {/* Status Badge */}
      <div className="flex justify-center lg:justify-start">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="text-xs font-medium tracking-wide">
            AI-powered project discovery for developers
          </span>
        </div>
      </div>

      {/* Headline */}
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-balance">
          Build projects that actually
          <span className="text-primary"> matter</span>
        </h1>

        <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground font-medium">
          Stop guessing. Start building portfolio-ready projects with clarity.
        </p>
      </div>

      {/* Description */}
      <p className="mx-auto lg:mx-0 max-w-lg text-base sm:text-lg leading-relaxed text-muted-foreground">
        IdeaCoach helps you discover **high-signal project ideas** tailored to
        your skills, goals, and experience complete with scope, features, and
        real-world relevance.
      </p>

      {/* Primary CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
        <Link href="/dashboard/idea-form" className="w-full sm:w-auto">
          <Button
            size="lg"
            className="
              w-full sm:w-auto
              px-8 text-base font-semibold
              shadow-lg shadow-primary/20
              hover:shadow-primary/30
              transition-all
              group
            "
          >
            <Rocket className="mr-2 h-5 w-5" />
            Generate my project
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>

        <Link href="/dashboard/public-ideas" className="hidden sm:block">
          <Button
            size="lg"
            variant="outline"
            className="
              px-8 text-base font-semibold
              border-border/60
              bg-transparent
              hover:bg-secondary/40
              transition-all
              group
            "
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Browse real ideas
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>

      {/* Build School */}
      <div className="flex justify-center lg:justify-start">
        <Link
          href="/dashboard/playbook"
          className="
            inline-flex items-center gap-2
            px-4 py-2 rounded-full
            border border-border/50
            bg-secondary/40
            hover:bg-secondary/60
            transition-all
            group
          "
        >
          <GraduationCap className="h-4 w-4" />
          <span className="text-sm font-semibold">
            Build School
          </span>
          <span className="hidden sm:inline text-sm text-muted-foreground">
            Learn how to execute projects end-to-end
          </span>
          <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Social Proof */}
      <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
        <div className="flex -space-x-3">
          {["JS", "TS", "FE", "BE"].map((label, i) => (
            <div
              key={i}
              className="
                h-9 w-9 rounded-full
                bg-secondary
                border-2 border-background
                flex items-center justify-center
                text-[10px] font-semibold text-muted-foreground
              "
            >
              {label}
            </div>
          ))}
        </div>

        <p className="text-sm text-muted-foreground">
          Trusted by{" "}
          <span className="font-semibold text-foreground">
            2,000+ developers
          </span>{" "}
          building real-world projects
        </p>
      </div>
    </div>
  );
}
