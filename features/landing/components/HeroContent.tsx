import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroContent() {
  return (
    <div className="space-y-10 max-w-xl">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A1818] border border-[#2A1F1F] w-fit">
        <Sparkles className="w-4 h-4 text-[#A0A0A0]" />
        <span className="text-sm font-medium text-[#E5E5E5]">
          Project ideas for developers
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#E5E5E5] leading-tight tracking-tight">
        Don't know what to build?
        <br />
        <span className="text-[#A0A0A0]">We'll pick the project</span>
        <br />
        <span className="text-[#E5E5E5]">for you.</span>
      </h1>

      {/* Description */}
      <p className="text-base sm:text-lg text-[#A0A0A0] leading-relaxed">
        Answer a few questions about your skills and interests.
        <br className="hidden sm:block" />
        Get a clear, build-ready project idea.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 pt-2">
        <Link href="/dashboard/idea-form" className="w-full sm:w-auto">
          <Button
            size="lg"
            className="w-full sm:w-auto h-12 px-6 text-base font-semibold group"
          >
            Get my project
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>

        <Link href="#how-it-works" className="w-full sm:w-auto">
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto h-12 px-6 text-base font-semibold"
          >
            How it works
          </Button>
        </Link>
      </div>
    </div>
  );
}
