import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Cta() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-24 text-center">
      {/* Headline */}
      <h2 className="text-3xl sm:text-4xl font-semibold text-foreground mb-4">
        Build your next project with clarity
      </h2>

      {/* Sub copy */}
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
        IdeaCoach helps you decide what to build next based on your skills,
        interests, and real-world relevance — so you can stop guessing
        and start executing.
      </p>

      {/* CTA */}
      <Link
        href="/dashboard/idea-form"
        className="
          inline-flex items-center gap-2
          px-7 py-3.5
          rounded-full
          bg-primary text-primary-foreground
          font-medium
          transition-all
          hover:scale-[1.03]
          hover:shadow-lg hover:shadow-primary/25
          focus:outline-none
        "
      >
        Generate my project
        <ArrowRight className="w-4 h-4" />
      </Link>

      {/* Footnote */}
      <p className="text-sm text-muted-foreground mt-6">
        Takes less than a minute. No signup required.
      </p>
    </section>
  );
}
