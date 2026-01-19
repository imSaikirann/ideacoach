import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, GraduationCap } from "lucide-react";

export default function HeroContent() {
  return (
    <div className="space-y-8 max-w-xl">
      {/* Badge */}
      <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-secondary/50 border border-border backdrop-blur-sm animate-fade-in">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
        </span>
        <span className="text-sm font-medium text-foreground/90">
          Project ideas for developers
        </span>
      </div>

      {/* Heading */}
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight text-balance">
          {"Don't know what to build?"}
        </h1>
        <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-muted-foreground leading-[1.1] tracking-tight">
          {"We'll pick the right project for you."}
        </p>
      </div>

      {/* Description */}
      <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-md">
        Answer a few questions about your skills and interests.
        Get a clear, build-ready project idea — no guessing.
      </p>

      {/* Primary & Secondary CTAs */}
      <div className="pt-2 flex flex-col sm:flex-row gap-4">
        {/* Primary CTA */}
        <Link href="/dashboard/idea-form">
          <Button
            size="lg"
            className="h-13 px-8 text-base font-semibold group shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all duration-300"
          >
            <Zap className="mr-2 w-5 h-5" />
            Get my project
            <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>

        {/* Secondary CTA – Public Ideas */}
        <Link href="/dashboard/public-ideas">
          <Button
            size="lg"
            variant="outline"
            className="h-13 px-8 text-base font-semibold group border-border/60 bg-transparent hover:bg-secondary/40 transition-all duration-300"
          >
            <Sparkles className="mr-2 w-5 h-5" />
            Explore public ideas
            <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>

      {/* Build School – Super CTA */}
      <Link
        href="/dashboard/playbook"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-secondary/40 hover:bg-secondary/60 transition-all group w-fit"
      >
        <GraduationCap className="w-4 h-4 text-foreground" />
        <span className="text-sm font-semibold text-foreground">
          Build School
        </span>
        <span className="text-sm text-muted-foreground">
          Learn how to build projects from scratch — free
        </span>
        <ArrowRight className="w-4 h-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
      </Link>

      {/* Social proof */}
      <div className="flex items-center gap-4 pt-4">
        <div className="flex -space-x-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-10 h-10 rounded-full bg-secondary border-2 border-background flex items-center justify-center text-xs font-medium text-muted-foreground"
            >
              {String.fromCharCode(64 + i)}
            </div>
          ))}
        </div>
        <div className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">2,000+</span>{" "}
          developers found their next project
        </div>
      </div>
    </div>
  );
}
